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
   form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const btn = form.querySelector('button[type="submit"]');
      const email = input.value.trim();
      const originalText = btn.textContent;
      btn.textContent = '...';
      btn.disabled = true;
      try {
         const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'Accept': 'application/json',
               'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiZDAyNjY3ZGM0MzZjYTNmYTc1NGIwM2VlMTBhZTY2NzYxYjE0YzIxOWNhNDRjYmRjODQ3ZjliMTgzMDNjNjE3OTc0YmNmYWQ1YTBkMzJiYmEiLCJpYXQiOjE3NzIzOTI5OTIuMTQ4ODU4LCJuYmYiOjE3NzIzOTI5OTIuMTQ4ODYsImV4cCI6NDkyODA2NjU5Mi4xNDQ2MDEsInN1YiI6IjE4NDA1MjQiLCJzY29wZXMiOltdfQ.ajq5zU4kShqLQ31QOiYxIShq-8hzqHFd7cono6MMBhhlg4YgKCJ_I-5Jc2p4zZWRDKy5y82XeJdRl1xGaSsTbrQSFXVW-330ONqXXHatD1ROQX76k79DShFBCpLq5j6Qt9afhiEK-kVeG6NIojl-u9oP3VE38PATKnRJOQkcQi5wEIl45gPk4HWCGigapU3M9h89LPlRRxYuAV61pulqG_kDWrAzZ8i48m4U7bNmEc_HtpYlnCTOiYQ9yOhz49TmFYVRSXqlno77Z26DUppM0zRv3TwvdGRtESY5a3X7ypyapMvi-R_Kx3_szSWRdXGytIXPIdZPtBlxXoPnv_T29WxEu19hSa-BldaWCHEfaFU7Y9OdoqNozIB7ZV7IucNN_zS_YMKs8lT4on80WUgdPE5uInjdX1SDNLpAsfblVuHP4xvqUtuLrx7HSoMUvfS3tSPgA-nMk9rfY-7yIfphMJJN6eNytGWS_aMpY1xPh6IldDjozi83NvNxvcRsqch5K5LF2C-tLtRWr4FO-h8C12ze-vtps9pqbO4egH17xgkBx75MiCtIHESTeQUD7u1NFp3y7mKv0SrZqmSMblxgzxboUDi95EnqQ7gJPw06wpzzyutGOnxCMt2ZxXqmeGu2rcF9XDRJ6c6TN2im6GWgLWCI8u7eIB_Z7_HsuL7stFM'
            },
            body: JSON.stringify({ email: email, groups: ['180767113275769899'] })
         });
         if (response.status === 200 || response.status === 201) {
            btn.textContent = '✓ Inscrit !';
            input.value = '';
            setTimeout(() => { btn.textContent = originalText; btn.disabled = false; }, 3000);
         } else {
            throw new Error('failed');
         }
      } catch {
         btn.textContent = 'Erreur, réessaie';
         setTimeout(() => { btn.textContent = originalText; btn.disabled = false; }, 3000);
      }
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
      'nav-home': 'Accueil',
      'nav-about': 'À propos',
      'nav-events': 'Événements',
      'nav-traditions': 'Rejoins-nous',
      'nav-contact': 'Contact',
      'scroll': 'Scroll',
      'hero-sub': "VIS L'EXPÉRIENCE",
      'hero-bottom': '',
      'about-title': 'QUI SOMMES-NOUS ?',
      'about-h3': "L'<span class=\"text-gradient-light\">harmonie</span> dans le <span class=\"text-gradient-dark\">chaos</span>",
      'about-p1': "Pulsar System, c'est l'énergie d'un collectif bordelais né fin 2024 avec l'ambition de redéfinir la fête et faire vibrer la France entière. Notre spécialité ? Investir des lieux atypiques pour transformer chaque set Techno en une expérience immersive unique.",
      'about-p2': "Notre ADN repose sur une organisation millimétrée, saine et 100% safe. Que vous soyez puristes ou simples curieux, nous créons des espaces où le son rencontre l'humain. Chaque programmation est pensée pour être une ascension progressive, explorant une large palette de textures sonores. Cette diversité de styles nous permet de rassembler un public hétérogène et passionné, où chaque profil trouve sa place sur le dancefloor.",
      'about-p3': "Mais nous ne nous arrêtons pas là. Notre futur s'écrit entre fête radicale et médiation scientifique, pour nourrir vos oreilles autant que votre esprit.",
      'events-tag': 'À venir',
      'events-title': 'Nos Événements',
      'events-subtitle': 'Marque ton agenda pour nos prochains atterrissages.',
      'event1-title': 'Soirée Chorale',
      'event1-desc': "Une soirée de chants de Noël classiques interprétés par notre chorale communautaire sous les étoiles.",
      'event2-title': 'Échange de Biscuits',
      'event2-desc': "Apportez vos gourmandises préférées et échangez vos recettes lors de notre rassemblement annuel.",
      'event3-title': 'Veillée aux Bougies',
      'event3-desc': "Une célébration paisible de la veille de Noël avec des bougies, de la réflexion et l'esprit des fêtes.",
      'trad-tag': 'Traditions',
      'trad-title': 'Rejoins-nous',
      'trad-subtitle': "Vivre l'événement, c'est bien. Le créer, c'est mieux.",
      'trad1-title': 'Candidature bénévole',
      'trad1-desc': "Pulsar System, c'est avant tout une aventure humaine. Tu veux vivre l'expérience de l'intérieur et nous aider à rendre la fête plus belle ? On t'attend !",
      'trad2-title': 'Candidature DJ',
      'trad2-desc': "Tu es DJ et tu souhaites mixer pour Pulsar System ? Ce formulaire est pour toi. Nous sommes régulièrement en recherche de nouveaux talents pour enflammer nos événements !",
      'trad3-title': 'Soirées Chocolat Chaud',
      'trad3-desc': "Se réunir près du feu avec des tasses chaudes, partager des histoires pendant que la neige tombe doucement.",
      'trad4-title': 'Festin de Noël',
      'trad4-desc': "Se retrouver autour de la table en famille pour un repas spécial et des conversations chaleureuses.",
      'learn-more': 'En savoir plus',
      'newsletter-tag': 'Restez Informés',
      'newsletter-title': 'Entre dans le système',
      'newsletter-desc': "Intercepte le signal avant tout le monde. En rejoignant le Système, tu accèdes aux coordonnées des lieux tenus secrets et aux ouvertures de billetterie avant l'annonce officielle.",
      'newsletter-placeholder': 'Ton adresse email',
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
      'contact-title': 'Contacte-nous',
      'contact-subtitle': 'Une question, une proposition ? On te répond.',
      'contact-name': 'Nom',
      'contact-name-ph': 'Ton nom',
      'contact-email-label': 'Email',
      'contact-email-ph': 'Ton email',
      'contact-subject': 'Sujet',
      'contact-subject-ph': 'Sujet de ton message',
      'contact-message': 'Message',
      'contact-message-ph': 'Ton message...',
      'contact-send': 'Envoyer',
      'contact-sending': 'Envoi en cours...',
      'contact-success': 'Message envoyé ! On te répond rapidement.',
      'contact-error': 'Erreur lors de l\'envoi, veuillez réessayer.',
   },
   en: {
      'nav-home': 'Home',
      'nav-about': 'About',
      'nav-events': 'Events',
      'nav-traditions': 'Join Us',
      'nav-contact': 'Contact',
      'scroll': 'Scroll',
      'hero-sub': 'LIVE THE',
      'hero-bottom': 'EXPERIENCE',
      'about-title': 'WHO ARE WE?',
      'about-h3': '<span class="text-gradient-light">Harmony</span> in <span class="text-gradient-dark">chaos</span>',
      'about-p1': "Pulsar System is a Bordeaux-based collective born in late 2024, with the ambition to redefine the party and make all of France vibrate. Our specialty? Taking over unique venues to transform every Techno set into a one-of-a-kind immersive experience.",
      'about-p2': "Our DNA is built on precision-led, healthy, and 100% safe organisation. Whether you are a techno purist or simply curious, we create spaces where sound meets human connection. Each lineup is crafted as a progressive ascent, exploring a wide palette of sonic textures. This stylistic diversity brings together a passionate and diverse crowd, where everyone finds their place on the dancefloor.",
      'about-p3': "But we don't stop there. Our future lies between radical celebration and scientific outreach, feeding your ears as much as your mind.",
      'events-tag': 'Upcoming',
      'events-title': 'Our Events',
      'events-subtitle': 'Mark your calendar for our upcoming landings.',
      'event1-title': 'Soirée Chorale',
      'event1-desc': "An evening of classic Christmas carols performed by our community choir under the stars.",
      'event2-title': 'Échange de Biscuits',
      'event2-desc': "Bring your favourite treats and swap recipes with fellow attendees at our annual gathering.",
      'event3-title': 'Veillée aux Bougies',
      'event3-desc': "A peaceful celebration with candlelight, reflection, and the spirit of the season.",
      'trad-tag': 'Join',
      'trad-title': 'Join Us',
      'trad-subtitle': "Experiencing the event is great. Creating it is better.",
      'trad1-title': 'Volunteer Application',
      'trad1-desc': "Pulsar System is above all a human adventure. Want to experience it from the inside and help make the party even better? We're waiting for you!",
      'trad2-title': 'DJ Application',
      'trad2-desc': "Are you a DJ looking to play for Pulsar System? This form is for you. We're always on the lookout for new talent to ignite our events!",
      'learn-more': 'Learn More',
      'newsletter-tag': 'Stay Updated',
      'newsletter-title': 'Enter the System',
      'newsletter-desc': "Intercept the signal before everyone else. Don't ride the shockwave — anticipate it. By joining the System, you get access to secret venue coordinates and ticket drops before the official announcement.",
      'newsletter-placeholder': 'Your email address',
      'newsletter-btn': 'Subscribe',
      'footer-desc': "A Bordeaux-based collective redefining the techno experience across France.",
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

// Hero video — gestion autoplay, loop distante, onglet caché
function setupVideo() {
   const video = document.querySelector('.hero-video');
   if (!video) return;

   const tryPlay = () => video.play().catch(() => {});

   // Fallback loop manuel (si le seek échoue sur la vidéo distante)
   video.addEventListener('ended', () => {
      video.currentTime = 0;
      tryPlay();
   });

   // Reprend quand l'onglet redevient visible
   document.addEventListener('visibilitychange', () => {
      if (!document.hidden && video.paused) tryPlay();
   });

   // Reprend quand la fenêtre reprend le focus
   window.addEventListener('focus', () => {
      if (video.paused) tryPlay();
   });

   // Watchdog léger
   setInterval(() => {
      if (video.paused && !document.hidden) tryPlay();
   }, 1000);
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
   setupVideo();
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