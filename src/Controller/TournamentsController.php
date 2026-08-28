<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Documentation: Tournaments.
 */
#[Route('/tournaments', name: 'docs_tournaments')]
final class TournamentsController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('tournaments/index.html.twig', 'docs_tournaments');
    }
}
