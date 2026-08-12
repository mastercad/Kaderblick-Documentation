<?php

namespace App\Tests\Controller;

use PHPUnit\Framework\Attributes\DataProvider;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

final class DocsControllerTest extends WebTestCase
{
    public function testHomepage(): void
    {
        $client = static::createClient();
        $client->request('GET', '/');

        self::assertResponseIsSuccessful();
        self::assertSelectorTextContains('h1', 'Willkommen');
    }

    #[DataProvider('sectionUrlProvider')]
    public function testSectionPages(string $url, string $expectedHeading): void
    {
        $client = static::createClient();
        $client->request('GET', $url);

        self::assertResponseIsSuccessful();
        self::assertSelectorTextContains('h1', $expectedHeading);
    }

    public static function sectionUrlProvider(): iterable
    {
        yield 'Dashboard' => ['/dashboard', 'Dashboard'];
        yield 'Spieler' => ['/spieler', 'Spieler'];
        yield 'Beobachtungsliste' => ['/beobachtungsliste', 'Beobachtungsliste'];
        yield 'Quick-Event-Konfiguration' => ['/quick-event-konfiguration', 'Quick-Event-Konfiguration'];
        yield 'Spiele' => ['/spiele', 'Spiele'];
        yield 'Mein Spieltag' => ['/mein-spieltag', 'Mein Spieltag'];
        yield 'Aushelfen' => ['/aushelfen', 'Aushelfen'];
        yield 'fussball.de Import' => ['/fussball-de-import', 'fussball.de Import'];
        yield 'Team Size Guide' => ['/team-size-guide', 'Team Size Guide'];
        yield 'Aufgaben' => ['/aufgaben', 'Aufgaben'];
        yield 'XP-System' => ['/xp-system', 'XP-System'];
        yield 'Neuigkeiten' => ['/news', 'Neuigkeiten'];
        yield 'Umfragen' => ['/umfragen', 'Umfragen'];
        yield 'Wissenspool' => ['/wissenspool', 'Wissenspool'];
        yield 'Hall of Fame' => ['/hall-of-fame', 'Hall of Fame'];
    }

    public function testSidebarShowsActiveState(): void
    {
        $client = static::createClient();
        $crawler = $client->request('GET', '/spieler');

        self::assertResponseIsSuccessful();
        $activeLink = $crawler->filter('.sidebar__link--active');
        self::assertCount(1, $activeLink);
        self::assertStringContainsString('Spieler', $activeLink->text());
    }
}
