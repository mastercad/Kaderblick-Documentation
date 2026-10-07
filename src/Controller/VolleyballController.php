<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/volleyball', name: 'docs_volleyball')]
final class VolleyballController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('volleyball/index.html.twig', 'docs_volleyball');
    }
}
