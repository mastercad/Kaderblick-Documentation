<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/my-balance', name: 'docs_my_balance')]
final class MyBalanceController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('my-balance/index.html.twig', 'docs_my_balance');
    }
}
