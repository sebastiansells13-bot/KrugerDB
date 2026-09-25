// KrugerDB marketing site — small progressive-enhancement behaviors.
// No framework, no build step: plain DOM APIs only.

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initFaqAccordion();
  initScrollReveal();
});

function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  const setOpen = (open) => {
    links.classList.toggle('nav-links-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };

  toggle.addEventListener('click', () => setOpen(!links.classList.contains('nav-links-open')));

  links.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => setOpen(false));
  });

  // Close on a tap outside the nav, on Escape, and when the viewport grows past the
  // mobile breakpoint (e.g. rotating an iPad to landscape) so it doesn't reappear later.
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav')) setOpen(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && links.classList.contains('nav-links-open')) {
      setOpen(false);
      toggle.focus();
    }
  });
  window.matchMedia('(max-width: 900px)').addEventListener('change', (mq) => {
    if (!mq.matches) setOpen(false);
  });
}

function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');

  // Size each open answer to its content so long answers on narrow screens aren't clipped
  // by the CSS max-height fallback.
  const setOpen = (item, open) => {
    item.classList.toggle('open', open);
    item.querySelector('.faq-q')?.setAttribute('aria-expanded', String(open));
    const answer = item.querySelector('.faq-a');
    if (answer) answer.style.maxHeight = open ? `${answer.scrollHeight}px` : '';
  };

  items.forEach((item) => {
    const btn = item.querySelector('.faq-q');
    if (!btn) return;
    setOpen(item, item.classList.contains('open'));
    btn.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.faq-item.open').forEach((other) => {
        if (other !== item) setOpen(other, false);
      });
      setOpen(item, !wasOpen);
    });
  });

  // Text reflows on rotation/resize, so re-measure whatever is open.
  window.addEventListener('resize', () => {
    document.querySelectorAll('.faq-item.open').forEach((item) => setOpen(item, true));
  });
}

function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('visible'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach((el) => io.observe(el));
}
