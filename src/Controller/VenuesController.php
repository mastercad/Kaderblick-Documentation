<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/venues', name: 'docs_venues')]
final class VenuesController extends BaseController
{
    public function __invoke(): Response
    {
        return $this->renderDocs('venues/index.html.twig', 'docs_venues');
    }
}
