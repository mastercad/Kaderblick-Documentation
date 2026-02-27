<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Dokumentation: Mein Profil.
 */
#[Route('/profil', name: 'app_profil')]
final class ProfilController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('profil/index.html.twig', 'app_profil');
    }
}
