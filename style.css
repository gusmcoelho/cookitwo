// ── rolar  ──
function scrollToSection(id) {
  var el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// ── menu hamburger ──
var hamburger = document.getElementById('hamburger');
var navLinks  = document.getElementById('navLinks');

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

// ── navbar scroll – compactar e dar sombra ao rolar ──
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

// ── parallax herói ──
var heroBg = document.getElementById('heroBg');
if (heroBg) {
  window.addEventListener('scroll', function () {
    var y = window.scrollY;
    heroBg.style.transform = 'translateY(' + (y * 0.28) + 'px) scale(1.02)';
  }, { passive: true });
}

// ── scroll reveal com IntersectionObserver ──
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

// ── carrossel ──
(function () {
  var track    = document.getElementById('carouselTrack');
  var dotsWrap = document.getElementById('carouselDots');
  var prevBtn  = document.querySelector('.carousel-btn.prev');
  var nextBtn  = document.querySelector('.carousel-btn.next');

  if (!track) return;

  var slides   = track.querySelectorAll('.carousel-slide');
  var total    = slides.length;
  var current  = 0;
  var autoTimer;
  var GAP      = 16;

  // criar dots
  for (var i = 0; i < total; i++) {
    var dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Slide ' + (i + 1));
    dot.dataset.idx = i;
    dot.addEventListener('click', function () {
      goTo(parseInt(this.dataset.idx));
      resetAuto();
    });
    dotsWrap.appendChild(dot);
  }

  var dots = dotsWrap.querySelectorAll('.carousel-dot');

  function visibleCount() {
    var w = window.innerWidth;
    if (w <= 480) return 1;
    if (w <= 768) return 1;
    return 3;
  }

  function slideWidth() {
    var vc    = visibleCount();
    var outer = track.parentElement.clientWidth;
    return (outer - GAP * (vc - 1)) / vc;
  }

  function goTo(idx) {
    var vc  = visibleCount();
    var max = Math.max(total - vc, 0);
    if (idx > max) idx = 0;
    if (idx < 0) idx = max;
    current = idx;
    var sw  = slideWidth();
    track.style.transform = 'translateX(-' + (current * (sw + GAP)) + 'px)';
    dots.forEach(function (d, i) {
      d.classList.toggle('active', i === current);
    });
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function startAuto() { autoTimer = setInterval(next, 4000); }
  function resetAuto()  { clearInterval(autoTimer); startAuto(); }

  if (prevBtn) prevBtn.addEventListener('click', function () { prev(); resetAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', function () { next(); resetAuto(); });

  window.addEventListener('resize', function () { goTo(current); }, { passive: true });

  // suporte a touch/swipe
  var startX = 0;
  track.addEventListener('touchstart', function (e) {
    startX = e.touches[0].clientX;
  }, { passive: true });
  track.addEventListener('touchend', function (e) {
    var diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { diff > 0 ? next() : prev(); resetAuto(); }
  });

  startAuto();
  goTo(0);
})();

// ── 3D tilt nos cards (sobre, ingredientes) ──
(function () {
  if (window.innerWidth < 768) return; // desativar no mobile

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

// ── contador animado — "número" que sobe (futuro uso) ──

// ── efeito de partículas de cookie no hover do produto ──
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

// ── active nav link highlight on scroll ──
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
