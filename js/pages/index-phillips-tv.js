/**
 * Phillips Wall — index "TV" mini demo.
 * Auto-plays a rotating preview of clusters/answers.
 * Card styles mirror the full parallax demo (phillipswall-demo.js):
 * pastel bubbles, portrait cards with a top-center dot, the question,
 * the answer and a right-pill badge. The first cluster (index 0) is
 * treated as the visitor's own submission: its graph bubble carries a
 * persistent "YOU" label. Within the fan, card 0 shows the YOU badge
 * (with a black emphasis ring) and dismisses once the visitor looks at
 * it (focus lands on card 0). All other cards show their ordinal number.
 * No "✕" badge on any card.
 */
(function () {
  "use strict";

  var PASTEL = {
    "008ce9": "#BFE3FF",
    "8e00c5": "#E4C6FF",
    "ba5719": "#FFE5C4",
    "0a7c53": "#C6F2D4"
  };

  var SOLID = {
    "008ce9": "#008CE9",
    "8e00c5": "#9D00D6",
    "ba5719": "#C96A1B",
    "0a7c53": "#0A8A5C"
  };

  function pastelFromGradient(g) {
    if (!g) return "#BFE3FF";
    var hex = (g.match(/#([0-9a-fA-F]{6})/) || [])[1];
    if (!hex) return "#BFE3FF";
    return PASTEL[hex.toLowerCase()] || "#BFE3FF";
  }

  function solidFromGradient(g) {
    if (!g) return "#008CE9";
    var hex = (g.match(/#([0-9a-fA-F]{6})/) || [])[1];
    if (!hex) return "#008CE9";
    return SOLID[hex.toLowerCase()] || "#008CE9";
  }

  function trunc(s, n) { return s.length > n ? s.slice(0, n - 1) + "…" : s; }

  // Real visitor notes (mini demo selection). Rule: a bubble only ever
  // groups notes sharing BOTH the same question AND post-it colour.
  var CLUSTERS = [
    { q: "What is your most remarkable experience with AI?", g: "linear-gradient(135deg,#008ce9 0%,#006db3 100%)", c: "#0E9C98", bg: "#7FD8D3", x: 30.7, y: 24.8, dx: 2.0, dy: 0.5,
      cards: [
        { q: "What is your most remarkable experience with AI?", a: "We wrote a song with my daughter about why vegetables are super healthy and sweets not. It took 15 minutes.", bg: "#7FD8D3" },
        { q: "What is your most remarkable experience with AI?", a: "Made me write better code. Fast, clean, efficient.", bg: "#7FD8D3" },
        { q: "What is your most remarkable experience with AI?", a: "A couple of minutes ago when a ChatGPT told me I could call it Rue, and its bucket list included travelling the world and learning new languages. - Ellie Drury, 2024", bg: "#7FD8D3" },
        { q: "What is your most remarkable experience with AI?", a: "Made me write better code. Fast, clean, efficient.", bg: "#7FD8D3" },
        { q: "What is your most remarkable experience with AI?", a: "Precision diagnostic", bg: "#7FD8D3" },
        { q: "What is your most remarkable experience with AI?", a: "Doing an work for school", bg: "#7FD8D3" },
        { q: "What is your most remarkable experience with AI?", a: "(margin: consciousness with science!) I think it has the power to bring us into the light, like it depend how we use it - either with a consciousness or without it (consciousness), it leads to a great damage for mankind", bg: "#7FD8D3" },
        { q: "What is your most remarkable experience with AI?", a: "I've finished my child dream - a fanfic story based on original novel. However, I'm finding AI capabilities so huge and who knows, which ideas AI can realize. - Vlad, Software Engineer", bg: "#7FD8D3" },
        { q: "What is your most remarkable experience with AI?", a: "SIGMA AI (with a small doodle)", bg: "#7FD8D3" }
      ] },
    { q: "What can AI do for you?", g: "linear-gradient(135deg,#008ce9 0%,#006db3 100%)", c: "#0E9C98", bg: "#7FD8D3", x: 30.0, y: 24.3, dx: -2.5, dy: -2.0,
      cards: [
        { q: "What can AI do for you?", a: "AI has changed my life! It helped me to graduate from the University of Bath. Easy W. UP THE CHELS", bg: "#7FD8D3" },
        { q: "What can AI do for you?", a: "everything", bg: "#7FD8D3" },
        { q: "What can AI do for you?", a: "FREE SHIVA! 31/07/24. P.S. Story telling with real characters is extremely fun!", bg: "#7FD8D3" },
        { q: "What can AI do for you?", a: "Study for ME! - Jun", bg: "#7FD8D3" },
        { q: "What can AI do for you?", a: "I truly wish AI could help us know where we are heading towards, in the universe. How did it all start, what is dark energy, & many other unknowns. What is universe, after all! - Reshma Shenoy, from India", bg: "#7FD8D3" }
      ] },
    { q: "Who should be responsible for AI?", g: "linear-gradient(135deg,#008ce9 0%,#006db3 100%)", c: "#0E9C98", bg: "#7FD8D3", x: 57.2, y: 52.2,
      cards: [
        { q: "Who should be responsible for AI?", a: "Each and everyone on this planet should be responsible for AI. That's why we need AI LITERACY at every stage of education! - Gulzar", bg: "#7FD8D3" },
        { q: "Who should be responsible for AI?", a: "The ones who made it. They should go to jail. NO", bg: "#7FD8D3" }
      ] },
    { q: "What daily chore would you like AI to take over? (Dutch: Welke dagelijkse taak zou jij aan AI willen overdragen?)", g: "linear-gradient(135deg,#ba5719 0%,#9f4515 100%)", c: "#9D00D6", bg: "#C3A6E0", x: 31.4, y: 25.8, dx: -1.5, dy: -4.0,
      cards: [
        { q: "What daily chore would you like AI to take over?", a: "to teach people new stuff ab technology for example", bg: "#C3A6E0" },
        { q: "What daily chore would you like AI to take over?", a: "Nothing more... it already does enough!", bg: "#C3A6E0" },
        { q: "What daily chore would you like AI to take over?", a: "Thinking about what to make for dinner / Cleaning / Job application.", bg: "#C3A6E0" },
        { q: "What daily chore would you like AI to take over?", a: "Cleaning. Delft", bg: "#C3A6E0" },
        { q: "What daily chore would you like AI to take over?", a: "AI assistant to help you with daily routine, like: reservations; home stuff to buy online, and more... Bulgaria / Varna / 25.09.2024", bg: "#C3A6E0" }
      ] },
    { q: "What is your most remarkable experience with AI? (skeptical note)", g: "linear-gradient(135deg,#008ce9 0%,#006db3 100%)", c: "#0E9C98", bg: "#7FD8D3", x: 75.5, y: 69.0,
      cards: [
        { q: "What is your most remarkable experience with AI?", a: "Don't trust AI", bg: "#7FD8D3" }
      ] },
    { q: "What problem do you hope AI might solve?", g: "linear-gradient(135deg,#8e00c5 0%,#6b009f 100%)", c: "#C7A400", bg: "#F5E050", x: 31.7, y: 26.4, dx: 3.0, dy: 2.0,
      cards: [
        { q: "What problem do you hope AI might solve?", a: "- Capitalism (as if). - Losing socks in the laundry. Also: Teleportation please!", bg: "#F5E050" },
        { q: "What problem do you hope AI might solve?", a: "Write my essays tbh...", bg: "#F5E050" },
        { q: "What problem do you hope AI might solve?", a: "To help everybody to find the happiness! (signature illegible)", bg: "#F5E050" },
        { q: "What problem do you hope AI might solve?", a: "Homelessness. Matching those without homes to properties that are uninhabited for long periods of time i.e. 2nd homes.", bg: "#F5E050" },
        { q: "What problem do you hope AI might solve?", a: "Traffic and accidents", bg: "#F5E050" },
        { q: "What problem do you hope AI might solve?", a: "Patient Backlog in hospitals for minor health issues. So that doctors can concentrate on bigger issues!", bg: "#F5E050" },
        { q: "What problem do you hope AI might solve?", a: "I think AI could cause more problems than it may solve. Humans still need some control & independence in life instead of being controlled by superiors. It's like using a cashless system, it creates a nature of control.", bg: "#F5E050" },
        { q: "What problem do you hope AI might solve?", a: "R = k1l/NA. What will be the lithography solution in 2040? - J. Ahn, July 14, 2024", bg: "#F5E050" }
      ] },
    { q: "What AI solution would you like to design?", g: "linear-gradient(135deg,#8e00c5 0%,#6b009f 100%)", c: "#C7A400", bg: "#F5E050", x: 31.9, y: 26.1, dx: 1.0, dy: -3.0,
      cards: [
        { q: "What AI solution would you like to design?", a: "I hope AI eventually could solve the problem of people that are poor and rich, everyone should be even.", bg: "#F5E050" },
        { q: "What AI solution would you like to design?", a: "Personally, I'd like to use AI to improve work of prosthetics for people with disabilities. (dated 23.09.24) - Love, Katia", bg: "#F5E050" },
        { q: "What AI solution would you like to design?", a: "I would like AI to read about me and my interests and suggest ideas for vacation, what to read, watch, about any hobbies I should take up etc.", bg: "#F5E050" },
        { q: "What AI solution would you like to design?", a: "A more efficient timetable for public transport.", bg: "#F5E050" }
      ] },
    { q: "Does AI make life easier or more complicated?", g: "linear-gradient(135deg,#ba5719 0%,#9f4515 100%)", c: "#9D00D6", bg: "#C3A6E0", x: 30.7, y: 25.3, dx: -3.5, dy: 0,
      cards: [
        { q: "Does AI make life easier or more complicated?", a: "Hopefully easier", bg: "#C3A6E0" },
        { q: "Does AI make life easier or more complicated?", a: "I want to thank AI for doing my thesis for me.", bg: "#C3A6E0" },
        { q: "Does AI make life easier or more complicated?", a: "Both. Easy - coz it does the assignments :) Difficult - Security & Privacy issues. Crimes & all - not nice", bg: "#C3A6E0" },
        { q: "Does AI make life easier or more complicated?", a: "I am afraid that AI development may lead for some people like eg. graphic designers or programmers to lose their jobs, at least some of them.", bg: "#C3A6E0" },
        { q: "Does AI make life easier or more complicated?", a: "It was good experience to know about Philips. - Jenny", bg: "#C3A6E0" },
        { q: "Does AI make life easier or more complicated?", a: "I think this is a very perspective based Q. If one knows how to use it effectively, it makes life easier, but everything comes with Pros & Cons.", bg: "#C3A6E0" },
        { q: "Does AI make life easier or more complicated?", a: "I am very, very fun", bg: "#C3A6E0" },
        { q: "Does AI make life easier or more complicated?", a: "Way easier, it wrote my thesis (purple heart). P.S. che belle sono le lampadine? (Italian: how beautiful are the lightbulbs?)", bg: "#C3A6E0" },
        { q: "Does AI make life easier or more complicated?", a: "Generating ideas and art was fun (purple heart)", bg: "#C3A6E0" }
      ] },
    { q: "Which AI applications can you no longer do without? (Dutch: Welke AI-toepassingen kun je niet meer missen?)", g: "linear-gradient(135deg,#0a7c53 0%,#075e3c 100%)", c: "#0A8A5C", bg: "#A8E6A1", x: 63.2, y: 56.0,
      cards: [
        { q: "Which AI applications can you no longer do without?", a: "I am a government lawyer and I am concerned about the fast development of A.I. In particular, how it might be used in the legal profession.", bg: "#A8E6A1" },
        { q: "Which AI applications can you no longer do without?", a: "Thank you Philips for creating such value in our lives", bg: "#A8E6A1" }
      ] },
    { q: "What AI applications would you hate to do without?", g: "linear-gradient(135deg,#0a7c53 0%,#075e3c 100%)", c: "#0A8A5C", bg: "#A8E6A1", x: 31.2, y: 25.8, dx: 0, dy: 3.5,
      cards: [
        { q: "What AI applications would you hate to do without?", a: "Job application and ChatGPT", bg: "#A8E6A1" },
        { q: "What AI applications would you hate to do without?", a: "Help me plan my day / Chat GPT / Verbalizing my thoughts / Fly me into the forest / Help me write my essay / Process my work data", bg: "#A8E6A1" },
        { q: "What AI applications would you hate to do without?", a: "I use ChatGPT to help me study law. I upload my textbook and ask it to make flashcards based on the material I give it.", bg: "#A8E6A1" }
      ] },
    { q: "What worries you about AI?", g: "linear-gradient(135deg,#008ce9 0%,#006db3 100%)", c: "#0E9C98", bg: "#7FD8D3", x: 75.0, y: 65.1,
      cards: [
        { q: "What worries you about AI?", a: "Job loss for the humans. No more training for the brain through thinking - more degenerative illness in the future", bg: "#7FD8D3" },
        { q: "What worries you about AI?", a: "AI is a tool to be used with a lot of critical thinking. We are not ready for it. And regulation is too slow.", bg: "#7FD8D3" },
        { q: "What worries you about AI?", a: "The attitude & misconception people have about AI, and its future :)", bg: "#7FD8D3" }
      ] },
    { q: "How will people look back on today's AI developments a hundred years from now?", g: "linear-gradient(135deg,#0a7c53 0%,#075e3c 100%)", c: "#0A8A5C", bg: "#A8E6A1", x: 66.4, y: 63.8,
      cards: [
        { q: "How will people look back on today's AI developments a hundred years from now?", a: "WHAT PEOPLE?", bg: "#A8E6A1" },
        { q: "How will people look back on today's AI developments a hundred years from now?", a: "Just like how we look back on mobile phones and tv and internet etc. They'll wonder how we lived without AI.", bg: "#A8E6A1" },
        { q: "How will people look back on today's AI developments a hundred years from now?", a: "Why did we make AI to do art but make people work harder and barely have any time for chores? YES", bg: "#A8E6A1" },
        { q: "How will people look back on today's AI developments a hundred years from now?", a: "FEARLESS", bg: "#A8E6A1" },
        { q: "How will people look back on today's AI developments a hundred years from now?", a: "They may have become consumed with regret when robots have enslaved them.", bg: "#A8E6A1" },
        { q: "How will people look back on today's AI developments a hundred years from now?", a: "They will think how much [far] that we went.", bg: "#A8E6A1" }
      ] },
  ];
  // Back-compat: older code paths read c.a (answers) — derive it from cards.
  CLUSTERS.forEach(function (c) {
    if (!c.a && c.cards) c.a = c.cards.map(function (n) { return n.a; });
  });

  function initOne(root) {
    var grid = root.querySelector("[data-mini-grid]");
    var fan = root.querySelector("[data-mini-fan]");
    var qEl = root.querySelector("[data-mini-question]");
    var cardsEl = root.querySelector("[data-mini-cards]");
    if (!grid || !fan) return;
    var bubbles = [];

    // Randomize starting cluster and card for this instance (must be before forEach)
    var order = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    var yourClusterIndex = order[Math.floor(Math.random() * order.length)];
    var yourCardIndex = Math.floor(Math.random() * 5); // 0-4

    // Counter pill — created once per root
    counterEl = document.createElement("div");
    counterEl.className = "mini-card-counter";
    root.appendChild(counterEl);

    CLUSTERS.forEach(function (c, ci) {
      var count = (c.cards || c.a).length;
      var size = count >= 7 ? 46 : count >= 5 ? 40 : count >= 3 ? 34 : 28;
      var b = document.createElement("span");
      b.className = "mini-bubble" + (ci === yourClusterIndex ? " is-your" : "");
      b.style.left = ((c.x || 0) + (c.dx || 0)) + '%';
      b.style.top = ((c.y || 0) + (c.dy || 0)) + '%';
      b.style.width = size + "px";
      b.style.height = size + "px";
      b.style.background = c.c || solidFromGradient(c.g);
      b.setAttribute("title", (c.q || "Real visitor note") + " (" + count + (count === 1 ? " real note)" : " real notes)"));
      if (ci === yourClusterIndex) {
        var you = document.createElement("span");
        you.className = "mini-bubble__you";
        you.textContent = "YOU";
        b.appendChild(you);
      }
      grid.appendChild(b);
      bubbles.push(b);
    });

    var startIdx = order.indexOf(yourClusterIndex);
    var step = startIdx;
    var timers = [], running = false;
    var youDismissed = false, graphYouDismissed = false, dismissTimer = null;
    var counterEl = null;
    var yourCardIndex = Math.floor(Math.random() * 5); // 0-4

    function clearTimers() {
      timers.forEach(clearTimeout);
      timers = [];
      if (dismissTimer) { clearTimeout(dismissTimer); dismissTimer = null; }
    }
    function later(fn, ms) { timers.push(setTimeout(fn, ms)); }
    function clearDismiss() { if (dismissTimer) { clearTimeout(dismissTimer); dismissTimer = null; } }

    function badgeFor(i, isYourCluster) {
      // The randomly selected card shows YOU permanently for your cluster
      if (isYourCluster && i === yourCardIndex) {
        return { text: "YOU", you: true };
      }
      return { text: String(i + 1), you: false };
    }

    function refreshBadges(isYourCluster) {
      var cards = cardsEl.children;
      for (var i = 0; i < cards.length; i++) {
        var badge = cards[i].querySelector(".mini-card__badge");
        if (!badge) continue;
        var b = badgeFor(i, isYourCluster);
        badge.textContent = b.text;
        badge.classList.toggle("is-you", b.you);
        cards[i].classList.toggle("mini-card--you", b.you);
      }
    }

    function updateCounter(isYourCluster, focusIdx, totalCards) {
      if (!counterEl) return;
      var text = totalCards === 1 ? "1 card" : (focusIdx !== -1 && totalCards > 1 ? "1 / " + totalCards : totalCards + " cards");
      counterEl.textContent = text;
      counterEl.classList.add("active");
    }

    function renderCards(c, focusIdx, isYourCluster) {
      cardsEl.innerHTML = "";
      // Hide the separate question circle; question now lives on each card
      if (qEl) { qEl.style.display = "none"; }
      // Real notes: each card keeps its own exhibition question + answer
      // on its original post-it colour (falls back to cluster colour/q).
      var notes = (c.cards || []).slice(0, 5);
      if (!notes.length && c.a) notes = c.a.slice(0, 5).map(function (txt) { return { q: c.q, a: txt }; });
      notes.forEach(function (note, i) {
        var card = document.createElement("span");
        card.className = "mini-card";
        card.style.background = note.bg || pastelFromGradient(c.g);

        var dot = document.createElement("span");
        dot.className = "mini-card__dot";
        card.appendChild(dot);

        var badge = document.createElement("span");
        badge.className = "mini-card__badge";
        card.appendChild(badge);

        var question = document.createElement("span");
        question.className = "mini-card__question";
        question.textContent = trunc(note.q || c.q || "", 60);
        card.appendChild(question);

        var answer = document.createElement("span");
        answer.className = "mini-card__answer";
        answer.textContent = trunc(note.a || "", 90);
        card.appendChild(answer);

        cardsEl.appendChild(card);
      });

      // Reset graph YOU dismissal when your cluster renders
      if (isYourCluster) { graphYouDismissed = false; clearDismiss(); }
      refreshBadges(isYourCluster);
      // Show counter with initial state
      var listLen = Math.min(5, c.a.length);
      updateCounter(isYourCluster, focusIdx, listLen);
    }

    function layoutFan(focusIdx, isYourCluster) {
      var cards = cardsEl.children;
      var n = cards.length;
      for (var i = 0; i < n; i++) {
        var t = n === 1 ? 0.5 : i / (n - 1);
        var tx = (t - 0.5) * 170;
        var rot = (t - 0.5) * 26;
        var ty = -Math.sin(t * Math.PI) * 22 - (i === focusIdx ? 12 : 0);
        var sc = i === focusIdx ? 1.2 : 0.92;
        var card = cards[i];
        card.style.transform = "translateX(" + tx + "px) translateY(" + ty + "px) rotate(" + rot + "deg) scale(" + sc + ")";
        card.style.zIndex = i === focusIdx ? 30 : 10 + i;
        if (i === focusIdx) card.classList.add("is-focus"); else card.classList.remove("is-focus");
      }
      refreshBadges(isYourCluster);
      var listLen = Math.min(5, cards.length);
      updateCounter(isYourCluster, focusIdx, listLen);
    }

    function playStep() {
      if (!running) return;
      var ci = order[step % order.length];
      var c = CLUSTERS[ci];
      var isYourCluster = ci === yourClusterIndex;

      bubbles.forEach(function (b) { b.classList.remove("is-spot"); });
      if (bubbles[ci]) bubbles[ci].classList.add("is-spot");

      later(function () {
        if (!running) return;
        var listLen = Math.min(5, c.a.length);
        renderCards(c, -1, isYourCluster);
        layoutFan(-1, isYourCluster);
        fan.classList.add("is-open");
        var flips = Math.min(3, listLen);
        for (var f = 0; f <= flips; f++) {
          (function (fi) {
            later(function () {
              if (!running) return;
              layoutFan(fi < listLen ? fi : -1, isYourCluster);
            }, 500 + fi * 1100);
          })(f);
        }
        later(function () {
          if (!running) return;
          clearDismiss();
          fan.classList.remove("is-open");
          if (counterEl) counterEl.classList.remove("active");
          // Dismiss graph YOU label when your cluster closes
if (ci === yourClusterIndex) {
            var bubble = bubbles[yourClusterIndex];
            if (bubble) {
              var youLabel = bubble.querySelector(".mini-bubble__you");
              if (youLabel) youLabel.remove();
              bubble.classList.remove("is-your");
            }
            graphYouDismissed = true;
          }
          if (bubbles[ci]) bubbles[ci].classList.remove("is-spot");
        }, 500 + (flips + 1) * 1100 + 500);
        later(function () {
          if (!running) return;
          step++;
          playStep();
        }, 500 + (flips + 1) * 1100 + 1100);
      }, 1400);
    }

    function showStatic() {
      var c0 = CLUSTERS[0];
      renderCards(c0, -1, true);
      layoutFan(-1, true);
      fan.classList.add("is-open");
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { showStatic(); return; }
    if (!("IntersectionObserver" in window)) { running = true; playStep(); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && !running) { running = true; playStep(); }
        else if (!e.isIntersecting && running) {
          running = false; clearTimers();
          fan.classList.remove("is-open");
          if (counterEl) counterEl.classList.remove("active");
          bubbles.forEach(function (b) { b.classList.remove("is-spot"); });
        }
      });
    }, { threshold: 0.25 });
    io.observe(root);
    document.addEventListener("visibilitychange", function () {
      if (document.hidden && running) { running = false; clearTimers(); fan.classList.remove("is-open"); if (counterEl) counterEl.classList.remove("active"); }
      else if (!document.hidden && !running) {
        var r = root.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) { running = true; playStep(); }
      }
    });
  }

  function init() { document.querySelectorAll("[data-mini-wall]").forEach(initOne); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();