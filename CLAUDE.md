# CLAUDE.md — Echo Web

## Project overview
Landing page and legal pages for **Echo**, a React Native mobile app (startup/product).
Hosted on **GitHub Pages**. Static site — no build step, no framework.

## Tech stack
- HTML / CSS / vanilla JS only — no frameworks, no bundlers
- CSS custom properties (variables) for theming
- No external dependencies

## Architecture
```
index.html       — Landing page
privacy.html     — Privacy policy (EN + FR)
terms.html       — Terms of use (EN + FR)
css/style.css    — All styles, theme variables, responsive
js/theme.js      — Theme toggle (dark/light) + language toggle (EN/FR)
images/          — App screenshots, icons
```

## Conventions

### Language
- Conversations in French
- Commit messages in English
- Code (HTML, CSS, JS) in English

### Git workflow
- Propose a commit after each completed feature
- Do not auto-commit or auto-push — wait for explicit request
- Commit messages: short, descriptive, English

### CSS
- Vanilla CSS with custom properties (`--bg`, `--text`, `--surface`, etc.)
- Theme variables in `:root` (dark default) + `prefers-color-scheme` + `[data-theme]` override
- Sections separated by `/* ===== SECTION NAME ===== */` comments

### Theming
- Dark mode is the default
- Light mode via `prefers-color-scheme: light` or manual toggle (`data-theme` on `<html>`)
- Language via `data-lang` on `<html>` — CSS classes `.lang-en` / `.lang-fr` for show/hide
- Theme-aware images use `data-img` attribute — JS builds `{base}-{theme}-{lang}.png`

### Colors (Echo palette)
- Background: `#0E1A2B` (dark) / `#F6F2EC` (light)
- Surface: `#1C2A3A` (dark) / `#EBE6DE` (light)
- Primary: `#8FB3FF` (dark) / `#1F3A5F` (light)
- Smile (accent): `#F4B740`
- Text: `#F2F4F8` (dark) / `#2A2118` (light)

### Images
- Screenshots follow: `echo-{name}-{dark|light}-{fr|en}.png`
- Icons: `icon-cloud.png` (logo), `icon-light.png` (favicon), `icon-dark.png`, `echo-app-icon-rounded.png`

### HTML page template
Every page must include:
```html
<head>
  <link rel="icon" type="image/png" href="images/icon-light.png">
  <link rel="stylesheet" href="css/style.css">
  <script src="js/theme.js"></script>
</head>
<body>
  <button class="lang-toggle" aria-label="Toggle language"></button>
  <button class="theme-toggle" aria-label="Toggle theme"></button>
  <!-- page content -->
  <footer> <!-- bilingual footer with Privacy + Terms links --> </footer>
</body>
```

### localStorage keys
- `theme` — `"dark"` or `"light"` (default: system preference)
- `lang` — `"fr"` or `"en"` (default: browser language)

## Deployment
GitHub Pages from `main` branch. Push to `main` = deploy.
