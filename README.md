# Kizen Education Website

Official modern web application for **Kizen Education** — Chandigarh's premier full-spectrum Commerce & Finance Institute (11th & 12th Commerce, B.Com, BBA, M.Com, MBA, and ACCA Global).

## 🚀 Tech Stack

- **Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Routing:** [React Router v7](https://reactrouter.com/) (Single Page Application with SPA Rewrites)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) + Custom Design Tokens (Ivory `#F7F3EA`, Paper `#FBF9F4`, Ink `#1B1A17`, Navy `#122036`, Gold `#C89B3C`)
- **Typography:** Fraunces Display Serif & Inter
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Deployment:** Vercel

## 📦 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

### 4. Preview / Serve
```bash
npm run serve
```

## 📂 Project Structure

```text
├── public/               # Static assets, WebP images, real campus slides, MP4 videos
├── src/
│   ├── components/       # Header, Footer, EnquiryForm, CourseCard, Eyebrow, StatItem
│   ├── pages/            # Home, Courses, ACCA, About, Contact
│   ├── App.jsx           # Application Router
│   └── index.css         # Global design tokens & styling
├── vercel.json           # Vercel SPA routing rewrite rules
└── vite.config.js        # Vite build configuration
```
