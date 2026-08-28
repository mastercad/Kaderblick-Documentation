<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Documentation: Video Combiner – tool for trimming and editing match videos.
 */
#[Route('/tools/video-combiner', name: 'docs_video_combiner')]
final class VideoCombinerController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('tools/video-combiner/index.html.twig', 'docs_video_combiner');
    }
}
