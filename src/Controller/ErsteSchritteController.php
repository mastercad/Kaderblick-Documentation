<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Dokumentation: Erste Schritte mit Kaderblick.
 */
#[Route('/erste-schritte', name: 'app_erste_schritte')]
final class ErsteSchritteController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('erste-schritte/index.html.twig', 'app_erste_schritte');
    }
}
