// ADD NEW THINGS HERE: one entry = one card + one full section.
const DATA = {
  extra: [
    {id:'mehfil', t:'Mehfil', s:'Open mics and events', p:'Write about Mehfil here: what it is, who it is for, what you have run so far.', l:[['Instagram','#']]},
    {id:'ecell', t:'E-cell', s:'Head of operations', p:'Write about your role in E-cell and what you have organised.', l:[]},
    {id:'hackathons', t:'Hackathons', s:'What I built and won', p:'List the hackathons you took part in and what came out of them.', l:[]},
    {id:'internships', t:'Internships', s:'Where I worked', p:'List your internships with the role, the dates and what you did.', l:[]},
    {id:'designs', t:'Mehfil designs', s:'Posters and visuals', p:'Add your Mehfil posters and designs here.', l:[]}
  ],
  tech: [
    {id:'projects', t:'Projects', s:'Things I have built', p:'Describe your projects here with the tech used.', l:[['GitHub','#'],['Live site','#']]},
    {id:'skills', t:'Skills', s:'What I work with', p:'List your languages, tools and what you are learning now.', l:[]},
    {id:'certificates', t:'Certificates', s:'Courses and badges', p:'Add your certificates here with the issuer and year.', l:[['View certificate','#']]},
    {id:'profiles', t:'Profiles', s:'Find me online', p:'Links to your coding and social profiles.', l:[['GitHub','#'],['LinkedIn','#']]}
  ]
};

const $ = s => document.querySelector(s);
const rail = $('#rail'), details = $('#details');

function show(track) {
  rail.innerHTML = DATA[track].map(d => `<button class="card" data-go="${d.id}"><b>${d.t}</b><span>${d.s}</span></button>`).join('');
  details.innerHTML = DATA[track].map(d => `<section class="sec" id="${d.id}"><h3>${d.t}</h3><p>${d.p}</p><div class="links">${d.l.map(x => `<a href="${x[1]}" target="_blank" rel="noopener">${x[0]}</a>`).join('')}</div></section>`).join('');
  document.querySelectorAll('#tabs button').forEach(b => b.classList.toggle('on', b.dataset.track === track));
}

document.querySelectorAll('[data-track]').forEach(b => b.addEventListener('click', () => {
  show(b.dataset.track);
  if (b.closest('#hero')) $('#sheet').scrollIntoView({behavior: 'smooth'});
}));
rail.addEventListener('click', e => {
  const c = e.target.closest('[data-go]');
  if (c) document.getElementById(c.dataset.go).scrollIntoView({behavior: 'smooth'});
});
show('extra');

// cursor tracking: swaps between images/me-center, left, right, up, down (.png)
const me = $('#me'), ph = $('#ph'), pupils = document.querySelectorAll('.pu');
['center', 'left', 'right', 'up', 'down'].forEach(k => { new Image().src = `images/me-${k}.png`; });
me.addEventListener('error', () => { me.hidden = true; ph.hidden = false; }, {once: true});
addEventListener('pointermove', e => {
  const r = (me.hidden ? ph : me).getBoundingClientRect();
  const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height * .3), d = Math.hypot(dx, dy);
  let k = 'center';
  if (d > r.width * .2) k = Math.abs(dx) > Math.abs(dy) ? (dx < 0 ? 'left' : 'right') : (dy < 0 ? 'up' : 'down');
  if (!me.hidden) me.src = `images/me-${k}.png`;
  pupils.forEach(p => { p.style.transform = `translate(${dx / (d || 1) * 7}px,${dy / (d || 1) * 7}px)`; });
});