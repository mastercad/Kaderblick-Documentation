<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Dokumentation: Dashboard-Bereich von kaderblick.de
 */
#[Route('/dashboard', name: 'app_dashboard')]
final class DashboardController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('dashboard/index.html.twig', 'app_dashboard');
    }
}
