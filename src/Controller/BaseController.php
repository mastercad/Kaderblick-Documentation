<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

/**
 * Basis-Controller für die Kaderblick-Dokumentation.
 * Stellt gemeinsame Navigationsdaten für alle Docs-Controller bereit.
 */
abstract class BaseController extends AbstractController
{
    /**
     * Gibt die Sidebar-Navigation zurück.
     * Jeder Eintrag: 'route' => 'Anzeigename'
     */
    protected function getNavigation(): array
    {
        return [
            'app_home' => ['label' => 'Übersicht', 'icon' => '🏠'],
            'app_erste_schritte' => ['label' => 'Erste Schritte', 'icon' => '🚀'],
            'app_authentifizierung' => ['label' => 'Anmelden & Registrieren', 'icon' => '🔐'],
            'app_vereine_teams' => ['label' => 'Vereine & Teams', 'icon' => '🏢'],
            'app_spieler' => ['label' => 'Spieler & Teams', 'icon' => '⚽'],
            'app_beobachtungsliste' => ['label' => 'Beobachtungsliste', 'icon' => '🔖'],
            'app_quick_event_konfiguration' => ['label' => 'Quick-Event-Konfiguration', 'icon' => '🎛️'],
            'app_trainer' => ['label' => 'Trainer', 'icon' => '🧑‍🏫'],
            'app_spiele' => ['label' => 'Spiele', 'icon' => '🏟️'],
            'app_mein_spieltag' => ['label' => 'Mein Spieltag', 'icon' => '🗓️'],
            'app_aushelfen' => ['label' => 'Aushelfen', 'icon' => '🤝'],
            'app_fussball_de_import' => ['label' => 'fussball.de Import', 'icon' => '📥'],
            'app_kalender' => ['label' => 'Kalender & Termine', 'icon' => '📅'],
            'app_team_size_guide' => ['label' => 'Team Size Guide', 'icon' => '👕'],
            'app_aufstellungen' => ['label' => 'Aufstellungen', 'icon' => '📋'],
            'app_turniere' => ['label' => 'Turniere', 'icon' => '🏆'],
            'app_video_analyse' => ['label' => 'Videos & Analyse', 'icon' => '🎬'],
            'app_nachrichten' => ['label' => 'Nachrichten', 'icon' => '💬'],
            'app_news' => ['label' => 'Neuigkeiten', 'icon' => '📰'],
            'app_umfragen' => ['label' => 'Umfragen', 'icon' => '📊'],
            'app_wissenspool' => ['label' => 'Wissenspool', 'icon' => '📚'],
            'app_hall_of_fame' => ['label' => 'Hall of Fame', 'icon' => '🏅'],
            'app_aufgaben' => ['label' => 'Aufgaben', 'icon' => '✅'],
            'app_benachrichtigungen' => ['label' => 'Benachrichtigungen', 'icon' => '🔔'],
            'app_mein_feedback' => ['label' => 'Mein Feedback', 'icon' => '💬'],
            'app_dashboard' => ['label' => 'Dashboard', 'icon' => '🖥️'],
            'app_berichte' => ['label' => 'Berichte', 'icon' => '📈'],
            'app_fahrgemeinschaften' => ['label' => 'Fahrgemeinschaften', 'icon' => '🚗'],
            'app_profil' => ['label' => 'Mein Profil', 'icon' => '👤'],
            'app_admin' => ['label' => 'Administration', 'icon' => '⚙️'],
            'app_xp_system' => ['label' => 'XP-System', 'icon' => '⭐'],
        ];
    }

    /**
     * Gibt die Sidebar-Navigation für Tools & Equipment zurück.
     */
    protected function getToolsNavigation(): array
    {
        return [
            'app_tools_kamera_systeme' => [
                'label' => 'Kamerasysteme',
                'icon' => '📷',
                'children' => [
                    'app_tools_kamera_kaderblick' => ['label' => 'Kaderblick-Kamera', 'icon' => '🎥'],
                    'app_tools_kamera_ptz' => ['label' => 'PTZ-Kamera', 'icon' => '🕹️'],
                    'app_tools_kamera_dji' => ['label' => 'DJI Osmo Action5 Pro', 'icon' => '🏃'],
                ],
            ],
            'app_tools_video_manager' => ['label' => 'VideoManager', 'icon' => '🎞️'],
            'app_tools_ball_marker_gui' => ['label' => 'BallMarkerGui', 'icon' => '🎯'],
            'app_tools_video_schnitt' => ['label' => 'VideoSchnitt', 'icon' => '✂️'],
            'app_tools_camera_simulator' => ['label' => 'CameraSimulator', 'icon' => '🎮'],
        ];
    }

    /**
     * Rendert ein Template mit automatisch injizierter Navigation und Active-State.
     */
    protected function renderDocs(string $template, string $activeRoute, array $parameters = []): Response
    {
        return $this->render($template, array_merge($parameters, [
            'navigation' => $this->getNavigation(),
            'tools_navigation' => $this->getToolsNavigation(),
            'active_route' => $activeRoute,
        ]));
    }
}
