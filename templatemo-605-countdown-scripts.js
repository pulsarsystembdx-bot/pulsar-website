/* JavaScript Document

TemplateMo 605 Xmas Countdown

https://templatemo.com/tm-605-xmas-countdown

*/

// Create Particles and Snowflakes
function createParticles() {
   const container = document.getElementById('particles');

   // Cache viewport dimensions — updated on resize only
   let W = window.innerWidth, H = window.innerHeight;
   window.addEventListener('resize', () => { W = window.innerWidth; H = window.innerHeight; }, { passive: true });

   const dots = [];
   for (let i = 0; i < 60; i++) {
      const el = document.createElement('div');
      el.className = 'snowflake';
      el.textContent = '•';
      el.style.fontSize = (0.4 + Math.random() * 0.8) + 'rem';
      container.appendChild(el);
      dots.push({
         el,
         x: Math.random() * W,
         y: Math.random() * H,
         vx: (Math.random() - 0.5) * 0.4,
         vy: (Math.random() - 0.5) * 0.4,
         maxOpacity: 0.4 + Math.random() * 0.4,
         state: 'hidden',
         timer: Math.random() * 2000,
         fadeDuration: 1500 + Math.random() * 1500,
         visibleDuration: 8000 + Math.random() * 10000,
         hiddenDuration: 2000 + Math.random() * 6000,
      });
   }

   let lastTs = null;
   function animateDots(ts) {
      if (lastTs === null) { lastTs = ts; requestAnimationFrame(animateDots); return; }
      const dt = Math.min(ts - lastTs, 50);
      lastTs = ts;

      dots.forEach(dot => {
         dot.vx += (Math.random() - 0.5) * 0.04;
         dot.vy += (Math.random() - 0.5) * 0.04;
         const speed = Math.sqrt(dot.vx * dot.vx + dot.vy * dot.vy);
         if (speed > 0.5) { dot.vx *= 0.5 / speed; dot.vy *= 0.5 / speed; }
         dot.x += dot.vx * dt * 0.05;
         dot.y += dot.vy * dt * 0.05;
         // Wrap around screen edges
         if (dot.x < -10) dot.x = W + 10;
         if (dot.x > W + 10) dot.x = -10;
         if (dot.y < -10) dot.y = H + 10;
         if (dot.y > H + 10) dot.y = -10;
         // GPU-composited positioning via transform
         dot.el.style.transform = `translate3d(${dot.x}px,${dot.y}px,0)`;
         // Fade state machine
         dot.timer -= dt;
         if (dot.timer <= 0) {
            if (dot.state === 'hidden') {
               dot.state = 'visible';
               dot.el.style.transition = `opacity ${dot.fadeDuration}ms ease`;
               dot.el.style.opacity = dot.maxOpacity;
               dot.timer = dot.visibleDuration + dot.fadeDuration;
            } else {
               dot.state = 'hidden';
               dot.el.style.transition = `opacity ${dot.fadeDuration}ms ease`;
               dot.el.style.opacity = 0;
               dot.timer = dot.hiddenDuration + dot.fadeDuration;
            }
         }
      });
      requestAnimationFrame(animateDots);
   }
   requestAnimationFrame(animateDots);
}

// Countdown Timer - Target: December 25, 2025 at 6:00 PM


// Cached DOM references for scroll handlers
const _header = document.getElementById('header');
const _sections = Array.from(document.querySelectorAll('section[id]'));
const _navLinks = Array.from(document.querySelectorAll('nav a:not(.nav-cta)'));

// Header scroll effect
function handleScroll() {
   if (window.scrollY > 50) {
      _header.classList.add('scrolled');
   } else {
      _header.classList.remove('scrolled');
   }
}

// Scroll Spy
function scrollSpy() {
   let currentSection = '';
   const scrollPosition = window.scrollY + 150;

   _sections.forEach(section => {
      if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
         currentSection = section.getAttribute('id');
      }
   });

   _navLinks.forEach(link => {
      link.classList.remove('nav-active');
      if (link.getAttribute('href') === '#' + currentSection) {
         link.classList.add('nav-active');
      }
   });
}

// Mobile navigation
function setupNavigation() {
   const toggle = document.getElementById('navToggle');
   const nav = document.getElementById('nav');
   const links = nav.querySelectorAll('a');

   toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      nav.classList.toggle('active');
   });

   links.forEach(link => {
      link.addEventListener('click', () => {
         toggle.classList.remove('active');
         nav.classList.remove('active');
      });
   });
}

// Newsletter form
function setupNewsletter() {
   const form = document.getElementById('newsletterForm');
   form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input');
      alert('Thank you for subscribing! You\'ll receive holiday updates at ' + input.value);
      input.value = '';
   });
}

// Contact form
function setupContactForm() {
   const form = document.getElementById('contactForm');
   form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const t = translations[currentLang];
      const btn = form.querySelector('.contact-submit');
      const originalText = btn.textContent;

      btn.textContent = t['contact-sending'];
      btn.disabled = true;

      try {
         const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: new FormData(form)
         });
         const data = await response.json();

         if (data.success) {
            btn.textContent = t['contact-success'];
            btn.style.opacity = '0.7';
            setTimeout(() => {
               form.reset();
               btn.textContent = t['contact-send'];
               btn.disabled = false;
               btn.style.opacity = '';
            }, 4000);
         } else {
            btn.textContent = t['contact-error'];
            setTimeout(() => {
               btn.textContent = originalText;
               btn.disabled = false;
            }, 3000);
         }
      } catch {
         btn.textContent = t['contact-error'];
         setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
         }, 3000);
      }
   });
}

// Translations
const translations = {
   fr: {
      'nav-home': 'Home',
      'nav-about': 'About',
      'nav-events': 'Events',
      'nav-traditions': 'Traditions',
      'nav-contact': 'Contact',
      'scroll': 'Scroll',
      'hero-sub': "VIVEZ L'EXPÉRIENCE",
      'hero-bottom': '',
      'about-title': 'QUI SOMMES-NOUS ?',
      'about-h3': "L'<span class=\"text-gradient-light\">harmonie</span> dans le <span class=\"text-gradient-dark\">chaos</span>",
      'about-p1': "Pulsar System, c'est l'énergie d'un collectif bordelais né fin 2024 avec l'ambition de redéfinir la fête et faire vibrer la France entière. Notre spécialité ? Investir des lieux atypiques pour transformer chaque set Techno en une expérience immersive unique.",
      'about-p2': "Notre ADN repose sur une organisation millimétrée, saine et 100% safe. Que vous soyez puristes ou simples curieux, nous créons des espaces où le son rencontre l'humain. Chaque programmation est pensée pour être une ascension progressive, explorant une large palette de textures sonores. Cette diversité de styles nous permet de rassembler un public hétérogène et passionné, où chaque profil trouve sa place sur le dancefloor.",
      'about-p3': "Mais nous ne nous arrêtons pas là. Notre futur s'écrit entre fête radicale et médiation scientifique, pour nourrir vos oreilles autant que votre esprit.",
      'events-tag': 'À venir',
      'events-title': 'Nos Événements',
      'events-subtitle': 'Marquez vos agendas pour ces soirées exceptionnelles',
      'event1-title': 'Soirée Chorale',
      'event1-desc': "Une soirée de chants de Noël classiques interprétés par notre chorale communautaire sous les étoiles.",
      'event2-title': 'Échange de Biscuits',
      'event2-desc': "Apportez vos gourmandises préférées et échangez vos recettes lors de notre rassemblement annuel.",
      'event3-title': 'Veillée aux Bougies',
      'event3-desc': "Une célébration paisible de la veille de Noël avec des bougies, de la réflexion et l'esprit des fêtes.",
      'trad-tag': 'Traditions',
      'trad-title': 'Traditions de Fête',
      'trad-subtitle': 'Les rituels intemporels qui rendent Noël spécial',
      'trad1-title': 'Décoration du Sapin',
      'trad1-desc': "Accrocher des ornements collectés au fil des années, chacun racontant sa propre histoire des Noëls passés.",
      'trad2-title': 'Échange de Cadeaux',
      'trad2-desc': "Trouver le cadeau parfait pour quelqu'un de spécial, emballé avec amour et anticipation.",
      'trad3-title': 'Soirées Chocolat Chaud',
      'trad3-desc': "Se réunir près du feu avec des tasses chaudes, partager des histoires pendant que la neige tombe doucement.",
      'trad4-title': 'Festin de Noël',
      'trad4-desc': "Se retrouver autour de la table en famille pour un repas spécial et des conversations chaleureuses.",
      'learn-more': 'En savoir plus',
      'newsletter-tag': 'Restez Informés',
      'newsletter-title': 'Rejoignez la Célébration',
      'newsletter-desc': "Abonnez-vous pour recevoir les actualités, les rappels d'événements et une dose de magie directement dans votre boîte mail.",
      'newsletter-placeholder': 'Entrez votre adresse email',
      'newsletter-btn': "S'abonner",
      'footer-desc': "Célébrer la magie de Noël avec un compte à rebours en direct, des événements et des traditions qui nous rassemblent.",
      'footer-nav-title': 'Navigation',
      'footer-res-title': 'Ressources',
      'footer-res-1': 'Idées Cadeaux',
      'footer-res-2': 'Recettes de Fête',
      'footer-res-3': 'Conseils Déco',
      'footer-res-4': "Organisation d'Événements",
      'footer-contact-title': 'Contact',
      'footer-support': 'Support',
      'footer-copy': '© 2025 Pulsar System. Tous droits réservés.',
      'footer-privacy': 'Politique de confidentialité',
      'footer-terms': "Conditions d'utilisation",
      'contact-title': 'Contactez-nous',
      'contact-subtitle': 'Une question, une proposition ? On vous répond.',
      'contact-name': 'Nom',
      'contact-name-ph': 'Votre nom',
      'contact-email-label': 'Email',
      'contact-email-ph': 'Votre email',
      'contact-subject': 'Sujet',
      'contact-subject-ph': 'Sujet de votre message',
      'contact-message': 'Message',
      'contact-message-ph': 'Votre message...',
      'contact-send': 'Envoyer',
      'contact-sending': 'Envoi en cours...',
      'contact-success': 'Message envoyé ! Nous vous répondrons rapidement.',
      'contact-error': 'Erreur lors de l\'envoi, veuillez réessayer.',
   },
   en: {
      'nav-home': 'Home',
      'nav-about': 'About',
      'nav-events': 'Events',
      'nav-traditions': 'Traditions',
      'nav-contact': 'Contact',
      'scroll': 'Scroll',
      'hero-sub': 'LIVE THE',
      'hero-bottom': 'EXPERIENCE',
      'about-title': 'WHO ARE WE?',
      'about-h3': '<span class="text-gradient-light">Harmony</span> in <span class="text-gradient-dark">chaos</span>',
      'about-p1': "Pulsar System is a Bordeaux-based organization established in late 2024, dedicated to redefining event standards across France. Our expertise lies in activating unique venues through a respectful and heritage-conscious approach, elevating Techno performances into unparalleled immersive experiences.",
      'about-p2': "Our DNA is built on precision-led, healthy, and safe organization. Whether you are a techno purist or simply curious, we create spaces where sound meets human connection. Each lineup is curated as a progressive ascent, exploring a vast palette of sonic textures. This stylistic diversity allows us to bring together a passionate and diverse crowd, ensuring every individual finds their place on the dancefloor.",
      'about-p3': "But we don't stop there. Our future lies between radical celebration and scientific outreach, feeding your ears as much as your mind.",
      'events-tag': 'Upcoming',
      'events-title': 'Our Events',
      'events-subtitle': 'Mark your calendar for these special celebrations',
      'event1-title': 'Carol Night',
      'event1-desc': "An evening of classic Christmas carols performed by our community choir under the stars.",
      'event2-title': 'Cookie Exchange',
      'event2-desc': "Bring your favorite holiday treats and swap recipes with neighbors at our annual gathering.",
      'event3-title': 'Candlelight Vigil',
      'event3-desc': "A peaceful Christmas Eve celebration with candlelight, reflection, and seasonal spirit.",
      'trad-tag': 'Cherished',
      'trad-title': 'Holiday Traditions',
      'trad-subtitle': 'The timeless rituals that make Christmas special',
      'trad1-title': 'Decorating the Tree',
      'trad1-desc': "Hanging ornaments collected over the years, each one telling its own story of Christmases past.",
      'trad2-title': 'Secret Gift Exchange',
      'trad2-desc': "Finding the perfect gift for someone special, wrapped with love and anticipation.",
      'trad3-title': 'Hot Cocoa Nights',
      'trad3-desc': "Gathering by the fire with warm mugs, sharing stories as snow falls softly outside.",
      'trad4-title': 'Christmas Feast',
      'trad4-desc': "Gathering around the table with family for a special meal and cherished conversations.",
      'learn-more': 'Learn More',
      'newsletter-tag': 'Stay Updated',
      'newsletter-title': 'Join the Celebration',
      'newsletter-desc': "Subscribe to receive holiday updates, event reminders, and a sprinkle of Christmas magic delivered to your inbox.",
      'newsletter-placeholder': 'Enter your email address',
      'newsletter-btn': 'Subscribe',
      'footer-desc': "Celebrating the magic of Christmas with a live countdown, events, and traditions that bring us together.",
      'footer-nav-title': 'Navigation',
      'footer-res-title': 'Resources',
      'footer-res-1': 'Gift Ideas',
      'footer-res-2': 'Holiday Recipes',
      'footer-res-3': 'Decoration Tips',
      'footer-res-4': 'Event Planning',
      'footer-contact-title': 'Contact',
      'footer-support': 'Support',
      'footer-copy': '© 2025 Pulsar System. All rights reserved.',
      'footer-privacy': 'Privacy Policy',
      'footer-terms': 'Terms of Service',
      'contact-title': 'Contact Us',
      'contact-subtitle': 'A question, a proposal? We will get back to you.',
      'contact-name': 'Name',
      'contact-name-ph': 'Your name',
      'contact-email-label': 'Email',
      'contact-email-ph': 'Your email',
      'contact-subject': 'Subject',
      'contact-subject-ph': 'Subject of your message',
      'contact-message': 'Message',
      'contact-message-ph': 'Your message...',
      'contact-send': 'Send',
      'contact-sending': 'Sending...',
      'contact-success': 'Message sent! We will get back to you shortly.',
      'contact-error': 'Error sending message, please try again.',
   }
};

let currentLang = 'fr';

function switchLang(lang) {
   currentLang = lang;
   document.documentElement.lang = lang;
   const t = translations[lang];

   document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) el.innerHTML = t[key];
   });

   document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (t[key] !== undefined) el.placeholder = t[key];
   });

   document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
   });

   resetReveal();
}

function setupLangToggle() {
   document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => switchLang(btn.getAttribute('data-lang')));
   });
   switchLang('fr');
}

// Scroll reveal
let revealObserver = null;

function resetReveal() {
   if (!revealObserver) return;
   const targets = document.querySelectorAll('.reveal');
   targets.forEach(el => {
      el.classList.remove('visible');
      revealObserver.observe(el);
   });
}

function setupScrollReveal() {
   const targets = document.querySelectorAll(
      '.section-header, .about-image, .about-content, ' +
      '.event-card, .tradition-card, ' +
      '.newsletter-container, .footer-grid, .footer-bottom'
   );

   targets.forEach((el) => {
      el.classList.add('reveal');
      const parent = el.parentElement;
      const siblings = parent ? parent.querySelectorAll('.event-card, .tradition-card') : [];
      if (siblings.length > 1) {
         const idx = Array.from(siblings).indexOf(el);
         if (idx > 0) el.style.transitionDelay = (idx * 0.12) + 's';
      }
   });

   revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
         if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
         }
      });
   }, { threshold: 0.12 });

   targets.forEach(el => revealObserver.observe(el));
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
   createParticles();
   setupNavigation();
   setupNewsletter();
   setupContactForm();
   setupLangToggle();
   setupScrollReveal();
   scrollSpy();
   let scrollTicking = false;
   window.addEventListener('scroll', () => {
      if (!scrollTicking) {
         requestAnimationFrame(() => {
            handleScroll();
            scrollSpy();
            scrollTicking = false;
         });
         scrollTicking = true;
      }
   }, { passive: true });
});