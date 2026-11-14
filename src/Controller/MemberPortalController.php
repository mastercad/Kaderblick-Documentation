<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/member-portal', name: 'docs_member_portal')]
final class MemberPortalController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('member-portal/index.html.twig', 'docs_member_portal');
    }
}
