<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Documentation: CameraSimulator – simulation of camera angles and positions.
 */
#[Route('/tools/camera-simulator', name: 'docs_camera_simulator')]
final class CameraSimulatorController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->redirect('https://projects.byte-artist.de');
    }
}
