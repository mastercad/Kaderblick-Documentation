<?php

namespace App\Tests\Controller;

use App\Documentation\LongFormContent;
use PHPUnit\Framework\Attributes\DataProvider;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

final class DocsControllerTest extends WebTestCase
{
    public function testHomepage(): void
    {
        $client = static::createClient();
        $client->request('GET', '/de/');

        self::assertResponseIsSuccessful();
        self::assertSelectorTextContains('h1', 'Kaderblick sicher verstehen und bedienen');
    }

    #[DataProvider('sectionUrlProvider')]
    public function testSectionPages(string $url, string $expectedHeading): void
    {
        $client = static::createClient();
        $client->request('GET', '/de'.$url);

        self::assertResponseIsSuccessful();
        self::assertSelectorTextContains('h1', $expectedHeading);
    }

    public static function sectionUrlProvider(): iterable
    {
        yield 'Dashboard' => ['/dashboard', 'Dashboard'];
        yield 'Spieler' => ['/players', 'Spieler'];
        yield 'Spiele' => ['/games', 'Spiele'];
        yield 'Aufgaben' => ['/tasks', 'Aufgaben'];
        yield 'XP-System' => ['/xp-system', 'XP, Level, Titel und Hall of Fame'];
        yield 'Neuigkeiten' => ['/news', 'Neuigkeiten'];
        yield 'Trainingsnachweise' => ['/training-proofs', 'Trainingsnachweise'];
        yield 'Strafenkatalog' => ['/fines-catalogue', 'Strafenkatalog'];
        yield 'Mein Deckel' => ['/my-balance', 'Mein Deckel'];
        yield 'Kassenbuch' => ['/cash-book', 'Kassenbuch'];
        yield 'Inventar' => ['/inventory', 'Inventar'];
        yield 'fussball.de-Import' => ['/football-de-import', 'fussball.de-Import'];
        yield 'Beobachtungsliste' => ['/watchlist', 'Beobachtungsliste'];
        yield 'Spielstätten' => ['/venues', 'Spielstätten'];
        yield 'Kleidergrößen' => ['/clothing-sizes', 'Kleidergrößen'];
        yield 'Quick Events' => ['/quick-events', 'Quick-Event-Konfigurationen'];
        yield 'Benutzer-Zuordnungen' => ['/user-assignments', 'Benutzer und Zuordnungen'];
        yield 'Funktionszuordnungen' => ['/staff-assignments', 'Staff- und Funktionärszuordnungen'];
        yield 'Abrechnung' => ['/billing', 'Abrechnung & Abo'];
        yield 'Wissenspool' => ['/knowledge-pool', 'Wissenspool'];
        yield 'Feedback' => ['/feedback', 'Feedback und Hilfe'];
        yield 'Mein Spieltag' => ['/my-matchday', 'Mein Spieltag'];
        yield 'Aushelfen' => ['/help-out', 'Aushelfen'];
        yield 'Kamerasysteme' => ['/tools/camera-systems', 'Kamerasysteme'];
        yield 'VideoManager' => ['/tools/video-manager', 'VideoManager'];
        yield 'Analyse Player' => ['/tools/analysis-player', 'Analyse Player'];
        yield 'Video Combiner' => ['/tools/video-combiner', 'Video Combiner'];
    }

    public function testSidebarShowsActiveState(): void
    {
        $client = static::createClient();
        $crawler = $client->request('GET', '/de/players');

        self::assertResponseIsSuccessful();
        $activeLink = $crawler->filter('.sidebar__link--active');
        self::assertCount(1, $activeLink);
        self::assertStringContainsString('Spieler', $activeLink->text());
    }

    public function testSidebarGroupsStartOpenAndContainTheVisibleActiveEntry(): void
    {
        $client = static::createClient();
        $crawler = $client->request('GET', '/de/inventory');

        self::assertResponseIsSuccessful();
        self::assertGreaterThan(1, $crawler->filter('.sidebar-group')->count());
        self::assertSame($crawler->filter('.sidebar-group')->count(), $crawler->filter('.sidebar-group[open]')->count());
        self::assertCount(1, $crawler->filter('.sidebar-group[open] .sidebar__link--active'));
    }

    #[DataProvider('documentationLocaleProvider')]
    public function testRoleCardsOpenCompleteLocalizedRolePaths(string $locale): void
    {
        $client = static::createClient();
        $crawler = $client->request('GET', '/'.$this->urlLocale($locale).'/roles');

        self::assertResponseIsSuccessful();
        self::assertCount(9, $crawler->filter('#role-selection ~ .feature-grid .feature-card'));
        self::assertCount(0, $crawler->filter('.role-guide'));
        self::assertCount(0, $crawler->filter('table'));

        foreach ($crawler->filter('#role-selection ~ .feature-grid .feature-card') as $card) {
            $target = $card->getAttribute('href');
            self::assertMatchesRegularExpression('~^/'.$this->urlLocale($locale).'/roles/[a-z-]+$~', $target);
            $detail = $client->request('GET', $target);
            self::assertResponseIsSuccessful();
            self::assertCount(1, $detail->filter('.role-guide__context'));
            self::assertGreaterThanOrEqual(5, $detail->filter('.role-area')->count());
            self::assertCount(1, $detail->filter('main img[src^="/images/docs/'.$this->urlLocale($locale).'/"]'));
        }
    }

    public static function documentationLocaleProvider(): iterable
    {
        yield 'German' => ['de'];
        yield 'English' => ['en'];
        yield 'French' => ['fr'];
        yield 'Russian' => ['ru'];
        yield 'Simplified Chinese' => ['zh_Hans'];
    }

    public function testLocalizedPagesUseOneSharedTemplateAndCompleteContentSets(): void
    {
        $projectDirectory = dirname(__DIR__, 2);
        $localizedTemplates = [];
        $templateFiles = new \RecursiveIteratorIterator(new \RecursiveDirectoryIterator($projectDirectory.'/templates'));
        foreach ($templateFiles as $templateFile) {
            if ($templateFile->isFile() && preg_match('/\.(?:en|fr|ru|zh_Hans)\.html\.twig$/', $templateFile->getFilename())) {
                $localizedTemplates[] = $templateFile->getPathname();
            }
        }
        self::assertSame([], $localizedTemplates, 'Language-specific Twig templates must not be reintroduced.');

        $germanFiles = glob($projectDirectory.'/content/de/**/*.json', GLOB_BRACE) ?: [];
        $germanFiles = array_merge($germanFiles, glob($projectDirectory.'/content/de/*.json') ?: []);
        self::assertCount(44, array_unique($germanFiles));

        foreach (['en', 'fr', 'ru', 'zh_Hans'] as $locale) {
            foreach (array_unique($germanFiles) as $germanFile) {
                $relativePath = substr($germanFile, strlen($projectDirectory.'/content/de/'));
                self::assertFileExists($projectDirectory.'/content/'.$locale.'/'.$relativePath);
            }
        }
    }

    public function testSearchControlsAreLocalizedAndAccessible(): void
    {
        $client = static::createClient();
        $crawler = $client->request('GET', '/fr/');

        self::assertResponseIsSuccessful();
        self::assertCount(1, $crawler->filter('[data-docs-search][role="search"]'));
        self::assertSame('fr', $crawler->filter('[data-docs-search]')->attr('data-locale'));
        self::assertSame('false', $crawler->filter('[data-search-input]')->attr('aria-expanded'));
        self::assertSame('Saisir une rubrique, une fonction ou une question', $crawler->filter('[data-search-input]')->attr('placeholder'));
    }

    #[DataProvider('longFormOverviewProvider')]
    public function testLongFormPagesAreTaskBasedOverviews(string $url, int $chapterCount): void
    {
        $client = static::createClient();
        $crawler = $client->request('GET', '/de'.$url);

        self::assertResponseIsSuccessful();
        self::assertCount($chapterCount, $crawler->filter('.guide-grid .guide-card'));
        self::assertCount(0, $crawler->filter('.on-this-page'));
    }

    public static function longFormOverviewProvider(): iterable
    {
        yield 'Getting started' => ['/getting-started', 4];
        yield 'Reports' => ['/reports', 4];
        yield 'Calendar' => ['/calendar', 6];
        yield 'Games' => ['/games', 5];
        yield 'Profile' => ['/profile', 6];
        yield 'Dashboard' => ['/dashboard', 4];
        yield 'Line-ups' => ['/lineups', 4];
        yield 'Clubs and teams' => ['/clubs-teams', 5];
    }

    public function testLongFormSectionsUseExplicitStableIdsInEveryLocale(): void
    {
        $projectDirectory = dirname(__DIR__, 2);
        foreach (['getting-started', 'reports', 'calendar', 'games', 'profile', 'dashboard', 'lineups', 'clubs-teams'] as $page) {
            $reference = null;
            foreach (['de', 'en', 'fr', 'ru', 'zh_Hans'] as $locale) {
                $content = json_decode((string) file_get_contents($projectDirectory.'/content/'.$locale.'/'.$page.'.json'), true, 512, JSON_THROW_ON_ERROR);
                preg_match_all("~<h2\\b[^>]*\\bid=['\"]([^'\"]+)['\"]~", $content['body'], $matches);
                self::assertNotEmpty($matches[1], $locale.'/'.$page.' must contain explicit section ids.');
                self::assertSame($matches[1], array_values(array_unique($matches[1])), $locale.'/'.$page.' section ids must be unique.');
                $reference ??= $matches[1];
                self::assertSame($reference, $matches[1], $locale.'/'.$page.' must use the same semantic section ids.');
            }
        }
    }

    public function testEveryLongFormChapterHasAtLeastOneLocalizedImage(): void
    {
        $content = static::getContainer()->get(LongFormContent::class);
        foreach (['de', 'en', 'fr', 'ru', 'zh_Hans'] as $locale) {
            foreach (['getting-started', 'reports', 'calendar', 'games', 'profile', 'dashboard', 'lineups', 'clubs-teams'] as $page) {
                foreach ($content->overview($page, $locale)['sections'] as $chapter) {
                    $document = $content->section($page, $chapter['slug'], $locale)['document'];
                    self::assertTrue(
                        preg_match('~<img\b~i', $document['body']) === 1 || isset($document['chapter_image']),
                        sprintf('%s/%s/%s has no image.', $locale, $page, $chapter['slug']),
                    );
                    if (isset($document['chapter_image'])) {
                        self::assertStringStartsWith('/images/docs/'.$this->urlLocale($locale).'/', $document['chapter_image']['src']);
                    }
                }
            }
        }
    }

    #[DataProvider('documentationLocaleProvider')]
    public function testLandingPagesUseTheirIntentionalVisualStructure(string $locale): void
    {
        $client = static::createClient();
        foreach (['/' => 1, '/roles' => 0] as $path => $expectedImages) {
            $crawler = $client->request('GET', '/'.$this->urlLocale($locale).$path);
            self::assertResponseIsSuccessful();
            self::assertCount($expectedImages, $crawler->filter('main img[src^="/images/docs/'.$this->urlLocale($locale).'/"]'));
            if ($path === '/roles') {
                self::assertCount(9, $crawler->filter('.feature-card'));
            }
        }
    }

    #[DataProvider('documentationLocaleProvider')]
    public function testLongFormChapterKeepsLocalizedContentAndChapterNavigation(string $locale): void
    {
        $client = static::createClient();
        $crawler = $client->request('GET', '/'.$this->urlLocale($locale).'/reports/report-builder-and-dashboard');

        self::assertResponseIsSuccessful();
        self::assertCount(1, $crawler->filter('.chapter-breadcrumb'));
        self::assertCount(1, $crawler->filter('.chapter-navigation'));
        self::assertCount(1, $crawler->filter('[data-page-toc]'));
        self::assertCount(1, $crawler->filter('script[src*="docs-images.js"]'));
    }

    #[DataProvider('documentationLocaleProvider')]
    public function testEveryDocumentationPageLoadsTheLocalizedTableOfContents(string $locale): void
    {
        $client = static::createClient();
        $crawler = $client->request('GET', '/'.$this->urlLocale($locale).'/calendar');

        self::assertResponseIsSuccessful();
        self::assertNotSame('', $crawler->filter('#main-content')->attr('data-toc-title'));
        self::assertCount(1, $crawler->filter('script[src*="docs-toc.js"]'));
    }

    #[DataProvider('localizedPageProvider')]
    public function testLocalizedPageUsesCompleteLocaleTemplate(string $url, string $locale, string $heading): void
    {
        $client = static::createClient();
        $client->request('GET', '/'.$this->urlLocale($locale).($url === '/' ? '/' : $url));

        self::assertResponseIsSuccessful();
        self::assertSelectorTextContains('h1', $heading);
        self::assertGreaterThan(80, mb_strlen($client->getCrawler()->filter('main')->text()), 'Localized main content must be complete.');
    }

    public static function localizedPageProvider(): iterable
    {
        yield 'Analyse Player English' => ['/tools/analysis-player', 'en', 'Kaderblick Analyse Player'];
        yield 'Analyse Player French' => ['/tools/analysis-player', 'fr', 'Kaderblick Analyse Player'];
        yield 'Analyse Player Russian' => ['/tools/analysis-player', 'ru', 'Kaderblick Analyse Player'];
        yield 'Analyse Player Simplified Chinese' => ['/tools/analysis-player', 'zh_Hans', 'Kaderblick Analyse Player'];
        yield 'Video Combiner English' => ['/tools/video-combiner', 'en', 'Kaderblick Video Combiner'];
        yield 'Video Combiner French' => ['/tools/video-combiner', 'fr', 'Kaderblick Video Combiner'];
        yield 'Video Combiner Russian' => ['/tools/video-combiner', 'ru', 'Kaderblick Video Combiner'];
        yield 'Video Combiner Simplified Chinese' => ['/tools/video-combiner', 'zh_Hans', 'Kaderblick Video Combiner'];
        yield 'Video Manager English' => ['/tools/video-manager', 'en', 'Kaderblick Video Manager'];
        yield 'Video Manager French' => ['/tools/video-manager', 'fr', 'Kaderblick Video Manager'];
        yield 'Video Manager Russian' => ['/tools/video-manager', 'ru', 'Kaderblick Video Manager'];
        yield 'Video Manager Simplified Chinese' => ['/tools/video-manager', 'zh_Hans', 'Kaderblick Video Manager'];
        yield 'Roles English' => ['/roles', 'en', 'Which help is relevant to me?'];
        yield 'Roles French' => ['/roles', 'fr', 'Quelle aide correspond à ma situation ?'];
        yield 'Roles Russian' => ['/roles', 'ru', 'Какой раздел помощи подходит мне?'];
        yield 'Roles Simplified Chinese' => ['/roles', 'zh_Hans', '哪些帮助内容与我有关？'];
        yield 'Profile English' => ['/profile', 'en', 'My profile'];
        yield 'Profile French' => ['/profile', 'fr', 'Mon profil'];
        yield 'Profile Russian' => ['/profile', 'ru', 'Мой профиль'];
        yield 'Profile Simplified Chinese' => ['/profile', 'zh_Hans', '我的个人资料'];
        yield 'XP English' => ['/xp-system', 'en', 'XP, levels, titles and Hall of Fame'];
        yield 'XP French' => ['/xp-system', 'fr', 'XP, niveaux, titres et Hall of Fame'];
        yield 'XP Russian' => ['/xp-system', 'ru', 'XP, уровни, звания и Hall of Fame'];
        yield 'XP Simplified Chinese' => ['/xp-system', 'zh_Hans', 'XP、等级、称号与 Hall of Fame'];
        yield 'Authentication English' => ['/authentication', 'en', 'Sign in, register and regain account access'];
        yield 'Authentication French' => ['/authentication', 'fr', 'Se connecter, s’inscrire et récupérer l’accès au compte'];
        yield 'Authentication Russian' => ['/authentication', 'ru', 'Вход, регистрация и восстановление доступа'];
        yield 'Authentication Simplified Chinese' => ['/authentication', 'zh_Hans', '登录、注册与恢复账户访问'];
        yield 'Getting started English' => ['/getting-started', 'en', 'Getting started with Kaderblick'];
        yield 'Getting started French' => ['/getting-started', 'fr', 'Premiers pas avec Kaderblick'];
        yield 'Getting started Russian' => ['/getting-started', 'ru', 'Начало работы с Kaderblick'];
        yield 'Getting started Simplified Chinese' => ['/getting-started', 'zh_Hans', '开始使用 Kaderblick'];
        yield 'Dashboard English' => ['/dashboard', 'en', 'Use and customise the dashboard'];
        yield 'Dashboard French' => ['/dashboard', 'fr', 'Utiliser et personnaliser le tableau de bord'];
        yield 'Dashboard Russian' => ['/dashboard', 'ru', 'Использование и настройка панели'];
        yield 'Dashboard Simplified Chinese' => ['/dashboard', 'zh_Hans', '使用和定制仪表板'];
        yield 'Calendar English' => ['/calendar', 'en', 'Calendar and appointments'];
        yield 'Calendar French' => ['/calendar', 'fr', 'Calendrier et rendez-vous'];
        yield 'Calendar Russian' => ['/calendar', 'ru', 'Календарь и мероприятия'];
        yield 'Calendar Simplified Chinese' => ['/calendar', 'zh_Hans', '日历与日程'];
        yield 'Messages English' => ['/messages', 'en', 'Messages'];
        yield 'Messages French' => ['/messages', 'fr', 'Messages'];
        yield 'Messages Russian' => ['/messages', 'ru', 'Сообщения'];
        yield 'Messages Simplified Chinese' => ['/messages', 'zh_Hans', '消息'];
        yield 'Notifications English' => ['/notifications', 'en', 'Notifications'];
        yield 'Notifications French' => ['/notifications', 'fr', 'Notifications'];
        yield 'Notifications Russian' => ['/notifications', 'ru', 'Уведомления'];
        yield 'Notifications Simplified Chinese' => ['/notifications', 'zh_Hans', '通知'];
        yield 'Tasks English' => ['/tasks', 'en', 'Tasks'];
        yield 'Tasks French' => ['/tasks', 'fr', 'Tâches'];
        yield 'Tasks Russian' => ['/tasks', 'ru', 'Задачи'];
        yield 'Tasks Simplified Chinese' => ['/tasks', 'zh_Hans', '任务'];
        yield 'News English' => ['/news', 'en', 'News'];
        yield 'News French' => ['/news', 'fr', 'Actualités'];
        yield 'News Russian' => ['/news', 'ru', 'Новости'];
        yield 'News Simplified Chinese' => ['/news', 'zh_Hans', '动态'];
        yield 'Surveys English' => ['/surveys', 'en', 'Surveys'];
        yield 'Surveys French' => ['/surveys', 'fr', 'Sondages'];
        yield 'Surveys Russian' => ['/surveys', 'ru', 'Опросы'];
        yield 'Surveys Simplified Chinese' => ['/surveys', 'zh_Hans', '问卷'];
        yield 'Players English' => ['/players', 'en', 'Players'];
        yield 'Players French' => ['/players', 'fr', 'Joueurs'];
        yield 'Players Russian' => ['/players', 'ru', 'Игроки'];
        yield 'Players Simplified Chinese' => ['/players', 'zh_Hans', '球员'];
        yield 'Coaches English' => ['/coaches', 'en', 'Coaches'];
        yield 'Coaches French' => ['/coaches', 'fr', 'Entraîneurs'];
        yield 'Coaches Russian' => ['/coaches', 'ru', 'Тренеры'];
        yield 'Coaches Simplified Chinese' => ['/coaches', 'zh_Hans', '教练'];
        yield 'Clubs and teams English' => ['/clubs-teams', 'en', 'Clubs and teams'];
        yield 'Clubs and teams French' => ['/clubs-teams', 'fr', 'Clubs et équipes'];
        yield 'Clubs and teams Russian' => ['/clubs-teams', 'ru', 'Клубы и команды'];
        yield 'Clubs and teams Simplified Chinese' => ['/clubs-teams', 'zh_Hans', '俱乐部与球队'];
        yield 'Matches English' => ['/games', 'en', 'Matches and tournaments'];
        yield 'Matches French' => ['/games', 'fr', 'Matchs et tournois'];
        yield 'Matches Russian' => ['/games', 'ru', 'Матчи и турниры'];
        yield 'Matches Simplified Chinese' => ['/games', 'zh_Hans', '比赛与锦标赛'];
        yield 'Line-ups English' => ['/lineups', 'en', 'Line-up templates'];
        yield 'Line-ups French' => ['/lineups', 'fr', 'Modèles de composition'];
        yield 'Line-ups Russian' => ['/lineups', 'ru', 'Шаблоны составов'];
        yield 'Line-ups Simplified Chinese' => ['/lineups', 'zh_Hans', '阵容模板'];
        yield 'Tournaments English' => ['/tournaments', 'en', 'Tournaments'];
        yield 'Tournaments French' => ['/tournaments', 'fr', 'Tournois'];
        yield 'Tournaments Russian' => ['/tournaments', 'ru', 'Турниры'];
        yield 'Tournaments Simplified Chinese' => ['/tournaments', 'zh_Hans', '锦标赛'];
        yield 'Home English' => ['/', 'en', 'Understand and use Kaderblick with confidence'];
        yield 'Home French' => ['/', 'fr', 'Comprendre et utiliser Kaderblick en toute confiance'];
        yield 'Home Russian' => ['/', 'ru', 'Уверенно понимать и использовать Kaderblick'];
        yield 'Home Simplified Chinese' => ['/', 'zh_Hans', '安心了解并使用 Kaderblick'];
        yield 'My matchday English' => ['/my-matchday', 'en', 'My matchday'];
        yield 'My matchday French' => ['/my-matchday', 'fr', 'Mon jour de match'];
        yield 'My matchday Russian' => ['/my-matchday', 'ru', 'Мой игровой день'];
        yield 'My matchday Simplified Chinese' => ['/my-matchday', 'zh_Hans', '我的比赛日'];
        yield 'Helping another team English' => ['/help-out', 'en', 'Helping another team'];
        yield 'Helping another team French' => ['/help-out', 'fr', 'Renfort dans une autre équipe'];
        yield 'Helping another team Russian' => ['/help-out', 'ru', 'Помощь другой команде'];
        yield 'Helping another team Simplified Chinese' => ['/help-out', 'zh_Hans', '支援其他球队'];
        yield 'Car shares English' => ['/car-pools', 'en', 'Car shares'];
        yield 'Car shares French' => ['/car-pools', 'fr', 'Covoiturage'];
        yield 'Car shares Russian' => ['/car-pools', 'ru', 'Совместные поездки'];
        yield 'Car shares Simplified Chinese' => ['/car-pools', 'zh_Hans', '拼车'];
        yield 'Watchlist English' => ['/watchlist', 'en', 'Watchlist'];
        yield 'Watchlist French' => ['/watchlist', 'fr', 'Liste de suivi'];
        yield 'Watchlist Russian' => ['/watchlist', 'ru', 'Список наблюдения'];
        yield 'Watchlist Simplified Chinese' => ['/watchlist', 'zh_Hans', '关注名单'];
        yield 'Quick Events English' => ['/quick-events', 'en', 'Quick Event configurations'];
        yield 'Quick Events French' => ['/quick-events', 'fr', 'Configurations Quick Event'];
        yield 'Quick Events Russian' => ['/quick-events', 'ru', 'Конфигурации быстрых событий'];
        yield 'Quick Events Simplified Chinese' => ['/quick-events', 'zh_Hans', '快速事件配置'];
        yield 'Clothing sizes English' => ['/clothing-sizes', 'en', 'Clothing sizes'];
        yield 'Clothing sizes French' => ['/clothing-sizes', 'fr', 'Tailles de vêtements'];
        yield 'Clothing sizes Russian' => ['/clothing-sizes', 'ru', 'Размеры одежды'];
        yield 'Clothing sizes Simplified Chinese' => ['/clothing-sizes', 'zh_Hans', '服装尺码'];
        yield 'Venues English' => ['/venues', 'en', 'Venues'];
        yield 'Venues French' => ['/venues', 'fr', 'Lieux de rencontre'];
        yield 'Venues Russian' => ['/venues', 'ru', 'Спортивные объекты'];
        yield 'Venues Simplified Chinese' => ['/venues', 'zh_Hans', '比赛场地'];
        yield 'Training evidence English' => ['/training-proofs', 'en', 'Training evidence'];
        yield 'Training evidence French' => ['/training-proofs', 'fr', 'Justificatifs d’entraînement'];
        yield 'Training evidence Russian' => ['/training-proofs', 'ru', 'Подтверждения тренировок'];
        yield 'Training evidence Simplified Chinese' => ['/training-proofs', 'zh_Hans', '训练证明'];
        yield 'Fines catalogue English' => ['/fines-catalogue', 'en', 'Fines catalogue'];
        yield 'Fines catalogue French' => ['/fines-catalogue', 'fr', 'Catalogue des amendes'];
        yield 'Fines catalogue Russian' => ['/fines-catalogue', 'ru', 'Каталог штрафов'];
        yield 'Fines catalogue Simplified Chinese' => ['/fines-catalogue', 'zh_Hans', '罚款目录'];
        yield 'My balance English' => ['/my-balance', 'en', 'My balance'];
        yield 'My balance French' => ['/my-balance', 'fr', 'Mon solde'];
        yield 'My balance Russian' => ['/my-balance', 'ru', 'Мой баланс'];
        yield 'My balance Simplified Chinese' => ['/my-balance', 'zh_Hans', '我的账目'];
        yield 'Cashbook English' => ['/cash-book', 'en', 'Cashbook'];
        yield 'Cashbook French' => ['/cash-book', 'fr', 'Livre de caisse'];
        yield 'Cashbook Russian' => ['/cash-book', 'ru', 'Кассовая книга'];
        yield 'Cashbook Simplified Chinese' => ['/cash-book', 'zh_Hans', '现金账簿'];
        yield 'Inventory English' => ['/inventory', 'en', 'Inventory'];
        yield 'Inventory French' => ['/inventory', 'fr', 'Inventaire'];
        yield 'Inventory Russian' => ['/inventory', 'ru', 'Инвентарь'];
        yield 'Inventory Simplified Chinese' => ['/inventory', 'zh_Hans', '库存'];
        yield 'fussball.de import English' => ['/football-de-import', 'en', 'fussball.de import'];
        yield 'fussball.de import French' => ['/football-de-import', 'fr', 'Import fussball.de'];
        yield 'fussball.de import Russian' => ['/football-de-import', 'ru', 'Импорт fussball.de'];
        yield 'fussball.de import Simplified Chinese' => ['/football-de-import', 'zh_Hans', 'fussball.de 导入'];
        yield 'Knowledge pool English' => ['/knowledge-pool', 'en', 'Knowledge pool'];
        yield 'Knowledge pool French' => ['/knowledge-pool', 'fr', 'Base de connaissances'];
        yield 'Knowledge pool Russian' => ['/knowledge-pool', 'ru', 'База знаний'];
        yield 'Knowledge pool Simplified Chinese' => ['/knowledge-pool', 'zh_Hans', '知识库'];
        yield 'Feedback English' => ['/feedback', 'en', 'Feedback and help'];
        yield 'Feedback French' => ['/feedback', 'fr', 'Retours et aide'];
        yield 'Feedback Russian' => ['/feedback', 'ru', 'Обратная связь и помощь'];
        yield 'Feedback Simplified Chinese' => ['/feedback', 'zh_Hans', '反馈与帮助'];
        yield 'Video analysis English' => ['/video-analysis', 'en', 'Videos and match analysis'];
        yield 'Video analysis French' => ['/video-analysis', 'fr', 'Vidéos et analyse de match'];
        yield 'Video analysis Russian' => ['/video-analysis', 'ru', 'Видео и анализ матча'];
        yield 'Video analysis Simplified Chinese' => ['/video-analysis', 'zh_Hans', '视频与比赛分析'];
        yield 'Reports English' => ['/reports', 'en', 'Reports'];
        yield 'Reports French' => ['/reports', 'fr', 'Rapports'];
        yield 'Reports Russian' => ['/reports', 'ru', 'Отчёты'];
        yield 'Reports Simplified Chinese' => ['/reports', 'zh_Hans', '报表'];
        yield 'Users and assignments English' => ['/user-assignments', 'en', 'Users and assignments'];
        yield 'Users and assignments French' => ['/user-assignments', 'fr', 'Utilisateurs et affectations'];
        yield 'Users and assignments Russian' => ['/user-assignments', 'ru', 'Пользователи и назначения'];
        yield 'Users and assignments Simplified Chinese' => ['/user-assignments', 'zh_Hans', '用户与分配'];
        yield 'Staff and officials English' => ['/staff-assignments', 'en', 'Staff and official assignments'];
        yield 'Staff and officials French' => ['/staff-assignments', 'fr', 'Affectations du staff et des dirigeants'];
        yield 'Staff and officials Russian' => ['/staff-assignments', 'ru', 'Назначения штаба и официальных лиц'];
        yield 'Staff and officials Simplified Chinese' => ['/staff-assignments', 'zh_Hans', '工作人员与职务分配'];
        yield 'Administration English' => ['/admin', 'en', 'Administration, cashbook and inventory'];
        yield 'Administration French' => ['/admin', 'fr', 'Administration, caisse et inventaire'];
        yield 'Administration Russian' => ['/admin', 'ru', 'Администрирование, касса и инвентарь'];
        yield 'Administration Simplified Chinese' => ['/admin', 'zh_Hans', '管理、财务与库存'];
        yield 'Billing English' => ['/billing', 'en', 'Billing & subscription'];
        yield 'Billing French' => ['/billing', 'fr', 'Facturation & abonnement'];
        yield 'Billing Russian' => ['/billing', 'ru', 'Оплата и подписка'];
        yield 'Billing Simplified Chinese' => ['/billing', 'zh_Hans', '结算与订阅'];
    }

    #[DataProvider('cameraPageProvider')]
    public function testExistingCameraPagesRemainAvailable(string $url, string $heading): void
    {
        $client = static::createClient();
        $client->request('GET', '/de'.$url);

        self::assertResponseIsSuccessful();
        self::assertSelectorTextContains('h1', $heading);
    }

    public static function cameraPageProvider(): iterable
    {
        yield 'Camera overview' => ['/tools/camera-systems', 'Kamerasysteme'];
        yield 'Kaderblick camera overview' => ['/tools/camera/kaderblick', 'Kaderblick-Kamera'];
        yield 'Kaderblick camera build' => ['/tools/camera/kaderblick/assembly', 'Bauanleitung'];
        yield 'Kaderblick camera 3D' => ['/tools/camera/kaderblick/3d-view', '3D-Ansicht'];
        yield 'Kaderblick camera software' => ['/tools/camera/kaderblick/software', 'Software'];
        yield 'Kaderblick camera parts' => ['/tools/camera/kaderblick/parts-list', 'Teileliste'];
        yield 'PTZ overview' => ['/tools/camera/ptz', 'PTZ-Kamera'];
        yield 'PTZ build' => ['/tools/camera/ptz/assembly', 'Bauanleitung'];
        yield 'PTZ 3D' => ['/tools/camera/ptz/3d-view', '3D-Ansicht'];
        yield 'PTZ software' => ['/tools/camera/ptz/software', 'Software'];
        yield 'PTZ parts' => ['/tools/camera/ptz/parts-list', 'Teileliste'];
        yield 'DJI camera' => ['/tools/camera/dji-osmo', 'DJI Osmo Action5 Pro'];
    }

    public function testEveryLegacyDocumentationUrlRedirectsToItsEnglishCanonicalUrl(): void
    {
        $client = static::createClient();
        $router = static::getContainer()->get('router');
        $legacyRouteCount = 0;

        foreach ($router->getRouteCollection() as $routeName => $route) {
            if (!str_starts_with((string) $routeName, 'legacy_')) {
                continue;
            }

            ++$legacyRouteCount;
            $canonicalRouteName = $route->getDefault('route');
            self::assertIsString($canonicalRouteName);
            self::assertStringStartsWith('docs_', $canonicalRouteName);

            $legacyPath = str_replace('{lang}', 'fr', $route->getPath());
            $client->request('GET', $legacyPath);

            self::assertResponseRedirects($router->generate($canonicalRouteName, ['lang' => 'fr']), 301);
        }

        self::assertSame(47, $legacyRouteCount);
    }

    public function testRenderedDocumentationLinksUseCanonicalEnglishPaths(): void
    {
        $client = static::createClient();
        $crawler = $client->request('GET', '/de/');

        self::assertResponseIsSuccessful();

        $legacyPathSegments = [
            'abrechnung', 'aufgaben', 'aufstellungen', 'aushelfen', 'authentifizierung',
            'benachrichtigungen', 'benutzer-zuordnungen', 'beobachtungsliste', 'berichte',
            'erste-schritte', 'fahrgemeinschaften', 'inventar', 'kalender', 'kassenbuch',
            'kleidergroessen', 'mein-deckel', 'mein-spieltag', 'nachrichten', 'profil',
            'rollen', 'spiele', 'spieler', 'spielstaetten', 'strafenkatalog', 'trainer',
            'trainingsnachweise', 'turniere', 'umfragen', 'vereine-teams', 'video-analyse',
            'wissenspool', 'kamera', 'bauanleitung', 'teileliste', '3d-ansicht',
        ];

        foreach ($crawler->filter('a[href]') as $link) {
            $href = $link->getAttribute('href');
            if (!str_starts_with($href, '/')) {
                continue;
            }

            foreach ($legacyPathSegments as $legacyPathSegment) {
                self::assertDoesNotMatchRegularExpression(
                    sprintf('~(?:^|/)%s(?:/|$)~', preg_quote($legacyPathSegment, '~')),
                    parse_url($href, PHP_URL_PATH) ?? '',
                    sprintf('Internal link "%s" contains the legacy segment "%s".', $href, $legacyPathSegment),
                );
            }
        }
    }

    public function testNeutralUrlUsesGermanWhenNoSupportedBrowserLanguageIsAvailable(): void
    {
        $client = static::createClient();
        $client->request('GET', '/calendar', server: ['HTTP_ACCEPT_LANGUAGE' => '']);

        self::assertResponseRedirects('/de/calendar', 302);
        self::assertSame('Accept-Language', $client->getResponse()->headers->get('Vary'));
    }

    public function testCrawlerWithoutLanguageHeaderUsesGermanDefault(): void
    {
        $client = static::createClient();
        $client->request('GET', '/', server: [
            'HTTP_ACCEPT_LANGUAGE' => '',
            'HTTP_USER_AGENT' => 'Googlebot/2.1',
        ]);

        self::assertResponseRedirects('/de/', 302);
    }

    public function testNeutralUrlUsesSupportedBrowserLanguage(): void
    {
        $client = static::createClient();
        $client->request('GET', '/calendar', server: ['HTTP_ACCEPT_LANGUAGE' => 'fr-FR,fr;q=0.9,en;q=0.8']);

        self::assertResponseRedirects('/fr/calendar', 302);
    }

    public function testLegacyLanguageQueryRedirectsToLanguagePathAndKeepsOtherQueryParameters(): void
    {
        $client = static::createClient();
        $client->request('GET', '/calendar?lang=zh_Hans&view=month');

        self::assertResponseRedirects('/zh-hans/calendar?view=month', 302);
    }

    public function testExplicitLocaleUrlIsCanonicalAndProvidesAllLanguageAlternates(): void
    {
        $client = static::createClient();
        $crawler = $client->request('GET', '/en/calendar', server: ['HTTP_HOST' => 'docs.kaderblick.test']);

        self::assertResponseIsSuccessful();
        self::assertSame('en', $crawler->filter('html')->attr('lang'));
        self::assertSame('http://docs.kaderblick.test/en/calendar', $crawler->filter('link[rel="canonical"]')->attr('href'));
        self::assertCount(6, $crawler->filter('link[rel="alternate"][hreflang]'));
        self::assertSame('http://docs.kaderblick.test/de/calendar', $crawler->filter('link[hreflang="x-default"]')->attr('href'));
    }

    public function testRenderedContentLinksAndImagesRemainInTheSelectedLanguageContext(): void
    {
        $client = static::createClient();
        $crawler = $client->request('GET', '/fr/dashboard');

        self::assertResponseIsSuccessful();
        foreach ($crawler->filter('main a[href]') as $link) {
            $href = $link->getAttribute('href');
            if ($href === '' || str_starts_with($href, '#') || preg_match('~^(?:https?:)?//~', $href)) {
                continue;
            }
            self::assertStringStartsWith('/fr/', $href, sprintf('Internal content link "%s" loses the selected locale.', $href));
        }
        foreach ($crawler->filter('main img[src]') as $image) {
            self::assertStringStartsWith('/images/', $image->getAttribute('src'));
        }
    }

    public function testRobotsFileAllowsCrawlingAndReferencesTheSitemap(): void
    {
        $client = static::createClient();
        $client->request('GET', '/robots.txt', server: ['HTTP_HOST' => 'docs.kaderblick.test']);

        self::assertResponseIsSuccessful();
        self::assertResponseHeaderSame('Content-Type', 'text/plain; charset=UTF-8');
        $body = (string) $client->getResponse()->getContent();
        self::assertStringContainsString("User-agent: *\nAllow: /", $body);
        self::assertStringContainsString('Sitemap: http://docs.kaderblick.test/sitemap.xml', $body);
    }

    public function testSitemapContainsCanonicalLocalizedPagesAndLanguageAlternates(): void
    {
        $client = static::createClient();
        $client->request('GET', '/sitemap.xml', server: ['HTTP_HOST' => 'docs.kaderblick.test']);

        self::assertResponseIsSuccessful();
        self::assertResponseHeaderSame('Content-Type', 'application/xml; charset=UTF-8');
        $xml = new \DOMDocument();
        self::assertTrue($xml->loadXML((string) $client->getResponse()->getContent()));
        $xpath = new \DOMXPath($xml);
        $xpath->registerNamespace('s', 'http://www.sitemaps.org/schemas/sitemap/0.9');
        $xpath->registerNamespace('xhtml', 'http://www.w3.org/1999/xhtml');

        self::assertGreaterThan(500, $xpath->query('//s:url')->length);
        self::assertSame(0, $xpath->query('//s:loc[.="http://docs.kaderblick.test/calendar"]')->length);
        self::assertSame(0, $xpath->query('//s:loc[contains(., "/tools/ball-marker-gui")]')->length);
        self::assertSame(0, $xpath->query('//s:loc[contains(., "/tools/camera-simulator")]')->length);
        foreach (['/de/', '/en/calendar', '/zh-hans/roles/player', '/fr/clubs-teams/club-and-season'] as $path) {
            self::assertSame(1, $xpath->query(sprintf('//s:loc[.="http://docs.kaderblick.test%s"]', $path))->length, $path);
        }

        $calendar = $xpath->query('//s:url[s:loc="http://docs.kaderblick.test/en/calendar"]')->item(0);
        self::assertNotNull($calendar);
        self::assertSame(6, $xpath->query('xhtml:link[@rel="alternate"]', $calendar)->length);
    }

    public function testLocalizedPageProvidesSearchAndSocialMetadata(): void
    {
        $client = static::createClient();
        $crawler = $client->request('GET', '/en/calendar', server: ['HTTP_HOST' => 'docs.kaderblick.test']);

        self::assertResponseIsSuccessful();
        self::assertNotSame('', trim((string) $crawler->filter('meta[name="description"]')->attr('content')));
        self::assertSame('index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1', $crawler->filter('meta[name="robots"]')->attr('content'));
        self::assertSame('http://docs.kaderblick.test/en/calendar', $crawler->filter('meta[property="og:url"]')->attr('content'));
        self::assertSame('summary', $crawler->filter('meta[name="twitter:card"]')->attr('content'));

        $structuredData = json_decode($crawler->filter('script[type="application/ld+json"]')->text(), true, flags: JSON_THROW_ON_ERROR);
        self::assertSame('WebPage', $structuredData['@type']);
        self::assertSame('BreadcrumbList', $structuredData['breadcrumb']['@type']);
        self::assertSame('en', $structuredData['inLanguage']);
        self::assertSame('https://kaderblick.de/#organization', $structuredData['publisher']['@id']);
        self::assertSame('https://kaderblick.de/#software', $structuredData['about']['@id']);
        self::assertSame('https://kaderblick.de/', $structuredData['about']['url']);
    }

    public function testHomepageProvidesWebsiteStructuredData(): void
    {
        $client = static::createClient();
        $crawler = $client->request('GET', '/de/', server: ['HTTP_HOST' => 'docs.kaderblick.test']);

        self::assertResponseIsSuccessful();
        $structuredData = json_decode($crawler->filter('script[type="application/ld+json"]')->text(), true, flags: JSON_THROW_ON_ERROR);
        self::assertSame('WebSite', $structuredData['@type']);
        self::assertSame('http://docs.kaderblick.test/de/#website', $structuredData['@id']);
        self::assertSame('Kaderblick Hilfe und Dokumentation', $structuredData['name']);
        self::assertSame('http://docs.kaderblick.test/de/', $structuredData['url']);
        self::assertSame('https://kaderblick.de/#organization', $structuredData['publisher']['@id']);
        self::assertSame('https://kaderblick.de/#software', $structuredData['about']['@id']);
    }

    private function urlLocale(string $locale): string
    {
        return $locale === 'zh_Hans' ? 'zh-hans' : $locale;
    }
}
