<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/fines-catalogue', name: 'docs_fines_catalogue')]
final class FinesCatalogueController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('fines-catalogue/index.html.twig', 'docs_fines_catalogue');
    }
}
