<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Dokumentation: Anmelden & Registrieren.
 */
#[Route('/authentifizierung', name: 'app_authentifizierung')]
final class AuthentifizierungController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('authentifizierung/index.html.twig', 'app_authentifizierung');
    }
}
