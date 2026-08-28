<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/knowledge-pool', name: 'docs_knowledge_pool')]
final class KnowledgePoolController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('knowledge-pool/index.html.twig', 'docs_knowledge_pool');
    }
}
