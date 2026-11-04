(function () {
  "use strict";

  var BOOK = "/book/";
  var CAL = "https://calendar.app.google/b1x45zqXGBStd7sQ6";

  // Scores are 0 to 3. Total max is 33.
  // 0-11 Individual Experiments, 12-22 Pockets of Practice, 23-33 Ready to Operate with AI.
  var AREAS = [
    { id: "use", name: "Everyday use", qs: [0] },
    { id: "visible", name: "What leadership can see", qs: [1, 2, 3] },
    { id: "guidance", name: "A shared guideline", qs: [4] },
    { id: "spread", name: "Across the organization", qs: [5] },
    { id: "foundation", name: "Information and routines", qs: [6, 7] },
    { id: "direction", name: "Decisions and value", qs: [8, 9, 10] }
  ];

  var PATHS = {
    business: {
      label: "For a business",
      who: "your team",
      org: "the firm",
      questions: [
        {
          area: "use",
          text: "When people at your firm use AI, where does that use mostly live?",
          options: [
            ["In personal accounts, one person at a time", 0],
            ["A few people share what works. Most still work alone", 1],
            ["Several teams have a shared way, and it is still uneven", 2],
            ["The firm has a shared practice people can point to", 3]
          ]
        },
        {
          area: "visible",
          text: "Could you name, this week, which AI tools your people are actually using?",
          options: [
            ["Not yet", 0],
            ["I could name a few, not the full picture", 1],
            ["Mostly, with a gap or two", 2],
            ["Yes. There is a current picture", 3]
          ]
        },
        {
          area: "visible",
          text: "Do people sometimes paste client information into a personal AI account?",
          options: [
            ["I don't know", 0],
            ["It happens, and we have not agreed what stays out", 1],
            ["It is uncommon, and we have started to say what stays out", 2],
            ["We have a clear boundary, and people follow it", 3]
          ]
        },
        {
          area: "visible",
          text: "Is there a shared list of AI tools the firm has agreed people may use?",
          options: [
            ["Not yet", 0],
            ["A few people have favorites. Nothing is written down", 1],
            ["A list exists, and it is not what people actually use", 2],
            ["Yes, and it matches day-to-day use", 3]
          ]
        },
        {
          area: "guidance",
          text: "Is there a short written guideline for how the firm uses AI?",
          options: [
            ["Not yet", 0],
            ["It lives in someone's head, or in a chat thread", 1],
            ["A draft exists, and not everyone uses it", 2],
            ["Yes, and a new person could find it", 3]
          ]
        },
        {
          area: "spread",
          text: "If you asked three parts of the firm how they use AI, how alike would the answers be?",
          options: [
            ["I would expect three different stories", 0],
            ["Two would be close. One would surprise me", 1],
            ["Mostly alike, with one function further along", 2],
            ["We have named the differences and a next step for each", 3]
          ]
        },
        {
          area: "foundation",
          text: "When someone needs the information an AI tool would rely on, can they find a version the firm trusts?",
          options: [
            ["Not yet. It lives with individuals", 0],
            ["Sometimes, after asking around", 1],
            ["Mostly, with gaps we know about", 2],
            ["Yes. People know where the trusted version lives", 3]
          ]
        },
        {
          area: "foundation",
          text: "Are the routines that matter, such as client intake, delivery, and handoffs, written down well enough that a new person could follow them?",
          options: [
            ["Not yet", 0],
            ["Pieces are written. The path is still passed person to person", 1],
            ["Mostly written down", 2],
            ["Yes, and the writing matches how the work actually moves", 3]
          ]
        },
        {
          area: "direction",
          text: "Who chooses the AI tools the firm pays for?",
          options: [
            ["Whoever signs up first", 0],
            ["A manager, with little shared criteria", 1],
            ["A named person, and the criteria are still informal", 2],
            ["A named owner, with a simple way to say yes or not yet", 3]
          ]
        },
        {
          area: "direction",
          text: "Has a routine the firm owns changed because you decided to use AI there, not only because one person got faster?",
          options: [
            ["Not yet", 0],
            ["One person changed their own steps", 1],
            ["One team changed a shared step", 2],
            ["Yes. A routine the firm owns now works differently", 3]
          ]
        },
        {
          area: "direction",
          text: "How do you know whether AI is creating value?",
          options: [
            ["We are not looking yet", 0],
            ["We hear stories from people who use it", 1],
            ["We watch one or two signs, unevenly", 2],
            ["We can point to a result the firm already cares about", 3]
          ]
        }
      ]
    },
    school: {
      label: "For a school",
      who: "your staff",
      org: "the school",
      questions: [
        {
          area: "use",
          text: "When staff use AI, where does that use mostly live?",
          options: [
            ["In personal accounts, one person at a time", 0],
            ["A few people share what works. Most still work alone", 1],
            ["Several teams have a shared way, and it is still uneven", 2],
            ["The school has a shared practice people can point to", 3]
          ]
        },
        {
          area: "visible",
          text: "Could you name, this week, which AI tools staff are actually using?",
          options: [
            ["Not yet", 0],
            ["I could name a few, not the full picture", 1],
            ["Mostly, with a gap or two", 2],
            ["Yes. There is a current picture", 3]
          ]
        },
        {
          area: "visible",
          text: "Do people sometimes paste student or family information into a personal AI account?",
          options: [
            ["I don't know", 0],
            ["It happens, and we have not agreed what stays out", 1],
            ["It is uncommon, and we have started to say what stays out", 2],
            ["We have a clear boundary, and people follow it", 3]
          ]
        },
        {
          area: "visible",
          text: "Is there a shared list of AI tools the school has agreed staff may use?",
          options: [
            ["Not yet", 0],
            ["A few people have favorites. Nothing is written down", 1],
            ["A list exists, and it is not what people actually use", 2],
            ["Yes, and it matches day-to-day use", 3]
          ]
        },
        {
          area: "guidance",
          text: "Is there a short written guideline for how the school uses AI?",
          options: [
            ["Not yet", 0],
            ["Expectations live in a staff-room conversation", 1],
            ["A draft exists, and not everyone uses it", 2],
            ["Yes, and a new teacher could find it", 3]
          ]
        },
        {
          area: "spread",
          text: "If you asked the classroom, the front office, and operations how they use AI, how alike would the answers be?",
          options: [
            ["I would expect three different stories", 0],
            ["Two would be close. One would surprise me", 1],
            ["Mostly alike, with one part further along", 2],
            ["We have named the differences and a next step for each", 3]
          ]
        },
        {
          area: "foundation",
          text: "When someone needs the information an AI tool would rely on, such as a policy or a family answer, can they find a version the school trusts?",
          options: [
            ["Not yet. It lives with individuals", 0],
            ["Sometimes, after asking around", 1],
            ["Mostly, with gaps we know about", 2],
            ["Yes. People know where the trusted version lives", 3]
          ]
        },
        {
          area: "foundation",
          text: "Are the routines that matter, such as admissions questions, family updates, and reporting, written down well enough that a new person could follow them?",
          options: [
            ["Not yet", 0],
            ["Pieces are written. The path is still passed person to person", 1],
            ["Mostly written down", 2],
            ["Yes, and the writing matches how the work actually moves", 3]
          ]
        },
        {
          area: "direction",
          text: "Who chooses the AI tools the school pays for or allows?",
          options: [
            ["Whoever signs up first", 0],
            ["A leader, with little shared criteria", 1],
            ["A named person, and the criteria are still informal", 2],
            ["A named owner, with a simple way to say yes or not yet", 3]
          ]
        },
        {
          area: "direction",
          text: "Has a routine the school owns changed because you decided to use AI there, not only because one person got faster?",
          options: [
            ["Not yet", 0],
            ["One person changed their own steps", 1],
            ["One team changed a shared step", 2],
            ["Yes. A routine the school owns now works differently", 3]
          ]
        },
        {
          area: "direction",
          text: "How do you know whether AI is creating value for students, families, or the people who carry the work?",
          options: [
            ["We are not looking yet", 0],
            ["We hear stories from people who use it", 1],
            ["We watch one or two signs, unevenly", 2],
            ["We can point to a result the school already cares about", 3]
          ]
        }
      ]
    }
  };

  var NOTES = {
    business: {
      visible: "Your team may be using AI in ways leadership can't see yet. That's common, and it's often where the biggest value is hiding.",
      use: "People are getting faster on their own. The next value usually shows up when that practice belongs to the firm, not only to the person who built it.",
      guidance: "A short written guideline gives a new person somewhere to start, and gives you an answer when a client asks how the firm uses AI.",
      spread: "Each part of the firm may be starting in a different place. Naming those starting points is what makes the next step smaller and clearer.",
      foundation: "Where the trusted information, or the routine, still lives in people's heads, that is often the most practical place to look next.",
      direction: "Naming who decides, which routine should change, and which result you will watch is how a set of tools becomes a direction."
    },
    school: {
      visible: "Your staff may be using AI in ways leadership can't see yet. That's common, and it's often where the biggest value is hiding.",
      use: "People are getting faster on their own. The next value usually shows up when that practice belongs to the school, not only to the person who built it.",
      guidance: "A short written guideline gives a new teacher somewhere to start, and gives you an answer when a governor or a family asks how the school uses AI.",
      spread: "The classroom, the front office, and operations may each be starting in a different place. Naming those starting points is what makes the next step smaller and clearer.",
      foundation: "Where the trusted information, or the routine, still lives in people's heads, that is often the most practical place to look next.",
      direction: "Naming who decides, which routine should change, and which result you will watch is how a set of tools becomes a direction the school owns."
    }
  };

  var TIERS = [
    {
      max: 11,
      name: "Individual Experiments",
      text: "People are trying AI on their own. That is a real start. The value still sits with the person, and not yet with the whole organization."
    },
    {
      max: 22,
      name: "Pockets of Practice",
      text: "Some parts already have a way of working with AI, and other parts are earlier. The next value is usually in connecting those pockets."
    },
    {
      max: 33,
      name: "Ready to Operate with AI",
      text: "You already have shared pieces: something people can see, a routine that has changed, or a result you can name. The next conversation is where to extend that, and what can wait."
    }
  ];

  var app = document.getElementById("check-app");
  if (!app) return;

  var intro = document.getElementById("check-intro");
  var ask = document.getElementById("check-ask");
  var result = document.getElementById("check-result");
  var path = null;
  var index = 0;
  var answers = { business: [], school: [] };

  function questions() {
    return PATHS[path].questions;
  }

  function show(which) {
    intro.hidden = which !== "intro";
    ask.hidden = which !== "ask";
    result.hidden = which !== "result";
    document.body.classList.toggle("is-check-result", which === "result");
    var focus = which === "intro" ? intro.querySelector("button") : which === "ask" ? ask.querySelector("h2") : result.querySelector("h2");
    if (focus) focus.focus();
  }

  function renderQuestion() {
    var q = questions()[index];
    var total = questions().length;
    var chosen = answers[path][index];
    ask.innerHTML = "";

    var count = el("p", "check-count", PATHS[path].label + " · Question " + (index + 1) + " of " + total);
    var bar = document.createElement("div");
    bar.className = "check-progress";
    bar.setAttribute("role", "progressbar");
    bar.setAttribute("aria-valuemin", "1");
    bar.setAttribute("aria-valuemax", String(total));
    bar.setAttribute("aria-valuenow", String(index + 1));
    bar.setAttribute("aria-label", "Question " + (index + 1) + " of " + total);
    var fill = document.createElement("span");
    fill.style.width = Math.round(((index + 1) / total) * 100) + "%";
    bar.appendChild(fill);

    var h = el("h2", "", q.text);
    h.tabIndex = -1;
    h.id = "check-q";

    var field = document.createElement("fieldset");
    field.className = "q-options";
    var legend = document.createElement("legend");
    legend.className = "sr-only";
    legend.textContent = q.text;
    field.appendChild(legend);

    q.options.forEach(function (opt, i) {
      var id = "opt-" + index + "-" + i;
      var label = document.createElement("label");
      var input = document.createElement("input");
      input.type = "radio";
      input.name = "answer";
      input.id = id;
      input.value = String(opt[1]);
      if (chosen === opt[1]) input.checked = true;
      var span = document.createElement("span");
      span.textContent = opt[0];
      label.appendChild(input);
      label.appendChild(span);
      field.appendChild(label);
    });

    var actions = document.createElement("div");
    actions.className = "q-actions";
    var back = button(index === 0 ? "Back to paths" : "Back", "btn btn-ink");
    back.type = "button";
    back.addEventListener("click", function () {
      saveChoice();
      if (index === 0) show("intro");
      else {
        index -= 1;
        renderQuestion();
      }
    });
    var next = button(index === total - 1 ? "See my starting point" : "Next", "btn btn-navy");
    next.type = "button";
    next.addEventListener("click", function () {
      if (!saveChoice()) {
        var live = document.getElementById("check-live");
        if (live) live.textContent = "Choose the answer that fits best, then continue.";
        field.querySelector("input").focus();
        return;
      }
      if (index === total - 1) renderResult();
      else {
        index += 1;
        renderQuestion();
      }
    });
    actions.appendChild(back);
    actions.appendChild(next);

    ask.appendChild(count);
    ask.appendChild(bar);
    ask.appendChild(h);
    ask.appendChild(field);
    ask.appendChild(actions);
    show("ask");
  }

  function saveChoice() {
    var picked = ask.querySelector("input[name=answer]:checked");
    if (!picked) return false;
    answers[path][index] = Number(picked.value);
    return true;
  }

  function areaScores() {
    return AREAS.map(function (area) {
      var score = 0;
      var max = area.qs.length * 3;
      area.qs.forEach(function (i) {
        score += answers[path][i] || 0;
      });
      return { id: area.id, name: area.name, score: score, max: max, ratio: score / max };
    });
  }

  function tierFor(total) {
    for (var i = 0; i < TIERS.length; i++) {
      if (total <= TIERS[i].max) return TIERS[i];
    }
    return TIERS[TIERS.length - 1];
  }

  function observations(areas, tier) {
    var notes = [];
    var visible = areas.filter(function (a) { return a.id === "visible"; })[0];
    var shadow = answers[path][1] <= 1 || answers[path][2] <= 1 || answers[path][3] <= 1;
    if (shadow) notes.push(NOTES[path].visible);

    areas.slice().sort(function (a, b) { return a.ratio - b.ratio; }).forEach(function (area) {
      if (notes.length >= 3) return;
      if (area.ratio > 0.5) return;
      if (area.id === "visible" && shadow) return;
      notes.push(NOTES[path][area.id]);
    });

    if (tier.name === "Ready to Operate with AI" && notes.length < 2) {
      notes.push("You already have shared pieces in place. The useful question is which part should go next, and which part can wait.");
    }
    if (notes.length < 2) {
      notes.push("Bring this picture with you. In 15 to 20 minutes we can choose one place where AI can help next.");
    }
    return notes.slice(0, 3);
  }

  function renderResult() {
    var total = answers[path].reduce(function (sum, n) { return sum + (n || 0); }, 0);
    var tier = tierFor(total);
    var areas = areaScores();
    var notes = observations(areas, tier);

    result.innerHTML = "";
    result.appendChild(el("p", "kicker", "Your starting point"));
    var h = el("h2", "result-tier", tier.name);
    h.tabIndex = -1;
    result.appendChild(h);
    result.appendChild(el("p", "lede", tier.text));
    result.appendChild(el("p", "check-note", "This is a quick self-check, not an audit or compliance review. Nothing you answered was stored or sent."));

    var list = document.createElement("div");
    list.className = "bars";
    list.style.marginTop = "28px";
    areas.forEach(function (area) {
      var row = document.createElement("div");
      row.className = "bar-row is-band";
      var name = document.createElement("span");
      name.textContent = area.name;
      var strong = document.createElement("strong");
      strong.textContent = area.score + " of " + area.max;
      var track = document.createElement("div");
      track.className = "bar-track";
      track.setAttribute("role", "img");
      track.setAttribute("aria-label", area.name + ": " + area.score + " of " + area.max);
      var fill = document.createElement("div");
      fill.className = "bar-fill";
      fill.style.width = Math.round(area.ratio * 100) + "%";
      track.appendChild(fill);
      row.appendChild(name);
      row.appendChild(strong);
      row.appendChild(track);
      list.appendChild(row);
    });
    result.appendChild(list);

    result.appendChild(el("h3", "", "What stands out"));
    var ul = document.createElement("ul");
    ul.className = "obs";
    notes.forEach(function (text) {
      var li = document.createElement("li");
      li.textContent = text;
      ul.appendChild(li);
    });
    result.appendChild(ul);

    var panel = document.createElement("div");
    panel.className = "book-panel";
    panel.style.marginTop = "28px";
    panel.appendChild(el("p", "kicker on-navy", "From Using AI to Operating with AI"));
    panel.appendChild(el("h3", "", "Talk it through"));
    var copy = el("p", "", "In 15 to 20 minutes, we'll look at how your team is using AI today and where it could create the most value next. You'll leave with a clear picture of your starting point and one practical next step. There's no pitch and no prep needed.");
    copy.style.marginTop = "12px";
    panel.appendChild(copy);
    var book = document.createElement("a");
    book.className = "btn";
    book.href = BOOK;
    book.style.marginTop = "18px";
    book.textContent = "Book Your 15 to 20 Minute Call";
    panel.appendChild(book);
    var cal = document.createElement("p");
    cal.style.marginTop = "14px";
    var calLink = document.createElement("a");
    calLink.href = CAL;
    calLink.target = "_blank";
    calLink.rel = "noopener noreferrer";
    calLink.style.color = "#FFCB08";
    calLink.textContent = "Open the calendar in a new tab";
    cal.appendChild(calLink);
    panel.appendChild(cal);
    result.appendChild(panel);

    var againRow = document.createElement("div");
    againRow.className = "q-actions no-print";
    var printBtn = button("Print or save my results", "btn btn-ink");
    printBtn.type = "button";
    printBtn.addEventListener("click", function () { window.print(); });
    var again = button("Start again", "btn btn-ink");
    again.type = "button";
    again.addEventListener("click", function () {
      answers[path] = [];
      index = 0;
      show("intro");
    });
    againRow.appendChild(printBtn);
    againRow.appendChild(again);
    result.appendChild(againRow);

    show("result");
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function button(text, className) {
    var node = document.createElement("button");
    node.className = className;
    node.textContent = text;
    return node;
  }

  app.querySelectorAll("[data-path]").forEach(function (node) {
    node.addEventListener("click", function () {
      path = node.getAttribute("data-path");
      index = 0;
      renderQuestion();
    });
  });
})();
