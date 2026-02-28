# universo-platformo-vue

Vue 3 / TypeScript / Django / Supabase implementation of **Universo Platformo** — a universal platform connecting global projects, campaigns, and communities into a single digital ecosystem.

## Overview

This repository is the Vue counterpart of [universo-platformo-react](https://github.com/teknokomo/universo-platformo-react). It re-implements the same functionality — start pages, authentication, and onboarding — using **Vue 3 + TypeScript** on the frontend and **Django + Supabase** on the backend.

> **Key architecture principle:** The frontend **never** connects to Supabase directly.  
> All Supabase operations (auth, database, storage) happen inside the Django backend.  
> The Vue frontend only communicates with its own Django API (`/api/v1/...`).

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| [Vue 3](https://vuejs.org/) | UI framework (Composition API + `<script setup>`) |
| [TypeScript](https://www.typescriptlang.org/) | Static typing |
| [Vite](https://vitejs.dev/) | Build tool and dev server |
| [Vue Router 4](https://router.vuejs.org/) | Client-side routing |
| [Vue I18n 9](https://vue-i18n.intlify.dev/) | Internationalisation (Russian / English) |
| [Axios](https://axios-http.com/) | HTTP client with CSRF & 401 interceptors |
| [pnpm](https://pnpm.io/) | Monorepo package manager (workspaces) |

### Backend (separate service)
| Technology | Purpose |
|---|---|
| [Django](https://www.djangoproject.com/) | REST API server |
| [Django REST Framework](https://www.django-rest-framework.org/) | API layer |
| [Supabase](https://supabase.com/) | Auth, database (PostgreSQL), storage — backend only |

## Repository Structure

```
universo-platformo-vue/
├── packages/
│   ├── auth-frontend/base/      # Vue authentication module
│   │   └── src/
│   │       ├── api/client.ts    # Axios client with CSRF, 401 redirect, retry
│   │       ├── composables/
│   │       │   ├── useAuth.ts   # inject-based auth context hook
│   │       │   └── useSession.ts # session state (user, loading, error)
│   │       ├── components/
│   │       │   ├── AuthProvider.vue  # Root provider (provide/inject)
│   │       │   └── LoginForm.vue    # Email/password form
│   │       └── pages/AuthPage.vue   # Full-page login view
│   │
│   ├── start-frontend/base/     # Vue start-page module
│   │   └── src/
│   │       ├── composables/
│   │       │   └── useOnboardingApi.ts  # Uses shared AuthProvider client
│   │       ├── views/
│   │       │   ├── StartPage.vue            # Routes by auth state
│   │       │   ├── GuestStartPage.vue       # Landing for guests
│   │       │   └── AuthenticatedStartPage.vue # Onboarding for users
│   │       ├── views/components/
│   │       │   ├── AppAppBar.vue    # Responsive navigation bar
│   │       │   ├── Hero.vue         # Hero section with CTA
│   │       │   └── Testimonials.vue # 4-column testimonials grid
│   │       ├── components/
│   │       │   ├── OnboardingWizard.vue # Multi-step wizard
│   │       │   └── StartFooter.vue      # Footer with links
│   │       ├── api/onboarding.ts    # Onboarding API (standalone fallback)
│   │       ├── i18n/                # ru / en translations
│   │       └── types/               # TypeScript interfaces
│   │
│   └── app/                     # Vite application entry point
│       ├── src/
│       │   ├── main.ts          # App bootstrap (Vue, Router, I18n)
│       │   ├── App.vue          # Root component with AuthProvider
│       │   └── router.ts        # Routes: / and /auth
│       ├── public/              # Static assets
│       ├── vite.config.ts       # Vite config with API proxy
│       └── .env.example         # Environment variable reference
│
├── package.json                 # Root workspace manifest
└── pnpm-workspace.yaml          # pnpm workspaces config
```

## Authentication Architecture

```
Browser (Vue 3)
    │
    │  POST /api/v1/auth/login   (email + password)
    │  GET  /api/v1/auth/me
    │  POST /api/v1/auth/logout
    ▼
Django Backend
    │
    │  supabase.auth.sign_in_with_password(...)
    │  supabase.auth.get_user(jwt)
    │  supabase.auth.sign_out(...)
    ▼
Supabase (Auth + PostgreSQL)
```

The Vue frontend uses **cookie-based sessions** managed by Django. CSRF tokens are fetched from `GET /api/v1/auth/csrf` and injected automatically into every mutating request (`POST`, `PUT`, `PATCH`, `DELETE`).

## Pages

| Route | Component | Shown to |
|---|---|---|
| `/` | `StartPage` → `GuestStartPage` | Unauthenticated users |
| `/` | `StartPage` → `AuthenticatedStartPage` | Authenticated users |
| `/auth` | `AuthPage` | Everyone |

`StartPage` checks authentication state once and renders either the landing page or the onboarding wizard with no additional redirect.

## Onboarding Wizard

The multi-step wizard guides new users through selecting their interests:

1. **Welcome** — introduction screen
2. **Projects** — select global goals
3. **Campaigns** — select personal interests
4. **Clusters** — select platform features
5. **Completion** — confirmation and next steps

Selections are saved via `POST /api/v1/onboarding/join` after the final step.

## Getting Started

### Prerequisites

- Node.js ≥ 18
- pnpm ≥ 8
- A running Django backend on `http://localhost:8000`

### Install

```bash
pnpm install
```

### Configure

```bash
cp packages/app/.env.example packages/app/.env.local
# Edit VITE_API_TARGET if your Django server runs on a different port
```

### Development

```bash
pnpm dev
# Opens http://localhost:3000
# API calls are proxied to $VITE_API_TARGET
```

### Production Build

```bash
pnpm build
# Output: packages/app/dist/
```

## Internationalisation

The UI is available in **Russian** (default) and **English**.  
Translation files live in `packages/start-frontend/base/src/i18n/locales/` and `packages/app/src/i18n/`.

## Security Notes

- No Supabase credentials exist anywhere in the frontend code.
- The frontend holds only short-lived session cookies set by Django (`HttpOnly`, `SameSite`).
- CSRF tokens are stored in `sessionStorage` and sent as `X-CSRF-Token` header.
- All external links use `rel="noopener noreferrer"`.

## License

Omsk Open License
