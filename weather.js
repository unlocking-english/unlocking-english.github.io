/* ===== Weather warm-up widget. UE_WX.render(el) — month tabs (current month first), two modes: Kids / Teens & adults.
   Climate: UK + central Russia (northern hemisphere). Source of truth: /mnt/project-files/system/calendar/weather.js ===== */
(function (root) {
  var MON_EN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var MON_RU = ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"];
  // KIDS: [emoji, word, ru], frames, game
  var K = [
    { w: [["❄️", "snowy", "снежно"], ["🥶", "cold", "холодно"], ["⛄", "snowman", "снеговик"], ["🧤", "gloves", "перчатки"], ["🌨️", "it's snowing", "идёт снег"], ["🛷", "sledge", "санки"]],
      f: ["What's the weather like today? It's snowy and cold.", "In January I wear my hat and gloves."], g: "Show me: you are very cold! Brrr! Now build a snowman with your hands." },
    { w: [["🥶", "freezing", "очень холодно"], ["🧊", "icy", "скользко, лёд"], ["🌬️", "windy", "ветрено"], ["❄️", "snowflake", "снежинка"], ["🧣", "scarf", "шарф"], ["☁️", "cloudy", "облачно"]],
      f: ["It's freezing! Put on your scarf.", "Be careful, it's icy!"], g: "Snowflake game: say a weather word every time you 'catch' a snowflake." },
    { w: [["🌤️", "sunny", "солнечно"], ["💧", "melting", "тает"], ["🌧️", "rainy", "дождливо"], ["☔", "umbrella", "зонт"], ["🌷", "flowers", "цветы"], ["🌡️", "warm", "тепло"]],
      f: ["The snow is melting!", "It's a bit warm and sunny today."], g: "Spring or winter? I say a word, you show 🌷 (spring) or ❄️ (winter)." },
    { w: [["🌦️", "showers", "ливни, дождик"], ["🌈", "rainbow", "радуга"], ["☔", "wet", "мокро"], ["🥾", "wellies", "резиновые сапоги"], ["🐸", "puddle", "лужа"], ["🌬️", "windy", "ветрено"]],
      f: ["Look! A rainbow!", "It's wet. I need my wellies."], g: "Jump over the puddle: jump if the sentence about April weather is true!" },
    { w: [["☀️", "sunny", "солнечно"], ["🌡️", "warm", "тепло"], ["🌸", "blossom", "цветение"], ["🐝", "bees", "пчёлы"], ["🌤️", "nice", "хорошая погода"], ["⛅", "cloudy", "облачно"]],
      f: ["It's warm and sunny. Let's go to the park!", "The trees have got blossom."], g: "Draw today's weather in 10 seconds. Your friend guesses the word." },
    { w: [["☀️", "hot", "жарко"], ["😎", "sunglasses", "солнечные очки"], ["🧢", "sun hat", "панама"], ["🌊", "beach", "пляж"], ["⛈️", "stormy", "гроза"], ["🌡️", "warm", "тепло"]],
      f: ["It's hot! Put on your sun hat.", "Oh no, it's stormy! Let's go inside."], g: "Pack your bag: name 3 things for a hot day." },
    { w: [["🥵", "very hot", "очень жарко"], ["☀️", "sunshine", "солнце, солнечный свет"], ["🍦", "ice cream", "мороженое"], ["🏊", "swim", "плавать"], ["⚡", "thunder", "гром"], ["🌈", "rainbow", "радуга"]],
      f: ["It's very hot. I want an ice cream!", "Can you hear the thunder?"], g: "Hot or cold? Fan yourself for hot words, shiver for cold words." },
    { w: [["☀️", "sunny", "солнечно"], ["🌡️", "warm", "тепло"], ["🌧️", "rain", "дождь"], ["🍎", "apples", "яблоки"], ["🌅", "sunset", "закат"], ["⛅", "cloudy", "облачно"]],
      f: ["It's sunny in the morning and rainy in the evening.", "Summer is nearly over!"], g: "Finish my sentence: In August I like… when it's…" },
    { w: [["🍂", "leaves", "листья"], ["🌬️", "windy", "ветрено"], ["🌥️", "cloudy", "облачно"], ["🧥", "jacket", "куртка"], ["🌦️", "rainy", "дождливо"], ["🍄", "mushrooms", "грибы"]],
      f: ["It's windy. The leaves are falling.", "Put on your jacket!"], g: "Leaf catch: catch the 'leaf' (paper ball) and say one weather word." },
    { w: [["🍁", "autumn", "осень"], ["🌧️", "rainy", "дождливо"], ["🌫️", "foggy", "туманно"], ["🥶", "chilly", "прохладно"], ["☂️", "umbrella", "зонт"], ["🎃", "pumpkin", "тыква"]],
      f: ["It's foggy. I can't see!", "It's chilly today. Take your umbrella."], g: "Foggy game: whisper a weather word, your friend guesses it." },
    { w: [["🌧️", "rainy", "дождливо"], ["☁️", "grey", "пасмурно, серо"], ["🥶", "cold", "холодно"], ["🌨️", "first snow", "первый снег"], ["💨", "windy", "ветрено"], ["🧦", "warm socks", "тёплые носки"]],
      f: ["It's grey and rainy today.", "Look! The first snow!"], g: "Weather report: be a TV weather presenter for 20 seconds." },
    { w: [["❄️", "snowy", "снежно"], ["🥶", "frosty", "морозно"], ["⛄", "snowman", "снеговик"], ["🎄", "Christmas tree", "ёлка"], ["🧤", "mittens", "варежки"], ["🌙", "dark", "темно"]],
      f: ["It's snowy and frosty. Let's make a snowman!", "It gets dark very early in December."], g: "Snowball questions: throw a 'snowball' and ask: What's the weather like today?" }
  ];
  // TEENS & ADULTS: [word, ru, example], idiom [en, ru], questions
  var A = [
    { w: [["bitterly cold", "ужасно холодно", "It's bitterly cold out — wrap up warm."], ["sub-zero", "минусовой", "We've had sub-zero temperatures all week."], ["crisp", "свежий, морозный и ясный", "I love a crisp, sunny winter morning."], ["slushy", "слякотный (тающий снег)", "The pavements are all slushy after the thaw."], ["icy", "гололёд", "Drive carefully, the roads are icy."], ["bleak", "унылый, хмурый", "January can feel so bleak and grey."], ["a thaw", "оттепель", "There's a thaw coming at the weekend."], ["snowed in", "занесло снегом", "We were completely snowed in for two days."]],
      i: ["a cold snap", "внезапное резкое похолодание"], q: ["Do you prefer a crisp frosty day or a mild grey one?", "What do you do to survive the bleak January days?", "Have you ever been snowed in?"] },
    { w: [["freezing", "ледяной, очень холодный", "It's absolutely freezing this morning!"], ["nippy", "холодновато, «щиплет» (разг.)", "It's a bit nippy out, take a scarf."], ["blustery", "порывистый, ветреный", "A blustery wind nearly took my umbrella."], ["sleet", "мокрый снег с дождём", "It's not snow, it's just horrible sleet."], ["raw", "промозглый", "It's a raw, damp kind of cold."], ["overcast", "пасмурный, затянутый", "The sky has been overcast for days."], ["a blizzard", "метель, буран", "The blizzard closed all the schools."], ["frost-bitten", "обмороженный", "My fingers felt frost-bitten after the walk."]],
      i: ["the dead of winter", "самый разгар зимы"], q: ["What's the worst kind of cold for you: dry or raw?", "What would you do on a day off during a blizzard?", "Which winter sport would you try in this weather?"] },
    { w: [["changeable", "переменчивый", "The weather is so changeable in March."], ["mild", "мягкий, тёплый (для сезона)", "It's surprisingly mild for March."], ["drizzly", "моросящий", "A drizzly morning turned into a sunny afternoon."], ["slush", "слякоть", "Watch out for the slush by the bus stop."], ["bright", "ясный, светлый", "It's bright but still quite cold."], ["breezy", "ветерок, свежо", "A breezy spring day is perfect for a walk."], ["a false spring", "ложная весна", "Don't be fooled — it's just a false spring."], ["mud", "грязь", "After the snow melts, everything turns to mud."]],
      i: ["in like a lion, out like a lamb", "март начинается бурно, а заканчивается тихо"], q: ["How changeable is the weather in your city in March?", "What's the first sign of spring for you?", "Do you change your clothes depending on the weather or the calendar?"] },
    { w: [["showery", "с кратковременными дождями", "It'll be showery with sunny spells."], ["sunny spells", "временами солнечно", "The forecast says sunny spells in the afternoon."], ["a downpour", "ливень", "We got caught in a sudden downpour."], ["damp", "сырой", "Everything feels damp after the rain."], ["fresh", "свежий, прохладный", "It's a lovely fresh morning."], ["unsettled", "неустойчивый", "The weather will stay unsettled all week."], ["spitting", "накрапывает", "It's only spitting — we don't need umbrellas."], ["a rainbow", "радуга", "Sun and rain at the same time — look for a rainbow!"]],
      i: ["April showers bring May flowers", "апрельские дожди приносят майские цветы"], q: ["Do you carry an umbrella 'just in case'?", "What do you like doing on a showery Sunday?", "Have you ever been caught in a downpour without an umbrella?"] },
    { w: [["balmy", "тёплый и приятный (о воздухе)", "We had dinner outside on a balmy May evening."], ["glorious", "чудесный (о погоде)", "What a glorious day!"], ["warm", "тёплый", "It's finally warm enough for a T-shirt."], ["sunny", "солнечный", "Sunny and 20 degrees — perfect."], ["cloudless", "безоблачный", "A cloudless blue sky over the city."], ["pleasant", "приятный", "It's pleasant in the shade."], ["a late frost", "поздние заморозки", "A late frost killed the tomato plants."], ["pollen", "пыльца", "The pollen count is really high today."]],
      i: ["make hay while the sun shines", "куй железо, пока горячо"], q: ["Where would you go on a glorious May day?", "Do you suffer from hay fever when the pollen count is high?", "What's your perfect temperature?"] },
    { w: [["hot", "жаркий", "It's getting hot — let's find some shade."], ["sunny", "солнечный", "It's going to be sunny all weekend."], ["humid", "влажный (душно)", "It's so humid I can't sleep."], ["muggy", "душный, парной", "A muggy afternoon usually ends in a storm."], ["thundery", "грозовой", "Thundery showers are expected tonight."], ["light nights", "светлые вечера", "I love the long light nights in June."], ["a heat haze", "дрожащий от жары воздух", "You could see a heat haze over the road."], ["sunburnt", "обгоревший на солнце", "I fell asleep on the beach and got sunburnt."]],
      i: ["white nights", "белые ночи"], q: ["Hot and dry or warm and humid: which is worse?", "How do you keep cool on a muggy day?", "Have you ever seen white nights?"] },
    { w: [["scorching", "палящий", "It was a scorching 35 degrees."], ["sweltering", "изнуряющий от жары", "The office was sweltering — no air conditioning!"], ["boiling", "очень жарко (разг.)", "I'm boiling! Can we open a window?"], ["close", "душно (перед грозой)", "It feels very close — there's a storm coming."], ["a heatwave", "аномальная жара", "The heatwave lasted two weeks."], ["a thunderstorm", "гроза", "A huge thunderstorm broke the heat."], ["sticky", "липкий, влажный", "It's hot and sticky in the city."], ["a drought", "засуха", "There's a hosepipe ban because of the drought."]],
      i: ["the dog days of summer", "самые жаркие летние дни"], q: ["What's the hottest weather you have ever experienced?", "Do you like thunderstorms or are you scared of them?", "Where do you escape to during a heatwave?"] },
    { w: [["warm", "тёплый", "It's still warm in the evenings."], ["hazy", "дымчатый, в лёгкой дымке", "A hazy, lazy August afternoon."], ["sultry", "знойный и душный", "A sultry night with no wind at all."], ["fine", "хороший, ясный (брит.)", "It's a fine day for a barbecue."], ["a sudden storm", "внезапная гроза", "A sudden storm ruined our picnic."], ["shooting stars", "падающие звёзды", "Clear skies tonight — perfect for shooting stars."], ["sun-kissed", "загорелый, согретый солнцем", "You look sun-kissed after your holiday!"], ["cooler", "прохладнее", "The evenings are getting cooler already."]],
      i: ["a ray of sunshine", "лучик света (о человеке)"], q: ["How do you know summer is coming to an end?", "What's the best weather for a barbecue?", "Have you ever made a wish on a shooting star?"] },
    { w: [["crisp", "свежий, бодрящий", "A crisp September morning — perfect for a run."], ["mild", "мягкий, тёплый", "It's still mild enough for a light jacket."], ["golden", "золотой", "The park looks golden in the afternoon sun."], ["blustery", "порывистый", "A blustery day sends the leaves flying."], ["chilly", "прохладный, зябко", "The mornings are getting chilly."], ["misty", "туманный, в дымке", "A misty morning by the river."], ["drizzle", "морось", "Just a bit of drizzle — nothing serious."], ["fallen leaves", "опавшие листья", "Kids love kicking through fallen leaves."]],
      i: ["an Indian summer (бабье лето)", "тёплые дни в начале осени"], q: ["Do you enjoy autumn or do you miss summer already?", "What's your favourite thing to do on a crisp morning?", "Do you have an 'Indian summer' where you live?"] },
    { w: [["drizzly", "моросящий", "Another drizzly Monday…"], ["foggy", "туманный", "It was so foggy I couldn't see the bus stop."], ["gloomy", "мрачный", "It's dark and gloomy by five o'clock."], ["damp", "сырой", "The cold is worse when it's damp."], ["gusty", "порывистый", "Gusty winds blew the bins over."], ["bracing", "бодрящий (о холоде, ветре)", "A bracing walk by the sea."], ["frosty", "морозный", "The first frosty morning of the year."], ["a storm", "шторм, буря", "The storm brought down trees all over town."]],
      i: ["under the weather", "неважно себя чувствовать"], q: ["How does gloomy weather affect your mood?", "What helps you when you're feeling under the weather?", "Foggy, drizzly or gusty: which is the worst for you?"] },
    { w: [["dreary", "тоскливый, унылый", "A dreary November afternoon."], ["grey", "серый, пасмурный", "It's been grey for a week."], ["raw", "промозглый", "It's a raw, wet day."], ["wet", "дождливый, мокрый", "It's wet and windy again."], ["sleet", "мокрый снег", "The rain turned to sleet in the evening."], ["the first snow", "первый снег", "The first snow fell overnight."], ["dark", "тёмный", "It's already dark when I finish work."], ["freezing fog", "ледяной туман", "Freezing fog is making the roads dangerous."]],
      i: ["a storm in a teacup", "буря в стакане воды"], q: ["How do you cope with dreary November days?", "When did you see the first snow this year?", "What's cosy for you on a raw, wet evening?"] },
    { w: [["frosty", "морозный", "A frosty, sparkling morning."], ["snowy", "снежный", "We might have a snowy weekend."], ["crisp", "морозный и ясный", "Crisp snow crunches under your boots."], ["below zero", "ниже нуля", "It's ten below zero today."], ["icy", "скользкий, обледенелый", "The steps are icy — hold the rail."], ["a white Christmas", "снежное Рождество", "Will we have a white Christmas this year?"], ["cosy", "уютный", "Nothing beats a cosy evening when it's snowing outside."], ["the shortest day", "самый короткий день", "The 21st is the shortest day of the year."]],
      i: ["snowed under (with work)", "завален работой"], q: ["Have you ever had a white Christmas?", "How do you make your home cosy in winter?", "Are you snowed under with work or school this month?"] }
  ];
  var CSS = ".uewx{background:var(--paper,#fff);border:1px solid var(--line,#E6DCD0);border-radius:24px;padding:20px;box-shadow:0 1px 2px rgba(74,52,38,.04),0 8px 24px rgba(74,52,38,.06);color:var(--ink,#3B2A1F)}" +
    ".uewx *{box-sizing:border-box}.uewx-top{display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:space-between;margin-bottom:12px}" +
    ".uewx-mode{display:inline-flex;background:var(--besh,#F9F6F0);border:1px solid var(--line,#E6DCD0);border-radius:999px;padding:3px}.uewx-mode button{border:0;background:transparent;border-radius:999px;padding:7px 14px;font:600 13px Montserrat,system-ui,sans-serif;color:var(--coffee,#6F4E37);cursor:pointer}.uewx-mode button.on{background:var(--espresso,#4A3426);color:#fff}" +
    ".uewx-mon{display:flex;align-items:center;gap:8px}.uewx-mon b{font:700 20px/1.2 'Playfair Display',Georgia,serif;min-width:150px;text-align:center}.uewx-mon b small{display:block;font:500 12px Montserrat,system-ui,sans-serif;color:var(--muted,#7A6555)}" +
    ".uewx-nav{width:36px;height:36px;border-radius:50%;border:1px solid var(--line,#E6DCD0);background:var(--besh,#F9F6F0);color:var(--coffee,#6F4E37);font-size:18px;cursor:pointer}" +
    ".uewx-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:10px}" +
    ".uewx-c{border:1px solid var(--line,#E6DCD0);border-radius:16px;padding:12px;background:#FDFBF8;cursor:pointer;text-align:left;font:inherit;color:inherit;min-height:84px}.uewx-c:hover{border-color:var(--hazelnut,#CFB59E)}" +
    ".uewx-c .w{font:700 17px/1.25 Montserrat,system-ui,sans-serif}.uewx-c .e{font-size:30px;line-height:1;margin-bottom:6px}.uewx-c .h{font-size:13px;color:var(--muted,#7A6555);margin-top:6px;display:none}.uewx-c.open .h{display:block}.uewx-c .x{font-style:italic;color:var(--ink,#3B2A1F)}" +
    ".uewx-c .tap{font-size:11px;color:var(--hazelnut,#CFB59E);margin-top:6px}.uewx-c.open .tap{display:none}" +
    ".uewx-low{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:12px;margin-top:14px}.uewx-box{background:var(--mist,#E4EEF5);border-radius:16px;padding:12px 14px;font-size:14px}.uewx-box h4{margin:0 0 6px;font:700 14px Montserrat,system-ui,sans-serif;color:var(--denim,#3E6A8A)}.uewx-box ul{margin:0;padding-left:18px}.uewx-box li{margin:3px 0}" +
    ".uewx-box.s{background:var(--sand,#EFE6DC)}.uewx-box.s h4{color:var(--coffee,#6F4E37)}.uewx-q{font:600 16px/1.4 Montserrat,system-ui,sans-serif;margin:6px 0 8px;min-height:44px}.uewx-btn{border:1px solid var(--coffee,#6F4E37);background:var(--paper,#fff);color:var(--coffee,#6F4E37);border-radius:999px;padding:6px 14px;font:600 13px Montserrat,system-ui,sans-serif;cursor:pointer}" +
    ".uewx-ru{color:var(--muted,#7A6555);font-size:13px}" +
    "@media(max-width:640px){.uewx{padding:14px}.uewx-low{grid-template-columns:1fr}.uewx-cards{grid-template-columns:repeat(2,minmax(0,1fr))}.uewx-mon b{min-width:120px}}";
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function render(el, o) {
    o = o || {};
    if (!document.getElementById("uewx-css")) { var st = document.createElement("style"); st.id = "uewx-css"; st.textContent = CSS; document.head.appendChild(st); }
    var m = new Date().getMonth(), mode = o.mode || "adults", qi = 0;
    try { mode = localStorage.getItem("uewx-mode") || mode; } catch (e) {}
    function draw() {
      var s = '<div class="uewx"><div class="uewx-top"><div class="uewx-mode" role="tablist"><button type="button" data-m="kids" class="' + (mode === "kids" ? "on" : "") + '">🧸 Kids</button><button type="button" data-m="adults" class="' + (mode === "adults" ? "on" : "") + '">🎧 Teens & adults</button></div>' +
        '<div class="uewx-mon"><button type="button" class="uewx-nav" data-d="-1" aria-label="Previous month">‹</button><b>' + MON_EN[m] + '<small>' + MON_RU[m] + '</small></b><button type="button" class="uewx-nav" data-d="1" aria-label="Next month">›</button></div></div>';
      if (mode === "kids") {
        var k = K[m];
        s += '<div class="uewx-cards">' + k.w.map(function (x) { return '<button type="button" class="uewx-c"><div class="e">' + x[0] + '</div><div class="w">' + esc(x[1]) + '</div><div class="h">' + esc(x[2]) + '</div><div class="tap">tap · нажми</div></button>'; }).join("") + "</div>";
        s += '<div class="uewx-low"><div class="uewx-box"><h4>Say it! · Скажи</h4><ul>' + k.f.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + '<li>What\'s the weather like today? It\'s …</li></ul></div><div class="uewx-box s"><h4>🎲 Game · Игра</h4><div>' + esc(k.g) + "</div></div></div>";
      } else {
        var a = A[m];
        s += '<div class="uewx-cards">' + a.w.map(function (x) { return '<button type="button" class="uewx-c"><div class="w">' + esc(x[0]) + '</div><div class="h">' + esc(x[1]) + '<br><span class="x">' + esc(x[2]) + '</span></div><div class="tap">tap for meaning & example</div></button>'; }).join("") + "</div>";
        s += '<div class="uewx-low"><div class="uewx-box"><h4>💬 Small talk · Вопрос для разминки</h4><div class="uewx-q">' + esc(a.q[qi % a.q.length]) + '</div><button type="button" class="uewx-btn" data-q="1">Next question ›</button></div>' +
          '<div class="uewx-box s"><h4>🌂 Idiom of the month · Идиома месяца</h4><div class="uewx-q">' + esc(a.i[0]) + '</div><div class="uewx-ru">' + esc(a.i[1]) + '</div></div></div>';
      }
      el.innerHTML = s + "</div>";
    }
    el.addEventListener("click", function (e) {
      var t = e.target.closest("button"); if (!t || !el.contains(t)) return;
      if (t.getAttribute("data-m")) { mode = t.getAttribute("data-m"); try { localStorage.setItem("uewx-mode", mode); } catch (er) {} draw(); }
      else if (t.getAttribute("data-d")) { m = (m + 12 + +t.getAttribute("data-d")) % 12; qi = 0; draw(); }
      else if (t.getAttribute("data-q")) { qi++; draw(); }
      else if (t.classList.contains("uewx-c")) t.classList.toggle("open");
    });
    draw();
  }
  root.UE_WX = { render: render };
})(window);
