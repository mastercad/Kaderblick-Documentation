<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Dokumentation: Aufstellungen planen.
 */
#[Route('/aufstellungen', name: 'app_aufstellungen')]
final class AufstellungenController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('aufstellungen/index.html.twig', 'app_aufstellungen');
    }
}
