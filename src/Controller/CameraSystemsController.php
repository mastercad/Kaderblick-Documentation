<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Documentation: Camera systems – Kaderblick, PTZ camera and DJI Osmo Action5 Pro.
 */
#[Route('/tools/camera-systems', name: 'docs_camera_systems')]
final class CameraSystemsController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('tools/camera-systems/index.html.twig', 'docs_camera_systems');
    }
}
