<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Dokumentation: XP-System von kaderblick.de
 */
#[Route('/xp-system', name: 'app_xp_system')]
final class XpSystemController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('xp-system/index.html.twig', 'app_xp_system');
    }
}
