<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Documentation homepage and overview.
 */
final class HomeController extends BaseController
{
    #[Route('/', name: 'docs_home')]
    public function index(): Response
    {
        return $this->renderDocs('home/index.html.twig', 'docs_home');
    }
}
