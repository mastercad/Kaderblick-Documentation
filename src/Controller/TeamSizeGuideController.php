<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/team-size-guide', name: 'app_team_size_guide')]
final class TeamSizeGuideController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('team-size-guide/index.html.twig', 'app_team_size_guide');
    }
}
