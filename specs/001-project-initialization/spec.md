# Feature Specification: Universo Platformo Vue Project Initialization

**Feature Branch**: `001-project-initialization`  
**Created**: 2025-11-16  
**Status**: Draft  
**Input**: User description: "Initialize Universo Platformo Vue repository with monorepo structure, Vue/TypeScript frontend, Django/Python backend, PNPM workspace management, base package structure, and bilingual documentation system (English/Russian)"

## Clarifications

### Session 2025-11-16

- Q: When a developer wants to create a new feature package (e.g., "clusters" with clusters-frt and clusters-srv), what is the step-by-step workflow? → A: Script-assisted approach - A CLI tool/script (`pnpm create-package [name]`) scaffolds the directory structure, package.json files, and updates workspace config; developer implements functionality. This provides automation for boilerplate while maintaining flexibility, following modern monorepo best practices rather than the manual approach used in universo-platformo-react.

- Q: How should packages be uniquely identified in the monorepo to prevent naming conflicts and enable future separation into independent repositories? → A: Scoped names with @universo/ namespace (e.g., `@universo/clusters-frt`, `@universo/clusters-srv`). This follows the pattern established in universo-platformo-react, provides namespace isolation, prevents npm registry conflicts, and enables future publishing. The @universo/ scope clearly indicates ownership and aligns with industry-standard monorepo practices used by major projects.

- Q: What are the expected scale limits for the monorepo and when should packages be separated into independent repositories? → A: Based on universo-platformo-react (currently ~35 packages with 9 frontend + 9 backend feature packages), the Vue implementation should comfortably support 50-100 packages. Separation into independent repositories should be considered when: (1) a package needs independent release cycles, (2) package size exceeds 100MB, (3) build times exceed 10 minutes, or (4) external teams need to maintain specific packages independently. Initial implementation focuses on monorepo scalability with future extraction paths documented.

- Q: What are the different developer personas and their specific needs when working with this repository? → A: Three primary personas: (1) **Feature Developers** - implement business logic in Vue/Django, need clear package structure and scaffolding tools; (2) **Platform Maintainers** - manage monorepo infrastructure, need tooling for workspace management and cross-package operations; (3) **Documentation Contributors** - maintain bilingual docs, need clear i18n guidelines and validation tools. Each persona has different entry points and documentation needs that should be reflected in README structure.

- Q: What are the build and workspace operation performance expectations for developer experience? → A: Based on modern monorepo standards and ensuring good DX: (1) `pnpm install` should complete in <60 seconds for clean install, <10 seconds for incremental; (2) Individual package builds should complete in <2 minutes; (3) Full monorepo build should complete in <10 minutes; (4) Hot reload for development should respond in <3 seconds. These targets guide tooling choices (Vite for fast builds, PNPM for efficient installs) and should be monitored as the project scales.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Repository Foundation Setup (Priority: P1)

As a developer joining the Universo Platformo Vue project (whether as Feature Developer, Platform Maintainer, or Documentation Contributor), I need a properly structured repository with persona-specific documentation and tooling so that I can quickly understand my role, find relevant information, and contribute effectively following established conventions.

**Why this priority**: This is the foundation for all future work. Without proper repository structure, documentation addressing different personas, and tooling setup, no development can proceed effectively. This enables immediate onboarding of all developer types.

**Independent Test**: Can be fully tested by cloning the repository, reading the documentation files for each persona, and verifying that the repository structure follows monorepo conventions with proper tooling configuration.

**Acceptance Scenarios**:

1. **Given** an empty or minimal repository, **When** a developer clones it, **Then** they find comprehensive README files in both English and Russian explaining the project purpose, structure, getting started instructions, and guidance for each developer persona
2. **Given** the repository structure, **When** examining the layout, **Then** it follows monorepo patterns with clear package organization and workspace configuration
3. **Given** the repository, **When** checking for configuration files, **Then** appropriate .gitignore, editor configurations, and linting rules are present
4. **Given** the documentation, **When** reading README-RU.md, **Then** it contains identical content to README.md translated to Russian with the same number of lines and structure
5. **Given** the README documentation, **When** a Feature Developer reads it, **Then** they find clear guidance on package structure, scaffolding tools, and feature implementation workflow
6. **Given** the README documentation, **When** a Platform Maintainer reads it, **Then** they find clear guidance on workspace management, build optimization, and infrastructure maintenance
7. **Given** the README documentation, **When** a Documentation Contributor reads it, **Then** they find clear guidance on bilingual documentation requirements, translation workflow, and validation tools

---

### User Story 2 - Monorepo and Workspace Configuration (Priority: P1)

As a developer, I need a working monorepo setup with PNPM workspace management so that I can manage multiple packages efficiently, share dependencies, and maintain consistent versions across the project.

**Why this priority**: The monorepo structure is essential for the architecture. Without it, the package system cannot function, and development cannot begin on actual features.

**Independent Test**: Can be fully tested by running PNPM commands to install dependencies, build packages, and verify workspace linkage between packages.

**Acceptance Scenarios**:

1. **Given** the repository with package.json and pnpm-workspace.yaml, **When** running `pnpm install`, **Then** all workspace packages are linked correctly and dependencies are installed
2. **Given** multiple packages in the workspace, **When** one package depends on another, **Then** PNPM correctly resolves and links the workspace dependency
3. **Given** the monorepo structure, **When** examining the packages directory, **Then** it contains subdirectories following the naming pattern `packages/[feature-name]-frt` for frontend and `packages/[feature-name]-srv` for backend
4. **Given** any package directory, **When** checking its structure, **Then** it contains a `base/` directory for core implementation

---

### User Story 3 - Package Structure Foundation and Scaffolding (Priority: P2)

As a developer, I need a package scaffolding CLI tool that automates creation of new feature packages so that I can quickly create properly structured frontend and backend packages following consistent patterns without manual setup errors.

**Why this priority**: Establishes the architectural pattern that all future packages will follow and provides automation to reduce errors. This ensures consistency and makes the codebase more maintainable as it grows. Script-assisted approach is superior to the manual method used in universo-platformo-react.

**Independent Test**: Can be fully tested by running the package scaffolding command (e.g., `pnpm create-package test-feature`) and verifying that it creates properly structured frontend and backend packages with base directories, correct package.json files, and updates workspace configuration.

**Acceptance Scenarios**:

1. **Given** the repository with PNPM workspace, **When** a developer runs `pnpm create-package [feature-name]`, **Then** it creates both `packages/[feature-name]-frt` and `packages/[feature-name]-srv` directories with proper structure
2. **Given** newly created package directories, **When** examining their structure, **Then** each contains a `base/` subdirectory with boilerplate configuration files (package.json, tsconfig.json for frontend, appropriate Python config for backend)
3. **Given** the scaffolding script execution, **When** packages are created, **Then** the workspace configuration (pnpm-workspace.yaml) is automatically updated to include the new packages
4. **Given** the created packages, **When** running `pnpm install`, **Then** the new packages are properly recognized and linked in the workspace

---

### User Story 4 - GitHub Repository Configuration (Priority: P2)

As a project maintainer, I need GitHub repository properly configured with labels, issue templates, and workflow conventions so that contributors can create consistent issues, pull requests, and follow established processes.

**Why this priority**: Proper GitHub configuration ensures consistent collaboration patterns, makes issue tracking effective, and sets expectations for contributors from the start.

**Independent Test**: Can be fully tested by creating a test issue and PR, verifying that labels exist, templates are accessible, and guidelines are followed.

**Acceptance Scenarios**:

1. **Given** the repository on GitHub, **When** viewing the labels list, **Then** appropriate labels exist for categorizing issues (type, area, priority, project-specific)
2. **Given** the GitHub instructions, **When** creating an issue, **Then** guidelines specify including both English text and Russian translation in a spoiler with exact format
3. **Given** the repository documentation, **When** checking PR guidelines, **Then** clear instructions exist for labeling, descriptions, and linking to issues
4. **Given** repository labels, **When** reviewing them, **Then** they include at least: bug, feature, enhancement, documentation, frontend, backend, i18n, repository, platformo

---

### User Story 5 - Technology Stack Foundation (Priority: P3)

As a developer, I need basic configuration files and setup for reactive frontend and API backend development so that I have a starting point for implementing features with the correct technology stack.

**Why this priority**: While important for future development, this can be established incrementally as features are built. The repository structure and conventions are more critical to establish first.

**Independent Test**: Can be fully tested by verifying that configuration files for frontend and backend development exist with appropriate settings for the project.

**Acceptance Scenarios**:

1. **Given** the repository, **When** checking for frontend configuration, **Then** appropriate files exist for reactive component framework project setup with type safety
2. **Given** the repository, **When** checking for backend configuration, **Then** appropriate files exist for API framework setup with ORM and dependency management
3. **Given** the technology stack, **When** reviewing database configuration, **Then** documentation indicates the primary database platform with extensibility for other databases in the future
4. **Given** the authentication setup, **When** reviewing configuration, **Then** documentation indicates the authentication pattern with database connector support

---

### User Story 6 - Documentation System and Internationalization (Priority: P2)

As a contributor, I need a clear documentation system with bilingual support (English/Russian) so that both English and Russian-speaking team members can understand and contribute to the project effectively.

**Why this priority**: Bilingual documentation is a core requirement of the project and affects all documentation efforts. Establishing this pattern early prevents rework.

**Independent Test**: Can be fully tested by verifying that all documentation files have corresponding Russian versions with identical structure and line counts.

**Acceptance Scenarios**:

1. **Given** any English documentation file (README.md, package docs), **When** checking for translations, **Then** a corresponding Russian version exists (README-RU.md) with identical structure
2. **Given** an English and Russian documentation pair, **When** comparing them, **Then** they have the same number of lines and equivalent content structure
3. **Given** the i18n-docs.md guidelines, **When** creating or updating documentation, **Then** clear instructions exist for maintaining bilingual documentation
4. **Given** GitHub issues and PRs, **When** reviewing the format, **Then** they include English text with Russian translation in a `<details><summary>In Russian</summary>` spoiler

---

### Edge Cases

- What happens when a developer tries to add a package that doesn't follow the naming convention (-frt/-srv)? → The scaffolding script enforces the naming convention automatically
- What happens if a developer runs the scaffolding script with a package name that already exists? → The script should detect existing packages and prompt for confirmation or abort to prevent overwriting
- How does the system handle when Russian documentation becomes out of sync with English documentation?
- What happens if a developer creates a package without a base/ directory? → The scaffolding script creates base/ directory automatically; manual package creation is discouraged
- How does the repository handle dependencies that conflict between frontend and backend packages?
- What happens when trying to use a database other than Supabase for the first time?
- How does the system handle when an issue is created without the Russian translation spoiler?
- What happens if package names conflict with existing JavaScript/Python package names? → Package naming with @universo/ scope reduces collision risk; documentation should warn about reserved names

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Repository MUST contain a root README.md and README-RU.md with identical structure explaining project purpose, architecture, and getting started instructions
- **FR-002**: Repository MUST use workspace management tooling for managing multiple packages in a monorepo structure
- **FR-003**: Repository MUST contain a packages/ directory for organizing feature packages
- **FR-004**: Package naming MUST follow the convention: `packages/[feature-name]-frt` for frontend and `packages/[feature-name]-srv` for backend with @universo/ scoped names in package.json (e.g., `@universo/clusters-frt`)
- **FR-005**: Each package MUST contain a base/ subdirectory for core implementation
- **FR-006**: Repository MUST contain .gitignore file configured for Node.js (PNPM), Python (Django), and common editor artifacts
- **FR-007**: Repository MUST include configuration files for reactive component-based frontend development with static type checking
- **FR-008**: Repository MUST include configuration files for backend API development with comprehensive ORM support
- **FR-009**: Documentation MUST indicate the primary database platform with provisions for future database support
- **FR-010**: Documentation MUST indicate the authentication approach with database integration support
- **FR-011**: GitHub repository MUST have labels configured including: bug, feature, enhancement, documentation, frontend, backend, i18n, repository, platformo
- **FR-012**: Repository MUST contain `.github/instructions/` directory with guidelines for issues, labels, PRs, and internationalization
- **FR-013**: All documentation files MUST have corresponding Russian translations following the pattern `[filename]-RU.[ext]`
- **FR-014**: Russian documentation MUST have identical structure and line count as English versions
- **FR-015**: GitHub issues MUST include English text and Russian translation in a spoiler using `<details><summary>In Russian</summary>` format
- **FR-016**: Repository MUST include configuration for modern component library usage
- **FR-017**: Repository structure MUST support future separation of packages into independent repositories
- **FR-018**: Repository MUST NOT include a docs/ directory (documentation will be separate)
- **FR-019**: Repository MUST NOT include AI agent configuration files in root (users create these themselves)
- **FR-020**: Package structure MUST support multiple implementations within each package (hence the base/ directory requirement)
- **FR-021**: Repository MUST include a package scaffolding CLI script (`pnpm create-package`) that automates creation of new feature packages with proper structure, package.json files, and workspace configuration updates
- **FR-022**: The package scaffolding script MUST create both frontend (-frt) and backend (-srv) package directories with base/ subdirectories and appropriate boilerplate configuration files
- **FR-023**: Documentation MUST define three developer personas (Feature Developers, Platform Maintainers, Documentation Contributors) with specific guidance for each
- **FR-024**: Build performance targets MUST be documented: <60s clean install, <10s incremental install, <2min package build, <10min full build, <3s hot reload

### Non-Functional Requirements

- **NFR-001**: Monorepo MUST support scaling to 50-100 packages without significant performance degradation
- **NFR-002**: Clean workspace installation (`pnpm install`) MUST complete in under 60 seconds
- **NFR-003**: Incremental workspace installation MUST complete in under 10 seconds
- **NFR-004**: Individual package builds MUST complete in under 2 minutes
- **NFR-005**: Full monorepo build MUST complete in under 10 minutes
- **NFR-006**: Hot reload during development MUST respond in under 3 seconds
- **NFR-007**: Package separation criteria MUST be documented: independent release cycles, >100MB size, >10min build time, or external team ownership
- **NFR-008**: Documentation MUST address three distinct developer personas with tailored guidance for each

### Key Entities

- **Package**: A modular unit of functionality with @universo/ scoped name, separated into frontend (-frt) and backend (-srv) variants, containing base implementation and potentially multiple technology-specific implementations
- **Workspace**: The PNPM-managed monorepo containing all packages with shared dependency management and catalog for version consistency
- **Documentation Pair**: An English documentation file and its Russian translation counterpart maintaining identical structure
- **Feature**: A complete piece of functionality consisting of frontend and backend packages working together
- **Repository Configuration**: GitHub settings, labels, templates, and guidelines that govern collaboration
- **Base Implementation**: The core code within a package's base/ directory that may have multiple technology stack variations in the future
- **Developer Persona**: One of three roles (Feature Developer, Platform Maintainer, Documentation Contributor) with specific needs and workflows
- **Scaffolding Script**: CLI tool for automated package creation following established patterns

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A new developer can clone the repository and understand the project structure within 15 minutes by reading README files
- **SC-002**: All core documentation files have Russian translations with 100% structural equivalence (same line count, same sections)
- **SC-003**: Workspace management commands (install, build) execute successfully across all configured packages
- **SC-004**: Package structure follows documented conventions with 100% compliance (all packages have @universo/ scoped names, -frt/-srv separation, and base/ directories)
- **SC-005**: GitHub repository has minimum 10 labels configured covering types (bug, feature, enhancement, documentation) and areas (frontend, backend, i18n, repository)
- **SC-006**: All instruction files in `.github/instructions/` are present and accessible (github-issues.md, github-labels.md, github-pr.md, i18n-docs.md)
- **SC-007**: Repository structure enables independent package development where a developer can work on a single package without requiring changes to others
- **SC-008**: Documentation clearly articulates technology stack choices and rationale for the reactive frontend, API backend, and database platform
- **SC-009**: Package scaffolding script (`pnpm create-package`) successfully creates properly structured packages in under 5 seconds
- **SC-010**: Clean workspace installation completes in under 60 seconds on standard developer hardware
- **SC-011**: Documentation provides clear guidance for all three developer personas (Feature Developer, Platform Maintainer, Documentation Contributor)

## Assumptions

This specification makes the following assumptions based on industry standards and the context provided:

1. **Version Control**: Git is used with GitHub as the hosting platform
2. **Node Version**: Node.js LTS version (18.x or later) is the target runtime for frontend tooling
3. **Python Version**: Python 3.10 or later is the target runtime for backend
4. **Package Manager**: PNPM 8.x or later is used for workspace management
5. **Build Tools**: Modern build tools (Vite for Vue, standard Django setup) are assumed
6. **Code Quality**: Standard linting and formatting tools (ESLint, Prettier for frontend; Black, Flake8 for backend) will be configured
7. **Editor Support**: VSCode is the primary editor, but configuration should not exclude other editors
8. **Deployment**: Deployment strategy is out of scope for initial setup; focus is on development environment
9. **Testing**: Testing frameworks will be added per package as features are implemented
10. **CI/CD**: Continuous integration will be configured in future phases, not in initial setup
11. **License**: Open source license (MIT or similar) is assumed unless specified otherwise
12. **Contributing**: Standard open source contribution workflow (fork, branch, PR) is assumed

## Dependencies

- Availability of PNPM package manager
- Access to GitHub repository with appropriate permissions
- Node.js and Python runtime environments
- Access to reference repository (universo-platformo-react) for architectural patterns
- Supabase account/project for database (for future feature implementation)

## Out of Scope

The following items are explicitly out of scope for this initial project setup:

1. Implementation of actual features (Clusters, Metaverses, etc.) - these are separate features
2. Complete UI implementation with component library
3. Authentication implementation (only documentation of approach)
4. Database schema design and migration setup
5. API endpoint implementation
6. Testing infrastructure and test suites
7. CI/CD pipeline configuration
8. Deployment configuration and infrastructure
9. Performance optimization
10. Security hardening beyond basic best practices
11. Creating the separate documentation repository
12. Implementing graph-based workflow system or custom node types
13. Real-time multiplayer functionality
14. Complete feature parity with the React-based reference implementation
