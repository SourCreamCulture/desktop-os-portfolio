# DallinOS (desktop portfolio)

Static, OS-style “desktop” portfolio site.

## Run locally

Any static server works:

```bash
cd desktop-os-site
npx serve .
# or
npx http-server .
```

Then open the shown URL.

## Customize

Edit `app.js`:

- `files[]` controls desktop icons and window content.
- `Resume.pdf` is bundled locally at `assets/resume.pdf` (so it won’t break when you change hosts/domains).

## Next upgrades (if you want it to feel _real_)

- Right-click context menu (open/rename/delete)
- Window snapping + resize handles
- Spotlight search (Cmd/Ctrl+K)
- Add screenshots per project
- “Terminal” app that prints your bio + links
