const intro=document.querySelector('#intro');
const cover=document.querySelector('#cover');
const invitation=document.querySelector('#invitation');
const audio=document.querySelector('#nasheed');
const music=document.querySelector('#musicToggle');
let started=false;

audio.addEventListener('loadedmetadata',()=>{if(!started)audio.currentTime=27},{once:true});

function finishOpening(){
  invitation.classList.add('visible');
  invitation.setAttribute('aria-hidden','false');
  document.querySelector('.nikkah').classList.add('in-view');
  document.body.classList.remove('locked');
  intro.classList.add('done');
}

document.querySelector('#openInvitation').addEventListener('click',()=>{
  cover.classList.add('opening');
  startMusic();
  setTimeout(()=>{
    invitation.classList.add('visible');
    invitation.setAttribute('aria-hidden','false');
    document.querySelector('.nikkah').classList.add('in-view');
  },720);
  setTimeout(finishOpening,1500);
});

function startMusic(){
  if(!started){try{audio.currentTime=27}catch(e){}}
  audio.play().then(()=>{started=true;music.classList.add('show');music.textContent='♫'}).catch(()=>{});
}
music.addEventListener('click',event=>{
  event.stopPropagation();
  if(audio.paused){startMusic();music.setAttribute('aria-label','Pause background nasheed')}
  else{audio.pause();music.textContent='♪';music.setAttribute('aria-label','Play background nasheed')}
});

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('in-view')}),{threshold:.14});
document.querySelectorAll('.reveal').forEach(element=>observer.observe(element));

document.querySelector('#revealMayun').addEventListener('click',()=>document.querySelector('#surprise').classList.toggle('revealed'));

const target=new Date('2026-09-24T19:00:00+05:00').getTime();
function tick(){
  const left=Math.max(0,target-Date.now());
  const days=Math.floor(left/86400000),hours=Math.floor(left/3600000)%24,minutes=Math.floor(left/60000)%60;
  [['days',days],['hours',hours],['minutes',minutes]].forEach(([id,value])=>document.getElementById(id).textContent=String(value).padStart(2,'0'));
}
tick();
setInterval(tick,30000);
