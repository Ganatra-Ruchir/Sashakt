document.querySelectorAll('nav details').forEach(d=>d.addEventListener('toggle',()=>{if(d.open)document.querySelectorAll('nav details').forEach(o=>{if(o!==d)o.open=false})}));document.addEventListener('click',e=>{if(!e.target.closest('nav'))document.querySelectorAll('nav details').forEach(d=>d.open=false)});document.addEventListener('keydown',e=>{if(e.key==='Escape')document.querySelectorAll('nav details').forEach(d=>d.open=false)});const q=document.querySelector('#search');if(q)q.addEventListener('input',()=>{let n=0;document.querySelectorAll('#directory .card').forEach(c=>{const ok=c.textContent.toLowerCase().includes(q.value.toLowerCase().trim());c.classList.toggle('hidden',!ok);if(ok)n++});document.querySelector('#empty').hidden=n>0});
;(()=>{const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;const bar=document.createElement('div');bar.className='scroll-progress';bar.setAttribute('aria-hidden','true');document.body.append(bar);const update=()=>{const max=document.documentElement.scrollHeight-innerHeight;bar.style.width=(max>0?Math.min(100,scrollY/max*100):0)+'%'};addEventListener('scroll',update,{passive:true});addEventListener('resize',update);update();document.querySelectorAll('.photo-tile img,.film-cover img').forEach(img=>{const fail=()=>{img.hidden=true;img.parentElement.classList.add('media-error')};img.addEventListener('error',fail);if(img.complete&&!img.naturalWidth)fail()});if(reduced||!('IntersectionObserver'in window))return;const items=[...document.querySelectorAll('main .section h2,main .section .lead,main .section .stats,main .section .cards:not(#directory) > .card,main .section .media-grid > a,main .section .point')];const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(!entry.isIntersecting)continue;entry.target.classList.add('is-visible');observer.unobserve(entry.target);if(entry.target.classList.contains('stats'))entry.target.querySelectorAll('.stat b').forEach(el=>{const final=el.textContent.trim();if(!/^\d[\d,]*$/.test(final))return;const n=Number(final.replaceAll(',',''));const start=performance.now();const frame=t=>{const p=Math.min(1,(t-start)/800);el.textContent=p===1?final:Math.round(n*(1-Math.pow(1-p,3))).toLocaleString('en-IN');if(p<1)requestAnimationFrame(frame)};requestAnimationFrame(frame)})}},{threshold:.08});items.forEach((el,i)=>{el.dataset.reveal='';el.style.setProperty('--delay',((i%3)*65)+'ms');observer.observe(el)});document.documentElement.classList.add('reveal-ready');setTimeout(()=>{document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach(el=>{if(el.getBoundingClientRect().top<innerHeight)el.classList.add('is-visible')})},1500)})();

;document.querySelectorAll('.impact-backdrop img').forEach(img=>{const fallback=()=>{if(img.dataset.tried){img.classList.add('media-missing');return}img.dataset.tried='1';img.src='https://i.ytimg.com/vi/SySHWAF8aMc/hqdefault.jpg'};img.addEventListener('error',fallback);if(img.complete&&!img.naturalWidth)fallback()});document.querySelectorAll('.nav .brand').forEach(a=>a.setAttribute('aria-label','Project Sashakt home'));
;(()=>{const nav=document.querySelector('header nav');if(nav&&!nav.querySelector('.nav-home')){const home=document.createElement('a');home.className='nav-home';home.href='index.html';home.textContent='Home';if(document.body.classList.contains('home-page')||/(?:\/|index\.html)$/.test(location.pathname))home.setAttribute('aria-current','page');nav.prepend(home)}const programmes=[...document.querySelectorAll('nav details')].find(x=>x.querySelector('summary')?.textContent.trim()==='Programmes');if(programmes){const menu=programmes.querySelector('.menu');if(menu&&!menu.querySelector('a[href="explore.html"]')){const link=document.createElement('a');link.href='explore.html';link.textContent='All programmes →';menu.prepend(link)}}})();
;(()=>{const host=document.querySelector('#hero-video'),toggle=document.querySelector('#hero-toggle'),mute=document.querySelector('#hero-mute'),status=document.querySelector('#hero-status');if(!host||!toggle)return;const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;let player=null,ready=false,playing=false,requested=!reduced,muted=true,failed=false;const setToggle=()=>{toggle.innerHTML=playing?'Ⅱ <span>Pause video</span>':'▶ <span>Play video</span>';toggle.setAttribute('aria-label',playing?'Pause background video':'Play background video')};const setMute=()=>{mute.innerHTML=muted?'♪ <span>Unmute</span>':'♪ <span>Mute</span>';mute.setAttribute('aria-label',muted?'Unmute background video':'Mute background video')};const fail=()=>{failed=true;ready=false;playing=false;host.classList.remove('playing');mute.hidden=true;setToggle();status.textContent='Embedded playback unavailable. Use Watch full film to open YouTube.'};const init=()=>{if(player||failed||!window.YT?.Player)return;player=new YT.Player('sashakt-player',{videoId:'SySHWAF8aMc',host:'https://www.youtube-nocookie.com',playerVars:{autoplay:requested?1:0,playsinline:1,mute:1,loop:1,playlist:'SySHWAF8aMc',controls:0,rel:0,enablejsapi:1,origin:location.origin},events:{onReady:e=>{ready=true;e.target.mute();mute.hidden=false;setMute();if(requested)e.target.playVideo()},onStateChange:e=>{playing=e.data===YT.PlayerState.PLAYING;if(playing){host.classList.add('playing');status.textContent='Background video playing'}else if(e.data===YT.PlayerState.ENDED&&requested){e.target.seekTo(0);e.target.playVideo()}setToggle()},onError:fail,onAutoplayBlocked:()=>{playing=false;setToggle();status.textContent='Autoplay blocked. Press Play video.'}}})};let loaded=false;const load=()=>{if(loaded)return;loaded=true;if(window.YT?.Player){init();return}window.onYouTubeIframeAPIReady=init;const s=document.createElement('script');s.src='https://www.youtube.com/iframe_api';s.async=true;s.onerror=fail;document.head.append(s)};toggle.addEventListener('click',()=>{if(failed){window.open('https://www.youtube.com/watch?v=SySHWAF8aMc','_blank','noopener');return}if(!ready){requested=true;load();status.textContent='Loading video';return}if(playing){requested=false;player.pauseVideo()}else{requested=true;player.playVideo()}});mute.addEventListener('click',()=>{if(!ready)return;muted=!muted;if(muted)player.mute();else player.unMute();setMute()});document.addEventListener('visibilitychange',()=>{if(ready&&document.hidden&&playing){player.pauseVideo();requested=false}});if(!reduced)load();setToggle()})();

;(()=>{const film={kind:'Video',title:'Sashakt Stories',sub:'Project overview · HomeFirst film',src:'https://i.ytimg.com/vi/SySHWAF8aMc/hqdefault.jpg',href:'https://www.youtube.com/watch?v=SySHWAF8aMc',video:'SySHWAF8aMc'};const photo=(id,title,sub)=>({kind:'Photo',title,sub,src:'https://drive.google.com/thumbnail?id='+id+'&sz=w1000',href:'https://drive.google.com/file/d/'+id+'/view'});const launch=photo('1YL5ddGc6ZF-ZLB1ld0L0jK-JdTHRNbpQ','Community launch','Project Sashakt · event archive');const launch2=photo('1CFN_qEmfq3_ViLUCI6CW08tzPhn8rzL5','Community gathering','Project Sashakt · launch archive');const bal=photo('1bYVvUNkj9IOK9oYOCG4pljbucL-zX_5K','Bal Sashakt showcase','Project Sashakt · event archive');const base=location.pathname.split('/').pop().replace(/\.html$/,'')||'index';const education=['education','bal-sashakt','school-development','science-city','science-labs'];const community=['about','vision','approach','journey','narol','naroda','lambha','activities','partners','get-involved','contact','impact','reports','explore'];const selected=education.includes(base)?bal:community.includes(base)?launch:film;
const dialog=document.createElement('dialog');dialog.className='media-modal';dialog.setAttribute('aria-labelledby','media-modal-title');dialog.innerHTML='<div class="media-modal-head"><h2 id="media-modal-title"></h2><button type="button" aria-label="Close preview">Close ×</button></div><div class="media-modal-body"></div><a target="_blank" rel="noopener">Open original ↗</a>';document.body.append(dialog);const close=()=>dialog.close();dialog.querySelector('button').addEventListener('click',close);dialog.addEventListener('click',e=>{if(e.target===dialog)close()});dialog.addEventListener('close',()=>{dialog.querySelector('.media-modal-body').replaceChildren()});
function openMedia(m){if(typeof dialog.showModal!=='function'){window.open(m.href,'_blank','noopener');return}dialog.querySelector('h2').textContent=m.title;const b=dialog.querySelector('.media-modal-body');b.replaceChildren();if(m.video){const f=document.createElement('iframe');f.src='https://www.youtube-nocookie.com/embed/'+m.video+'?autoplay=1&rel=0&playsinline=1';f.title=m.title;f.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';f.allowFullscreen=true;b.append(f)}else{const i=document.createElement('img');i.src=m.src;i.alt=m.title;i.onerror=()=>{i.remove();const p=document.createElement('p');p.textContent='Image preview unavailable. Open the original archive using the link below.';b.append(p)};b.append(i)}dialog.querySelector('a').href=m.href;dialog.showModal()}
function card(m){const a=document.createElement('a');a.className='page-media';a.href=m.href;a.target='_blank';a.rel='noopener';const preview=document.createElement('div');preview.className='media-preview';const img=document.createElement('img');img.src=m.src;img.alt=m.title;img.loading='lazy';img.decoding='async';const fail=()=>{img.hidden=true;preview.classList.add('media-unavailable')};img.addEventListener('error',fail);if(img.complete&&!img.naturalWidth)fail();const kind=document.createElement('span');kind.className='media-kind';kind.textContent=m.kind;const play=document.createElement('span');play.className='media-play';play.setAttribute('aria-hidden','true');play.textContent=m.video?'▶':'↗';preview.append(img,kind,play);const info=document.createElement('div');info.className='media-info';const title=document.createElement('strong');title.textContent=m.title;const sub=document.createElement('small');sub.textContent=m.sub;const l=document.createElement('span');l.className='media-link';l.textContent=m.video?'Play video →':'View photo →';info.append(title,sub,l);a.append(preview,info);a.addEventListener('click',e=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;e.preventDefault();openMedia(m)});return a}
const inner=document.querySelector('.innerhero .wrap');if(inner&&!['contact','reports','get-involved','explore','partners','gallery'].includes(base)&&!inner.querySelector('.hero-copy')){const copy=document.createElement('div');copy.className='hero-copy';while(inner.firstChild)copy.append(inner.firstChild);inner.append(copy,card(selected))}
if(base==='index'||base==='activities'||base==='impact'){const section=document.createElement('section');section.className='media-kpi-section';const wrap=document.createElement('div');wrap.className='wrap';const h=document.createElement('div');h.className='media-kpi-head';h.innerHTML='<div><span class="eyebrow">Visual stories</span><h2>Sashakt in pictures</h2></div><a href="gallery.html">View gallery →</a>';const grid=document.createElement('div');grid.className='media-kpi-grid';[film,launch,bal].forEach(m=>grid.append(card(m)));wrap.append(h,grid);section.append(wrap);const anchor=document.querySelector(base==='index'?'.impact-strip':'.innerhero');if(anchor)anchor.after(section)}
})();

;(()=>{const details=[...document.querySelectorAll('header nav details')].find(d=>d.querySelector('summary')?.textContent.trim()==='Programmes');if(!details)return;details.classList.add('programme-nav');const menu=details.querySelector('.menu');if(menu&&!menu.classList.contains('programme-menu'))menu.outerHTML="<div class=\"menu programme-menu\"><div class=\"programme-group tint-blue\"><a class=\"programme-heading\" href=\"health.html\"><span>01</span>Health &amp; Medical →</a><div class=\"programme-links\"><a href=\"opd.html\">Weekly medical OPDs</a><a href=\"health-camps.html\">Community health camps</a></div></div><div class=\"programme-group tint-teal\"><a class=\"programme-heading\" href=\"skilling.html\"><span>02</span>Skilling &amp; Employment →</a><div class=\"programme-links\"><a href=\"tailoring.html\">Self-employed tailoring</a><a href=\"beauty.html\">Beauty therapy</a><a href=\"digital-skilling.html\">Digital data entry &amp; GST</a><a href=\"youth-skilling.html\">Youth skilling</a><a href=\"autocad.html\">AutoCAD design labs</a><a href=\"automotive.html\">Two-wheeler &amp; EV labs</a></div></div><div class=\"programme-group tint-pink\"><a class=\"programme-heading\" href=\"education.html\"><span>03</span>Education &amp; School Development →</a><div class=\"programme-links\"><a href=\"bal-sashakt.html\">Bal Sashakt</a><a href=\"science-city.html\">Educational excursions</a><a href=\"school-development.html\">School development</a><a href=\"science-labs.html\">Sashakt Science Labs</a></div></div><div class=\"programme-group tint-orange\"><a class=\"programme-heading\" href=\"livelihood.html\"><span>04</span>Livelihood &amp; Community Development →</a><div class=\"programme-links\"><a href=\"diva-salon.html\">Diva Salon &amp; Academy</a><a href=\"diva-studio.html\">Diva Design Studio</a><a href=\"financial-literacy.html\">Financial literacy</a><a href=\"government-schemes.html\">Government scheme linkages</a></div></div><a class=\"all-programmes\" href=\"explore.html\">Explore all programmes →</a></div>";const active=location.pathname.split('/').pop();details.querySelectorAll('a').forEach(a=>{if(a.getAttribute('href')===active)a.setAttribute('aria-current','page')})})();
;(()=>{const photos=[{"centre":"Narol","category":"health","title":"Weekly medical OPDs","label":"OPD attendances","num":"881","link":"opd.html","slug":"narol-opd-archive","caption":"Narol medical OPD supplies · January 2024 archive"},{"centre":"Narol","category":"skills","title":"Skilling and graduation","label":"Graduates · Batch 15","num":"192","link":"skilling.html","slug":"narol-skilling","caption":"Narol graduation highlights · Q2 report archive"},{"centre":"Narol","category":"education","title":"Bal Sashakt 15.0","label":"Children enrolled","num":"150","link":"bal-sashakt.html","slug":"narol-bal-sashakt","caption":"Narol Bal Sashakt activity · Q2 report archive"},{"centre":"Narol","category":"education","title":"Science City excursion","label":"Children engaged","num":"90","link":"science-city.html","slug":"narol-science-city","caption":"Narol Science City visit · Q2 report archive"},{"centre":"Naroda","category":"health","title":"Weekly medical OPDs","label":"OPD attendances","num":"1,014","link":"opd.html","slug":"naroda-opd-archive","caption":"Naroda OPD centre · December 2023 archive"},{"centre":"Naroda","category":"skills","title":"Skilling and graduation","label":"Competition participants","num":"127","link":"skilling.html","slug":"naroda-skilling","caption":"Naroda skilling graduation event · Q2 report archive"},{"centre":"Naroda","category":"education","title":"Bal Sashakt 11.0","label":"Children participating","num":"150","link":"bal-sashakt.html","slug":"naroda-bal-sashakt","caption":"Naroda Bal Sashakt art activity · Q2 report archive"},{"centre":"Naroda","category":"education","title":"Science City excursion","label":"Children engaged","num":"78","link":"science-city.html","slug":"naroda-science-city","caption":"Naroda Science City excursion · Q2 report archive"},{"centre":"Lambha","category":"education","title":"Adarsh School","label":"Student engagements","num":"500","link":"science-labs.html","slug":"lambha-adarsh-school","caption":"Adarsh School group session · Lambha archive"},{"centre":"Lambha","category":"education","title":"Experiential learning","label":"Sessions across Lambha","num":"217","link":"education.html","slug":"lambha-school-session","caption":"Adarsh School session · Lambha archive"}];const filters=document.querySelectorAll('[data-centre-filter]');filters.forEach(btn=>btn.addEventListener('click',()=>{filters.forEach(b=>b.setAttribute('aria-pressed',String(b===btn)));document.querySelectorAll('[data-centre-category]').forEach(card=>card.hidden=btn.dataset.centreFilter!=='all'&&card.dataset.centreCategory!==btn.dataset.centreFilter)}));const path=location.pathname.split('/').pop().replace(/\.html$/,'')||'index';const targets={health:['health'],opd:['health'],skilling:['skills'],tailoring:['skills'],beauty:['skills'],'digital-skilling':['skills'],education:['education'],'bal-sashakt':['education'],'science-city':['education'],'school-development':['education'],'science-labs':['education']};const exact={'opd':'opd.html','bal-sashakt':'bal-sashakt.html','science-city':'science-city.html','science-labs':'science-labs.html','school-development':'science-labs.html'};if(targets[path]&&!document.querySelector('.pillar-main,.editorial-main')){let matches=photos.filter(p=>targets[path].includes(p.category));if(exact[path])matches=matches.filter(p=>p.link===exact[path]);if(matches.length){const s=document.createElement('section');s.className='section programme-field';const w=document.createElement('div');w.className='wrap';const label=document.createElement('span');label.className='eyebrow';label.textContent='Original centre archives';const h=document.createElement('h2');h.textContent='Activity photographs';const grid=document.createElement('div');grid.className='centre-story-grid';matches.slice(0,3).forEach(p=>{const article=document.createElement('article');article.className='centre-story';const a=document.createElement('a');a.className='centre-photo';a.href='assets/field/'+p.slug+'.jpg';a.dataset.fieldPhoto=p.caption;const im=document.createElement('img');im.src=a.href;im.alt=p.caption;im.loading='lazy';const cap=document.createElement('span');cap.textContent=p.caption+' ↗';a.append(im,cap);const copy=document.createElement('div');copy.className='story-content';const tag=document.createElement('span');tag.className='story-tag';tag.textContent=p.centre;const title=document.createElement('h3');title.textContent=p.title;const link=document.createElement('a');link.className='story-link';link.href=p.centre.toLowerCase()+'.html';link.textContent='Explore '+p.centre+' →';copy.append(tag,title,link);article.append(a,copy);grid.append(article)});w.append(label,h,grid);s.append(w);const anchor=document.querySelector('main>.section');if(anchor)anchor.after(s);const hero=document.querySelector('.innerhero .page-media');if(hero){const p=matches[0];hero.href='assets/field/'+p.slug+'.jpg';hero.dataset.fieldPhoto=p.caption;hero.querySelector('img').src=hero.href;hero.querySelector('img').alt=p.caption;hero.querySelector('.media-kind').textContent='Photo';hero.querySelector('.media-play').textContent='↗';hero.querySelector('strong').textContent=p.title;hero.querySelector('small').textContent=p.centre+' · original archive';hero.querySelector('.media-link').textContent='View photo →'}}}if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver'in window){const io=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}})},{threshold:.05});document.querySelectorAll('.centre-story,.centre-stat').forEach((el,i)=>{el.dataset.reveal='';el.style.setProperty('--delay',i%3*55+'ms');io.observe(el)})}})();
;(()=>{if(!document.querySelector('.pillar-main')||matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver'in window))return;const io=new IntersectionObserver(entries=>{for(const e of entries){if(!e.isIntersecting)continue;e.target.classList.add('is-visible');io.unobserve(e.target)}},{threshold:.04});document.querySelectorAll('.pillar-activity,.pillar-steps>div,.pillar-centre-card').forEach((el,i)=>{el.dataset.reveal='';el.style.setProperty('--delay',i%3*50+'ms');io.observe(el)})})();
;(()=>{const main=document.querySelector('.editorial-main');if(!main)return;document.querySelectorAll('[data-filter-group]').forEach(group=>{const list=document.querySelector('[data-filter-list="'+group.dataset.filterGroup+'"]');if(!list)return;const buttons=group.querySelectorAll('button');buttons.forEach(b=>b.addEventListener('click',()=>{buttons.forEach(x=>x.setAttribute('aria-pressed',String(x===b)));list.querySelectorAll('[data-filter-item]').forEach(item=>item.hidden=b.dataset.filterValue!=='all'&&item.dataset.filterItem!==b.dataset.filterValue)}))});const search=document.querySelector('#editorial-search');if(search){search.addEventListener('input',()=>{const q=search.value.trim().toLowerCase();let count=0;document.querySelectorAll('[data-directory-group]').forEach(group=>{const title=group.querySelector('h3').textContent.toLowerCase();let any=false;group.querySelectorAll('[data-directory-link]').forEach(link=>{const show=(title+' '+link.textContent.toLowerCase()).includes(q);link.hidden=!show;any||=show;if(show)count++});group.hidden=!any});document.querySelector('#editorial-no-results').hidden=count!==0})}if(matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver'in window))return;const io=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(!entry.isIntersecting)return;entry.target.classList.add('is-visible');io.unobserve(entry.target)})},{threshold:.04});main.querySelectorAll('.topic-card,.editorial-link,.editorial-community,.editorial-timeline article,.mission-grid article,.activity-entry,.editorial-gallery article,.resource-list article,.pillar-kpi').forEach((el,i)=>{el.dataset.reveal='';el.style.setProperty('--delay',i%3*40+'ms');io.observe(el)});document.documentElement.classList.add('reveal-ready')})();
/* Real activity photographs: context-specific, accessible 1.5-second carousels. */
;(()=>{
  const root='assets/field/';
  const make=(file,title)=>({src:root+file,title});
  const P={
    suman:make('lambha-suman-school-lab.jpg','Suman School science lab · Lambha · archive'),
    campN:make('naroda-dental-camp-q2.jpg','Dental camp · Naroda · Q2 2026–27'),
    finN:make('naroda-financial-literacy-q2.jpg','Financial literacy and scheme support · Naroda · Q2 2026–27'),
    studioR2:make('narol-studio-user-02.jpg','Diva Design Studio · Narol · production floor'),
    studioR3:make('narol-studio-user-03.jpg','Diva Design Studio · Narol · garment work'),
    studioN3:make('naroda-studio-user-01.jpg','Diva Design Studio · Naroda · stitching'),
    studioN4:make('naroda-studio-user-02.jpg','Diva Design Studio · Naroda · production'),
    studioN5:make('naroda-studio-user-03.jpg','Diva Design Studio · Naroda · production floor'),
    labR:make('narol-science-labs-q2.jpg','Science lab learning · Narol · Q2 2026–27'),
    campR:make('narol-eye-camp-q2.jpg','Eye check-up camp · Narol · Q2 2026–27'),
    studioR1:make('narol-studio-user-01.jpeg','Diva Design Studio · Narol'),
    finR:make('narol-financial-literacy-q2.jpg','Financial literacy session · Narol · Q2 2026–27'),
    labN:make('naroda-science-labs-q2.png','Science lab learning · Naroda · Q2 2026–27'),
    tail1:make("tailoring-report-01.svg","Self-employed tailoring · Narol · September 2026"),
    tail2:make("tailoring-report-02.svg","Tailoring training · Narol · September 2026"),
    beauty1:make("beauty-report-01.svg","Beauty therapist training · Narol · September 2026"),
    beauty2:make("beauty-report-02.svg","Beauty therapy practical session · Narol · September 2026"),
    data1:make("data-entry-report-01.svg","Domestic data entry operator training · Narol · September 2026"),
    data2:make("data-entry-report-02.svg","Domestic data entry operator classroom session · Narol · September 2026"),
    gst1:make("gst-tally-report-01.svg","GST–Tally computer practice · Narol · September 2026"),
    gst2:make("gst-tally-report-02.svg","GST–Tally training · Narol · September 2026"),
    grad1:make("graduation-report-01.svg","Narol graduation ceremony · September 2026"),
    grad2:make("graduation-report-02.svg","Narol tailoring graduation · September 2026"),
    ev1:make("ev-report-01.svg","EV/HV batch orientation · iACE GP Ahmedabad"),
    ev2:make("ev-report-02.svg","Hybrid vehicle classroom session · iACE GP Ahmedabad"),
    ev3:make("ev-report-03.svg","Hands-on component practice · iACE GP Ahmedabad"),
    design1:make("design-lab-report-01.jpg","Design software training · GGP Ahmedabad · 2025–26"),
    design2:make("design-lab-report-02.jpg","Digital drawing practice · GGP Ahmedabad · 2025–26"),
    design3:make("design-lab-report-03.jpg","Technical design assignment · GGP Ahmedabad · 2025–26"),
    narolOPD2:make('narol-opd-extra-01.jpg','Narol OPD · January 2024 archive'),
    narolOPD3:make('narol-opd-extra-02.jpg','Narol OPD · January 2024 archive'),
    narodaOPD2:make('naroda-opd-extra-01.jpg','Naroda OPD · December 2023 archive'),
    narodaOPD3:make('naroda-opd-extra-02.jpg','Naroda OPD · December 2023 archive'),
    balWorkshop1:make('bal-workshop-extra-01.jpg','Bal Sashakt canvas workshop · January 2022 archive'),
    balWorkshop2:make('bal-workshop-extra-02.jpg','Bal Sashakt canvas workshop · January 2022 archive'),
    scienceVisit1:make('science-city-extra-01.jpg','Science City visit · activity archive'),
    scienceVisit2:make('science-city-extra-02.jpg','Science City visit · activity archive'),
    financial2:make('financial-extra-01.jpg','Financial literacy session · September 2024 archive'),
    financial3:make('financial-extra-02.jpg','Financial literacy session · September 2024 archive'),
    narolGrad:make('narol-graduation-single.svg','Narol skilling graduation · Q2 2026–27'),
    narodaGrad:make('naroda-skilling.jpg','Naroda skilling graduation · Q2 archive'),
    narolOPD:make('narol-opd-archive.jpg','Narol medical OPD · January 2024 archive'),
    narodaOPD:make('naroda-opd-archive.jpg','Naroda medical OPD · December 2023 archive'),
    narolBal:make('narol-bal-sashakt.jpg','Bal Sashakt · Narol activity archive'),
    narodaBal:make('naroda-bal-sashakt.jpg','Bal Sashakt · Naroda activity archive'),
    narolScience:make('narol-science-city.jpg','Science City visit · Narol'),
    narodaScience:make('naroda-science-city.jpg','Science City visit · Naroda'),
    school:make('lambha-adarsh-school.jpg','Adarsh School · Lambha'),
    school2:make('lambha-school-session.jpg','School learning session · Lambha'),
    salon:make('diva-salon-practice.png','Diva Salon practice · Naroda'),
    studioN1:make('naroda-studio-q2-01.png','Diva Design Studio · Naroda · Q2 2026–27'),
    studioN2:make('naroda-studio-q2-02.png','Diva Design Studio stitching · Naroda · Q2 2026–27'),
    salonN1:make('naroda-salon-q2-01.png','Diva Salon services · Naroda · Q2 2026–27'),
    salonN2:make('naroda-salon-q2-02.png','Diva Salon hair care · Naroda · Q2 2026–27'),
    autoCADQ2:make('naroda-autocad-q2-01.png','AutoCAD Lab · ITI Kubernagar · Q2 2026–27'),
    salonR1:make('narol-salon-q1-01.jpg','Diva Salon services · Narol · Q1 2026–27'),
    tailoring:make('tailoring-tools.jpg','Tailoring tools · programme archive'),
    autoCAD:make('autocad-lab.jpg','AutoCAD lab · ITI Kubernagar'),
    youth:make('youth-technical-training.png','Youth technical training · Naroda archive'),
    financial:make('financial-literacy-session.jpg','Financial literacy session · September 2024')
  };
  const community=[P.narolGrad,P.narodaGrad,P.narolBal,P.narodaScience,P.school,P.salon];
  const education=[P.narolBal,P.narodaBal,P.narolScience,P.narodaScience,P.school,P.school2];
  const skilling=[P.narolGrad,P.narodaGrad,P.autoCAD,P.youth,P.tailoring,P.salon];
  const groups={
    index:community,about:community,journey:community,activities:community,'get-involved':community,
    vision:[P.narodaBal,P.narolBal,P.narolScience,P.school],health:[P.narodaOPD,P.narolOPD,P.campR,P.campN],'health-camps':[P.campR,P.campN],'government-schemes':[P.finN,P.finR],'financial-literacy':[P.finR,P.finN,P.financial,P.financial2,P.financial3],
    opd:[P.narodaOPD,P.narolOPD],education,skilling,
    livelihood:[P.salonR1,P.salonN1,P.studioN1,P.studioN2,P.financial],'diva-salon':[P.salonR1,P.salonN1,P.salonN2,P.salon],'diva-studio':[P.studioR1,P.studioR2,P.studioR3,P.studioN1,P.studioN2,P.studioN3,P.studioN4,P.studioN5],narol:[P.narolGrad,P.narolBal,P.narolScience,P.narolOPD,P.salonR1,P.studioR1,P.labR,P.campR,P.finR,P.studioR2,P.studioR3],
    naroda:[P.narodaGrad,P.narodaBal,P.narodaScience,P.narodaOPD,P.salon,P.studioN1,P.studioN2,P.salonN1,P.salonN2,P.youth,P.labN,P.campN,P.finN,P.studioN3,P.studioN4,P.studioN5],
    lambha:[P.school,P.school2,P.suman],'bal-sashakt':[P.narodaBal,P.narolBal],
    'science-city':[P.narolScience,P.narodaScience],'school-development':[P.school,P.school2,P.suman],
    'science-labs':[P.labR,P.labN,P.suman],'youth-skilling':[P.youth,P.autoCAD,P.ev1,P.ev2,P.ev3,P.design1,P.design2],tailoring:[P.tail1,P.tail2,P.tailoring],beauty:[P.beauty1,P.beauty2],'digital-skilling':[P.data1,P.data2,P.gst1,P.gst2],autocad:[P.autoCAD,P.design1,P.design2,P.design3,P.autoCADQ2],automotive:[P.ev1,P.ev2,P.ev3]
  };
  const path=(location.pathname.split('/').pop()||'index').replace(/\.html$/,'');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const unique=list=>[...new Map(list.filter(x=>x&&x.src).map(x=>[x.src,x])).values()];
  const normalize=src=>typeof src==='string'&&src.includes('narol-skilling.jpg')?root+'narol-graduation-single.svg':src;
  const item=a=>({src:normalize(a.getAttribute('href')),title:a.dataset.fieldPhoto||a.querySelector('img')?.alt||'Activity photograph'});
  const photos=[...document.querySelectorAll('a.centre-photo[data-field-photo][href]')];
  if(!photos.length)return;
  const isHero=a=>a.matches('.editorial-cover,.pillar-cover,.home-intro-photo')||!!a.closest('.centre-cover');
  
  const collections={
    opd:[P.narolOPD,P.narolOPD2,P.narolOPD3,P.narodaOPD,P.narodaOPD2,P.narodaOPD3],
    graduation:[P.narolGrad,P.grad1,P.grad2,P.narodaGrad],
    bal:[P.narolBal,P.narodaBal,P.balWorkshop1,P.balWorkshop2],
    scienceCity:[P.narolScience,P.narodaScience,P.scienceVisit1,P.scienceVisit2],
    school:[P.school,P.school2],
    salon:[P.salon,P.salonR1,P.salonN1,P.salonN2],
    studio:[P.studioR1,P.studioR2,P.studioR3,P.studioN1,P.studioN2,P.studioN3,P.studioN4,P.studioN5],
    schoolLabs:[P.labR,P.labN,P.suman],
    healthCamps:[P.campR,P.campN],
    tailoring:[P.tailoring,P.tail1,P.tail2],
    beauty:[P.beauty1,P.beauty2],
    dataEntry:[P.data1,P.data2],
    gstTally:[P.gst1,P.gst2],
    ev:[P.ev1,P.ev2,P.ev3],
    autocad:[P.autoCAD,P.design1,P.design2,P.design3,P.autoCADQ2],
    youth:[P.youth],
    financial:[P.finR,P.finN,P.financial,P.financial2,P.financial3]
  };
  const activityBySrc=new Map(Object.entries(collections).flatMap(([key,items])=>items.map(p=>[p.src,key])));
  const activityGallery=a=>{
    const selected=item(a),key=activityBySrc.get(selected.src),group=key?collections[key]:[];
    const centreOf=title=>title.toLowerCase().match(/\b(?:naroda|narol|lambha)\b/)?.[0];
    const centre=centreOf(selected.title);
    // A centre-specific card must not display a different or unverified centre.
    return unique([selected,...group.filter(p=>!centre||centreOf(p.title)===centre)]);
  };
  const applyFit=(a)=>{
    if(!isHero(a))return;
    const img=a.querySelector('img');if(!img)return;
    const sync=()=>{
      if(!img.naturalWidth||!img.naturalHeight)return;
      const maxH=Math.min(420,Math.max(215,innerWidth*(innerWidth<=600?.61:innerWidth<=900?.43:.25)));
      const fit=Math.round(maxH*img.naturalWidth/img.naturalHeight);
      const shell=a.closest('.photo-carousel-shell');
      (shell||a).style.setProperty('--photo-fit-width',fit+'px');
      a.style.setProperty('--photo-fit-width',fit+'px');
      a.classList.add('fit-photo-frame');if(shell)shell.classList.add('fit-photo-shell');
    };
    img.addEventListener('load',sync);addEventListener('resize',sync,{passive:true});sync();
  };
  const tagNames={health:'Health & Medical',skills:'Skilling & Employment',education:'Education & School Development',livelihood:'Livelihood & Community Development'};
  const categoryFor=key=>({opd:'health',graduation:'skills',bal:'education',scienceCity:'education',school:'education',salon:'livelihood',studio:'livelihood',schoolLabs:'education',healthCamps:'health',tailoring:'skills',beauty:'skills',dataEntry:'skills',gstTally:'skills',ev:'skills',autocad:'skills',youth:'skills',financial:'livelihood'})[key];
  const enhanceCard=a=>{
    const card=a.closest('article.centre-story.has-photo,article.pillar-activity.with-photo,article.activity-entry');
    if(!card||a.parentElement!==card)return;
    const copy=card.querySelector(':scope > .story-content,:scope > .pillar-activity-copy,:scope > div');
    if(!copy)return;
    card.classList.add('photo-kpi-card');copy.classList.add('photo-kpi-copy');
    let tag=copy.querySelector('.story-tag');
    if(!tag){const category=card.dataset.centreCategory||card.dataset.filterItem||categoryFor(activityBySrc.get(item(a).src));if(tagNames[category]){tag=document.createElement('span');tag.textContent=tagNames[category]}}
    if(tag){tag.classList.add('photo-kpi-tag');card.append(tag)}
    const stat=copy.querySelector('.story-stat,.pillar-activity-stat');
    if(stat)card.classList.add('has-kpi');
  };

  const btn=(text,label,cls)=>{const b=document.createElement('button');b.type='button';b.textContent=text;b.className=cls||'';b.setAttribute('aria-label',label);return b};
  const renderAnchor=(a,photo)=>{
    const im=a.querySelector('img'),cap=a.querySelector(':scope > span');
    a.href=photo.src;a.dataset.fieldPhoto=photo.title;a.setAttribute('aria-label','Enlarge '+photo.title);
    if(im){im.src=photo.src;im.alt=photo.title}if(a.closest('.centre-activities .has-photo'))a.style.setProperty('--activity-image','url('+JSON.stringify(photo.src)+')');
    if(cap)cap.textContent=photo.title+' ↗';
  };
  const modal=document.createElement('dialog');modal.className='field-modal photo-lightbox';modal.setAttribute('aria-label','Activity photographs');
  modal.innerHTML='<div class="field-modal-top"><p class="photo-lightbox-title"></p><button type="button" class="photo-close">Close ×</button></div><div class="photo-lightbox-stage"><img alt=""><p class="photo-load-error" hidden>Photo unavailable.</p></div><div class="photo-lightbox-controls"><div class="photo-lightbox-dots"></div></div>';
  document.body.append(modal);
  const mi=modal.querySelector('img'),mt=modal.querySelector('.photo-lightbox-title'),dots=modal.querySelector('.photo-lightbox-dots'),controls=modal.querySelector('.photo-lightbox-controls'),error=modal.querySelector('.photo-load-error');
  const mp=btn('‹','Previous photograph','photo-modal-prev'),mn=btn('›','Next photograph','photo-modal-next'),play=btn('Play','Play photo slideshow','photo-modal-play'),count=document.createElement('span');count.className='photo-count';
  controls.prepend(mp);controls.append(mn,count,play);
  let list=[],idx=0,modalTimer=null,modalPlaying=false,returnFocus=null,modalRevision=0;
  function syncModal(){
    clearTimeout(modalTimer);const rev=++modalRevision;const current=list[idx];if(!current)return;
    mt.textContent=current.title;count.textContent=(idx+1)+' / '+list.length;error.hidden=true;mi.hidden=false;
    mi.onload=()=>{if(rev===modalRevision){error.hidden=true;mi.hidden=false}};
    mi.onerror=()=>{if(rev===modalRevision){mi.hidden=true;error.hidden=false}};
    mi.src=current.src;mi.alt=current.title;
    [...dots.children].forEach((d,i)=>d.setAttribute('aria-pressed',String(i===idx)));
    play.textContent=modalPlaying?'Pause':'Play';play.setAttribute('aria-label',modalPlaying?'Pause photo slideshow':'Play photo slideshow');
    if(modalPlaying&&list.length>1&&!document.hidden&&modal.open)modalTimer=setTimeout(()=>{idx=(idx+1)%list.length;syncModal()},1500);
  }
  function moveModal(n){idx=(idx+n+list.length)%list.length;syncModal()}
  mp.addEventListener('click',()=>moveModal(-1));mn.addEventListener('click',()=>moveModal(1));play.addEventListener('click',()=>{modalPlaying=!modalPlaying;syncModal()});
  modal.querySelector('.photo-close').addEventListener('click',()=>modal.close());
  modal.addEventListener('click',e=>{if(e.target===modal)modal.close()});
  let touchStart=null;modal.querySelector('.photo-lightbox-stage').addEventListener('touchstart',e=>{touchStart=e.changedTouches[0].clientX},{passive:true});modal.querySelector('.photo-lightbox-stage').addEventListener('touchend',e=>{if(touchStart===null||list.length<2)return;const delta=e.changedTouches[0].clientX-touchStart;touchStart=null;if(Math.abs(delta)>45)moveModal(delta>0?-1:1)},{passive:true});
  modal.addEventListener('keydown',e=>{if(list.length<2)return;if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();moveModal(e.key==='ArrowLeft'?-1:1)}});
  modal.addEventListener('close',()=>{clearTimeout(modalTimer);modalPlaying=false;++modalRevision;mi.removeAttribute('src');returnFocus?.focus({preventScroll:true});returnFocus=null});
  document.addEventListener('visibilitychange',()=>{if(modal.open){if(document.hidden)clearTimeout(modalTimer);else syncModal()}});
  function openModal(a,collection,selected){
    if(typeof modal.showModal!=='function'||modal.open)return false;
    list=unique(collection);idx=Math.max(0,list.findIndex(x=>x.src===selected));if(!list.length)return false;
    returnFocus=a;modalPlaying=false;play.hidden=!!a.closest('.centre-activities');dots.replaceChildren();list.forEach((p,i)=>{const dot=btn('', 'View photograph '+(i+1)+': '+p.title,'photo-dot');dot.addEventListener('click',()=>{idx=i;syncModal()});dots.append(dot)});
    controls.hidden=list.length<2;modal.showModal();syncModal();return true;
  }
  photos.forEach(a=>{
    if((a.getAttribute('href')||'').includes('narol-skilling.jpg'))renderAnchor(a,item(a));
    const first=item(a);enhanceCard(a);
    const centrePage=['narol','naroda','lambha'].includes(path);
    const heroGroup=(groups[path]||[]).filter(p=>!centrePage||new RegExp('\\b'+path+'\\b','i').test(p.title));
    const slides=isHero(a)?unique([first,...heroGroup,...activityGallery(a).filter(p=>!centrePage||new RegExp('\\b'+path+'\\b','i').test(p.title))]):[];
    if(slides.length<2){
      applyFit(a);
      a.addEventListener('click',e=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;if(openModal(a,activityGallery(a),item(a).src))e.preventDefault()});return;
    }
    const shell=document.createElement('div');shell.className='photo-carousel-shell';shell.setAttribute('role','region');shell.setAttribute('aria-label','Activity photo slideshow');a.before(shell);shell.append(a);applyFit(a);
    const prev=btn('‹','Previous photograph','photo-carousel-arrow photo-carousel-prev'),next=btn('›','Next photograph','photo-carousel-arrow photo-carousel-next'),toggle=btn('Ⅱ','Pause slideshow','photo-carousel-toggle'),ind=document.createElement('div');ind.className='photo-carousel-dots';
    shell.append(prev,next,toggle,ind);
    let at=0,visible=!('IntersectionObserver'in window),hover=false,focused=false,paused=reduced.matches,timer=null,revision=0;const unavailable=new Set();
    const syncDots=()=>[...ind.children].forEach((d,i)=>d.setAttribute('aria-pressed',String(i===at)));
    const nextAvailable=(direction=1)=>{for(let i=1;i<slides.length;i++){const j=(at+direction*i+slides.length)%slides.length;if(!unavailable.has(j))return j}return at};
    const schedule=()=>{clearTimeout(timer);const nextIndex=nextAvailable();if(nextIndex!==at&&!paused&&visible&&!hover&&!focused&&!document.hidden&&!modal.open)timer=setTimeout(()=>show(nextIndex),1500)};
    function show(n){
      clearTimeout(timer);const target=((n%slides.length)+slides.length)%slides.length,rev=++revision;const photo=slides[target];const pre=new Image();
      pre.onload=()=>{if(rev!==revision)return;unavailable.delete(target);at=target;renderAnchor(a,photo);syncDots();schedule()};
      pre.onerror=()=>{if(rev!==revision)return;unavailable.add(target);schedule()};pre.src=photo.src;
    }
    const updateToggle=()=>{toggle.textContent=paused?'▶':'Ⅱ';toggle.setAttribute('aria-label',paused?'Play slideshow':'Pause slideshow')};
    slides.forEach((p,i)=>{const d=btn('', 'View photograph '+(i+1)+': '+p.title,'photo-dot');d.addEventListener('click',()=>show(i));ind.append(d)});
    prev.addEventListener('click',()=>show(nextAvailable(-1)));next.addEventListener('click',()=>show(nextAvailable()));toggle.addEventListener('click',()=>{paused=!paused;updateToggle();schedule()});
    shell.addEventListener('mouseenter',()=>{hover=true;schedule()});shell.addEventListener('mouseleave',()=>{hover=false;schedule()});shell.addEventListener('focusin',()=>{focused=true;schedule()});shell.addEventListener('focusout',e=>{if(!shell.contains(e.relatedTarget)){focused=false;schedule()}});
    shell.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();show(nextAvailable(e.key==='ArrowLeft'?-1:1))}});
    a.addEventListener('click',e=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;if(openModal(a,activityGallery(a),item(a).src)){e.preventDefault();schedule()}});
    if('IntersectionObserver'in window){new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;schedule()},{threshold:.35}).observe(shell)}
    document.addEventListener('visibilitychange',schedule);modal.addEventListener('close',schedule);reduced.addEventListener?.('change',e=>{if(e.matches){paused=true;updateToggle();schedule()}});
    syncDots();updateToggle();schedule();
  });
})();
