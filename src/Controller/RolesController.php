<?php

declare(strict_types=1);

namespace App\Controller;

use App\Documentation\RoleContent;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/** Endverbraucherhilfe nach Rolle, Beziehung und Zuständigkeit. */
#[Route('/roles', name: 'docs_roles')]
final class RolesController extends BaseController
{
    #[Route('', name: '')]
    public function index(RoleContent $roles): Response
    {
        return $this->renderDocs('docs/page.html.twig', 'docs_roles', [
            'document' => $roles->overview($this->currentLocale()),
        ]);
    }

    #[Route('/{role}', name: '_detail', requirements: ['role' => 'player|parent|coach|administration|supporter|staff|treasurer|equipment|superadmin'])]
    public function detail(string $role, RoleContent $roles): Response
    {
        return $this->renderDocs('docs/page.html.twig', 'docs_roles', [
            'document' => $roles->detail($role, $this->currentLocale()),
        ]);
    }
}
