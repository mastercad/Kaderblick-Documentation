<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Documentation: Notifications.
 */
#[Route('/notifications', name: 'docs_notifications')]
final class NotificationsController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('notifications/index.html.twig', 'docs_notifications');
    }
}
