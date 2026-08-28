<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/cash-book', name: 'docs_cash_book')]
final class CashBookController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('cash-book/index.html.twig', 'docs_cash_book');
    }
}
