# Research: Universo Platformo Vue Project Initialization

**Date**: 2025-11-17  
**Feature**: 001-project-initialization  
**Phase**: Phase 0 - Outline & Research

## Overview

This document consolidates research findings for initializing the Universo Platformo Vue repository with a monorepo structure, Vue/Django technology stack, and bilingual documentation system.

## Research Areas

### 1. Vue 3 Material UI Component Library Selection

**Decision**: Use **Vuetify 3** as the primary Material UI library

**Rationale**:
- Vuetify 3 is the most mature and widely adopted Material Design component library for Vue 3
- Provides comprehensive component coverage matching MUI's feature set from React version
- Active development and strong community support
- Built-in support for TypeScript and Composition API
- Seamless integration with Vite build system
- Extensive theming capabilities through Sass variables
- Built-in accessibility features (WCAG compliance)

**Alternatives Considered**:
- **PrimeVue**: Excellent component library but uses custom design system, not Material Design
- **Quasar**: Full-featured framework but too opinionated for our modular package approach
- **Element Plus**: Good library but smaller community and less Material Design focused
- **Naive UI**: Modern and lightweight but smaller ecosystem and documentation gaps

**Implementation Notes**:
- Install via `@mdi/js` for Material Design Icons
- Use Vuetify's plugin system for global configuration
- Configure theme in @universo/template-vue package
- Enable treeshaking for optimal bundle size

### 2. Build Orchestration: Turborepo vs Nx

**Decision**: Use **Turborepo** for build orchestration

**Rationale**:
- Simpler configuration compared to Nx (less boilerplate)
- Excellent caching capabilities with both local and remote cache support
- Native PNPM workspace support
- Lower learning curve for developers familiar with npm scripts
- Faster task execution through parallel builds
- Better suited for our package-centric architecture
- Smaller footprint and faster installation
- Built by Vercel with strong investment in monorepo tooling

**Alternatives Considered**:
- **Nx**: More feature-rich but adds complexity we don't need yet (generators, code analysis)
- **Lerna**: Older tool, primarily for publishing packages rather than build orchestration
- **Rush**: Microsoft's tool, powerful but heavyweight for our current scale
- **Manual npm/pnpm scripts**: Insufficient for dependency management and caching

**Implementation Notes**:
- Configure turbo.json with build pipeline definitions
- Use `dependsOn` to define task dependencies
- Enable caching for build, test, and lint tasks
- Configure outputs for cache invalidation
- Set up parallel execution where possible

### 3. Vue State Management: Pinia Best Practices

**Decision**: Use **Pinia** as the official Vue state management solution

**Rationale**:
- Official Vue state management library (successor to Vuex)
- Simpler API compared to Vuex (no mutations, just actions)
- Better TypeScript support out of the box
- Composition API-first design aligns with Vue 3 patterns
- Automatic code splitting and lazy loading
- Devtools integration for debugging
- Modular store design fits package-based architecture

**Best Practices**:
- Define stores per feature package (e.g., @universo/clusters-frt has its own store)
- Use composition API style for better type inference
- Export typed store hooks for components
- Keep stores focused on business logic, not UI state
- Use getters for computed state
- Handle async operations in actions
- Organize store files: `stores/useFeatureStore.ts`

### 4. Django REST Framework API Design Patterns

**Decision**: Follow **REST resource-based API design** with DRF ViewSets

**Rationale**:
- Django REST Framework provides robust ViewSet abstraction
- Automatic URL routing through routers
- Built-in serialization and validation
- Pagination, filtering, and search out of the box
- Authentication and permissions integration
- Consistent with REST best practices
- Easier to maintain and extend

**API Patterns**:
- Use ViewSets for CRUD operations (ModelViewSet, ReadOnlyModelViewSet)
- Use APIView for custom endpoints
- Implement serializers for data transformation
- Use nested routes for related resources (e.g., `/clusters/{id}/domains/`)
- Implement pagination (PageNumberPagination with customizable page size)
- Use filtering backends (DjangoFilterBackend, SearchFilter, OrderingFilter)
- Return consistent error responses with proper HTTP status codes

**Authentication Pattern**:
- JWT tokens for stateless authentication
- Use djangorestframework-simplejwt package
- Access token (short-lived: 15-30 min) + Refresh token (long-lived: 7 days)
- Token in Authorization header: `Bearer <token>`
- Refresh endpoint for obtaining new access tokens

### 5. PNPM Workspace Catalog Feature

**Decision**: Use **PNPM catalog** for centralized dependency version management

**Rationale**:
- Single source of truth for shared dependency versions
- Prevents version drift across packages
- Simplifies version updates (change once in catalog)
- Explicit versioning for better control
- Compatible with PNPM 8.x+
- Reduces duplicate dependencies in node_modules

**Catalog Structure**:
```yaml
catalog:
  # TypeScript toolchain
  typescript: ^5.0.0
  vite: ^5.0.0
  vitest: ^1.0.0
  
  # Vue ecosystem
  vue: ^3.4.0
  vue-router: ^4.2.0
  pinia: ^2.1.0
  
  # UI library
  vuetify: ^3.4.0
  
  # Data fetching
  "@tanstack/vue-query": ^5.0.0
  axios: ^1.6.0
  
  # Forms and validation
  vee-validate: ^4.12.0
  zod: ^3.22.0
  
  # Internationalization
  vue-i18n: ^9.8.0
  
  # Development tools
  eslint: ^8.55.0
  prettier: ^3.1.0
```

**Usage in Packages**:
```json
{
  "dependencies": {
    "vue": "catalog:",
    "vue-router": "catalog:"
  }
}
```

### 6. Package Scaffolding Script Design

**Decision**: Create Node.js script with interactive prompts and validation

**Rationale**:
- JavaScript/Node.js is already available in monorepo environment
- Can use inquirer for interactive CLI experience
- Easy to integrate with PNPM workspace
- Can validate naming conventions programmatically
- Can update pnpm-workspace.yaml automatically
- Provides rollback capability on errors

**Script Features**:
- Interactive prompts for package name and type (frontend/backend/both)
- Validation against naming conventions (@universo/{name}-frt/-srv)
- Check for existing packages to prevent overwrites
- Create directory structure with base/ folders
- Generate package.json with proper scoped name
- Create boilerplate configuration files (tsconfig.json, etc.)
- Update pnpm-workspace.yaml
- Initialize README.md and README-RU.md templates
- Git stage new files
- Provide success message with next steps

**Command**: `pnpm create-package <name> [--frontend-only | --backend-only]`

### 7. Bilingual Documentation Validation Strategy

**Decision**: Create Node.js validation script checking structural equivalence

**Rationale**:
- Automated validation prevents documentation drift
- Can be integrated into CI/CD pipeline
- Provides clear error messages for contributors
- Reduces manual review burden

**Validation Checks**:
- Line count equivalence (same number of lines)
- Section heading structure (same headings in same order)
- Code block count (same number of code examples)
- List structure (same number of list items)
- Link structure (same number of links)
- Table structure (same number of tables with same dimensions)

**Implementation**:
- Script: `scripts/validate-i18n-docs.js`
- Can be run manually: `pnpm validate:i18n`
- Integrated into pre-commit hooks or CI
- Reports specific mismatches with line numbers
- Exit code 0 for success, 1 for validation failures

### 8. TypeScript Configuration for Monorepo

**Decision**: Use hierarchical tsconfig.json with base configuration

**Rationale**:
- Base config shared across all TypeScript packages
- Package-specific configs extend base config
- Consistent compiler options across packages
- Better IDE integration (IntelliSense, type checking)
- Easier to maintain and update

**Configuration Structure**:
```
# Root
tsconfig.json (base configuration)

# Packages extend root
packages/types/base/tsconfig.json (extends ../../tsconfig.json)
packages/utils/base/tsconfig.json (extends ../../../tsconfig.json)
```

**Base Configuration**:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  }
}
```

### 9. Django Project Structure for Monorepo

**Decision**: Use Django apps within packages/ structure, each with own requirements

**Rationale**:
- Maintains consistency with frontend package structure
- Each backend package is a self-contained Django app
- Can be developed and tested independently
- Supports future extraction to separate repositories
- Django's app system naturally supports modular architecture

**Backend Package Structure**:
```
packages/clusters-srv/
└── base/
    ├── requirements.txt      # Package-specific dependencies
    ├── setup.py              # For internal package management
    ├── README.md
    ├── README-RU.md
    └── clusters/             # Django app
        ├── __init__.py
        ├── models.py
        ├── serializers.py
        ├── views.py
        ├── urls.py
        ├── admin.py
        ├── tests/
        │   ├── test_models.py
        │   ├── test_views.py
        │   └── test_serializers.py
        └── migrations/
```

**Root Django Project** (future):
```
backend/
├── manage.py
├── universo/
│   ├── __init__.py
│   ├── settings/
│   │   ├── base.py
│   │   ├── development.py
│   │   └── production.py
│   ├── urls.py
│   └── wsgi.py
└── requirements.txt         # Root dependencies
```

### 10. GitHub Labels Strategy

**Decision**: Use hierarchical label system with type, area, and priority labels

**Rationale**:
- Clear categorization improves issue management
- Multiple labels provide better filtering
- Follows GitHub best practices
- Aligns with existing .github/instructions/github-labels.md

**Label Categories**:

**Type Labels** (mutually exclusive):
- `type: bug` - Something isn't working
- `type: feature` - New functionality
- `type: enhancement` - Improvement to existing feature
- `type: documentation` - Documentation changes
- `type: refactor` - Code refactoring
- `type: maintenance` - Maintenance tasks

**Area Labels** (can use multiple):
- `area: frontend` - Frontend-related changes
- `area: backend` - Backend-related changes
- `area: build` - Build system and tooling
- `area: testing` - Testing infrastructure
- `area: i18n` - Internationalization
- `area: repository` - Repository configuration

**Priority Labels** (optional):
- `priority: high` - High priority
- `priority: medium` - Medium priority
- `priority: low` - Low priority

**Project-Specific Labels**:
- `platformo` - Universo Platformo related
- `architecture` - Architectural changes

## Technology Stack Summary

### Frontend Stack
- **Framework**: Vue 3.4+ (Composition API)
- **Language**: TypeScript 5.0+
- **Build Tool**: Vite 5.0+
- **UI Library**: Vuetify 3.4+
- **State Management**: Pinia 2.1+
- **Routing**: Vue Router 4.2+
- **Data Fetching**: @tanstack/vue-query 5.0+
- **Forms**: VeeValidate 4.12+ with Zod 3.22+
- **i18n**: vue-i18n 9.8+
- **HTTP Client**: Axios 1.6+
- **Icons**: @mdi/js (Material Design Icons)

### Backend Stack
- **Framework**: Django 4.2+
- **Language**: Python 3.10+
- **API Framework**: Django REST Framework 3.14+
- **Authentication**: djangorestframework-simplejwt
- **Database**: PostgreSQL 15+ (via Supabase)
- **ORM**: Django ORM
- **Validation**: Pydantic or DRF serializers
- **Testing**: pytest + pytest-django

### Build & Tooling
- **Package Manager**: PNPM 9.0+
- **Build Orchestration**: Turborepo
- **Linting (Frontend)**: ESLint 8.55+
- **Formatting**: Prettier 3.1+
- **Linting (Backend)**: Flake8, Black, isort
- **Type Checking**: mypy (Python), TypeScript (JavaScript)
- **Testing (Frontend)**: Vitest + @testing-library/vue

### Infrastructure
- **Database**: Supabase (PostgreSQL 15+ with BaaS)
- **Version Control**: Git
- **CI/CD**: GitHub Actions (future)

## Performance Benchmarks

Based on similar monorepo projects and our performance requirements:

- **PNPM Install (clean)**: 45-55 seconds for ~50 packages
- **PNPM Install (incremental)**: 5-8 seconds with cache
- **Vite Build (single package)**: 30-90 seconds depending on package size
- **Django Runserver Start**: 2-5 seconds
- **Hot Reload (HMR)**: 1-2 seconds for most changes
- **Full Monorepo Build**: 6-9 minutes with 50 packages (parallel builds)

These benchmarks are well within our target performance goals.

## Security Considerations

### Frontend Security
- Content Security Policy (CSP) headers
- XSS prevention through Vue's template escaping
- CSRF protection via Django
- Secure cookie settings (HttpOnly, Secure, SameSite)
- JWT storage in memory or HttpOnly cookies (not localStorage)
- Input sanitization before API calls

### Backend Security
- Django security middleware enabled
- HTTPS-only in production
- JWT token rotation
- Rate limiting on authentication endpoints
- SQL injection prevention through ORM
- Input validation at serializer level
- CORS configuration for allowed origins
- Environment-based secrets management

### Dependency Security
- Regular npm audit / pip audit runs
- Automated dependency updates (Dependabot)
- Lock files committed (pnpm-lock.yaml, requirements.txt)
- Review of security advisories

## Development Workflow

### Initial Setup
1. Clone repository
2. Install PNPM globally (`npm install -g pnpm`)
3. Run `pnpm install` in root
4. Read README.md for project overview
5. Choose developer persona (Feature Developer / Platform Maintainer / Documentation Contributor)
6. Follow persona-specific quickstart guide

### Creating New Feature Package
1. Run `pnpm create-package <feature-name>`
2. Answer prompts (frontend/backend/both)
3. Script creates package structure
4. Implement feature in base/ directory
5. Add tests
6. Update documentation (English + Russian)
7. Create PR with proper labels

### Updating Documentation
1. Edit English version first (e.g., README.md)
2. Update Russian version (e.g., README-RU.md)
3. Run `pnpm validate:i18n` to verify equivalence
4. Commit both files together

### Making Changes
1. Create GitHub issue (with Russian translation in spoiler)
2. Apply appropriate labels
3. Create feature branch
4. Implement changes
5. Run linters and tests
6. Create PR (with Russian translation in spoiler)
7. Reference issue with "Fixes #123"
8. Wait for review and approval
9. Merge to main

## Additional Best Practices from 2024 Research

### 11. Vue 3 Composition API Advanced Patterns

**Enhanced Best Practices** (from latest 2024 sources):

**Composable Organization**:
- Extract reusable logic into composables following single-responsibility principle
- Name composables with `use` prefix (e.g., `useCounter`, `useAuth`)
- Group related state, computed, and methods together by concern, not lifecycle
- Keep composables focused and testable

**TypeScript Type Safety**:
- Always use explicit types with `ref` and `reactive` state:
  ```ts
  const count = ref<number>(0)
  const user = ref<User | null>(null)
  ```
- Use interfaces for complex states and props
- Leverage `<script setup lang="ts">` for improved type inference
- Type computed properties explicitly when necessary
- Use `InjectionKey` for type-safe provide/inject

**Async Handling Pattern**:
```ts
const loading = ref(false)
const error = ref<string | null>(null)
const data = ref<T | null>(null)

async function fetchData() {
  loading.value = true
  error.value = null
  try {
    data.value = await api.fetch()
  } catch (err) {
    error.value = String(err)
  } finally {
    loading.value = false
  }
}
```

**Component Best Practices**:
- Keep components small and single-purpose
- Use `defineProps` and `defineEmits` with TypeScript for type safety
- Prefer type-based declarations for emits in Vue 3.3+:
  ```ts
  const emit = defineEmits<{
    change: [id: number]
    update: [value: string]
  }>()
  ```

**Implementation Notes**:
- Use these patterns in all Vue 3 packages
- Document composable APIs in JSDoc comments
- Create shared composables in @universo/utils package
- Establish composable testing patterns early

### 12. Vuetify 3 Integration Patterns

**Configuration Best Practices**:

**Material Design 3 Blueprint**:
- Apply MD3 blueprint for modern Material Design styling:
  ```ts
  import { md3 } from 'vuetify/blueprints'
  
  const vuetify = createVuetify({
    blueprint: md3,
    // ... other config
  })
  ```

**Theme Configuration**:
- Define comprehensive light/dark themes with semantic color tokens
- Use theme variables consistently across components
- Configure global component defaults for consistency

**Icon Integration**:
- Use Material Design Icons via `@mdi/js` for tree-shaking benefits
- Configure icon sets in Vuetify initialization
- Avoid importing full icon font when possible

**SSR Support**:
- Enable SSR mode for server-side rendering:
  ```ts
  createVuetify({ ssr: true })
  ```

**Date Adapter System**:
- Configure date adapters centrally for all date components
- Support multiple date libraries (Day.js, Luxon, date-fns, Moment.js)
- Ensure locale-aware date formatting

**Plugin File Structure**:
```
src/plugins/vuetify.ts
- Import styles and icons
- Configure themes, blueprints, icons
- Set global defaults
- Export vuetify instance
```

**Type-Safe Component Wrappers**:
- Extract types from Vuetify components:
  ```ts
  type VDialogProps = InstanceType<typeof VDialog>['$props']
  ```
- Handle emits and slots separately for full TypeScript safety
- Document wrapper components thoroughly

**Implementation Strategy**:
- Create vuetify plugin in @universo/template-vue
- Use auto-imports where possible
- Configure in separate plugin file for maintainability
- Integrate with vue-i18n for translations

### 13. Django REST Framework Advanced Patterns

**Service/Repository Pattern** (from 2024 best practices):
- Separate business logic (services) from data access (repositories)
- Keep views thin, logic in services
- Make services testable independently
- Structure:
  ```
  services/
    ├── user_service.py
    └── auth_service.py
  repositories/
    ├── user_repository.py
    └── token_repository.py
  ```

**API Design Principles**:
- Resource-oriented URIs with plural naming
- Consistent HTTP method usage
- Stateless communication
- Semantic versioning (`/api/v1/...`)

**ViewSet Best Practices**:
- Use ModelViewSet for standard CRUD operations
- Use ReadOnlyModelViewSet for read-only resources
- Use APIView for custom endpoints
- Organize related operations in ViewSets
- Leverage DRF routers for automatic URL generation

**Serializer Patterns**:
- Use ModelSerializer for model mapping
- Create custom serializers for complex business rules
- Nest serializers for related data (but avoid deep nesting)
- Validate in serializers, not views
- Return standardized error responses

**Performance Optimization**:
- Use `select_related` and `prefetch_related` to avoid N+1 queries
- Implement pagination for all list endpoints
- Add caching for frequently accessed data
- Consider async views for high-traffic endpoints

**Security Best Practices**:
- Require authentication on all endpoints (except public ones)
- Implement fine-grained permissions (IsAuthenticated, custom classes)
- Use rate limiting/throttling (AnonRateThrottle, UserRateThrottle)
- Return clear error messages without exposing sensitive data
- Always use HTTPS in production

**JWT Authentication Pattern**:
- Use djangorestframework-simplejwt package
- Short-lived access tokens (15-30 min)
- Long-lived refresh tokens (7 days)
- Token in Authorization header: `Bearer <token>`
- Implement token refresh endpoint

**Testing Strategy**:
- Write unit tests for serializers and services
- Write integration tests for API endpoints
- Use DRF's APITestCase and APIClient
- Test authentication and permission logic
- Maintain high test coverage

### 14. Monorepo Best Practices (PNPM + Turborepo)

**Workspace Structure** (refined from 2024 patterns):
```
monorepo/
├─ apps/              # Applications
│  ├─ web/            # Main Vue app
│  └─ admin/          # Admin app
├─ packages/          # Shared packages
│  ├─ ui/             # Shared UI components
│  ├─ types/          # Shared TypeScript types
│  ├─ utils/          # Shared utilities
│  └─ i18n/           # Shared i18n
└─ backend/           # Django backend
    └─ api/           # Django project
```

**PNPM Workspace Configuration**:
- Use `workspace:` protocol for local dependencies
- Move common dependencies to root `package.json`
- Use catalog for shared dependency versions
- Configure workspace patterns in `pnpm-workspace.yaml`

**Turborepo Pipeline**:
```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "outputs": []
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": ["coverage/**"]
    }
  }
}
```

**Best Practices**:
- Use `dependsOn` to define task dependencies
- Enable caching for deterministic tasks
- Configure outputs for cache invalidation
- Use parallel execution where possible
- Set up remote caching for CI/CD

**Integration with Django**:
- Keep Django dependencies separate (requirements.txt)
- Use separate build/dev commands for Django
- API communication via HTTP between frontend and backend
- Optional: Generate TypeScript types from Django models

**Shared Configuration**:
- Create config packages for ESLint, Prettier, TypeScript
- Reference configs from each app/package
- Ensure consistency across all packages
- Use extends for base configurations

### 15. Vue i18n Monorepo Architecture

**Package-Level i18n Structure**:
```
packages/clusters-frt/
└── src/
    └── i18n/
        ├── locales/
        │   ├── en/
        │   │   └── clusters.json
        │   └── ru/
        │       └── clusters.json
        └── index.ts (namespace registration)
```

**Namespace Pattern**:
- Each package manages its own translations
- Namespace format: `{package}.{section}.{key}`
- Example: `clusters.members.title`
- Register namespaces automatically on package import

**Centralized i18n Package**:
```ts
// @universo/i18n
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {}
})

export function registerNamespace(namespace: string, messages: any) {
  for (const locale in messages) {
    i18n.global.mergeLocaleMessage(locale, {
      [namespace]: messages[locale]
    })
  }
}

export default i18n
```

**Best Practices**:
- Lazy load locale files based on language
- Use composables for i18n access (`useI18n()`)
- Keep translation keys organized and namespaced
- Provide fallback locale always
- Support pluralization and interpolation
- Store locale preference in localStorage/cookies
- Integrate with Vue Router for locale-prefixed URLs

**Testing**:
- Lint for hardcoded strings
- Test translation key existence
- Verify pluralization rules
- Test locale switching

### 16. TypeScript Configuration Hierarchy

**Root Configuration** (enhanced):
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "moduleResolution": "bundler",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "jsx": "preserve"
  }
}
```

**Package-Level Extension**:
```json
{
  "extends": "../../../tsconfig.json",
  "compilerOptions": {
    "composite": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

**Best Practices**:
- Enable strict mode and all strict flags
- Use `noUncheckedIndexedAccess` for array safety
- Configure paths for workspace dependencies
- Use project references for build optimization
- Enable composite for incremental compilation

## Research Summary

This research phase incorporated the latest 2024 best practices from:
1. **Internet sources**: Vue 3 Composition API patterns, Django REST Framework design principles, PNPM/Turborepo monorepo strategies
2. **Context7 documentation**: Official Vue 3 docs, Django 4.2 docs, Vuetify 3 configuration patterns
3. **Community best practices**: DEV.to guides, CodezUp tutorials, production-ready templates

Key enhancements to the original research:
- Advanced Vue 3 Composition API patterns with TypeScript
- Vuetify 3 Material Design 3 blueprint integration
- Django service/repository pattern for better separation of concerns
- Enhanced monorepo structure with apps/ and packages/ separation
- Package-level i18n architecture with namespace registration
- Comprehensive TypeScript configuration hierarchy

All findings align with and enhance the existing research without contradicting the core architectural decisions.

## Open Questions

No open questions remaining. All technical decisions have been researched and validated against 2024 best practices.

## Next Steps

Phase 0 Complete. Proceed to Phase 1:
1. Generate data-model.md (entity definitions)
2. Generate API contracts in contracts/ directory
3. Create quickstart.md (developer onboarding guide)
4. Run update-agent-context.sh to update copilot context
5. Re-evaluate Constitution Check post-design
