<?php

declare(strict_types=1);

namespace App\Documentation;

final class RoleContent
{
    /** @var list<string> */
    public const ROLES = [
        'player',
        'parent',
        'coach',
        'administration',
        'supporter',
        'staff',
        'treasurer',
        'equipment',
        'superadmin',
    ];

    /** @var array<string, string> */
    private const ROLE_IMAGES = [
        'player' => 'players/current-players.png',
        'parent' => 'clubs-teams/my-team.png',
        'coach' => 'coaches/current-coaches.png',
        'administration' => 'user-assignments/users.png',
        'supporter' => 'games/detail.png',
        'staff' => 'staff-assignments/staff.png',
        'treasurer' => 'cash-book/overview.png',
        'equipment' => 'inventory/overview.png',
        'superadmin' => 'admin/user-assignments.png',
    ];

    public function __construct(private readonly LocalizedContentRepository $repository)
    {
    }

    /** @return array<string, mixed> */
    public function overview(string $locale): array
    {
        $document = $this->repository->get('roles', $locale);
        $body = $document['body'];
        $guidesAt = strpos($body, '<div class="role-guides">');
        if ($guidesAt === false) {
            throw new \RuntimeException('The role overview does not contain the role guide collection.');
        }

        $intro = substr($body, 0, $guidesAt);
        $introSections = preg_split('~(?=<h2\b)~i', trim($intro), -1, PREG_SPLIT_NO_EMPTY) ?: [];
        if (count($introSections) < 2) {
            throw new \RuntimeException('The role overview cannot be separated from its detail guides.');
        }
        array_pop($introSections);
        $intro = implode("\n", array_filter(
            $introSections,
            static fn (string $section): bool => !str_contains($section, '<table'),
        ));

        $lastGuideAt = strrpos($body, '</section>');
        if ($lastGuideAt === false) {
            throw new \RuntimeException('The role overview does not contain complete role guides.');
        }
        $tail = substr($body, $lastGuideAt + strlen('</section>'));
        $tail = preg_replace('~^\s*</div>\s*~', '', $tail, 1) ?? $tail;
        $tailSections = preg_split('~(?=<h2\b)~i', trim($tail), -1, PREG_SPLIT_NO_EMPTY) ?: [];
        $commonSections = array_filter(
            $tailSections,
            static fn (string $section): bool => !str_contains($section, '<table'),
        );
        $document['body'] = $intro.implode("\n", $commonSections);

        $urlLocale = $locale === 'zh_Hans' ? 'zh-hans' : $locale;
        foreach (self::ROLES as $role) {
            $document['body'] = str_replace('href="#role-'.$role.'"', 'href="/'.$urlLocale.'/roles/'.$role.'"', $document['body']);
        }
        return $document;
    }

    /** @return array<string, mixed> */
    public function detail(string $role, string $locale): array
    {
        if (!in_array($role, self::ROLES, true)) {
            throw new \InvalidArgumentException(sprintf('Unknown role "%s".', $role));
        }

        $source = $this->repository->get('roles', $locale);
        if (!preg_match('~<section class="role-guide" id="role-'.preg_quote($role, '~').'">([\s\S]*?)</section>~', $source['body'], $section)) {
            throw new \RuntimeException(sprintf('Role guide "%s" is missing in locale "%s".', $role, $locale));
        }
        if (!preg_match('~<header class="role-guide__header">([\s\S]*?)</header>~', $section[1], $header)
            || !preg_match('~<h2>(.*?)</h2>\s*<p>(.*?)</p>~s', $header[1], $heading)) {
            throw new \RuntimeException(sprintf('Role guide "%s" has no usable heading.', $role));
        }

        $title = trim(strip_tags($heading[1]));
        $lead = trim(strip_tags($heading[2]));
        $body = str_replace($header[0], '', $section[1]);
        $body = preg_replace('~<a class="role-guide__back"[^>]*>[\s\S]*?</a>~', '', $body) ?? $body;
        $assetLocale = $locale === 'zh_Hans' ? 'zh-hans' : $locale;

        return [
            'title' => $title.' | Kaderblick Docs',
            'back_to_roles' => true,
            'hero' => [
                'heading' => $title,
                'lead' => $lead,
                'eyebrow' => $source['hero']['eyebrow'],
                'chips' => [],
            ],
            'body' => trim($body),
            'chapter_image' => [
                'src' => '/images/docs/'.$assetLocale.'/'.self::ROLE_IMAGES[$role],
                'alt' => $title,
                'caption' => $lead,
            ],
        ];
    }
}
