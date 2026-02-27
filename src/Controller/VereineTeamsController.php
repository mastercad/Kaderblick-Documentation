<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Dokumentation: Vereine & Teams.
 */
#[Route('/vereine-teams', name: 'app_vereine_teams')]
final class VereineTeamsController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('vereine-teams/index.html.twig', 'app_vereine_teams');
    }
}
