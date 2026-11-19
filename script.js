/* ===== CONFIG ===== */
const GROOM_WHATSAPP='919908598014';  // groom's WhatsApp number with country code, digits only e.g. '919XXXXXXXXX'
const STORY_VIDEO_ID='eMo3JXrWsC4';  // YouTube video ID of your story video (the part after v= in the link)
const STREAM_VIDEO_ID='YZH9Jt8rbOo';  // YouTube video ID of the wedding live stream
const SCROLL_SPEED=40;    // px per second
const WEDDING=new Date('2026-11-20T10:57:00+05:30');
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
let seed=11;const rnd=()=>(seed=seed*16807%2147483647)/2147483647;

/* ===== decorations (own artwork) ===== */
function toran(svg){let h='<path d="M0 6Q200 30 400 6" fill="none" stroke="#b8862b" stroke-width="2"/>';
 for(let i=0;i<=14;i++){const x=i*400/14,y=6+24*Math.sin(Math.PI*i/14);h+=`<path transform="translate(${x} ${y})" d="M0 0C9 12 9 34 0 52C-9 34-9 12 0 0Z" fill="${i%2?'#3f6b35':'#4f8a3c'}"/><circle cx="${x}" cy="${y+58}" r="4.5" fill="#ee8a22"/>`}svg.innerHTML=h}
function mandala(svg){let h='';for(let r=30;r<=95;r+=13)h+=`<circle r="${r}" fill="none" stroke="#b8862b" stroke-width=".8"/>`;
 for(let i=0;i<16;i++)h+=`<ellipse cx="0" cy="-62" rx="7" ry="22" fill="none" stroke="#b8862b" stroke-width=".9" transform="rotate(${i*22.5})"/>`;svg.innerHTML=h}
function gopuram(svg){let h='<rect x="0" y="146" width="400" height="4" fill="#b8862b"/>';
 for(let i=0;i<7;i++){const w=250-i*30,y=146-(i+1)*17;h+=`<rect x="${200-w/2}" y="${y}" width="${w}" height="15" fill="${i%2?'#a3162b':'#7a1020'}" stroke="#e2b457" stroke-width="1.5"/>`;
  for(let k=0;k<Math.floor(w/22);k++)h+=`<rect x="${200-w/2+8+k*22}" y="${y+4}" width="10" height="8" fill="#e2b457" opacity=".8"/>`}
 h+='<rect x="186" y="116" width="28" height="30" rx="14" fill="#2a0a10" stroke="#e2b457"/><path d="M200 20v-14" stroke="#e2b457" stroke-width="2"/>';
 for(const x of[170,200,230])h+=`<ellipse cx="${x}" cy="22" rx="4" ry="8" fill="#e2b457"/>`;svg.innerHTML=h}
function banana(){let v='';for(let i=1;i<=12;i++){const y=290-i*22;v+=`<path d="M60 ${y}Q38 ${y-14} 14 ${y-34}M60 ${y}Q82 ${y-14} 106 ${y-34}" stroke="#b6dc78" stroke-width="1.2" fill="none" opacity=".7"/>`}
 return `<svg viewBox="0 0 120 300"><defs><linearGradient id="lg" x1="0" x2="1"><stop offset="0" stop-color="#2d6a2a"/><stop offset=".5" stop-color="#5aa02f"/><stop offset="1" stop-color="#2a5f27"/></linearGradient></defs><path d="M60 300C8 230-6 100 60 0C126 100 112 230 60 300Z" fill="url(#lg)"/>${v}<path d="M60 300V8" stroke="#d6ec9a" stroke-width="2.5"/></svg>`}
$$('.toran').forEach(toran);$$('.mand').forEach(mandala);$$('.gop').forEach(gopuram);
$$('[data-leaves]').forEach((s,i)=>{s.insertAdjacentHTML('afterbegin',`<div class="bl l${i?' t':''}">${banana()}</div><div class="bl r${i?' t':''}">${banana()}</div>`)});

/* ===== guest name (?to=Name) ===== */
const to=new URLSearchParams(location.search).get('to');if(to)$('#dear').textContent='DEAR '+to.slice(0,40).toUpperCase();

/* ===== music ===== */
const music=$('#bgMusic'),mt=$('#musicToggle');let resumeMusic=false;
const setIcon=p=>{mt.classList.toggle('on',p);mt.setAttribute('aria-pressed',p)};
const startMusic=()=>{music.volume=.6;return music.play().then(()=>setIcon(true)).catch(()=>setIcon(false))};
mt.addEventListener('click',()=>music.paused?startMusic():(music.pause(),setIcon(false)));
document.addEventListener('visibilitychange',()=>{if(document.hidden&&!music.paused){music.pause();resumeMusic=true}else if(!document.hidden&&resumeMusic){resumeMusic=false;startMusic()}});

/* ===== open invitation ===== */
$('#openBtn').addEventListener('click',()=>{startMusic();navigator.vibrate&&navigator.vibrate([25,40,25]);
 $('#splash').classList.add('out');document.body.classList.remove('lock');scrollTo(0,0);
 setTimeout(()=>{$('#splash').style.display='none'},1200);
 window.confetti&&confetti({particleCount:80,spread:80,origin:{y:.7},colors:['#ee8a22','#f7b92a','#a3162b','#3f6b35']})});

/* ===== reveal ===== */
const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add('visible')),{threshold:.15});$$('.rv').forEach(e=>io.observe(e));

/* ===== auto-scroll: starts only from a scroll button; any manual input stops it ===== */
let auto=false,pos=0,last=0;
function startAuto(){if(auto)return;auto=true;pos=scrollY;last=0;requestAnimationFrame(tick)}
function stopAuto(){auto=false}
function tick(t){if(!auto)return;const dt=last?(t-last)/1000:0;last=t;
 if($('#rsvp').getBoundingClientRect().top<innerHeight*.4){auto=false;return}
 pos+=SCROLL_SPEED*Math.min(dt,.1);scrollTo(0,pos);requestAnimationFrame(tick)}
['touchstart','wheel','mousedown','keydown'].forEach(t=>addEventListener(t,e=>{if(!(e.target.closest&&e.target.closest('.sd')))stopAuto()},{passive:true}));
$$('.sd').forEach(b=>b.addEventListener('click',startAuto));

/* ===== countdown ===== */
function tickCd(){const d=Math.max(0,WEDDING-Date.now()),v=[Math.floor(d/864e5),Math.floor(d/36e5)%24,Math.floor(d/6e4)%60,Math.floor(d/1e3)%60];$$('#cd b').forEach((b,i)=>b.textContent=String(v[i]).padStart(2,'0'))}
tickCd();setInterval(tickCd,1000);

/* ===== RSVP -> WhatsApp message to the groom ===== */
const f=$('#rsvpForm'),m=$('#rsvpMsg'),say=(t,c)=>{m.textContent=t;m.className=c||''};
f.addEventListener('change',()=>{$('#gcWrap').style.display=f.attendance.value==='No'?'none':''});
f.addEventListener('submit',e=>{e.preventDefault();const d=Object.fromEntries(new FormData(f));if(d.website)return;
 const name=(d.name||'').trim(),note=(d.message||'').trim();
 if(!name)return say('Please enter your name.','err');if(!d.attendance)return say('Please tell us if you can attend.','err');
 const g=+d.guests,yes=d.attendance==='Yes';
 const t=(yes?`Hi Harinath, this is ${name}. I will attend your wedding on 20 Nov 2026 (${g} guest${g>1?'s':''}). `:`Hi Harinath, this is ${name}. Sorry, I won't be able to attend your wedding. `)+note;
 const link=`https://wa.me/${GROOM_WHATSAPP}?text=${encodeURIComponent(t.trim())}`;
 say(GROOM_WHATSAPP?'Opening WhatsApp - please press Send to confirm.':"Choose Harinath's chat in WhatsApp and press Send.",'ok');
 yes&&window.confetti&&confetti({particleCount:90,spread:70,origin:{y:.8},colors:['#ee8a22','#f7b92a','#a3162b','#3f6b35']});
 if(!window.open(link,'_blank'))location.href=link});

/* ===== story video (YouTube) ===== */
const sv=$('#vid');
if(STORY_VIDEO_ID){sv.innerHTML=`<img src="https://i.ytimg.com/vi/${STORY_VIDEO_ID}/hqdefault.jpg" alt="Our story video"><button type="button" aria-label="Play video"></button>`;
 sv.addEventListener('click',()=>{music.pause();setIcon(false);sv.innerHTML=`<iframe src="https://www.youtube-nocookie.com/embed/${STORY_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen title="Our story"></iframe>`},{once:true})}
else sv.innerHTML='<iframe class="" width="560" height="315" src="https://www.youtube.com/embed/eMo3JXrWsC4?si=V8axZR5FyylMH3FQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';
/* ===== stream  video (YouTube) ===== */
const st=$('#stream');
st.innerHTML=`<img src="https://i.ytimg.com/vi/${STREAM_VIDEO_ID}/hqdefault.jpg" alt="Wedding live stream"><button type="button" aria-label="Play live stream"></button>`;
st.addEventListener('click',()=>{music.pause();setIcon(false);st.innerHTML=`<iframe src="https://www.youtube-nocookie.com/embed/${STREAM_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen title="Wedding live stream"></iframe>`},{once:true});

/* ===== share ===== */
const url=location.href.split('?')[0],msg='You are invited to the wedding of Harinath & Rashmitha - Friday, 20 Nov 2026, Sri Jagathi Gardens, Hanamkonda. ';
$('#waShare').href='https://wa.me/?text='+encodeURIComponent(msg+url);
$('#calAdd').href='https://calendar.google.com/calendar/render?action=TEMPLATE&text='+encodeURIComponent('Wedding of Harinath & Rashmitha')+'&dates=20261120T052700Z/20261120T073000Z&location='+encodeURIComponent('Sri Jagathi Gardens, Bheemaram, Hanamkonda');
$('#copyLink').addEventListener('click',async e=>{try{await navigator.clipboard.writeText(url);e.target.textContent='COPIED'}catch(_){prompt('Copy this link',url)}});

/* ===== gallery: auto-detects assests/photos/gallery-1.jpg, gallery-2.jpg, ... (stops at first missing number); first 4 shown, rest in accordion ===== */
(async function gallery(){const SHOW=4,MAX=60,has=u=>new Promise(r=>{const i=new Image();i.onload=()=>r(true);i.onerror=()=>r(false);i.src=u});let l=[];
 for(let i=1;i<=MAX;i++){const u=`assests/photos/gallery-${i}.jpg`;if(await has(u))l.push(u);else break}
 const img=u=>`<img loading="lazy" src="${u}" alt="Wedding photo">`;
 $('#gal').innerHTML=l.slice(0,SHOW).map(img).join('');$('#galRest').innerHTML=l.slice(SHOW).map(img).join('');
 const t=$('#galToggle'),more=$('#galMore'),n=l.length-SHOW;if(n<=0)return;t.hidden=false;t.querySelector('span').textContent=`VIEW MORE PHOTOS (${n})`;
 t.addEventListener('click',()=>{const o=more.classList.toggle('open');t.setAttribute('aria-expanded',o);t.querySelector('span').textContent=o?'SHOW LESS':`VIEW MORE PHOTOS (${n})`;if(!o)$('#gal').scrollIntoView({behavior:'smooth',block:'center'})}) })();
