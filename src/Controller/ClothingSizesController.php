<?php
declare(strict_types=1);
namespace App\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
#[Route('/clothing-sizes', name: 'docs_clothing_sizes')]
final class ClothingSizesController extends BaseController
{
    public function __invoke(): Response { return $this->renderDocs('clothing-sizes/index.html.twig', 'docs_clothing_sizes'); }
}
