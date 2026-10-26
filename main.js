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

// Home page: glide to sections and show /about or / in the address bar instead of #about / #top
const cleanPath = { '#top': './', '#about': 'about' };
const glide = matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"]');
  const hash = link && link.getAttribute('href');
  if (!(hash in cleanPath)) return;
  e.preventDefault();
  if (hash === '#top') scrollTo({ top: 0, behavior: glide });
  else document.querySelector(hash).scrollIntoView({ behavior: glide });
  history.replaceState(null, '', cleanPath[hash]);
});
// Arriving from another page (or from /about) lands on /#about; tidy the address
if (location.hash === '#about') history.replaceState(null, '', 'about');
