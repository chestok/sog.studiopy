/*
   SOG.STUDIOPY - Premium UI/UX & Frontend Script
   Drives interactive experience, 3D overlays, Lenis inertia scrolling, and GSAP timeline steps.
*/

document.addEventListener('DOMContentLoaded', () => {
  const isMobile = window.matchMedia('(max-width: 768px)').matches 
    || /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Custom Fluid Cursor Elements Implementation
  const cursorDot = document.getElementById('cursor-dot');
  const cursorFollower = document.getElementById('cursor-follower');

  if (!isMobile && cursorDot && cursorFollower && window.matchMedia('(min-width: 768px)').matches) {
    // Hide default OS cursor
    document.body.style.cursor = 'none';

    // Direct positions offscreen initially
    gsap.set([cursorDot, cursorFollower], { xPercent: -50, yPercent: -50, x: -200, y: -200 });

    window.addEventListener('mousemove', (e) => {
      // Fluid response targeting mouse positions with extreme responsiveness
      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.01,
        ease: 'power1.out',
        overwrite: 'auto'
      });
      gsap.to(cursorFollower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.12,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    });

    document.addEventListener('mouseleave', () => {
      gsap.to([cursorDot, cursorFollower], { opacity: 0, scale: 0, duration: 0.15 });
    });
    document.addEventListener('mouseenter', () => {
      gsap.to([cursorDot, cursorFollower], { opacity: 1, scale: 1, duration: 0.15 });
    });

    // Staggered interactive scale elements hover behaviors
    const setupInterstellarCursorHovers = () => {
      const interactives = document.querySelectorAll('a, button, input, select, textarea, .service-card, .three3d-card, .service-filter-chip');
      interactives.forEach(el => {
        el.addEventListener('mouseenter', () => {
          document.body.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
          document.body.classList.remove('cursor-hover');
        });
      });
    };
    setupInterstellarCursorHovers();
  }

  // Premium Spotlight tracking handler with cached bounds for ultra-responsive performance (no layout thrashing)
  const spotlights = document.querySelectorAll('.spotlight-card');
  spotlights.forEach(card => {
    let rect = null;
    card.addEventListener('mouseenter', () => {
      rect = card.getBoundingClientRect();
    });
    card.addEventListener('mousemove', (e) => {
      if (!rect) rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
    card.addEventListener('mouseleave', () => {
      rect = null;
    });
  });

  // Set up Lenis Smooth Scroll - use native fallback on mobile to avoid render blocking
  let lenis;
  if (!isMobile) {
    try {
      lenis = new Lenis({
        duration: 0.85,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom cubic bezier
        smoothWheel: true,
        wheelMultiplier: 1.1,
        touchMultiplier: 1.2,
        infinite: false,
      });
      window.lenis = lenis; // Expose globally for inline onclick scroll handlers

      // Integrated scroll ticker connecting Lenis & GSAP ScrollTrigger
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
      
      // Sync ScrollTrigger with smooth scroll
      if (window.ScrollTrigger) {
        lenis.on('scroll', ScrollTrigger.update);
      }
    } catch (error) {
      console.warn("Smooth scroll Lenis initializing failed, proceeding with standard viewport: ", error);
      lenis = null;
      window.lenis = {
        scrollTo: (target) => {
          const el = typeof target === 'string' ? document.querySelector(target) : target;
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      };
    }
  } else {
    lenis = {
      scrollTo: (target) => {
        const el = typeof target === 'string' ? document.querySelector(target) : target;
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    };
    window.lenis = lenis;
  }

  // Handle smooth navigation for internal anchor links using Lenis ScrollTo
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  internalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return; // Do nothing for empty placeholder hashes
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        
        if (lenis) {
          lenis.scrollTo(targetElement, {
            offset: 0,
            duration: 1.0,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
          });
        } else {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // GSAP Animations Context
  if (window.gsap) {
    gsap.registerPlugin(ScrollTrigger);

    // Fade-in Navbar on page load
    gsap.from('header', {
      y: -20,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out',
      delay: 0.1,
      clearProps: 'transform,opacity'
    });

    // Hero Section staggered enter
    const heroTl = gsap.timeline({ delay: 0.25 });
    heroTl.from('.hero-badge', {
      opacity: 0,
      y: 15,
      duration: 0.5,
      ease: 'power3.out'
    })
    .from('.hero-title', {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power3.out'
    }, '-=0.4')
    .from('.hero-subtext', {
      opacity: 0,
      y: 15,
      duration: 0.5,
      ease: 'power3.out'
    }, '-=0.45')
    .from('.hero-actions', {
      opacity: 0,
      y: 10,
      duration: 0.35,
      ease: 'power3.out'
    }, '-=0.4')
    .from('.hero-scroll-indicator', {
      opacity: 0,
      y: 8,
      duration: 0.3,
      ease: 'power3.out'
    }, '-=0.25');

    if (!isMobile) {
      // Scroll triggering reveals for Services cards
      gsap.from('.service-card', {
        scrollTrigger: {
          id: 'services-reveal',
          trigger: '#servicios',
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 25,
        stagger: 0.08,
        duration: 0.5,
        ease: 'power2.out',
        clearProps: 'opacity,transform'
      });

      // Scroll trigger for Sobre Sebas section elements
      gsap.from('.sobre-sebas-text-content', {
        scrollTrigger: {
          trigger: '#sobre-sebas',
          start: 'top 80%'
        },
        opacity: 0,
        x: 20,
        duration: 0.6,
        ease: 'power3.out'
      });

      gsap.from('.three3d-container', {
        scrollTrigger: {
          trigger: '#sobre-sebas',
          start: 'top 80%'
        },
        opacity: 0,
        x: -30,
        scale: 0.97,
        duration: 0.7,
        ease: 'power3.out'
      });

      // Scroll trigger for Showcase section mockups
      gsap.from('.showcase-main-frame', {
        scrollTrigger: {
          trigger: '#showcase',
          start: 'top 75%'
        },
        opacity: 0,
        y: 35,
        scale: 0.98,
        duration: 0.7,
        ease: 'power3.out'
      });

      gsap.from('.showcase-mobile-frame', {
        scrollTrigger: {
          trigger: '#showcase',
          start: 'top 70%'
        },
        opacity: 0,
        x: 30,
        y: 20,
        duration: 0.7,
        ease: 'power3.out'
      });

      // Parallax background blobs with lower latency scrub
      gsap.to('.glow-blob-1', {
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8
        },
        y: 200,
        x: -100
      });

      gsap.to('.glow-blob-2', {
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.0
        },
        y: -200,
        x: 80
      });
    }

  // 3D Mouse Tilt Interactive Parallax for Sebas' Bio Card ⚠️
  const cardContainer = document.querySelector('.three3d-container');
  const card3d = document.querySelector('.three3d-card');
  const layersFg = document.querySelectorAll('.three3d-layer-fg'); // Sebas Photo
  const layersMid = document.querySelectorAll('.three3d-layer-mid'); // Backdrop text/shapes
  const layersBg = document.querySelectorAll('.three3d-layer-bg'); // Core card base elements

  if (!isMobile && cardContainer && card3d) {
    // Ensure initial transform state is set via GSAP to match CSS and avoid first-frame jumps
    gsap.set(card3d, { rotateX: 0, rotateY: 0, transformPerspective: 1000, transformOrigin: '50% 50%', force3D: true });
    // Preserve CSS translateZ by setting z via GSAP so subsequent x/y animations keep correct depth
    layersFg.forEach(el => gsap.set(el, { x: 0, y: 0, z: 105, force3D: true }));
    layersMid.forEach(el => gsap.set(el, { x: 0, y: 0, z: 50, force3D: true }));
    layersBg.forEach(el => gsap.set(el, { x: 0, y: 0, z: 20, force3D: true }));

    let rect = null;

    cardContainer.addEventListener('mouseenter', () => {
      // don't cache rect here because images or content may still be loading;
      // rect will be calculated/updated inside mousemove when needed
      rect = null;
    });

    cardContainer.addEventListener('mousemove', (e) => {
      // Avoid tilt calculations on mobile or tablet screen sizes for maximum performance and fluid touch scroll
      if (window.matchMedia('(max-width: 1024px)').matches) return;

      // Recompute rect when needed or when dimensions changed (prevents jumps if image loads)
      const currentRect = cardContainer.getBoundingClientRect();
      if (!rect || currentRect.width !== rect.width || currentRect.height !== rect.height) {
        rect = currentRect;
      }
      const x = e.clientX - rect.left; // x position inside the element
      const y = e.clientY - rect.top;  // y position inside the element
      
      // Calculate angles based on mouse offset from center (normalized to -12deg to 12deg)
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateY = ((x - centerX) / centerX) * 12; // horizontal rotation
      const rotateX = -((y - centerY) / centerY) * 12; // vertical rotation
      
      // Apply tilt to the overall card (snappier transition)
      gsap.to(card3d, {
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 1000,
        duration: 0.18,
        ease: 'power2.out',
        overwrite: 'auto'
      });

      // FG elements (Sebas winking image) pop OUT in parallax direction
      const moveX_fg = ((x - centerX) / centerX) * 18;
      const moveY_fg = ((y - centerY) / centerY) * 18;
      layersFg.forEach(el => {
        gsap.to(el, {
          x: moveX_fg,
          y: moveY_fg,
          transformPerspective: 1000,
          duration: 0.18,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      });

      // Mid layers shift slightly less
      const moveX_mid = ((x - centerX) / centerX) * 8;
      const moveY_mid = ((y - centerY) / centerY) * 8;
      layersMid.forEach(el => {
        gsap.to(el, {
          x: moveX_mid,
          y: moveY_mid,
          transformPerspective: 1000,
          duration: 0.18,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      });

      // BG layers shift very minimally opposite
      const moveX_bg = -(((x - centerX) / centerX) * 4);
      const moveY_bg = -(((y - centerY) / centerY) * 4);
      layersBg.forEach(el => {
        gsap.to(el, {
          x: moveX_bg,
          y: moveY_bg,
          duration: 0.18,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      });
    });

    // Reset card transforms when mouse leaves
    cardContainer.addEventListener('mouseleave', () => {
      rect = null;
      gsap.to(card3d, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: 'auto'
      });

      layersFg.forEach(el => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      });

      layersMid.forEach(el => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      });

      layersBg.forEach(el => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      });
    });
  }

  // Mobile navigation drawer toggle
  const menuBtn = document.getElementById('menu-toggle');
  const closeBtn = document.getElementById('menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

  function openMobileMenu() {
    mobileMenu.classList.remove('pointer-events-none');
    
    // Animate glass-backdrop fade-in in parallel using GSAP to prevent flickering
    gsap.to(mobileMenu, {
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out',
      overwrite: 'auto'
    });
    
    // Animate slide-in side panel with extra smooth easing
    gsap.fromTo('.mobile-menu-content', {
      x: '100%',
    }, {
      x: '0%',
      duration: 0.6,
      ease: 'power4.out',
      overwrite: 'auto'
    });

    // Stagger luxury links entrance with subtle scale and 3D rotational lift
    gsap.fromTo(mobileMenuLinks, {
      y: 30,
      opacity: 0,
      rotateX: -15,
      scale: 0.95
    }, {
      y: 0,
      opacity: 1,
      rotateX: 0,
      scale: 1,
      stagger: 0.08,
      delay: 0.15,
      duration: 0.5,
      ease: 'power3.out',
      overwrite: 'auto'
    });
  }

  function closeMobileMenu() {
    // Synchronously fade out glass backdrop and close pointer events
    gsap.to(mobileMenu, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.inOut',
      overwrite: 'auto',
      onComplete: () => {
        mobileMenu.classList.add('pointer-events-none');
      }
    });

    // Simultaneously slide out side drawer panel
    gsap.to('.mobile-menu-content', {
      x: '100%',
      duration: 0.4,
      ease: 'power3.inOut',
      overwrite: 'auto'
    });
  }

  if (menuBtn && mobileMenu && closeBtn) {
    menuBtn.addEventListener('click', openMobileMenu);
    closeBtn.addEventListener('click', closeMobileMenu);
    
    // Close menu when clicking a link
    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  // Premium scroll to hide / reveal header behavior
  let lastScrollY = window.scrollY;
  const headerElement = document.querySelector('header');
  
  if (headerElement) {
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      
      // Determine if the mobile menu is currently open to prevent hiding it
      const isMobileMenuOpen = mobileMenu && mobileMenu.classList.contains('opacity-100');
      
      if (!isMobileMenuOpen) {
        if (currentScrollY > 100 && currentScrollY > lastScrollY) {
          // Scrolling down - hide header (slide it up out of frame)
          headerElement.classList.add('-translate-y-full');
        } else {
          // Scrolling up or near page top (less than 100px) - show header
          headerElement.classList.remove('-translate-y-full');
        }
      }
      
      lastScrollY = currentScrollY;
    }, { passive: true });
  }

  // Interactive Mockups Auto-scrolling on hover or index changes
  const desktopScreen = document.getElementById('desktop-mockup-screen');
  const mobileScreen = document.getElementById('mobile-mockup-screen');

  if (desktopScreen) {
    // Scroll desktop screen down slowly when container is hovered to show content
    desktopScreen.addEventListener('mouseenter', () => {
      const scrollHeight = desktopScreen.scrollHeight - desktopScreen.clientHeight;
      gsap.to(desktopScreen, {
        scrollTop: scrollHeight,
        duration: 8,
        ease: 'power1.inOut',
        overwrite: 'auto'
      });
    });

    desktopScreen.addEventListener('mouseleave', () => {
      gsap.to(desktopScreen, {
        scrollTop: 0,
        duration: 2,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    });
  }

  if (mobileScreen) {
    mobileScreen.addEventListener('mouseenter', () => {
      const scrollHeight = mobileScreen.scrollHeight - mobileScreen.clientHeight;
      gsap.to(mobileScreen, {
        scrollTop: scrollHeight,
        duration: 6,
        ease: 'power1.inOut',
        overwrite: 'auto'
      });
    });

    mobileScreen.addEventListener('mouseleave', () => {
      gsap.to(mobileScreen, {
        scrollTop: 0,
        duration: 1.5,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    });
  }

  // Contact Form Interception with AJax Formspree support
  const contactForm = document.getElementById('premium-contact-form');
  const popupNotification = document.getElementById('success-notification');
  const closePopupBtn = document.getElementById('close-notification');

  if (contactForm && popupNotification) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Perform validation check
      const nameInput = document.getElementById('form-name').value.trim();
      const emailInput = document.getElementById('form-email').value.trim();
      const whatsappInput = document.getElementById('form-whatsapp').value.trim();
      const subjectInput = document.getElementById('form-subject').value;
      const messageInput = document.getElementById('form-message').value.trim();

      if (!nameInput || !emailInput || !messageInput) {
        alert("Por favor completa todos los campos requeridos.");
        return;
      }

      // Play smooth button compression animation & loading states
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const submitBtnText = submitBtn.querySelector('span');
      const originalText = submitBtnText ? submitBtnText.innerText : "Enviar Mensaje";
      
      if (submitBtnText) submitBtnText.innerText = "Enviando...";
      submitBtn.disabled = true;

      gsap.to(submitBtn, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1
      });

      // Submit form data using Fetch
      const formData = {
        nombre: nameInput,
        email: emailInput,
        whatsapp: whatsappInput,
        tipo_proyecto: subjectInput,
        mensaje: messageInput
      };

      fetch(contactForm.action || 'https://formspree.io/f/mwvzaloq', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => {
        if (response.ok) {
          // Show Glassmorphic popup feedback
          popupNotification.classList.remove('invisible', 'opacity-0');
          popupNotification.classList.add('opacity-100');
          
          gsap.fromTo('.notification-card', {
            scale: 0.9,
            y: 30,
            opacity: 0
          }, {
            scale: 1,
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'back.out(1.7)'
          });

          // Reset form fields
          contactForm.reset();
        } else {
          alert('Ups, ocurrió un error al enviar el formulario. Por favor inténtalo de nuevo.');
        }
      })
      .catch(error => {
        console.error('Error enviando formulario:', error);
        alert('Hubo un problema de conexión al enviar el mensaje. Por favor intenta más tarde.');
      })
      .finally(() => {
        if (submitBtnText) submitBtnText.innerText = originalText;
        submitBtn.disabled = false;
      });
    });
  }

  if (closePopupBtn && popupNotification) {
    closePopupBtn.addEventListener('click', () => {
      gsap.to('.notification-card', {
        scale: 0.95,
        y: 20,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          popupNotification.classList.add('invisible', 'opacity-0');
          popupNotification.classList.remove('opacity-100');
        }
      });
    });
  }

  // Interactive services category tab switcher (Bonus Premium feature - smooth filter transition)
  const categoryFilters = document.querySelectorAll('.service-filter-chip');
  const serviceCards = document.querySelectorAll('.service-card');

  if (categoryFilters.length > 0 && serviceCards.length > 0) {
    categoryFilters.forEach(chip => {
      chip.addEventListener('click', () => {
        // Kill the services reveal ScrollTrigger so it doesn't override manual user filter actions
        if (window.ScrollTrigger) {
          const servicesTrigger = ScrollTrigger.getById('services-reveal');
          if (servicesTrigger) {
            servicesTrigger.kill();
          }
        }

        // Toggle selected state
        categoryFilters.forEach(c => c.classList.remove('bg-white', 'text-black'));
        categoryFilters.forEach(c => c.classList.add('bg-white/5', 'text-white/60'));
        
        chip.classList.add('bg-white', 'text-black');
        chip.classList.remove('bg-white/5', 'text-white/60');

        const category = chip.getAttribute('data-filter');

        // Animate grid rebuild elements with GSAP
        serviceCards.forEach(card => {
          const cardCategory = card.getAttribute('data-service-cat');
          if (category === 'all' || cardCategory === category) {
            gsap.to(card, {
              opacity: 1,
              scale: 1,
              y: 0,
              pointerEvents: 'auto',
              display: 'flex',
              duration: 0.4,
              ease: 'power2.out'
            });
          } else {
            gsap.to(card, {
              opacity: 0,
              scale: 0.95,
              y: 15,
              pointerEvents: 'none',
              display: 'none',
              duration: 0.3,
              ease: 'power2.in'
            });
          }
        });
      });
    });
  }

  // Dynamic Premium Typography Swapper for "destacar"
  const dynamicWord = document.getElementById('dynamic-destacar');
  
  if (dynamicWord) {
    const typographyStyles = [
      {
        text: 'destacar',
        classes: ['font-sans', 'font-bold', 'text-white']
      },
      {
        text: 'destacar',
        classes: ['font-serif', 'italic', 'font-medium', 'text-brandBlue', 'lowercase']
      },
      {
        text: 'DESTACAR',
        classes: ['font-sans', 'font-black', 'text-transparent', 'bg-clip-text', 'bg-gradient-to-r', 'from-brandBlue', 'via-white', 'to-brandOrange', 'tracking-tight']
      },
      {
        text: 'destacar',
        classes: ['font-mono', 'text-brandOrange', 'font-medium', 'tracking-[0.05em]', 'lowercase']
      },
      {
        text: 'destacar',
        classes: ['font-sans', 'font-extrabold', 'text-white', 'drop-shadow-[0_0_15px_rgba(126,166,232,0.85)]']
      },
      {
        text: 'DESTACAR',
        classes: ['font-sans', 'font-extrabold', 'text-transparent', 'tracking-normal', '[-webkit-text-stroke:1px_rgba(255,255,255,0.85)]']
      },
      {
        text: '[destacar]',
        classes: ['font-mono', 'text-white/90', 'tracking-tighter', 'font-semibold']
      },
      {
        text: 'destacar',
        classes: ['font-serif', 'italic', 'font-bold', 'text-brandOrange', 'lowercase']
      },
      {
        text: 'DESTACAR',
        classes: ['font-sans', 'font-black', 'tracking-wider', 'text-brandBlue', 'uppercase']
      },
      {
        text: 'destacar',
        classes: ['font-sans', 'font-light', 'tracking-tight', 'text-white/80']
      }
    ];

    let currentStyleIndex = 0;

    const changeTypographyStyle = () => {
      // Smooth Fade out, blur & vertical shift morph effect
      gsap.to(dynamicWord, {
        opacity: 0,
        filter: 'blur(8px)',
        scale: 0.92,
        y: -10,
        duration: 0.45,
        ease: 'power2.in',
        onComplete: () => {
          // Increment style index
          currentStyleIndex = (currentStyleIndex + 1) % typographyStyles.length;
          const nextStyle = typographyStyles[currentStyleIndex];

          // Reset the element class list back to basic block
          dynamicWord.className = 'inline-block whitespace-nowrap';
          
          // Direct load next classes
          nextStyle.classes.forEach(cls => {
            dynamicWord.classList.add(cls);
          });

          // Set text content
          dynamicWord.innerText = nextStyle.text;

          // Smooth Fade in, unblur, scale up, and reset vertical position
          gsap.fromTo(dynamicWord, {
            opacity: 0,
            filter: 'blur(8px)',
            scale: 0.92,
            y: 10
          }, {
            opacity: 1,
            filter: 'blur(0px)',
            scale: 1,
            y: 0,
            duration: 0.55,
            ease: 'power3.out'
          });
        }
      });
    };

    // Auto-swap styles every 3.5 seconds
    setInterval(changeTypographyStyle, 3500);
  }

  // Page preloader fade-out and load safety handler
  const preloader = document.getElementById('page-preloader');
  const preloaderBar = document.querySelector('.preloader-progress-bar');
  let preloaderRemoved = false;

  const removePreloader = () => {
    if (!preloader || preloaderRemoved) return;
    preloaderRemoved = true;

    preloader.classList.add('page-preloader-hidden');
    document.body.classList.remove('preloader-active');

    if (window.gsap) {
      gsap.to(preloader, {
        autoAlpha: 0,
        duration: 0.85,
        ease: 'power2.out',
        onComplete: () => {
          preloader.remove();
        }
      });
      gsap.to(preloaderBar, {
        width: '100%',
        duration: 0.4,
        ease: 'power2.out'
      });
    } else {
      preloader.style.opacity = '0';
      preloader.style.visibility = 'hidden';
      setTimeout(() => preloader.remove(), 900);
    }
  };

  const preloaderTimeout = setTimeout(() => {
    removePreloader();
  }, isMobile ? 4500 : 6500);

  window.addEventListener('DOMContentLoaded', () => {
    if (isMobile) {
      setTimeout(removePreloader, 2500);
    }
  });

  window.addEventListener('load', () => {
    if (window.ScrollTrigger) {
      ScrollTrigger.refresh();
    }
    clearTimeout(preloaderTimeout);
    removePreloader();
  });
  }
});
