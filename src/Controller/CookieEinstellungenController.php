<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/cookie-einstellungen', name: 'app_cookie_einstellungen')]
final class CookieEinstellungenController extends BaseController
{
    #[Route('', name: '')]
    public function index(): Response
    {
        return $this->renderDocs('cookie-einstellungen/index.html.twig', 'app_cookie_einstellungen');
    }
}
