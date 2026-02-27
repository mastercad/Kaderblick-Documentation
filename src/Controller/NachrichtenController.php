<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Dokumentation: Nachrichten.
 */
#[Route('/nachrichten', name: 'app_nachrichten')]
final class NachrichtenController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('nachrichten/index.html.twig', 'app_nachrichten');
    }
}
