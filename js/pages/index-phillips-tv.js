(function () {
  "use strict";
  var CLUSTERS = [
    { q: "What can AI do for you?", g: "linear-gradient(135deg,#008ce9 0%,#006db3 100%)", x: 30, y: 38, a: ["AI can streamline my work by automating repetitive tasks.", "It could help me make smarter financial decisions.", "AI can provide personalized health tips based on my data.", "It could assist me in learning new languages faster.", "AI could help me organize my time more efficiently.", "It can offer targeted suggestions for professional growth.", "AI helps me draft emails and summarize documents instantly."] },
    { q: "What daily chore would you like AI to take over?", g: "linear-gradient(135deg,#8e00c5 0%,#6b009f 100%)", x: 14, y: 64, a: ["I would love AI to handle sorting and folding laundry.", "It could plan and prepare my weekly grocery list.", "AI can manage my home cleaning schedule automatically."] },
    { q: "What AI solution would you like to design?", g: "linear-gradient(135deg,#008ce9 0%,#006db3 100%)", x: 30, y: 16, a: ["An AI tutor that adapts lessons based on learning pace.", "An AI that monitors environmental pollution levels.", "A mental health companion that offers daily check-ins.", "An AI that assists artists in creating new concepts.", "A community safety AI that predicts areas needing help."] },
    { q: "What makes you afraid of AI?", g: "linear-gradient(135deg,#c90035 0%,#9e002a 100%)", x: 68, y: 30, a: ["Deepfakes making it impossible to trust what you see online."] },
    { q: "How should AI be regulated?", g: "linear-gradient(135deg,#0a7c53 0%,#075e3c 100%)", x: 62, y: 68, a: ["Strong transparency requirements for AI use.", "Independent auditing before deployment at scale.", "Clear accountability chains for AI decisions.", "International cooperation on AI safety standards."] },
    { q: "What role should AI play in creative work?", g: "linear-gradient(135deg,#8e00c5 0%,#6b009f 100%)", x: 46, y: 56, a: ["AI amplifies human creativity rather than replacing it.", "I worry it will devalue years of artistic practice.", "It is democratizing creativity for everyone.", "The best results come from humans and AI together.", "AI tools should be assistants, not replacements."] }
  ];
  function trunc(s, n) { return s.length > n ? s.slice(0, n - 1) + "…" : s; }
  function initOne(root) {
    var grid = root.querySelector("[data-mini-grid]");
    var fan = root.querySelector("[data-mini-fan]");
    var qEl = root.querySelector("[data-mini-question]");
    var cardsEl = root.querySelector("[data-mini-cards]");
    if (!grid || !fan) return;
    var bubbles = [];
    CLUSTERS.forEach(function (c, ci) {
      var size = c.a.length >= 7 ? 46 : c.a.length >= 5 ? 40 : c.a.length >= 3 ? 34 : 28;
      var b = document.createElement("span");
      b.className = "mini-bubble";
      b.style.left = c.x + "%";
      b.style.top = c.y + "%";
      b.style.width = size + "px";
      b.style.height = size + "px";
      b.style.background = c.g;
      b.style.animationDelay = (ci * -0.9) + "s";
      grid.appendChild(b);
      bubbles.push(b);
    });
    var order = [0, 5, 4, 2];
    var step = 0, timers = [], running = false;
    function clearTimers() { timers.forEach(clearTimeout); timers = []; }
    function later(fn, ms) { timers.push(setTimeout(fn, ms)); }
    function layoutFan(focusIdx) {
      var cards = cardsEl.children;
      var n = cards.length;
      for (var i = 0; i < n; i++) {
        var card = cards[i];
        var t = n === 1 ? 0.5 : i / (n - 1);
        var tx = (t - 0.5) * 220;
        var rot = (t - 0.5) * 26;
        var ty = -Math.sin(t * Math.PI) * 34 - (i === focusIdx ? 16 : 0);
        var sc = i === focusIdx ? 1.35 : 0.92;
        card.style.transform = "translateX(" + tx + "px) translateY(" + ty + "px) rotate(" + rot + "deg) scale(" + sc + ")";
        card.style.zIndex = i === focusIdx ? 30 : 10 + i;
        if (i === focusIdx) card.classList.add("is-focus"); else card.classList.remove("is-focus");
      }
    }
    function playStep() {
      if (!running) return;
      var ci = order[step % order.length];
      var c = CLUSTERS[ci];
      bubbles.forEach(function (b) { b.classList.remove("is-spot"); });
      var spot = bubbles[ci];
      if (spot) spot.classList.add("is-spot");
      later(function () {
        if (!running) return;
        cardsEl.innerHTML = "";
        qEl.textContent = trunc(c.q, 90);
        qEl.style.background = c.g;
        var list = c.a.slice(0, 5);
        list.forEach(function (txt, i) {
          var d = document.createElement("span");
          d.className = "mini-card";
          d.style.background = c.g;
          d.innerHTML = '<span class="mini-card__num">' + (i + 1) + "/" + list.length + "</span><span>" + trunc(txt, 110) + "</span>";
          cardsEl.appendChild(d);
        });
        layoutFan(-1);
        fan.classList.add("is-open");
        var flips = Math.min(3, list.length);
        for (var f = 0; f <= flips; f++) {
          (function (fi) {
            later(function () {
              if (!running) return;
              layoutFan(fi < list.length ? fi : -1);
            }, 500 + fi * 1100);
          })(f);
        }
        later(function () {
          if (!running) return;
          fan.classList.remove("is-open");
          if (spot) spot.classList.remove("is-spot");
        }, 500 + (flips + 1) * 1100 + 500);
        later(function () {
          if (!running) return;
          step++;
          playStep();
        }, 500 + (flips + 1) * 1100 + 1100);
      }, 1400);
    }
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    function showStatic() {
      var c0 = CLUSTERS[0];
      cardsEl.innerHTML = "";
      qEl.textContent = trunc(c0.q, 90);
      qEl.style.background = c0.g;
      c0.a.slice(0, 5).forEach(function (txt, i) {
        var d = document.createElement("span");
        d.className = "mini-card";
        d.style.background = c0.g;
        d.innerHTML = '<span class="mini-card__num">' + (i + 1) + "/5</span><span>" + trunc(txt, 110) + "</span>";
        cardsEl.appendChild(d);
      });
      layoutFan(0);
      fan.classList.add("is-open");
    }
    if (reduce) { showStatic(); return; }
    if (!("IntersectionObserver" in window)) { running = true; playStep(); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && !running) { running = true; playStep(); }
        else if (!e.isIntersecting && running) { running = false; clearTimers(); fan.classList.remove("is-open"); bubbles.forEach(function (b) { b.classList.remove("is-spot"); }); }
      });
    }, { threshold: 0.25 });
    io.observe(root);
    document.addEventListener("visibilitychange", function () {
      if (document.hidden && running) { running = false; clearTimers(); fan.classList.remove("is-open"); }
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
