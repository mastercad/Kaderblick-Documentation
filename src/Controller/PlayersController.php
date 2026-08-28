<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Documentation: Players area on kaderblick.de
 */
#[Route('/players', name: 'docs_players')]
final class PlayersController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('players/index.html.twig', 'docs_players');
    }
}
