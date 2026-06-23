# Akhil Binu - Personal Cybersecurity Portfolio 🛡️

A high-fidelity, interactive, and beautifully animated single-page portfolio website showcasing Akhil Binu's expertise in security research, penetration testing, VAPT, and digital forensics. Built from scratch with modular vanilla technologies, custom keyframe animation styling, and responsive design systems.

---

## 🌟 Immersive Cyberpunk Aesthetics & Features

### 1. 🕵️ Interactive Matrix Rain Background
- High-performance html5 canvas engine drawing custom green glyph columns.
- **Mouse Proximity Aura**: Canvas tracks cursor coordinates dynamically. Glyphs within `120px` of the mouse turn from green to glowing cyan and fall faster.

### 2. 💻 Command-Line Console Simulator
- Fully functional HUD command prompt mockup. Type standard operations directly or click quick shortcuts below the screen:
  - `help` — Lists operational routines.
  - `about` — Resolves Akhil Binu's bio payload.
  - `skills` — Lists specialized security tools & methodologies.
  - `certs` — FetchesTryHackMe and OPSWAT credentials.
  - `projects` — Details featured repositories and live urls.
  - `contact` — Shows secure communication gateways.
  - `clear` — Clears console log buffer.
  - `banner` — Renders the cybersecurity ascii logo banner.
- **Typing Simulation**: Clicking buttons triggers a typewriter keystroke animation directly inside the input line before running commands.

### 3. 🧪 Glassmorphic Hologram Cards
- Cards react to mouse positions using CSS custom variables (`--mouse-x`, `--mouse-y`) to generate a Vercel-like hover spotlight glow.
- **3D Tilt effect**: Hovering cards on desktop devices calculates cursor distance from the center to skew cards dynamically on the X and Y axes.
- Neon edge indicators (`.card-corner-decor`) light up dynamically on hover.

### 4. 🛜 Real-Time Status logs Form
- The contact form intercepts standard submissions to feed step-by-step logs into a form console display panel (`Resolving gateway...`, `Transmitting payload...`, `Packet acknowledged. 200 OK`) before sending through EmailJS.

---

## 📂 Project Structure & Code Map

* **[index.html](file:///d:/Code/personal-website/index.html)** — Main structure and copy. Includes optimized SEO markup, heading hierarchy, target blank anchors, and viewport settings.
* **[style.css](file:///d:/Code/personal-website/style.css)** — custom CSS Variable tokens, HUD navigation layout, alternating project column states, top-aligned checklist bullet styling, and keyframe animations.
* **[script.js](file:///d:/Code/personal-website/script.js)** — mobile toggles, viewport scroll-reveals, skill fill animations, interactive canvas loops, card 3D tilt coordinates, terminal logic, and EmailJS connection log routines.
* **images/** — Local visual assets directory:
  * `Akhil_ai_formal.png` — Hero section profile avatar.
  * `website-scanner.png` — Akhil WebGuard dashboard mockup.
  * `akhil_orbit_player.png` — Akhil Orbit Player interface mockup.
  * `akhil_fortress.png` — Akhil Fortress password checker UI mockup.

---

## 🛠️ Technology Stack & Integrations

1. **Frontend Core**: Semantic HTML5 & Modern Vanilla CSS (Flexbox & Grid).
2. **Dynamic Scripting**: Asynchronous Vanilla JavaScript.
3. **Mail Gateway**: EmailJS SDK Integration.
4. **Futuristic Fonts**: Google Fonts (`Outfit` for readable text, `Space Grotesk` for headers, `Fira Code` for terminal mono listings).

---

## 🚀 Running & Deploying Locally

### Local Run
The project is built fully client-side and does not require complex backend builders.
1. Clone or download the directory.
2. Open **[index.html](file:///d:/Code/personal-website/index.html)** directly in any modern web browser, or launch it with a lightweight server like VS Code's *Live Server* extensions.

### Customizing Contact Gateway
To link the email form to your own credentials:
1. Initialize your key in the head section of [index.html](file:///d:/Code/personal-website/index.html):
   ```javascript
   emailjs.init("YOUR_PUBLIC_KEY");
   ```
2. Update the service and template IDs inside [script.js](file:///d:/Code/personal-website/script.js) (around line 350):
   ```javascript
   emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', contactForm)
   ```
