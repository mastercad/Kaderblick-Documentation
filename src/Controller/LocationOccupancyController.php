<?php

declare(strict_types=1);

namespace App\Controller;

use App\Documentation\LongFormContent;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/location-occupancy', name: 'docs_location_occupancy')]
final class LocationOccupancyController extends BaseController
{
    #[Route('', name: '')]
    public function index(LongFormContent $longForm): Response
    {
        return $this->renderLongFormOverview('location-occupancy', 'docs_location_occupancy', $longForm);
    }
}
