<?php

namespace App\Controller;

use App\Documentation\LongFormContent;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Documentation: Dashboard area on kaderblick.de
 */
#[Route('/dashboard', name: 'docs_dashboard')]
final class DashboardController extends BaseController
{
    #[Route('', name: '')]
    public function index(LongFormContent $longForm): Response
    {
        return $this->renderLongFormOverview('dashboard', 'docs_dashboard', $longForm);
    }
}
