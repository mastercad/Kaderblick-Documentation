<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Dokumentation: Fahrgemeinschaften.
 */
#[Route('/fahrgemeinschaften', name: 'app_fahrgemeinschaften')]
final class FahrgemeinschaftenController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('fahrgemeinschaften/index.html.twig', 'app_fahrgemeinschaften');
    }
}
