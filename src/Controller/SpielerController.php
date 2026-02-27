<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Dokumentation: Spieler-Bereich von kaderblick.de
 */
#[Route('/spieler', name: 'app_spieler')]
final class SpielerController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('spieler/index.html.twig', 'app_spieler');
    }
}
