# Tasks: Universo Platformo Vue Project Initialization

**Feature Branch**: `001-project-initialization`  
**Input**: Design documents from `.specify/specs/001-project-initialization/`  
**Prerequisites**: plan.md, spec.md, data-model.md, research.md, contracts/

**Note**: Tests are NOT requested in the specification, so test tasks are not included.

## Format: `- [ ] [ID] [P?] [Story?] Description with file path`

- **Checkbox**: Always start with `- [ ]`
- **[ID]**: Sequential task number (T001, T002, ...)
- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: User story label (US1, US2, etc.) - ONLY for user story phase tasks
- File paths must be absolute from repository root

---

## Phase 1: Setup (Project Initialization)

**Purpose**: Initialize repository structure and basic tooling

- [ ] T001 Create root .gitignore file with Node.js, Python, and IDE exclusions at /.gitignore
- [ ] T002 [P] Create root package.json with workspace scripts and PNPM configuration at /package.json
- [ ] T003 [P] Create pnpm-workspace.yaml with package patterns and catalog dependencies at /pnpm-workspace.yaml
- [ ] T004 [P] Create turbo.json with build orchestration pipeline configuration at /turbo.json
- [ ] T005 [P] Create root tsconfig.json with base TypeScript configuration at /tsconfig.json
- [ ] T006 [P] Create .eslintrc.js with Vue 3 and TypeScript linting rules at /.eslintrc.js
- [ ] T007 [P] Create .prettierrc with code formatting configuration at /.prettierrc
- [ ] T008 Create packages/ directory for monorepo packages at /packages/
- [ ] T009 Create scripts/ directory for automation tools at /scripts/

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before user story implementation

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T010 Create package scaffolding script at /scripts/create-package.js
- [ ] T011 Create documentation validation script at /scripts/validate-i18n-docs.js
- [ ] T012 Initialize PNPM workspace with root dependencies: pnpm install

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Repository Foundation Setup (Priority: P1) 🎯 MVP

**Goal**: Establish repository structure with bilingual documentation and proper configuration for all developer personas

**Independent Test**: Clone repository, read README.md and README-RU.md, verify structure matches monorepo conventions with proper tooling configuration

### Implementation for User Story 1

- [ ] T013 [P] [US1] Create root README.md with project overview, architecture, getting started, and persona-specific guidance at /README.md
- [ ] T014 [US1] Create root README-RU.md with identical structure to README.md translated to Russian at /README-RU.md
- [ ] T015 [US1] Validate bilingual documentation pair using validation script: pnpm validate:i18n

**Checkpoint**: US1 complete - Repository has proper bilingual documentation and structure

---

## Phase 4: User Story 2 - Monorepo and Workspace Configuration (Priority: P1)

**Goal**: Working monorepo setup with PNPM workspace management for efficient multi-package development

**Independent Test**: Run `pnpm install`, verify workspace packages are linked correctly, confirm catalog dependencies resolve properly

### Implementation for User Story 2

- [ ] T016 [US2] Verify pnpm-workspace.yaml glob patterns include packages/* and packages/*/base
- [ ] T017 [US2] Test workspace installation: pnpm install (expected time <60 seconds)
- [ ] T018 [US2] Verify catalog dependencies are properly configured in pnpm-workspace.yaml
- [ ] T019 [US2] Test workspace:* protocol resolution for internal package dependencies

**Checkpoint**: US2 complete - Workspace configuration functional, ready for package creation

---

## Phase 5: User Story 8 - Shared Packages and Build Orchestration (Priority: P1)

**Goal**: Centralized shared packages and efficient build orchestration for fast development cycles

**Independent Test**: Verify shared packages exist, build orchestration works, caching is enabled, and builds complete within performance targets

### Implementation for User Story 8

- [ ] T020 [P] [US8] Create @universo/types package structure at /packages/types/base/
- [ ] T021 [P] [US8] Create package.json for @universo/types at /packages/types/base/package.json
- [ ] T022 [P] [US8] Create tsconfig.json for @universo/types at /packages/types/base/tsconfig.json
- [ ] T023 [P] [US8] Create vite.config.ts for @universo/types at /packages/types/base/vite.config.ts
- [ ] T024 [P] [US8] Create src/index.ts for @universo/types at /packages/types/base/src/index.ts
- [ ] T025 [P] [US8] Create README.md for @universo/types at /packages/types/base/README.md
- [ ] T026 [P] [US8] Create README-RU.md for @universo/types at /packages/types/base/README-RU.md
- [ ] T027 [P] [US8] Create @universo/utils package structure at /packages/utils/base/
- [ ] T028 [P] [US8] Create package.json for @universo/utils at /packages/utils/base/package.json
- [ ] T029 [P] [US8] Create tsconfig.json for @universo/utils at /packages/utils/base/tsconfig.json
- [ ] T030 [P] [US8] Create vite.config.ts for @universo/utils at /packages/utils/base/vite.config.ts
- [ ] T031 [P] [US8] Create src/index.ts for @universo/utils at /packages/utils/base/src/index.ts
- [ ] T032 [P] [US8] Create README.md for @universo/utils at /packages/utils/base/README.md
- [ ] T033 [P] [US8] Create README-RU.md for @universo/utils at /packages/utils/base/README-RU.md
- [ ] T034 [P] [US8] Create @universo/i18n package structure at /packages/i18n/base/
- [ ] T035 [P] [US8] Create package.json for @universo/i18n at /packages/i18n/base/package.json
- [ ] T036 [P] [US8] Create tsconfig.json for @universo/i18n at /packages/i18n/base/tsconfig.json
- [ ] T037 [P] [US8] Create vite.config.ts for @universo/i18n at /packages/i18n/base/vite.config.ts
- [ ] T038 [P] [US8] Create src/index.ts with vue-i18n initialization for @universo/i18n at /packages/i18n/base/src/index.ts
- [ ] T039 [P] [US8] Create README.md for @universo/i18n at /packages/i18n/base/README.md
- [ ] T040 [P] [US8] Create README-RU.md for @universo/i18n at /packages/i18n/base/README-RU.md
- [ ] T041 [P] [US8] Create @universo/api-client package structure at /packages/api-client/base/
- [ ] T042 [P] [US8] Create package.json for @universo/api-client at /packages/api-client/base/package.json
- [ ] T043 [P] [US8] Create tsconfig.json for @universo/api-client at /packages/api-client/base/tsconfig.json
- [ ] T044 [P] [US8] Create vite.config.ts for @universo/api-client at /packages/api-client/base/vite.config.ts
- [ ] T045 [P] [US8] Create src/index.ts with API client core for @universo/api-client at /packages/api-client/base/src/index.ts
- [ ] T046 [P] [US8] Create src/core/client.ts with axios configuration at /packages/api-client/base/src/core/client.ts
- [ ] T047 [P] [US8] Create README.md for @universo/api-client at /packages/api-client/base/README.md
- [ ] T048 [P] [US8] Create README-RU.md for @universo/api-client at /packages/api-client/base/README-RU.md
- [ ] T049 [P] [US8] Create @universo/template-vue package structure at /packages/template-vue/base/
- [ ] T050 [P] [US8] Create package.json for @universo/template-vue at /packages/template-vue/base/package.json
- [ ] T051 [P] [US8] Create tsconfig.json for @universo/template-vue at /packages/template-vue/base/tsconfig.json
- [ ] T052 [P] [US8] Create vite.config.ts for @universo/template-vue at /packages/template-vue/base/vite.config.ts
- [ ] T053 [P] [US8] Create src/index.ts for @universo/template-vue at /packages/template-vue/base/src/index.ts
- [ ] T054 [P] [US8] Create src/plugins/vuetify.ts with Vuetify 3 MD3 configuration at /packages/template-vue/base/src/plugins/vuetify.ts
- [ ] T055 [P] [US8] Create README.md for @universo/template-vue at /packages/template-vue/base/README.md
- [ ] T056 [P] [US8] Create README-RU.md for @universo/template-vue at /packages/template-vue/base/README-RU.md
- [ ] T057 [US8] Install all workspace dependencies: pnpm install
- [ ] T058 [US8] Configure Turborepo pipeline with proper task dependencies in turbo.json
- [ ] T059 [US8] Test build orchestration: pnpm build (verify caching and parallel execution)
- [ ] T060 [US8] Verify catalog-based dependency management: check all packages use catalog: protocol

**Checkpoint**: US8 complete - Shared packages created, build orchestration functional, caching enabled

---

## Phase 6: User Story 3 - Package Structure Foundation and Scaffolding (Priority: P2)

**Goal**: Automated package scaffolding CLI tool for creating properly structured packages

**Independent Test**: Run `pnpm create-package test-feature`, verify it creates both frontend and backend packages with correct structure, package.json files, and base/ directories

### Implementation for User Story 3

- [ ] T061 [US3] Implement package name validation logic in /scripts/create-package.js
- [ ] T062 [US3] Implement existing package detection in /scripts/create-package.js
- [ ] T063 [US3] Implement directory structure creation for frontend packages in /scripts/create-package.js
- [ ] T064 [US3] Implement directory structure creation for backend packages in /scripts/create-package.js
- [ ] T065 [US3] Implement package.json generation for frontend packages in /scripts/create-package.js
- [ ] T066 [US3] Implement package.json generation for backend packages in /scripts/create-package.js
- [ ] T067 [US3] Implement tsconfig.json generation for frontend packages in /scripts/create-package.js
- [ ] T068 [US3] Implement vite.config.ts generation for frontend packages in /scripts/create-package.js
- [ ] T069 [US3] Implement requirements.txt and setup.py generation for backend packages in /scripts/create-package.js
- [ ] T070 [US3] Implement README.md and README-RU.md template generation in /scripts/create-package.js
- [ ] T071 [US3] Implement i18n locales directory creation in /scripts/create-package.js
- [ ] T072 [US3] Implement --frontend-only flag support in /scripts/create-package.js
- [ ] T073 [US3] Implement --backend-only flag support in /scripts/create-package.js
- [ ] T074 [US3] Implement rollback capability on errors in /scripts/create-package.js
- [ ] T075 [US3] Test package scaffolding: pnpm create-package test-feature
- [ ] T076 [US3] Test --frontend-only flag: pnpm create-package test-frt --frontend-only
- [ ] T077 [US3] Test --backend-only flag: pnpm create-package test-srv --backend-only
- [ ] T078 [US3] Test error handling: attempt to create duplicate package
- [ ] T079 [US3] Clean up test packages created during validation

**Checkpoint**: US3 complete - Package scaffolding tool functional, tested, and ready for use

---

## Phase 7: User Story 9 - Package Internationalization Architecture (Priority: P2)

**Goal**: Standardized i18n architecture for consistent translation patterns across all packages

**Independent Test**: Create sample package with translations, verify namespace registration works, translations render correctly in UI components

### Implementation for User Story 9

- [ ] T080 [US9] Implement namespace registration function in @universo/i18n at /packages/i18n/base/src/namespace.ts
- [ ] T081 [US9] Create locale loading utilities in @universo/i18n at /packages/i18n/base/src/loader.ts
- [ ] T082 [US9] Document i18n namespace pattern in @universo/i18n README.md
- [ ] T083 [US9] Create example translation JSON structure in @universo/i18n at /packages/i18n/base/src/locales/en/example.json
- [ ] T084 [US9] Create example translation JSON structure in @universo/i18n at /packages/i18n/base/src/locales/ru/example.json
- [ ] T085 [US9] Add package i18n setup instructions to package scaffolding script
- [ ] T086 [US9] Test namespace registration with sample translations

**Checkpoint**: US9 complete - i18n architecture established, namespace registration functional

---

## Phase 8: User Story 6 - Documentation System and Internationalization (Priority: P2)

**Goal**: Bilingual documentation system with validation tools to ensure English-Russian consistency

**Independent Test**: Create/update documentation files, run validation script, verify it detects mismatches in line count, section structure, and content equivalence

### Implementation for User Story 6

- [ ] T087 [US6] Implement file pair discovery logic in /scripts/validate-i18n-docs.js
- [ ] T088 [US6] Implement line count comparison in /scripts/validate-i18n-docs.js
- [ ] T089 [US6] Implement section heading structure comparison in /scripts/validate-i18n-docs.js
- [ ] T090 [US6] Implement code block count comparison in /scripts/validate-i18n-docs.js
- [ ] T091 [US6] Implement list structure comparison in /scripts/validate-i18n-docs.js
- [ ] T092 [US6] Implement error reporting with specific line numbers in /scripts/validate-i18n-docs.js
- [ ] T093 [US6] Add CLI argument parsing for path-specific validation in /scripts/validate-i18n-docs.js
- [ ] T094 [US6] Test validation script with matching documentation pairs
- [ ] T095 [US6] Test validation script with mismatched documentation (line count)
- [ ] T096 [US6] Test validation script with mismatched documentation (section structure)
- [ ] T097 [US6] Document bilingual documentation workflow in .github/instructions/i18n-docs.md
- [ ] T098 [US6] Update package scaffolding to include documentation validation reminder

**Checkpoint**: US6 complete - Documentation validation system functional, workflow documented

---

## Phase 9: User Story 4 - GitHub Repository Configuration (Priority: P2)

**Goal**: GitHub repository properly configured with labels, issue templates, and PR templates for consistent collaboration

**Independent Test**: Create test issue and PR, verify labels exist, templates are accessible, and guidelines are followed

### Implementation for User Story 4

- [ ] T099 [P] [US4] Create GitHub issue template for feature requests at /.github/ISSUE_TEMPLATE/feature_request.md
- [ ] T100 [P] [US4] Create GitHub issue template for bug reports at /.github/ISSUE_TEMPLATE/bug_report.md
- [ ] T101 [P] [US4] Create GitHub issue template for documentation improvements at /.github/ISSUE_TEMPLATE/documentation.md
- [ ] T102 [P] [US4] Create GitHub pull request template at /.github/PULL_REQUEST_TEMPLATE.md
- [ ] T103 [US4] Document GitHub labels in .github/instructions/github-labels.md (verify existing content)
- [ ] T104 [US4] Document issue creation process in .github/instructions/github-issues.md (verify existing content)
- [ ] T105 [US4] Document PR creation process in .github/instructions/github-pr.md (verify existing content)
- [ ] T106 [US4] Create script to apply GitHub labels at /scripts/setup-github-labels.js
- [ ] T107 [US4] Document label categories: type (bug, feature, enhancement, documentation, refactor, maintenance)
- [ ] T108 [US4] Document label categories: area (frontend, backend, build, testing, i18n, repository)
- [ ] T109 [US4] Document label categories: priority (high, medium, low) and project (platformo, architecture)

**Checkpoint**: US4 complete - GitHub configuration in place, templates available, labels documented

---

## Phase 10: User Story 5 - Technology Stack Foundation (Priority: P3)

**Goal**: Basic configuration files for Vue/TypeScript frontend and Django/Python backend development

**Independent Test**: Verify configuration files exist with appropriate settings, TypeScript compilation works, linting rules are applied

### Implementation for User Story 5

- [ ] T110 [US5] Document Vue 3 + TypeScript setup in shared packages README files
- [ ] T111 [US5] Document Django + Python setup in package scaffolding script
- [ ] T112 [US5] Document Supabase (PostgreSQL) as primary database with extensibility notes
- [ ] T113 [US5] Document Django authentication with JWT (djangorestframework-simplejwt) approach
- [ ] T114 [US5] Add technology stack overview to root README.md
- [ ] T115 [US5] Add technology stack overview to root README-RU.md
- [ ] T116 [US5] Verify all configuration files follow documented patterns

**Checkpoint**: US5 complete - Technology stack foundation documented and configured

---

## Phase 11: User Story 7 - Reference Implementation Tracking (Priority: P3)

**Goal**: Documented procedures for monitoring universo-platformo-react and replicating mature features

**Independent Test**: Verify documentation exists explaining how to track the React repository, evaluate features, and implement them in Vue/Django

### Implementation for User Story 7

- [ ] T117 [US7] Create reference implementation tracking guide at /docs/reference-tracking.md
- [ ] T118 [US7] Create reference implementation tracking guide (Russian) at /docs/reference-tracking-RU.md
- [ ] T119 [US7] Document feature evaluation criteria (maturity, completion, legacy assessment)
- [ ] T120 [US7] Document React/Express to Vue/Django adaptation guidelines
- [ ] T121 [US7] Document patterns to adopt (monorepo structure, package organization, entity models)
- [ ] T122 [US7] Document patterns to avoid (docs/ directory, legacy Flowise code, incomplete implementations)
- [ ] T123 [US7] Create GitHub issue template for feature replication at /.github/ISSUE_TEMPLATE/replicate_feature.md
- [ ] T124 [US7] Add reference tracking section to root README.md
- [ ] T125 [US7] Add reference tracking section to root README-RU.md

**Checkpoint**: US7 complete - Reference implementation tracking procedures documented

---

## Phase 12: Polish & Cross-Cutting Concerns

**Purpose**: Final improvements and validation across all user stories

- [ ] T126 [P] Run full workspace build: pnpm build
- [ ] T127 [P] Verify build performance meets targets (<10 minutes for full build)
- [ ] T128 [P] Run documentation validation: pnpm validate:i18n
- [ ] T129 [P] Verify all README files are bilingual and in sync
- [ ] T130 [P] Test package creation end-to-end: pnpm create-package example-feature
- [ ] T131 [P] Clean up any test artifacts or temporary files
- [ ] T132 [P] Run linting across all packages: pnpm lint
- [ ] T133 [P] Format code: pnpm format
- [ ] T134 Create CONTRIBUTING.md with contribution guidelines at /CONTRIBUTING.md
- [ ] T135 Create CONTRIBUTING-RU.md with Russian translation at /CONTRIBUTING-RU.md
- [ ] T136 Create LICENSE file (MIT) at /LICENSE
- [ ] T137 Update root README.md with quickstart links and badge status
- [ ] T138 Update root README-RU.md with identical content in Russian
- [ ] T139 Verify all constitution principles are implemented (Constitution Check)
- [ ] T140 Run quickstart.md validation (manual test following quickstart guide)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Story Phases (Phase 3-11)**: All depend on Foundational phase completion
  - **Phase 3 (US1 - P1)**: Can start after Foundational
  - **Phase 4 (US2 - P1)**: Can start after Foundational, parallel with US1
  - **Phase 5 (US8 - P1)**: Can start after Foundational, parallel with US1/US2
  - **Phase 6 (US3 - P2)**: Can start after Phase 5 (needs shared packages)
  - **Phase 7 (US9 - P2)**: Can start after Phase 5 (needs @universo/i18n)
  - **Phase 8 (US6 - P2)**: Can start after Foundational, parallel with other P2 stories
  - **Phase 9 (US4 - P2)**: Can start after Foundational, parallel with other P2 stories
  - **Phase 10 (US5 - P3)**: Can start after Foundational
  - **Phase 11 (US7 - P3)**: Can start after Foundational
- **Polish (Phase 12)**: Depends on all user stories being complete

### User Story Dependencies

Priority 1 stories (CRITICAL - MVP requires these):
- **US1 (Repository Foundation)**: Independent - no dependencies on other stories
- **US2 (Workspace Configuration)**: Independent - no dependencies on other stories  
- **US8 (Shared Packages)**: Independent - no dependencies on other stories

Priority 2 stories (IMPORTANT - complete these next):
- **US3 (Package Scaffolding)**: Depends on US8 (needs shared packages structure as template)
- **US9 (i18n Architecture)**: Depends on US8 (needs @universo/i18n package)
- **US6 (Documentation System)**: Independent - no dependencies on other stories
- **US4 (GitHub Configuration)**: Independent - no dependencies on other stories

Priority 3 stories (ENHANCEMENT - optional for MVP):
- **US5 (Technology Stack)**: Independent - documentation only
- **US7 (Reference Tracking)**: Independent - documentation only

### Within Each User Story

For US8 (Shared Packages):
1. All package structure creation tasks (T020-T056) can run in parallel (marked [P])
2. Installation (T057) depends on all package structures being created
3. Configuration and testing (T058-T060) runs after installation

For US3 (Package Scaffolding):
1. All script implementation tasks (T061-T074) can be done sequentially (same file)
2. Testing tasks (T075-T079) run after implementation is complete

For US6 (Documentation Validation):
1. All implementation tasks (T087-T093) can be done sequentially (same file)
2. Testing tasks (T094-T096) run after implementation is complete

For US4 (GitHub Configuration):
1. Template creation tasks (T099-T102) can run in parallel (marked [P])
2. Documentation tasks run after templates are created

### Parallel Opportunities

**Phase 1 (Setup)**: Tasks T002-T007 can all run in parallel (marked [P]) - different files

**Phase 5 (US8 - Shared Packages)**:
- All package creation tasks T020-T056 can run in parallel (5 packages × ~7 tasks each)
- This represents the largest parallel opportunity in the project

**Phase 9 (US4 - GitHub)**:
- Tasks T099-T102 can run in parallel (different template files)

**Across User Stories**:
- After Foundational phase, can work on US1, US2, US8 simultaneously (all P1)
- After US8 complete, can work on US3, US9, US6, US4 simultaneously (all P2)
- US5 and US7 can be done anytime (documentation only)

---

## Parallel Example: Shared Packages (US8)

```bash
# Create all 5 shared packages in parallel:
# Team Member A: @universo/types (T020-T026)
# Team Member B: @universo/utils (T027-T033)  
# Team Member C: @universo/i18n (T034-T040)
# Team Member D: @universo/api-client (T041-T048)
# Team Member E: @universo/template-vue (T049-T056)

# Then together: Installation and configuration (T057-T060)
```

---

## Implementation Strategy

### MVP First (P1 Stories Only)

**Minimal Viable Product includes**:
1. Complete Phase 1: Setup (T001-T009)
2. Complete Phase 2: Foundational (T010-T012) ← CRITICAL BLOCKER
3. Complete Phase 3: US1 - Repository Foundation (T013-T015)
4. Complete Phase 4: US2 - Workspace Configuration (T016-T019)
5. Complete Phase 5: US8 - Shared Packages (T020-T060)
6. **STOP and VALIDATE**: Test workspace, verify shared packages build, check documentation
7. Deploy/demo if ready

**MVP Success Criteria**:
- Repository can be cloned and understood by new developers
- Workspace installation works (pnpm install)
- Shared packages build successfully  
- Bilingual documentation is in sync
- Ready for package scaffolding tool development

### Incremental Delivery (Add P2 Stories)

After MVP is validated:
1. Add Phase 6: US3 - Package Scaffolding (T061-T079) → Test independently
2. Add Phase 7: US9 - i18n Architecture (T080-T086) → Test independently
3. Add Phase 8: US6 - Documentation Validation (T087-T098) → Test independently  
4. Add Phase 9: US4 - GitHub Configuration (T099-T109) → Test independently
5. Each addition is independently testable and adds value

### Optional Enhancements (P3 Stories)

If time/resources permit:
1. Add Phase 10: US5 - Technology Stack documentation
2. Add Phase 11: US7 - Reference Tracking procedures
3. Add Phase 12: Polish & Cross-Cutting Concerns

### Parallel Team Strategy

**With 3 developers (optimal for MVP)**:
1. All: Complete Setup + Foundational together (Phases 1-2)
2. Once Foundational is done:
   - **Developer A**: US1 - Repository Foundation (T013-T015)
   - **Developer B**: US2 - Workspace Configuration (T016-T019)
   - **Developer C**: US8 - Shared Packages (T020-T060) ← Largest workload
3. MVP complete - validate together

**With 5 developers (for full P1+P2)**:
1. All: Complete Setup + Foundational together
2. P1 Phase (parallel):
   - Dev A: US1 (T013-T015)
   - Dev B: US2 (T016-T019)
   - Devs C+D: US8 (T020-T060) - split shared packages
3. P2 Phase (parallel, after US8):
   - Dev A: US3 (T061-T079)
   - Dev B: US9 (T080-T086)
   - Dev C: US6 (T087-T098)
   - Dev D: US4 (T099-T109)
   - Dev E: US5 (T110-T116)

---

## Task Summary

**Total Tasks**: 140

**By Phase**:
- Phase 1 (Setup): 9 tasks
- Phase 2 (Foundational): 3 tasks (CRITICAL BLOCKER)
- Phase 3 (US1 - P1): 3 tasks
- Phase 4 (US2 - P1): 4 tasks  
- Phase 5 (US8 - P1): 41 tasks (largest phase - shared packages)
- Phase 6 (US3 - P2): 19 tasks
- Phase 7 (US9 - P2): 7 tasks
- Phase 8 (US6 - P2): 12 tasks
- Phase 9 (US4 - P2): 11 tasks
- Phase 10 (US5 - P3): 7 tasks
- Phase 11 (US7 - P3): 9 tasks
- Phase 12 (Polish): 15 tasks

**By Priority**:
- P1 (MVP - Critical): 51 tasks across 3 user stories (US1, US2, US8)
- P2 (Important): 49 tasks across 4 user stories (US3, US9, US6, US4)
- P3 (Optional): 16 tasks across 2 user stories (US5, US7)
- Infrastructure: 24 tasks (Setup + Foundational + Polish)

**Parallel Opportunities Identified**:
- Setup phase: 6 tasks can run in parallel (T002-T007)
- US8 shared packages: 37 tasks can run in parallel (T020-T056)
- US4 templates: 4 tasks can run in parallel (T099-T102)
- Total parallelizable: 47 tasks (33% of total)

**Independent Test Criteria by Story**:
- US1: Clone repo, read bilingual READMEs, verify structure
- US2: Run pnpm install, verify workspace linking works
- US8: Build shared packages, verify caching, check catalog dependencies
- US3: Run pnpm create-package, verify structure and files created
- US9: Create package with translations, verify namespace registration
- US6: Run validation script, verify mismatch detection
- US4: Create test issue/PR, verify templates and labels work
- US5: Verify configuration files exist and are documented
- US7: Read tracking documentation, verify procedures are clear

**Suggested MVP Scope**: 
- Phases 1-5 (Setup + Foundational + US1 + US2 + US8)
- 60 total tasks
- Estimated effort: 3-5 days with 1 developer, 2-3 days with 3 developers
- Delivers: Functional monorepo with shared packages, ready for feature development

---

## Format Validation

✅ All tasks follow required checklist format:
- [x] Checkbox: `- [ ]` present on every task
- [x] Task ID: Sequential T001-T140
- [x] [P] marker: Only on parallelizable tasks (different files, no dependencies)
- [x] [Story] label: Present ONLY on user story phase tasks (US1-US9)
- [x] Description: Clear action with exact file path
- [x] Setup/Foundational phases: No [Story] label (correctly omitted)
- [x] Polish phase: No [Story] label (correctly omitted)

---

## Notes

- **Tests not included**: Feature specification does not request TDD approach or specific tests
- **File paths**: All paths are absolute from repository root (/)
- **Monorepo context**: ALL functionality goes in packages/ directory (modular architecture)
- **Constitution compliance**: Checked - all principles addressed, modular architecture enforced
- **Reference implementation**: universo-platformo-react patterns adapted to Vue/Django
- **Bilingual requirement**: All documentation paired with Russian translation
- **Performance targets**: Build times, install times monitored per NFR requirements
- **Package naming**: @universo/ scope, -frt/-srv suffixes, base/ directory structure
- **Build orchestration**: Turborepo for caching and parallel execution
- **Catalog dependencies**: Centralized version management in pnpm-workspace.yaml

---

## Execution Recommendation

**For single developer**: Follow MVP First strategy (Phases 1-5), validate, then add P2 stories incrementally

**For team**: Use Parallel Team Strategy to work on multiple user stories simultaneously after Foundational phase

**Critical path**: Setup (Phase 1) → Foundational (Phase 2) → US8 Shared Packages (Phase 5) - these block most other work

**Quick wins**: US1 (documentation) and US2 (workspace config) can be completed quickly alongside US8 to show early progress
