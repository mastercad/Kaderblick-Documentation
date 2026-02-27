<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Dokumentation: Benachrichtigungen.
 */
#[Route('/benachrichtigungen', name: 'app_benachrichtigungen')]
final class BenachrichtigungenController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('benachrichtigungen/index.html.twig', 'app_benachrichtigungen');
    }
}
