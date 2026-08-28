import { readFile, writeFile } from 'node:fs/promises';

const sections = {
  'getting-started': ['open-kaderblick', 'account', 'roles', 'navigation', 'profile', 'dashboard', 'troubleshooting'],
  reports: ['saved-reports', 'workflow-choice', 'mobile-wizard', 'report-builder', 'dashboard-use', 'data-sources', 'visibility'],
  calendar: ['calendar-basics', 'event-creation', 'wizard-types', 'game-event', 'external-teams', 'event-visibility', 'training', 'task', 'tournament', 'participation', 'event-management', 'role-differences', 'connected-areas'],
  games: ['filters', 'overview-areas', 'game-creation', 'game-details', 'live-ticker', 'match-plan', 'events', 'videos', 'supporter-access', 'playing-times', 'personal-matchday', 'imports-and-tournaments', 'access-differences'],
  profile: ['profile-navigation', 'profile-header', 'personal-data', 'equipment', 'settings', 'notifications', 'api-token', 'calendar-integration', 'absences', 'documents'],
  dashboard: ['dashboard-overview', 'add-widget', 'manage-widgets', 'widget-types', 'quick-response', 'training-proof', 'role-actions', 'troubleshooting'],
  lineups: ['template-overview', 'create-template', 'lineup-editor', 'tactics-board', 'match-plan', 'missing-player'],
  'clubs-teams': ['my-team', 'club-season', 'manage-teams', 'manage-clubs', 'roles-visibility'],
};

for (const locale of ['de', 'en', 'fr', 'ru', 'zh_Hans']) {
  for (const [page, ids] of Object.entries(sections)) {
    const path = new URL(`../content/${locale}/${page}.json`, import.meta.url);
    let source = await readFile(path, 'utf8');
    let position = 0;
    source = source.replace(/<h2[^>]*>/g, () => {
      const id = ids[position++];
      if (!id) throw new Error(`${locale}/${page}: more h2 sections than configured`);
      return `<h2 id='${id}'>`;
    });
    if (position !== ids.length) throw new Error(`${locale}/${page}: found ${position} h2 sections, expected ${ids.length}`);
    await writeFile(path, source);
  }
}

console.log('Explicit semantic section ids added to all long-form source documents.');
