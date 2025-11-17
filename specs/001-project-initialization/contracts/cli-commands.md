# CLI Commands Contract

This document defines the command-line interface contracts for the Universo Platformo Vue project initialization tools.

## Package Scaffolding Command

### Command: `pnpm create-package`

Creates a new package in the monorepo with proper structure and configuration.

#### Syntax

```bash
pnpm create-package <name> [options]
```

#### Arguments

- `<name>` (required): Package name without @universo/ scope and without -frt/-srv suffix
  - Valid examples: `clusters`, `auth`, `utils`
  - Invalid examples: `@universo/clusters`, `clusters-frt`

#### Options

- `--frontend-only`: Create only frontend package (`{name}-frt`)
- `--backend-only`: Create only backend package (`{name}-srv`)
- `--help`, `-h`: Display help information
- `--dry-run`: Show what would be created without creating files

#### Default Behavior

Without options, creates both frontend and backend packages:
- `packages/{name}-frt/base/`
- `packages/{name}-srv/base/`

#### Examples

```bash
# Create both frontend and backend packages
pnpm create-package clusters

# Create only frontend package
pnpm create-package dashboard --frontend-only

# Create only backend package
pnpm create-package auth --backend-only

# Dry run to see what would be created
pnpm create-package test --dry-run
```

#### Output

**Success:**
```
✓ Creating package: clusters
✓ Created packages/clusters-frt/base/
✓ Created packages/clusters-srv/base/
✓ Generated package.json files
✓ Generated configuration files
✓ Created README.md and README-RU.md
✓ Updated pnpm-workspace.yaml
✓ Staged files for git commit

Success! Created @universo/clusters-frt and @universo/clusters-srv

Next steps:
  1. Run: pnpm install
  2. Implement your feature in packages/clusters-frt/base/src/
  3. Implement your backend in packages/clusters-srv/base/clusters/
  4. Run: pnpm build --filter=@universo/clusters-frt
```

**Error Cases:**

```
✗ Error: Package @universo/clusters-frt already exists
  Use a different name or remove the existing package first.

✗ Error: Invalid package name "Clusters"
  Package names must be lowercase with hyphens.
  Valid example: clusters

✗ Error: Reserved package name "test"
  This name is reserved. Choose a different name.
```

#### Exit Codes

- `0`: Success
- `1`: Validation error (invalid name, existing package)
- `2`: File system error (permissions, disk space)
- `3`: Configuration error (invalid pnpm-workspace.yaml)

## Documentation Validation Command

### Command: `pnpm validate:i18n`

Validates that English and Russian documentation files are in sync.

#### Syntax

```bash
pnpm validate:i18n [path]
```

#### Arguments

- `[path]` (optional): Specific file or directory to validate
  - Default: Validates entire repository

#### Examples

```bash
# Validate all documentation
pnpm validate:i18n

# Validate specific file
pnpm validate:i18n README.md

# Validate specific directory
pnpm validate:i18n packages/clusters-frt/
```

#### Output

**Success:**
```
✓ Checking documentation pairs...
✓ README.md ↔ README-RU.md (150 lines)
✓ packages/clusters-frt/base/README.md ↔ README-RU.md (82 lines)
✓ packages/auth-frt/base/README.md ↔ README-RU.md (64 lines)

✓ All documentation pairs are in sync (3 pairs validated)
```

**Validation Errors:**
```
✗ Validation failed for 2 documentation pairs:

1. README.md ↔ README-RU.md
   ✗ Line count mismatch: 150 (EN) vs 148 (RU)
   ✗ Missing section in RU: "## Contributing"

2. packages/clusters-frt/base/README.md ↔ README-RU.md
   ✗ Line count mismatch: 82 (EN) vs 85 (RU)
   ✗ Extra lines in RU at line 60-62

Fix these issues and run validation again.
```

#### Exit Codes

- `0`: All documentation pairs valid
- `1`: Validation failures found
- `2`: File not found or read error

## Workspace Commands

### Command: `pnpm install`

Installs all workspace dependencies with proper linking.

#### Syntax

```bash
pnpm install [options]
```

#### Options

- `--frozen-lockfile`: Don't update pnpm-lock.yaml
- `--prefer-offline`: Use cache when possible

#### Expected Output

```
Scope: all 8 workspace projects
Packages: +847
Progress: resolved 847, reused 823, downloaded 24, added 847, done

dependencies:
+ vue 3.4.0
+ @tanstack/vue-query 5.0.0
...

Done in 45.2s
```

### Command: `pnpm build`

Builds all packages in dependency order.

#### Syntax

```bash
pnpm build [options]
```

#### Options

- `--filter=<package>`: Build specific package and dependencies
- `--force`: Ignore cache and rebuild all

#### Examples

```bash
# Build all packages
pnpm build

# Build specific package
pnpm build --filter=@universo/clusters-frt

# Build with cache disabled
pnpm build --force
```

#### Expected Output (with Turborepo)

```
• Packages in scope: @universo/types, @universo/utils, @universo/i18n, @universo/clusters-frt
• Running build in 4 packages
• Remote caching enabled

@universo/types:build: cache hit, replaying logs
@universo/utils:build: cache hit, replaying logs
@universo/i18n:build: building...
@universo/i18n:build: ✓ built in 1.8s
@universo/clusters-frt:build: building...
@universo/clusters-frt:build: ✓ built in 3.2s

 Tasks:    2 successful, 2 cached, 4 total
Cached:    2 cached, 4 total
  Time:    5.1s >>> FULL TURBO
```

## File System Contracts

### Package Directory Structure

When `pnpm create-package <name>` is executed, the following structure is created:

#### Frontend Package

```
packages/{name}-frt/
└── base/
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts
    ├── README.md
    ├── README-RU.md
    ├── src/
    │   ├── index.ts
    │   ├── i18n/
    │   │   └── locales/
    │   │       ├── en/
    │   │       │   └── index.json
    │   │       └── ru/
    │   │           └── index.json
    │   └── components/
    └── tests/
        └── .gitkeep
```

#### Backend Package

```
packages/{name}-srv/
└── base/
    ├── requirements.txt
    ├── setup.py
    ├── README.md
    ├── README-RU.md
    └── {name}/
        ├── __init__.py
        ├── models.py
        ├── serializers.py
        ├── views.py
        ├── urls.py
        ├── admin.py
        ├── apps.py
        ├── tests/
        │   ├── __init__.py
        │   └── test_models.py
        └── migrations/
            └── __init__.py
```

### Generated File Contents

#### package.json (Frontend)

```json
{
  "name": "@universo/{name}-frt",
  "version": "0.1.0",
  "description": "{Name} frontend package",
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  },
  "scripts": {
    "build": "vite build",
    "dev": "vite build --watch",
    "test": "vitest",
    "lint": "eslint src"
  },
  "dependencies": {
    "vue": "catalog:"
  },
  "devDependencies": {
    "typescript": "catalog:",
    "vite": "catalog:",
    "vitest": "catalog:",
    "eslint": "catalog:"
  }
}
```

#### requirements.txt (Backend)

```txt
Django>=4.2.0,<5.0.0
djangorestframework>=3.14.0
djangorestframework-simplejwt>=5.3.0
pydantic>=2.5.0
```

#### README.md Template

```markdown
# @universo/{name}-frt

{Name} frontend package for Universo Platformo.

## Installation

This package is part of the Universo Platformo monorepo. Install dependencies:

```bash
pnpm install
```

## Development

Build the package:

```bash
pnpm build --filter=@universo/{name}-frt
```

Run in watch mode:

```bash
pnpm dev --filter=@universo/{name}-frt
```

## Testing

Run tests:

```bash
pnpm test --filter=@universo/{name}-frt
```

## License

MIT
```

## Configuration Update Contracts

### pnpm-workspace.yaml Update

When a new package is created, the following update occurs:

**Before:**
```yaml
packages:
  - 'packages/*'
  - 'packages/*/base'

catalog:
  vue: ^3.4.0
  typescript: ^5.0.0
```

**After:**
```yaml
packages:
  - 'packages/*'
  - 'packages/*/base'

# No change needed - glob patterns already include new packages

catalog:
  vue: ^3.4.0
  typescript: ^5.0.0
```

Note: No explicit update needed since glob patterns automatically include new packages.

## Error Handling Contracts

### Validation Error Response

```typescript
interface ValidationError {
  code: 'INVALID_NAME' | 'PACKAGE_EXISTS' | 'INVALID_PATH' | 'RESERVED_NAME';
  message: string;
  details?: Record<string, any>;
}
```

### Rollback Behavior

If package creation fails mid-process:

1. Delete any created directories
2. Revert pnpm-workspace.yaml changes
3. Unstage any git changes
4. Display error message with recovery instructions
5. Exit with appropriate error code

## Notes

- All commands assume they are run from the repository root
- Commands use PNPM's workspace awareness
- Git integration is automatic (staging created files)
- Configuration files use templates from scripts/templates/
- Error messages are bilingual (English with Russian in parentheses)
