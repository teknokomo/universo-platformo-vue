<!--
SYNC IMPACT REPORT
==================
Version Change: 1.1.0 → 1.2.0 (Enhanced based on universo-platformo-react analysis)
Modified Principles:
  - I. Added catalog-based dependency management pattern
  - II. Updated with specific Vue/Django tooling aligned with React version patterns
  - X. Added internationalization architecture principle
  - XI. Added centralized shared packages principle
  - XII. Added build orchestration principle
Added Sections:
  - X. Internationalization Architecture
  - XI. Centralized Shared Packages
  - XII. Build Orchestration and Tooling
Removed Sections: None
Templates Status:
  ✅ plan-template.md - Compatible with enhanced principles
  ✅ spec-template.md - User stories and requirements align with expanded principles
  ✅ tasks-template.md - Task structure supports principle-driven development
Follow-up TODOs: None - all placeholders resolved
Change Rationale: Enhanced constitution based on comprehensive analysis of universo-platformo-react repository, incorporating proven architectural patterns while adapting to Vue/Django stack
-->

# Universo Platformo Vue Constitution

## Core Principles

### I. Monorepo Architecture with PNPM

The project MUST be organized as a monorepo managed by PNPM workspace.

**Rules**:
- All packages reside in `packages/` directory
- Each package follows naming convention: `{feature}-frt` (frontend) or `{feature}-srv` (backend)
- Package names MUST use @universo/ scoped naming in package.json (e.g., `@universo/clusters-frt`)
- Each package contains a `base/` root directory to support future multiple implementations
- PNPM workspace configuration includes both `packages/*` and `packages/*/base` patterns
- Shared dependencies MUST use catalog-based version management in pnpm-workspace.yaml
- Workspace dependencies referenced via `workspace:*` protocol
- Shared dependencies are hoisted to root when appropriate

**Rationale**: Monorepo structure enables code sharing, consistent tooling, and atomic cross-package changes while PNPM provides efficient disk space usage and strict dependency resolution. Catalog-based dependency management ensures version consistency across all packages. Scoped package names prevent naming conflicts and enable future npm publishing.

### II. Technology Stack Consistency

Frontend MUST use Vue 3 with TypeScript. Backend MUST use Django with Python.

**Rules**:
- Frontend: Vue 3 (Composition API) + TypeScript + Vite (build tool)
- Backend: Django 4.2+ + Python 3.10+ + Django REST Framework
- UI Library: Material UI components for Vue (Vue equivalent of MUI)
- State Management: Pinia (Vue's official state management)
- Routing: Vue Router
- Data Fetching: TanStack Query (Vue Query) for React Query equivalent patterns
- Forms: VeeValidate with Zod for validation (Vue equivalent of react-hook-form)
- Type safety enforced in TypeScript code with strict mode
- Python type hints required in all new backend code
- No mixing of frameworks within a layer (no React in Vue frontend, no Flask in Django backend)
- Frontend packages use tsconfig.json extending from root configuration
- Backend packages use Django ORM for database operations (equivalent to TypeORM pattern)

**Rationale**: Technology consistency reduces cognitive load, simplifies onboarding, and ensures architectural coherence. These choices align with modern best practices and robust ecosystems while maintaining conceptual parity with the React version.

### III. Database-First with Supabase Priority

Primary database MUST be Supabase with architecture supporting future DBMS expansion.

**Rules**:
- Supabase (PostgreSQL) is the current and primary supported database
- Database access layer MUST be abstracted to support future DBMS additions
- Direct SQL queries are discouraged; use Django ORM
- Migration scripts MUST be version-controlled and reversible using Django migrations
- Database schema changes require explicit approval in PR reviews
- Entities MUST use UUID primary keys (not auto-incrementing integers)
- All entities MUST include created_at and updated_at timestamp fields
- Schema-based organization for logical separation (e.g., 'clusters' schema for clusters/domains/resources)
- Entity relationships (many-to-many) MUST use explicit junction tables with additional metadata

**Rationale**: Supabase provides excellent developer experience and BaaS features. Abstraction layer ensures we're not locked into a single provider and can expand to PostgreSQL, MySQL, or others as needed. UUID primary keys enable distributed systems and prevent ID collision. Schema-based organization improves maintainability in large applications.

### IV. Authentication Standard with Passport.js

Authentication MUST use Passport.js with Supabase connector.

**Rules**:
- Passport.js is the authentication middleware
- Supabase connector handles user management integration
- JWT tokens for stateless authentication between frontend and backend
- All protected routes MUST verify authentication
- Role-based access control (RBAC) for authorization
- Session management follows security best practices (secure cookies, HTTPS only)

**Rationale**: Passport.js provides proven, flexible authentication strategy pattern. Supabase connector offers seamless integration with our primary database while maintaining portability.

### V. Bilingual Documentation (English/Russian)

All documentation MUST be provided in both English and Russian with identical structure.

**Rules**:
- English is the primary language; Russian is translated from English
- README files: `README.md` (English) and `README-RU.md` (Russian)
- Both versions MUST have identical line count and structure
- Translation must be complete, not summarized
- GitHub Issues and PRs use English main text with Russian in `<details><summary>In Russian</summary>` spoiler
- Update English version first, then synchronize Russian version

**Rationale**: Ensures accessibility for both English-speaking and Russian-speaking team members and users. Identical structure requirement prevents documentation drift.

### VI. Issue-Driven Development Workflow

All work MUST be tracked through GitHub Issues with proper labeling and PR linking.

**Rules**:
- Create GitHub Issue before starting work (following `.github/instructions/github-issues.md`)
- Issues MUST have bilingual content (English + Russian spoiler)
- Apply appropriate labels per `.github/instructions/github-labels.md`
- Create PRs that reference Issues with "Fixes #123" or "Closes #123"
- PR title format: `GH{issue_number} {descriptive_title}`
- Follow PR template from `.github/instructions/github-pr.md`

**Rationale**: Issue-driven workflow ensures traceability, enables project management visibility, and creates historical record of decisions and implementations.

### VII. Reference Implementation Pattern

Use teknokomo/universo-platformo-react as conceptual reference, not direct port.

**Rules**:
- Follow architectural patterns from universo-platformo-react (monorepo, package structure)
- DO NOT copy legacy code or incomplete implementations
- Adapt patterns to Vue/Django best practices, not React/Express patterns
- Focus on the mature, stable patterns; skip documentation-only artifacts
- Create Issues to track new features as they appear in the React version
- Implement entity patterns: Clusters/Domains/Resources as foundational structure

**Rationale**: The React version provides proven conceptual architecture but contains legacy code. We cherry-pick architectural wisdom while building a clean, best-practice implementation on our stack.

### VIII. Security and Error Resilience

Security MUST be embedded in all layers. Error handling MUST be comprehensive with clear recovery paths.

**Rules**:
- No secrets in source code; use environment variables for all credentials
- Dependency vulnerability scanning MUST be enabled and monitored
- Authentication MUST use secure patterns: HTTPS only, secure session storage, proper password hashing
- Database access MUST prevent SQL injection through parameterized queries or ORM
- API endpoints MUST validate all inputs and implement rate limiting
- Error messages MUST be clear and actionable without exposing sensitive information
- Package scaffolding MUST validate inputs and provide rollback on failures
- Documentation MUST provide recovery procedures for all critical failure scenarios
- Workspace and build failures MUST provide diagnostic information and next steps

**Rationale**: Security vulnerabilities and poor error handling create technical debt and user frustration. Proactive security practices and comprehensive error handling reduce support burden and increase system reliability.

### IX. Package Lifecycle Management

Package creation, evolution, and retirement MUST follow documented procedures.

**Rules**:
- Package creation MUST use scaffolding script for consistency
- Package naming MUST follow @universo/{name}-frt/-srv convention
- Package versioning MUST follow semantic versioning
- Breaking changes MUST include deprecation warnings and migration guides
- Package inter-dependencies MUST be declared explicitly in package.json
- Package removal MUST follow deprecation process before deletion
- Package size and build time thresholds trigger refactoring reviews

**Rationale**: Clear package lifecycle management prevents chaos as the monorepo scales. Consistent procedures reduce errors and make the system more maintainable.

### X. Internationalization Architecture

All user-facing content MUST support internationalization with English and Russian as primary languages.

**Rules**:
- Each frontend package MUST include an i18n directory with locales subdirectory
- Locales MUST be organized as `i18n/locales/en/` and `i18n/locales/ru/`
- Each package registers its namespaces with centralized @universo/i18n package
- Translation files MUST use JSON format with nested keys (dot notation in code)
- All UI strings MUST be externalized (no hardcoded strings in components)
- Translation keys MUST follow pattern: `{namespace}.{section}.{key}` (e.g., `clusters.members.title`)
- Pluralization MUST use i18next standard format (`_one`, `_other` suffixes)
- Date/time formatting MUST use locale-aware libraries (dayjs with locales)
- Numbers, currencies, and units MUST respect locale formatting
- Missing translations MUST fall back to English gracefully

**Rationale**: Centralized i18n architecture ensures consistency across packages while allowing independent namespace registration. Structured translation keys improve maintainability. Following i18next patterns enables rich translation features (pluralization, interpolation, context).

### XI. Centralized Shared Packages

Common functionality MUST be extracted into shared packages to avoid duplication.

**Rules**:
- @universo/types package MUST contain shared TypeScript types and interfaces
- @universo/utils package MUST contain shared utility functions
- @universo/i18n package MUST provide centralized i18next instance and registration
- @universo/api-client package MUST provide type-safe API client for all backend services
- @universo/template-{framework} packages MUST provide reusable UI components and layouts
- Shared packages MUST have minimal external dependencies
- Shared packages MUST be framework-agnostic when possible (types, utils)
- Frontend shared packages MAY depend on framework (Vue) when necessary (templates, i18n)
- Backend shared packages MUST be Python-based with minimal Django coupling
- All packages MUST export clear public APIs via index files
- Breaking changes in shared packages require coordination across dependent packages

**Rationale**: Centralized shared packages reduce code duplication, ensure consistency, and create single sources of truth for common functionality. Type-safe API clients prevent runtime errors. Shared component libraries maintain UI consistency.

### XII. Build Orchestration and Tooling

Build process MUST be efficient, cacheable, and support incremental compilation.

**Rules**:
- Turbo (or equivalent) MUST be used for build orchestration and task caching
- Build pipeline MUST define clear dependency graph (dependsOn configuration)
- Each package MUST define build, dev, clean, and lint scripts
- Development mode MUST support watch mode for fast iteration
- Build outputs MUST be gitignored (dist/, build/, __pycache__/)
- Frontend packages SHOULD use Vite for fast builds and HMR
- Backend packages SHOULD use Django development server with auto-reload
- Root-level commands MUST support filtering by package (pnpm --filter)
- Build artifacts MUST be reproducible (lock files committed)
- CI/CD pipelines MUST leverage build caching for performance
- Full workspace build MUST complete within performance targets (see NFR-005)

**Rationale**: Build orchestration with caching dramatically improves developer experience by reducing wait times. Clear dependency graphs prevent build order issues. Incremental compilation and watch modes enable rapid iteration. Performance targets ensure the system remains manageable as it scales.

## Technology Constraints

### Frontend Technology

- **Framework**: Vue 3 (Composition API preferred)
- **Language**: TypeScript 5.0+
- **Build Tool**: Vite 5.x
- **UI Library**: Vuetify 3.x or PrimeVue (Vue Material UI equivalent)
- **State Management**: Pinia (Vue's official state management)
- **Routing**: Vue Router 4.x
- **Data Fetching**: @tanstack/vue-query (TanStack Query for Vue)
- **Forms**: VeeValidate with Zod/Yup for validation
- **HTTP Client**: Axios with interceptors for auth
- **i18n**: vue-i18n (aligned with i18next patterns from React version)
- **Icons**: Material Design Icons or @mdi/js
- **Testing**: Vitest + @testing-library/vue
- **Linting**: ESLint with Vue3 plugin
- **Formatting**: Prettier

### Backend Technology

- **Framework**: Django 4.2+
- **Language**: Python 3.10+
- **API**: Django REST Framework 3.14+
- **Database ORM**: Django ORM (with Supabase PostgreSQL)
- **Authentication**: Django authentication with JWT (PyJWT) for stateless auth
- **Migrations**: Django migrations system
- **Validation**: Pydantic or Django REST Framework serializers
- **Task Queue**: Celery + Redis (when async tasks required)
- **Testing**: pytest + pytest-django
- **Linting**: Flake8, Black, isort
- **Type Checking**: mypy

### Infrastructure

- **Package Manager**: PNPM 9.x (frontend workspace)
- **Python Environment**: Poetry (for dependency management)
- **Build Orchestration**: Turborepo or Nx
- **Database**: Supabase (PostgreSQL 15+ with BaaS features)
- **Version Control**: Git with conventional commits
- **CI/CD**: GitHub Actions (when configured)
- **Deployment**: Docker (optional containerization)

## Development Workflow

### Specification Workflow

1. Features MUST follow Spec Kit workflow defined in `.specify/templates/`
2. Create specification documents before implementation
3. User stories MUST be prioritized (P1, P2, P3) and independently testable
4. Each specification phase produces concrete artifacts (plan.md, research.md, data-model.md, contracts/, tasks.md)
5. Specifications are reviewed before implementation begins

### Code Review Process

1. All code changes MUST go through Pull Request review
2. PRs MUST link to GitHub Issue
3. PRs MUST include bilingual description (English + Russian spoiler)
4. PRs MUST list "Additional Work" section for side changes
5. No direct commits to main branch
6. Minimum one approval required before merge
7. All tests must pass before merge
8. Constitution compliance checked in review

### Quality Gates

- **TypeScript**: No `any` types without justification
- **Python**: Type hints required, pass mypy checks
- **Testing**: Critical paths require tests (authentication, data mutations)
- **Documentation**: Public APIs must be documented
- **Linting**: Code must pass ESLint (frontend) and Black/Flake8 (backend)
- **Security**: No secrets in code, dependency scanning enabled

## Governance

This constitution supersedes all other development practices and guides. Amendments to this constitution require:

1. Documented rationale for the change
2. Impact analysis on existing code and practices
3. Approval from project maintainers
4. Migration plan if changes affect existing implementations
5. Version bump per semantic versioning rules

**Compliance**:
- All PRs and reviews MUST verify alignment with constitution principles
- Violations of core principles require explicit justification and approval
- Complexity beyond these principles must be justified with clear necessity
- Regular constitution review (quarterly recommended) to ensure relevance

**Versioning Rules**:
- MAJOR: Backward-incompatible principle changes or removals
- MINOR: New principles added or material expansion of guidance
- PATCH: Clarifications, wording improvements, non-semantic refinements

**Specification Guidance**: Use `.specify/templates/` and related Spec Kit workflows for feature development guidance.

**Version**: 1.2.0 | **Ratified**: 2025-11-16 | **Last Amended**: 2025-11-16
