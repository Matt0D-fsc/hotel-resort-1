(() => {
  const page = document.body.dataset.page || "home";
  const root = document.querySelector("#site-header");
  const footerRoot = document.querySelector("#site-footer");
  const nav = [
    ["The stays", "stays.html", "stays"],
    ["Experiences", "experiences.html", "experiences"],
    ["Dining", "dining.html", "dining"],
    ["Our story", "story.html", "story"],
  ];
  const navLinks = nav.map(([label, href, key]) => `<a href="${href}" ${page === key ? 'aria-current="page"' : ""}>${label}</a>`).join("");
  const brand = `<a class="brand" href="index.html" aria-label="Mermaid Beach Resort, home"><img class="brand__mark" src="assets/logo-mark.svg" alt=""><span class="brand__text">Mermaid<small>BEACH RESORT</small></span></a>`;

  root.innerHTML = `${brand}<nav class="desktop-nav" aria-label="Main navigation">${navLinks}</nav><div class="header-actions"><a class="button header-book" href="book.html">Request a stay <span aria-hidden="true">↗</span></a><button class="menu-toggle" type="button" aria-label="Open menu" aria-controls="mobile-menu" aria-expanded="false"><span>Menu</span><span class="menu-toggle__lines"><span></span><span></span></span></button></div>`;
  const hasVisualHero = Boolean(document.querySelector(".hero__sticky,.page-hero"));
  root.classList.add("site-header");
  if (hasVisualHero) root.classList.add("is-hero");
  root.insertAdjacentHTML("afterend", `<div id="mobile-menu" class="mobile-menu"><nav aria-label="Mobile navigation"><a href="index.html">Home</a>${navLinks}<a href="book.html">Request a stay</a></nav><div class="mobile-menu__foot">Pechardwip, Marine Drive Road, Cox's Bazar<br><a href="tel:+8801841416467">+880 1841 416467</a></div></div><a class="button button--dark mobile-book" href="book.html">Plan your stay <span aria-hidden="true">↗</span></a><div class="scroll-progress" aria-hidden="true"></div>`);
  footerRoot.innerHTML = `<div class="container"><div class="footer-grid"><div><p class="footer-brand">Mermaid.</p><p>A little further from the everyday.<br>Right where the land meets the sea.</p></div><div><h3>Discover</h3><ul><li><a href="stays.html">The stays</a></li><li><a href="experiences.html">Experiences</a></li><li><a href="dining.html">Dining</a></li><li><a href="story.html">Our story</a></li></ul></div><div><h3>Plan a visit</h3><ul><li><a href="book.html">Request a stay</a></li><li><a href="tel:+8801841416467">Call reservations</a></li><li><a href="https://maps.google.com/?q=21.297318,92.051422" target="_blank" rel="noopener">Find us</a></li></ul></div><div><h3>Mermaid Beach Resort</h3><p>Pechardwip, Marine Drive Road<br>Cox's Bazar–4730, Bangladesh</p><p>Reservations<br><a href="tel:+8801841416467">+880 1841 416467</a><br><a href="tel:+8801841416468">+880 1841 416468</a></p></div></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} Mermaid Beach Resort · Design concept</span><span>Made for the slower moments · Cox's Bazar, Bangladesh</span></div></div>`;
  footerRoot.classList.add("site-footer");

  const menuButton = root.querySelector(".menu-toggle");
  const menu = document.querySelector("#mobile-menu");
  function setMenu(open) {
    document.body.classList.toggle("menu-open", open);
    menu.classList.toggle("is-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menuButton.querySelector(":scope > span:first-child").textContent = open ? "Close" : "Menu";
    if (window.siteLenis) open ? window.siteLenis.stop() : window.siteLenis.start();
  }
  menuButton.addEventListener("click", () => setMenu(!menu.classList.contains("is-open")));
  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") setMenu(false); });

  let previousScroll = window.scrollY;
  let ticking = false;
  const progress = document.querySelector(".scroll-progress");
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      const isHero = hasVisualHero && y < Math.max(80, (document.querySelector(".hero__sticky,.page-hero")?.offsetHeight || 0) - 100);
      root.classList.toggle("is-hero", isHero && !menu.classList.contains("is-open"));
      root.classList.toggle("is-solid", y > 48 || menu.classList.contains("is-open"));
      if (Math.abs(y - previousScroll) > 6 && y > 250 && !menu.classList.contains("is-open")) {
        root.classList.toggle("is-hidden", y > previousScroll);
      } else if (y < 100) root.classList.remove("is-hidden");
      previousScroll = y;
      progress.style.width = `${100 * y / Math.max(1, document.documentElement.scrollHeight - innerHeight)}%`;
      ticking = false;
    });
  }
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // M07 (Rosa) — touch-friendly, draggable experience cards with .6s expoOut settle.
  const rail = document.querySelector(".experience-rail");
  if (rail) {
    let down = false, startX = 0, startLeft = 0, moved = false;
    rail.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "touch") return;
      down = true; moved = false; startX = event.clientX; startLeft = rail.scrollLeft;
      rail.classList.add("is-dragging"); rail.setPointerCapture(event.pointerId);
    });
    rail.addEventListener("pointermove", (event) => {
      if (!down) return;
      const delta = event.clientX - startX;
      if (Math.abs(delta) > 5) moved = true;
      rail.scrollLeft = startLeft - delta;
    });
    const finish = () => { down = false; rail.classList.remove("is-dragging"); };
    rail.addEventListener("pointerup", finish);
    rail.addEventListener("pointercancel", finish);
    rail.querySelectorAll("a").forEach((a) => a.addEventListener("click", (event) => { if (moved) { event.preventDefault(); moved = false; } }));
    document.querySelectorAll("[data-rail-dir]").forEach((button) => button.addEventListener("click", () => {
      rail.scrollBy({ left: Number(button.dataset.railDir) * Math.min(510, rail.clientWidth * .78), behavior: "smooth" });
    }));
  }

  document.querySelectorAll("[data-stay-filter]").forEach((button) => button.addEventListener("click", () => {
    const filter = button.dataset.stayFilter;
    document.querySelectorAll("[data-stay-filter]").forEach((item) => {
      item.classList.toggle("is-active", item === button);
      item.setAttribute("aria-pressed", String(item === button));
    });
    document.querySelectorAll(".stay-entry").forEach((item) => { item.hidden = filter !== "all" && item.dataset.category !== filter; });
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  }));

  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion && window.Lenis && innerWidth >= 801) {
    // Requested Lenis integration; one RAF from GSAP's ticker, never a second RAF loop.
    window.siteLenis = new Lenis({ lerp: .1, smoothWheel: true, wheelMultiplier: 1, autoRaf: false });
    if (window.ScrollTrigger) window.siteLenis.on("scroll", ScrollTrigger.update);
    if (window.gsap) {
      gsap.ticker.add((time) => window.siteLenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }
  }
  if (!window.gsap || !window.ScrollTrigger || reduceMotion) return;
  gsap.registerPlugin(ScrollTrigger);

  const expoOut = "expo.out";
  // M01/M02 (Rosa) — slow hero world view and line entrances.
  const hero = document.querySelector(".hero,.page-hero");
  if (hero) {
    const media = hero.querySelector(".hero__media,.page-hero__media");
    const title = hero.querySelector("h1");
    const eyebrow = hero.querySelector(".eyebrow");
    if (media) {
      gsap.fromTo(media, { scale: 1.09 }, { scale: 1, duration: 1.4, ease: expoOut });
      gsap.to(media, { yPercent: 10, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 1 } });
    }
    const sequence = gsap.timeline({ defaults: { ease: expoOut } });
    if (eyebrow) sequence.from(eyebrow, { y: 24, opacity: 0, duration: .8 }, .15);
    if (title) sequence.from(title, { y: 48, opacity: 0, duration: 1.4 }, .25);
    sequence.from(hero.querySelectorAll(".hero__aside,.hero__bottom,.page-hero__bottom"), { y: 22, opacity: 0, duration: .8, stagger: .12 }, .75);
  }

  // M04 (Rosa) — shallow, individual image parallax; small images travel farther.
  gsap.utils.toArray("[data-parallax]").forEach((image) => {
    const small = image.dataset.parallax === "small";
    gsap.fromTo(image, { yPercent: small ? 9 : 5 }, { yPercent: small ? -9 : -5, ease: "none", scrollTrigger: { trigger: image, start: "top bottom", end: "bottom top", scrub: 1 } });
  });

  // M03 (Rosa) — property card entrance, .8s expoInOut with .1s follow-through.
  gsap.utils.toArray(".stay-tile,.stay-entry,.package-card,.story-grid figure").forEach((item) => {
    gsap.from(item, { y: 55, opacity: 0, duration: .8, ease: "expo.out", scrollTrigger: { trigger: item, start: "top 88%", once: true } });
  });
  gsap.utils.toArray(".reveal").forEach((item) => {
    gsap.from(item, { y: 38, opacity: 0, duration: 1, ease: expoOut, scrollTrigger: { trigger: item, start: "top 88%", once: true } });
  });

  // Serotoninn M07-c/d adapted — 30→440% tide aperture; media 1.2→1 in the first 30%.
  const tide = document.querySelector(".tide");
  if (tide) {
    const portal = tide.querySelector(".tide__portal");
    const image = portal.querySelector("img");
    const isMobile = innerWidth <= 600;
    const startRadius = isMobile ? 45 : 15; // donor width 90% mobile / 30% desktop
    const endRadius = isMobile ? 500 : 220; // donor width 1000% mobile / 440% desktop
    gsap.fromTo(portal, { clipPath: `circle(${startRadius}% at 50% 52%)` }, { clipPath: `circle(${endRadius}% at 50% 52%)`, ease: "none", scrollTrigger: { trigger: tide, start: "top top", end: "bottom bottom", scrub: 1 } });
    gsap.fromTo(image, { scale: 1.2 }, { scale: 1, ease: "none", scrollTrigger: { trigger: tide, start: "top top", end: () => `+=${Math.max(1, (tide.offsetHeight - innerHeight) * .3)}`, scrub: 1 } });
    gsap.fromTo(tide.querySelector(".tide__caption"), { opacity: 0, y: 35 }, { opacity: 1, y: 0, ease: "none", scrollTrigger: { trigger: tide, start: "60% top", end: "80% top", scrub: 1 } });
  }

  // M05 (Rosa) — one headline becomes legible character by character through scroll.
  document.querySelectorAll("[data-char-emphasis]").forEach((heading) => {
    const label = heading.textContent.trim();
    heading.setAttribute("aria-label", label);
    heading.replaceChildren();
    label.split(/\s+/).forEach((word, wordIndex) => {
      if (wordIndex) heading.append(document.createTextNode(" "));
      const wordElement = document.createElement("span");
      wordElement.className = "word";
      wordElement.setAttribute("aria-hidden", "true");
      for (const letter of word) {
        const character = document.createElement("span");
        character.className = "char";
        character.textContent = letter;
        wordElement.append(character);
      }
      heading.append(wordElement);
    });
    const chars = [...heading.querySelectorAll(".char")];
    chars.forEach((char) => { char.style.opacity = ".25"; });
    ScrollTrigger.create({ trigger: heading, start: "top 85%", end: "bottom 25%", onUpdate: ({ progress: p }) => {
      chars.forEach((char, index) => {
        const threshold = (index / Math.max(1, chars.length - 1)) * .84;
        char.style.opacity = String(.25 + .75 * Math.min(1, Math.max(0, (p - threshold) / .16)));
      });
    } });
  });

  // M06 (Rosa) — restrained sensory media scale.
  gsap.utils.toArray(".dining-feature__image").forEach((image) => {
    gsap.fromTo(image, { scale: 1.1 }, { scale: 1, ease: "none", scrollTrigger: { trigger: image.parentElement, start: "top bottom", end: "bottom top", scrub: 1 } });
  });
  addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
})();
