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

  var YOUR_CLUSTER_INDEX = 0;

  var PASTEL = {
    "008ce9": "#BFE3FF",
    "8e00c5": "#E4C6FF",
    "ba5719": "#FFE5C4",
    "0a7c53": "#C6F2D4"
  };

  function pastelFromGradient(g) {
    if (!g) return "#BFE3FF";
    var hex = (g.match(/#([0-9a-fA-F]{6})/) || [])[1];
    if (!hex) return "#BFE3FF";
    return PASTEL[hex.toLowerCase()] || "#BFE3FF";
  }

  function trunc(s, n) { return s.length > n ? s.slice(0, n - 1) + "…" : s; }

  var CLUSTERS = [
    { q: "What can AI do for you?", g: "linear-gradient(135deg,#008ce9 0%,#006db3 100%)", x: 30, y: 38,
      a: ["AI can streamline my work by automating repetitive tasks.", "It could help me make smarter financial decisions.", "AI can provide personalized health tips based on my data.", "It could assist me in learning new languages faster.", "AI could help me organize my time more efficiently.", "It can offer targeted suggestions for professional growth.", "AI helps me draft emails and summarize documents instantly."] },
    { q: "What AI solution would you like to design?", g: "linear-gradient(135deg,#8e00c5 0%,#6b009f 100%)", x: 30, y: 16,
      a: ["An AI tutor that adapts lessons based on learning pace.", "An AI that monitors environmental pollution levels.", "A mental health companion that offers daily check-ins.", "An AI that assists artists in creating new concepts.", "A community safety AI that predicts areas needing help.", "A budgeting assistant with real-time spending tips."] },
    { q: "What worries you about AI?", g: "linear-gradient(135deg,#008ce9 0%,#006db3 100%)", x: 68, y: 30,
      a: ["Deepfakes making it impossible to trust what you see online.", "AI may cause a loss of privacy.", "It could make humans too dependent on technology.", "AI could replace jobs, leading to unemployment.", "The misuse of AI in spreading misinformation.", "AI might be used for surveillance without consent."] },
    { q: "Does AI make life easier or more complicated?", g: "linear-gradient(135deg,#ba5719 0%,#9f4515 100%)", x: 62, y: 68,
      a: ["It generally simplifies routine tasks.", "Sometimes it adds a learning curve with new interfaces.", "AI can make things more efficient, saving time.", "It can complicate things if it malfunctions or is biased.", "Overall, it helps reduce mental load in daily life.", "For complex tasks, AI can actually add confusion."] },
    { q: "How will people look back on today's AI developments a hundred years from now?", g: "linear-gradient(135deg,#0a7c53 0%,#075e3c 100%)", x: 86, y: 60,
      a: ["They may see it as a pioneering era for technology.", "It could be viewed as a time of ethical challenges.", "People might laugh at how basic today's AI actually was.", "It might be seen as the beginning of human-AI collaboration.", "Future generations may consider it a critical turning point.", "They could view it as a time filled with optimism and fear."] },
    { q: "What problem do you hope AI might solve?", g: "linear-gradient(135deg,#0a7c53 0%,#075e3c 100%)", x: 46, y: 56,
      a: ["Finding sustainable solutions for climate change through better modeling.", "Improving access to quality healthcare globally.", "Helping reduce food waste and improve distribution.", "Supporting mental health with accessible resources.", "Solving global educational inequality through tutoring.", "Enhancing wildlife protection and biodiversity."] }
  ];

  function initOne(root) {
    var grid = root.querySelector("[data-mini-grid]");
    var fan = root.querySelector("[data-mini-fan]");
    var qEl = root.querySelector("[data-mini-question]");
    var cardsEl = root.querySelector("[data-mini-cards]");
    if (!grid || !fan) return;
    var bubbles = [];

    // Counter pill — created once per root
    counterEl = document.createElement("div");
    counterEl.className = "mini-card-counter";
    root.appendChild(counterEl);

    CLUSTERS.forEach(function (c, ci) {
      var size = c.a.length >= 7 ? 46 : c.a.length >= 5 ? 40 : c.a.length >= 3 ? 34 : 28;
      var b = document.createElement("span");
      b.className = "mini-bubble" + (ci === YOUR_CLUSTER_INDEX ? " is-your" : "");
      b.style.left = c.x + '%';
      b.style.top = c.y + '%';
      b.style.width = size + "px";
      b.style.height = size + "px";
      b.style.background = pastelFromGradient(c.g);
      b.style.animationDelay = (ci * -0.9) + "s";
      if (ci === YOUR_CLUSTER_INDEX) {
        var you = document.createElement("span");
        you.className = "mini-bubble__you";
        you.textContent = "YOU";
        b.appendChild(you);
      }
      grid.appendChild(b);
      bubbles.push(b);
    });

    var order = [0, 5, 4, 2];
    var step = 0, timers = [], running = false;
    var youDismissed = false, graphYouDismissed = false, dismissTimer = null;
    var counterEl = null;

    function clearTimers() {
      timers.forEach(clearTimeout);
      timers = [];
      if (dismissTimer) { clearTimeout(dismissTimer); dismissTimer = null; }
    }
    function later(fn, ms) { timers.push(setTimeout(fn, ms)); }
    function clearDismiss() { if (dismissTimer) { clearTimeout(dismissTimer); dismissTimer = null; } }

    function badgeFor(i, isYourCluster) {
      // Card 0 always shows YOU permanently for your cluster
      if (isYourCluster && i === 0) {
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
      var list = c.a.slice(0, 5);
      list.forEach(function (txt, i) {
        var card = document.createElement("span");
        card.className = "mini-card";
        card.style.background = pastelFromGradient(c.g);

        var dot = document.createElement("span");
        dot.className = "mini-card__dot";
        card.appendChild(dot);

        var badge = document.createElement("span");
        badge.className = "mini-card__badge";
        card.appendChild(badge);

        var question = document.createElement("span");
        question.className = "mini-card__question";
        question.textContent = trunc(c.q, 60);
        card.appendChild(question);

        var answer = document.createElement("span");
        answer.className = "mini-card__answer";
        answer.textContent = trunc(txt, 90);
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
      var isYourCluster = ci === YOUR_CLUSTER_INDEX;

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
          if (ci === YOUR_CLUSTER_INDEX) {
            var bubble = bubbles[YOUR_CLUSTER_INDEX];
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