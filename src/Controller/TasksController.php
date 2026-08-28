<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Documentation: Tasks area on kaderblick.de
 */
#[Route('/tasks', name: 'docs_tasks')]
final class TasksController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('tasks/index.html.twig', 'docs_tasks');
    }
}
