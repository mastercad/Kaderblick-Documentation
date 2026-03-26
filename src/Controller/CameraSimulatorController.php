<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Dokumentation: CameraSimulator – Simulation von Kameraperspektiven und -positionen.
 */
#[Route('/tools/camera-simulator', name: 'app_tools_camera_simulator')]
final class CameraSimulatorController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('tools/camera-simulator/index.html.twig', 'app_tools_camera_simulator');
    }
}
