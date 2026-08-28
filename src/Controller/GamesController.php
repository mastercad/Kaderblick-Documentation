<?php

namespace App\Controller;

use App\Documentation\LongFormContent;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Documentation: Games area on kaderblick.de
 */
#[Route('/games', name: 'docs_games')]
final class GamesController extends BaseController
{
    #[Route('', name: '')]
    public function index(LongFormContent $longForm): Response
    {
        return $this->renderLongFormOverview('games', 'docs_games', $longForm);
    }
}
