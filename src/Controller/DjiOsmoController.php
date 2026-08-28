<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Documentation: DJI Osmo Action5 Pro – action camera for manual recording.
 */
#[Route('/tools/camera/dji-osmo', name: 'docs_dji_camera')]
final class DjiOsmoController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('tools/camera/dji-osmo/index.html.twig', 'docs_dji_camera');
    }
}
