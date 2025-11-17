# Implementation Plan: Universo Platformo Vue Project Initialization

**Branch**: `001-project-initialization` | **Date**: 2025-11-17 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/001-project-initialization/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Initialize Universo Platformo Vue repository with monorepo structure using PNPM workspace management, Vue 3/TypeScript frontend, Django/Python backend, base package structure with @universo/ scoped naming, bilingual documentation system (English/Russian), package scaffolding CLI tool, GitHub repository configuration with labels and templates, and shared packages architecture with build orchestration.

## Technical Context

**Language/Version**: 
- Frontend: TypeScript 5.0+, Node.js 18.x LTS
- Backend: Python 3.10+

**Primary Dependencies**: 
- Frontend: Vue 3 (Composition API with MD3 blueprint), Vite 5.x, Pinia, Vue Router 4.x, @tanstack/vue-query, VeeValidate with Zod, Vuetify 3.x (Material Design 3), vue-i18n
- Backend: Django 4.2+ (with Service/Repository pattern), Django REST Framework 3.14+, djangorestframework-simplejwt, Pydantic, pytest-django
- Build/Tooling: PNPM 9.x, Turborepo (recommended), ESLint, Prettier, Black, Flake8, mypy
- Database: Supabase (PostgreSQL 15+)
- Authentication: Django authentication with JWT (djangorestframework-simplejwt, stateless auth pattern)

**Storage**: Supabase (PostgreSQL 15+) with Django ORM, abstraction layer for future DBMS support

**Testing**: 
- Frontend: Vitest + @testing-library/vue
- Backend: pytest + pytest-django
- Contract testing for API endpoints

**Target Platform**: Web application (modern browsers), development environment on Linux/macOS/Windows

**Project Type**: Web (monorepo with frontend and backend packages)

**Performance Goals**: 
- Clean install: <60s
- Incremental install: <10s
- Individual package build: <2min
- Full monorepo build: <10min
- Hot reload: <3s

**Constraints**: 
- Monorepo must support 50-100 packages without degradation
- Bilingual documentation required (English/Russian) with identical structure
- Package naming convention: @universo/{name}-frt/-srv with base/ directories
- No docs/ directory in repository (separate docs repo in future)
- No AI agent configuration files in root (user-created)

**Scale/Scope**: 
- Initial setup: 5-10 shared packages (@universo/types, utils, i18n, api-client, template-vue)
- Expected growth: 50-100 feature packages
- Package separation threshold: >100MB size or >10min build time
- Support for zero-package state (empty monorepo)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Principle I: Monorepo Architecture with PNPM
✅ **PASS** - Project initializes PNPM workspace with packages/ directory, scoped @universo/ naming, catalog-based dependency management

### Principle II: Technology Stack Consistency
✅ **PASS** - Vue 3 + TypeScript frontend, Django + Python backend as specified

### Principle III: Database-First with Supabase Priority
✅ **PASS** - Supabase (PostgreSQL) as primary database with abstraction layer for future expansion

### Principle IV: Authentication Standard with Passport.js
⚠️ **MODIFIED** - Using Django authentication with JWT instead of Passport.js (Node.js library). This is appropriate for Django backend.

### Principle V: Bilingual Documentation (English/Russian)
✅ **PASS** - All documentation will be bilingual with identical structure

### Principle VI: Issue-Driven Development Workflow
✅ **PASS** - GitHub issues, labels, and PR templates will be configured

### Principle VII: Reference Implementation Pattern
✅ **PASS** - Following universo-platformo-react patterns adapted to Vue/Django

### Principle VIII: Security and Error Resilience
✅ **PASS** - Security best practices and error handling documented

### Principle IX: Package Lifecycle Management
✅ **PASS** - Package scaffolding script and lifecycle procedures will be implemented

### Principle X: Internationalization Architecture
✅ **PASS** - i18n architecture with @universo/i18n package and namespace registration

### Principle XI: Centralized Shared Packages
✅ **PASS** - Shared packages (@universo/types, utils, i18n, api-client, template-vue) planned

### Principle XII: Build Orchestration and Tooling
✅ **PASS** - Turborepo/Nx for build orchestration with caching

**Overall Assessment**: PASS with one adaptation (Principle IV modified appropriately for Django)

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
# Monorepo structure for Universo Platformo Vue

# Root configuration files
pnpm-workspace.yaml      # PNPM workspace configuration with catalog
package.json             # Root package.json with workspace scripts
turbo.json              # Turborepo build orchestration config
.gitignore              # Ignore patterns for Node.js, Python, editors
tsconfig.json           # Root TypeScript configuration
.prettierrc             # Prettier formatting configuration
.eslintrc.js            # ESLint configuration

# Documentation
README.md               # English documentation
README-RU.md            # Russian documentation (identical structure)

# GitHub configuration
.github/
├── instructions/       # Already exists with issue/PR/label guidelines
└── ISSUE_TEMPLATE/    # Issue templates (to be created)
└── PULL_REQUEST_TEMPLATE.md  # PR template (to be created)

# Packages directory
packages/
├── types/              # @universo/types - Shared TypeScript types
│   └── base/
│       ├── package.json
│       ├── tsconfig.json
│       └── src/
├── utils/              # @universo/utils - Shared utility functions
│   └── base/
│       ├── package.json
│       ├── tsconfig.json
│       └── src/
├── i18n/               # @universo/i18n - Centralized i18n instance
│   └── base/
│       ├── package.json
│       ├── tsconfig.json
│       └── src/
├── api-client/         # @universo/api-client - Type-safe API client
│   └── base/
│       ├── package.json
│       ├── tsconfig.json
│       └── src/
└── template-vue/       # @universo/template-vue - Shared UI components
    └── base/
        ├── package.json
        ├── tsconfig.json
        └── src/

# Scripts directory
scripts/
└── create-package.js   # Package scaffolding CLI tool

# Python backend packages (future)
# Each backend package will follow Django app structure with requirements.txt
```

**Structure Decision**: Web application monorepo structure (Option 2 adapted). The repository uses PNPM workspace for frontend packages with scoped @universo/ names. Each package contains a base/ directory to support future multiple implementations. Backend packages will be added as Django apps when features are implemented. The scaffolding script will automate creation of properly structured packages.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations requiring justification. The adaptation of Principle IV (authentication) from Passport.js to Django authentication with JWT is appropriate and aligns with the backend technology choice.
