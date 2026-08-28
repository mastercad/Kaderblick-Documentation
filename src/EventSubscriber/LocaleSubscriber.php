<?php

declare(strict_types=1);

namespace App\EventSubscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Routing\RouterInterface;

final class LocaleSubscriber implements EventSubscriberInterface
{
    private const DEFAULT_LOCALE = 'de';
    private const URL_TO_INTERNAL_LOCALE = [
        'de' => 'de',
        'en' => 'en',
        'fr' => 'fr',
        'ru' => 'ru',
        'zh-hans' => 'zh_Hans',
    ];

    public function __construct(private readonly RouterInterface $router)
    {
    }

    public static function getSubscribedEvents(): array
    {
        return [KernelEvents::REQUEST => [
            ['redirectNeutralUrl', 40],
            ['applyRouteLocale', 15],
        ]];
    }

    public function redirectNeutralUrl(RequestEvent $event): void
    {
        if (!$event->isMainRequest()) {
            return;
        }

        $request = $event->getRequest();
        $urlLocale = $this->localeFromPath($request);
        if ($urlLocale !== null) {
            return;
        }

        if (!$this->isDocumentationRequest($request)) {
            return;
        }

        $targetLocale = $this->requestedLocale($request) ?? $this->preferredLocale($request) ?? self::DEFAULT_LOCALE;
        $query = $request->query->all();
        unset($query['lang']);
        $target = '/'.$targetLocale.($request->getPathInfo() === '/' ? '/' : $request->getPathInfo());
        if ($query !== []) {
            $target .= '?'.http_build_query($query);
        }

        $response = new RedirectResponse($target, 302);
        $response->setVary('Accept-Language');
        $event->setResponse($response);
    }

    public function applyRouteLocale(RequestEvent $event): void
    {
        if (!$event->isMainRequest() || $event->hasResponse()) {
            return;
        }

        $urlLocale = strtolower((string) $event->getRequest()->attributes->get('lang', ''));
        if (array_key_exists($urlLocale, self::URL_TO_INTERNAL_LOCALE)) {
            $this->router->getContext()->setParameter('lang', $urlLocale);
            $event->getRequest()->attributes->set('_locale', self::URL_TO_INTERNAL_LOCALE[$urlLocale]);
            $event->getRequest()->setLocale(self::URL_TO_INTERNAL_LOCALE[$urlLocale]);
        }
    }

    private function localeFromPath(Request $request): ?string
    {
        $segment = strtolower(explode('/', ltrim($request->getPathInfo(), '/'), 2)[0] ?? '');

        return array_key_exists($segment, self::URL_TO_INTERNAL_LOCALE) ? $segment : null;
    }

    private function requestedLocale(Request $request): ?string
    {
        $requested = strtolower(str_replace('_', '-', (string) $request->query->get('lang', '')));
        if ($requested === 'zh-hans' || $requested === 'zh') {
            return 'zh-hans';
        }

        return array_key_exists($requested, self::URL_TO_INTERNAL_LOCALE) ? $requested : null;
    }

    private function preferredLocale(Request $request): ?string
    {
        foreach ($request->getLanguages() as $language) {
            $normalized = strtolower(str_replace('_', '-', $language));
            if (str_starts_with($normalized, 'zh')) {
                return 'zh-hans';
            }
            $primary = explode('-', $normalized, 2)[0];
            if (array_key_exists($primary, self::URL_TO_INTERNAL_LOCALE)) {
                return $primary;
            }
        }

        return null;
    }

    private function isDocumentationRequest(Request $request): bool
    {
        if (!in_array($request->getMethod(), ['GET', 'HEAD'], true)) {
            return false;
        }

        $path = $request->getPathInfo();

        return !str_starts_with($path, '/_')
            && !preg_match('~(?:^|/)[^/]+\.[a-z0-9]{2,8}$~i', $path);
    }
}
