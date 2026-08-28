<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/help-out', name: 'docs_help_out')]
final class HelpOutController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('help-out/index.html.twig', 'docs_help_out');
    }
}
