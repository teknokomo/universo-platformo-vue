# Quickstart Guide: Universo Platformo Vue

**Version**: 0.1.0  
**Last Updated**: 2025-11-17

This quickstart guide helps you get started with the Universo Platformo Vue repository based on your role.

## Prerequisites

Before you begin, ensure you have:

- **Node.js** 18.x LTS or later ([download](https://nodejs.org/))
- **PNPM** 9.0 or later (install: `npm install -g pnpm`)
- **Python** 3.10 or later ([download](https://www.python.org/))
- **Git** for version control
- Code editor (VS Code recommended)

## Initial Setup

### 1. Clone the Repository

```bash
git clone https://github.com/teknokomo/universo-platformo-vue.git
cd universo-platformo-vue
```

### 2. Install Dependencies

```bash
# Install frontend dependencies
pnpm install

# Expected time: 45-60 seconds for clean install
```

### 3. Verify Installation

```bash
# Check that workspace is properly configured
pnpm list --depth=0

# You should see workspace packages listed
```

## Developer Personas

Choose your path based on your role:

### 🎨 Feature Developer

**Your Focus**: Implementing business features in Vue (frontend) and Django (backend)

#### Quick Start

1. **Understand the package structure**:
   ```bash
   # Frontend packages: packages/{name}-frt/base/
   # Backend packages: packages/{name}-srv/base/
   ```

2. **Create your first package**:
   ```bash
   pnpm create-package my-feature
   
   # This creates:
   # - packages/my-feature-frt/base/  (Vue/TypeScript)
   # - packages/my-feature-srv/base/  (Django/Python)
   ```

3. **Install dependencies after package creation**:
   ```bash
   pnpm install
   ```

4. **Start developing**:
   ```bash
   # Build specific package in watch mode
   pnpm dev --filter=@universo/my-feature-frt
   
   # Run tests
   pnpm test --filter=@universo/my-feature-frt
   ```

5. **Follow the workflow**:
   - Read `.github/instructions/github-issues.md` for creating issues
   - Read `.github/instructions/github-pr.md` for creating PRs
   - Always create bilingual documentation (English + Russian)

#### Key Files to Know

- `packages/{name}-frt/base/src/` - Your Vue components and logic
- `packages/{name}-srv/base/{name}/` - Your Django app
- `packages/{name}-frt/base/README.md` - Package documentation (English)
- `packages/{name}-frt/base/README-RU.md` - Package documentation (Russian)

#### Common Commands

```bash
# Build your package
pnpm build --filter=@universo/my-feature-frt

# Run tests
pnpm test --filter=@universo/my-feature-frt

# Lint code
pnpm lint --filter=@universo/my-feature-frt

# Type check
pnpm type-check --filter=@universo/my-feature-frt
```

---

### 🔧 Platform Maintainer

**Your Focus**: Managing monorepo infrastructure, build optimization, and cross-package operations

#### Quick Start

1. **Understand the workspace structure**:
   ```bash
   # Root configuration
   cat pnpm-workspace.yaml
   cat turbo.json
   cat package.json
   ```

2. **Review shared packages**:
   ```bash
   ls packages/
   # types/      - Shared TypeScript types
   # utils/      - Utility functions
   # i18n/       - Internationalization
   # api-client/ - API client
   # template-vue/ - UI components
   ```

3. **Monitor build performance**:
   ```bash
   # Build all packages
   time pnpm build
   
   # Should complete in <10 minutes
   ```

4. **Manage catalog dependencies**:
   - Edit `pnpm-workspace.yaml` catalog section
   - Update version: change in catalog, run `pnpm update`
   - All packages automatically use new version

#### Key Responsibilities

- **Workspace Management**: Adding/removing packages, updating workspace config
- **Dependency Management**: Updating catalog versions, resolving conflicts
- **Build Optimization**: Configuring Turborepo, optimizing caching
- **CI/CD**: Setting up GitHub Actions (future)
- **Performance Monitoring**: Tracking build times, package sizes

#### Key Files to Know

- `pnpm-workspace.yaml` - Workspace and catalog configuration
- `turbo.json` - Build orchestration
- `package.json` - Root scripts and devDependencies
- `tsconfig.json` - Base TypeScript configuration
- `scripts/create-package.js` - Package scaffolding tool
- `scripts/validate-i18n-docs.js` - Documentation validation

#### Common Commands

```bash
# Build all packages
pnpm build

# Build with cache disabled
pnpm build --force

# Clean all build artifacts
pnpm clean

# Update all dependencies
pnpm update

# Create new package
pnpm create-package <name>

# Validate documentation
pnpm validate:i18n
```

---

### 📝 Documentation Contributor

**Your Focus**: Maintaining bilingual documentation with structural equivalence

#### Quick Start

1. **Understand the i18n documentation pattern**:
   ```
   README.md      - English (primary)
   README-RU.md   - Russian (translated)
   ```

2. **Learn the workflow**:
   - Always update English version first
   - Then update Russian version (identical structure)
   - Validate with script

3. **Read the guidelines**:
   ```bash
   cat .github/instructions/i18n-docs.md
   ```

4. **Validate your changes**:
   ```bash
   pnpm validate:i18n
   ```

#### Key Requirements

- **Identical Structure**: Same number of lines, sections, code blocks
- **Spoiler Format**: In issues/PRs, use `<summary>In Russian</summary>`
- **Translation Quality**: Complete translation, not summary
- **Validation**: Always run validation script before committing

#### Validation Rules

The validation script checks:
- ✓ Same line count
- ✓ Same section headings
- ✓ Same number of code blocks
- ✓ Same number of lists
- ✓ Same link structure

#### Common Tasks

**Updating README**:
```bash
# 1. Edit README.md
vim README.md

# 2. Edit README-RU.md (match structure exactly)
vim README-RU.md

# 3. Validate
pnpm validate:i18n

# 4. If validation passes, commit both files
git add README.md README-RU.md
git commit -m "docs: update README"
```

**Creating Package Documentation**:
```bash
# When scaffolding creates templates, fill them in
# 1. Complete English version
# 2. Translate to Russian
# 3. Validate
pnpm validate:i18n packages/my-feature-frt/
```

---

## Common Workflows

### Creating a New Feature

1. **Create GitHub Issue** (following `.github/instructions/github-issues.md`):
   ```markdown
   # Update User Authentication
   
   Description in English...
   
   <details>
   <summary>In Russian</summary>
   
   Описание на русском...
   
   </details>
   ```

2. **Apply appropriate labels** (see `.github/instructions/github-labels.md`):
   - Type: `type: feature`
   - Area: `area: frontend`, `area: backend`
   - Project: `platformo`

3. **Create feature branch**:
   ```bash
   git checkout -b feature/user-authentication
   ```

4. **Create package**:
   ```bash
   pnpm create-package auth
   pnpm install
   ```

5. **Implement feature**:
   - Frontend: `packages/auth-frt/base/src/`
   - Backend: `packages/auth-srv/base/auth/`

6. **Write tests**:
   ```bash
   # Frontend tests
   packages/auth-frt/base/tests/

   # Backend tests
   packages/auth-srv/base/auth/tests/
   ```

7. **Document your work**:
   - Update README.md (English)
   - Update README-RU.md (Russian)
   - Validate: `pnpm validate:i18n`

8. **Create Pull Request** (following `.github/instructions/github-pr.md`):
   ```markdown
   Fixes #123
   
   ## Description
   
   Implemented user authentication...
   
   ## Changes Made
   
   - Created @universo/auth-frt package
   - Created @universo/auth-srv package
   - Added JWT authentication
   
   ## Additional Work
   
   - Updated documentation
   - Added tests
   
   <details>
   <summary>In Russian</summary>
   
   [Russian translation]
   
   </details>
   ```

### Updating Dependencies

**For Platform Maintainers**:

1. **Update catalog version**:
   ```yaml
   # pnpm-workspace.yaml
   catalog:
     vue: ^3.5.0  # Updated from ^3.4.0
   ```

2. **Update all packages**:
   ```bash
   pnpm update
   ```

3. **Test the update**:
   ```bash
   pnpm build
   pnpm test
   ```

4. **Commit the changes**:
   ```bash
   git add pnpm-workspace.yaml pnpm-lock.yaml
   git commit -m "chore: update Vue to 3.5.0"
   ```

### Fixing Documentation Sync Issues

**For Documentation Contributors**:

If validation fails:

```bash
$ pnpm validate:i18n

✗ Validation failed for 1 documentation pair:

1. README.md ↔ README-RU.md
   ✗ Line count mismatch: 150 (EN) vs 148 (RU)
   ✗ Missing section in RU: "## Contributing"
```

**Fix**:
1. Open both files side by side
2. Find missing sections in Russian version
3. Add translations to match English structure
4. Validate again until it passes

## Project Structure Overview

```
universo-platformo-vue/
├── packages/                 # All packages
│   ├── types/               # @universo/types
│   ├── utils/               # @universo/utils
│   ├── i18n/                # @universo/i18n
│   ├── api-client/          # @universo/api-client
│   ├── template-vue/        # @universo/template-vue
│   └── {feature}-frt/       # Feature packages (frontend)
│       └── base/
│           ├── src/
│           ├── tests/
│           ├── package.json
│           ├── README.md
│           └── README-RU.md
├── scripts/                 # Automation scripts
│   ├── create-package.js    # Package scaffolding
│   └── validate-i18n-docs.js # Documentation validation
├── .github/
│   └── instructions/        # GitHub workflow guidelines
├── .specify/                # Spec Kit framework
├── specs/                   # Feature specifications
├── pnpm-workspace.yaml      # Workspace config
├── turbo.json              # Build orchestration
├── package.json            # Root package
├── README.md               # Project documentation (English)
└── README-RU.md            # Project documentation (Russian)
```

## Best Practices

### Code Style

- **TypeScript**: Use strict mode, avoid `any` types
- **Vue**: Use Composition API, script setup syntax
- **Python**: Follow PEP 8, use type hints
- **Formatting**: Run Prettier/Black before committing

### Testing

- **Unit Tests**: Test business logic in isolation
- **Integration Tests**: Test API endpoints
- **E2E Tests**: Test critical user flows (future)

### Git Commits

Use conventional commit format:
```
feat: add user authentication
fix: resolve login redirect issue
docs: update README with new features
chore: update dependencies
```

### Performance

- Monitor build times (should stay under targets)
- Use Turborepo cache (don't disable unless necessary)
- Keep package sizes reasonable (<100MB)

## Troubleshooting

### Issue: PNPM install fails

**Solution**:
```bash
# Clear PNPM cache
pnpm store prune

# Delete node_modules and reinstall
rm -rf node_modules
pnpm install
```

### Issue: Build fails with type errors

**Solution**:
```bash
# Rebuild shared packages first
pnpm build --filter=@universo/types
pnpm build --filter=@universo/utils

# Then rebuild your package
pnpm build --filter=@universo/my-feature-frt
```

### Issue: Documentation validation fails

**Solution**:
```bash
# Run validation with verbose output
pnpm validate:i18n --verbose

# Check specific file pair
pnpm validate:i18n packages/my-feature-frt/base/README.md
```

## Getting Help

- **Issues**: Create a GitHub issue with bilingual description
- **Questions**: Use GitHub Discussions (when enabled)
- **Documentation**: Check `.github/instructions/` directory
- **Specifications**: Review `specs/` directory for feature specs

## Next Steps

Now that you're set up:

1. **Feature Developers**: Create your first package with `pnpm create-package`
2. **Platform Maintainers**: Review workspace configuration and build pipeline
3. **Documentation Contributors**: Review existing documentation for quality

Welcome to Universo Platformo Vue! 🚀
