/* Unlocking English with Val — holiday calendar (shared by the site home page and the teacher hub).
   Fixed dates: m/d. Movable dates are computed by rule (Easter algorithms, "n-th weekday of month"),
   checked against published 2027 dates: Western Easter 28.03.2027, Orthodox Easter 02.05.2027,
   Масленица 08–14.03.2027, Chinese New Year 06.02.2027, World Book Day UK 04.03.2027.
   region: uk | us | ru | int.   tags: words matched against lesson file names on the site.
   idea: short lesson idea for the teacher (shown only in the teacher hub). */
(function (root) {
  function D(y, m, d) { return new Date(y, m - 1, d); }
  function nth(y, m, wd, n) { var d = D(y, m, 1), s = (wd - d.getDay() + 7) % 7; return D(y, m, 1 + s + (n - 1) * 7); }   // n-th weekday (0=Sun)
  function last(y, m, wd) { var d = D(y, m + 1, 0); return D(y, m, d.getDate() - ((d.getDay() - wd + 7) % 7)); }
  function easter(y) { var a = y % 19, b = Math.floor(y / 100), c = y % 100, d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30, i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451), mo = Math.floor((h + l - 7 * m + 114) / 31), da = ((h + l - 7 * m + 114) % 31) + 1; return D(y, mo, da); }
  function orthodox(y) { var a = y % 4, b = y % 7, c = y % 19, d = (19 * c + 15) % 30, e = (2 * a + 4 * b - d + 34) % 7, mo = Math.floor((d + e + 114) / 31), da = ((d + e + 114) % 31) + 1; var j = D(y, mo, da); j.setDate(j.getDate() + 13); return j; }
  function add(dt, n) { var x = new Date(dt); x.setDate(x.getDate() + n); return x; }
  var CNY = { 2026: [2, 17], 2027: [2, 6], 2028: [1, 26] };   // Chinese New Year, lunar: table only
  var WBD = { 2026: [3, 5], 2027: [3, 4] };                    // World Book Day UK, set by organisers each year

  var H = [
    { m: 1, d: 1, em: "🎆", en: "New Year's Day", ru: "Новый год", region: "int", tags: ["new-year", "newyear"], idea: "Resolutions: дети — «I'm going to…» + рисунок-плакат; взрослые — going to / will, обсуждение реалистичных целей." },
    { m: 1, d: 7, em: "⭐", en: "Orthodox Christmas", ru: "Рождество (правосл.)", region: "ru", tags: ["christmas"], idea: "Сравнить, как празднуют Рождество в России и в Британии: Venn diagram, Present Simple для традиций." },
    { m: 1, d: 25, em: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", en: "Burns Night", ru: "Ночь Бёрнса (Шотландия)", region: "uk", tags: ["burns"], idea: "Шотландия: карта, еда (haggis), короткое стихотворение; подросткам и взрослым — Auld Lang Syne и разбор лексики." },
    { m: 1, d: 25, em: "🎓", en: "Students' Day", ru: "Татьянин день, день студента", region: "ru", tags: [], idea: "Взрослые: student life then and now (used to, Past Simple)." },
    { rule: function (y) { return nth(y, 1, 1, 3); }, em: "✊", en: "Martin Luther King Jr. Day", ru: "День Мартина Лютера Кинга (США)", region: "us", tags: [], idea: "Подростки B1: отрывок «I have a dream», свои мечты для мира (I hope / I wish)." },
    { m: 2, d: 2, em: "🦫", en: "Groundhog Day", ru: "День сурка (США)", region: "us", tags: ["groundhog"], idea: "Погода и прогнозы: will / won't; взрослым — фильм «Groundhog Day» и «если бы день повторялся» (second conditional)." },
    { rule: function (y) { var c = CNY[y]; return c && D(y, c[0], c[1]); }, em: "🏮", en: "Chinese New Year", ru: "Китайский Новый год", region: "int", tags: ["chinese-new-year", "lunar-new-year"], idea: "Дети: животные зодиака и сравнения (faster than, bigger than); взрослые — традиции праздников мира." },
    { m: 2, d: 14, em: "💌", en: "Valentine's Day", ru: "День святого Валентина", region: "int", tags: ["valentine"], idea: "Дети: открытка с комплиментами (You are kind because…); подростки — friendship quiz; взрослые — romantic films, describing people." },
    { m: 2, d: 21, em: "🗣️", en: "International Mother Language Day", ru: "Международный день родного языка", region: "int", tags: [], idea: "Ложные друзья переводчика (magazine, sympathetic): разбор русской интерференции." },
    { m: 2, d: 23, em: "🎖️", en: "Defender of the Fatherland Day", ru: "День защитника Отечества", region: "ru", tags: [], idea: "Describing people: качества характера (brave, reliable), рассказ о человеке, которым гордишься." },
    { rule: function (y) { return add(easter(y), -47); }, em: "🥞", en: "Pancake Day (Shrove Tuesday)", ru: "Блинный вторник (Великобритания)", region: "uk", tags: ["pancake"], idea: "Рецепт блинов: императив + first, then, after that; британская pancake race." },
    { rule: function (y) { return add(orthodox(y), -55); }, days: 7, em: "🥞", en: "Maslenitsa", ru: "Масленица", region: "ru", tags: ["pancake", "maslenitsa"], idea: "В паре с Pancake Day: Масленица vs Pancake Day — сравнение традиций, рассказать иностранцу о русском празднике." },
    { m: 3, d: 1, em: "🌼", en: "St David's Day", ru: "День святого Давида (Уэльс)", region: "uk", tags: [], idea: "Четыре части UK: флаги, символы (daffodil, leek), квиз «UK or not UK»." },
    { rule: function (y) { var c = WBD[y]; return c && D(y, c[0], c[1]); }, em: "📚", en: "World Book Day (UK)", ru: "День книги в Британии", region: "uk", tags: ["world-book-day"], idea: "Дети: костюм любимого героя и описание (He's got… He can…); взрослые — book recommendation." },
    { m: 3, d: 8, em: "🌷", en: "International Women's Day", ru: "Международный женский день", region: "int", tags: ["women-s-day", "womens-day"], idea: "Inspiring women: короткие биографии в Past Simple, quiz «Who am I?»." },
    { rule: function (y) { return add(easter(y), -21); }, em: "💐", en: "Mothering Sunday (UK)", ru: "День матери в Британии", region: "uk", tags: ["mother-s-day", "mothers-day", "mothering"], idea: "Открытка маме: thank you for + -ing; сравнить с Днём матери в России (ноябрь)." },
    { m: 3, d: 17, em: "☘️", en: "St Patrick's Day", ru: "День святого Патрика", region: "uk", tags: ["patrick"], idea: "Ирландия: легенды, лепреконы, зелёный цвет; дети — treasure hunt с предлогами места." },
    { m: 3, d: 20, em: "😊", en: "International Day of Happiness", ru: "Международный день счастья", region: "int", tags: ["happiness"], idea: "Что делает нас счастливыми: прилагательные чувств, makes me feel…, опрос и мини-статистика." },
    { m: 4, d: 1, em: "🤡", en: "April Fools' Day", ru: "День смеха", region: "int", tags: ["april-fools", "april-fool"], idea: "True or false? Фейковые новости, шутки и каламбуры; взрослым — reported speech." },
    { rule: function (y) { return easter(y); }, em: "🐣", en: "Easter", ru: "Пасха (зап.)", region: "uk", tags: ["easter"], idea: "Easter egg hunt с предлогами (under, behind, next to); взрослым — British Easter traditions + bank holidays." },
    { rule: function (y) { return orthodox(y); }, em: "🥚", en: "Orthodox Easter", ru: "Пасха (правосл.)", region: "ru", tags: ["easter"], idea: "Рассказать иностранцу, как празднуют Пасху в семье: Present Simple, usually / always." },
    { m: 4, d: 12, em: "🚀", en: "Cosmonautics Day", ru: "День космонавтики", region: "ru", tags: ["cosmonaut", "gagarin"], idea: "Space: планеты, сравнительные степени, Gagarin's biography (Past Simple), «интервью с космонавтом»." },
    { m: 4, d: 22, em: "🌍", en: "Earth Day", ru: "День Земли", region: "int", tags: ["earth-day"], idea: "Экология: should / shouldn't, eco-habits challenge на неделю (связать с ДЗ)." },
    { m: 4, d: 23, em: "🎭", en: "Shakespeare Day · English Language Day", ru: "День Шекспира, день английского языка", region: "int", tags: ["shakespeare"], idea: "Слова, которые придумал Шекспир; подросткам — Romeo and Juliet in emojis." },
    { m: 5, d: 1, em: "🌸", en: "May Day", ru: "Праздник весны и труда", region: "int", tags: [], idea: "Британский May Day (maypole) и работа мечты: jobs vocabulary, would like to." },
    { m: 5, d: 9, em: "🕊️", en: "Victory Day", ru: "День Победы", region: "ru", tags: ["victory-day"], idea: "Взрослым и подросткам B1: семейная история в Past Simple / Past Continuous, бережно и по желанию ученика." },
    { rule: function (y) { return nth(y, 5, 0, 2); }, em: "💐", en: "Mother's Day (US)", ru: "День матери в США", region: "us", tags: ["mother-s-day", "mothers-day"], idea: "Описание человека: внешность и характер, письмо-благодарность." },
    { m: 6, d: 1, em: "🎈", en: "Children's Day", ru: "День защиты детей", region: "int", tags: ["children-s-day"], idea: "Детям: игры на улице и правила (can / can't, must); summer plans (going to)." },
    { m: 6, d: 12, em: "🏛️", en: "Russia Day", ru: "День России", region: "ru", tags: [], idea: "Рассказать о своём городе туристу: there is / there are, рекомендации (you should visit…)." },
    { rule: function (y) { return nth(y, 6, 0, 3); }, em: "👔", en: "Father's Day (UK, US)", ru: "День отца (Британия, США)", region: "int", tags: ["father-s-day", "fathers-day"], idea: "My dad / my hero: describing people, хобби (likes + -ing)." },
    { m: 7, d: 4, em: "🎇", en: "Independence Day (US)", ru: "День независимости США", region: "us", tags: ["independence-day", "4th-of-july"], idea: "USA quiz, American vs British English (pants/trousers, fall/autumn)." },
    { m: 9, d: 1, em: "🎒", en: "Knowledge Day", ru: "День знаний", region: "ru", tags: ["back-to-school"], idea: "Back to school: школьные предметы, расписание, цели на год (I want to… by May)." },
    { m: 9, d: 26, em: "💬", en: "European Day of Languages", ru: "Европейский день языков", region: "int", tags: [], idea: "Как поздороваться на 10 языках, моя история с английским: Present Perfect (I've been learning…)." },
    { rule: function (y) { return nth(y, 10, 0, 3); }, em: "👔", en: "Father's Day (Russia)", ru: "День отца в России", region: "ru", tags: ["father-s-day", "fathers-day"], idea: "My dad / my hero: describing people, хобби (likes + -ing)." },
    { m: 10, d: 5, em: "🍎", en: "World Teachers' Day", ru: "День учителя", region: "int", tags: ["teachers-day", "teacher-s-day"], idea: "Мой лучший учитель: Past Simple + used to; подросткам — «если бы я был учителем» (second conditional)." },
    { m: 10, d: 31, em: "🎃", en: "Halloween", ru: "Хэллоуин", region: "int", tags: ["halloween"], idea: "Дети: монстры и описание внешности (He's got…); подростки — spooky stories; взрослые — суеверия и страхи." },
    { m: 11, d: 4, em: "🤝", en: "Unity Day", ru: "День народного единства", region: "ru", tags: [], idea: "Взрослым: national holidays in Russia vs UK — сравнение дат и традиций." },
    { m: 11, d: 5, em: "🔥", en: "Bonfire Night (Guy Fawkes Night)", ru: "Ночь костров (Великобритания)", region: "uk", tags: ["bonfire", "guy-fawkes"], idea: "История Порохового заговора в Past Simple, стишок «Remember, remember…», фейерверки и звуки (bang, whoosh)." },
    { m: 11, d: 11, em: "🌺", en: "Remembrance Day · Veterans Day", ru: "День памяти (Британия), День ветеранов (США)", region: "uk", tags: ["remembrance-day", "poppy-day"], idea: "Символ мака (poppy) и минута молчания: подросткам B1 — короткий текст и обсуждение." },
    { rule: function (y) { return nth(y, 11, 4, 4); }, em: "🦃", en: "Thanksgiving (US)", ru: "День благодарения (США)", region: "us", tags: ["thanksgiving"], idea: "Gratitude: I'm thankful for…, традиционное меню (countable / uncountable), «письмо благодарности»." },
    { rule: function (y) { return last(y, 11, 0); }, em: "💐", en: "Mother's Day (Russia)", ru: "День матери в России", region: "ru", tags: ["mother-s-day", "mothers-day"], idea: "Открытка маме: thank you for + -ing; описание человека." },
    { m: 12, d: 24, em: "🕯️", en: "Christmas Eve", ru: "Сочельник (зап.)", region: "uk", tags: ["christmas"], idea: "Письмо Санте (I'd like…, I've been good because…)." },
    { m: 12, d: 25, em: "🎄", en: "Christmas Day", ru: "Рождество (зап.)", region: "uk", tags: ["christmas", "xmas"], idea: "Дети: Christmas words и песни; подростки — British Christmas traditions; взрослые — Christmas films и рецепты." },
    { m: 12, d: 26, em: "🎁", en: "Boxing Day", ru: "День подарков (Британия)", region: "uk", tags: ["christmas"], idea: "Распродажи и шопинг: How much is…? Can I try it on? Сравнение цен." },
    { m: 12, d: 31, em: "🥂", en: "New Year's Eve", ru: "Канун Нового года", region: "int", tags: ["new-year", "newyear"], idea: "Итоги года: Present Perfect (This year I've…) и планы (going to)." }
  ];

  function forYear(y) {
    var out = [];
    H.forEach(function (h) {
      var dt = h.rule ? h.rule(y) : D(y, h.m, h.d);
      if (!dt) return;
      for (var i = 0; i < (h.days || 1); i++) { var x = add(dt, i); out.push({ date: x, key: key(x), first: i === 0, h: h }); }
    });
    return out.sort(function (a, b) { return a.date - b.date; });
  }
  function key(d) { return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2); }
  root.UE_HOLIDAYS = { forYear: forYear, key: key, list: H, REGION: { uk: "🇬🇧", us: "🇺🇸", ru: "🇷🇺", int: "🌍" } };
})(typeof window !== "undefined" ? window : this);

/* ===== Calendar widget. UE_CAL.render(el, {teacher:bool, lessons:[{title,href,file}], events:{'YYYY-MM-DD':[{who,title,href,kind}]}}) ===== */
(function (root) {
  var U = root.UE_HOLIDAYS;
  var MON = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
  var MON_EN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var MON_G = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
  var WD = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
  var CSS = ".uecal{background:var(--paper,#fff);border:1px solid var(--line,#E6DCD0);border-radius:24px;padding:20px;box-shadow:0 1px 2px rgba(74,52,38,.04),0 8px 24px rgba(74,52,38,.06);color:var(--ink,#3B2A1F)}" +
    ".uecal *{box-sizing:border-box}.uecal-cols{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,1fr);gap:22px}" +
    ".uecal-head{display:flex;align-items:center;gap:8px;margin-bottom:10px}.uecal-head b{flex:1;font:700 20px/1.2 'Playfair Display',Georgia,serif}.uecal-head b small{display:block;font:500 12px/1.3 Montserrat,system-ui,sans-serif;color:var(--muted,#7A6555)}" +
    ".uecal-nav{width:36px;height:36px;border-radius:50%;border:1px solid var(--line,#E6DCD0);background:var(--besh,#F9F6F0);color:var(--coffee,#6F4E37);font-size:18px;cursor:pointer}.uecal-nav:hover{background:var(--sand,#EFE6DC)}" +
    ".uecal-grid{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:4px}.uecal-wd{font-size:11px;font-weight:600;color:var(--muted,#7A6555);text-align:center;padding:2px 0}" +
    ".uecal-d{position:relative;min-height:46px;border-radius:12px;border:1px solid transparent;background:var(--besh,#F9F6F0);padding:4px 5px;font-size:13px;text-align:left;cursor:pointer;color:inherit;font-family:inherit}" +
    ".uecal-d.out{opacity:.35}.uecal-d.we span.n{color:var(--coffee,#6F4E37)}.uecal-d.today{border-color:var(--coffee,#6F4E37)}.uecal-d.sel{background:var(--sand,#EFE6DC);border-color:var(--hazelnut,#CFB59E)}" +
    ".uecal-d.hol{background:#FBEFE3}.uecal-d .fl{display:block;font-size:15px;line-height:1.2;margin-top:2px;letter-spacing:-2px}.uecal-d .dots{position:absolute;right:5px;top:6px;display:flex;gap:2px}.uecal-d .dots i{width:6px;height:6px;border-radius:50%;background:var(--denim,#3E6A8A)}" +
    ".uecal-legend{display:flex;flex-wrap:wrap;gap:6px 12px;margin-top:10px;font-size:11px;color:var(--muted,#7A6555)}.uecal-legend i{display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--denim,#3E6A8A);margin-right:4px}" +
    ".uecal-side h3{font:700 16px/1.3 'Playfair Display',Georgia,serif;margin:0 0 8px}.uecal-it{border-top:1px solid var(--line,#E6DCD0);padding:10px 0}.uecal-it:first-of-type{border-top:0;padding-top:0}" +
    ".uecal-it .t{font-weight:600}.uecal-it .t small{font-weight:500;color:var(--muted,#7A6555)}.uecal-it .ru{font-size:13px;color:var(--muted,#7A6555)}.uecal-it .idea{font-size:13px;background:var(--besh,#F9F6F0);border-radius:10px;padding:6px 10px;margin-top:6px}" +
    ".uecal-it .ls{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}.uecal-it .ls a{font-size:12px;background:#E4EEF5;color:var(--denim,#3E6A8A);border-radius:999px;padding:3px 10px;text-decoration:none;font-weight:600}.uecal-it .ls a:hover{background:var(--denim,#3E6A8A);color:#fff}" +
    ".uecal-it .ev{font-size:13px;display:flex;gap:6px;align-items:baseline}.uecal-it .ev b{white-space:nowrap}.uecal-it .ev a{color:var(--denim,#3E6A8A)}.uecal-empty{font-size:13px;color:var(--muted,#7A6555)}" +
    ".uecal-seg{display:flex;gap:6px;margin-bottom:10px}.uecal-seg button{border:1px solid var(--line,#E6DCD0);background:var(--besh,#F9F6F0);border-radius:999px;padding:4px 12px;font:600 12px Montserrat,system-ui,sans-serif;color:var(--coffee,#6F4E37);cursor:pointer}.uecal-seg button.on{background:var(--coffee,#6F4E37);color:#fff;border-color:var(--coffee,#6F4E37)}" +
    "@media (max-width:760px){.uecal-cols{grid-template-columns:1fr}.uecal{padding:14px}.uecal-d{min-height:40px;padding:3px;font-size:12px}.uecal-d .fl{font-size:13px}}";

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function fmt(d) { return d.getDate() + " " + MON_G[d.getMonth()]; }
  function lessonsFor(h, lessons) {
    var tags = h.tags || [];
    return (lessons || []).filter(function (l) { var f = (l.file || l.title || "").toLowerCase().replace(/[\s_]+/g, "-"); return tags.some(function (t) { return f.indexOf(t) > -1; }); });
  }

  function render(el, o) {
    o = o || {};
    if (!document.getElementById("uecal-css")) { var st = document.createElement("style"); st.id = "uecal-css"; st.textContent = CSS; document.head.appendChild(st); }
    var today = new Date(); today.setHours(0, 0, 0, 0);
    var cur = new Date(today.getFullYear(), today.getMonth(), 1), sel = null, mode = "soon";
    function hol(y) { var m = {}; [y - 1, y, y + 1].forEach(function (yy) { U.forYear(yy).forEach(function (e) { (m[e.key] = m[e.key] || []).push(e); }); }); return m; }
    var HM = hol(today.getFullYear());

    function item(e, showDate) {
      var h = e.h, ls = lessonsFor(h, o.lessons), s = '<div class="uecal-it"><div class="t">' + (h.em ? h.em + " " : "") + esc(h.en) + " " + U.REGION[h.region] + (showDate ? " <small>· " + fmt(e.date) + (h.days ? "–" + fmt(new Date(e.date.getTime() + (h.days - 1) * 864e5)) : "") + "</small>" : "") + '</div><div class="ru">' + esc(h.ru) + "</div>";
      if (o.teacher && h.idea) s += '<div class="idea">💡 ' + esc(h.idea) + "</div>";
      if (ls.length) s += '<div class="ls">' + ls.slice(0, 6).map(function (l) { return '<a href="' + esc(l.href) + '" target="_blank" rel="noopener">' + esc(l.title) + "</a>"; }).join("") + "</div>";
      else if (o.teacher) s += '<div class="ru" style="margin-top:4px">На сайте пока нет урока к этому дню.</div>';
      return s + "</div>";
    }
    function evs(k) { return (o.events && o.events[k]) || []; }
    function side() {
      var s = "";
      if (sel) {
        var d = new Date(sel), k = U.key(d), hs = HM[k] || [], es = evs(k);
        s += "<h3>" + fmt(d) + "</h3>";
        hs.forEach(function (e) { s += item(e, false); });
        if (es.length) s += '<div class="uecal-it">' + es.map(function (x) { return '<div class="ev"><b>' + esc(x.who) + "</b><span>" + (x.href ? '<a href="' + esc(x.href) + '" target="_blank" rel="noopener">' + esc(x.title) + "</a>" : esc(x.title)) + (x.note ? " · " + esc(x.note) : "") + "</span></div>"; }).join("") + "</div>";
        if (!hs.length && !es.length) s += '<p class="uecal-empty">' + (o.teacher ? "В этот день ни праздников, ни домашек." : "No holidays this day · В этот день праздников нет.") + "</p>";
        return s;
      }
      var lim = new Date(today); lim.setDate(lim.getDate() + (mode === "soon" ? 45 : 400));
      var list = [];
      Object.keys(HM).sort().forEach(function (k) { HM[k].forEach(function (e) { if (e.first && e.date >= today && e.date <= lim) list.push(e); }); });
      if (mode === "soon") list = list.slice(0, 6);
      s += '<div class="uecal-seg"><button data-m="soon" class="' + (mode === "soon" ? "on" : "") + '">' + (o.teacher ? "Ближайшие" : "Coming up · Скоро") + '</button><button data-m="year" class="' + (mode === "year" ? "on" : "") + '">' + (o.teacher ? "Весь год" : "Year · Весь год") + "</button></div>";
      list.forEach(function (e) { s += item(e, true); });
      return s;
    }
    function draw() {
      var y = cur.getFullYear(), m = cur.getMonth();
      var start = new Date(y, m, 1); start.setDate(1 - ((start.getDay() + 6) % 7));
      var g = WD.map(function (w) { return '<div class="uecal-wd">' + w + "</div>"; }).join("");
      for (var i = 0; i < 42; i++) {
        var d = new Date(start); d.setDate(start.getDate() + i);
        if (i >= 35 && d.getMonth() !== m) break;
        var k = U.key(d), hs = HM[k] || [], es = evs(k), c = "uecal-d";
        if (d.getMonth() !== m) c += " out"; if (d.getDay() === 0 || d.getDay() === 6) c += " we"; if (+d === +today) c += " today"; if (sel && +d === sel) c += " sel"; if (hs.length) c += " hol";
        var fl = hs.map(function (e) { return e.h.em || U.REGION[e.h.region]; }).filter(function (x, j, a) { return a.indexOf(x) === j; }).join("");
        var title = hs.map(function (e) { return (e.h.em ? e.h.em + " " : "") + e.h.en + " · " + e.h.ru; }).concat(es.map(function (x) { return x.who + ": " + x.title; })).join("\n");
        g += '<button type="button" class="' + c + '" data-d="' + +d + '" title="' + esc(title) + '"><span class="n">' + d.getDate() + "</span>" + (fl ? '<span class="fl">' + fl + "</span>" : "") + (es.length ? '<span class="dots">' + es.slice(0, 3).map(function () { return "<i></i>"; }).join("") + "</span>" : "") + "</button>";
      }
      el.innerHTML = '<div class="uecal"><div class="uecal-cols"><div><div class="uecal-head"><button class="uecal-nav" data-nav="-1" aria-label="Предыдущий месяц">‹</button><b>' + MON[m] + " " + y + (o.teacher ? "" : "<small>" + MON_EN[m] + " " + y + "</small>") + '</b><button class="uecal-nav" data-nav="1" aria-label="Следующий месяц">›</button></div><div class="uecal-grid">' + g + '</div><div class="uecal-legend"><span>🇬🇧 Британия</span><span>🇺🇸 США</span><span>🇷🇺 Россия</span><span>🌍 Международный</span>' + (o.teacher ? "<span><i></i>домашка ученика</span>" : "") + '</div></div><div class="uecal-side">' + side() + "</div></div></div>";
    }
    el.addEventListener("click", function (ev) {
      var b = ev.target.closest("button"); if (!b || !el.contains(b)) return;
      if (b.dataset.nav) { cur.setMonth(cur.getMonth() + +b.dataset.nav); var yy = cur.getFullYear(); if (!HM[yy + "-01-01"]) HM = hol(yy); }
      else if (b.dataset.d) { var v = +b.dataset.d; sel = sel === v ? null : v; }
      else if (b.dataset.m) { mode = b.dataset.m; }
      draw();
    });
    draw();
    return { update: function (p) { for (var k in p) o[k] = p[k]; draw(); } };
  }
  root.UE_CAL = { render: render };
})(typeof window !== "undefined" ? window : this);
