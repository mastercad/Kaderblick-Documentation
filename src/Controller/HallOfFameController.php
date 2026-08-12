<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/hall-of-fame', name: 'app_hall_of_fame')]
final class HallOfFameController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('hall-of-fame/index.html.twig', 'app_hall_of_fame');
    }
}
