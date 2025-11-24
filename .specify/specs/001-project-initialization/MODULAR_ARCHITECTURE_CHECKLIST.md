# Modular Architecture Validation Checklist

**Feature**: 001-project-initialization  
**Date**: 2025-11-17  
**Purpose**: Ensure ABSOLUTE compliance with mandatory modular architecture requirements

## Critical Requirements Validation

This checklist MUST be verified before any implementation is considered complete. Non-compliance with any item is a BLOCKER that prevents acceptance.

### ✅ Core Modular Architecture Requirements

- [ ] **ALL functionality is in packages/** - Zero feature code outside packages/ directory
  - [ ] No src/ directory in repository root
  - [ ] No lib/ directory in repository root
  - [ ] No components/ directory in repository root
  - [ ] No api/ directory in repository root
  - [ ] No models/ directory in repository root
  - [ ] No utils/ directory in repository root (except if it's packages/utils/)
  
- [ ] **Root-level files are ONLY configuration and documentation**
  - [ ] package.json (workspace configuration only)
  - [ ] pnpm-workspace.yaml
  - [ ] turbo.json (build orchestration)
  - [ ] tsconfig.json (root TypeScript config)
  - [ ] README.md and README-RU.md
  - [ ] LICENSE
  - [ ] .gitignore
  - [ ] ESLint, Prettier configs
  - [ ] .github/ directory (workflows, templates)

### ✅ Package Structure Requirements

- [ ] **packages/ directory exists** and is the ONLY location for feature code
- [ ] **Every package follows naming convention**:
  - [ ] Frontend packages end with `-frt` (e.g., `packages/clusters-frt/`)
  - [ ] Backend packages end with `-srv` (e.g., `packages/clusters-srv/`)
  - [ ] Shared packages have no suffix (e.g., `packages/types/`, `packages/utils/`)
  
- [ ] **Every package has base/ subdirectory**:
  - [ ] Implementation is in `packages/{name}/base/src/` NOT `packages/{name}/src/`
  - [ ] Configuration files are in `packages/{name}/base/` (package.json, tsconfig.json, etc.)
  
- [ ] **Frontend and backend are separated**:
  - [ ] No package contains both frontend and backend code
  - [ ] Feature requiring both has TWO packages: `{feature}-frt` and `{feature}-srv`

### ✅ Package Naming and Scoping

- [ ] **All packages use @universo/ scope** in package.json:
  - [ ] `"name": "@universo/clusters-frt"` NOT `"name": "clusters-frt"`
  - [ ] `"name": "@universo/types"` NOT `"name": "types"`
  
- [ ] **Package names follow kebab-case convention**:
  - [ ] Example: `@universo/api-client` (correct)
  - [ ] NOT: `@universo/apiClient` or `@universo/ApiClient`

### ✅ Reference Implementation Study

- [ ] **universo-platformo-react has been studied**:
  - [ ] Reviewed package organization in https://github.com/teknokomo/universo-platformo-react
  - [ ] Understood shared packages pattern (types, utils, i18n, api-client)
  - [ ] Understood feature package pattern (frontend/backend separation)
  - [ ] Noted how base/ directories are used
  - [ ] Adapted patterns to Vue/Django (not copied React/Express directly)

### ✅ Workspace Configuration

- [ ] **pnpm-workspace.yaml correctly configured**:
  - [ ] Includes `packages/*` pattern
  - [ ] Includes `packages/*/base` pattern
  - [ ] Catalog section defined for shared dependencies
  
- [ ] **Root package.json is workspace root only**:
  - [ ] Does NOT contain business logic dependencies
  - [ ] Contains ONLY workspace management and build tools
  - [ ] Has workspace scripts for building/testing all packages

### ✅ Build Orchestration

- [ ] **turbo.json (or equivalent) configured**:
  - [ ] Build pipeline defined with task dependencies
  - [ ] Cache configuration for deterministic tasks
  - [ ] Parallel execution where possible
  
- [ ] **Each package has build scripts**:
  - [ ] `build`, `dev`, `test`, `lint` scripts defined
  - [ ] Scripts are consistent across packages

### ✅ Shared Packages

- [ ] **Required shared packages exist**:
  - [ ] `packages/types/base/` - TypeScript type definitions
  - [ ] `packages/utils/base/` - Shared utility functions
  - [ ] `packages/i18n/base/` - Centralized i18n instance
  - [ ] `packages/api-client/base/` - Type-safe API client
  - [ ] `packages/template-vue/base/` - Shared UI components
  
- [ ] **Shared packages properly export**:
  - [ ] Each has index.ts with clear public API
  - [ ] Types are properly exported
  - [ ] No circular dependencies between shared packages

### ✅ Documentation Requirements

- [ ] **Constitution updated** (v1.3.0+):
  - [ ] Modular architecture section strengthened
  - [ ] Prohibited practices section added
  - [ ] Reference implementation requirement stated
  
- [ ] **Specification updated**:
  - [ ] FR-000-MODULAR requirements added
  - [ ] Clarification section includes modular emphasis
  - [ ] Edge cases address modular concerns
  
- [ ] **README files explain package structure**:
  - [ ] How to create new packages
  - [ ] How packages are organized
  - [ ] Why modular architecture is mandatory

### ✅ Prohibited Practices - None Present

- [ ] **NO non-modular implementation**:
  - [ ] No feature code in root-level directories
  - [ ] No mixed frontend/backend packages
  - [ ] No packages without base/ directory
  
- [ ] **NO skipped reference study**:
  - [ ] universo-platformo-react patterns reviewed
  - [ ] Adaptations to Vue/Django documented
  
- [ ] **NO exceptions without justification**:
  - [ ] Any deviation from modular architecture has explicit approval
  - [ ] Justification documented in ADR (Architecture Decision Record)

## Validation Process

1. **Self-Check**: Developer validates all items before submitting PR
2. **Code Review**: Reviewer validates all items during PR review
3. **Constitution Compliance**: PR must pass constitution compliance check
4. **Automated Checks**: CI/CD validates package structure (if configured)

## Failure Consequences

**If ANY item is unchecked or fails validation:**
- ❌ PR is BLOCKED and cannot be merged
- ❌ Implementation must be refactored to compliance
- ❌ No exceptions granted without explicit architecture team approval

## Sign-Off

**Developer**: I certify that I have validated all items in this checklist.
- Name: _______________
- Date: _______________
- Signature: _______________

**Reviewer**: I have verified all items in this checklist are compliant.
- Name: _______________
- Date: _______________
- Signature: _______________

---

**Version**: 1.0.0  
**Last Updated**: 2025-11-17  
**Related Documents**: 
- `.specify/memory/constitution.md` (v1.3.0+)
- `.specify/specs/001-project-initialization/spec.md` (FR-000-MODULAR requirements)
- `.specify/specs/001-project-initialization/plan.md` (Constitution Check section)
