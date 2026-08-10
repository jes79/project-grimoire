document.querySelectorAll('[data-modal]').forEach(button => button.addEventListener('click', () => document.getElementById(button.dataset.modal).showModal()));
document.querySelectorAll('dialog').forEach(dialog => { dialog.querySelector('.close').addEventListener('click', () => dialog.close()); dialog.addEventListener('click', e => { if(e.target === dialog) dialog.close(); }); });
const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('is-visible'); }), {threshold:.12});
document.querySelectorAll('.section, .character-card, .city-showcase, .cover-band').forEach(el => observer.observe(el));
const video = document.getElementById('feature-video');
const number = document.getElementById('clip-number');
const title = document.getElementById('clip-title');
const description = document.getElementById('clip-description');
document.querySelectorAll('.clip').forEach((clip, index) => clip.addEventListener('click', () => {
  document.querySelectorAll('.clip').forEach(item => item.classList.remove('active'));
  clip.classList.add('active'); video.pause(); video.poster = clip.dataset.poster; video.src = clip.dataset.video; video.load(); video.play().catch(() => {});
  number.textContent = `${String(index + 1).padStart(2, '0')} / 05`; title.textContent = clip.dataset.title; description.textContent = clip.dataset.description;
}));
