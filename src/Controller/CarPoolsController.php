<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Documentation: Car pools.
 */
#[Route('/car-pools', name: 'docs_car_pools')]
final class CarPoolsController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('car-pools/index.html.twig', 'docs_car_pools');
    }
}
