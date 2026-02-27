# AGENTS.md

## Cursor Cloud specific instructions

**DallinOS** is a static, zero-dependency portfolio website (vanilla HTML/CSS/JS). There is no build system, no package manager, no backend, and no `package.json`.

### Running the dev server

Serve the site with any static HTTP server. The simplest option:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080` in Chrome. All app logic is in `app.js`, styling in `styles.css`, and the HTML shell in `index.html`.

### Key gotchas

- The site must be served over HTTP (not `file://`) because it references local assets via relative paths (`./assets/...`).
- There are no lint, test, or build commands — this is a plain static site with no tooling.
- All project data (portfolio items, about text, links) is hardcoded in `app.js` in the `files` array.
- Themes (macOS, Windows, Linux) are toggled via the Start menu and controlled by CSS custom properties set in `styles.css`.
- Spotlight search is triggered by `Ctrl+K` / `Cmd+K`.
