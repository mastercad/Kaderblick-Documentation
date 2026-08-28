<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Documentation: Custom-built Kaderblick camera system.
 */
#[Route('/tools/camera/kaderblick', name: 'docs_kaderblick_camera')]
final class KaderblickCameraController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('tools/camera/kaderblick/index.html.twig', 'docs_kaderblick_camera');
    }

    #[Route('/assembly', name: '_assembly')]
    public function assembly(): Response
    {
        return $this->renderDocs('tools/camera/kaderblick/assembly.html.twig', 'docs_kaderblick_camera');
    }

    #[Route('/3d-view', name: '_3d_view')]
    public function threeDimensionalView(): Response
    {
        return $this->renderDocs('tools/camera/kaderblick/3d-view.html.twig', 'docs_kaderblick_camera');
    }

    #[Route('/software', name: '_software')]
    public function software(): Response
    {
        return $this->renderDocs('tools/camera/kaderblick/software.html.twig', 'docs_kaderblick_camera');
    }

    #[Route('/parts-list', name: '_parts_list')]
    public function partsList(): Response
    {
        return $this->renderDocs('tools/camera/kaderblick/parts-list.html.twig', 'docs_kaderblick_camera');
    }
}
