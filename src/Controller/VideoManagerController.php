<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Documentation: VideoManager – tool for managing and organising match videos.
 */
#[Route('/tools/video-manager', name: 'docs_video_manager')]
final class VideoManagerController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('tools/video-manager/index.html.twig', 'docs_video_manager');
    }
}
