<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Dokumentation: News-Bereich von kaderblick.de
 */
#[Route('/news', name: 'app_news')]
final class NewsController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('news/index.html.twig', 'app_news');
    }
}
