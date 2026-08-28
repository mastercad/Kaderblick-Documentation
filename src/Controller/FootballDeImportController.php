<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/football-de-import', name: 'docs_football_de_import')]
final class FootballDeImportController extends BaseController
{
    public function __invoke(): Response
    {
        return $this->renderDocs('football-de-import/index.html.twig', 'docs_football_de_import');
    }
}
