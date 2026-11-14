<?php

declare(strict_types=1);

namespace App\Controller;

use App\Documentation\LongFormContent;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/training-planning', name: 'docs_training_planning')]
final class TrainingPlanningController extends BaseController
{
    #[Route('', name: '')]
    public function index(LongFormContent $longForm): Response
    {
        return $this->renderLongFormOverview('training-planning', 'docs_training_planning', $longForm);
    }
}
