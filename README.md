# ✨ Bobby Studio — Luxury Photography Platform

> **Next-Generation Enterprise-Grade MERN Stack Photography Studio Platform**

A premium, award-winning-caliber photography studio website built with React 19, TypeScript, Tailwind CSS, Framer Motion, GSAP, Express.js, and MongoDB.

---

## 🚀 Tech Stack

### Frontend
- **React 19** + **Vite** + **TypeScript**
- **Tailwind CSS** — Utility-first styling with custom design system
- **Framer Motion** — Page transitions & micro-interactions
- **GSAP** — Text reveals & scroll animations
- **Swiper.js** — Premium carousels
- **Zustand** — Lightweight state management
- **React Query** — Server state & caching

### Backend
- **Node.js** + **Express.js** + **TypeScript**
- **MongoDB** + **Mongoose** — Database & ODM
- **JWT** — Authentication (access + refresh tokens)
- **bcrypt** — Password hashing
- **Helmet** + **CORS** + **Rate Limiting** — Security

---

## 📂 Project Structure

```
bobby studio/
├── frontend/           # React 19 + Vite + TypeScript
│   ├── src/
│   │   ├── components/ # UI primitives, layout, animations
│   │   ├── pages/      # Route pages
│   │   ├── styles/     # Global CSS & Tailwind config
│   │   └── ...
│   └── package.json
│
├── backend/            # Express + TypeScript API
│   ├── src/
│   │   ├── config/     # Database, env config
│   │   ├── middleware/ # Auth, validation
│   │   ├── models/     # Mongoose schemas
│   │   ├── routes/     # API endpoints
│   │   └── seeds/      # Database seeding
│   └── package.json
│
└── README.md
```

---

## 🛠️ Getting Started

### Prerequisites
- Node.js 20+
- MongoDB (local or Atlas)

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at `http://localhost:5173`

### Backend
```bash
cd backend
cp .env.example .env    # Configure your env vars
npm install
npm run dev
```
Backend runs at `http://localhost:5000`

### Seed Database
```bash
cd backend
npm run seed
```
Admin: `admin@bobbystudio.com` / `Bobby@2024`

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Background | `#0A0A0A` |
| Cards | `#111111` |
| Primary (Gold) | `#D4AF37` |
| Hover | `#FFE082` |
| Text | `#F8F8F8` |
| Muted | `#9CA3AF` |

**Fonts**: Space Grotesk, Inter, Cormorant Garamond

---

## 📄 API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout` | Logout user |
| GET | `/api/auth/me` | Get current user |
| GET | `/api/services` | List all services |
| GET | `/api/services/featured` | Featured services |
| GET | `/api/services/:slug` | Single service |
| GET | `/api/testimonials` | List testimonials |
| POST | `/api/contact` | Submit contact form |

---

## 📜 License

Private — Bobby Studio © 2024. All rights reserved.
