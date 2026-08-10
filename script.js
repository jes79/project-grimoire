document.querySelectorAll('[data-modal]').forEach(button => button.addEventListener('click', () => document.getElementById(button.dataset.modal).showModal()));
document.querySelectorAll('dialog').forEach(dialog => { dialog.querySelector('.close').addEventListener('click', () => dialog.close()); dialog.addEventListener('click', e => { if(e.target === dialog) dialog.close(); }); });
const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('is-visible'); }), {threshold:.12});
document.querySelectorAll('.section, .character-card, .colour-section').forEach(el => observer.observe(el));
