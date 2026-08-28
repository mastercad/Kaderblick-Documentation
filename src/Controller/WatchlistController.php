<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/watchlist', name: 'docs_watchlist')]
final class WatchlistController extends BaseController
{
    public function __invoke(): Response
    {
        return $this->renderDocs('watchlist/index.html.twig', 'docs_watchlist');
    }
}
