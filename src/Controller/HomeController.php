<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Startseite / Übersicht der Dokumentation.
 */
final class HomeController extends BaseController
{
    #[Route('/', name: 'app_home')]
    public function index(): Response
    {
        return $this->renderDocs('home/index.html.twig', 'app_home');
    }
}
