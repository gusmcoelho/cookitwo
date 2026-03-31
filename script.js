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

// ── fechar navegação ──
document.querySelectorAll('.nav-links a').forEach(function (link) {
  link.addEventListener('click', function () {
    if (navLinks) navLinks.classList.remove('open');
  });
});

// ── background herói ──
var heroBg = document.getElementById('heroBg');
if (heroBg) {
  window.addEventListener('scroll', function () {
    var y = window.scrollY;
    heroBg.style.transform = 'translateY(' + (y * 0.28) + 'px)';
  }, { passive: true });
}

// ──  rolar ──
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
  // fallback 
  reveals.forEach(function (el) { el.classList.add('visible'); });
}

// ── carrossel ––
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

  // dots
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
    var max = total - vc;
    current = Math.min(Math.max(idx, 0), max);
    var sw  = slideWidth();
    track.style.transform = 'translateX(-' + (current * (sw + GAP)) + 'px)';
    dots.forEach(function (d, i) {
      d.classList.toggle('active', i === current);
    });
  }

  function next() { goTo(current + 1 >= total ? 0 : current + 1); }
  function prev() { goTo(current - 1 < 0 ? total - 1 : current - 1); }

  function startAuto() { autoTimer = setInterval(next, 3200); }
  function resetAuto()  { clearInterval(autoTimer); startAuto(); }

  if (prevBtn) prevBtn.addEventListener('click', function () { prev(); resetAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', function () { next(); resetAuto(); });

  window.addEventListener('resize', function () { goTo(current); }, { passive: true });

  // rolar
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
