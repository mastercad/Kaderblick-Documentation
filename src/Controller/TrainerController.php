<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Dokumentation: Trainer-Bereich.
 */
#[Route('/trainer', name: 'app_trainer')]
final class TrainerController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('trainer/index.html.twig', 'app_trainer');
    }
}
