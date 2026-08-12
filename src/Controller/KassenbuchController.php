<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/kassenbuch', name: 'app_kassenbuch')]
final class KassenbuchController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('kassenbuch/index.html.twig', 'app_kassenbuch');
    }
}
