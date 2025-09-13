// Versão 2.0 - script profissional
document.addEventListener('DOMContentLoaded', () => {
  AOS && AOS.init({duration:800, once:true});

  // Mobile menu
  const hamb = document.getElementById('hamb');
  const menu = document.getElementById('menu');
  hamb && hamb.addEventListener('click', ()=> {
    menu.classList.toggle('open');
  });

  // Filters
  const filters = document.querySelectorAll('.filter');
  const cards = Array.from(document.querySelectorAll('.card'));

  function applyFilter(cat){
    cards.forEach(c=> {
      const nodeCat = c.getAttribute('data-category');
      if(cat === 'all' || nodeCat === cat) c.style.display = '';
      else c.style.display = 'none';
    });
  }

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.getAttribute('data-filter');
      applyFilter(f);
    });
  });

  // Lightbox with navigation
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  const lbCaption = document.getElementById('lb-caption');
  const lbClose = document.querySelector('.lb-close');
  const lbPrev = document.querySelector('.lb-prev');
  const lbNext = document.querySelector('.lb-next');
  let currentIndex = -1;
  const gallery = document.querySelectorAll('.grid .card img');

  function openLightbox(index){
    const img = gallery[index];
    lbImg.src = img.src;
    lbCaption.textContent = img.alt || img.closest('figure').querySelector('figcaption')?.textContent || '';
    lb.style.display = 'flex';
    currentIndex = index;
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox(){
    lb.style.display = 'none';
    document.body.style.overflow = '';
  }
  function showNext(dir=1){
    const len = gallery.length;
    currentIndex = (currentIndex + dir + len) % len;
    openLightbox(currentIndex);
  }

  gallery.forEach((img, idx) => {
    img.addEventListener('click', ()=> openLightbox(idx));
  });

  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', ()=> showNext(-1));
  lbNext.addEventListener('click', ()=> showNext(1));

  // keyboard nav
  document.addEventListener('keydown', (e)=>{
    if(lb.style.display !== 'flex') return;
    if(e.key === 'Escape') closeLightbox();
    if(e.key === 'ArrowRight') showNext(1);
    if(e.key === 'ArrowLeft') showNext(-1);
  });

  // close on background click
  lb.addEventListener('click', (e)=>{ if(e.target === lb) closeLightbox(); });

  // Theme toggle (light/dark) - simple implementation
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle && themeToggle.addEventListener('click', ()=>{
    document.documentElement.classList.toggle('dark');
    themeToggle.textContent = document.documentElement.classList.contains('dark') ? '☀️' : '🌙';
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if(target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

});
