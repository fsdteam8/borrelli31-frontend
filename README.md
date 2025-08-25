## ✨ Key Features

### Core Architecture

- **Next.js 13+** with App Router support
- **TypeScript** first-class support
- **Tailwind CSS** v3 with optimized configuration
- **shadcn/ui** components pre-integrated
- **Strict ESLint & Prettier** setup

### Optional Modules

- 🔐 **Authentication**: NextAuth.js with OAuth providers
- 🗄 **Database**: MongoDB

### Developer Experience

- 📁 **Modular architecture** with clear separation of concerns
- 🛠 **Path aliases** (`@/`) for cleaner imports
- ⚡ **Optimized build configuration**
- 📦 **PNPM** workspace support
- 🔄 **Husky hooks** for pre-commit checks

# 📁 Project Folder Structure Documentation

This documentation explains the purpose and structure of each directory in a modern, scalable Next.js (App Router) project.

---

## ✅ 🔰 Folder Structure

```
src/
│
├── app/                         # All Next.js routes (App Router)
│   ├── (public)/                # Public marketing pages
│   │   ├── about/
│   │   ├── contact/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── (auth)/                  # Auth related routes
│   │   ├── login/
│   │   ├── register/
│   │   └── layout.tsx
│   │
│   ├── (dashboard)/             # Protected dashboard layout
│   │   ├── dashboard/
│   │   │   ├── page.tsx         # Dashboard home
│   │   │   └── (routes)/        # Nested dashboard routes
│   │   │       ├── analytics/
│   │   │       ├── products/
│   │   │       ├── users/
│   │   │       └── ...
│   │   └── layout.tsx
│   │
│   ├── api/                     # Route handlers (API routes)
│   │   ├── auth/
│   │   │   └── [...nextauth]/route.ts
│   │   ├── user/
│   │   ├── product/
│   │   └── ...
│   │
│   └── layout.tsx               # Root layout
│
├── components/                  # Reusable UI & feature components
│   ├── layout/                  # Navbar, Sidebar, Footer
│   ├── ui/                      # Pure UI: Button, Input, Modal
│   ├── features/                # Feature-based UI (e.g., DashboardCard.tsx)
│   ├── shared/                  # Cross-feature components
│   └── common/                  # Loader, EmptyState, ErrorPage
│
├── constants/                   # App constants
│   ├── routes.ts
│   ├── roles.ts
│   └── messages.ts
│
├── hooks/                       # Reusable custom hooks
│   ├── useAuth.ts
│   ├── useDebounce.ts
│   └── useSidebarToggle.ts
│
├── lib/                         # Utility functions, services
│   ├── axiosInstance.ts
│   ├── stripe.ts
│   └── auth.ts
│
├── middleware.ts                # Next.js middleware
│
├── store/                       # State management (Redux/Zustand)
│   ├── slices/
│   │   ├── userSlice.ts
│   │   └── ...
│   └── index.ts
│
├── styles/                      # Global & page-specific styles
│   ├── globals.css
│   ├── theme.css
│   └── dashboard.css
│
├── types/                       # TypeScript types/interfaces
│   ├── user.ts
│   ├── product.ts
│   └── index.ts
│
├── utils/                       # General utility functions
│   ├── formatDate.ts
│   ├── currencyFormatter.ts
│   └── ...
│
└── config/                      # App config, env settings
    ├── env.ts
    └── site.ts
```

---

## 🧠 Notes

- Grouping inside `app/` using `(auth)`, `(dashboard)`, and `(public)` improves route separation and layout composition.
- `components/` is subdivided by purpose: layout, feature-specific, shared, and common.
- Centralized `constants/`, `hooks/`, `lib/`, `utils/`, and `types/` increase reusability and separation of concerns.
- Follows modern modular architecture for scalability, maintainability, and DX.

---

> 🎯 This structure is designed to handle large-scale production apps efficiently while maintaining simplicity for smaller projects.
