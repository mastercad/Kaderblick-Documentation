<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/quick-event-konfiguration', name: 'app_quick_event_konfiguration')]
final class QuickEventKonfigurationController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('quick-event-konfiguration/index.html.twig', 'app_quick_event_konfiguration');
    }
}
