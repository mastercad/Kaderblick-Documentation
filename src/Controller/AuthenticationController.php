<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Documentation: Sign-in and registration.
 */
#[Route('/authentication', name: 'docs_authentication')]
final class AuthenticationController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('authentication/index.html.twig', 'docs_authentication');
    }
}
