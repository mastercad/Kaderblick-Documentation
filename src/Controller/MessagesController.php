<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Documentation: Messages.
 */
#[Route('/messages', name: 'docs_messages')]
final class MessagesController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('messages/index.html.twig', 'docs_messages');
    }
}
