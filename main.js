// Mobile menu
const toggle = document.querySelector('.nav-toggle');
toggle.addEventListener('click', () => {
  const open = document.body.classList.toggle('nav-open');
  toggle.setAttribute('aria-expanded', open);
});

// "What we do" slides: the section is pinned and scrolling advances the slides
for (const section of document.querySelectorAll('.slides')) {
  const slides = section.querySelectorAll('.slide');
  const nums = section.querySelectorAll('.slides-progress span');
  const bar = section.querySelector('.slides-progress b');
  const sticky = section.querySelector('.slides-sticky');
  const update = () => {
    const r = section.getBoundingClientRect();
    const top = parseFloat(getComputedStyle(sticky).top);
    const p = Math.min(Math.max((top - r.top) / (r.height - sticky.offsetHeight), 0), 1);
    const i = Math.min(slides.length - 1, Math.floor(p * slides.length));
    slides.forEach((el, k) => el.classList.toggle('is-active', k === i));
    nums.forEach((el, k) => el.classList.toggle('is-active', k === i));
    bar.style.width = p * 100 + '%';
  };
  addEventListener('scroll', update, { passive: true });
  addEventListener('resize', update);
  update();
}
