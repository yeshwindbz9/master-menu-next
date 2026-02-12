# Master Menu Next (Next.js + GSAP Responsive Navigation)

A lightweight demo project showcasing a **GSAP-driven, responsive full-screen navigation overlay** built with the **Next.js App Router**.  
The menu uses **clip-path** animation for the overlay reveal and staggered link entrance animation via **GSAP timelines**.

## Tech Stack

- **Next.js (App Router)**
- **React**
- **GSAP + @gsap/react**
- **CSS (global + component styles)**
- **next/font** (Google fonts via Next.js)

## Features

- Fixed top **menu bar**
- Full-screen **overlay menu**
- GSAP timeline:
  - overlay reveal using `clip-path`
  - staggered link entrance animation
- Responsive layout (mobile-friendly)
- Client Component menu (`"use client"`) so React Hooks + GSAP work correctly

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Run the dev server

```bash
npm run dev
```

Open `http://localhost:3000`.

### 3) Build for production

```bash
npm run build
npm run start
```

## Project Structure (typical)

```
src/
  app/
    layout.js          # Root layout (fonts + Menu)
    page.js            # Example page(s)
    globals.css        # Global styles

  about/page.js
  work/page.js
  lab/page.js
  contact/page.js

  components/
    menu/
      Menu.js          # Client component with GSAP animations
      menu.css         # Menu styling
```

## How the Animation Works

The menu is a Client Component and creates a paused GSAP timeline on mount:

- Sets initial link positions (down + hidden)
- Animates the overlay `clip-path` from closed → open
- Staggers each menu item into place
- On toggle:
  - `play()` to open
  - `reverse()` to close

Key bits:

- `useGSAP(..., { scope: containerRef })` keeps selectors scoped to the component.
- `pointer-events` is disabled while closed, enabled when open.

## Fonts

The layout loads fonts using `next/font/google`.  
If you added a condensed/bold look (e.g. **Teko**), it can be exposed as a CSS variable (example: `--font-mw`) and applied to the menu.

## Deploy (Vercel)

1. Push the repo to GitHub
2. Import it in Vercel
3. Deploy (defaults work for Next.js)

> If you’re using env vars or private assets, add them in Vercel Project Settings.

## Notes / Troubleshooting

### “React Hook only works in a Client Component”

If you see `useEffect`/hooks errors from `Menu.js`, ensure the file starts with:

```js
"use client";
```

## License

Personal / Individual project.
