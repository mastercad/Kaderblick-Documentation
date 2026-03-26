<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Dokumentation: VideoSchnitt – Tool zum Schneiden und Bearbeiten von Spielvideos.
 */
#[Route('/tools/video-schnitt', name: 'app_tools_video_schnitt')]
final class VideoSchnittController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('tools/video-schnitt/index.html.twig', 'app_tools_video_schnitt');
    }
}
