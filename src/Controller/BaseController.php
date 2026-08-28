<?php

declare(strict_types=1);

namespace App\Controller;

use App\Documentation\LocalizedContentRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\RequestStack;
use App\Documentation\LongFormContent;

/**
 * Base controller for the Kaderblick documentation.
 * Provides shared navigation data for every documentation controller.
 */
abstract class BaseController extends AbstractController
{
    public function __construct(
        private readonly RequestStack $requestStack,
        private readonly LocalizedContentRepository $contentRepository,
    ) {
    }

    /**
     * Returns the sidebar navigation.
     * Each entry maps a route to its translated label and icon.
     */
    protected function getNavigation(): array
    {
        return [
            'docs_home' => ['label' => 'nav.overview', 'icon' => '🏠'],
            'docs_getting_started' => ['label' => 'nav.getting_started', 'icon' => '🚀'],
            'docs_roles' => ['label' => 'nav.roles', 'icon' => '🧭'],
            'docs_authentication' => ['label' => 'nav.authentication', 'icon' => '🔐'],
            'docs_clubs_teams' => ['label' => 'nav.clubs_teams', 'icon' => '🏢'],
            'docs_venues' => ['label' => 'nav.locations', 'icon' => '📍'],
            'docs_training_proofs' => ['label' => 'nav.training_proofs', 'icon' => '🏃'],
            'docs_clothing_sizes' => ['label' => 'nav.clothing_sizes', 'icon' => '👕'],
            'docs_players' => ['label' => 'nav.players', 'icon' => '⚽'],
            'docs_coaches' => ['label' => 'nav.coaches', 'icon' => '🧑‍🏫'],
            'docs_watchlist' => ['label' => 'nav.watchlist', 'icon' => '🔖'],
            'docs_games' => ['label' => 'nav.games', 'icon' => '🏟️'],
            'docs_quick_events' => ['label' => 'nav.quick_events', 'icon' => '⚡'],
            'docs_football_de_import' => ['label' => 'nav.fussball_de_import', 'icon' => '📥'],
            'docs_my_matchday' => ['label' => 'nav.my_matchday', 'icon' => '⚽'],
            'docs_help_out' => ['label' => 'nav.help_out', 'icon' => '🤝'],
            'docs_calendar' => ['label' => 'nav.calendar', 'icon' => '📅'],
            'docs_lineups' => ['label' => 'nav.formations', 'icon' => '📋'],
            'docs_tournaments' => ['label' => 'nav.tournaments', 'icon' => '🏆'],
            'docs_video_analysis' => ['label' => 'nav.video_analysis', 'icon' => '🎬'],
            'docs_messages' => ['label' => 'nav.messages', 'icon' => '💬'],
            'docs_news' => ['label' => 'nav.news', 'icon' => '📰'],
            'docs_tasks' => ['label' => 'nav.tasks', 'icon' => '✅'],
            'docs_surveys' => ['label' => 'nav.surveys', 'icon' => '📊'],
            'docs_notifications' => ['label' => 'nav.notifications', 'icon' => '🔔'],
            'docs_knowledge_pool' => ['label' => 'nav.knowledge', 'icon' => '📚'],
            'docs_feedback' => ['label' => 'nav.feedback', 'icon' => '💡'],
            'docs_dashboard' => ['label' => 'nav.dashboard', 'icon' => '🖥️'],
            'docs_reports' => ['label' => 'nav.reports', 'icon' => '📈'],
            'docs_car_pools' => ['label' => 'nav.rides', 'icon' => '🚗'],
            'docs_my_balance' => ['label' => 'nav.my_tab', 'icon' => '🍹'],
            'docs_cash_book' => ['label' => 'nav.cash_book', 'icon' => '💶'],
            'docs_billing' => ['label' => 'nav.billing', 'icon' => '💳'],
            'docs_inventory' => ['label' => 'nav.inventory', 'icon' => '📦'],
            'docs_profile' => ['label' => 'nav.profile', 'icon' => '👤'],
            'docs_administration' => ['label' => 'nav.admin', 'icon' => '⚙️'],
            'docs_user_assignments' => ['label' => 'nav.user_assignments', 'icon' => '👥'],
            'docs_staff_assignments' => ['label' => 'nav.function_assignments', 'icon' => '🪪'],
            'docs_xp_system' => ['label' => 'nav.xp', 'icon' => '⭐'],
            'docs_fines_catalogue' => ['label' => 'nav.penalties', 'icon' => '⚖️'],
        ];
    }

    /**
     * Returns the sidebar navigation for tools and equipment.
     */
    protected function getToolsNavigation(): array
    {
        return [
            'docs_camera_systems' => [
                'label' => 'nav.camera_systems',
                'icon' => '📷',
                'children' => [
                    'docs_kaderblick_camera' => ['label' => 'nav.kaderblick_camera', 'icon' => '🎥'],
                    'docs_ptz_camera' => ['label' => 'nav.ptz_camera', 'icon' => '🕹️'],
                    'docs_dji_camera' => ['label' => 'nav.dji_camera', 'icon' => '🏃'],
                ],
            ],
            'docs_video_manager' => ['label' => 'nav.video_manager', 'icon' => '🎞️'],
            'docs_analysis_player' => ['label' => 'nav.analysis_player', 'icon' => '▶️'],
            'docs_video_combiner' => ['label' => 'nav.video_combiner', 'icon' => '✂️'],
        ];
    }

    /** Groups the complete navigation for a structured sidebar. */
    protected function getNavigationGroups(): array
    {
        $navigation = $this->getNavigation();
        $routesByGroup = [
            'sidebar.group.start' => ['docs_home', 'docs_getting_started', 'docs_roles', 'docs_authentication', 'docs_dashboard'],
            'sidebar.group.team' => ['docs_clubs_teams', 'docs_venues', 'docs_training_proofs', 'docs_clothing_sizes', 'docs_players', 'docs_coaches', 'docs_watchlist', 'docs_profile'],
            'sidebar.group.matchday' => ['docs_calendar', 'docs_games', 'docs_quick_events', 'docs_football_de_import', 'docs_my_matchday', 'docs_help_out', 'docs_lineups', 'docs_tournaments', 'docs_video_analysis', 'docs_reports'],
            'sidebar.group.organisation' => ['docs_messages', 'docs_news', 'docs_tasks', 'docs_surveys', 'docs_knowledge_pool', 'docs_notifications', 'docs_feedback', 'docs_car_pools', 'docs_my_balance', 'docs_cash_book', 'docs_billing', 'docs_fines_catalogue', 'docs_inventory', 'docs_administration', 'docs_user_assignments', 'docs_staff_assignments', 'docs_xp_system'],
        ];

        $groups = [];
        foreach ($routesByGroup as $label => $routes) {
            $groups[$label] = array_intersect_key($navigation, array_flip($routes));
        }

        return $groups;
    }

    /**
     * Renders a template with navigation and active-route state.
     */
    protected function renderDocs(string $template, string $activeRoute, array $parameters = []): Response
    {
        $locale = $this->requestStack->getCurrentRequest()?->getLocale() ?? 'de';
        $page = str_ends_with($template, '/index.html.twig')
            ? substr($template, 0, -strlen('/index.html.twig'))
            : null;
        if (is_string($page) && $this->contentRepository->has($page)) {
            $parameters['document'] = $this->contentRepository->get($page, $locale);
            $fallbackImages = [
                'home' => 'dashboard/coaches-dashboard.png',
                'roles' => 'clubs-teams/my-team.png',
            ];
            if (!preg_match('~<img\b~i', $parameters['document']['body']) && isset($fallbackImages[$page])) {
                $assetLocale = $locale === 'zh_Hans' ? 'zh-hans' : $locale;
                $parameters['document']['chapter_image'] = [
                    'src' => '/images/docs/'.$assetLocale.'/'.$fallbackImages[$page],
                    'alt' => $parameters['document']['hero']['heading'],
                    'caption' => $parameters['document']['hero']['lead'],
                ];
            }
            $template = 'docs/page.html.twig';
        }

        return $this->render($template, array_merge($parameters, [
            'navigation' => $this->getNavigation(),
            'navigation_groups' => $this->getNavigationGroups(),
            'tools_navigation' => $this->getToolsNavigation(),
            'active_route' => $activeRoute,
        ]));
    }

    protected function renderLongFormOverview(string $page, string $activeRoute, LongFormContent $longForm): Response
    {
        $content = $longForm->overview($page, $this->currentLocale());

        return $this->renderDocs('docs/overview.html.twig', $activeRoute, array_merge($content, ['page' => $page]));
    }

    protected function currentLocale(): string
    {
        return $this->requestStack->getCurrentRequest()?->getLocale() ?? 'de';
    }
}
