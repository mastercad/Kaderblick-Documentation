<?php

namespace App\Controller;

use App\Documentation\LongFormContent;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Documentation: Calendar and events.
 */
#[Route('/calendar', name: 'docs_calendar')]
final class CalendarController extends BaseController
{
    #[Route('', name: '')]
    public function index(LongFormContent $longForm): Response
    {
        return $this->renderLongFormOverview('calendar', 'docs_calendar', $longForm);
    }
}
