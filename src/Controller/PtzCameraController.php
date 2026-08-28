<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Documentation: PTZ camera system with custom control software.
 */
#[Route('/tools/camera/ptz', name: 'docs_ptz_camera')]
final class PtzCameraController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('tools/camera/ptz/index.html.twig', 'docs_ptz_camera');
    }

    #[Route('/assembly', name: '_assembly')]
    public function assembly(): Response
    {
        return $this->renderDocs('tools/camera/ptz/assembly.html.twig', 'docs_ptz_camera');
    }

    #[Route('/3d-view', name: '_3d_view')]
    public function threeDimensionalView(): Response
    {
        return $this->renderDocs('tools/camera/ptz/3d-view.html.twig', 'docs_ptz_camera');
    }

    #[Route('/software', name: '_software')]
    public function software(): Response
    {
        return $this->renderDocs('tools/camera/ptz/software.html.twig', 'docs_ptz_camera');
    }

    #[Route('/parts-list', name: '_parts_list')]
    public function partsList(): Response
    {
        return $this->renderDocs('tools/camera/ptz/parts-list.html.twig', 'docs_ptz_camera');
    }
}
