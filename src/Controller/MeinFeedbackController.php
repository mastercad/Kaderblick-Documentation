<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/mein-feedback', name: 'app_mein_feedback')]
final class MeinFeedbackController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('mein-feedback/index.html.twig', 'app_mein_feedback');
    }
}
