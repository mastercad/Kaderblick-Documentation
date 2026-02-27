<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Dokumentation: Berichte & Auswertungen.
 */
#[Route('/berichte', name: 'app_berichte')]
final class BerichteController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('berichte/index.html.twig', 'app_berichte');
    }
}
