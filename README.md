# Mid Michigan Plumbing Services — Website

A fast, responsive, conversion-focused multi-page website for **Mid Michigan Plumbing Services**
(Clare, MI) — a residential & commercial plumbing company offering 24/7 emergency service.

## Pages

| Page | File | Purpose |
|------|------|---------|
| Home | `index.html` | Hero, services preview, why-us, areas, reviews, FAQ, CTA |
| Services | `services.html` | All 10 services with imagery and details |
| Service Areas | `service-areas.html` | Clare, Alma, Mt. Pleasant, Midland + map |
| About | `about.html` | Business story, approach, values |
| Reviews | `reviews.html` | 4.7★ / 83 Google reviews + highlights |
| Contact & Booking | `contact.html` | Contact details, booking/quote form, map, FAQ |

## Project structure

```
index.html
services.html
service-areas.html
about.html
reviews.html
contact.html
robots.txt
sitemap.xml
assets/
  css/styles.css      # All styling (design tokens, layout, responsive, reduced-motion)
  js/main.js          # Nav, scroll reveal, parallax, counters, FAQ, form handling
  img/                # logo.png (official), hero.jpg, about.jpg, svc-*.jpg
```

## Running locally

No build step or dependencies — it's static HTML/CSS/JS.

```bash
# from this folder
python3 -m http.server 8080
# then open http://localhost:8080
```

## Deploying

Upload the whole folder to any static host:
- **Netlify / Vercel:** drag-and-drop the folder, or connect the repo (no build command needed).
- **GitHub Pages:** push the files to a repo and enable Pages on the main branch.
- **Traditional hosting / cPanel:** upload via FTP to the web root (`public_html`).

## Brand & design

- **Colors derived from the official logo:** navy `#1B2757`, deep red `#AC202D`.
- **Fonts:** Manrope (headings) + Inter (body), loaded from Google Fonts with system fallbacks.
- **Animation:** scroll reveals, hero parallax, animated counters, hover states — all respecting
  `prefers-reduced-motion`.
- **Logo:** the business's real logo is used (`assets/img/logo.png`).

## Content accuracy notes

- All business facts (name, address, phone, email, hours, services, service areas, rating and
  review count) come from the business's Google Business Profile and its own website.
- **No** awards, certifications, licences, years in business, guarantees, pricing or fake
  testimonials have been invented.
- Review excerpts are genuine and attributed; they are not paraphrased as quotations.
- The photographs are **AI-generated and illustrative** — they do not depict the real team,
  premises or completed jobs. Replace them with real photos when available.

## Things to confirm / replace

1. **Hours** — Google shows *Open 24 hours*; the previous site showed *08:00–19:00*. This build uses
   “24/7 emergency service; office 8am–7pm”. Adjust in `contact.html` if needed.
2. **Booking system** — the form currently composes an email to
   `midmichplumbingservices@gmail.com`. Swap in a real booking/CRM endpoint if one exists.
3. **Real photos & logo** — drop real photography into `assets/img/` and update the `src` values to
   replace the illustrative images.
4. **Canonical URLs** — update `https://midmichplumbing.com/...` in each page `<head>` if the
   domain changes.
5. **Social links** — none were supplied; add them to the footer when available.

## Form behaviour

`contact.html` uses a `data-lead-form` handler in `main.js`. On submit it builds a `mailto:` link
containing the enquiry and shows a confirmation message. For production, connect the form to a
backend or form service (Formspree, Netlify Forms, etc.) for reliable delivery.
