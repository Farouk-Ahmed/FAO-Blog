# FAO-Blog · TECHOS High-Tech Dashboard

![Angular](https://img.shields.io/badge/Angular-18-DD0031?logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwind-css&logoColor=white)

A role-based **Angular** web application with a glassmorphism UI, **dark/light themes**, mock authentication stored in **localStorage**, and three tailored dashboards (**Admin**, **Manager**, **User**).

---

## Table of contents

| | Section |
|---|--------|
| 📌 | [Overview](#-overview) |
| 🛠️ | [Tech stack](#️-tech-stack) |
| 🖼️ | [Screenshots tour](#️-screenshots-tour) |
| 📖 | [Using the application (complete walkthrough)](#-using-the-application-complete-walkthrough) |
| 🚀 | [Getting started (development)](#-getting-started-development) |
| 📁 | [Project structure](#-project-structure) |

---

## 📌 Overview

- **🔐 Authentication** — Register and sign in; sessions persist via `localStorage`.
- **👤 Roles** — After login, you are routed to `/dashboard/admin`, `/dashboard/manager`, or `/dashboard/user` according to your role.
- **🛡️ Route protection** — `authGuard` blocks unauthenticated access and redirects users to the correct dashboard if the URL role does not match.
- **🎨 Theming** — Toggle light/dark mode from the login/register pages and from each dashboard sidebar.
- **📊 Dashboards** — KPI-style cards, charts (Admin), and role-specific navigation labels.

> **Note on images below:** The files in [`docs/screenshots/`](docs/screenshots/) are **illustrative SVG wireframes** that match the real layout. Replace them with your own **PNG/WebP screenshots** from a running build (same filenames) if you want pixel-accurate documentation.

---

## 🛠️ Tech stack

| Area | Choice |
|------|--------|
| **⚡ Framework** | Angular 18 (standalone components) |
| **📝 Language** | TypeScript |
| **🎨 Styling** | Tailwind CSS 4 |
| **🧭 Routing** | `@angular/router` with `canActivate` guard |
| **✨ Icons** | `lucide-angular` |
| **📈 Charts** | D3 (`ChartComponent` on Admin dashboard) |

---

## 🖼️ Screenshots tour

Each subsection **first explains what you are looking at**, then shows the matching visual.

### 🔑 Login — secure entry point

The **login** screen is the default route (`/` redirects to `/login`). You enter **email** and **password** that must match a user previously stored by registration. A **theme toggle** sits in the top-right corner. Successful login sends you to the dashboard that matches your **role**. Invalid credentials show an inline **error** message.

![Login screen — email/password form with glass card and theme toggle](docs/screenshots/login.svg)

---

### ✍️ Register — create an account and pick a role

On **register**, you provide **full name**, **email**, **password**, and select one of three **roles**: **Admin**, **Manager**, or **User**. New accounts are appended to the mock `users` list in `localStorage`. After registering, sign in on the login page with the same email and password.

![Register screen — role selection and account fields](docs/screenshots/register.svg)

---

### 🛡️ Admin dashboard — analytics-focused overview

**Admins** land on a layout with **TECHOS** branding (accent green), a **sidebar** (Overview, User Management, System Logs, Settings), **KPI cards**, and a **chart** area. The header includes search and notification affordances. **Logout** clears the session and returns to login. A **welcome modal** may appear on first visit in the session.

![Admin dashboard — sidebar, KPIs, and chart region](docs/screenshots/dashboard-admin.svg)

---

### 💼 Manager dashboard — team and operations hub

**Managers** see a **purple** accent theme, a **Management Hub** sidebar (Team Overview, Schedules, Settings), and management-oriented summary panels. Theme toggle and logout behave the same as on other dashboards.

![Manager dashboard — purple accent and hub layout](docs/screenshots/dashboard-manager.svg)

---

### 👤 User dashboard — personal workspace

**Standard users** get a **blue** accent theme with **My Dashboard**, **My Activity**, and **Profile Settings** in the sidebar—oriented toward individual tasks and status rather than org-wide analytics.

![User dashboard — personal workspace and blue accent](docs/screenshots/dashboard-user.svg)

---

## 📖 Using the application (complete walkthrough)

This section is a **blog-style, end-to-end guide** to the product: what it is for, how data flows, and how to use every major part in order.

### 🎯 What this app is for

TECHOS is a **demo dashboard** that shows how a modern SPA can combine **authentication**, **role-based routing**, and **distinct experiences per role**. It does **not** call a remote API; all user records live in the browser’s **localStorage**, which makes it easy to try locally without a backend.

### 🧭 First launch — where you start

1. Open the app in the browser (after `ng serve`, typically `http://localhost:3000`).
2. You are redirected to **`/login`** automatically.
3. If you have **no account** yet, use the **“Create one”** link to open **`/register`**.

### ✉️ Creating your first user

1. On **register**, fill in **name**, **email**, and **password**.
2. Tap a **role card** (**Admin** / **Manager** / **User**)—this decides which dashboard URL you will use after login.
3. Submit the form. The user is saved (including password for mock login) under the `users` key in **localStorage**.

### 🔓 Signing in and routing

1. On **login**, use the **same email and password** you registered.
2. On success, the app navigates to:
   - **`/dashboard/admin`** for Admin  
   - **`/dashboard/manager`** for Manager  
   - **`/dashboard/user`** for User  
3. If you try to open another role’s URL manually, the **guard** redirects you to **your** dashboard (or to login if you are signed out).

### 🎨 Theme and layout habits

- **🌓 Theme:** Use the **theme toggle** on auth pages or in the dashboard sidebar to switch **light/dark**; preference is handled by `ThemeService` and applied across the UI.
- **📱 Layout:** Dashboards use a **responsive** sidebar + main content pattern; on smaller viewports, plan for stacked navigation (as implemented in the templates).

### 📊 Working inside each dashboard

- **Admin:** Explore **overview metrics**, **sidebar sections** (some are visual/navigation placeholders), and the **chart** component driven by **D3**.
- **Manager:** Focus on **team-oriented** copy and cards; use **logout** when finished.
- **User:** Review **personal** status widgets and sidebar items aligned to a **single user**.

### 🚪 Leaving the app or resetting data

- **Logout** removes `currentUser` from **localStorage** and sends you to **`/login`**.
- To **reset all mock users**, clear site data for the origin in your browser (or remove the `users` and `currentUser` keys in DevTools → Application → Local Storage).

### ⚠️ Limitations (good to know)

- **🔒 Not production auth:** Passwords are stored in **localStorage** for demonstration only—never use this pattern for real security.
- **🧪 Mock data:** Metrics and some nav items are **UI demonstrations**, not live admin APIs.

---

## 🚀 Getting started (development)

### Prerequisites

- **Node.js** (LTS recommended)  
- **npm**

### Install and run

```bash
npm install --legacy-peer-deps
npm run start
```

The dev server is configured for **port 3000** (see `package.json`). Open the URL shown in the terminal (e.g. `http://localhost:3000`).

### Build for production

```bash
npm run build
```

### 📸 Replacing screenshots

1. Run the app and capture PNGs of **login**, **register**, and each **dashboard**.
2. Save them under `docs/screenshots/` (you can use `.png` and update the image paths in this README to match).

---

## 📁 Project structure (high level)

| Path | Role |
|------|------|
| `src/app/app.routes.ts` | Route definitions and `authGuard` per dashboard |
| `src/app/services/auth.service.ts` | Mock login, register, logout, `localStorage` |
| `src/app/guards/auth.guard.ts` | Protects routes and enforces role match |
| `src/app/pages/login` | Login page |
| `src/app/pages/register` | Registration + role selection |
| `src/app/pages/dashboards/*` | Admin, Manager, User dashboards |
| `src/app/components/` | Shared UI (chart, theme toggle, welcome modal) |
| `docs/screenshots/` | README imagery (SVG wireframes or your PNGs) |

---

## 📄 License

This project is private (`"private": true` in `package.json`). Add a public license file here if you open-source the repository.

---

<p align="center"><strong>Built with Angular · Tailwind · Lucide</strong></p>
