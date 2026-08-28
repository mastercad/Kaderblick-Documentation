<?php

namespace App\Controller;

use App\Documentation\LongFormContent;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Documentation: Planning lineups.
 */
#[Route('/lineups', name: 'docs_lineups')]
final class LineupsController extends BaseController
{
    #[Route('', name: '')]
    public function index(LongFormContent $longForm): Response
    {
        return $this->renderLongFormOverview('lineups', 'docs_lineups', $longForm);
    }
}
