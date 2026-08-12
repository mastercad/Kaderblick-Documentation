<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/beobachtungsliste', name: 'app_beobachtungsliste')]
final class BeobachtungslisteController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('beobachtungsliste/index.html.twig', 'app_beobachtungsliste');
    }
}
