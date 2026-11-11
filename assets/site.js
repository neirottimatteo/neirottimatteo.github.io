/* ------------------------------------------------------------
   site.js — language toggle (EN/IT) + scroll reveal
   No dependencies, no build step.

   How the translation works:
   every translatable element carries a data-it="..." attribute.
   The English text lives in the HTML itself (so the page is
   readable with JavaScript disabled and for search engines).
   Switching to Italian swaps in data-it and stashes the English
   original in data-en. Use data-it-html="..." when the string
   contains inline markup such as <strong> or <a>.
   ------------------------------------------------------------ */
(function () {
  'use strict';

  var KEY = 'mn-lang';

  function store(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  function recall() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }

  function apply(lang) {
    var nodes = document.querySelectorAll('[data-it], [data-it-html]');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var html = el.hasAttribute('data-it-html');

      if (!el.hasAttribute('data-en')) {
        el.setAttribute('data-en', html ? el.innerHTML : el.textContent);
      }
      var val = lang === 'it'
        ? el.getAttribute(html ? 'data-it-html' : 'data-it')
        : el.getAttribute('data-en');

      if (val === null) continue;
      if (html) { el.innerHTML = val; } else { el.textContent = val; }
    }

    document.documentElement.setAttribute('lang', lang);

    var btns = document.querySelectorAll('.lang button');
    for (var j = 0; j < btns.length; j++) {
      btns[j].setAttribute('aria-pressed', String(btns[j].dataset.lang === lang));
    }
    store(lang);
  }

  /* project pages: always open at the top, not where the browser left the last page */
  try { if ('scrollRestoration' in history) history.scrollRestoration = 'manual'; } catch (e) {}
  if (!location.hash && document.querySelector('.back')) {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    window.addEventListener('load', function () { if (!location.hash) window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); });
  }

  function init() {
    var saved = recall();
    var lang = saved || ((navigator.language || 'en').toLowerCase().indexOf('it') === 0 ? 'it' : 'en');
    apply(lang);

    document.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('.lang button') : null;
      if (b) { apply(b.dataset.lang); }
    });

    /* extra reveal targets on project pages, with a small stagger inside groups */
    var auto = document.querySelectorAll(
      '.body > h2, .body > figure, .body > pre, .body > .next, .body > .cmp-wrap');
    for (var a = 0; a < auto.length; a++) auto[a].classList.add('rv');
    var groups = document.querySelectorAll('.metrics, .shots, .spec');
    for (var g = 0; g < groups.length; g++) {
      var kids = groups[g].children;
      for (var c = 0; c < kids.length; c++) {
        kids[c].classList.add('rv');
        kids[c].style.transitionDelay = Math.min(c, 6) * 70 + 'ms';
      }
    }

    /* thin progress line at the top of the page */
    var bar = document.createElement('div');
    bar.className = 'progress';
    document.body.appendChild(bar);
    var tick = false;
    function setBar() {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = 'scaleX(' + (h > 0 ? Math.min(window.scrollY / h, 1) : 0) + ')';
      tick = false;
    }
    window.addEventListener('scroll', function () {
      if (!tick) { tick = true; requestAnimationFrame(setBar); }
    }, { passive: true });
    setBar();

    /* scroll reveal */
    var rv = document.querySelectorAll('.rv');
    if (!('IntersectionObserver' in window) || !rv.length) {
      for (var i = 0; i < rv.length; i++) rv[i].classList.add('in');
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    for (var k = 0; k < rv.length; k++) io.observe(rv[k]);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();
