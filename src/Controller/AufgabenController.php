<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Dokumentation: Aufgaben-Bereich von kaderblick.de
 */
#[Route('/aufgaben', name: 'app_aufgaben')]
final class AufgabenController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('aufgaben/index.html.twig', 'app_aufgaben');
    }
}
