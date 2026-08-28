<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Documentation: BallMarkerGui – GUI tool for marking ball positions in videos.
 */
#[Route('/tools/ball-marker-gui', name: 'docs_ball_marker_gui')]
final class BallMarkerGuiController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->redirect('https://projects.byte-artist.de');
    }
}
