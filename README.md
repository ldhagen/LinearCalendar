
# 2026 Linear + Wrapped Calendar Planner

<p align="center">
  <img src="https://github.com/ldhagen/LinearCalendar/blob/main/assets/Screenshot_small.png?raw=true" alt="Calendar Screenshot" width="800">
</p>

A fast, interactive, zoomable calendar built with **React**, **Zustand**, and **Vite**.  
Designed for long‑range planning, color‑coding, and quick note‑taking — with both **linear year** and **wrapped month** layouts.

---

## ✨ Features

- 🗓 **Two Layout Modes:** Linear Year & Wrapped Month  
- 🎨 **Interaction Modes:** Text, Paint, Eyedropper  
- 🖍 **Color Coding** with autosave  
- 📝 **Notes** with tooltip on hover  
- 🔍 **Zoom slider** (50%–150%)  
- 💾 **Export / Import / Undo / Redo**  
- 🌓 **Dark Mode** toggle  
- 🖨 **Print‑friendly** layout  
- 📅 **Weekday bars** (top & bottom)

---

## 🛠 Tech Stack

- React 18  
- Zustand  
- Vite  
- TypeScript  
- CSS Grid  
- LocalStorage  

---

## 📂 Project Structure

```
src/
  components/
  utils/
  styles/
  store.ts
  types.ts
index.html
vite.config.ts
package.json
```

---

## 🚀 Running Locally

```bash
npm install
npm run dev
```

Visit: `http://localhost:5173`

---

## 🏗 Building for Production

```bash
npm run build
```

Output: `dist/`

---

## 🌐 Deploying to WebHostHub

1. Build locally: `npm run build`  
2. Upload contents of `dist/` to `public_html/`  
3. Visit your domain

If deploying to a subfolder like `/calendar`, update `vite.config.ts`:

```ts
export default defineConfig({
  base: '/calendar/',
  plugins: [react()]
});
```

---

## 🔧 Configuration

- Change year: `calendarUtils.ts`  
- Cell size: `calendar.css`  
- Zoom default: `store.ts`  

---

## 🧪 Future Enhancements

- Week numbers  
- Multi-line notes  
- Color legend  
- PNG/PDF export  
- Offline mode  
- Cloud sync  

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

## 👤 Author

Built by Lance Hagen using CoPilot slop with a focus on clarity, long‑range planning, and clean UX.
```

---

