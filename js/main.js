// Projects: add, remove or edit an entry here and the cards update on their own.
const projects = [
  {
    name: "Crafter's Toolkit",
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
document.getElementById("projGrid").innerHTML = projects
  .map(
    (p) => `
  <article class="card proj rv">
    <div class="top"><div><h3>${p.name}</h3><p class="r">${p.role}</p></div></div>
    <p>${p.text}</p>
    <div class="chips">${p.stack.map((s) => `<span>${s}</span>`).join("")}</div>
  </article>`,
  )
  .join("");

const skills = {
  Languages: ["C", "C#", "Java", "Python", "PHP", "JavaScript", "TypeScript", "Assembly"],
  "Web development": [
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
  ],
  "Data & automation": [
    "PostgreSQL",
    "Supabase",
    "Firebase",
    "Airtable",
    "SmartSuite",
    "Make.com",
    "n8n",
  ],
  Tools: [
    "Git",
    "VS Code",
    "Flutter",
    "Cloudflare Workers & Pages",
    "NetBeans",
    "Proteus",
    "Claude",
    "Lovable",
  ],
};
document.getElementById("skillGrid").innerHTML =
  Object.entries(skills)
    .map(
      ([k, v]) =>
        `<div class="card rv"><h3>${k}</h3><div class="chips">${v.map((s) => `<span>${s}</span>`).join("")}</div></div>`,
    )
    .join("") +
  `<div class="card rv" style="grid-column:1/-1"><h3>Core</h3><div class="chips">${["Analytical thinking", "Adaptability", "Organized leadership", "Resourcefulness", "Communication"].map((s) => `<span>${s}</span>`).join("")}</div></div>`;

// light / dark toggle (dark by default; remembered per viewer when storage works)
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
  setMode(m);
  try {
    localStorage.setItem("mode", m);
  } catch (e) {}
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
document.querySelectorAll("section[id]").forEach((s) => io.observe(s));
