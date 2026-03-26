<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Dokumentation: PTZ-Kamerasystem mit eigener Steuerungssoftware.
 */
#[Route('/tools/kamera/ptz', name: 'app_tools_kamera_ptz')]
final class PtzKameraController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('tools/kamera/ptz/index.html.twig', 'app_tools_kamera_ptz');
    }

    #[Route('/bauanleitung', name: '_bauanleitung')]
    public function bauanleitung(): Response
    {
        return $this->renderDocs('tools/kamera/ptz/bauanleitung.html.twig', 'app_tools_kamera_ptz');
    }

    #[Route('/3d-ansicht', name: '_3d_ansicht')]
    public function dreiDAnsicht(): Response
    {
        return $this->renderDocs('tools/kamera/ptz/3d-ansicht.html.twig', 'app_tools_kamera_ptz');
    }

    #[Route('/software', name: '_software')]
    public function software(): Response
    {
        return $this->renderDocs('tools/kamera/ptz/software.html.twig', 'app_tools_kamera_ptz');
    }

    #[Route('/teileliste', name: '_teileliste')]
    public function teileliste(): Response
    {
        return $this->renderDocs('tools/kamera/ptz/teileliste.html.twig', 'app_tools_kamera_ptz');
    }
}
