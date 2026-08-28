import { readFile, writeFile } from 'node:fs/promises';

const escape = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const marker = (body, name) => body.match(new RegExp(`<!-- ${name}:start -->[\\s\\S]*?<!-- ${name}:end -->`))?.[0] ?? '';
const removeMarker = (body, name) => body.replace(new RegExp(`\\s*<!-- ${name}:start -->[\\s\\S]*?<!-- ${name}:end -->\\s*`), '\n');
const headingPattern = (label) => new RegExp(`<h2(?:\\s[^>]*)?>${escape(label)}</h2>`);
const position = (body, label) => body.search(headingPattern(label));
const replaceRange = (body, from, to, replacement) => {
  const start = position(body, from);
  const end = position(body, to);
  if (start < 0 || end <= start) throw new Error(`Heading range not found: ${from} -> ${to}`);
  return `${body.slice(0, start)}${replacement}\n${body.slice(end)}`;
};
const insertBefore = (body, label, html) => {
  const index = position(body, label);
  if (index < 0) throw new Error(`Heading not found: ${label}`);
  return `${body.slice(0, index)}${html}\n${body.slice(index)}`;
};

const labels = {
  de: { assignment: '3. Rolle und persönliche Zuordnung verstehen', navigation: '4. In Kaderblick navigieren', templateMatch: 'Vorlage und Spielaufstellung', missingPlayer: 'Wenn ein Spieler fehlt', createEvent: 'Einen Termin anlegen', visibility: 'Sichtbarkeit festlegen', genericEvent: 'Vereinstreffen und Event: Ort und Sichtbarkeit', eventOverview: 'Die sechs Assistenten im Überblick', details: 'Termindetails und Teilnahme', eventMatch: 'Spiel', eventTraining: 'Training', eventTask: 'Aufgabe', eventTournament: 'Turnier', availability: 'Wann ein Trainer den Spieler sieht', invitation: 'Einladung zu einem Spiel beantworten', saveProblem: 'Wenn Speichern nicht möglich ist', videos: 'Videos', timing: 'Spielzeiten', templatePrep: 'Vorlage vorbereiten' },
  en: { assignment: '3. Understand your role and personal assignment', navigation: '4. Navigate Kaderblick', templateMatch: 'Template and match line-up', missingPlayer: 'If a player is missing', createEvent: 'Create an appointment', visibility: 'Set visibility', genericEvent: 'Club meeting and event: venue and visibility', eventOverview: 'The six event wizards', details: 'Appointment details and attendance', eventMatch: 'Match', eventTraining: 'Training', eventTask: 'Task', eventTournament: 'Tournament', availability: 'When a coach can see the player', invitation: 'Respond to a match invitation', saveProblem: 'If saving is not available', videos: 'Videos', timing: 'Match timings', templatePrep: 'Prepare a template' },
  fr: { assignment: '3. Comprendre le rôle et l’attribution personnelle', navigation: '4. Parcourir Kaderblick', templateMatch: 'Modèle et composition de match', missingPlayer: 'Si un joueur manque', createEvent: 'Créer un rendez-vous', visibility: 'Définir la visibilité', genericEvent: 'Réunion du club et événement : lieu et visibilité', eventOverview: 'Les six assistants', details: 'Détails et participation', eventMatch: 'Match', eventTraining: 'Entraînement', eventTask: 'Tâche', eventTournament: 'Tournoi', availability: 'Quand un entraîneur voit le joueur', invitation: 'Répondre à une invitation pour un match', saveProblem: 'Si l’enregistrement est impossible', videos: 'Vidéos', timing: 'Temps de jeu', templatePrep: 'Préparer un modèle' },
  ru: { assignment: '3. Понять роль и личное назначение', navigation: '4. Навигация в Kaderblick', templateMatch: 'Шаблон и состав матча', missingPlayer: 'Если игрок отсутствует', createEvent: 'Создание мероприятия', visibility: 'Настройка видимости', genericEvent: 'Собрание клуба и событие: место и видимость', eventOverview: 'Шесть мастеров событий', details: 'Подробности и участие', eventMatch: 'Матч', eventTraining: 'Тренировка', eventTask: 'Задача', eventTournament: 'Турнир', availability: 'Когда тренер видит игрока', invitation: 'Ответить на приглашение на матч', saveProblem: 'Если сохранение недоступно', videos: 'Видео', timing: 'Игровое время', templatePrep: 'Подготовка шаблона' },
  zh_Hans: { assignment: '3. 了解角色与个人关联', navigation: '4. 在 Kaderblick 中导航', templateMatch: '模板与比赛阵容', missingPlayer: '找不到球员时', createEvent: '新建日程', visibility: '设置可见范围', genericEvent: '俱乐部会议和活动：地点与可见范围', eventOverview: '六种事件向导', details: '日程详情与参与回复', eventMatch: '比赛', eventTraining: '训练', eventTask: '任务', eventTournament: '锦标赛', availability: '教练何时能看到该球员', invitation: '回复具体比赛的邀请', saveProblem: '无法保存时', videos: '视频', timing: '比赛时长', templatePrep: '准备阵容模板' },
};

for (const [locale, l] of Object.entries(labels)) {
  // First login: replace the short assignment section instead of appending a second explanation.
  {
    const file = new URL(`../content/${locale}/getting-started.json`, import.meta.url);
    const data = JSON.parse(await readFile(file, 'utf8'));
    let section = marker(data.body, 'registration-context');
    let body = removeMarker(data.body, 'registration-context');
    section = section.replace(/<h2[^>]*>[\s\S]*?<\/h2>/, `<h2 id="assignment">${l.assignment}</h2>`);
    if (position(body, l.assignment) >= 0) {
      body = replaceRange(body, l.assignment, l.navigation, section);
    } else {
      body = data.body.replace(marker(data.body, 'registration-context'), section);
    }
    data.body = body;
    await writeFile(file, `${JSON.stringify(data, null, 2)}\n`);
  }

  // Lineups: overview and editor first; the detailed template/match relationship replaces the old summary.
  {
    const file = new URL(`../content/${locale}/lineups.json`, import.meta.url);
    const data = JSON.parse(await readFile(file, 'utf8'));
    let section = marker(data.body, 'match-plan-guide');
    let body = removeMarker(data.body, 'match-plan-guide');
    section = section.replace(new RegExp(`<h3>${escape(l.templatePrep)}</h3><p>[\\s\\S]*?</p>`), '');
    if (position(body, l.templateMatch) >= 0) {
      body = replaceRange(body, l.templateMatch, l.missingPlayer, section);
    } else {
      body = insertBefore(body, l.missingPlayer, section);
    }
    data.body = body;
    await writeFile(file, `${JSON.stringify(data, null, 2)}\n`);
  }

  // Calendar: common creation first, then match; existing generic/training instructions remain,
  // followed by task and tournament before appointment details.
  {
    const file = new URL(`../content/${locale}/calendar.json`, import.meta.url);
    const data = JSON.parse(await readFile(file, 'utf8'));
    const event = marker(data.body, 'event-wizards');
    const existingOverviewMatch = marker(data.body, 'event-wizards-overview-match');
    const existingTaskTournament = marker(data.body, 'event-wizards-task-tournament');
    const external = marker(data.body, 'external-team-games');
    let body;
    if (event) {
      body = removeMarker(removeMarker(removeMarker(removeMarker(data.body, 'event-wizards'), 'external-team-games'), 'event-wizards-overview-match'), 'event-wizards-task-tournament');
      const clean = event.replace('<!-- event-wizards:start -->', '').replace('<!-- event-wizards:end -->', '');
      const matchAt = position(clean, l.eventMatch);
      const trainingAt = position(clean, l.eventTraining);
      const taskAt = position(clean, l.eventTask);
      const tournamentAt = position(clean, l.eventTournament);
      const overviewAndMatch = `${clean.slice(0, trainingAt)}${external}`;
      const taskAndTournament = clean.slice(taskAt);
      if (matchAt < 0 || trainingAt < 0 || taskAt < 0 || tournamentAt < 0) throw new Error(`Calendar sections missing for ${locale}`);
      const genericAnchor = position(body, l.visibility) >= 0 ? l.visibility : l.genericEvent;
      body = insertBefore(body, genericAnchor, `<!-- event-wizards-overview-match:start -->${overviewAndMatch}<!-- event-wizards-overview-match:end -->`);
      body = body.replace(headingPattern(l.visibility), `<h2>${l.genericEvent}</h2>`);
      body = insertBefore(body, l.details, `<!-- event-wizards-task-tournament:start -->${taskAndTournament}<!-- event-wizards-task-tournament:end -->`);
    } else if (existingOverviewMatch && existingTaskTournament) {
      body = removeMarker(data.body, 'external-team-games').replace(/<!-- event-wizards-(?:overview-match|task-tournament):(start|end) -->/g, '');
      const overviewAt = position(body, l.eventOverview);
      const genericAt = position(body, l.genericEvent);
      const taskAt = position(body, l.eventTask);
      const detailsAt = position(body, l.details);
      body = `${body.slice(0, detailsAt)}<!-- event-wizards-task-tournament:end -->${body.slice(detailsAt)}`;
      body = `${body.slice(0, taskAt)}<!-- event-wizards-task-tournament:start -->${body.slice(taskAt)}`;
      body = `${body.slice(0, genericAt)}${external}<!-- event-wizards-overview-match:end -->${body.slice(genericAt)}`;
      body = `${body.slice(0, overviewAt)}<!-- event-wizards-overview-match:start -->${body.slice(overviewAt)}`;
    } else {
      throw new Error(`Calendar documentation blocks missing for ${locale}`);
    }
    data.body = body;
    await writeFile(file, `${JSON.stringify(data, null, 2)}\n`);
  }

  // Helping out: availability setting and eligibility first, then the three actual paths and notifications.
  {
    const file = new URL(`../content/${locale}/help-out.json`, import.meta.url);
    const data = JSON.parse(await readFile(file, 'utf8'));
    const section = marker(data.body, 'helper-paths');
    let body = removeMarker(data.body, 'helper-paths');
    body = position(body, l.invitation) >= 0
      ? replaceRange(body, l.invitation, l.saveProblem, section)
      : insertBefore(body, l.saveProblem, section);
    data.body = body;
    await writeFile(file, `${JSON.stringify(data, null, 2)}\n`);
  }

  // Supporter request belongs directly after the video actions that can open it.
  {
    const file = new URL(`../content/${locale}/games.json`, import.meta.url);
    const data = JSON.parse(await readFile(file, 'utf8'));
    const section = marker(data.body, 'supporter-request');
    let body = removeMarker(data.body, 'supporter-request');
    body = insertBefore(body, l.timing, section);
    data.body = body;
    await writeFile(file, `${JSON.stringify(data, null, 2)}\n`);
  }
}
