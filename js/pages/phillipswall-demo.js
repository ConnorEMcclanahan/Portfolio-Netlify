/**
 * Phillips Wall Demo - Vanilla JS Sentiment Index
 * Bubbles cluster together when close, expand on click
 */
(function () {
  "use strict";

  var DEMO_CLUSTERS = [
    { id:1, q:"What can AI do for you?", g:"linear-gradient(135deg,#008ce9 0%,#006db3 100%)", x:20, y:25,
      a:["AI can streamline my work by automating repetitive tasks.","It could help me make smarter financial decisions.","AI can provide personalized health tips based on my data.","It could assist me in learning new languages faster.","AI could help me organize my time more efficiently.","It can offer targeted suggestions for my professional growth."] },
    { id:2, q:"What daily chore would you like AI to take over?", g:"linear-gradient(135deg,#008ce9 0%,#006db3 100%)", x:18, y:60,
      a:["I would love AI to handle sorting and folding laundry.","It could plan and prepare my weekly grocery list.","AI can manage my home cleaning schedule automatically.","I'd like AI to handle organizing my inbox.","It could take care of daily meal prep and cooking.","AI could manage pet feeding and tracking routines."] },
    { id:3, q:"What AI solution would you like to design?", g:"linear-gradient(135deg,#8e00c5 0%,#6b009f 100%)", x:40, y:20,
      a:["An AI tutor that adapts lessons based on learning pace.","An AI that monitors environmental pollution levels.","A mental health companion that offers daily check-ins.","An AI that assists artists in creating new concepts.","A community safety AI that predicts areas needing help.","A budgeting assistant that offers real-time spending tips."] },
    { id:4, q:"What is your most remarkable experience with AI?", g:"linear-gradient(135deg,#008ce9 0%,#006db3 100%)", x:28, y:70,
      a:["When AI helped diagnose my skin condition from a photo.","Seeing GPT write poetry that moved me to tears.","My first conversation with a voice assistant.","Using AI to restore old family photos.","When a recommendation introduced me to my favorite band.","Watching an AI compose music in real-time."] },
    { id:5, q:"What makes you afraid of AI?", g:"linear-gradient(135deg,#c90035 0%,#9e002a 100%)", x:72, y:35,
      a:["Deepfakes making it impossible to trust what you see online.","Job displacement happening faster than society can retrain.","AI making life-or-death decisions without oversight.","The concentration of power in a few tech companies.","Loss of human connection as we delegate to machines.","AI systems that are impossible to understand or control."] },
    { id:6, q:"How should AI be regulated?", g:"linear-gradient(135deg,#0a7c53 0%,#075e3c 100%)", x:65, y:65,
      a:["Strong transparency requirements for AI use.","Independent auditing before deployment at scale.","Clear accountability chains for AI decisions.","International cooperation on AI safety standards.","Mandatory bias testing across diverse populations.","Companies must be held accountable for AI harm."] },
    { id:7, q:"What role should AI play in creative work?", g:"linear-gradient(135deg,#8e00c5 0%,#6b009f 100%)", x:50, y:15,
      a:["AI amplifies human creativity rather than replacing it.","I worry it will devalue years of artistic practice.","It's democratizing creativity for everyone.","The best results come from humans and AI together.","I'm concerned about AI content drowning out humans.","AI tools should be assistants, not replacements."] },
    { id:8, q:"How will people look back on today's AI developments a hundred years from now?", g:"linear-gradient(135deg,#0a7c53 0%,#075e3c 100%)", x:78, y:75,
      a:["They may see it as a pioneering era for technology.","It could be viewed as a time of ethical challenges.","People might laugh at how basic AI was back then.","It might be seen as the beginning of real human-AI collaboration.","Future generations may consider it a critical turning point.","They could view it as a time filled with optimism and fear."] },
    { id:9, q:"What problem do you hope AI might solve?", g:"linear-gradient(135deg,#0a7c53 0%,#075e3c 100%)", x:35, y:82,
      a:["Finding sustainable solutions for climate change.","Improving access to quality healthcare globally.","Helping reduce food waste and improve distribution.","Supporting mental health with accessible resources.","Solving global educational inequality.","Enhancing wildlife protection and biodiversity."] },
    { id:10, q:"What AI applications would you hate to do without?", g:"linear-gradient(135deg,#0a7c53 0%,#075e3c 100%)", x:55, y:80,
      a:["AI-powered virtual assistants like Siri or Alexa.","Recommendation algorithms for movies and music.","AI-powered health trackers for fitness goals.","Language translation apps like Google Translate.","AI for helping manage schedules and reminders.","Smart home devices like thermostats and lighting."] }
  ];

  var gridEl, overlayEl, stackEl;
  var activeCluster = null;
  var focusedCard = null;
  var hoveredCard = null;

  function createCluster(cluster) {
    var groupEl = document.createElement("div");
    groupEl.className = "cluster-group";
    groupEl.style.left = cluster.x + "%";
    groupEl.style.top = cluster.y + "%";
    groupEl.setAttribute("data-cluster-id", cluster.id);

    var bubbleCount = cluster.a.length;
    var bubbleSize = Math.min(80, 40 + bubbleCount * 8);
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
      expandCluster(cluster);
    });

    gridEl.appendChild(groupEl);
  }

  function expandCluster(cluster) {
    activeCluster = cluster;
    focusedCard = null;
    hoveredCard = null;

    overlayEl.classList.add("active");
    stackEl.classList.add("active");
    stackEl.innerHTML = "";

    var backBtn = document.createElement("button");
    backBtn.className = "demo-back-btn";
    backBtn.textContent = "? Back";
    backBtn.addEventListener("click", closeExpanded);
    stackEl.appendChild(backBtn);

    var questionCircle = document.createElement("div");
    questionCircle.className = "active-question";
    questionCircle.style.background = cluster.g;
    questionCircle.textContent = cluster.q;
    stackEl.appendChild(questionCircle);

    var cardStack = document.createElement("div");
    cardStack.className = "card-stack";

    var totalCards = cluster.a.length;
    var maxAngle = Math.min(35, totalCards * 2.5);
    var cardSpacing = maxAngle / totalCards;

    for (var i = 0; i < totalCards; i++) {
      (function(idx) {
        var angle = (idx - (totalCards - 1) / 2) * cardSpacing;
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

    stackEl.appendChild(cardStack);
    updateCards(cluster, totalCards, cardSpacing);
  }

  function updateCards(cluster, totalCards, cardSpacing) {
    var cards = stackEl.querySelectorAll(".answer-card");
    var fanSpread = 35;

    cards.forEach(function(card, idx) {
      var angle = (idx - (totalCards - 1) / 2) * cardSpacing;
      var isHovered = hoveredCard === idx;
      var isFocused = focusedCard === idx;

      var tx = isFocused ? 0 : angle * fanSpread;
      var ty = isFocused ? -150 : (isHovered ? -40 : 0);
      var rot = isFocused ? 0 : angle;
      var scale = isFocused ? 1.1 : 1;
      var zIndex = isFocused ? 100 : (isHovered ? 50 + idx : idx);
      var opacity = isFocused ? 1 : (isHovered ? 1 : 0.95);

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
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();