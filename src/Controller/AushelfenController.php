<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/aushelfen', name: 'app_aushelfen')]
final class AushelfenController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('aushelfen/index.html.twig', 'app_aushelfen');
    }
}
