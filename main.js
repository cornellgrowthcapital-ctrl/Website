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
