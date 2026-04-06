// ── rolar  ──
function scrollToSection(id) {
  var el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// ── menu celular ──
var hamburger = document.getElementById('hamburger');
var navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', function () {
    navLinks.classList.toggle('open');
  });
}

// ── fechar navegação ao clicar em link ──
document.querySelectorAll('.nav-links a').forEach(function (link) {
  link.addEventListener('click', function () {
    if (navLinks) navLinks.classList.remove('open');
  });
});

// ── barra do topo menor ao rolar ──
(function () {
  var nav = document.querySelector('nav');
  if (!nav) return;

  var lastScroll = 0;

  window.addEventListener('scroll', function () {
    var y = window.scrollY;

    if (y > 60) {
      nav.classList.add('nav-scrolled');
    } else {
      nav.classList.remove('nav-scrolled');
    }

    lastScroll = y;
  }, { passive: true });
})();

// ── foto de fundo se mover mais devagar que o resto──
var heroBg = document.getElementById('heroBg');
if (heroBg) {
  window.addEventListener('scroll', function () {
    var y = window.scrollY;
    heroBg.style.transform = 'translateY(' + (y * 0.28) + 'px) scale(1.02)';
  }, { passive: true });
}

// ── pequena animacao ──
var reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  var revealObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  reveals.forEach(function (el) { revealObs.observe(el); });
} else {
  reveals.forEach(function (el) { el.classList.add('visible'); });
}

// ── carrossel  ──
(function () {
  var track = document.getElementById('carouselTrack');
  var dotsWrap = document.getElementById('carouselDots');
  var prevBtn = document.querySelector('.carousel-btn.prev');
  var nextBtn = document.querySelector('.carousel-btn.next');

  if (!track) return;

  var originalSlides = Array.from(track.querySelectorAll('.carousel-slide'));
  var total = originalSlides.length;
  var current = total; // começa no primeiro slide real
  var isTransitioning = false;
  var autoTimer;
  var GAP = 16;

  // Clona slides no início e no fim para loop infinito
  originalSlides.forEach(function (slide) {
    track.appendChild(slide.cloneNode(true));
  });
  originalSlides.slice().reverse().forEach(function (slide) {
    track.insertBefore(slide.cloneNode(true), track.firstChild);
  });

  // criar bolinha carrossel
  for (var i = 0; i < total; i++) {
    var dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Slide ' + (i + 1));
    dot.dataset.idx = i;
    dot.addEventListener('click', function () {
      goTo(parseInt(this.dataset.idx) + total);
      resetAuto();
    });
    dotsWrap.appendChild(dot);
  }

  var dots = dotsWrap.querySelectorAll('.carousel-dot');

  function visibleCount() {
    var w = window.innerWidth;
    return (w <= 768) ? 1 : 3;
  }

  function slideWidth() {
    var vc = visibleCount();
    var outer = track.parentElement.clientWidth;
    return (outer - GAP * (vc - 1)) / vc;
  }

  function updateDots() {
    var realIndex = ((current - total) % total + total) % total;
    dots.forEach(function (d, i) {
      d.classList.toggle('active', i === realIndex);
    });
  }

  function goTo(idx, animate) {
    if (isTransitioning) return;
    if (animate !== false) isTransitioning = true;

    current = idx;
    var sw = slideWidth();
    track.style.transition = (animate === false)
      ? 'none'
      : 'transform 0.45s cubic-bezier(0.4,0,0.2,1)';
    track.style.transform = 'translateX(-' + (current * (sw + GAP)) + 'px)';
    updateDots();
  }

  // Após a transição, teleporta silenciosamente se estiver num clone
  track.addEventListener('transitionend', function () {
    isTransitioning = false;

    if (current < total) {
      goTo(current + total, false);
    } else if (current >= total * 2) {
      goTo(current - total, false);
    }
  });

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function startAuto() { autoTimer = setInterval(next, 4000); }
  function resetAuto() { clearInterval(autoTimer); startAuto(); }

  if (prevBtn) prevBtn.addEventListener('click', function () { prev(); resetAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', function () { next(); resetAuto(); });

  window.addEventListener('resize', function () { goTo(current, false); }, { passive: true });

  // Swipe
  var startX = 0;
  track.addEventListener('touchstart', function (e) {
    startX = e.touches[0].clientX;
  }, { passive: true });
  track.addEventListener('touchend', function (e) {
    var diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { diff > 0 ? next() : prev(); resetAuto(); }
  });

  // passar mause
  track.parentElement.addEventListener('mouseenter', function () { clearInterval(autoTimer); });
  track.parentElement.addEventListener('mouseleave', function () { startAuto(); });

  goTo(current, false);
  startAuto();
})();

// ──  inclinar card d ingrediente ──
(function () {
  if (window.innerWidth < 768) return;

  var cards = document.querySelectorAll('.card, .ing-card');

  cards.forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var centerX = rect.width / 2;
      var centerY = rect.height / 2;

      var rotateX = ((y - centerY) / centerY) * -6;
      var rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = 'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-8px)';
    });

    card.addEventListener('mouseleave', function () {
      card.style.transform = '';
    });
  });
})();

// ── partículas de cookie ──
(function () {
  var produtoWrap = document.querySelector('.produto-img-wrap');
  if (!produtoWrap || window.innerWidth < 768) return;

  produtoWrap.addEventListener('mouseenter', function () {
    for (var i = 0; i < 5; i++) {
      createCookieParticle(produtoWrap);
    }
  });

  function createCookieParticle(parent) {
    var particle = document.createElement('span');
    particle.textContent = '🍪';
    particle.style.cssText =
      'position:absolute;' +
      'font-size:' + (14 + Math.random() * 16) + 'px;' +
      'pointer-events:none;' +
      'z-index:10;' +
      'opacity:0.8;' +
      'left:' + (20 + Math.random() * 60) + '%;' +
      'top:' + (20 + Math.random() * 60) + '%;' +
      'transition:all 1.2s cubic-bezier(.25,.1,.25,1);';

    parent.appendChild(particle);

    requestAnimationFrame(function () {
      particle.style.transform =
        'translateY(-' + (60 + Math.random() * 80) + 'px) ' +
        'translateX(' + (-40 + Math.random() * 80) + 'px) ' +
        'rotate(' + (Math.random() * 360) + 'deg) scale(0.3)';
      particle.style.opacity = '0';
    });

    setTimeout(function () {
      if (particle.parentNode) particle.parentNode.removeChild(particle);
    }, 1300);
  }
})();

// ── link do menu acende conforme a secao──
(function () {
  var sections = document.querySelectorAll('section[id]');
  var navLinksAll = document.querySelectorAll('.nav-links a');

  if (!sections.length || !navLinksAll.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = entry.target.getAttribute('id');
        navLinksAll.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' });

  sections.forEach(function (section) {
    observer.observe(section);
  });
})();
