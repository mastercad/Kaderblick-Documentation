<?php
declare(strict_types=1);
namespace App\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
#[Route('/quick-events', name: 'docs_quick_events')]
final class QuickEventsController extends BaseController
{
    public function __invoke(): Response { return $this->renderDocs('quick-events/index.html.twig', 'docs_quick_events'); }
}
