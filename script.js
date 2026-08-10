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

const shots = [...document.querySelectorAll('.model-shot')];
if (shots.length) {
  const slider = document.querySelector('.model-slider');
  const stage = document.createElement('div'); stage.className = 'model-stage';
  const image = document.createElement('img'); const copy = document.createElement('div');
  const title3d = document.createElement('b'); const caption = document.createElement('p');
  copy.append(title3d, caption); stage.append(image, copy);
  const thumbs = document.createElement('div'); thumbs.className = 'model-thumbs';
  slider.replaceChildren(stage, thumbs);
  let current = 0, timer;
  const show = i => { current = (i + shots.length) % shots.length; const shot = shots[current]; image.src = shot.querySelector('img').src; image.alt = shot.querySelector('img').alt; title3d.textContent = shot.querySelector('b').textContent; caption.textContent = shot.querySelector('small').textContent; [...thumbs.children].forEach((t,n)=>t.classList.toggle('active',n===current)); };
  shots.forEach((shot,i) => { shot.classList.remove('active'); shot.addEventListener('click', () => { show(i); reset(); }); thumbs.append(shot); });
  const reset = () => { clearInterval(timer); timer = setInterval(() => show(current + 1), 4500); }; show(0); reset();
}
