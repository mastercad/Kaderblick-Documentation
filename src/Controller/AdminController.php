<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Dokumentation: Administration.
 */
#[Route('/admin', name: 'app_admin')]
final class AdminController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('admin/index.html.twig', 'app_admin');
    }
}
