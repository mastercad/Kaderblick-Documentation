<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/abrechnung', name: 'app_abrechnung')]
final class AbrechnungController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('abrechnung/index.html.twig', 'app_abrechnung');
    }
}
