<?php

namespace App\Controller;

use App\Documentation\LongFormContent;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Documentation: Clubs and teams.
 */
#[Route('/clubs-teams', name: 'docs_clubs_teams')]
final class ClubsTeamsController extends BaseController
{
    #[Route('', name: '')]
    public function index(LongFormContent $longForm): Response
    {
        return $this->renderLongFormOverview('clubs-teams', 'docs_clubs_teams', $longForm);
    }
}
