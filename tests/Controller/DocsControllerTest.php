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
        yield 'Spiele' => ['/spiele', 'Spiele'];
        yield 'Aufgaben' => ['/aufgaben', 'Aufgaben'];
        yield 'XP-System' => ['/xp-system', 'XP-System'];
        yield 'News' => ['/news', 'News'];
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
