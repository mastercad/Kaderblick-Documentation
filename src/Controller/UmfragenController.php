<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Dokumentation: Umfragen.
 */
#[Route('/umfragen', name: 'app_umfragen')]
final class UmfragenController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('umfragen/index.html.twig', 'app_umfragen');
    }
}
