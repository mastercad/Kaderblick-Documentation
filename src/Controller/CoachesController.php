<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Documentation: Coaches area.
 */
#[Route('/coaches', name: 'docs_coaches')]
final class CoachesController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('coaches/index.html.twig', 'docs_coaches');
    }
}
