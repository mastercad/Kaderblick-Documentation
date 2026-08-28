<?php

declare(strict_types=1);

namespace App\Controller;

use App\Documentation\LongFormContent;
use App\Documentation\RoleContent;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Routing\RouterInterface;

final class SeoController
{
    private const LOCALES = [
        'de' => 'de',
        'en' => 'en',
        'fr' => 'fr',
        'ru' => 'ru',
        'zh-hans' => 'zh-Hans',
    ];

    private const NON_INDEXABLE_DOCS_ROUTES = [
        'docs_ball_marker_gui',
        'docs_camera_simulator',
    ];

    public function __construct(private readonly RouterInterface $router)
    {
    }

    public function robots(): Response
    {
        $sitemap = $this->router->generate('seo_sitemap', [], UrlGeneratorInterface::ABSOLUTE_URL);
        $body = "User-agent: *\nAllow: /\nDisallow: /_profiler/\nDisallow: /_wdt/\n\nSitemap: ".$sitemap."\n";

        return new Response($body, 200, [
            'Content-Type' => 'text/plain; charset=UTF-8',
            'Cache-Control' => 'public, max-age=3600',
        ]);
    }

    public function sitemap(): Response
    {
        $pages = $this->staticPages();
        foreach (LongFormContent::sitemapRouteParameters() as $parameters) {
            $pages[] = ['route' => 'docs_long_form_section', 'parameters' => $parameters];
        }
        foreach (RoleContent::ROLES as $role) {
            $pages[] = ['route' => 'docs_roles_detail', 'parameters' => ['role' => $role]];
        }

        $xml = new \XMLWriter();
        $xml->openMemory();
        $xml->startDocument('1.0', 'UTF-8');
        $xml->startElement('urlset');
        $xml->writeAttribute('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');
        $xml->writeAttribute('xmlns:xhtml', 'http://www.w3.org/1999/xhtml');

        foreach ($pages as $page) {
            $alternates = [];
            foreach (self::LOCALES as $urlLocale => $hreflang) {
                $alternates[$hreflang] = $this->router->generate(
                    $page['route'],
                    array_merge($page['parameters'], ['lang' => $urlLocale]),
                    UrlGeneratorInterface::ABSOLUTE_URL,
                );
            }
            foreach (self::LOCALES as $urlLocale => $hreflang) {
                $xml->startElement('url');
                $xml->writeElement('loc', $alternates[$hreflang]);
                foreach ($alternates as $alternateLanguage => $alternateUrl) {
                    $xml->startElement('xhtml:link');
                    $xml->writeAttribute('rel', 'alternate');
                    $xml->writeAttribute('hreflang', $alternateLanguage);
                    $xml->writeAttribute('href', $alternateUrl);
                    $xml->endElement();
                }
                $xml->startElement('xhtml:link');
                $xml->writeAttribute('rel', 'alternate');
                $xml->writeAttribute('hreflang', 'x-default');
                $xml->writeAttribute('href', $alternates['de']);
                $xml->endElement();
                $xml->endElement();
            }
        }
        $xml->endElement();
        $xml->endDocument();

        return new Response($xml->outputMemory(), 200, [
            'Content-Type' => 'application/xml; charset=UTF-8',
            'Cache-Control' => 'public, max-age=3600',
        ]);
    }

    /** @return list<array{route: string, parameters: array<string, string>}> */
    private function staticPages(): array
    {
        $pages = [];
        foreach ($this->router->getRouteCollection() as $name => $route) {
            if (!str_starts_with((string) $name, 'docs_') || in_array($name, [
                'docs_long_form_section',
                'docs_roles_detail',
                ...self::NON_INDEXABLE_DOCS_ROUTES,
            ], true)) {
                continue;
            }
            if (array_diff($route->compile()->getVariables(), ['lang']) !== []) {
                continue;
            }
            $pages[] = ['route' => (string) $name, 'parameters' => []];
        }

        usort($pages, static fn (array $left, array $right): int => $left['route'] <=> $right['route']);

        return $pages;
    }
}
