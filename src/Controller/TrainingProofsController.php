<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Documentation: Training evidence.
 */
#[Route('/training-proofs', name: 'docs_training_proofs')]
final class TrainingProofsController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('training-proofs/index.html.twig', 'docs_training_proofs');
    }
}
