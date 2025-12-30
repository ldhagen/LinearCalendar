
---

# 📘 **README.md (Complete & Combined)**

```markdown
# 2026 Linear + Wrapped Calendar Planner  
A fast, interactive, zoomable calendar built with React, Zustand, and Vite.  
Designed for long‑range planning, color‑coding, and quick note‑taking — with both **linear year** and **wrapped month** layouts.

---

## ✨ Features

### 🗓 Two Layout Modes
- **Linear Year View** — all 365 days in a continuous horizontal strip  
- **Wrapped Month View** — each month on its own row  
- Toggle instantly between layouts

### 🎨 Interaction Modes
- **Text Mode (default)**  
  - Double‑click a day to add/edit notes  
  - Notes show as tooltips on hover  
- **Paint Mode**  
  - Double‑click a day to apply the active color  
- **Eyedropper Mode**  
  - Click a colored day to pick up its color

### 🖍 Color Coding
- Unlimited colors  
- Weekend shading  
- Color persists across sessions (autosave)

### 📝 Notes
- Each day supports a text note  
- Notes appear truncated in the cell  
- Full note appears on hover (tooltip)

### 🔍 Zoom
- Adjustable zoom slider (50% → 150%)  
- Works in both layouts  
- Print view always uses 100%

### 💾 Data Persistence
- **Autosave** to `localStorage`  
- **Export** to JSON  
- **Import** from JSON  
- **Undo / Redo** (full state history)

### 🌓 Dark Mode
- Full dark theme  
- Toggle anytime

### 🖨 Print‑Friendly
- Toolbar hidden in print mode  
- Clean layout for paper  
- Linear and wrapped both printable

### 📅 Weekday Bars
- Linear view: weekday bar at **top and bottom**  
- Wrapped view: weekday bar **above and below each month**  
- Perfect weekday alignment

---

## 🛠 Tech Stack

- **React 18**
- **Zustand** (single‑store architecture)
- **Vite**
- **TypeScript**
- **CSS Grid**
- **LocalStorage persistence**

---

## 📂 Project Structure

```
src/
  components/
    App.tsx
    Toolbar.tsx
    LinearCalendar.tsx
    DayCell.tsx
  utils/
    calendarUtils.ts
  styles/
    calendar.css
  store.ts
  types.ts
index.html
vite.config.ts
package.json
```

---

## 🚀 Running Locally

### 1. Install dependencies
```bash
npm install
```

### 2. Start dev server
```bash
npm run dev
```

The app will be available at:

```
http://localhost:5173
```

---

## 🏗 Building for Production

```bash
npm run build
```

This generates a static site in:

```
dist/
```

Contents include:

- `index.html`
- `assets/` (JS, CSS, images)

---

## 🌐 Deploying to WebHostHub.com

WebHostHub supports static sites, so deployment is simple.

### 1. Build locally
```bash
npm run build
```

### 2. Upload the **contents** of `dist/` to:

```
public_html/
```

You can upload via:

- cPanel File Manager  
- FTP (FileZilla, Cyberduck)  
- SSH (if enabled)

### 3. Visit your domain  
Your calendar will be live immediately.

---

## 📁 Deploying to a Subfolder

If hosting at:

```
https://yourdomain.com/calendar/
```

Update `vite.config.ts`:

```ts
export default defineConfig({
  base: '/calendar/',
  plugins: [react()]
});
```

Then rebuild and upload again.

---

## 🔧 Configuration

### Change the year
In `calendarUtils.ts`:

```ts
export const YEAR = 2026;
```

### Change cell size
In `calendar.css`:

```css
width: 24px;
height: 24px;
```

### Change zoom defaults
In `store.ts`:

```ts
zoom: 1.0
```

---

## 🧪 Future Enhancements

- Week numbers  
- Multi‑line notes (popover editor)  
- Color legend  
- Export to PNG/PDF  
- Offline mode (service worker)  
- Cloud sync  
- Vertical grid lines for weekdays  
- Alternating shading every 7 days  

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

## 👤 Author

Built by **Lance**, with a focus on clarity, long‑range planning, and a clean UX.

```

---

If you want, I can also generate:

- A **screenshot banner** for the top of the README  
- A **CHANGELOG.md**  
- A **CONTRIBUTING.md**  
- A **GitHub Actions workflow** that auto‑builds your `dist/` folder  

Just tell me what you want to add next.
