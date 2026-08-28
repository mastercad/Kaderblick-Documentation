<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Documentation: Administration.
 */
#[Route('/admin', name: 'docs_administration')]
final class AdminController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('admin/index.html.twig', 'docs_administration');
    }
}
