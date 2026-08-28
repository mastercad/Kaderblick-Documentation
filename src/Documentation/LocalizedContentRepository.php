<?php

declare(strict_types=1);

namespace App\Documentation;

use Symfony\Component\DependencyInjection\Attribute\Autowire;

final class LocalizedContentRepository
{
    private const SUPPORTED_LOCALES = ['de', 'en', 'fr', 'ru', 'zh_Hans'];

    public function __construct(
        #[Autowire('%kernel.project_dir%/content')]
        private readonly string $contentDirectory,
    ) {
    }

    public function has(string $page): bool
    {
        return is_file($this->path($page, 'de'));
    }

    /** @return array{title: string, hero: array{heading: string, lead: string, eyebrow: string|null, chips: list<string>}, body: string} */
    public function get(string $page, string $locale): array
    {
        $locale = in_array($locale, self::SUPPORTED_LOCALES, true) ? $locale : 'de';
        $path = $this->path($page, $locale);
        if (!is_file($path)) {
            $path = $this->path($page, 'de');
        }

        $json = file_get_contents($path);
        if ($json === false) {
            throw new \RuntimeException(sprintf('Documentation content "%s" cannot be read.', $path));
        }

        $content = json_decode($json, true, 512, JSON_THROW_ON_ERROR);
        if (!is_array($content) || !is_string($content['title'] ?? null) || !is_string($content['body'] ?? null)) {
            throw new \RuntimeException(sprintf('Documentation content "%s" has an invalid structure.', $path));
        }

        $hero = $content['hero'] ?? null;
        if (!is_array($hero)
            || !is_string($hero['heading'] ?? null)
            || !is_string($hero['lead'] ?? null)
            || (!is_null($hero['eyebrow'] ?? null) && !is_string($hero['eyebrow']))
            || !is_array($hero['chips'] ?? null)
            || array_filter($hero['chips'], static fn (mixed $chip): bool => !is_string($chip)) !== []
        ) {
            throw new \RuntimeException(sprintf('Documentation hero "%s" has an invalid structure.', $path));
        }

        return ['title' => $content['title'], 'hero' => $hero, 'body' => $content['body']];
    }

    private function path(string $page, string $locale): string
    {
        if (!preg_match('~^[a-z0-9-]+(?:/[a-z0-9-]+)*$~', $page)) {
            throw new \InvalidArgumentException(sprintf('Invalid documentation page key "%s".', $page));
        }

        return sprintf('%s/%s/%s.json', $this->contentDirectory, $locale, $page);
    }
}
