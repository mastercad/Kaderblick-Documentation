<?php
declare(strict_types=1);
namespace App\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
#[Route('/staff-assignments', name: 'docs_staff_assignments')]
final class StaffAssignmentsController extends BaseController
{
    public function __invoke(): Response { return $this->renderDocs('staff-assignments/index.html.twig', 'docs_staff_assignments'); }
}
