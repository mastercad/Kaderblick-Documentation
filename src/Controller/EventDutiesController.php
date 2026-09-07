<?php

declare(strict_types=1);

namespace App\Controller;

use App\Documentation\LongFormContent;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Documentation: Match and event duty planning.
 */
#[Route('/event-duties', name: 'docs_event_duties')]
final class EventDutiesController extends BaseController
{
    #[Route('', name: '')]
    public function index(LongFormContent $longForm): Response
    {
        return $this->renderLongFormOverview('event-duties', 'docs_event_duties', $longForm);
    }
}
