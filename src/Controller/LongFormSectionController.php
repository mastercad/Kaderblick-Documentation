<?php

declare(strict_types=1);

namespace App\Controller;

use App\Documentation\LongFormContent;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class LongFormSectionController extends BaseController
{
    #[Route('/{page}/{section}', name: 'docs_long_form_section', requirements: ['page' => 'getting-started|reports|calendar|games|profile|dashboard|lineups|clubs-teams', 'section' => '[a-z0-9-]+'], priority: -10)]
    public function section(string $page, string $section, LongFormContent $longForm): Response
    {
        $locale = $this->currentLocale();
        try {
            $content = $longForm->section($page, $section, $locale);
        } catch (\InvalidArgumentException) {
            throw $this->createNotFoundException();
        }

        return $this->renderDocs('docs/page.html.twig', $this->activeRouteFor($page), $content);
    }

    private function activeRouteFor(string $page): string
    {
        return 'docs_'.str_replace('-', '_', $page);
    }
}
