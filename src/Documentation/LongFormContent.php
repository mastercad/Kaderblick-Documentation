<?php

declare(strict_types=1);

namespace App\Documentation;

use Symfony\Contracts\Translation\TranslatorInterface;

final class LongFormContent
{
    /** @var array<string, string> */
    private const PAGE_FALLBACK_IMAGES = [
        'getting-started' => 'getting-started/coach-navigation.png',
        'reports' => 'reports/current-reports.png',
        'calendar' => 'calendar/calendar.png',
        'games' => 'games/overview.png',
        'profile' => 'profile/profile.png',
        'dashboard' => 'dashboard/coaches-dashboard.png',
        'lineups' => 'lineups/lineup-editor.png',
        'clubs-teams' => 'clubs-teams/my-team.png',
    ];

    /** @var array<string, string> */
    private const CHAPTER_FALLBACK_IMAGES = [
        'clubs-teams/club-and-season' => 'clubs-teams/club-season.png',
    ];

    /** @var array<string, list<string>> */
    private const SECTIONS = [
        'getting-started' => ['open-kaderblick', 'account', 'roles', 'navigation', 'profile', 'dashboard', 'troubleshooting'],
        'reports' => ['saved-reports', 'workflow-choice', 'mobile-wizard', 'report-builder', 'dashboard-use', 'data-sources', 'visibility'],
        'calendar' => ['calendar-basics', 'event-creation', 'wizard-types', 'game-event', 'external-teams', 'event-visibility', 'training', 'task', 'tournament', 'participation', 'event-management', 'role-differences', 'connected-areas'],
        'games' => ['filters', 'overview-areas', 'game-creation', 'game-details', 'live-ticker', 'match-plan', 'events', 'videos', 'supporter-access', 'playing-times', 'personal-matchday', 'imports-and-tournaments', 'access-differences'],
        'profile' => ['profile-navigation', 'profile-header', 'personal-data', 'equipment', 'settings', 'notifications', 'api-token', 'calendar-integration', 'absences', 'documents'],
        'dashboard' => ['dashboard-overview', 'add-widget', 'manage-widgets', 'widget-types', 'quick-response', 'training-proof', 'role-actions', 'troubleshooting'],
        'lineups' => ['template-overview', 'create-template', 'lineup-editor', 'tactics-board', 'match-plan', 'missing-player'],
        'clubs-teams' => ['my-team', 'club-season', 'manage-teams', 'manage-clubs', 'roles-visibility'],
    ];

    /** @var array<string, array<string, list<string>>> */
    private const CHAPTERS = [
        'getting-started' => [
            'access-and-account' => ['open-kaderblick', 'account'],
            'roles-and-relationships' => ['roles'],
            'orientation-and-setup' => ['navigation', 'profile', 'dashboard'],
            'troubleshooting' => ['troubleshooting'],
        ],
        'reports' => [
            'overview-and-choice' => ['saved-reports', 'workflow-choice'],
            'mobile-wizard' => ['mobile-wizard'],
            'report-builder-and-dashboard' => ['report-builder', 'dashboard-use'],
            'data-and-visibility' => ['data-sources', 'visibility'],
        ],
        'calendar' => [
            'using-the-calendar' => ['calendar-basics', 'participation', 'event-management'],
            'creating-events' => ['event-creation', 'wizard-types'],
            'games' => ['game-event', 'external-teams'],
            'training' => ['training'],
            'meetings-tasks-and-tournaments' => ['event-visibility', 'task', 'tournament'],
            'access-and-connections' => ['role-differences', 'connected-areas'],
        ],
        'games' => [
            'finding-and-understanding-games' => ['filters', 'overview-areas', 'game-details'],
            'creating-and-importing-games' => ['game-creation', 'imports-and-tournaments'],
            'planning-and-running-games' => ['live-ticker', 'match-plan', 'playing-times'],
            'events-and-videos' => ['events', 'videos'],
            'personal-access-and-matchday' => ['supporter-access', 'personal-matchday', 'access-differences'],
        ],
        'profile' => [
            'account-and-personal-data' => ['profile-navigation', 'profile-header', 'personal-data'],
            'equipment' => ['equipment'],
            'preferences-and-security' => ['settings'],
            'notifications-and-reminders' => ['notifications'],
            'connections-and-calendars' => ['api-token', 'calendar-integration'],
            'player-records' => ['absences', 'documents'],
        ],
        'dashboard' => [
            'overview-and-quick-actions' => ['dashboard-overview', 'quick-response', 'training-proof', 'role-actions'],
            'add-widgets' => ['add-widget', 'widget-types'],
            'manage-widgets' => ['manage-widgets'],
            'troubleshooting' => ['troubleshooting'],
        ],
        'lineups' => [
            'manage-templates' => ['template-overview', 'create-template'],
            'use-editor' => ['lineup-editor'],
            'plan-tactics' => ['tactics-board'],
            'use-in-match-plan' => ['match-plan', 'missing-player'],
        ],
        'clubs-teams' => [
            'my-team' => ['my-team'],
            'club-and-season' => ['club-season'],
            'manage-teams' => ['manage-teams'],
            'manage-clubs' => ['manage-clubs'],
            'roles-and-visibility' => ['roles-visibility'],
        ],
    ];

    public function __construct(
        private readonly LocalizedContentRepository $repository,
        private readonly TranslatorInterface $translator,
    )
    {
    }

    public function supports(string $page): bool
    {
        return isset(self::CHAPTERS[$page]);
    }

    /** @return list<array{page: string, section: string}> */
    public static function sitemapRouteParameters(): array
    {
        $parameters = [];
        foreach (self::CHAPTERS as $page => $chapters) {
            foreach (array_keys($chapters) as $section) {
                $parameters[] = ['page' => $page, 'section' => $section];
            }
        }

        return $parameters;
    }

    /** @return array{document: array, sections: list<array{slug: string, title: string, summary: string}>} */
    public function overview(string $page, string $locale): array
    {
        $document = $this->repository->get($page, $locale);
        $partsBySection = $this->split($document['body']);
        $chapters = self::CHAPTERS[$page] ?? [];
        $expectedSections = self::SECTIONS[$page] ?? [];
        if (array_keys($partsBySection) !== $expectedSections) {
            throw new \RuntimeException(sprintf('Long-form page "%s" does not contain the expected explicitly identified sections.', $page));
        }

        $sections = [];
        foreach ($chapters as $slug => $sectionNames) {
            $translationKey = sprintf('longform.%s.%s', str_replace('-', '_', $page), str_replace('-', '_', $slug));
            $sections[] = [
                'slug' => $slug,
                'title' => $this->translator->trans($translationKey, locale: $locale),
                'summary' => $this->translator->trans($translationKey.'.summary', locale: $locale),
            ];
        }

        return ['document' => $document, 'sections' => $sections];
    }

    /** @return array{document: array, chapter_navigation: array{page: string, current: int, total: int, previous: array|null, next: array|null}} */
    public function section(string $page, string $slug, string $locale): array
    {
        $overview = $this->overview($page, $locale);
        $slugs = array_keys(self::CHAPTERS[$page]);
        $index = array_search($slug, $slugs, true);
        if ($index === false) {
            throw new \InvalidArgumentException(sprintf('Unknown section "%s" for page "%s".', $slug, $page));
        }

        $source = $overview['document'];
        $partsBySection = $this->split($source['body']);
        $chapterParts = array_map(static fn (string $section): string => $partsBySection[$section], self::CHAPTERS[$page][$slug]);
        $current = $overview['sections'][$index];
        $document = $source;
        $document['title'] = $current['title'].' – '.$source['title'];
        $document['hero']['heading'] = $current['title'];
        $document['hero']['lead'] = $current['summary'];
        $document['hero']['chips'] = [];
        $body = implode("\n", $chapterParts);
        $document['body'] = str_replace(['src="images/', "src='images/"], ['src="/images/', "src='/images/"], $body);
        if (!preg_match('~<img\b~i', $document['body'])) {
            $assetLocale = $locale === 'zh_Hans' ? 'zh-hans' : $locale;
            $image = self::CHAPTER_FALLBACK_IMAGES[$page.'/'.$slug] ?? self::PAGE_FALLBACK_IMAGES[$page];
            $document['chapter_image'] = [
                'src' => '/images/docs/'.$assetLocale.'/'.$image,
                'alt' => $current['title'],
                'caption' => $current['summary'],
            ];
        }

        $link = static fn (int $position): array => [
            'slug' => $slugs[$position],
            'title' => $overview['sections'][$position]['title'],
        ];

        return [
            'document' => $document,
            'chapter_navigation' => [
                'page' => $page,
                'current' => $index + 1,
                'total' => count($slugs),
                'previous' => $index > 0 ? $link($index - 1) : null,
                'next' => $index + 1 < count($slugs) ? $link($index + 1) : null,
            ],
        ];
    }

    /** @return array<string, string> */
    private function split(string $body): array
    {
        $parts = preg_split('~(?=<h2(?:\s[^>]*)?>)~iu', trim($body), -1, PREG_SPLIT_NO_EMPTY);
        $identified = [];
        foreach ($parts ?: [] as $part) {
            if (!preg_match('~^<h2\b[^>]*\bid=[\'\"]([^\'\"]+)[\'\"][^>]*>~iu', $part, $matches)) {
                continue;
            }
            if (isset($identified[$matches[1]])) {
                throw new \RuntimeException(sprintf('Duplicate documentation section id "%s".', $matches[1]));
            }
            $identified[$matches[1]] = $part;
        }

        return $identified;
    }
}
