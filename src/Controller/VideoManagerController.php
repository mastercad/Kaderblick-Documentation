<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Dokumentation: VideoManager – Tool zur Verwaltung und Organisation von Spielvideos.
 */
#[Route('/tools/video-manager', name: 'app_tools_video_manager')]
final class VideoManagerController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('tools/video-manager/index.html.twig', 'app_tools_video_manager');
    }
}
