/* Monarch Enterprises - site scripts (no dependencies) */
'use strict';
/* ====== EDIT HERE: company WhatsApp number (country code + number, digits only) ====== */
var CONFIG = { whatsapp: '919867337664' };

document.querySelectorAll('[data-wa]').forEach(function (a) { a.href = 'https://wa.me/' + CONFIG.whatsapp; });

/* ---- mobile menu ---- */
var mb = document.querySelector('.menu'), nv = document.getElementById('nav');
function closeMenu() { nv.classList.remove('open'); mb.setAttribute('aria-expanded', 'false'); mb.setAttribute('aria-label', 'Open menu'); }
mb.addEventListener('click', function () { var o = nv.classList.toggle('open'); mb.setAttribute('aria-expanded', String(o)); mb.setAttribute('aria-label', o ? 'Close menu' : 'Open menu'); });
nv.addEventListener('click', function (e) { if (e.target.tagName === 'A') closeMenu(); });
document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nv.classList.contains('open')) { closeMenu(); mb.focus(); } });
document.addEventListener('click', function (e) { if (nv.classList.contains('open') && !nv.contains(e.target) && !mb.contains(e.target)) closeMenu(); });

/* ---- hero slideshow ---- */
var sls = [].slice.call(document.querySelectorAll('.slide')), si = 0, sd = document.getElementById('sd'), sc = document.getElementById('scap'), tm = null,
  auto = !window.matchMedia('(prefers-reduced-motion: reduce)').matches, sh = document.querySelector('.show'), tx = 0;
sls.forEach(function (x, i) { var b = document.createElement('button'); b.type = 'button'; b.setAttribute('aria-label', 'Show photo ' + (i + 1)); b.addEventListener('click', function () { stop(); go(i); }); sd.appendChild(b); });
function go(n) {
  si = (n + sls.length) % sls.length;
  sls.forEach(function (x, i) { x.classList.toggle('on', i === si); x.setAttribute('aria-hidden', String(i !== si)); });
  [].forEach.call(sd.children, function (b, i) { b.setAttribute('aria-current', String(i === si)); });
  sc.textContent = sls[si].querySelector('img').alt;
}
function stop() { auto = false; clearInterval(tm); }
document.getElementById('sp').addEventListener('click', function () { stop(); go(si - 1); });
document.getElementById('sn').addEventListener('click', function () { stop(); go(si + 1); });
sh.addEventListener('touchstart', function (e) { tx = e.touches[0].clientX; }, { passive: true });
sh.addEventListener('touchend', function (e) { var d = e.changedTouches[0].clientX - tx; if (Math.abs(d) > 40) { stop(); go(si + (d < 0 ? 1 : -1)); } });
sh.addEventListener('keydown', function (e) { if (e.key === 'ArrowLeft') { stop(); go(si - 1); } if (e.key === 'ArrowRight') { stop(); go(si + 1); } });
go(0);
if (auto) tm = setInterval(function () { if (!document.hidden && !sh.matches(':hover') && !sh.contains(document.activeElement)) go(si + 1); }, 6000);

/* ---- gallery filter + lightbox ---- */
var figs = [].slice.call(document.querySelectorAll('#grid figure')), chips = [].slice.call(document.querySelectorAll('.chip')), vis = figs, cur = 0, count = document.getElementById('count');
function applyFilter(c) {
  chips.forEach(function (k) { k.setAttribute('aria-pressed', String(k === c)); });
  figs.forEach(function (f) { f.hidden = !(c.dataset.f === 'all' || f.dataset.cat === c.dataset.f); });
  vis = figs.filter(function (f) { return !f.hidden; });
  count.textContent = 'Showing ' + vis.length + ' photographs';
}
chips.forEach(function (c) { c.addEventListener('click', function () { applyFilter(c); }); });
applyFilter(chips[0]);
var d = document.getElementById('lb'), im = d.querySelector('img'), cp = d.querySelector('p'), opener = null;
function show(n) { cur = (n + vis.length) % vis.length; var s = vis[cur].querySelector('img'); im.src = s.dataset.full; im.alt = s.alt; cp.textContent = s.alt + '  (' + (cur + 1) + ' of ' + vis.length + ')'; }
figs.forEach(function (f) { f.querySelector('button').addEventListener('click', function (e) { opener = e.currentTarget; show(vis.indexOf(f)); d.showModal(); }); });
d.querySelector('.x').addEventListener('click', function () { d.close(); });
d.querySelector('.pv').addEventListener('click', function () { show(cur - 1); });
d.querySelector('.nx').addEventListener('click', function () { show(cur + 1); });
d.addEventListener('click', function (e) { if (e.target === d || e.target.classList.contains('lb')) d.close(); });
d.addEventListener('close', function () { if (opener) opener.focus(); });
d.addEventListener('keydown', function (e) { if (e.key === 'ArrowLeft') show(cur - 1); if (e.key === 'ArrowRight') show(cur + 1); });

/* ---- enquiry form -> WhatsApp ---- */
var form = document.getElementById('enq'), st = document.getElementById('st');
function setErr(field, msg) { form.querySelector('[data-err="' + field.name + '"]').textContent = msg; field.setAttribute('aria-invalid', msg ? 'true' : 'false'); }
form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (form.website.value) return;                       /* spam trap */
  var name = form.n.value.trim().replace(/\s+/g, ' '), msg = form.m.value.trim(), type = form.t.value, digits = form.p.value.replace(/\D/g, '');
  if (digits.length === 12 && digits.indexOf('91') === 0) digits = digits.slice(2);
  else if (digits.length === 11 && digits.charAt(0) === '0') digits = digits.slice(1);
  var okName = name.length >= 2, okPhone = /^[6-9]\d{9}$/.test(digits);
  setErr(form.n, okName ? '' : 'Please enter your name.');
  setErr(form.p, okPhone ? '' : 'Please enter a valid 10-digit mobile number.');
  if (!okName || !okPhone) { st.textContent = ''; (okName ? form.p : form.n).focus(); return; }
  var lines = ['Hello Monarch Enterprises,', 'I would like to make an enquiry from your website.', '', 'Name: ' + name, 'Phone: +91 ' + digits, 'Requirement: ' + type];
  if (msg) lines.push('Details: ' + msg);
  var url = 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(lines.join('\n'));
  var a = document.createElement('a'); a.href = url; a.target = '_blank'; a.rel = 'noopener'; document.body.appendChild(a); a.click(); a.remove();
  st.innerHTML = 'Opening WhatsApp. Press <strong>Send</strong> there to deliver your enquiry. If it did not open, <a href="' + url + '" target="_blank" rel="noopener">tap here</a>.';
});
