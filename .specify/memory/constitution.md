<!--
SYNC IMPACT REPORT
==================
Version Change: Template → 1.0.0 (Initial ratification)
Modified Principles: All principles defined from template
Added Sections: All core sections defined
Removed Sections: None
Templates Status:
  ✅ plan-template.md - Reviewed, constitution check placeholder is compatible
  ✅ spec-template.md - Reviewed, user story requirements align with principles
  ✅ tasks-template.md - Reviewed, task structure supports principle-driven development
Follow-up TODOs: None - all placeholders resolved
-->

# Universo Platformo Vue Constitution

## Core Principles

### I. Monorepo Architecture with PNPM

The project MUST be organized as a monorepo managed by PNPM workspace.

**Rules**:
- All packages reside in `packages/` directory
- Each package follows naming convention: `{feature}-frt` (frontend) or `{feature}-srv` (backend)
- Each package contains a `base/` root directory to support future multiple implementations
- PNPM workspace configuration manages inter-package dependencies
- Shared dependencies are hoisted to root when appropriate

**Rationale**: Monorepo structure enables code sharing, consistent tooling, and atomic cross-package changes while PNPM provides efficient disk space usage and strict dependency resolution.

### II. Technology Stack Consistency

Frontend MUST use Vue 3 with TypeScript. Backend MUST use Django with Python.

**Rules**:
- Frontend: Vue 3 + TypeScript + Vite (build tool) + MUI (Material UI library)
- Backend: Django + Python 3.10+ + Django REST Framework
- Type safety enforced in TypeScript code
- Python type hints required in all new backend code
- No mixing of frameworks within a layer (no React in Vue frontend, no Flask in Django backend)

**Rationale**: Technology consistency reduces cognitive load, simplifies onboarding, and ensures architectural coherence. These choices align with modern best practices and robust ecosystems.

### III. Database-First with Supabase Priority

Primary database MUST be Supabase with architecture supporting future DBMS expansion.

**Rules**:
- Supabase is the current and primary supported database
- Database access layer MUST be abstracted to support future DBMS additions
- Direct SQL queries are discouraged; use ORM/query builders
- Migration scripts MUST be version-controlled and reversible
- Database schema changes require explicit approval in PR reviews

**Rationale**: Supabase provides excellent developer experience and BaaS features. Abstraction layer ensures we're not locked into a single provider and can expand to PostgreSQL, MySQL, or others as needed.

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

## Technology Constraints

### Frontend Technology

- **Framework**: Vue 3 (Composition API preferred)
- **Language**: TypeScript 5.0+
- **Build Tool**: Vite
- **UI Library**: MUI (Material UI for Vue)
- **State Management**: Pinia (Vue's official state management)
- **Routing**: Vue Router
- **HTTP Client**: Axios or Fetch API with proper error handling

### Backend Technology

- **Framework**: Django 4.2+
- **Language**: Python 3.10+
- **API**: Django REST Framework
- **Database ORM**: Django ORM (with Supabase PostgreSQL)
- **Authentication**: Passport.js integration layer
- **Task Queue**: Celery (when async tasks required)
- **Testing**: pytest + pytest-django

### Infrastructure

- **Package Manager**: PNPM (root and frontend)
- **Python Environment**: Poetry or pipenv
- **Database**: Supabase (PostgreSQL with BaaS features)
- **Version Control**: Git with conventional commits
- **CI/CD**: GitHub Actions (when configured)

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

**Version**: 1.0.0 | **Ratified**: 2025-11-16 | **Last Amended**: 2025-11-16
