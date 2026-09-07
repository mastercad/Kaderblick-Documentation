import { chromium } from '../../Kaderblick-Website/frontend/node_modules/playwright/index.mjs';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { waitForReady } from './lib/wait-for-ready.mjs';

const baseUrl = process.env.KB_LOCAL_FRONTEND_URL ?? 'http://127.0.0.1:5173';
const apiPattern = 'http://localhost:8081/**';
const outputRoot = process.env.KB_CAPTURE_OUTPUT_ROOT;
const onlyLocale = process.env.KB_CAPTURE_LOCALE;
const captureCreation = process.env.KB_CAPTURE_CREATION === '1';

const locales = {
  de: {
    accountLocale: 'de', browserLocale: 'de-DE', path: 'de',
    event: 'Heimspiel gegen SV Beispielstadt', club: 'FC Sonnenberg', responsible: 'Anna Becker',
    areas: ['Innenraum', 'Haupteingang', 'Tageskasse', 'Parkplatz Nord', 'Sanitätsraum'],
    notes: ['Position an der Haupttribüne', 'Gäste zum Gästeblock weisen', 'Wechselgeld vor Beginn prüfen', 'Zufahrt für Mannschaftsbus freihalten', 'Notfallkoffer prüfen'],
    open: 'Einsatzplan öffnen', edit: 'Einsatzplan bearbeiten', create: 'Einsatzplan anlegen', configure: 'Neuen Einsatzplan einrichten', next: 'Weiter', settings: 'Vereinsweite Einstellungen', settingsHeading: 'Vereinsweite Grundlagen', templates: 'Vorlagen', newTemplate: 'Neue Vorlage', newTemplateHeading: 'Neue Planvorlage', templateNameLabel: 'Name der Vorlage', templateDescriptionLabel: 'Beschreibung der Vorlage', areaLabel: 'Bereich', existingTemplateName: 'Heimspiel Standard', existingTemplateDescription: 'Alle Dienste für ein Heimspiel', templateName: 'Heimspiel mit allen Diensten', templateDescription: 'Einlass, Kasse, Parkplatz und Sanitätsdienst', templateArea: 'Haupteingang',
  },
  en: {
    accountLocale: 'en', browserLocale: 'en-GB', path: 'en',
    event: 'Home match against Example City FC', club: 'Sonnenberg FC', responsible: 'Anna Becker',
    areas: ['Pitch perimeter', 'Main entrance', 'Matchday cash desk', 'North car park', 'Medical room'],
    notes: ['Position at the main stand', 'Direct away supporters to the away section', 'Check change before opening', 'Keep access clear for the team bus', 'Check the emergency kit'],
    open: 'Open duty plan', edit: 'Edit duty plan', create: 'Create duty plan', configure: 'Set up a new duty plan', next: 'Next', settings: 'Club-wide settings', settingsHeading: 'Club-wide foundations', templates: 'Templates', newTemplate: 'New template', newTemplateHeading: 'New plan template', templateNameLabel: 'Template name', templateDescriptionLabel: 'Template description', areaLabel: 'Area', existingTemplateName: 'Standard home match', existingTemplateDescription: 'All duties for a home match', templateName: 'Home match with all duties', templateDescription: 'Admission, cash desk, parking and medical service', templateArea: 'Main entrance',
  },
  fr: {
    accountLocale: 'fr', browserLocale: 'fr-FR', path: 'fr',
    event: 'Match à domicile contre FC Ville Exemple', club: 'FC Sonnenberg', responsible: 'Anna Becker',
    areas: ['Périmètre du terrain', 'Entrée principale', 'Caisse du jour', 'Parking nord', 'Salle médicale'],
    notes: ['Poste devant la tribune principale', 'Diriger les visiteurs vers leur tribune', 'Vérifier la monnaie avant l’ouverture', 'Libérer l’accès pour le car de l’équipe', 'Vérifier la trousse d’urgence'],
    open: 'Ouvrir le plan', edit: 'Modifier le plan', create: 'Créer un plan', configure: 'Configurer un nouveau plan', next: 'Suivant', settings: 'Paramètres du club', settingsHeading: 'Référentiel du club', templates: 'Modèles', newTemplate: 'Nouveau modèle', newTemplateHeading: 'Nouveau modèle de plan', templateNameLabel: 'Nom du modèle', templateDescriptionLabel: 'Description du modèle', areaLabel: 'Zone', existingTemplateName: 'Match à domicile standard', existingTemplateDescription: 'Tous les services pour un match à domicile', templateName: 'Match à domicile avec tous les services', templateDescription: 'Entrée, caisse, parking et service médical', templateArea: 'Entrée principale',
  },
  ru: {
    accountLocale: 'ru', browserLocale: 'ru-RU', path: 'ru',
    event: 'Домашний матч против ФК «Пример»', club: 'ФК «Зонненберг»', responsible: 'Анна Беккер',
    areas: ['Периметр поля', 'Главный вход', 'Касса в день матча', 'Северная парковка', 'Медицинский кабинет'],
    notes: ['Пост у главной трибуны', 'Направлять гостей в гостевой сектор', 'Проверить разменные деньги до открытия', 'Оставить проезд для автобуса команды', 'Проверить аптечку'],
    open: 'Открыть план', edit: 'Изменить план', create: 'Создать план', configure: 'Настроить новый план дежурств', next: 'Вперед', settings: 'Настройки клуба', settingsHeading: 'Общие настройки клуба', templates: 'Шаблоны', newTemplate: 'Новый шаблон', newTemplateHeading: 'Новый шаблон плана', templateNameLabel: 'Название шаблона', templateDescriptionLabel: 'Описание шаблона', areaLabel: 'Зона', existingTemplateName: 'Стандартный домашний матч', existingTemplateDescription: 'Все службы для домашнего матча', templateName: 'Домашний матч со всеми службами', templateDescription: 'Вход, касса, парковка и медицинская служба', templateArea: 'Главный вход',
  },
  'zh-hans': {
    accountLocale: 'zh-Hans', browserLocale: 'zh-CN', path: 'zh-hans',
    event: '主场对阵示例城足球俱乐部', club: '松嫩贝格足球俱乐部', responsible: '安娜·贝克尔',
    areas: ['场地内区', '主入口', '现场收银台', '北侧停车场', '医疗室'],
    notes: ['主看台值守点', '引导客队观众前往客队看台', '开放前检查备用零钱', '为球队大巴保留通道', '检查急救箱'],
    open: '打开计划', edit: '编辑计划', create: '创建计划', configure: '设置新的值勤计划', next: '下一步', settings: '俱乐部设置', settingsHeading: '俱乐部通用设置', templates: '模板', newTemplate: '新建模板', newTemplateHeading: '新建计划模板', templateNameLabel: '模板名称', templateDescriptionLabel: '模板说明', areaLabel: '区域', existingTemplateName: '标准主场比赛', existingTemplateDescription: '主场比赛的全部值勤', templateName: '包含全部值勤的主场比赛', templateDescription: '入口、收银、停车和医疗服务', templateArea: '主入口',
  },
};

const dutyTypes = [
  { id: 1, code: 'steward', name: 'Ordnungsdienst', color: '#d32f2f', icon: 'security', defaultStartOffsetMinutes: -90, defaultEndOffsetMinutes: 120 },
  { id: 2, code: 'admission', name: 'Einlass', color: '#1976d2', icon: 'how_to_reg', defaultStartOffsetMinutes: -90, defaultEndOffsetMinutes: 45 },
  { id: 3, code: 'cash_desk', name: 'Kasse', color: '#2e7d32', icon: 'point_of_sale', defaultStartOffsetMinutes: -90, defaultEndOffsetMinutes: 45 },
  { id: 4, code: 'parking', name: 'Parkplatz', color: '#ed6c02', icon: 'local_parking', defaultStartOffsetMinutes: -90, defaultEndOffsetMinutes: 30 },
  { id: 5, code: 'medical', name: 'Sanitätsdienst', color: '#7b1fa2', icon: 'medical_services', defaultStartOffsetMinutes: -60, defaultEndOffsetMinutes: 120 },
];

function sampleData(copy) {
  const assignments = [
    [{ id: 11, userId: 11, userName: 'Michael Wagner', status: 'confirmed', checkedInAt: null, checkedOutAt: null, hasConflict: false, canRespond: false, canManage: true }, { id: 12, userId: 12, userName: 'Julia Hoffmann', status: 'pending', checkedInAt: null, checkedOutAt: null, hasConflict: false, canRespond: false, canManage: true }],
    [{ id: 21, userId: 13, userName: 'Thomas Klein', status: 'confirmed', checkedInAt: null, checkedOutAt: null, hasConflict: false, canRespond: false, canManage: true }],
    [{ id: 31, userId: 14, userName: 'Sofia Richter', status: 'offered', checkedInAt: null, checkedOutAt: null, hasConflict: false, canRespond: false, canManage: true }],
    [{ id: 41, userId: 15, userName: 'Daniel Weber', status: 'confirmed', checkedInAt: '2026-09-20T13:01:00+02:00', checkedOutAt: null, hasConflict: false, canRespond: false, canManage: true }],
    [{ id: 51, userId: 16, userName: 'Elena Fischer', status: 'confirmed', checkedInAt: null, checkedOutAt: null, hasConflict: false, canRespond: false, canManage: true }],
  ];
  const slots = dutyTypes.map((type, index) => ({
    id: 101 + index,
    dutyTypeId: type.id,
    dutyType: { id: type.id, code: type.code, name: type.name, color: type.color },
    area: copy.areas[index],
    startsAt: index === 4 ? '2026-09-20T13:30:00+02:00' : '2026-09-20T13:00:00+02:00',
    endsAt: index < 3 ? '2026-09-20T15:15:00+02:00' : '2026-09-20T17:15:00+02:00',
    requiredCount: index === 0 ? 3 : index === 3 ? 2 : 1,
    notes: copy.notes[index],
    requiredQualificationIds: index === 4 ? [1] : [],
    userIds: assignments[index].filter((entry) => entry.status !== 'offered').map((entry) => entry.userId),
    assignedCount: assignments[index].filter((entry) => ['pending', 'confirmed'].includes(entry.status)).length,
    assignments: assignments[index],
    canOffer: false,
  }));
  const plan = {
    id: 77, eventId: 1001, eventTitle: copy.event,
    eventStart: '2026-09-20T14:30:00+02:00', eventEnd: '2026-09-20T16:15:00+02:00',
    location: 'Sportzentrum Sonnenberg', clubId: 1, clubName: copy.club,
    responsibleUserId: 10, responsibleUserName: copy.responsible, status: 'published',
    responseDeadline: '2026-09-17T18:00:00+02:00',
    instructions: copy.notes[0], selfSignupEnabled: true, publishedAt: '2026-09-10T09:15:00+02:00',
    canManage: true, canExport: true, isAssignedToViewer: false, viewerHasPendingResponse: false, slots,
  };
  const catalogue = {
    types: dutyTypes,
    qualifications: [{ id: 1, code: 'first-aid', name: 'Erste Hilfe', description: 'Gültiger Nachweis' }],
    templates: [{ id: 1, name: copy.existingTemplateName, description: copy.existingTemplateDescription, slots: slots.map((slot) => ({ dutyTypeId: slot.dutyTypeId, area: slot.area, requiredCount: slot.requiredCount, requiredQualificationIds: slot.requiredQualificationIds, startOffsetMinutes: -90, endOffsetMinutes: 45 })) }],
    candidates: [
      { id: 10, fullName: copy.responsible, context: copy.club, canCoordinateDuties: true, qualifications: [] },
      { id: 11, fullName: 'Michael Wagner', context: copy.club, qualifications: [] },
      { id: 12, fullName: 'Julia Hoffmann', context: copy.club, qualifications: [] },
      { id: 13, fullName: 'Thomas Klein', context: copy.club, qualifications: [] },
      { id: 14, fullName: 'Sofia Richter', context: copy.club, qualifications: [] },
      { id: 15, fullName: 'Daniel Weber', context: copy.club, qualifications: [] },
      { id: 16, fullName: 'Elena Fischer', context: copy.club, qualifications: [{ qualificationId: 1, validUntil: '2027-12-31' }] },
    ],
  };
  return { plan, catalogue };
}

async function mockApi(page, locale, copy) {
  const { plan, catalogue } = sampleData(copy);
  await page.route(apiPattern, async (route) => {
    const request = route.request();
    const url = new URL(request.url());
    let body = {};
    if (url.pathname === '/api/about-me') {
      body = { id: 10, email: 'organisation@example.invalid', name: copy.responsible, firstName: copy.responsible.split(' ')[0], lastName: copy.responsible.split(' ').slice(1).join(' '), isCoach: false, canManageEventDuties: true, locale: copy.accountLocale, roles: { 0: 'ROLE_USER' } };
    } else if (url.pathname === '/api/event-duties') {
      body = { plans: [plan, { ...plan, id: 78, eventId: 1002, eventTitle: `${copy.event} II`, eventStart: '2026-10-04T14:30:00+02:00', status: 'draft', slots: plan.slots.slice(0, 3) }] };
    } else if (url.pathname === '/api/event-duties/event/1001') {
      body = { plan };
    } else if (url.pathname === '/api/event-duties/clubs') {
      body = { clubs: [{ id: 1, name: copy.club }] };
    } else if (url.pathname === '/api/event-duties/club/1/catalogue') {
      body = catalogue;
    } else if (url.pathname === '/api/calendar/events') {
      body = [{
        id: 1003, title: `${copy.event} III`,
        start: '2026-10-18T14:30:00+02:00', end: '2026-10-18T16:15:00+02:00',
        location: { id: 1, name: 'Sportzentrum Sonnenberg' },
        cancelled: false, eventDutyPlan: null,
        permissions: { canManageEventDuties: true },
      }];
    } else if (url.pathname === '/api/notifications') {
      body = { notifications: [] };
    } else if (url.pathname === '/api/notifications/unread') {
      body = { count: 0 };
    } else if (url.pathname === '/admin/feedback/attention') {
      body = { requiresAttention: false };
    }
    await route.fulfill({ status: 200, contentType: 'application/json; charset=utf-8', body: JSON.stringify(body), headers: { 'Access-Control-Allow-Origin': baseUrl, 'Access-Control-Allow-Credentials': 'true' } });
  });
}

async function capture(locale, copy, browser) {
  const output = outputRoot
    ? resolve(outputRoot, copy.path, 'event-duties')
    : fileURLToPath(new URL(`../public/images/docs/${copy.path}/event-duties/`, import.meta.url));
  await mkdir(output, { recursive: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1100 }, locale: copy.browserLocale, colorScheme: 'light' });
  const page = await context.newPage();
  await mockApi(page, locale, copy);
  await page.goto(`${baseUrl}/einsatzplanung`, { waitUntil: 'domcontentloaded' });
  await page.getByText(copy.event, { exact: true }).first().waitFor({ state: 'visible', timeout: 30000 });
  await waitForReady(page, page.locator('main').first());
  await page.locator('main').screenshot({ path: resolve(output, 'overview.png') });

  if (captureCreation) {
    await page.getByRole('button', { name: copy.create }).click();
    const creationDialog = page.getByRole('dialog').first();
    await creationDialog.getByRole('combobox').waitFor({ state: 'visible' });
    await waitForReady(page, creationDialog);
    await creationDialog.screenshot({ path: resolve(output, 'create-select.png') });
    await creationDialog.getByRole('combobox').click();
    await page.getByRole('option').first().click();
    await creationDialog.getByRole('button', { name: copy.next }).click();
    await creationDialog.getByText(copy.configure, { exact: true }).waitFor({ state: 'visible' });
    await waitForReady(page, creationDialog);
    await creationDialog.screenshot({ path: resolve(output, 'create-plan.png') });
    await page.keyboard.press('Escape');
    await creationDialog.waitFor({ state: 'hidden' });
  }

  await page.getByRole('button', { name: copy.open }).first().click();
  const planDialog = page.getByRole('dialog').first();
  await planDialog.getByText(copy.areas[0], { exact: false }).first().waitFor({ state: 'visible' });
  await waitForReady(page, planDialog);
  await planDialog.screenshot({ path: resolve(output, 'plan-details.png') });

  await planDialog.getByRole('button', { name: copy.edit }).click();
  const editorTitle = page.getByRole('heading', { name: copy.edit, exact: true });
  await editorTitle.waitFor({ state: 'visible' });
  const editorDialog = editorTitle.locator('xpath=ancestor::*[@role="dialog"]');
  await editorDialog.locator('input').nth(3).waitFor({ state: 'visible' });
  await waitForReady(page, editorDialog);
  await editorDialog.screenshot({ path: resolve(output, 'edit-plan.png') });

  await page.keyboard.press('Escape');
  await editorDialog.waitFor({ state: 'hidden' });
  await page.keyboard.press('Escape');
  await planDialog.waitFor({ state: 'hidden' });
  await page.getByRole('tab', { name: copy.settings }).click();
  const settingsPage = page.locator('main').first();
  await settingsPage.getByText(copy.settingsHeading, { exact: true }).waitFor({ state: 'visible' });
  await settingsPage.getByText(copy.club, { exact: true }).first().waitFor({ state: 'visible' });
  await waitForReady(page, settingsPage);
  await settingsPage.screenshot({ path: resolve(output, 'settings.png') });

  await settingsPage.getByRole('tab', { name: new RegExp(`^${copy.templates}`) }).click();
  await settingsPage.getByRole('button', { name: copy.newTemplate }).waitFor({ state: 'visible' });
  await waitForReady(page, settingsPage);
  await settingsPage.screenshot({ path: resolve(output, 'settings-templates.png') });

  await settingsPage.getByRole('button', { name: copy.newTemplate }).click();
  const templateDialog = page.getByRole('dialog', { name: copy.newTemplateHeading });
  await templateDialog.waitFor({ state: 'visible' });
  await templateDialog.getByLabel(copy.templateNameLabel, { exact: false }).fill(copy.templateName);
  await templateDialog.getByLabel(copy.templateDescriptionLabel, { exact: false }).fill(copy.templateDescription);
  await templateDialog.getByRole('textbox', { name: copy.areaLabel, exact: true }).fill(copy.templateArea);
  await waitForReady(page, templateDialog);
  await templateDialog.screenshot({ path: resolve(output, 'template-create.png') });

  await context.close();
}

const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/google-chrome' });
try {
  for (const [locale, copy] of Object.entries(locales)) {
    if (onlyLocale && locale !== onlyLocale) continue;
    await capture(locale, copy, browser);
    console.log(`Einsatzplanung aufgenommen: ${locale}`);
  }
} finally {
  await browser.close();
}
