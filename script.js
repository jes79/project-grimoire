const video = document.querySelector('#main-video');
const videoTitle = document.querySelector('#video-title');
document.querySelectorAll('[data-video]').forEach(tab => tab.addEventListener('click', () => {
  document.querySelectorAll('[data-video]').forEach(item => item.classList.remove('active'));
  tab.classList.add('active'); video.pause(); video.src = tab.dataset.video; video.load(); videoTitle.textContent = tab.dataset.title;
}));
document.querySelectorAll('.showcase').forEach(gallery => {
  const image = gallery.querySelector('.stage img'); const caption = gallery.querySelector('figcaption'); const buttons = [...gallery.querySelectorAll('[data-src]')]; let current = 0;
  const select = index => { current = index; const button = buttons[index]; image.src = button.dataset.src; image.alt = button.querySelector('img').alt; caption.textContent = button.dataset.caption; buttons.forEach(b => b.classList.remove('selected')); button.classList.add('selected'); };
  buttons.forEach((button, index) => button.addEventListener('click', () => select(index)));
  setInterval(() => select((current + 1) % buttons.length), 5000);
});
const pages=[...document.querySelectorAll('.plan-page')], count=document.querySelector('.plan-count'); let page=0;
const showPage=next=>{page=(next+pages.length)%pages.length;pages.forEach((item,i)=>item.classList.toggle('active',i===page));count.textContent=`${String(page+1).padStart(2,'0')} / ${String(pages.length).padStart(2,'0')}`};
document.querySelector('.plan-arrow.prev')?.addEventListener('click',()=>showPage(page-1));
document.querySelector('.plan-arrow.next')?.addEventListener('click',()=>showPage(page+1));
