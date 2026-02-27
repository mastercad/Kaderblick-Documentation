<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Dokumentation: Spiele-Bereich von kaderblick.de
 */
#[Route('/spiele', name: 'app_spiele')]
final class SpieleController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('spiele/index.html.twig', 'app_spiele');
    }
}
