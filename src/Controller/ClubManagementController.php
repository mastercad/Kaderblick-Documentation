<?php

declare(strict_types=1);

namespace App\Controller;

use App\Documentation\LongFormContent;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/** Documentation for the club-management workspace. */
#[Route('/club-management', name: 'docs_club_management')]
final class ClubManagementController extends BaseController
{
    #[Route('', name: '')]
    public function index(LongFormContent $longForm): Response
    {
        return $this->renderLongFormOverview('club-management', 'docs_club_management', $longForm);
    }
}
