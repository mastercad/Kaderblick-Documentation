<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/mein-spieltag', name: 'app_mein_spieltag')]
final class MeinSpieltagController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('mein-spieltag/index.html.twig', 'app_mein_spieltag');
    }
}
