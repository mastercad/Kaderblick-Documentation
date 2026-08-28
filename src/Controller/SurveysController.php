<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Documentation: Surveys.
 */
#[Route('/surveys', name: 'docs_surveys')]
final class SurveysController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('surveys/index.html.twig', 'docs_surveys');
    }
}
