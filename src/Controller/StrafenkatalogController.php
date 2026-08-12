<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/strafenkatalog', name: 'app_strafenkatalog')]
final class StrafenkatalogController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('strafenkatalog/index.html.twig', 'app_strafenkatalog');
    }
}
