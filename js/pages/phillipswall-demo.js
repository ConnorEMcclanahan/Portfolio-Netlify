/**
 * Phillips Wall Demo - Vanilla JS Sentiment Index
 * Bubbles cluster together when close, expand on click
 */
(function () {
  "use strict";

  var DEMO_CLUSTERS = [
    { id:1, q:"What can AI do for you?", g:"linear-gradient(135deg,#008ce9 0%,#006db3 100%)", x:30, y:38,
      a:["AI can streamline my work by automating repetitive tasks.","It could help me make smarter financial decisions.","AI can provide personalized health tips based on my data.","It could assist me in learning new languages faster.","AI could help me organize my time more efficiently.","It can offer targeted suggestions for my professional growth.","AI helps me draft emails and summarize long documents instantly."] },
    { id:2, q:"What daily chore would you like AI to take over?", g:"linear-gradient(135deg,#8e00c5 0%,#6b009f 100%)", x:14, y:64,
      a:["I would love AI to handle sorting and folding laundry.","It could plan and prepare my weekly grocery list.","AI can manage my home cleaning schedule automatically."] },
    { id:3, q:"What AI solution would you like to design?", g:"linear-gradient(135deg,#008ce9 0%,#006db3 100%)", x:30, y:16,
      a:["An AI tutor that adapts lessons based on learning pace.","An AI that monitors environmental pollution levels.","A mental health companion that offers daily check-ins.","An AI that assists artists in creating new concepts.","A community safety AI that predicts areas needing help."] },
    { id:4, q:"What is your most remarkable experience with AI?", g:"linear-gradient(135deg,#008ce9 0%,#006db3 100%)", x:16, y:82,
      a:["When AI helped diagnose my skin condition from a photo.","Seeing GPT write poetry that moved me to tears."] },
    { id:5, q:"What makes you afraid of AI?", g:"linear-gradient(135deg,#c90035 0%,#9e002a 100%)", x:68, y:30,
      a:["Deepfakes making it impossible to trust what you see online."] },
    { id:6, q:"How should AI be regulated?", g:"linear-gradient(135deg,#0a7c53 0%,#075e3c 100%)", x:62, y:68,
      a:["Strong transparency requirements for AI use.","Independent auditing before deployment at scale.","Clear accountability chains for AI decisions.","International cooperation on AI safety standards."] },
    { id:7, q:"What role should AI play in creative work?", g:"linear-gradient(135deg,#8e00c5 0%,#6b009f 100%)", x:46, y:56,
      a:["AI amplifies human creativity rather than replacing it.","I worry it will devalue years of artistic practice.","It's democratizing creativity for everyone.","The best results come from humans and AI together.","I'm concerned about AI content drowning out humans.","AI tools should be assistants, not replacements.","Nothing beats the human touch in real art.","AI art feels soulless without human direction.","I use it for brainstorming but finish everything myself."] },
    { id:8, q:"How will people look back on today's AI developments a hundred years from now?", g:"linear-gradient(135deg,#c90035 0%,#9e002a 100%)", x:86, y:60,
      a:["They may see it as a pioneering era for technology.","It could be viewed as a time of ethical challenges."] },
    { id:9, q:"What keeps you up at night?", g:"linear-gradient(135deg,#c90035 0%,#9e002a 100%)", x:80, y:14,
      a:["The pace of change outrunning our wisdom.","My kids growing up in a world I don't understand."] },
    { id:10, q:"What AI feature can't you live without?", g:"linear-gradient(135deg,#0a7c53 0%,#075e3c 100%)", x:38, y:90,
      a:["Real-time translation when I travel abroad."] }
  ];

  var gridEl, overlayEl, stackEl;
  var activeCluster = null;
  var focusedCard = null;
  var hoveredCard = null;
  var resizeRefreshPending = false;

  function createCluster(cluster) {
    var groupEl = document.createElement("div");
    groupEl.className = "cluster-group";
    groupEl.style.left = cluster.x + "%";
    groupEl.style.top = cluster.y + "%";
    groupEl.setAttribute("data-cluster-id", cluster.id);

    var bubbleCount = cluster.a.length;
    // Small clusters (1-2) stay small, medium ones grow, big ones cap out —
    // this gives the natural variety of a living wall.
    var bubbleSize = Math.min(88, 36 + bubbleCount * 9);
    var bubble = document.createElement("div");
    bubble.className = "answer-bubble";
    bubble.style.background = cluster.g;
    bubble.style.width = bubbleSize + "px";
    bubble.style.height = bubbleSize + "px";
    bubble.style.left = "0";
    bubble.style.top = "0";
    bubble.style.transform = "translate(-50%, -50%)";
    groupEl.appendChild(bubble);

    groupEl.addEventListener("click", function (e) {
      e.stopPropagation();
      var heroEl = groupEl.closest(".phillips-demo-hero");
      if (heroEl && !heroEl.classList.contains("demo-live")) {
        heroEl.classList.add("demo-live");
      }
      expandCluster(cluster);
    });

    gridEl.appendChild(groupEl);
  }

  function lockPageScroll() {
    document.documentElement.classList.add("demo-locked");
    document.body.classList.add("demo-locked");
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    var hero = document.querySelector(".phillips-demo-hero");
    if (hero) hero.classList.add("demo-cards-open");
  }

  function unlockPageScroll() {
    document.documentElement.classList.remove("demo-locked");
    document.body.classList.remove("demo-locked");
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    var hero = document.querySelector(".phillips-demo-hero");
    if (hero) hero.classList.remove("demo-cards-open");
  }

  function expandCluster(cluster) {
    resizeRefreshPending = false;
    activeCluster = cluster;
    focusedCard = null;
    hoveredCard = null;
    lockPageScroll();

    overlayEl.classList.add("active");
    stackEl.classList.add("active");
    stackEl.innerHTML = "";

    var closeBtn = document.createElement("button");
    closeBtn.className = "demo-close-btn";
    closeBtn.setAttribute("aria-label", "Close");
    closeBtn.textContent = "\u00D7";
    closeBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      closeExpanded();
    });
    stackEl.appendChild(closeBtn);

    var questionCircle = document.createElement("div");
    questionCircle.className = "active-question";
    questionCircle.style.background = cluster.g;
    questionCircle.textContent = cluster.q;
    stackEl.appendChild(questionCircle);

    var cardStack = document.createElement("div");
    cardStack.className = "card-stack";

    var totalCards = cluster.a.length;
    // Pixel spacing between card centers. Wide enough that each card
    // clearly peeks out from behind its neighbour in the idle fan (no
    // hovering needed to read the deck). Shrink to fit so even the
    // 9-card hero cluster stays on screen.
    var narrowScreen = window.innerWidth < 768;
    var baseCardW = narrowScreen ? 210 : 320;
    var baseSpacing = narrowScreen ? 150 : 240;
    var maxFanW = Math.min(window.innerWidth * 0.94, 1400);
    var fitSpacing = totalCards > 1
      ? (maxFanW - baseCardW) / (totalCards - 1)
      : baseSpacing;
    var cardSpacing = Math.max(120, Math.min(baseSpacing, fitSpacing));

    for (var i = 0; i < totalCards; i++) {
      (function(idx) {
        var card = document.createElement("div");
        card.className = "answer-card";
        card.style.background = cluster.g;
        card.setAttribute("data-index", idx);

        var cardContent = document.createElement("div");
        cardContent.className = "answer-card__content";
        cardContent.textContent = cluster.a[idx];
        card.appendChild(cardContent);

        var cardNum = document.createElement("div");
        cardNum.className = "answer-card__num";
        cardNum.textContent = (idx + 1) + " / " + totalCards;
        card.appendChild(cardNum);

        card.addEventListener("click", function (e) {
          e.stopPropagation();
          if (focusedCard === idx) {
            focusedCard = null;
          } else {
            focusedCard = idx;
          }
          updateCards(cluster, totalCards, cardSpacing);
        });

        card.addEventListener("mouseenter", function () {
          hoveredCard = idx;
          updateCards(cluster, totalCards, cardSpacing);
        });

        card.addEventListener("mouseleave", function () {
          hoveredCard = null;
          updateCards(cluster, totalCards, cardSpacing);
        });

        cardStack.appendChild(card);
      })(i);
    }

    stackEl.addEventListener("click", function (e) {
      // Clicking the dark backdrop (outside cards/question/close btn) closes.
      if (e.target === stackEl) closeExpanded();
    });
    // Cards must be mounted inside stackEl BEFORE updateCards runs,
    // otherwise querySelectorAll finds no cards and the fan transforms are
    // never applied (all cards left perfectly stacked). This was the
    // "stacks weirdly until you mouse over" bug.
    stackEl.appendChild(cardStack);
    updateCards(cluster, totalCards, cardSpacing);
  }

  function updateCards(cluster, totalCards, cardSpacing) {
    var cards = stackEl.querySelectorAll(".answer-card");
    var center = (totalCards - 1) / 2;

    // Match the original PhillipsWall fan geometry but with a slightly
    // wider arc so the fan is obvious even without hovering:
    //   maxAngle = min(35, totalCards * 3)
    //   angle    = (idx - center) * (maxAngle / totalCards)
    // No downward arc on idle cards (the original sits them flat),
    // only a gentle lift on hover.
    var maxAngle = Math.min(35, totalCards * 3);
    var angleStep = maxAngle / totalCards;

    cards.forEach(function (card, idx) {
      var offset = idx - center;
      var isHovered = hoveredCard === idx;
      var isFocused = focusedCard === idx;

      var angle = offset * angleStep;
      var tx = isFocused ? 0 : offset * cardSpacing;
      var ty = isFocused ? -110 : (isHovered ? -40 : 0);
      var rot = isFocused ? 0 : angle;
      var scale = isFocused ? 1 : (isHovered ? 1.05 : 1);
      // z-index peaks at the CENTER card and decreases outward. This keeps
      // the fanned tops from poking up above their neighbours on the outer
      // cards (the left-side corner-raising problem) — clean fan on both sides.
      var zIndex = isFocused ? 100 : (isHovered ? 50 + idx : 10 + (totalCards - Math.abs(idx - center)));
      var opacity = isFocused ? 1 : (focusedCard !== null ? 0 : 1);

      card.style.transform = "translateX(" + tx + "px) translateY(" + ty + "px) rotate(" + rot + "deg) scale(" + scale + ")";
      card.style.zIndex = zIndex;
      card.style.opacity = opacity;
      card.classList.toggle("focused", isFocused);
      card.classList.toggle("hovered", isHovered);
    });
  }

  function closeExpanded() {
    activeCluster = null;
    focusedCard = null;
    hoveredCard = null;
    resizeRefreshPending = false;
    unlockPageScroll();
    overlayEl.classList.remove("active");
    stackEl.classList.remove("active");
    setTimeout(function () { stackEl.innerHTML = ""; }, 300);
  }

  function init() {
    var hero = document.querySelector(".phillips-demo-hero");
    if (!hero) return;
    gridEl = hero.querySelector(".sentiment-grid");
    if (!gridEl) return;

var axisLines = document.createElement("div");
    axisLines.className = "axis-lines";

    // Activation: wall starts faded; "Try the demo" (or first bubble
    // click) fades everything in.
    var activateBtn = hero.querySelector("#demo-activate-btn");
    function activateDemo() {
      hero.classList.add("demo-live");
    }
    if (activateBtn) {
      activateBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        activateDemo();
      });
    }

    axisLines.innerHTML =
      '<span class="axis-label axis-label--top">AI Enthusiastic</span>' +
      '<span class="axis-label axis-label--bottom">AI Skeptical</span>' +
      '<span class="axis-label axis-label--left">Looking Bright</span>' +
      '<span class="axis-label axis-label--right">A Little Scared</span>' +
      '<span class="quadrant-label quadrant-label--tl">Optimistic & Excited</span>' +
      '<span class="quadrant-label quadrant-label--tr">Cautiously Hopeful</span>' +
      '<span class="quadrant-label quadrant-label--bl">Curious & Open</span>' +
      '<span class="quadrant-label quadrant-label--br">Worried & Critical</span>';
    gridEl.appendChild(axisLines);

    for (var i = 0; i < DEMO_CLUSTERS.length; i++) {
      createCluster(DEMO_CLUSTERS[i]);
    }

    overlayEl = document.createElement("div");
    overlayEl.className = "stack-overlay";
    overlayEl.addEventListener("click", closeExpanded);
    hero.appendChild(overlayEl);

    stackEl = document.createElement("div");
    stackEl.className = "expanded-stack";
    hero.appendChild(stackEl);

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeExpanded();
    });

    // Swallow wheel/touch scrolling while a cluster is open so the
    // page behind the cards stays put.
    function swallowIfOpen(e) {
      if (activeCluster) {
        e.preventDefault();
      }
    }
    document.addEventListener("wheel", swallowIfOpen, { passive: false });
    document.addEventListener("touchmove", swallowIfOpen, { passive: false });

    window.addEventListener("resize", function () {
      if (activeCluster && !resizeRefreshPending) {
        // Recompute spacing from scratch so the fan is correct at the new size.
        resizeRefreshPending = true;
        var cluster = activeCluster;
        closeExpanded();
        expandCluster(cluster);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();