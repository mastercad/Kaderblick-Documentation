<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Dokumentation: Videos & Spielanalyse.
 */
#[Route('/video-analyse', name: 'app_video_analyse')]
final class VideoAnalyseController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('video-analyse/index.html.twig', 'app_video_analyse');
    }
}
