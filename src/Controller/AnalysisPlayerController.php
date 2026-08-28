<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/tools/analysis-player', name: 'docs_analysis_player')]
final class AnalysisPlayerController extends BaseController
{
    public function __invoke(): Response
    {
        return $this->renderDocs('tools/analysis-player/index.html.twig', 'docs_analysis_player');
    }
}
