# matteoneirotti — personal site

Static site. No build step, no dependencies, no framework. Open `index.html` and it works.

## Structure

```
index.html                      Home — hero, work index, about, experience, toolkit, education, contact
projects/crono.html             CRONO — wireless timing hardware
projects/kleriox.html           Kleriox — the company / Fira
projects/recession-engine.html  Recession Probability Engine
projects/stellantis.html        Stellantis Safety Center — crash-test data
assets/site.css                 All styling
assets/site.js                  EN/IT language toggle + scroll reveal
```

## Editing text

English lives directly in the HTML. Italian lives in a `data-it` attribute on the same element:

```html
<p data-it="Testo italiano">English text</p>
```

If the sentence contains inline markup (`<strong>`, `<a>`, `<code>`), use `data-it-html` instead:

```html
<p data-it-html="Testo con <strong>grassetto</strong>">Text with <strong>bold</strong></p>
```

**Change the English by editing the visible HTML. Change the Italian by editing the attribute.**
Both must be edited together or the toggle will show stale text.

The chosen language is remembered in `localStorage`. First-time visitors get Italian if their
browser is set to Italian, English otherwise.

## Changing the colours

Everything is driven by CSS variables at the top of `assets/site.css`. To go light, or to change
the accent from amber to something else, edit `:root` — nothing else needs touching.

```css
--bg:     #08090b;   /* page background */
--text:   #e7e9ed;   /* body text */
--accent: #ffb454;   /* the one accent colour */
```

## Places marked for expansion

Search the project pages for `ROOM TO EXPAND` — HTML comments marking spots where a concrete
number or detail would strengthen the page. They are invisible to visitors.

## Hosting

**GitHub Pages** — see `DEPLOY.md` for the full walkthrough (including the drag-and-drop route if
you'd rather not touch a command line, and how to point a custom domain at it later).

Short version: create a public repo named `YOURUSERNAME.github.io`, push this folder into it, then
Settings → Pages → Deploy from branch → `main` / root. Live at `https://YOURUSERNAME.github.io`.

The empty `.nojekyll` file in this folder disables GitHub's Jekyll processing. Leave it there.

## Notes

- Fonts load from Google Fonts. If the site must work fully offline, download Inter and
  JetBrains Mono into `assets/fonts/` and swap the `<link>` for local `@font-face` rules.
- The phone number and home address from the CV are deliberately **not** on the site. Email and
  LinkedIn are enough for a public page; anything more invites scraping.
