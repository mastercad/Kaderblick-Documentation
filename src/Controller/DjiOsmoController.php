<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Dokumentation: DJI Osmo Action5 Pro – Action-Kamera für manuelle Aufnahmen.
 */
#[Route('/tools/kamera/dji-osmo', name: 'app_tools_kamera_dji')]
final class DjiOsmoController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('tools/kamera/dji-osmo/index.html.twig', 'app_tools_kamera_dji');
    }
}
