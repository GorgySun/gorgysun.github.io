# gorgysun.github.io

Personal GitHub Pages site, built with plain HTML + TypeScript (no Jekyll / Markdown).

## Structure

- `index.html` — home page
- `about/index.html` — about page, served at `/about/`
- `assets/style.css` — shared styles
- `src/main.ts` — TypeScript source
- `assets/main.js` — compiled JS (committed, since GitHub Pages only serves static files)
- `.nojekyll` — tells GitHub Pages to skip the Jekyll build and serve files as-is

## Rebuilding the TypeScript

After editing `src/main.ts`, recompile with:

```bash
npx -p typescript tsc -p tsconfig.json
```

and commit the regenerated `assets/main.js`.
