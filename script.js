const revealEls=[...document.querySelectorAll('.reveal')];
revealEls.forEach((el,i)=>el.style.setProperty('--reveal-order',i));
const io=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
},{threshold:.12,rootMargin:'0px 0px -5% 0px'});
revealEls.forEach(el=>io.observe(el));

const nav=document.querySelector('.nav');
const menu=document.querySelector('.menu');
menu?.addEventListener('click',()=>{
  const open=nav.classList.toggle('open');
  menu.setAttribute('aria-expanded',String(open));
  menu.textContent=open?'Close':'Menu';
});
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>{
  nav.classList.remove('open');
  menu?.setAttribute('aria-expanded','false');
  if(menu) menu.textContent='Menu';
}));

const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduceMotion && window.matchMedia('(pointer:fine)').matches){
  document.querySelectorAll('.tiltCard').forEach(card=>{
    const strength=Number(card.dataset.tiltStrength||3);
    const reset=()=>{card.style.transform='perspective(1200px) rotateX(0deg) rotateY(0deg) translate3d(0,0,0)'};
    card.addEventListener('mousemove',e=>{
      const r=card.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5;
      const y=(e.clientY-r.top)/r.height-.5;
      card.style.transform=`perspective(1200px) rotateX(${(-y*strength).toFixed(2)}deg) rotateY(${(x*strength).toFixed(2)}deg) translate3d(0,-2px,0)`;
    });
    card.addEventListener('mouseleave',reset);
  });

  const glows=document.querySelectorAll('.heroGlow');
  window.addEventListener('pointermove',e=>{
    const x=(e.clientX/window.innerWidth-.5);
    const y=(e.clientY/window.innerHeight-.5);
    glows.forEach((glow,i)=>{
      const factor=i===0?18:-12;
      glow.style.marginLeft=`${x*factor}px`;
      glow.style.marginTop=`${y*factor}px`;
    });
  },{passive:true});
}

let lastY=window.scrollY;
window.addEventListener('scroll',()=>{
  const y=window.scrollY;
  nav.classList.toggle('scrolled',y>16);
  nav.classList.toggle('compact',y>lastY&&y>180);
  if(y<lastY-8) nav.classList.remove('compact');
  lastY=y;
},{passive:true});