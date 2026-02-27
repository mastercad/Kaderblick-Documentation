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
            'app_spieler' => ['label' => 'Spieler', 'icon' => '⚽'],
            'app_trainer' => ['label' => 'Trainer', 'icon' => '🧑‍🏫'],
            'app_spiele' => ['label' => 'Spiele', 'icon' => '🏟️'],
            'app_kalender' => ['label' => 'Kalender & Termine', 'icon' => '📅'],
            'app_aufstellungen' => ['label' => 'Aufstellungen', 'icon' => '📋'],
            'app_turniere' => ['label' => 'Turniere', 'icon' => '🏆'],
            'app_video_analyse' => ['label' => 'Videos & Analyse', 'icon' => '🎬'],
            'app_nachrichten' => ['label' => 'Nachrichten', 'icon' => '💬'],
            'app_news' => ['label' => 'News', 'icon' => '📰'],
            'app_aufgaben' => ['label' => 'Aufgaben', 'icon' => '✅'],
            'app_umfragen' => ['label' => 'Umfragen', 'icon' => '📊'],
            'app_benachrichtigungen' => ['label' => 'Benachrichtigungen', 'icon' => '🔔'],
            'app_dashboard' => ['label' => 'Dashboard', 'icon' => '🖥️'],
            'app_berichte' => ['label' => 'Berichte', 'icon' => '📈'],
            'app_fahrgemeinschaften' => ['label' => 'Fahrgemeinschaften', 'icon' => '🚗'],
            'app_profil' => ['label' => 'Mein Profil', 'icon' => '👤'],
            'app_admin' => ['label' => 'Administration', 'icon' => '⚙️'],
            'app_xp_system' => ['label' => 'XP-System', 'icon' => '⭐'],
        ];
    }

    /**
     * Rendert ein Template mit automatisch injizierter Navigation und Active-State.
     */
    protected function renderDocs(string $template, string $activeRoute, array $parameters = []): Response
    {
        return $this->render($template, array_merge($parameters, [
            'navigation' => $this->getNavigation(),
            'active_route' => $activeRoute,
        ]));
    }
}
