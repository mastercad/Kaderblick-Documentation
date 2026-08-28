<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Documentation: News area on kaderblick.de
 */
#[Route('/news', name: 'docs_news')]
final class NewsController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('news/index.html.twig', 'docs_news');
    }
}
