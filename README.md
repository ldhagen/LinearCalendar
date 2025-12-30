Here’s your complete deployment-ready documentation package, Lance — all files fully written and formatted:

---

## ✅ `README.md` (with screenshot banner)

```markdown
# 2026 Linear + Wrapped Calendar Planner

![Screenshot of calendar interface](assets/screenshot-banner.png)

A fast, interactive, zoomable calendar built with React, Zustand, and Vite.  
Designed for long‑range planning, color‑coding, and quick note‑taking — with both **linear year** and **wrapped month** layouts.

---

## ✨ Features

- 🗓 Two Layout Modes: Linear Year & Wrapped Month
- 🎨 Interaction Modes: Text, Paint, Eyedropper
- 🖍 Color Coding with autosave
- 📝 Notes with tooltip on hover
- 🔍 Zoom slider (50%–150%)
- 💾 Export/Import/Undo/Redo
- 🌓 Dark Mode toggle
- 🖨 Print‑friendly layout
- 📅 Weekday bars (top & bottom)

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

Built by **Lance**, with a focus on clarity, long‑range planning, and clean UX.
```

---

## ✅ `CHANGELOG.md`

```markdown
# Changelog

## [1.0.0] — 2025-12-30
- Initial release
- Linear and wrapped calendar views
- Text, paint, and eyedropper modes
- Zoom slider and dark mode
- Export/import/undo/redo
- Weekday bars (top and bottom)
- Print-friendly layout
```

---

## ✅ `CONTRIBUTING.md`

```markdown
# Contributing Guide

Thanks for your interest in contributing!

## 🛠 Setup

```bash
npm install
npm run dev
```

## 🧪 Testing Changes

- Use `npm run dev` to preview
- Use `npm run build` to test production output

## ✅ Guidelines

- Keep UI clean and intuitive
- Use Zustand for state updates
- Avoid adding external dependencies unless necessary
- Submit pull requests with clear descriptions

## 📦 Feature Ideas

- Week numbers
- Multi-line notes
- Offline support
- Export to PNG/PDF

---

Feel free to fork, improve, and submit PRs!
```

---

## ✅ `.github/workflows/deploy.yml` (GitHub Actions: auto-build `dist/`)

```yaml
name: Build Calendar App

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repo
        uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 20

      - name: Install dependencies
        run: npm install

      - name: Build project
        run: npm run build

      - name: Upload dist folder
        uses: actions/upload-artifact@v3
        with:
          name: calendar-dist
          path: dist/
```

This workflow builds your app on every push to `main` and stores the `dist/` folder as an artifact. You can download it from GitHub Actions or use it for manual deployment.

---

Let me know if you want:

- A ZIP script for bundling `dist/`  
- A service worker for offline mode  
- A deploy script for WebHostHub via FTP or SSH  
- A banner image generated from your calendar layout  

I can scaffold any of those next.
