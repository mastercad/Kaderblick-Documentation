<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Dokumentation: Kamerasysteme – Kaderblick, PTZ-Kamera, DJI Osmo Action5 Pro.
 */
#[Route('/tools/kamera-systeme', name: 'app_tools_kamera_systeme')]
final class KameraSystemeController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('tools/kamera-systeme/index.html.twig', 'app_tools_kamera_systeme');
    }
}
