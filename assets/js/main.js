/* ==========================================================================
   Mid Michigan Plumbing Services — Site Interactions
   Vanilla JS. Progressive enhancement: content works without it.
   ========================================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Mobile navigation ---------- */
  var hamburger = document.querySelector('.hamburger');
  var navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* ---------- Header shadow on scroll ---------- */
  var header = document.querySelector('.header');
  function onScroll() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 12);
    parallax();
  }

  /* ---------- Hero parallax ---------- */
  var heroBg = document.querySelector('.hero__bg');
  function parallax() {
    if (!heroBg || reduceMotion) return;
    var y = Math.min(window.scrollY, 700);
    heroBg.style.transform = 'translate3d(0,' + (y * 0.22) + 'px,0) scale(1.08)';
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Animated counters ---------- */
  var counters = document.querySelectorAll('[data-count]');
  function animateCounter(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var decimals = (el.getAttribute('data-decimals') | 0);
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1500, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = (target * eased).toFixed(decimals);
      el.textContent = val + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target.toFixed(decimals) + suffix;
    }
    requestAnimationFrame(step);
  }
  if (counters.length && 'IntersectionObserver' in window && !reduceMotion) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { animateCounter(entry.target); co.unobserve(entry.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { co.observe(el); });
  } else {
    counters.forEach(function (el) {
      var s = el.getAttribute('data-suffix') || '';
      el.textContent = parseFloat(el.getAttribute('data-count')).toFixed(el.getAttribute('data-decimals') | 0) + s;
    });
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    if (!q || !a) return;
    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (o) {
        o.classList.remove('open');
        o.querySelector('.faq-a').style.maxHeight = null;
        o.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
        q.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------- Contact / booking form ---------- */
  var form = document.querySelector('form[data-lead-form]');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = form.querySelector('.form-msg');
      var name = (form.querySelector('#name') || {}).value || '';
      var phone = (form.querySelector('#phone') || {}).value || '';
      var email = (form.querySelector('#email') || {}).value || '';
      var service = (form.querySelector('#service') || {}).value || '';
      var message = (form.querySelector('#message') || {}).value || '';

      // Build a mailto fallback so the enquiry actually reaches the business inbox.
      var body = 'Name: ' + name + '\nPhone: ' + phone + '\nEmail: ' + email +
                 '\nService: ' + service + '\n\n' + message;
      var mailto = 'mailto:midmichplumbingservices@gmail.com' +
                   '?subject=' + encodeURIComponent('Website service request — ' + name) +
                   '&body=' + encodeURIComponent(body);

      if (msg) {
        msg.classList.add('show');
        msg.innerHTML = '<strong>Thank you, ' + (name || 'there') + '.</strong> Your request has been prepared. ' +
          'If your email app does not open automatically, please call us at <a href="tel:+19895063966">(989) 506-3966</a>. ' +
          '<a href="' + mailto + '">Send the email now</a>.';
      }
      window.location.href = mailto;
      form.reset();
    });
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  onScroll();
})();
