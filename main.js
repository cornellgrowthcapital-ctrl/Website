// Mobile menu
const toggle = document.querySelector('.nav-toggle');
toggle.addEventListener('click', () => {
  const open = document.body.classList.toggle('nav-open');
  toggle.setAttribute('aria-expanded', open);
});
// Close the mobile menu after picking a link (About scrolls within the home page)
document.getElementById('nav-links').addEventListener('click', (e) => {
  if (e.target.closest('a')) {
    document.body.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', false);
  }
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

// People page: "Read More" opens the member's bio in a pop-up
const bio = document.getElementById('bio');
if (bio) {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.read-more');
    if (btn) {
      const card = btn.closest('li');
      const text = (sel) => card.querySelector(sel)?.textContent.trim() || '';
      const img = bio.querySelector('img');
      img.src = card.querySelector('img').src;
      img.alt = text('h3');
      bio.querySelector('h2').textContent = text('h3');
      bio.querySelector('.bio-role').textContent = text('.card-info > p');
      bio.querySelector('.bio-meta').textContent = text('.card-meta');
      bio.querySelector('.bio-text').textContent = text('.card-bio') || 'Bio coming soon.';
      bio.showModal();
    } else if (e.target === bio) {
      bio.close(); // click on the dark backdrop
    }
  });
}
