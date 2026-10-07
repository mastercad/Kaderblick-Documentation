<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/marketing-materials', name: 'docs_marketing_materials')]
final class MarketingMaterialsController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('marketing-materials/index.html.twig', 'docs_marketing_materials');
    }
}
