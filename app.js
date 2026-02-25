/* DallinOS — tiny desktop UI.
   No frameworks. Just vibes.
*/

const state = {
  z: 10,
  selectedIconId: null,
  windows: new Map(), // id -> { el, meta }
};

const files = [
  {
    id: "loqn",
    type: "project",
    name: "LOQN.app",
    glyph: "🧠",
    year: "2025",
    stack: ["Swift", "API", "NFC", "Firebase"],
    summary:
      "The Ultimate Focus & Productivity App. Physical tags + intelligent app blocking for habit-level focus.",
    overview: [
      "Break digital distraction by making focus mode a physical action (tap/tag).",
      "iOS app + backend integration to enforce app blocking rules.",
      "Built for habit-building: simple flows, low-friction re-entry, clear constraints.",
    ],
    highlights: [
      "NFC-driven interactions (physical-to-digital trigger).",
      "Firebase-backed data/auth and reliable syncing.",
      "UX designed to feel ‘hard to bypass’ without feeling annoying.",
    ],
    nextSteps: [
      "Add screenshots + metrics (activation, retention, focus sessions/week).",
      "Write a short case study: why NFC, what worked, what didn’t.",
    ],
    links: [
      {
        label: "App Store",
        href: "https://apps.apple.com/us/app/loqn/id6749922114",
      },
    ],
  },
  {
    id: "spinflix",
    type: "project",
    name: "SpinFlix.app",
    glyph: "🎬",
    year: "2025",
    stack: ["Swift", "TMDB API", "AI", "iCloud"],
    summary:
      "Wheel-spinning movie picker that turns “what should we watch?” into a game and kills decision fatigue.",
    overview: [
      "Turns endless scrolling into a quick, fun decision (spin → pick → watch).",
      "Integrates movie metadata so picks feel informed, not random.",
      "Built for speed: minimal taps, fast results, shareable picks.",
    ],
    highlights: [
      "TMDB integration for posters, cast, ratings, and details.",
      "Option to use AI for mood-based suggestions (if enabled).",
      "iCloud sync so preferences survive device changes.",
    ],
    nextSteps: [
      "Add a demo GIF/video capture into this project window.",
      "Add ‘group mode’ (everyone votes, wheel weights picks).",
    ],
    links: [
      {
        label: "App Store",
        href: "https://apps.apple.com/us/app/spinflix/id6741057161",
      },
    ],
  },
  {
    id: "rexburg-housing",
    type: "project",
    name: "RexburgHousing.sql",
    glyph: "🏠",
    year: "2024",
    stack: ["HTML", "CSS", "SQL"],
    summary:
      "A BYU-Idaho housing database + simple search website to find housing that actually fits.",
    overview: [
      "Centralizes housing options in one searchable place (instead of scattered listings).",
      "SQL-backed dataset + a straightforward UI for filtering/search.",
      "Built to be simple, fast, and understandable (classic web fundamentals).",
    ],
    highlights: [
      "Clean data model + queries that support real search behavior.",
      "No-nonsense HTML/CSS UI (fast load, low complexity).",
    ],
    nextSteps: [
      "Add hosted demo link (GitHub Pages/Netlify) + sample dataset screenshot.",
      "Add more filters (price, dates, room type) + saved searches.",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/SourCreamCulture/rexburg-housing",
      },
    ],
  },
  {
    id: "pterodactyl-market",
    type: "project",
    name: "PterodactylMarket.md",
    glyph: "🦖",
    year: "2023",
    stack: ["React", "Node.js", "MongoDB", "TailwindCSS"],
    summary:
      "Developer freelance marketplace with authentication and secure project postings.",
    overview: [
      "Two-sided marketplace concept: clients post projects, devs apply/bid.",
      "Auth + protected routes for posting and managing listings.",
      "Tailwind UI for fast iteration and consistent styling.",
    ],
    highlights: [
      "Authentication + authorization flow.",
      "MongoDB data modeling for users/projects.",
      "React component structure for scalable UI.",
    ],
    nextSteps: [
      "Add the exact repo link for this project (right now it’s a placeholder).",
      "Add a hosted demo + a short walkthrough video.",
    ],
    links: [
      {
        label: "GitHub profile",
        href: "https://github.com/SourCreamCulture",
      },
    ],
  },
  {
    id: "resume",
    type: "pdf",
    name: "Resume.pdf",
    glyph: "📄",
    href: "./assets/resume.pdf",
    note: "Bundled locally with this site so it never breaks when you move domains/hosts.",
  },
  {
    id: "about",
    type: "text",
    name: "About.txt",
    glyph: "👋",
    body: `Software engineering student at BYU-Idaho building modern web + mobile apps.\n\nCurrently seeking internship opportunities for Summer 2026.\n\nThis site is an OS-style desktop: each project is a “file” and opens in its own window.`,
  },
  {
    id: "contact",
    type: "link",
    name: "Contact.url",
    glyph: "✉️",
    href: "mailto:dallinheath@gmail.com",
    note: "Email: dallinheath@gmail.com",
  },
  {
    id: "linkedin",
    type: "link",
    name: "LinkedIn.url",
    glyph: "🔗",
    href: "https://www.linkedin.com/in/dallin-bland-701a56291",
    note: "LinkedIn profile",
  },
  {
    id: "github",
    type: "link",
    name: "GitHub.url",
    glyph: "💻",
    href: "https://github.com/SourCreamCulture",
    note: "GitHub profile",
  },
  {
    id: "all-projects",
    type: "folder",
    name: "Projects/",
    glyph: "🗂️",
  },
  {
    id: "help",
    type: "text",
    name: "README.txt",
    glyph: "❓",
    body: `Tips:\n- Double-click icons to open\n- Drag windows by the title bar\n- Use the taskbar to switch\n- Start menu has the essentials\n\nWant this to feel more "real"? We can add:\n- right-click menu\n- window snapping\n- terminal app\n- Spotlight-style search`,
  },
];

const elDesktop = document.getElementById("desktop");
const elIconGrid = document.getElementById("iconGrid");
const elWindows = document.getElementById("windows");
const elTaskbarApps = document.getElementById("taskbarApps");
const elClock = document.getElementById("clock");
const elStartBtn = document.getElementById("startBtn");
const elStartMenu = document.getElementById("startMenu");

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderIcons() {
  elIconGrid.innerHTML = "";
  for (const f of files) {
    const btn = document.createElement("button");
    btn.className = "icon";
    btn.type = "button";
    btn.dataset.id = f.id;
    btn.setAttribute("aria-label", f.name);

    btn.innerHTML = `
      <div class="glyph" aria-hidden="true">${escapeHtml(f.glyph)}</div>
      <div class="label">${escapeHtml(f.name)}</div>
    `;

    btn.addEventListener("click", () => selectIcon(f.id));
    btn.addEventListener("dblclick", () => openFile(f.id));

    elIconGrid.appendChild(btn);
  }
}

function selectIcon(id) {
  state.selectedIconId = id;
  for (const node of elIconGrid.querySelectorAll(".icon")) {
    node.classList.toggle("selected", node.dataset.id === id);
  }
}

function bumpZ(winEl) {
  state.z += 1;
  winEl.style.zIndex = String(state.z);
}

function windowTemplate(title) {
  const win = document.createElement("section");
  win.className = "window";
  win.innerHTML = `
    <header class="w-titlebar" role="toolbar">
      <div class="w-title">
        <span class="dot" aria-hidden="true"></span>
        <span class="name">${escapeHtml(title)}</span>
      </div>
      <div class="w-controls">
        <button class="w-btn" data-act="min" title="Minimize" aria-label="Minimize">—</button>
        <button class="w-btn" data-act="max" title="Maximize" aria-label="Maximize">▢</button>
        <button class="w-btn" data-act="close" title="Close" aria-label="Close">×</button>
      </div>
    </header>
    <div class="w-body"></div>
  `;
  return win;
}

function addTaskbarButton(id, title) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "tb-btn tb-app";
  btn.dataset.id = id;
  btn.textContent = title;
  btn.addEventListener("click", () => focusWindow(id));
  elTaskbarApps.appendChild(btn);
}

function setActiveTaskbar(id) {
  for (const b of elTaskbarApps.querySelectorAll(".tb-app")) {
    b.classList.toggle("active", b.dataset.id === id);
  }
}

function focusWindow(id) {
  const w = state.windows.get(id);
  if (!w) return;
  w.el.hidden = false;
  bumpZ(w.el);
  setActiveTaskbar(id);
}

function closeWindow(id) {
  const w = state.windows.get(id);
  if (!w) return;
  w.el.remove();
  state.windows.delete(id);
  const tb = elTaskbarApps.querySelector(
    `.tb-app[data-id="${CSS.escape(id)}"]`,
  );
  if (tb) tb.remove();
}

function minimizeWindow(id) {
  const w = state.windows.get(id);
  if (!w) return;
  w.el.hidden = true;
  setActiveTaskbar(null);
}

function toggleMaximize(winEl) {
  const isMax = winEl.dataset.max === "true";
  winEl.dataset.max = isMax ? "false" : "true";
}

function makeDraggable(winEl) {
  const bar = winEl.querySelector(".w-titlebar");
  let dragging = false;
  let startX = 0,
    startY = 0,
    startLeft = 0,
    startTop = 0;

  const onDown = (e) => {
    if (winEl.dataset.max === "true") return; // no drag when maximized
    dragging = true;
    bumpZ(winEl);
    const rect = winEl.getBoundingClientRect();
    startLeft = rect.left;
    startTop = rect.top;
    startX = e.clientX;
    startY = e.clientY;
    bar.style.cursor = "grabbing";
  };

  const onMove = (e) => {
    if (!dragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    const left = Math.max(8, Math.min(window.innerWidth - 80, startLeft + dx));
    const top = Math.max(8, Math.min(window.innerHeight - 120, startTop + dy));
    winEl.style.left = left + "px";
    winEl.style.top = top + "px";
  };

  const onUp = () => {
    dragging = false;
    bar.style.cursor = "grab";
  };

  bar.addEventListener("pointerdown", (e) => {
    // Don't start dragging when clicking window control buttons
    if (e.target.closest(".w-controls")) return;
    if (e.button !== 0) return;
    bar.setPointerCapture(e.pointerId);
    onDown(e);
  });
  bar.addEventListener("pointermove", onMove);
  bar.addEventListener("pointerup", onUp);
  bar.addEventListener("pointercancel", onUp);
}

function openFile(id) {
  const f = files.find((x) => x.id === id);
  if (!f) return;

  // Folder opens a Projects window
  if (f.type === "folder") {
    return openProjectsWindow();
  }

  // If already open, just focus
  if (state.windows.has(id)) {
    focusWindow(id);
    return;
  }

  const win = windowTemplate(f.name);
  win.style.left = 40 + state.windows.size * 22 + "px";
  win.style.top = 30 + state.windows.size * 18 + "px";
  bumpZ(win);
  makeDraggable(win);

  const body = win.querySelector(".w-body");

  if (f.type === "project") {
    body.innerHTML = `
      <h2>${escapeHtml(f.id.toUpperCase())} <span style="color:rgba(255,255,255,.55); font-weight:600; font-size:14px;">(${escapeHtml(f.year)})</span></h2>
      <p>${escapeHtml(f.summary)}</p>
      <div style="margin: 8px 0 6px;">
        ${f.stack.map((s) => `<span class="pill">${escapeHtml(s)}</span>`).join("")}
      </div>
      <h3 style="margin-top:14px;">Overview</h3>
      <ul>
        ${(
          f.overview || [
            "What problem it solves",
            "What I built / shipped",
            "How I’d improve it next",
          ]
        )
          .map((x) => `<li>${escapeHtml(x)}</li>`)
          .join("")}
      </ul>

      ${
        f.highlights?.length
          ? `
        <h3>Highlights</h3>
        <ul>
          ${f.highlights.map((x) => `<li>${escapeHtml(x)}</li>`).join("")}
        </ul>
      `
          : ""
      }

      ${
        f.nextSteps?.length
          ? `
        <h3>Next</h3>
        <ul>
          ${f.nextSteps.map((x) => `<li>${escapeHtml(x)}</li>`).join("")}
        </ul>
      `
          : ""
      }

      <h3>Links</h3>
      <ul>
        ${(f.links || [])
          .map(
            (l) =>
              `<li><a href="${escapeHtml(l.href)}" target="_blank" rel="noreferrer">${escapeHtml(l.label)}</a></li>`,
          )
          .join("")}
      </ul>
    `;
  } else if (f.type === "pdf" || f.type === "link") {
    const href = String(f.href || "");
    const isMailto = href.startsWith("mailto:");

    if (isMailto) {
      // mailto can't be embedded meaningfully
      body.innerHTML = `
        <h2>${escapeHtml(f.name)}</h2>
        <p>${escapeHtml(f.note || "")}</p>
        <p><a href="${escapeHtml(href)}">Open email</a></p>
      `;
    } else {
      body.classList.add("embed");
      body.innerHTML = `
        <div class="embedHeader">
          <div>
            <div style="font-weight:700;">${escapeHtml(f.name)}</div>
            ${f.note ? `<div style="color: rgba(255,255,255,.7); font-size:12px; margin-top:2px;">${escapeHtml(f.note)}</div>` : ""}
          </div>
          <a class="tb-btn" style="text-decoration:none;" href="${escapeHtml(href)}" target="_blank" rel="noreferrer">Open in new tab</a>
        </div>
        <iframe class="embedFrame" src="${escapeHtml(href)}" title="${escapeHtml(f.name)}" loading="lazy"></iframe>
      `;
    }
  } else if (f.type === "text") {
    body.innerHTML = `
      <h2>${escapeHtml(f.name)}</h2>
      <pre style="white-space:pre-wrap; margin:0; color: rgba(255,255,255,.80); line-height:1.45;">${escapeHtml(f.body || "")}</pre>
    `;
  } else {
    body.innerHTML = `<p>Unknown file type.</p>`;
  }

  // Controls
  win.addEventListener("pointerdown", () => {
    bumpZ(win);
    setActiveTaskbar(id);
  });

  win
    .querySelector('[data-act="close"]')
    .addEventListener("click", () => closeWindow(id));
  win
    .querySelector('[data-act="min"]')
    .addEventListener("click", () => minimizeWindow(id));
  win
    .querySelector('[data-act="max"]')
    .addEventListener("click", () => toggleMaximize(win));

  elWindows.appendChild(win);
  state.windows.set(id, { el: win, meta: f });
  addTaskbarButton(id, f.name);
  setActiveTaskbar(id);
}

function openProjectsWindow() {
  const id = "all-projects";
  if (state.windows.has(id)) return focusWindow(id);

  const win = windowTemplate("Projects");
  bumpZ(win);
  makeDraggable(win);

  const projects = files.filter((f) => f.type === "project");
  const body = win.querySelector(".w-body");
  body.innerHTML = `
    <h2>Selected Work</h2>
    <p>Double-click any project file on the desktop, or click below.</p>
    <div style="display:grid; gap:10px;">
      ${projects
        .map(
          (p) => `
          <button class="tb-btn" style="justify-self:start;" data-open-project="${escapeHtml(p.id)}">
            ${escapeHtml(p.glyph)} ${escapeHtml(p.name)}
          </button>
          <div style="margin:-6px 0 6px 0; color: rgba(255,255,255,.72); font-size: 12px;">${escapeHtml(p.summary)}</div>
        `,
        )
        .join("")}
    </div>
  `;

  body.querySelectorAll("[data-open-project]").forEach((btn) => {
    btn.addEventListener("click", () => openFile(btn.dataset.openProject));
  });

  win.addEventListener("pointerdown", () => {
    bumpZ(win);
    setActiveTaskbar(id);
  });
  win
    .querySelector('[data-act="close"]')
    .addEventListener("click", () => closeWindow(id));
  win
    .querySelector('[data-act="min"]')
    .addEventListener("click", () => minimizeWindow(id));
  win
    .querySelector('[data-act="max"]')
    .addEventListener("click", () => toggleMaximize(win));

  elWindows.appendChild(win);
  state.windows.set(id, { el: win, meta: { id, name: "Projects" } });
  addTaskbarButton(id, "Projects");
  setActiveTaskbar(id);
}

function tickClock() {
  const now = new Date();
  const t = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const d = now.toLocaleDateString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  elClock.textContent = `${d} • ${t}`;
}

function closeStartMenu() {
  elStartMenu.hidden = true;
  elStartBtn.setAttribute("aria-expanded", "false");
}

function toggleStartMenu() {
  const show = elStartMenu.hidden;
  elStartMenu.hidden = !show;
  elStartBtn.setAttribute("aria-expanded", show ? "true" : "false");
}

// Start menu
elStartBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleStartMenu();
});

elStartMenu.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-open]");
  if (!btn) return;
  openFile(btn.dataset.open);
  closeStartMenu();
});

// Desktop click clears selection / closes start menu
elDesktop.addEventListener("click", () => {
  selectIcon(null);
  closeStartMenu();
});

// Keyboard: Enter opens selected icon
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && state.selectedIconId) {
    openFile(state.selectedIconId);
  }
  if (e.key === "Escape") {
    closeStartMenu();
  }
});

renderIcons();
setInterval(tickClock, 1000);
tickClock();

// Open About on first load (small delight)
setTimeout(() => openFile("about"), 250);
