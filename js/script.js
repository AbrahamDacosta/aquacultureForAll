
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('fade-in');
  gsap.registerPlugin(ScrollTrigger);
  gsap.utils.toArray('.reveal').forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
  });
});


// scroll smooth
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// scroll actif
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = window.scrollY;
    const offset = section.offsetTop - 100;
    const height = section.offsetHeight;
    if (top >= offset && top < offset + height) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});
// Ouvrir et fermer la modale
const showBoardBtn = document.getElementById('showBoardBtn');
const teamModal = document.getElementById('teamModal');
const closeBtn = document.querySelector('.close-btn');

showBoardBtn.addEventListener('click', e => {
  e.preventDefault();
  teamModal.style.display = 'block';
});
closeBtn.addEventListener('click', () => {
  teamModal.style.display = 'none';
});
window.addEventListener('click', e => {
  if (e.target === teamModal) {
    teamModal.style.display = 'none';
  }
});

// Filtrage
document.getElementById('roleFilter').addEventListener('change', function () {
  const value = this.value;
  document.querySelectorAll('.board-list li').forEach(li => {
    li.style.display = value === 'all' || li.dataset.role === value ? 'flex' : 'none';
  });
});

// Popup formulaire
const joinBtn = document.getElementById('joinTeamBtn');
const joinModal = document.getElementById('joinModal');
const closeJoin = document.querySelector('.close-join');

joinBtn.addEventListener('click', e => {
  e.preventDefault();
  joinModal.style.display = 'block';
});
closeJoin.addEventListener('click', () => {
  joinModal.style.display = 'none';
});
window.addEventListener('click', e => {
  if (e.target === joinModal) {
    joinModal.style.display = 'none';
  }
});

// Envoi Formspree avec message
const joinForm = document.querySelector('.join-form');
joinForm?.addEventListener('submit', function (e) {
  e.preventDefault();
  const data = new FormData(this);
  const message = document.getElementById('formSuccess');
  const button = this.querySelector('button');
  button.disabled = true;
  fetch(this.action, {
    method: 'POST',
    body: data,
    headers: { 'Accept': 'application/json' }
  }).then(response => {
    if (response.ok) {
      this.reset();
      message.style.display = 'block';
    } else {
      alert("Erreur d'envoi.");
    }
    button.disabled = false;
  });
});
// Filtrage dynamique des projets
const filters = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.project-card');

filters.forEach(btn => {
  btn.addEventListener('click', () => {
    filters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    cards.forEach(card => {
      card.style.display = (filter === 'all' || card.dataset.category === filter) ? 'block' : 'none';
    });
  });
});
