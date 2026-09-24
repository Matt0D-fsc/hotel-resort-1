(() => {
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const rules = [...document.querySelectorAll(".ink-rule")];
  if (reduceMotion || !("IntersectionObserver" in window)) {
    rules.forEach((rule) => rule.classList.add("is-drawn"));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-drawn");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -12% 0px" });
    rules.forEach((rule) => observer.observe(rule));
  }

  if (!window.gsap || !window.ScrollTrigger || reduceMotion) return;
  gsap.registerPlugin(ScrollTrigger);

  // Da Maria M00 — the whole page enters and leaves like a turned journal sheet.
  const sheet = document.querySelector("main");
  if (sheet) {
    gsap.fromTo(sheet, { autoAlpha: 0, x: "12rem", y: "-12rem", rotation: -8, transformOrigin: "50% 0%" }, {
      autoAlpha: 1, x: 0, y: 0, rotation: 0, duration: .7, delay: .08, ease: "back.out(2)",
      onComplete: () => ScrollTrigger.refresh()
    });
    document.addEventListener("click", (event) => {
      const link = event.target.closest("a[href]");
      if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey || link.target === "_blank" || link.hasAttribute("download")) return;
      const target = new URL(link.href, location.href);
      if (target.origin !== location.origin || !target.pathname.endsWith(".html") || target.pathname === location.pathname && target.search === location.search) return;
      event.preventDefault();
      if (window.siteLenis) window.siteLenis.stop();
      gsap.to(sheet, { x: "-10rem", y: "10rem", rotation: 6, autoAlpha: 0, duration: .6, ease: "power1.out", onComplete: () => { location.href = target.href; } });
    });
  }

  // Da Maria M01 — .6s/.08 character entrance and .8s ruled-grid construction.
  const coverTitle = document.querySelector(".cover__masthead h1");
  if (coverTitle) {
    const label = coverTitle.textContent;
    coverTitle.setAttribute("aria-label", label);
    coverTitle.replaceChildren(...[...label].map((letter) => {
      const span = document.createElement("span");
      span.className = "cover__char";
      span.setAttribute("aria-hidden", "true");
      span.textContent = letter;
      return span;
    }));
    gsap.from(coverTitle.querySelectorAll(".cover__char"), { opacity: 0, x: ".75rem", duration: .6, ease: "sine.out", stagger: .08, delay: .35 });
    gsap.fromTo(".cover__imageframe>img", { scale: 1.12 }, { scale: 1, duration: 1.2, ease: "power3.out", delay: .4 });
    gsap.from(".cover__seal", { scale: .3, rotation: -180, opacity: 0, duration: .8, ease: "back.out(1.7)", delay: .9 });
  }
  document.querySelectorAll("[data-edition-title]").forEach((title) => {
    const label = title.textContent.trim();
    title.setAttribute("aria-label", label);
    const fragments = [];
    [...title.childNodes].forEach((node) => {
      const emphasized = node.nodeType === Node.ELEMENT_NODE && node.nodeName.toLowerCase() === "em";
      const text = node.textContent.trim();
      if (!text) return;
      const group = emphasized ? document.createElement("em") : document.createDocumentFragment();
      text.split(/\s+/).forEach((word, index) => {
        if (index || fragments.length) group.append(document.createTextNode(" "));
        const wrapper = document.createElement("span");
        wrapper.className = "edition-word";
        wrapper.setAttribute("aria-hidden", "true");
        for (const letter of word) {
          const char = document.createElement("span");
          char.className = "edition-char";
          char.textContent = letter;
          wrapper.append(char);
        }
        group.append(wrapper);
      });
      fragments.push(group);
    });
    title.replaceChildren(...fragments);
    gsap.from(title.querySelectorAll(".edition-char"), { opacity: 0, x: ".75rem", duration: .4, ease: "sine.out", stagger: .05, scrollTrigger: { trigger: title, start: "top 75%", once: true } });
  });

  // Krem Kanel M02 — an organic shoreline rises by half its own height on scroll.
  const cover = document.querySelector(".cover");
  if (cover) {
    if (innerWidth > 600) {
      gsap.fromTo(".cover__tide", { yPercent: 0 }, { yPercent: 50, ease: "none", scrollTrigger: { trigger: cover, start: "top top", end: "bottom top", scrub: 1 } });
      gsap.to(".cover__imageframe>img", { yPercent: 9, ease: "none", scrollTrigger: { trigger: cover, start: "top top", end: "bottom top", scrub: 1 } });
    }
  }

  // Flor Porto M02 — dawn, open afternoon and dinner crossfade as one day unfolds.
  const cycle = document.querySelector(".day-cycle");
  if (cycle) {
    const images = [...cycle.querySelectorAll(".day-cycle__image")];
    const stories = [...cycle.querySelectorAll(".day-cycle__story")];
    const timeline = gsap.timeline({ scrollTrigger: { trigger: cycle, start: "top top", end: "bottom bottom", scrub: 1 } });
    timeline.to(images[0], { opacity: 0, duration: .27, ease: "none" }, .22)
      .to(images[1], { opacity: 1, duration: .27, ease: "none" }, .22)
      .to(stories[0], { opacity: 0, y: -35, duration: .17, ease: "none" }, .22)
      .fromTo(stories[1], { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: .17, ease: "none" }, .37)
      .to(images[1], { opacity: 0, duration: .27, ease: "none" }, .61)
      .to(images[2], { opacity: 1, duration: .27, ease: "none" }, .61)
      .to(stories[1], { opacity: 0, y: -35, duration: .17, ease: "none" }, .61)
      .fromTo(stories[2], { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: .17, ease: "none" }, .76)
      .to(cycle.querySelector(".day-cycle__progress i"), { width: "100%", duration: 1, ease: "none" }, 0);
  }

  // HORECA Social M03 — real room photographs occupy folios that recede into depth.
  const folios = [...document.querySelectorAll(".folio")];
  folios.slice(0, -1).forEach((folio, index) => {
    gsap.to(folio, { scale: .7, rotationX: 40, rotationZ: index % 2 ? 3 : -3, autoAlpha: 0, ease: "none", scrollTrigger: { trigger: folios[index + 1], start: "top bottom", end: "top top+=80", scrub: innerWidth > 800 ? true : 1 } });
  });

  // Supporting print-like reveals remain shorter than the signature scenes.
  gsap.utils.toArray(".folios__head h2,.field-notes h2,.table-story h2,.days h2,.closing-ticket h2").forEach((heading) => {
    gsap.from(heading, { y: 45, opacity: 0, duration: .8, ease: "power3.out", scrollTrigger: { trigger: heading, start: "top 85%", once: true } });
  });
  gsap.utils.toArray(".day-card").forEach((card) => {
    gsap.from(card, { y: 50, opacity: 0, duration: .8, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 88%", once: true } });
  });
  addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
})();
