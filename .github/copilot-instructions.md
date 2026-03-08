# Copilot Instructions for Kaderblick Documentation

## Project Overview
This is a Symfony-based PHP web application for managing football club data. The architecture follows standard Symfony conventions, with clear separation between controllers, templates, configuration, and public assets.

## Key Components
- **src/Controller/**: Contains all controller classes, each handling a specific domain (e.g., `SpieleController.php`, `TrainerController.php`). Controllers are named after their domain and follow Symfony's routing and dependency injection patterns.
- **templates/**: Organized by feature, matching controller domains. Use Twig for rendering views. Shared UI components are in `templates/components/`.
- **config/**: Centralized configuration for bundles, services, routes, and environment-specific settings. `config/packages/` holds bundle configs; `config/routes/` defines route overrides.
- **public/**: Entry point (`index.php`) and static assets.
- **tests/**: PHPUnit tests, organized by domain.

## Developer Workflows
- **Build & Run**: Use `composer install` to set up dependencies. The app is typically run via Symfony's built-in server or Apache/Nginx.
- **Testing**: Run tests with `bin/phpunit` or `./bin/phpunit`. Configuration is in `phpunit.dist.xml`.
- **Debugging**: Use Symfony's web profiler (`config/packages/web_profiler.yaml`) and debug bundle (`config/packages/debug.yaml`).
- **Environment**: Use `docker-compose.yaml` for local development. Services and environment variables are defined in `config/services.yaml` and `config/packages/*.yaml`.

## Project-Specific Patterns
- **Controller Naming**: Each controller is named for its domain, e.g., `NewsController.php` for news-related actions.
- **Twig Templates**: Feature templates are grouped by domain. Shared components (e.g., `callout.html.twig`, `steps.html.twig`) are reused across views.
- **Routing**: Centralized in `config/routes.yaml` and feature-specific in `config/routes/*.yaml`.
- **Translation**: All user-facing strings are managed in `translations/`.
- **Dependency Injection**: Services are registered in `config/services.yaml`.

## Integration Points
- **External Libraries**: Managed via Composer (`composer.json`). Key dependencies include Symfony, Doctrine, Twig, Monolog.
- **Docker**: Use `docker-compose.yaml` for service orchestration.
- **Logging & Monitoring**: Configured via `config/packages/monolog.yaml`.

## Examples
- To add a new feature:
  1. Create a controller in `src/Controller/` (e.g., `TurniereController.php`).
  2. Add routes in `config/routes/turniere.yaml`.
  3. Create templates in `templates/turniere/`.
  4. Register services if needed in `config/services.yaml`.
- To run tests: `./bin/phpunit`
- To debug: Enable web profiler and access `/_profiler` in the browser.

## References
- [src/Controller/](src/Controller/): Domain logic
- [templates/components/](templates/components/): Shared UI
- [config/packages/](config/packages/): Bundle configs
- [docker-compose.yaml](docker-compose.yaml): Local dev setup
- [phpunit.dist.xml](phpunit.dist.xml): Test config

---

**Update this file as project conventions evolve.**
