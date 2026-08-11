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

// Game systems — intentionally interactive, but kept as a compact exhibition rather than a game clone.
const systemTabs = [...document.querySelectorAll('[data-system]')];
const systemDemos = [...document.querySelectorAll('[data-demo]')];
systemTabs.forEach(tab => tab.addEventListener('click', () => {
  systemTabs.forEach(item => item.classList.toggle('active', item === tab));
  systemDemos.forEach(demo => demo.classList.toggle('active', demo.dataset.demo === tab.dataset.system));
}));
const playerState = document.querySelector('#player-state');
const staminaValue = document.querySelector('#stamina-value');
const staminaFill = document.querySelector('.stamina-fill');
const feedback = document.querySelector('#action-feedback');
const playerSim = document.querySelector('.player-sim');
const actionInfo = { MOVE:['MOVE','이동 벡터 적용 · 애니메이션 블렌드 트리 전환',96], JUMP:['JUMP','지면 판정 통과 · 수직 속도와 낙하 상태 갱신',84], DASH:['DASH','스태미나 소모 · 잔상 VFX · 무적 프레임 적용',62], PARRY:['PARRY','패링 윈도우 활성 · 성공 시 적 상태를 경직으로 전환',48] };
document.querySelectorAll('[data-action]').forEach(button => button.addEventListener('click', () => {
  const [state, text, stamina] = actionInfo[button.dataset.action]; playerState.textContent = state; staminaValue.textContent = stamina; staminaFill.style.width = `${stamina}%`; feedback.textContent = text; playerSim.classList.remove('pulse'); void playerSim.offsetWidth; playerSim.classList.add('pulse');
}));
let selectedSkill = 'ARC SHOT', enemyHp = 100, combo = 0;
document.querySelectorAll('[data-skill]').forEach(button => button.addEventListener('click', () => { selectedSkill = button.dataset.skill; document.querySelectorAll('[data-skill]').forEach(item => item.classList.toggle('selected', item === button)); }));
document.querySelector('#execute-skill')?.addEventListener('click', () => { const damage = selectedSkill === 'PULSE FIELD' ? 34 : selectedSkill === 'MOON SLASH' ? 27 : 19; enemyHp = Math.max(0, enemyHp - damage); combo++; document.querySelector('#enemy-fill').style.width = `${enemyHp}%`; document.querySelector('#enemy-value').textContent = enemyHp; document.querySelector('#combo-value').textContent = String(combo).padStart(2,'0'); const combat = document.querySelector('.combat-sim'); combat.classList.remove('hit'); void combat.offsetWidth; combat.classList.add('hit'); if(enemyHp === 0){ const toast=document.querySelector('#reward-toast'); toast.classList.add('show'); setTimeout(()=>{enemyHp=100; combo=0; document.querySelector('#enemy-fill').style.width='100%';document.querySelector('#enemy-value').textContent='100';document.querySelector('#combo-value').textContent='00';toast.classList.remove('show');},1500); }});
const bossStates = { CHASE:['CHASE / APPROACH','chase'], SWEEP:['SWEEP / WIDE ARC','sweep'], BURST:['BURST / AREA STRIKE','burst'], GROGGY:['GROGGY / DAMAGE WINDOW','groggy'] };
document.querySelectorAll('[data-boss]').forEach(button => button.addEventListener('click', () => { const [label,state]=bossStates[button.dataset.boss]; document.querySelector('#boss-state').textContent=label; const arena=document.querySelector('.boss-arena'); arena.className=`boss-arena ${state}`; }));
document.querySelector('#trigger-event')?.addEventListener('click', () => { const log=document.querySelector('#event-log'); const exp=document.querySelector('#exp-fill'); const status=document.querySelector('#hud-status'); exp.style.width='100%'; status.textContent='LEVEL UP!'; log.innerHTML='<p><b>00.000</b> EVENT: PLAYER_LEVEL_UP</p><p><b>00.016</b> HUD UPDATE · EXP RESET</p><p><b>00.032</b> VFX PLAY · SOUND CUE</p><p><b>00.048</b> OVERLAY OPEN</p>'; log.classList.add('updated'); setTimeout(()=>{exp.style.width='72%';status.textContent='EXP 72%';},1500); });
