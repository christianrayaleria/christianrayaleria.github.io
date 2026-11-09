// Projects: add, remove or edit an entry here and the page updates on its own.
// Entries with an `img` are shown large with their screenshot; the rest go in the list below them.
const projects = [
  {
    name: "Crafter's Toolkit",
    img: "assets/projects/crafters-toolkit.jpg",
    alt: "Crafter's Toolkit sign-in page, with an illustration of order, stock and profit cards",
    role: "Full-Stack Developer",
    text: "A web app that runs a print and craft studio: inventory, costing, orders and profit reports.",
    stack: ["JavaScript", "Supabase", "PostgreSQL", "IndexedDB", "PWA", "Cloudflare Workers"],
  },
  {
    name: "MarchStudioCo Photobooth",
    role: "Full-Stack Developer & Designer",
    text: "A browser photobooth. Customers unlock a session with a code, design their photo strip and download it as a PDF, PNG or MP4.",
    stack: ["React", "TypeScript", "Vite", "Supabase", "Cloudflare Pages"],
  },
  {
    name: "Cebu City Jail Data Management System",
    img: "assets/projects/cebu-city-jail-dms.jpg",
    alt: "Cebu City Jail - Annex Data Management System login page",
    role: "Full-Stack Developer · Thesis",
    text: "A PERN data system with encrypted CRUD, OCR visitor verification wired to hardware, and Data Privacy Act compliance through RBAC, AES/TLS and LAN-only access.",
    stack: ["PostgreSQL", "Express", "React", "Node.js", "OCR"],
  },
  {
    name: "VaultPass",
    role: "Mobile App Developer",
    text: "A password manager with AES-256 master-key authentication and a real-time sync layer that keeps data conflict-free across devices.",
    stack: ["Flutter", "Dart", "AES-256"],
  },
  {
    name: "Hai Hotel",
    role: "Full-Stack Java Application",
    text: "Hotel reservations with queue-based conflict resolution, automatic date adjustment against overlaps, and safe concurrent bookings.",
    stack: ["Java", "MySQL", "JDBC"],
  },
  {
    name: "Automatic Medicine Dispenser",
    role: "Firmware Developer",
    text: "Microcontroller firmware that uses timer interrupts to dispense solid and liquid doses for three users, with alerts and live inventory.",
    stack: ["Assembly", "Microcontroller", "Timer interrupts"],
  },
  {
    name: "BiteBook",
    role: "Web Developer · CpE 3222 Final Project",
    text: "A PHP recipe app with user accounts. Save recipes with ingredient amounts, see which dishes you can make from what you have, and share any recipe with a quick copy and paste.",
    stack: ["PHP", "Web"],
  },
  {
    name: "USC Marketplace",
    role: "Java Developer · CPE 2102L Project",
    text: "A campus marketplace application for the University of San Carlos, built in Java with a MySQL database.",
    stack: ["Java", "MySQL", "NetBeans"],
  },
];
document.getElementById("projGrid").innerHTML =
  `<div class="feat">${projects
    .filter((p) => p.img)
    .map(
      (p) => `
  <article class="proj-feat rv">
    <img src="${p.img}" alt="${p.alt}" width="1600" height="1000" loading="lazy" />
    <h3>${p.name}</h3>
    <p class="r">${p.role}</p>
    <p>${p.text}</p>
    <p class="stk">${p.stack.join(", ")}</p>
  </article>`,
    )
    .join("")}</div>` +
  `<ul class="plist">${projects
    .filter((p) => !p.img)
    .map(
      (p) => `
  <li class="rv">
    <div><h3>${p.name}</h3><p class="r">${p.role}</p></div>
    <p>${p.text}</p>
    <p class="stk">${p.stack.join(", ")}</p>
  </li>`,
    )
    .join("")}</ul>`;

// Tools and skills: each key is a row label, each list its comma-separated items.
const tools = {
  Development: ["VS Code", "Git", "NetBeans", "Flutter", "Claude", "Lovable"],
  "Servers & deployment": ["MobaXterm", "Cloudflare Workers & Pages"],
  "Automation & data platforms": ["Make.com", "n8n", "Airtable", "SmartSuite", "Salesforce CRM", "Supabase", "Firebase"],
  Hardware: ["Proteus", "EMU8086", "Quartus"],
};
const skills = {
  "Programming languages": ["C", "C#", "Java", "Python", "PHP", "JavaScript", "TypeScript", "Assembly", "HDL"],
  "Web & backend": [
    "HTML5",
    "CSS3",
    "Tailwind CSS",
    "React",
    "Vite",
    "Node.js",
    "Express",
    "Axios",
    "PWA / Service Workers",
    "Chart.js",
    "PostgreSQL",
  ],
  "Spoken languages": ["English", "Tagalog", "Bisaya"],
  Core: ["Analytical thinking", "Adaptability", "Organized leadership", "Resourcefulness", "Communication"],
};
const rows = (groups) =>
  Object.entries(groups)
    .map(([k, v]) => `<div class="rv"><dt>${k}</dt><dd>${v.join(", ")}</dd></div>`)
    .join("");
document.getElementById("toolGrid").innerHTML = rows(tools);
document.getElementById("skillGrid").innerHTML = rows(skills);

// light / dark toggle (starts from the device setting; a click is remembered per viewer)
const root = document.documentElement,
  modeBtn = document.getElementById("mode");
function setMode(m) {
  root.setAttribute("data-mode", m);
  modeBtn.setAttribute(
    "aria-label",
    m === "light" ? "Switch to dark mode" : "Switch to light mode",
  );
}
// default = the visitor's device setting; a click overrides it and is remembered
const sys = matchMedia("(prefers-color-scheme: light)");
let saved = null;
try {
  saved = localStorage.getItem("mode");
} catch (e) {}
setMode(saved || (sys.matches ? "light" : "dark"));
sys.addEventListener("change", (e) => {
  if (!saved) setMode(e.matches ? "light" : "dark");
});
modeBtn.onclick = () => {
  const m = root.getAttribute("data-mode") === "light" ? "dark" : "light";
  saved = m;
  try {
    localStorage.setItem("mode", m);
  } catch (e) {}
  // no View Transitions support or reduced motion: switch instantly
  if (!document.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches)
    return setMode(m);
  // the new mode spills out of the toggle as a wobbly liquid blob that settles as it covers the screen
  const r = modeBtn.getBoundingClientRect(),
    x = r.left + r.width / 2,
    y = r.top + r.height / 2,
    end = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y)) * 1.06,
    N = 48, // points around the blob edge
    F = 16, // keyframes
    frames = [];
  for (let f = 0; f <= F; f++) {
    const t = f / F,
      rad = end * (1 - (1 - t) ** 3), // fast start, soft landing
      amp = 0.16 * (1 - t) ** 1.4; // wobble fades out so it ends as a clean edge
    const pts = [];
    for (let i = 0; i < N; i++) {
      const a = (i / N) * Math.PI * 2,
        k = 1 + amp * (0.6 * Math.sin(3 * a + t * 7) + 0.4 * Math.sin(5 * a - t * 11));
      pts.push(`${(x + Math.cos(a) * rad * k).toFixed(1)}px ${(y + Math.sin(a) * rad * k).toFixed(1)}px`);
    }
    frames.push({ clipPath: `polygon(${pts.join(",")})` });
  }
  document.startViewTransition(() => setMode(m)).ready.then(() =>
    root.animate(frames, { duration: 520, easing: "linear", pseudoElement: "::view-transition-new(root)" }),
  );
};

// cursor-lit dots
addEventListener(
  "pointermove",
  (e) => {
    root.style.setProperty("--mx", e.clientX + "px");
    root.style.setProperty("--my", e.clientY + "px");
  },
  { passive: true },
);

// nav border on scroll + active link
const nav = document.getElementById("nav"),
  links = [...nav.querySelectorAll("a")];
addEventListener("scroll", () => nav.classList.toggle("scrolled", scrollY > 8), { passive: true });
// one highlight that slides to the active link
const pill = document.createElement("li");
pill.className = "pill";
pill.setAttribute("aria-hidden", "true");
nav.querySelector("ul").prepend(pill);
let active = null,
  lockUntil = 0;
function place() {
  if (!active) {
    pill.style.opacity = 0;
    return;
  }
  pill.style.width = active.offsetWidth + "px";
  pill.style.height = active.offsetHeight + "px";
  pill.style.transform = `translate(${active.offsetLeft}px,${active.offsetTop}px)`;
  pill.style.opacity = 1;
}
function setActive(a) {
  if (!a || a === active) return;
  links.forEach((l) => l.classList.toggle("on", l === a));
  active = a;
  place();
  const ul = pill.parentElement; // on phones the row scrolls sideways: keep the active link in view
  if (ul.scrollWidth > ul.clientWidth)
    ul.scrollTo({ left: a.offsetLeft - (ul.clientWidth - a.offsetWidth) / 2, behavior: "smooth" });
}
links.forEach((a) =>
  a.addEventListener("click", () => {
    setActive(a);
    lockUntil = Date.now() + 1000;
  }),
);
addEventListener("resize", place);
const io = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (!e.isIntersecting || Date.now() < lockUntil) return;
      setActive(links.find((a) => a.getAttribute("href") === "#" + e.target.id));
    }),
  { rootMargin: "-45% 0px -50% 0px" },
);
document.querySelectorAll("#top, section[id]").forEach((s) => io.observe(s));
const contactLink = links.find((a) => a.getAttribute("href") === "#contact");
addEventListener(
  "scroll",
  () => {
    const atBottom = innerHeight + scrollY >= document.documentElement.scrollHeight - 4;
    if (atBottom && Date.now() >= lockUntil) setActive(contactLink);
  },
  { passive: true },
);
