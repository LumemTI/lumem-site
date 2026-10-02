(function () {
  const body = document.body;
  const menu = document.querySelector('.menu-toggle');
  const mobile = document.querySelector('.mobile-nav');

  // Progressive enhancement: content is visible if JavaScript fails.
  body.classList.add('js-ready');

  menu?.addEventListener('click', () => {
    const open = mobile?.classList.toggle('open') ?? false;
    menu.setAttribute('aria-expanded', String(open));
    mobile?.setAttribute('aria-hidden', String(!open));
  });

  document.querySelectorAll('.mobile-nav a,.nav a').forEach(a =>
    a.addEventListener('click', () => {
      mobile?.classList.remove('open');
      menu?.setAttribute('aria-expanded', 'false');
      mobile?.setAttribute('aria-hidden', 'true');
    })
  );

  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -5% 0px' });
    items.forEach(el => observer.observe(el));
  } else {
    items.forEach(el => el.classList.add('visible'));
  }
})();
