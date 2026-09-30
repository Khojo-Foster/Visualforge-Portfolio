const $ = (s, c = document) => c.querySelector(s),
  $$ = (s, c = document) => [...c.querySelectorAll(s)];
const nav = $("#nav");
addEventListener("scroll", () => nav.classList.toggle("s", scrollY > 30), {
  passive: true,
});
$("#burger").onclick = (e) => {
  const o = nav.classList.toggle("open");
  e.currentTarget.setAttribute("aria-expanded", o);
};
$$("#menu a").forEach((a) => (a.onclick = () => nav.classList.remove("open")));
const io = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    }),
  { threshold: 0.12 },
);
$$(".rv,.sv,.tc").forEach((el, i) => {
  el.classList.add("rv");
  el.style.transitionDelay = (i % 4) * 80 + "ms";
  io.observe(el);
});
$("#filters").onclick = (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  $$("#filters button").forEach((x) => x.classList.toggle("on", x === b));
  const f = b.dataset.f,
    cards = $$(".card");
  cards.forEach((c) => c.classList.add("out"));
  setTimeout(() => {
    cards.forEach((c) => {
      c.hidden = !(f === "all" || c.dataset.cat.split(" ").includes(f));
      c.classList.remove("out");
    });
  }, 280);
};
const lb = $("#lb"),
  li = $("img", lb);
$("#grid").onclick = (e) => {
  const c = e.target.closest(".card");
  if (!c) return;
  li.src = c.dataset.full;
  li.alt = $("img", c).alt;
  lb.showModal();
};
lb.onclick = (e) => {
  if (e.target !== li) lb.close();
};
$("#yr").textContent = new Date().getFullYear();

// testimonial slideshow (peek carousel, centers the active card by measured width)
(() => {
  const root = $("#tslide");
  if (!root) return;
  const viewport = $(".sviewport", root),
    track = $(".strack", root),
    slides = $$(".tc", track),
    dotsWrap = $("#tdots");
  let i = 0,
    timer;
  slides.forEach((s, n) => {
    const d = document.createElement("button");
    d.setAttribute("aria-label", "Go to testimonial " + (n + 1));
    d.onclick = () => go(n);
    dotsWrap.appendChild(d);
    s.addEventListener("click", () => {
      if (n !== i) go(n);
    });
  });
  const dots = $$("button", dotsWrap);
  function place() {
    const vw = viewport.clientWidth,
      s = slides[i];
    const offset = vw / 2 - (s.offsetLeft + s.offsetWidth / 2);
    track.style.transform = `translateX(${offset}px)`;
  }
  function go(n) {
    i = (n + slides.length) % slides.length;
    slides.forEach((s, x) => s.classList.toggle("on", x === i));
    dots.forEach((d, x) => d.classList.toggle("on", x === i));
    place();
    restart();
  }
  function restart() {
    clearInterval(timer);
    timer = setInterval(() => go(i + 1), 6000);
  }
  $(".prev", root).onclick = () => go(i - 1);
  $(".next", root).onclick = () => go(i + 1);
  let sx = 0;
  track.addEventListener("touchstart", (e) => (sx = e.touches[0].clientX), {
    passive: true,
  });
  track.addEventListener(
    "touchend",
    (e) => {
      const dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1));
    },
    { passive: true },
  );
  addEventListener("resize", place);
  go(0);
})();
