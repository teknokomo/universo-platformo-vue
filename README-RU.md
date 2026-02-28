# universo-platformo-vue

Реализация **Universo Platformo** на Vue 3 / TypeScript / Django / Supabase — универсальная платформа, объединяющая глобальные проекты, кампании и сообщества в единую цифровую экосистему.

## Обзор

Этот репозиторий является Vue-аналогом [universo-platformo-react](https://github.com/teknokomo/universo-platformo-react). Он реализует ту же функциональность — стартовые страницы, аутентификацию и онбординг — используя **Vue 3 + TypeScript** на фронтенде и **Django + Supabase** на бэкенде.

> **Ключевой архитектурный принцип:** Фронтенд **никогда** не подключается к Supabase напрямую.  
> Все операции Supabase (аутентификация, база данных, хранилище) происходят внутри Django-бэкенда.  
> Vue-фронтенд взаимодействует только со своим Django API (`/api/v1/...`).

## Технологический стек

### Фронтенд
| Технология | Назначение |
|---|---|
| [Vue 3](https://vuejs.org/) | UI-фреймворк (Composition API + `<script setup>`) |
| [TypeScript](https://www.typescriptlang.org/) | Статическая типизация |
| [Vite](https://vitejs.dev/) | Сборщик и dev-сервер |
| [Vue Router 4](https://router.vuejs.org/) | Клиентская маршрутизация |
| [Vue I18n 9](https://vue-i18n.intlify.dev/) | Интернационализация (русский / английский) |
| [Axios](https://axios-http.com/) | HTTP-клиент с перехватчиками CSRF и 401 |
| [pnpm](https://pnpm.io/) | Менеджер пакетов монорепозитория (workspaces) |

### Бэкенд (отдельный сервис)
| Технология | Назначение |
|---|---|
| [Django](https://www.djangoproject.com/) | REST API сервер |
| [Django REST Framework](https://www.django-rest-framework.org/) | API-слой |
| [Supabase](https://supabase.com/) | Аутентификация, база данных (PostgreSQL), хранилище — только на бэкенде |

## Структура репозитория

```
universo-platformo-vue/
├── packages/
│   ├── auth-frontend/base/      # Vue-модуль аутентификации
│   │   └── src/
│   │       ├── api/client.ts    # Axios-клиент с CSRF, редиректом 401, retry
│   │       ├── composables/
│   │       │   ├── useAuth.ts   # inject-хук контекста аутентификации
│   │       │   └── useSession.ts # состояние сессии (user, loading, error)
│   │       ├── components/
│   │       │   ├── AuthProvider.vue  # Корневой провайдер (provide/inject)
│   │       │   └── LoginForm.vue    # Форма email/пароль
│   │       └── pages/AuthPage.vue   # Страница входа во весь экран
│   │
│   ├── start-frontend/base/     # Vue-модуль стартовых страниц
│   │   └── src/
│   │       ├── composables/
│   │       │   └── useOnboardingApi.ts  # Использует клиент AuthProvider
│   │       ├── views/
│   │       │   ├── StartPage.vue            # Маршрутизация по состоянию auth
│   │       │   ├── GuestStartPage.vue       # Лендинг для гостей
│   │       │   └── AuthenticatedStartPage.vue # Онбординг для пользователей
│   │       ├── views/components/
│   │       │   ├── AppAppBar.vue    # Адаптивная навигационная панель
│   │       │   ├── Hero.vue         # Hero-секция с кнопкой призыва к действию
│   │       │   └── Testimonials.vue # Сетка отзывов из 4 колонок
│   │       ├── components/
│   │       │   ├── OnboardingWizard.vue # Многошаговый мастер
│   │       │   └── StartFooter.vue      # Футер со ссылками
│   │       ├── api/onboarding.ts    # API онбординга (автономный резерв)
│   │       ├── i18n/                # Переводы ru / en
│   │       └── types/               # TypeScript-интерфейсы
│   │
│   └── app/                     # Точка входа Vite-приложения
│       ├── src/
│       │   ├── main.ts          # Инициализация (Vue, Router, I18n)
│       │   ├── App.vue          # Корневой компонент с AuthProvider
│       │   └── router.ts        # Маршруты: / и /auth
│       ├── public/              # Статические ресурсы
│       ├── vite.config.ts       # Конфигурация Vite с прокси API
│       └── .env.example         # Справка по переменным окружения
│
├── package.json                 # Корневой манифест workspace
└── pnpm-workspace.yaml          # Конфигурация pnpm workspaces
```

## Архитектура аутентификации

```
Браузер (Vue 3)
    │
    │  POST /api/v1/auth/login   (email + пароль)
    │  GET  /api/v1/auth/me
    │  POST /api/v1/auth/logout
    ▼
Django-бэкенд
    │
    │  supabase.auth.sign_in_with_password(...)
    │  supabase.auth.get_user(jwt)
    │  supabase.auth.sign_out(...)
    ▼
Supabase (Auth + PostgreSQL)
```

Vue-фронтенд использует **cookie-сессии**, управляемые Django. CSRF-токены запрашиваются с `GET /api/v1/auth/csrf` и автоматически добавляются в каждый мутирующий запрос (`POST`, `PUT`, `PATCH`, `DELETE`).

## Страницы

| Маршрут | Компонент | Показывается |
|---|---|---|
| `/` | `StartPage` → `GuestStartPage` | Неаутентифицированным пользователям |
| `/` | `StartPage` → `AuthenticatedStartPage` | Аутентифицированным пользователям |
| `/auth` | `AuthPage` | Всем |

`StartPage` проверяет состояние аутентификации один раз и отображает либо лендинг, либо мастер онбординга без дополнительных редиректов.

## Мастер онбординга

Многошаговый мастер помогает новым пользователям выбрать интересы:

1. **Приветствие** — вводный экран
2. **Проекты** — выбор глобальных целей
3. **Кампании** — выбор личных интересов
4. **Кластеры** — выбор функций платформы
5. **Завершение** — подтверждение и следующие шаги

Выбор сохраняется через `POST /api/v1/onboarding/join` после последнего шага.

## Начало работы

### Требования

- Node.js ≥ 18
- pnpm ≥ 8
- Запущенный Django-бэкенд на `http://localhost:8000`

### Установка

```bash
pnpm install
```

### Настройка

```bash
cp packages/app/.env.example packages/app/.env.local
# Укажите VITE_API_TARGET, если Django запущен на другом порту
```

### Разработка

```bash
pnpm dev
# Открывает http://localhost:3000
# Запросы API проксируются на $VITE_API_TARGET
```

### Сборка для продакшена

```bash
pnpm build
# Результат: packages/app/dist/
```

## Интернационализация

Интерфейс доступен на **русском** (по умолчанию) и **английском** языках.  
Файлы переводов находятся в `packages/start-frontend/base/src/i18n/locales/` и `packages/app/src/i18n/`.

## Безопасность

- Учётные данные Supabase отсутствуют в коде фронтенда.
- Фронтенд хранит только короткоживущие cookie-сессии, установленные Django (`HttpOnly`, `SameSite`).
- CSRF-токены хранятся в `sessionStorage` и передаются как заголовок `X-CSRF-Token`.
- Все внешние ссылки используют `rel="noopener noreferrer"`.

## Лицензия

Omsk Open License
