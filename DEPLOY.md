# Putting this on GitHub Pages

Free, no credit card, HTTPS included. About five minutes.

> One thing to know up front: on a free GitHub account, Pages only works from a **public**
> repository. That means the site's source (these HTML/CSS files) is publicly readable. For a
> personal site that's normal — it's the same content the site already shows. If you ever want a
> private repo with Pages, that needs GitHub Pro.

---

## Option A — the drag-and-drop way (no command line)

1. Go to <https://github.com/new>.
2. Repository name: **`matteoneirotti.github.io`** — use your own GitHub username in place of
   `matteoneirotti`. This exact name is what makes the site live at the root of your username.
3. Set it to **Public**. Do **not** tick "Add a README" (you already have one).
4. Create the repository.
5. On the empty repo page, click **uploading an existing file**.
6. Drag in `index.html`, `README.md`, `DEPLOY.md`, `.nojekyll`, and the `assets` and `projects`
   folders. Drag the folders themselves — GitHub keeps the structure.
7. Commit.
8. Go to **Settings → Pages**. Under "Build and deployment", Source = **Deploy from a branch**,
   Branch = **main**, folder = **/ (root)**. Save.
9. Wait a minute, then open **https://YOURUSERNAME.github.io**.

---

## Option B — the command line way (better, because updates are one command)

Install Git if you don't have it, then from inside this folder:

```bash
git init
git add .
git commit -m "Personal site"
git branch -M main
git remote add origin https://github.com/YOURUSERNAME/YOURUSERNAME.github.io.git
git push -u origin main
```

Then do step 8 above (Settings → Pages) once. From then on, every change is:

```bash
git add .
git commit -m "what changed"
git push
```

The live site updates about a minute after each push.

> **A caveat about OneDrive.** This folder lives inside OneDrive. Git repositories and OneDrive
> sync occasionally disagree with each other — OneDrive can lock or partially sync files inside
> `.git` while Git is writing to them. It usually works fine, but if you start seeing strange Git
> errors, move the folder somewhere outside OneDrive (e.g. `C:\Users\Matteo\code\website`) and
> work from there.

---

## Adding your own domain later

When you buy a domain (e.g. `matteoneirotti.com`):

1. In the repo: **Settings → Pages → Custom domain**, type the domain, save. GitHub creates a
   `CNAME` file in the repo.
2. At your domain registrar, add these DNS records:

   | Type | Name | Value |
   |------|------|-------|
   | A | @ | 185.199.108.153 |
   | A | @ | 185.199.109.153 |
   | A | @ | 185.199.110.153 |
   | A | @ | 185.199.111.153 |
   | CNAME | www | YOURUSERNAME.github.io |

3. Back in Settings → Pages, tick **Enforce HTTPS** once the certificate is issued (can take up
   to an hour).

Domains for a name like this usually run €10–15/year. `.com` is the safe default; `.it` and `.dev`
also work well.

---

## Why `.nojekyll` is in here

GitHub Pages runs files through Jekyll by default, which ignores any folder starting with an
underscore and can behave unexpectedly with plain static sites. The empty `.nojekyll` file turns
that off, so your files are served exactly as they are. Don't delete it.
