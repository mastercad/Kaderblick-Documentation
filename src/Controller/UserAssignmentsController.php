<?php
declare(strict_types=1);
namespace App\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
#[Route('/user-assignments', name: 'docs_user_assignments')]
final class UserAssignmentsController extends BaseController
{
    public function __invoke(): Response { return $this->renderDocs('user-assignments/index.html.twig', 'docs_user_assignments'); }
}
