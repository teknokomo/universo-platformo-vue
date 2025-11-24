# universo-platformo-vue

Implementation of Universo Platformo / Universo MMOOMM / Universo Kiberplano built on Vue / Django and related stack in TypeScript / Python

## Documentation Structure

This project follows a standardized documentation structure:

### `.specify/` Directory

All project documentation and specifications are organized under the `.specify/` directory:

- **`.specify/memory/`** - Contains the project constitution (`constitution.md`) defining core principles, technology stack, and development workflow
- **`.specify/specs/`** - Contains feature specifications, organized by feature number (e.g., `001-project-initialization/`)
  - Each feature directory includes:
    - `spec.md` - Feature specification with requirements and user stories
    - `tasks.md` - Implementation tasks organized by phase
    - `plan.md` - Technical implementation plan
    - Additional design documents as needed
- **`.specify/scripts/`** - Automation scripts for spec-driven development workflow
  - `bash/` - Shell scripts for feature management and validation
- **`.specify/templates/`** - Templates for documentation artifacts
  - `spec-template.md` - Feature specification template
  - `tasks-template.md` - Task list template
  - `plan-template.md` - Implementation plan template
  - `checklist-template.md` - Checklist template
  - `agent-file-template.md` - Agent configuration template

### Agent Configuration

Agent configurations are stored in `.github/agents/` and reference the `.specify/` structure for all feature-related operations.

## Getting Started

See `.specify/specs/001-project-initialization/` for project initialization documentation.
