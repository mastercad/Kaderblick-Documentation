<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/feedback', name: 'docs_feedback')]
final class FeedbackController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('feedback/index.html.twig', 'docs_feedback');
    }
}
