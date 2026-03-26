<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Dokumentation: Kaderblick-Kamerasystem – Eigenentwicklung.
 */
#[Route('/tools/kamera/kaderblick', name: 'app_tools_kamera_kaderblick')]
final class KaderblickKameraController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('tools/kamera/kaderblick/index.html.twig', 'app_tools_kamera_kaderblick');
    }

    #[Route('/bauanleitung', name: '_bauanleitung')]
    public function bauanleitung(): Response
    {
        return $this->renderDocs('tools/kamera/kaderblick/bauanleitung.html.twig', 'app_tools_kamera_kaderblick');
    }

    #[Route('/3d-ansicht', name: '_3d_ansicht')]
    public function dreiDAnsicht(): Response
    {
        return $this->renderDocs('tools/kamera/kaderblick/3d-ansicht.html.twig', 'app_tools_kamera_kaderblick');
    }

    #[Route('/software', name: '_software')]
    public function software(): Response
    {
        return $this->renderDocs('tools/kamera/kaderblick/software.html.twig', 'app_tools_kamera_kaderblick');
    }

    #[Route('/teileliste', name: '_teileliste')]
    public function teileliste(): Response
    {
        return $this->renderDocs('tools/kamera/kaderblick/teileliste.html.twig', 'app_tools_kamera_kaderblick');
    }
}
