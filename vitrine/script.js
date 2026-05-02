document.addEventListener('DOMContentLoaded', function () {
  const burger = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('mobile-menu');
  burger.addEventListener('click', function () {
    const expanded = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!expanded));
    mobileMenu.classList.toggle('open');
    mobileMenu.setAttribute('aria-hidden', String(expanded));
  });
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 20) header.classList.add('header-scrolled');
    else header.classList.remove('header-scrolled');
  });
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.section').forEach(section => observer.observe(section));
  const counters = document.querySelectorAll('.metric-number');
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    let current = 0;
    const isMultiplier = counter.textContent.includes('x');
    const update = () => {
      const speed = 80;
      const increment = Math.ceil(target / speed);
      current += increment;
      if (current >= target) {
        counter.textContent = isMultiplier ? target + 'x' : target + '%';
      } else {
        counter.textContent = isMultiplier ? current + 'x' : current + '%';
        requestAnimationFrame(update);
      }
    };
    update();
  });
  document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
    });
  });
});
