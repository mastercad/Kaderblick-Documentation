<?php

namespace App\Controller;

use App\Documentation\LongFormContent;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Documentation: Getting started with Kaderblick.
 */
#[Route('/getting-started', name: 'docs_getting_started')]
final class GettingStartedController extends BaseController
{
    #[Route('', name: '')]
    public function index(LongFormContent $longForm): Response
    {
        return $this->renderLongFormOverview('getting-started', 'docs_getting_started', $longForm);
    }
}
