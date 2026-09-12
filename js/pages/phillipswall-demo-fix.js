/**
 * Phillips Wall Demo - Vanilla JS Sentiment Index
 * Replicates the interactive sentiment grid with clickable
 * clusters that expand into flip-able cards.
 * No React, no API calls - pure vanilla JS + fake data.
 */
(function () {
  'use strict';

  var DEMO_CLUSTERS = [
    { id:1, q:"What can AI do for you?", c:"#008ce9", g:"linear-gradient(135deg,#008ce9 0%,#006db3 100%)", x:0.22, y:0.3,
      a:["AI can streamline my work by automating repetitive tasks and freeing up creative time.","It could help me make smarter financial decisions based on data I wouldn't normally track.","AI can provide personalized health tips based on my daily habits and biometrics.","It could assist me in learning new languages faster through adaptive conversation practice.","AI could help me organize my time more efficiently by understanding my priorities.","It can offer targeted suggestions for my professional growth and skill development."] },
    { id:2, q:"What daily chore for AI?", c:"#008ce9", g:"linear-gradient(135deg,#008ce9 0%,#006db3 100%)", x:0.18, y:0.55,
      a:["I would love AI to handle sorting and folding laundry - it never ends!","It could plan and prepare my weekly grocery list based on what's running low.","AI can manage my home cleaning schedule automatically so nothing gets missed.","I'd like AI to handle organizing my inbox - thousands of unread emails stress me out.","It could take care of daily meal prep and cooking with what's in the fridge.","AI could manage pet feeding and tracking routines so I never forget."] },
    { id:7, q:"AI in creative work?", c:"#8e00c5", g:"linear-gradient(135deg,#8e00c5 0%,#6b009f 100%)", x:0.5, y:0.15,
      a:["AI is a collaborator that amplifies human creativity rather than replacing it.","I worry it will devalue the years of practice artists invest in their craft.","It's democratizing creativity - now anyone can bring their vision to life.","The best results come from humans and AI working together.","I'm concerned about AI content flooding platforms and drowning out humans."] },
    { id:8, q:"Look back on AI in 100 years?", c:"#0a7c53", g:"linear-gradient(135deg,#0a7c53 0%,#075e3c 100%)", x:0.78, y:0.7,
      a:["They may see it as a pioneering era - the dawn of a new age.","It could be viewed as a time of serious ethical challenges.","People might laugh at how basic today's AI actually was.","It might be seen as the beginning of human-AI collaboration.","They could view it as a time filled with optimism and fear."] },
    { id:9, q:"What problem should AI solve?", c:"#0a7c53", g:"linear-gradient(135deg,#0a7c53 0%,#075e3c 100%)", x:0.35, y:0.82,
      a:["Finding sustainable solutions for climate change through better modeling.","Improving access to quality healthcare globally.","Helping reduce food waste and improve distribution to end hunger.","Supporting mental health with accessible, always-available resources.","Solving global educational inequality through personalized tutoring."] },
    { id:10, q:"AI app you'd hate to lose?", c:"#008ce9", g:"linear-gradient(135deg,#008ce9 0%,#006db3 100%)", x:0.15, y:0.45,
      a:["AI-powered virtual assistants that actually understand context.","Recommendation algorithms for movies and music.","AI-powered health trackers that catch irregularities early.","Language translation apps - they've made the world feel smaller.","Navigation apps that learn routes and suggest better ones."] },
    { id:11, q:"Should AI have rights?", c:"#8e00c5", g:"linear-gradient(135deg,#8e00c5 0%,#6b009f 100%)", x:0.6, y:0.25,
      a:["If AI achieves consciousness, we'd have a moral obligation to consider welfare.","Rights come with responsibilities - AI can't be held accountable.","We should focus on human rights first before extending them to machines.","The capacity to suffer matters, not intelligence level.","Perhaps a tiered system - advanced AI gets protections, simple ones don't."] },
    { id:12, q:"Will AI make us more or less human?", c:"#ff6b35", g:"linear-gradient(135deg,#ff6b35 0%,#d4552b 100%)", x:0.82, y:0.5,
      a:["More human - by automating drudgery, we'll have time for what matters.","Less human - if we outsource thinking, creativity, and connection.","It depends entirely on how we choose to integrate AI into our lives.","AI will reveal what truly makes us unique by showing what it cannot replicate."] }
  ];

  var activeCluster = null, activeCardIndex = 0;
  var autoHoverTimer = null, autoHoverInterval = null;
  var isFlipping = false;
  var gridEl, overlayEl, stackEl;

  function init() {
    var hero = document.querySelector('.phillips-demo-hero');
    if (!hero) return;
    gridEl = hero.querySelector('.sentiment-grid');
    if (!gridEl) return;
    var axisLines = document.createElement('div');
    axisLines.className = 'axis-lines';
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
    for (var i = 0; i < DEMO_CLUSTERS.length; i++) createCluster(DEMO_CLUSTERS[i]);
    overlayEl = document.createElement('div');
    overlayEl.className = 'stack-overlay';
    overlayEl.addEventListener('click', closeExpanded);
    hero.appendChild(overlayEl);
    stackEl = document.createElement('div');
    stackEl.className = 'expanded-stack';
    hero.appendChild(stackEl);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeExpanded();
      if (e.key === 'ArrowLeft' && activeCluster) flipCard('prev');
      if (e.key === 'ArrowRight' && activeCluster) flipCard('next');
    });
    startAutoHoverTimer();
    document.addEventListener('mousemove', resetAutoHover);
    document.addEventListener('click', resetAutoHover);
    document.addEventListener('touchstart', resetAutoHover);

  function createCluster(cluster) {
    var el = document.createElement('div');
    el.className = 'note-cluster';
    el.setAttribute('data-cluster-id', cluster.id);
    el.style.left = (cluster.x * 100) + '%';
    el.style.top = (cluster.y * 100) + '%';
    var count = Math.min(cluster.a.length, 3 + Math.floor(Math.random() * 2));
    for (var i = 0; i < count; i++) {
      var card = document.createElement('div');
      card.className = 'note-card';
      card.style.background = cluster.g;
      card.style.zIndex = count - i;
      var text = document.createElement('span');
      text.className = 'note-card__text';
      text.textContent = cluster.a[i].length > 80 ? cluster.a[i].substring(0, 80) + '...' : cluster.a[i];
      card.appendChild(text);
      el.appendChild(card);
    }
    el.addEventListener('click', function (e) {
      e.stopPropagation();
      expandCluster(cluster);
    });
    gridEl.appendChild(el);
  }

  function expandCluster(cluster) {
    stopAutoHover();
    activeCluster = cluster;
    activeCardIndex = 0;
    var cel = gridEl.querySelector('[data-cluster-id="' + cluster.id + '"]');
    if (cel) cel.classList.add('expanded');
    overlayEl.classList.add('active');
    renderCard();
    stackEl.classList.add('active');
  }

  function renderCard(dir) {
    if (!activeCluster) return;
    var answer = activeCluster.a[activeCardIndex];
    var fs = '1rem';
    if (answer.length > 300) fs = '0.9rem';
    if (answer.length > 500) fs = '0.82rem';
    var h = '<div class="expanded-card" style="background:' + activeCluster.g + '">' +
      '<button class="expanded-card__close" aria-label="Close">&times;</button>' +
      '<span class="expanded-card__tag">' + activeCluster.q + '</span>' +
      '<div class="expanded-card__text" style="font-size:' + fs + '">' + answer + '</div>' +
      '<div class="expanded-card__nav">' +
      '<button class="nav-prev" aria-label="Prev">&#8249;</button>' +
      '<span class="expanded-card__counter">' + (activeCardIndex + 1) + ' / ' + activeCluster.a.length + '</span>' +
      '<button class="nav-next" aria-label="Next">&#8250;</button>' +
      '</div></div>';
    stackEl.innerHTML = h;
    var cel = stackEl.querySelector('.expanded-card');
    if (dir === 'next') cel.classList.add('flip-in-next');
    else if (dir === 'prev') cel.classList.add('flip-in-prev');
    stackEl.querySelector('.expanded-card__close').addEventListener('click', closeExpanded);
    stackEl.querySelector('.nav-prev').addEventListener('click', function (e) { e.stopPropagation(); flipCard('prev'); });
    stackEl.querySelector('.nav-next').addEventListener('click', function (e) { e.stopPropagation(); flipCard('next'); });
  }

  function flipCard(dir) {
    if (isFlipping || !activeCluster) return;
    isFlipping = true;
    var cel = stackEl.querySelector('.expanded-card');
    if (!cel) return;
    cel.classList.add(dir === 'next' ? 'flip-out-next' : 'flip-out-prev');
    setTimeout(function () {
      if (dir === 'next') activeCardIndex = (activeCardIndex + 1) % activeCluster.a.length;
      else activeCardIndex = (activeCardIndex - 1 + activeCluster.a.length) % activeCluster.a.length;
      renderCard(dir);
      isFlipping = false;
    }, 450);
  }

  function closeExpanded() {
    if (!activeCluster) return;
    var cel = gridEl.querySelector('[data-cluster-id="' + activeCluster.id + '"]');
    if (cel) cel.classList.remove('expanded');
    overlayEl.classList.remove('active');
    stackEl.classList.remove('active');
    setTimeout(function () { stackEl.innerHTML = ''; }, 500);
    activeCluster = null;
    activeCardIndex = 0;
    startAutoHoverTimer();
  }

  function startAutoHoverTimer() {
    stopAutoHover();
    autoHoverTimer = setTimeout(function () {
      if (DEMO_CLUSTERS.length > 0) {
        expandCluster(DEMO_CLUSTERS[0]);
        autoHoverInterval = setInterval(function () {
          if (activeCluster && !isFlipping) flipCard('next');
        }, 2500);
      }
    }, 8000);
  }

  function stopAutoHover() {
    if (autoHoverTimer) { clearTimeout(autoHoverTimer); autoHoverTimer = null; }
    if (autoHoverInterval) { clearInterval(autoHoverInterval); autoHoverInterval = null; }
  }

  function resetAutoHover() {
    if (!activeCluster) startAutoHoverTimer();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
