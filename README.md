# Akhil Binu - Personal Cybersecurity Portfolio 🛡️

A high-fidelity, interactive, and beautifully animated single-page portfolio website showcasing Akhil Binu's expertise in security research, penetration testing, VAPT, and digital forensics. Built from scratch with modular vanilla technologies, custom keyframe animation styling, Three.js WebGL scenes, and responsive design systems — all wrapped in a classic green hacker/terminal aesthetic.

---

## 🌟 Immersive Cyberpunk Aesthetics & Features

### 1. 🌐 3D Cyber Threat Map Globe (Three.js)
- Full-page WebGL background rendering a dot-matrix world globe built from a self-contained continent mask (no external map data).
- **Live threat simulation**: animated laser-comet attack trails arc between source/target points, color-coded by threat category (OAS, ODS, WAV, MAV, IDS, VUL), with impact ripples on arrival.
- **Live intel feed**: pulls real backscatter scan data from the SANS Internet Storm Center API and visualizes it on the globe in real time, falling back to a simulation mode if the feed is unavailable.
- Camera position, rotation, and depth respond to scroll position for a parallax descent effect through the page.

### 2. 💎 Hero 3D Data-Crystal (Three.js)
- A rotating wireframe icosahedron shell with an inner counter-rotating core and an orbiting particle ring, layered behind the hero profile photo.
- Subtly tilts toward the cursor for a mouse-parallax effect. Automatically disabled on mobile viewports for performance.

### 3. 🕵️ Interactive Matrix Rain Background
- High-performance HTML5 canvas engine drawing custom glyph columns in the site's green palette.
- **Mouse Proximity Aura**: canvas tracks cursor coordinates dynamically — glyphs within `120px` of the mouse brighten to neon green and fall faster.

### 4. 💻 Command-Line Console Simulator
- Fully functional HUD command prompt mockup. Type standard operations directly or click quick shortcuts below the screen:
  - `help` — Lists operational routines.
  - `about` — Resolves Akhil Binu's bio payload.
  - `skills` — Lists specialized security tools & methodologies.
  - `certs` — Fetches TryHackMe and OPSWAT credentials.
  - `projects` — Details featured repositories and live urls.
  - `contact` — Shows secure communication gateways.
  - `clear` — Clears console log buffer.
  - `banner` — Renders the cybersecurity ascii logo banner.
- **Typing Simulation**: Clicking buttons triggers a typewriter keystroke animation directly inside the input line before running commands.

### 5. 🧪 Glassmorphic Hologram Cards with 3D Interactions
- Cards react to mouse position using CSS custom variables (`--mouse-x`, `--mouse-y`) to generate a Vercel-like hover spotlight glow.
- **3D Tilt effect**: hovering cards on desktop devices calculates cursor distance from the center to skew cards dynamically on the X and Y axes.
- **3D Flip Certification Cards**: every certification card flips a full 180° on hover to reveal a "Credential Verified" back face.
- **3D Cube Service Icons**: service icons rotate as true 3D cubes on hover via a CSS pseudo-element back face.
- **Portfolio Depth-Parallax**: project showcase images pop forward while the copy drifts the opposite direction on hover, layered on top of the tilt effect.
- Neon edge indicators (`.card-corner-decor`) light up dynamically on hover.

### 6. 🎬 3D Perspective Section Transitions
- Sections tilt in from a 3D perspective (`rotateX` + `translateY`) as they scroll into view, with a `prefers-reduced-motion` fallback to a flat fade-up.

### 7. 🛜 Real-Time Status Logs Form
- The contact form intercepts standard submissions to feed step-by-step logs into a form console display panel (`Resolving gateway...`, `Transmitting payload...`, `Packet acknowledged. 200 OK`) before sending through EmailJS.

---

## 📂 Project Structure & Code Map

* **[index.html](index.html)** — Main structure and copy. Includes optimized SEO markup, heading hierarchy, target blank anchors, and viewport settings.
* **[style.css](style.css)** — custom CSS variable design tokens (green hacker palette), HUD navigation layout, 3D flip/cube/tilt mechanics, alternating project column states, and keyframe animations.
* **[script.js](script.js)** — mobile toggles, viewport scroll-reveals, skill fill animations, interactive matrix canvas loop, card 3D tilt/parallax coordinates, terminal logic, live threat feed HUD, and EmailJS connection log routines.
* **[webgl-bg.js](webgl-bg.js)** — Three.js 3D cyber threat map globe: dot-matrix globe generation, live attack comet trails, impact ripples, and scroll-driven camera movement.
* **[hero-3d.js](hero-3d.js)** — Three.js hero section data-crystal: wireframe icosahedron shell/core, orbiting particles, and mouse-parallax rotation.
* **images/** — Local visual assets directory (WebP, optimized for fast loading):
  * `Akhil_ai_formal.webp` — Hero section profile avatar.
  * `website-scanner.webp` — Akhil WebGuard dashboard mockup.
  * `akhil_orbit_player.webp` — Akhil Orbit Player interface mockup.
  * `akhil_fortress.webp` — Akhil Fortress password checker UI mockup.
* **[robots.txt](robots.txt)** — crawler directives for search engines and AI assistants (GPTBot, ClaudeBot, Google-Extended, PerplexityBot, etc.), plus a sitemap reference.
* **[sitemap.xml](sitemap.xml)** — XML sitemap for search engine discovery.
* **[llms.txt](llms.txt)** — a plain-language summary of the site (background, services, projects, contact) formatted per the [llms.txt convention](https://llmstxt.org/) for AI assistants and answer engines.

---

## 🔍 SEO & AI Discoverability

- **Structured data**: JSON-LD (`Person`, `WebSite`, `ProfilePage`) embedded in `index.html` so search engines and AI assistants can resolve who the site is about, not just what it says.
- **Canonical & social tags**: canonical URL, absolute Open Graph tags, and a Twitter/X card, all pointing at `https://www.akhilbinu.in/`.
- **Crawler access**: `robots.txt` explicitly allows traditional search bots (Googlebot, Bingbot, DuckDuckBot) alongside the crawlers AI assistants use to ground answers (GPTBot, ChatGPT-User, ClaudeBot, Google-Extended, PerplexityBot, and others).
- **`llms.txt`**: a concise, structured summary of who Akhil is, his services, and his projects — written for AI systems that read this file directly instead of parsing the full page.

> Adding these files makes the site crawlable and easy to parse — it doesn't guarantee indexing. Getting listed still requires manually verifying the domain in [Google Search Console](https://search.google.com/search-console) and [Bing Webmaster Tools](https://www.bing.com/webmasters) and submitting `sitemap.xml` there (Bing's index also powers DuckDuckGo and Copilot).

---

## ⚡ Performance

- **Images** are served as compressed WebP, resized to their actual on-page display resolution (2x for retina) — cutting the four portfolio/hero images from ~1.78MB down to ~105KB combined (a ~94% reduction).
- **Below-the-fold images** (portfolio and blog thumbnails) use `loading="lazy"` and `decoding="async"`; the hero profile photo uses `fetchpriority="high"` since it's the page's LCP candidate.
- **Third-party scripts** (Three.js, EmailJS) are loaded at the end of `<body>` instead of `<head>`, so the page's own HTML/CSS can parse and paint before ~600KB of external library code is fetched and executed.
- **Google Fonts** are linked directly from `<head>` (with `rel="preconnect"` hints) rather than via a CSS `@import`, so the font stylesheet is discovered and fetched in parallel with `style.css` instead of after it.

---

## 🛠️ Technology Stack & Integrations

1. **Frontend Core**: Semantic HTML5 & Modern Vanilla CSS (Flexbox & Grid, 3D transforms).
2. **Dynamic Scripting**: Asynchronous Vanilla JavaScript.
3. **3D Rendering**: Three.js (r128) — cyber threat globe and hero data-crystal.
4. **Live Threat Data**: SANS Internet Storm Center backscatter API.
5. **Mail Gateway**: EmailJS SDK Integration.
6. **Futuristic Fonts**: Google Fonts (`Outfit` for readable text, `Space Grotesk` for headers, `Fira Code` for terminal mono listings).

---

## 🚀 Running & Deploying Locally

### Local Run
The project is built fully client-side and does not require complex backend builders.
1. Clone or download the directory.
2. Open **[index.html](index.html)** directly in any modern web browser, or launch it with a lightweight server like VS Code's *Live Server* extension.

### Customizing Contact Gateway
To link the email form to your own credentials:
1. Initialize your key in the head section of [index.html](index.html):
   ```javascript
   emailjs.init("YOUR_PUBLIC_KEY");
   ```
2. Update the service and template IDs inside [script.js](script.js) (around line 380):
   ```javascript
   emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', contactForm)
   ```
