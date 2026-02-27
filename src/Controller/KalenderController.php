<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Dokumentation: Kalender & Termine.
 */
#[Route('/kalender', name: 'app_kalender')]
final class KalenderController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('kalender/index.html.twig', 'app_kalender');
    }
}
