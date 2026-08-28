import { copyFile, mkdir, readFile, writeFile, access, readdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const locales = { de: '', en: 'en', fr: 'fr', ru: 'ru', zh_Hans: 'zh_Hans' };
const assetLocale = { de: 'de', en: 'en', fr: 'fr', ru: 'ru', zh_Hans: 'zh-hans' };

const images = {
  'authentication/sign-in.png': 'auth-audit/sign-in.png',
  'authentication/register.png': 'auth-audit/register.png',
  'authentication/forgot-password.png': 'auth-audit/forgot-password.png',
  'authentication/unlock-account.png': 'auth-audit/konto-entsperren.png',
  'admin/billing.png': 'billing-audit/overview.png',
  'admin/cash-book.png': 'finance-audit/cash-book-overview.png',
  'admin/fines-catalogue.png': 'penalties-audit/katalog.png',
  'admin/inventory.png': 'inventory-audit/overview.png',
  'admin/my-balance.png': 'finance-audit/balance-overview.png',
  'admin/official-assignments.png': 'assignment-audit/funktionaere.png',
  'admin/staff-assignments.png': 'assignment-audit/staff.png',
  'admin/user-assignments.png': 'assignment-audit/benutzer.png',
  'billing/overview.png': 'billing-audit/overview.png',
  'calendar/calendar.png': 'calendar-audit/kalender.png',
  'calendar/event-basic-data.png': 'calendar-audit/event-grunddaten.png',
  'calendar/game-details-step.png': 'event-wizards-audit/spiel-2.png',
  'calendar/task-settings.png': 'event-wizards-audit/task-2.png',
  'calendar/tournament-configuration.png': 'event-wizards-audit/tournament-2.png',
  'calendar/training-details.png': 'calendar-audit/training-details.png',
  'calendar/training-series.png': 'calendar-audit/training-serie.png',
  'car-pools/event-details.png': 'rides-audit/termindetails-mit-fahrt.png',
  'car-pools/offer-ride.png': 'rides-audit/fahrt-anbieten.png',
  'car-pools/overview.png': 'rides-audit/fahrgemeinschaften.png',
  'cash-book/overview.png': 'finance-audit/cash-book-overview.png',
  'cash-book/transaction.png': 'finance-audit/cash-book-transaction.png',
  'clothing-sizes/order.png': 'size-guide-audit/bestellung.png',
  'clothing-sizes/overview.png': 'size-guide-audit/overview.png',
  'clothing-sizes/reminder.png': 'size-guide-audit/erinnerung.png',
  'clubs-teams/club-details.png': 'organizations-audit/vereine-details.png',
  'clubs-teams/club-season.png': 'chapter-images/club-season.png',
  'clubs-teams/my-team.png': 'ui-audit/coaches/my-team.png',
  'clubs-teams/clubs-admin.png': 'organizations-audit/vereine-liste.png',
  'clubs-teams/edit-club.png': 'organizations-audit/vereine-bearbeiten.png',
  'clubs-teams/edit-team.png': 'organizations-audit/teams-bearbeiten.png',
  'clubs-teams/team-details.png': 'organizations-audit/teams-details.png',
  'clubs-teams/teams-admin.png': 'organizations-audit/teams-liste.png',
  'coaches/create-coach.png': 'remaining-areas-audit/trainer-anlegen.png',
  'coaches/current-coaches.png': 'remaining-areas-audit/trainer-uebersicht.png',
  'coaches/licences.png': 'ui-audit/coaches/coachLicenses.png',
  'dashboard/coaches-dashboard.png': 'ui-audit/coaches/dashboard.png',
  'dashboard/add-statistics-widget.png': 'dashboard-audit/bericht-widget-hinzufuegen.png',
  'dashboard/add-widget.png': 'dashboard-audit/widget-hinzufuegen.png',
  'dashboard/remove-widget.png': 'dashboard-audit/widget-entfernen.png',
  'dashboard/widget-settings.png': 'dashboard-audit/widget-settings.png',
  'feedback/give-feedback.png': 'community-help-audit/feedback-geben.png',
  'feedback/my-feedback.png': 'community-help-audit/mein-feedback.png',
  'fines-catalogue/catalogue.png': 'penalties-audit/katalog.png',
  'fines-catalogue/new-type.png': 'penalties-audit/neuer-typ.png',
  'football-de-import/browser-extension.png': 'import-audit/browser-erweiterung.png',
  'football-de-import/connection.png': 'import-audit/verbindung.png',
  'football-de-import/history.png': 'import-audit/verlauf.png',
  'games/detail.png': 'games-audit/detail.png',
  'games/overview.png': 'games-audit/overview.png',
  'games/my-matchday.png': 'matchday-helper-audit/spieltag-spieler.png',
  'games/supporter-request-pending.png': 'supporter-request-audit/request.png',
  'getting-started/coach-navigation.png': 'ui-audit/coaches/dashboard.png',
  'getting-started/link-request-type.png': 'registration-context-audit/step-1-type-player.png',
  'getting-started/link-request-search.png': 'registration-context-audit/step-2-results-player.png',
  'getting-started/link-request-relation.png': 'registration-context-audit/step-3-relation-player.png',
  'getting-started/link-request-review.png': 'registration-context-audit/step-4-review-player.png',
  'help-out/setting.png': 'ui-audit/coaches/help-out.png',
  'inventory/new-item.png': 'inventory-audit/neuer-artikel.png',
  'inventory/overview.png': 'inventory-audit/overview.png',
  'knowledge-pool/overview.png': 'community-help-audit/wissenspool.png',
  'knowledge-pool/new-entry.png': 'community-help-audit/wissenspool-beitrag.png',
  'messages/compose.png': 'messaging-audit/nachricht-verfassen.png',
  'messages/manage-groups.png': 'messaging-audit/gruppen-verwalten.png',
  'messages/overview.png': 'messaging-audit/nachrichten.png',
  'messages/select-group.png': 'messaging-audit/gruppe-auswaehlen.png',
  'my-balance/add-transaction.png': 'finance-audit/balance-transaction.png',
  'my-balance/overview.png': 'finance-audit/balance-overview.png',
  'my-matchday/coaches.png': 'matchday-helper-audit/spieltag-trainer.png',
  'my-matchday/players.png': 'matchday-helper-audit/spieltag-spieler.png',
  'news/current-news.png': 'remaining-areas-audit/news-uebersicht.png',
  'news/news-overview.png': 'remaining-areas-audit/news-uebersicht.png',
  'news/write-news.png': 'remaining-areas-audit/news-anlegen.png',
  'notifications/empty-centre.png': 'messaging-audit/benachrichtigungen.png',
  'players/create-player.png': 'remaining-areas-audit/spieler-anlegen.png',
  'players/current-players.png': 'remaining-areas-audit/spieler-uebersicht.png',
  'players/players-overview.png': 'remaining-areas-audit/spieler-uebersicht.png',
  'profile/profile.png': 'profile-audit/trainer/profil-0-profile.png',
  'profile/equipment.png': 'profile-audit/trainer/profil-1-equipment.png',
  'profile/settings.png': 'profile-audit/trainer/profil-2-settings.png',
  'profile/settings-lower-section.png': 'profile-audit/trainer/profil-2-settings-unten.png',
  'profile/notifications.png': 'profile-audit/trainer/profil-3-notifications.png',
  'profile/notifications-lower-section.png': 'profile-audit/trainer/profil-3-notifications-unten.png',
  'profile/calendar.png': 'profile-audit/trainer/profil-5-calendar.png',
  'profile/calendar-lower-section.png': 'profile-audit/trainer/profil-5-calendar-unten.png',
  'profile/absences.png': 'profile-audit/trainer/profil-6-absences.png',
  'profile/documents.png': 'profile-audit/trainer/profil-7-documents.png',
  'quick-events/editor.png': 'quick-event-audit/editor.png',
  'quick-events/overview.png': 'quick-event-audit/overview.png',
  'reports/current-reports.png': 'remaining-areas-audit/berichte-uebersicht.png',
  'reports/dashboard-statistic-widget-choice.png': 'dashboard-audit/bericht-widget-hinzufuegen.png',
  'reports/mobile-wizard-start.png': 'report-builder-audit/mobile-wizard-start.png',
  'reports/mobile-wizard-finish.png': 'report-builder-audit/mobile-wizard-finish.png',
  'reports/report-builder-data-chart.png': 'report-builder-audit/report-builder-data-chart.png',
  'reports/report-builder-filters.png': 'report-builder-audit/report-builder-filters.png',
  'reports/report-builder-options.png': 'report-builder-audit/report-builder-options.png',
  'staff-assignments/create-official.png': 'assignment-audit/funktionaere-anlegen.png',
  'staff-assignments/create-staff.png': 'assignment-audit/staff-anlegen.png',
  'staff-assignments/officials.png': 'assignment-audit/funktionaere.png',
  'staff-assignments/staff.png': 'assignment-audit/staff.png',
  'surveys/create-survey.png': 'remaining-areas-audit/umfragen-anlegen.png',
  'surveys/current-surveys.png': 'remaining-areas-audit/umfragen-uebersicht.png',
  'tasks/create-task.png': 'remaining-areas-audit/aufgaben-anlegen.png',
  'tasks/current-tasks.png': 'remaining-areas-audit/aufgaben-uebersicht.png',
  'tasks/recurring.png': 'remaining-areas-audit/aufgaben-wiederkehrend.png',
  'tournaments/tournament-basic-data.png': 'tournament-video-audit/tournament-basic-data.png',
  'tournaments/tournament-details.png': 'tournament-video-audit/tournament-details.png',
  'training-proofs/coach-overview.png': 'training-proofs-audit/coach-overview.png',
  'user-assignments/demo-requests.png': 'assignment-audit/demo-anfragen.png',
  'user-assignments/registration-requests.png': 'assignment-audit/registration-requests.png',
  'user-assignments/supporter-requests.png': 'assignment-audit/supporter-anfragen.png',
  'user-assignments/users.png': 'assignment-audit/benutzer.png',
  'venues/create-venue.png': 'location-audit/anlegen.png',
  'venues/overview.png': 'location-audit/overview.png',
  'video-analysis/add-video.png': 'tournament-video-audit/video-hinzufuegen.png',
  'video-analysis/video-section.png': 'tournament-video-audit/video-bereich.png',
  'watchlist/add-person.png': 'watchlist-audit/person-hinzufuegen.png',
  'watchlist/overview.png': 'watchlist-audit/overview.png',
  'xp-system/hall-of-fame.png': 'xp-audit/hall-of-fame.png',
  'xp-system/xp-breakdown.png': 'profile-audit/trainer/xp-aufschluesselung.png',
  'xp-system/title-xp-overview.png': 'xp-audit/title-xp-overview.png',
  'xp-system/xp-rules.png': 'xp-audit/xp-config.png',
};

const exists = async path => access(path).then(() => true, () => false);
const published = new Map();
const missing = [];
for (const [locale, auditSegment] of Object.entries(locales)) {
  for (const [target, source] of Object.entries(images)) {
    const parts = source.split('/');
    const localePosition = ['profile-audit', 'ui-audit'].includes(parts[0]) ? 2 : 1;
    const localizedParts = [...parts];
    if (auditSegment) localizedParts.splice(localePosition, 0, auditSegment);
    let sourcePath = resolve(root, 'var', ...localizedParts);
    if (locale === 'de') {
      const existingGerman = resolve(root, 'public/images/docs/de', target);
      if (await exists(existingGerman)) sourcePath = existingGerman;
    }
    if (!await exists(sourcePath)) { missing.push(`${locale}: ${source}`); continue; }
    const targetPath = resolve(root, 'public/images/docs', assetLocale[locale], target);
    await mkdir(dirname(targetPath), { recursive: true });
    await copyFile(sourcePath, targetPath);
    published.set(`${locale}:${target}`, `/images/docs/${assetLocale[locale]}/${target}`);
  }
}

for (const locale of Object.keys(locales)) {
  const contentDir = resolve(root, 'content', locale);
  const files = (await readdir(contentDir)).filter(name => name.endsWith('.json')).map(name => resolve(contentDir, name));
  for (const file of files) {
    let body = await readFile(file, 'utf8');
    for (const target of Object.keys(images)) {
      const localized = published.get(`${locale}:${target}`);
      if (localized) {
        body = body.replaceAll(`/images/docs/${target}`, localized);
        body = body.replaceAll(`images/docs/${target}`, localized.slice(1));
        body = body.replaceAll(`/images/docs/de/${target}`, localized);
        body = body.replaceAll(`images/docs/de/${target}`, localized.slice(1));
      }
    }
    if (locale !== 'de') {
      for (const match of [...body.matchAll(/images\/docs\/de\/([A-Za-z0-9_.\/-]+\.(?:png|jpe?g|webp|svg))/g)]) {
        const target = match[1];
        if (await exists(resolve(root, 'public/images/docs', assetLocale[locale], target))) {
          body = body.replaceAll(`images/docs/de/${target}`, `images/docs/${assetLocale[locale]}/${target}`);
        }
      }
    }
    await writeFile(file, body);
  }
}

console.log(`Veröffentlicht: ${published.size} lokalisierte Bilder.`);
if (missing.length) console.log(`Noch nicht aufnehmbar (${missing.length}):\n${missing.join('\n')}`);
