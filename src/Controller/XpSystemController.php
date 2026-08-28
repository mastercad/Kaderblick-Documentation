<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Documentation: XP system on kaderblick.de
 */
#[Route('/xp-system', name: 'docs_xp_system')]
final class XpSystemController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('xp-system/index.html.twig', 'docs_xp_system');
    }
}
