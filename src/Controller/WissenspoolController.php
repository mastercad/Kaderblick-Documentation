<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/wissenspool', name: 'app_wissenspool')]
final class WissenspoolController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('wissenspool/index.html.twig', 'app_wissenspool');
    }
}
