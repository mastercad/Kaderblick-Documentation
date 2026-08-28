<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/my-matchday', name: 'docs_my_matchday')]
final class MyMatchdayController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('my-matchday/index.html.twig', 'docs_my_matchday');
    }
}
