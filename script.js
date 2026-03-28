const topNav = document.getElementById('topNav');
const reveals = document.querySelectorAll('.reveal');
const heroBg = document.querySelector('.hero-bg');
const scrollProgress = document.querySelector('.scroll-progress');
const cursorDot = document.querySelector('.cursor-dot');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  topNav.classList.toggle('scrolled', y > 20);

  const zoomFactor = 1.1 + Math.min(y * 0.0002, 0.1);
  heroBg.style.transform = `scale(${zoomFactor})`;

  const total = document.documentElement.scrollHeight - window.innerHeight;
  const progress = total > 0 ? (y / total) * 100 : 0;
  scrollProgress.style.width = `${progress}%`;
});

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

reveals.forEach(el => revealObserver.observe(el));

window.addEventListener('mousemove', e => {
  if (!cursorDot) return;
  cursorDot.style.top = `${e.clientY}px`;
  cursorDot.style.left = `${e.clientX}px`;
});

mobileMenuBtn?.addEventListener('click', () => {
  topNav.classList.toggle('menu-open');
});

const parallaxSections = document.querySelectorAll('.parallax');
window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset;
  parallaxSections.forEach(section => {
    section.style.backgroundPositionY = `${scrollTop * 0.35}px`;
  });
});
