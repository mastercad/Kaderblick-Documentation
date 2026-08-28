import { readFile, writeFile } from 'node:fs/promises';

const locales = {
  de: {
    title: 'Taktiken planen: global und für ein Spiel',
    intro: 'Die Taktiktafel ist ein eigenständiges Planungswerkzeug. Du kannst Taktiken dauerhaft an einer Aufstellungsvorlage vorbereiten oder direkt für die Startformation und jede weitere Phase eines konkreten Spiels planen.',
    globalTitle: 'Taktiken an einer Aufstellungsvorlage planen',
    globalText: 'Öffne unter <strong>Aufstellungen</strong> auf der gewünschten Vorlagenkarte die <strong>Taktiktafel</strong>. Die dort gespeicherten Taktiken gehören zur globalen Vorlage und stehen damit für weitere Spiele bereit.',
    matchTitle: 'Taktiken für ein konkretes Spiel planen',
    matchText: 'Öffne im Spiel den <strong>Match-Plan</strong> und bei der Startformation oder einer späteren Spielformation die Schaltfläche <strong>Taktiken</strong>. Was du dort speicherst, gehört nur zu dieser Spielphase.',
    controlsTitle: 'Die Taktiktafel bedienen',
    boardCaption: 'Dieselbe Taktiktafel wird für globale Vorlagen und für einzelne Spielphasen verwendet.',
    transferTitle: 'Taktiken zwischen Vorlage und Spiel übernehmen',
    transferText: 'Mit <strong>Taktiken aus Vorlage</strong> kopierst du ausschließlich die Taktiken einer globalen Aufstellungsvorlage in die gewählte Spielphase. Aufstellung und Vorlage bleiben unverändert; bereits vorhandene Taktiken dieser Spielphase werden ersetzt. Umgekehrt kannst du eine Spielaufstellung mit <strong>Als Vorlage speichern</strong> global wiederverwendbar machen und dabei entscheiden, ob ihre Taktiken mitkopiert werden.',
    importCaption: 'Der Import kopiert nur die Taktiken in die ausgewählte Spielphase.',
    saveCaption: 'Beim Speichern als globale Vorlage entscheidest du, ob die Spieltaktiken mitkopiert werden.',
    matchTitleMain: 'Aufstellungen im Match-Plan verwenden',
  },
  en: {
    title: 'Plan tactics globally and for a match',
    intro: 'The tactics board is a planning tool in its own right. You can prepare tactics permanently on a line-up template or plan them directly for the starting line-up and every later phase of a specific match.',
    globalTitle: 'Plan tactics on a line-up template',
    globalText: 'Under <strong>Line-ups</strong>, open the <strong>Tactics board</strong> on the required template card. Tactics saved there belong to the global template and remain available for future matches.',
    matchTitle: 'Plan tactics for a specific match',
    matchText: 'Open the match <strong>Match plan</strong> and select <strong>Tactics</strong> on the starting line-up or a later match phase. Anything saved there belongs only to that match phase.',
    controlsTitle: 'Use the tactics board',
    boardCaption: 'The same tactics board is used for global templates and individual match phases.',
    transferTitle: 'Transfer tactics between a template and a match',
    transferText: '<strong>Tactics from template</strong> copies only the tactics from a global line-up template into the selected match phase. The line-up and template remain unchanged; existing tactics in that match phase are replaced. Conversely, <strong>Save as template</strong> makes a match line-up globally reusable and lets you decide whether to copy its tactics.',
    importCaption: 'The import copies only the tactics into the selected match phase.',
    saveCaption: 'When saving a global template, choose whether to copy the match tactics.',
    matchTitleMain: 'Use line-ups in the match plan',
  },
  fr: {
    title: 'Planifier les tactiques globalement et pour un match',
    intro: 'Le tableau tactique est un outil de planification autonome. Vous pouvez préparer durablement des tactiques dans un modèle de composition ou les planifier pour la composition de départ et chaque phase d’un match précis.',
    globalTitle: 'Planifier les tactiques dans un modèle',
    globalText: 'Sous <strong>Compositions</strong>, ouvrez le <strong>Tableau tactique</strong> de la carte du modèle voulu. Les tactiques enregistrées ici appartiennent au modèle global et restent disponibles pour d’autres matchs.',
    matchTitle: 'Planifier les tactiques d’un match précis',
    matchText: 'Ouvrez le <strong>Plan de match</strong>, puis <strong>Tactiques</strong> dans la composition de départ ou une phase ultérieure. Les données enregistrées appartiennent uniquement à cette phase.',
    controlsTitle: 'Utiliser le tableau tactique',
    boardCaption: 'Le même tableau tactique sert aux modèles globaux et aux phases de match.',
    transferTitle: 'Transférer les tactiques entre modèle et match',
    transferText: '<strong>Tactiques du modèle</strong> copie uniquement les tactiques d’un modèle global vers la phase choisie. La composition et le modèle restent inchangés ; les tactiques existantes de cette phase sont remplacées. Inversement, <strong>Enregistrer comme modèle</strong> rend une composition de match réutilisable et permet de choisir si ses tactiques sont copiées.',
    importCaption: 'L’import copie uniquement les tactiques dans la phase choisie.',
    saveCaption: 'Lors de l’enregistrement du modèle global, choisissez si les tactiques du match sont copiées.',
    matchTitleMain: 'Utiliser les compositions dans le plan de match',
  },
  ru: {
    title: 'Планирование тактики: глобально и для матча',
    intro: 'Тактическая доска — самостоятельный инструмент. Тактику можно сохранить в шаблоне состава или спланировать для стартового состава и каждой фазы конкретного матча.',
    globalTitle: 'Тактика в шаблоне состава',
    globalText: 'В разделе <strong>Составы</strong> откройте <strong>Тактическую доску</strong> на карточке шаблона. Сохранённые здесь тактики принадлежат глобальному шаблону.',
    matchTitle: 'Тактика для конкретного матча',
    matchText: 'Откройте <strong>План матча</strong> и нажмите <strong>Тактики</strong> у стартового состава или более поздней фазы. Сохранённое относится только к этой фазе.',
    controlsTitle: 'Работа с тактической доской',
    boardCaption: 'Одна и та же доска используется для глобальных шаблонов и фаз матча.',
    transferTitle: 'Перенос тактики между шаблоном и матчем',
    transferText: '<strong>Тактики из шаблона</strong> копируют только тактики в выбранную фазу. Состав и шаблон не меняются; прежние тактики фазы заменяются. <strong>Сохранить как шаблон</strong> позволяет обратно создать глобальный шаблон с тактиками или без них.',
    importCaption: 'Импорт копирует только тактики в выбранную фазу.',
    saveCaption: 'При сохранении глобального шаблона выберите, копировать ли тактики матча.',
    matchTitleMain: 'Составы в плане матча',
  },
  zh_Hans: {
    title: '全局与单场比赛的战术规划', intro: '战术板是独立的规划工具。你可以在阵容模板中长期准备战术，也可以为某场比赛的首发阵容和后续每个阶段单独规划。',
    globalTitle: '在阵容模板中规划战术', globalText: '在<strong>阵容</strong>中打开相应模板卡片的<strong>战术板</strong>。在此保存的战术属于全局模板，可用于以后的比赛。',
    matchTitle: '为具体比赛规划战术', matchText: '打开比赛的<strong>比赛计划</strong>，然后在首发阵容或后续阶段中选择<strong>战术</strong>。在此保存的内容只属于该比赛阶段。',
    controlsTitle: '使用战术板', boardCaption: '全局模板和单个比赛阶段使用同一战术板。',
    transferTitle: '在模板与比赛之间传递战术', transferText: '<strong>从模板导入战术</strong>只会将全局阵容模板的战术复制到所选比赛阶段。阵容和模板保持不变；该阶段已有战术会被替换。反过来，<strong>另存为模板</strong>可将比赛阵容设为全局可复用，并决定是否同时复制战术。',
    importCaption: '导入只会将战术复制到所选比赛阶段。', saveCaption: '保存全局模板时，可选择是否复制比赛战术。',
    matchTitleMain: '在比赛计划中使用阵容',
  },
};

const figure = (src, alt, caption) => `<figure class="screenshot"><img src="${src}" alt="${alt}" class="screenshot__img" loading="lazy"><figcaption class="screenshot__caption">${caption}</figcaption></figure>`;

for (const [locale, text] of Object.entries(locales)) {
  const path = new URL(`../content/${locale}/lineups.json`, import.meta.url);
  const json = JSON.parse(await readFile(path, 'utf8'));
  const body = json.body;
  const matchStart = body.indexOf("<h2 id='match-plan'>");
  const missingStart = body.indexOf("<h2 id='missing-player'>");
  if (matchStart < 0 || missingStart < 0) throw new Error(`Expected sections missing: ${locale}`);
  const before = body.slice(0, matchStart);
  const match = body.slice(matchStart, missingStart);
  const missing = body.slice(missingStart);
  const get = (heading, next) => {
    const start = match.indexOf(`<h3>${heading}</h3>`);
    const end = next ? match.indexOf(`<h3>${next}</h3>`, start) : match.length;
    if (start < 0 || end < 0) throw new Error(`Expected subsection missing (${locale}): ${heading}`);
    return match.slice(start + `<h3>${heading}</h3>`.length, end);
  };
  const headings = [...match.matchAll(/<h3>([^<]+)<\/h3>/g)].map((entry) => entry[1]);
  const [controlsHeading, startHeading, phasesHeading, tacticsHeading, minutesHeading] = headings;
  const controls = get(controlsHeading, startHeading).replace(/<figure class="screenshot">.*?<\/figure>/s, '');
  const start = get(startHeading, phasesHeading);
  const phases = get(phasesHeading, tacticsHeading);
  const minutes = get(minutesHeading, null);
  const tacticsSection = `<h2 id='tactics-board'>${text.title}</h2><p>${text.intro}</p><h3>${text.globalTitle}</h3><p>${text.globalText}</p><h3>${text.matchTitle}</h3><p>${text.matchText}</p>${figure('images/docs/lineups/tactics-board.png', text.title, text.boardCaption)}<h3>${text.controlsTitle}</h3>${controls}<h3>${text.transferTitle}</h3><p>${text.transferText}</p>${figure('images/docs/games/match-plan-import-tactics.png', text.transferTitle, text.importCaption)}${figure('images/docs/games/match-plan-save-template.png', text.transferTitle, text.saveCaption)}`;
  const matchSection = `<h2 id='match-plan'>${text.matchTitleMain}</h2>${figure('images/docs/games/match-plan.png', text.matchTitleMain, text.matchTitleMain)}<h3>${startHeading}</h3>${start}<h3>${phasesHeading}</h3>${phases}<h3>${minutesHeading}</h3>${minutes}`;
  json.body = `${before}${tacticsSection}${matchSection}${missing}`.replace('<!-- match-plan-guide:start -->', '').replace('<!-- match-plan-guide:end -->', '');
  await writeFile(path, `${JSON.stringify(json, null, 4)}\n`);
}
