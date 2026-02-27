<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Dokumentation: Turniere.
 */
#[Route('/turniere', name: 'app_turniere')]
final class TurniereController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('turniere/index.html.twig', 'app_turniere');
    }
}
