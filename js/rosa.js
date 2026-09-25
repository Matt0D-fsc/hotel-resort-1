(() => {
  const hero = document.querySelector('.rosa-hero');
  const film = document.querySelector('[data-native-film]');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // The guest sees resort footage only: no iframe, platform chrome, controls or audio.
  if (film && !reduceMotion) {
    film.muted = true;
    film.setAttribute('aria-hidden', 'true');
    const visibility = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) film.play().catch(() => {});
      else film.pause();
    }, { threshold: .05 });
    visibility.observe(film);
  }

  const property = document.querySelector('.rosa-properties');
  if (property) {
    const frames = [...property.querySelectorAll('.rosa-properties__media img')];
    const links = [...property.querySelectorAll('[data-property]')];
    const activate = (index) => {
      frames.forEach((frame, i) => frame.classList.toggle('is-active', i === index));
      links.forEach((link, i) => link.classList.toggle('is-active', i + 1 === index));
    };
    links.forEach((link) => {
      const index = Number(link.dataset.property);
      link.addEventListener('mouseenter', () => activate(index));
      link.addEventListener('focus', () => activate(index));
    });
    property.addEventListener('mouseleave', () => activate(0));
  }

  if (!window.gsap || !window.ScrollTrigger || reduceMotion) return;
  gsap.registerPlugin(ScrollTrigger);

  if (hero) {
    const mask = hero.querySelector('.rosa-hero__mask');
    const opening = hero.querySelector('.rosa-hero__opening');
    const after = hero.querySelector('.rosa-hero__after');
    const circleStart = () => innerWidth <= 600 ? 'circle(42vw at 50% 107%)' : innerWidth <= 800 ? 'circle(29vw at 50% 105%)' : 'circle(19vw at 50% 116%)';
    const circleEnd = () => `circle(${Math.ceil(Math.hypot(innerWidth, innerHeight))}px at 50% 50%)`;

    // Rosa M01: the first scroll advances a circle into a seamless full-screen film.
    const heroScroll = gsap.timeline({ scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom bottom', scrub: 1, invalidateOnRefresh: true } });
    heroScroll.fromTo(mask, { clipPath: circleStart }, { clipPath: circleEnd, ease: 'none', duration: .65 }, 0);
    heroScroll.to(opening, { opacity: 0, y: -70, ease: 'none', duration: .19, pointerEvents: 'none' }, .03);
    heroScroll.fromTo(after, { opacity: 0, y: 44 }, { opacity: 1, y: 0, ease: 'none', duration: .2 }, .48);
    heroScroll.to(after, { opacity: 0, y: -40, ease: 'none', duration: .15 }, .84);

    // Rosa M02: restrained light-sans / italic-serif title, in two staggered lines.
    const title = opening.querySelectorAll('h1 span,h1 em');
    gsap.from(title, { y: 58, opacity: 0, duration: 1.35, stagger: .12, ease: 'expo.out', clearProps: 'transform,opacity' });
    gsap.from(opening.querySelectorAll('.rosa-overline,.rosa-hero__reserve'), { y: 22, opacity: 0, duration: .9, stagger: .13, delay: .2, ease: 'expo.out', clearProps: 'transform,opacity' });
  }

  // One reveal language, with the imagery doing the visual work.
  gsap.utils.toArray('.rosa-welcome p,.rosa-properties__heading,.rosa-statement h2,.rosa-collage__copy,.rosa-collage__aside,.rosa-experiences__intro,.rosa-dining__content,.rosa-discover__head,.rosa-close h2').forEach((item) => {
    gsap.from(item, { y: 60, opacity: 0, duration: 1.15, ease: 'expo.out', scrollTrigger: { trigger: item, start: 'top 88%', once: true } });
  });
  gsap.utils.toArray('.rosa-collage figure,.rosa-experience,.rosa-discover__card').forEach((item, index) => {
    gsap.from(item, { y: 50, opacity: 0, duration: 1.2, delay: index % 2 ? .1 : 0, ease: 'expo.out', scrollTrigger: { trigger: item, start: 'top 90%', once: true } });
  });
  if (property) gsap.from(property.querySelector('.rosa-properties__choices'), { y: 40, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: property, start: 'top 55%', once: true } });

  addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
})();
