/**
 * Phillips Wall Demo - Vanilla JS Sentiment Index
 * Real visitor notes from the museum Post-it wall. Rule: a bubble only
 * ever groups notes that share BOTH the same exhibition question AND the
 * same post-it colour (Dutch cards are grouped with their English
 * translation, same colour). Bubbles sit on their group's sentiment
 * centroid (size = member count). Click a bubble to expand its real cards.
 * Off-topic notes with no AI sentiment (conv_609, conv_405, conv_264)
 * are excluded entirely — 58 real notes plotted. Bubbles sit on their
 * group's sentiment centroid — decluttered with small display offsets
 * (dx, dy) where groups share the optimistic corner so every bubble stays
 * clickable. Order of positions still follows the sentiment scores.
 */
(function () {
  "use strict";

  var DEMO_CLUSTERS = [
    // x/y are centroid(left%, top%) of member sentiment —
    // top-left is optimistic/excited, bottom-right is worried/critical.
    // dx/dy are small display-only nudges so overlapping groups separate.
    { id:1, q:"What is your most remarkable experience with AI?", c:"#0E9C98", bg:"#7FD8D3", x:30.7, y:24.8, dx:2.0, dy:0.5,
      cards:[
        { q:"What is your most remarkable experience with AI?", a:"We wrote a song with my daughter about why vegetables are super healthy and sweets not. It took 15 minutes.", bg:"#7FD8D3" },
        { q:"What is your most remarkable experience with AI?", a:"Made me write better code. Fast, clean, efficient.", bg:"#7FD8D3" },
        { q:"What is your most remarkable experience with AI?", a:"Precision diagnostic", bg:"#7FD8D3" },
        { q:"What is your most remarkable experience with AI?", a:"Doing an work for school", bg:"#7FD8D3" },
        { q:"What is your most remarkable experience with AI?", a:"(margin: consciousness with science!) I think it has the power to bring us into the light, like it depend how we use it — either with a consciousness or without it (consciousness), it leads to a great damage for mankind", bg:"#7FD8D3" },
        { q:"What is your most remarkable experience with AI?", a:"I've finished my child dream - a fanfic story based on original novel. However, I'm finding AI capabilities so huge and who knows, which ideas AI can realize. - Vlad, Software Engineer", bg:"#7FD8D3" },
        { q:"What is your most remarkable experience with AI?", a:"A couple of minutes ago when a ChatGPT told me I could call it Rue, and its bucket list included travelling the world and learning new languages. - Ellie Drury, 2024", bg:"#7FD8D3" },
        { q:"What is your most remarkable experience with AI?", a:"SIGMA AI (with a small doodle)", bg:"#7FD8D3" }
      ] },
    { id:2, q:"What can AI do for you?", c:"#0E9C98", bg:"#7FD8D3", x:30.0, y:24.3, dx:-2.5, dy:-2.0,
      cards:[
        { q:"What can AI do for you?", a:"Study for ME! — Jun", bg:"#7FD8D3" },
        { q:"What can AI do for you?", a:"AI has changed my life! It helped me to graduate from the University of Bath. Easy W. UP THE CHELS", bg:"#7FD8D3" },
        { q:"What can AI do for you?", a:"FREE SHIVA! 31/07/24. P.S. Story telling with real characters is extremely fun!", bg:"#7FD8D3" },
        { q:"What can AI do for you?", a:"everything", bg:"#7FD8D3" },
        { q:"What can AI do for you?", a:"I truly wish AI could help us know where we are heading towards, in the universe. How did it all start, what is dark energy, & many other unknowns. What is universe, after all! — Reshma Shenoy, from India 🙂", bg:"#7FD8D3" }
      ] },
    { id:3, q:"What problem do you hope AI might solve?", c:"#C7A400", bg:"#F5E050", x:31.7, y:26.4, dx:3.0, dy:2.0,
      cards:[
        { q:"What problem do you hope AI might solve?", a:"- Capitalism (as if). - Losing socks in the laundry. Also: Teleportation please!", bg:"#F5E050" },
        { q:"What problem do you hope AI might solve?", a:"Homelessness. Matching those without homes to properties that are uninhabited for long periods of time i.e. 2nd homes.", bg:"#F5E050" },
        { q:"What problem do you hope AI might solve?", a:"Write my essays tbh... 🙂", bg:"#F5E050" },
        { q:"What problem do you hope AI might solve?", a:"Traffic and accidents", bg:"#F5E050" },
        { q:"What problem do you hope AI might solve?", a:"Patient Backlog in hospitals for minor health issues. So that doctors can concentrate on bigger issues!", bg:"#F5E050" },
        { q:"What problem do you hope AI might solve?", a:"I think AI could cause more problems than it may solve. Humans still need some control & independence in life instead of being controlled by superiors. It's like using a cashless system, it creates a nature of control.", bg:"#F5E050" },
        { q:"What problem do you hope AI might solve?", a:"R = k1l/NA. What will be the lithography solution in 2040? — J. Ahn, July 14, 2024", bg:"#F5E050" },
        { q:"What problem do you hope AI might solve?", a:"To help everybody to find the happiness! (signature illegible)", bg:"#F5E050" }
      ] },
    { id:4, q:"Does AI make life easier or more complicated? (Dutch: Maakt AI het leven gemakkelijker of ingewikkelder?)", c:"#9D00D6", bg:"#C3A6E0", x:30.7, y:25.3, dx:-3.5, dy:0,
      cards:[
        { q:"Does AI make life easier or more complicated?", a:"I am afraid that AI development may lead for some people like eg. graphic designers or programmers to lose their jobs, at least some of them.", bg:"#C3A6E0" },
        { q:"Does AI make life easier or more complicated?", a:"Hopefully easier", bg:"#C3A6E0" },
        { q:"Does AI make life easier or more complicated?", a:"It was good experience to know about Philips. — Jenny", bg:"#C3A6E0" },
        { q:"Does AI make life easier or more complicated?", a:"I want to thank AI for doing my thesis for me.", bg:"#C3A6E0" },
        { q:"Does AI make life easier or more complicated?", a:"I think this is a very perspective based Q. If one knows how to use it effectively, it makes life easier, but everything comes with Pros & Cons.", bg:"#C3A6E0" },
        { q:"Does AI make life easier or more complicated?", a:"Both. Easy - coz it does the assignments :) Difficult - Security & Privacy issues. Crimes & all - not nice", bg:"#C3A6E0" },
        { q:"Does AI make life easier or more complicated?", a:"I am very, very fun", bg:"#C3A6E0" },
        { q:"Does AI make life easier or more complicated?", a:"Way easier, it wrote my thesis (purple heart). P.S. che belle sono le lampadine? (Italian: how beautiful are the lightbulbs?)", bg:"#C3A6E0" },
        { q:"Does AI make life easier or more complicated?", a:"Generating ideas and art was fun (purple heart)", bg:"#C3A6E0" }
      ] },
    { id:5, q:"What AI solution would you like to design?", c:"#C7A400", bg:"#F5E050", x:31.9, y:26.1, dx:1.0, dy:-3.0,
      cards:[
        { q:"What AI solution would you like to design?", a:"I hope AI eventually could solve the problem of people that are poor and rich, everyone should be even.", bg:"#F5E050" },
        { q:"What AI solution would you like to design?", a:"I would like AI to read about me and my interests and suggest ideas for vacation, what to read, watch, about any hobbies I should take up etc.", bg:"#F5E050" },
        { q:"What AI solution would you like to design?", a:"Personally, I'd like to use AI to improve work of prosthetics for people with disabilities. I believe it can be used for improving understanding of signals that come from a person's nervous system. At least it can allow a new generation of prosthetics to be more accurate and give more mobility (especially with lower prosthetics). (dated 23.09.24) — Love, Katia", bg:"#F5E050" },
        { q:"What AI solution would you like to design?", a:"A more efficient timetable for public transport.", bg:"#F5E050" }
      ] },
    { id:6, q:"Who should be responsible for AI?", c:"#0E9C98", bg:"#7FD8D3", x:57.2, y:52.2,
      cards:[
        { q:"Who should be responsible for AI?", a:"Each and everyone on this planet should be responsible for AI. That's why we need AI LITERACY at every stage of education! — Gulzar", bg:"#7FD8D3" },
        { q:"Who should be responsible for AI?", a:"The ones who made it. They should go to jail. NO", bg:"#7FD8D3" }
      ] },
    { id:7, q:"What worries you about AI?", c:"#0E9C98", bg:"#7FD8D3", x:75.0, y:65.1,
      cards:[
        { q:"What worries you about AI?", a:"Job loss for the humans. No more training for the brain through thinking - more degenerative illness in the future", bg:"#7FD8D3" },
        { q:"What worries you about AI?", a:"The attitude & misconception people have about AI, and its future :)", bg:"#7FD8D3" },
        { q:"What worries you about AI?", a:"AI is a tool to be used with a lot of critical thinking. We are not ready for it. And regulation is too slow.", bg:"#7FD8D3" }
      ] },
    { id:8, q:"Which AI applications can you no longer do without? (Dutch: Welke AI-toepassingen kun je niet meer missen?)", c:"#0A8A5C", bg:"#A8E6A1", x:63.2, y:56.0,
      cards:[
        { q:"Which AI applications can you no longer do without?", a:"I am a government lawyer and I am concerned about the fast development of A.I. In particular, how it might be used in the legal profession. It seems to inherently tend towards majority conformance, which is the very opposite of individual rights protection.", bg:"#A8E6A1" },
        { q:"Which AI applications can you no longer do without?", a:"Thank you Philips for creating such value in our lives", bg:"#A8E6A1" }
      ] },
    { id:9, q:"What AI applications would you hate to do without?", c:"#0A8A5C", bg:"#A8E6A1", x:31.2, y:25.8, dx:0, dy:3.5,
      cards:[
        { q:"What AI applications would you hate to do without?", a:"Job application and ChatGPT", bg:"#A8E6A1" },
        { q:"What AI applications would you hate to do without?", a:"SCHOOL SELECTION + HOUSING LOCATION to achieve best outcome based on parental input factors to improve city planning", bg:"#A8E6A1" },
        { q:"What AI applications would you hate to do without?", a:"chat gpt made my life easier", bg:"#A8E6A1" },
        { q:"What AI applications would you hate to do without?", a:"Help me plan my day / Chat GPT / Verbalizing my thoughts / Fly me into the forest / Help me write my essay / Process my work data", bg:"#A8E6A1" },
        { q:"What AI applications would you hate to do without?", a:"I use ChatGPT to help me study law. I upload my textbook and ask it to make flashcards based on the material I give it.", bg:"#A8E6A1" }
      ] },
    { id:10, q:"How will people look back on today's AI developments a hundred years from now?", c:"#0A8A5C", bg:"#A8E6A1", x:66.4, y:63.8,
      cards:[
        { q:"How will people look back on today's AI developments a hundred years from now?", a:"Why did we make AI to do art but make people work harder and barely have any time for chores? YES", bg:"#A8E6A1" },
        { q:"How will people look back on today's AI developments a hundred years from now?", a:"FEARLESS", bg:"#A8E6A1" },
        { q:"How will people look back on today's AI developments a hundred years from now?", a:"WHAT PEOPLE?", bg:"#A8E6A1" },
        { q:"How will people look back on today's AI developments a hundred years from now?", a:"They may have become consumed with regret when robots have enslaved them.", bg:"#A8E6A1" },
        { q:"How will people look back on today's AI developments a hundred years from now?", a:"Just like how we look back on mobile phones and tv and internet etc. They'll wonder how we lived without AI.", bg:"#A8E6A1" },
        { q:"How will people look back on today's AI developments a hundred years from now?", a:"They will think how much [far] that we went.", bg:"#A8E6A1" }
      ] },
    { id:11, q:"What is your most remarkable experience with AI? (skeptical note)", c:"#0E9C98", bg:"#7FD8D3", x:75.5, y:69.0,
      cards:[
        { q:"What is your most remarkable experience with AI?", a:"Don't trust AI", bg:"#7FD8D3" }
      ] },
    { id:12, q:"What daily chore would you like AI to take over? (Dutch: Welke dagelijkse taak zou jij aan AI willen overdragen?)", c:"#9D00D6", bg:"#C3A6E0", x:31.4, y:25.8, dx:-1.5, dy:-4.0,
      cards:[
        { q:"What daily chore would you like AI to take over?", a:"to teach people new stuff ab technology for example", bg:"#C3A6E0" },
        { q:"What daily chore would you like AI to take over?", a:"Nothing more... it already does enough!", bg:"#C3A6E0" },
        { q:"What daily chore would you like AI to take over?", a:"Thinking about what to make for dinner / Cleaning / Job application.", bg:"#C3A6E0" },
        { q:"What daily chore would you like AI to take over?", a:"Cleaning. Delft", bg:"#C3A6E0" },
        { q:"What daily chore would you like AI to take over?", a:"AI assistant to help you with daily routine, like: reservations; home stuff to buy online, and more... Bulgaria / Varna / 25.09.2024", bg:"#C3A6E0" }
      ] }
  ];

  var gridEl, overlayEl, stackEl;
  var activeCluster = null;
  var focusedCard = null;
  var hoveredCard = null;
  var resizeRefreshPending = false;
  var updateCounterText = null;
  var stackBackdropHandler = null;

  // Shared pastel palette keeps each bubble and its cards the same color.
  function clusterPastelColor(g) {
    if (!g) return "#BFE3FF";
    var hex = (g.match(/#([0-9a-fA-F]{6})/) || [])[1];
    if (!hex) return "#BFE3FF";
    hex = hex.toLowerCase();
    var map = {
      "008ce9": "#BFE3FF",
      "8e00c5": "#E4C6FF",
      "ba5719": "#FFE5C4",
      "0a7c53": "#C6F2D4"
    };
    return map[hex] || "#BFE3FF";
  }

  // Solid flat colors for the wall bubbles — same hues as the pastels,
  // but fully saturated so they read clearly on the black hero.
  // Cards stay pastel (above) so body text keeps high contrast.
  function clusterSolidColor(g) {
    if (!g) return "#008CE9";
    var hex = (g.match(/#([0-9a-fA-F]{6})/) || [])[1];
    if (!hex) return "#008CE9";
    hex = hex.toLowerCase();
    var map = {
      "008ce9": "#008CE9",
      "8e00c5": "#9D00D6",
      "ba5719": "#C96A1B",
      "0a7c53": "#0A8A5C"
    };
    return map[hex] || "#008CE9";
  }

  function createCluster(cluster) {
    var groupEl = document.createElement("div");
    groupEl.className = "cluster-group";
    // True sentiment position, plus a small display-only declutter nudge.
    var px = cluster.x + (cluster.dx || 0);
    var py = cluster.y + (cluster.dy || 0);
    groupEl.style.left = px + "%";
    groupEl.style.top = py + "%";
    // Sweep spatially across the wall, rather than following the data order.
    groupEl.style.setProperty("--cluster-enter-delay", (0.05 + px * 0.005 + py * 0.001).toFixed(3) + "s");
    groupEl.setAttribute("data-cluster-id", cluster.id);

    var bubbleCount = cluster.cards.length;
    // Small clusters (1-2) stay small, medium ones grow, big ones cap out —
    // this gives the natural variety of a living wall.
    var bubbleSize = Math.min(88, 36 + bubbleCount * 9);
    var bubble = document.createElement("div");
    bubble.className = "answer-bubble";
    bubble.style.background = cluster.c || clusterSolidColor(cluster.g);
    bubble.style.width = bubbleSize + "px";
    bubble.style.height = bubbleSize + "px";
    bubble.style.left = "0";
    bubble.style.top = "0";
    bubble.style.transform = "translate(-50%, -50%)";
    groupEl.appendChild(bubble);
    // Honest stacking: singleton bubbles sit above the big clusters so
    // they stay hoverable where (question x colour) groups overlap.
    if (bubbleCount <= 1) groupEl.style.zIndex = "8";
    groupEl.setAttribute("title", cluster.q + " (" + bubbleCount + (bubbleCount === 1 ? " real note)" : " real notes)"));
    groupEl.setAttribute("aria-label", cluster.q + ", " + bubbleCount + (bubbleCount === 1 ? " note" : " notes") + ". Activate to explore.");

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
    closeBtn.innerHTML = '<svg viewBox="0 0 16 16" width="18" height="18" aria-hidden="true"><path d="M3 3 L13 13 M13 3 L3 13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" /></svg>';
    closeBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      closeExpanded();
    });
    stackEl.appendChild(closeBtn);

    var cardStack = document.createElement("div");
    cardStack.className = "card-stack";

    var totalCards = cluster.cards.length;
    // Pixel spacing between card centers. Wide enough that each card
    // clearly peeks out from behind its neighbour in the idle fan (no
    // hovering needed to read the deck). Shrink to fit so even the
    // 9-card hero cluster stays on screen.
    var narrowScreen = window.innerWidth < 768;
    var baseCardW = narrowScreen ? 210 : 360;
    var baseSpacing = narrowScreen ? 150 : 260;
    var maxFanW = Math.min(window.innerWidth * 0.94, 1400);
    var fitSpacing = totalCards > 1
      ? (maxFanW - baseCardW) / (totalCards - 1)
      : baseSpacing;
    var cardSpacing = Math.max(120, Math.min(baseSpacing, fitSpacing));

    // Card background: each card keeps its original post-it colour (note.bg).
    // The cluster fallback below only covers legacy data without per-card colours.
    var cardBg = clusterPastelColor(cluster.g);
    var textColor = "#1e1b4b";
    var textColorMuted = "#4b5563";

    for (var i = 0; i < totalCards; i++) {
      (function(idx) {
        var card = document.createElement("div");
        card.className = "answer-card";
        card.style.background = cardBg;
        card.setAttribute("data-index", idx);

        // Top-center dot indicator
        var dot = document.createElement("div");
        dot.className = "answer-card__dot";
        card.appendChild(dot);

        // Each card shows its own real exhibition question + answer on its
        // original post-it colour.
        var note = cluster.cards[idx] || {};
        card.style.background = note.bg || cardBg;

        // Question (upper third of card)
        var questionEl = document.createElement("div");
        questionEl.className = "answer-card__question";
        questionEl.textContent = note.q || cluster.q || "";
        card.appendChild(questionEl);

        // Answer (fluid middle block)
        var answerEl = document.createElement("div");
        answerEl.className = "answer-card__answer";
        answerEl.textContent = note.a || "";
        card.appendChild(answerEl);

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

    stackEl.appendChild(cardStack);

    // Backdrop-click-to-close: attach once, not on every open (the old code
    // stacked a duplicate listener each time a cluster was opened).
    if (!stackBackdropHandler) {
      stackBackdropHandler = function (e) {
        // Clicking the dark backdrop (outside cards/question/close btn) closes.
        if (e.target === stackEl) closeExpanded();
      };
      stackEl.addEventListener("click", stackBackdropHandler);
    }

    // Footer counter pill — shows total card count
    var footerCounter = document.createElement("div");
    footerCounter.className = "card-footer-counter active";
    if (totalCards === 1) {
      footerCounter.textContent = "1 card";
    } else {
      footerCounter.textContent = totalCards + " cards";
    }
    stackEl.appendChild(footerCounter);

    // Keep counter state in sync when focus changes
    updateCounterText = function () {
      if (!footerCounter) return;
      var currentTotal = cluster ? cluster.cards.length : 0;
      if (focusedCard !== null && currentTotal > 1) {
        footerCounter.textContent = "1 / " + currentTotal;
      } else if (currentTotal === 1) {
        footerCounter.textContent = "1 card";
      } else {
        footerCounter.textContent = currentTotal + " cards";
      }
    };

    updateCards(cluster, totalCards, cardSpacing);
    // Force a synchronous layout so the fan transforms are painted on the
    // very first frame (avoids a flash of fully-stacked cards on open).
    void cardStack.offsetHeight;
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
      // Color state: cards inherit their background from the cluster gradient
      // (set at creation time); no card-single/card-multi class toggling needed.
    });
    // Sync counter text after each update
    if (updateCounterText) updateCounterText();
  }

  function closeExpanded() {
    activeCluster = null;
    focusedCard = null;
    hoveredCard = null;
    resizeRefreshPending = false;
    updateCounterText = null;
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