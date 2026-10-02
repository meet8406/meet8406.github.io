# Meet Shah — Developer Portfolio

A multi-page React portfolio built with Vite, custom CSS, Framer Motion, and Lucide React.

## Pages

- `/` — Home and workspace index
- `/systems/` — Profile, experience, stack, and capabilities
- `/work/` — Projects and GitHub profile
- `/lab/` — Learning and current experiments
- `/contact/` — Contact information and email form

## Development

```bash
npm ci
npm run dev
```

Build the static site with `npm run build`. Vite writes all five pages to `dist/`. The GitHub Actions workflow deploys that directory to the `meet8406.github.io` GitHub Pages site on pushes to `main`.

## Portfolio content

- Update profile and project content in `src/data/portfolio.js`.
- Add public project repository or demo URLs to each project's `repository` and `demo` fields. Leave them `null` when the work is private; the site then links to the public GitHub profile.
- Keep `public/sitemap.xml`, canonical URLs, and social metadata aligned if the published domain changes.
- Static files in `public/` are copied to the site root during the build.
