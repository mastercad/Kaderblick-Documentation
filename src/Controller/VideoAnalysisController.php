<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Documentation: Videos and match analysis.
 */
#[Route('/video-analysis', name: 'docs_video_analysis')]
final class VideoAnalysisController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('video-analysis/index.html.twig', 'docs_video_analysis');
    }
}
