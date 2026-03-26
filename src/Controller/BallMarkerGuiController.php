<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Dokumentation: BallMarkerGui – GUI-Tool zum Markieren von Ballpositionen im Video.
 */
#[Route('/tools/ball-marker-gui', name: 'app_tools_ball_marker_gui')]
final class BallMarkerGuiController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('tools/ball-marker-gui/index.html.twig', 'app_tools_ball_marker_gui');
    }
}
