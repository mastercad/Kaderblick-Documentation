<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/location-occupancy', name: 'docs_location_occupancy')]
final class LocationOccupancyController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('location-occupancy/index.html.twig', 'docs_location_occupancy');
    }
}
