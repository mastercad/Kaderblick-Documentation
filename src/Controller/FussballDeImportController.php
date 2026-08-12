<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/fussball-de-import', name: 'app_fussball_de_import')]
final class FussballDeImportController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('fussball-de-import/index.html.twig', 'app_fussball_de_import');
    }
}
