# Configuration Files Contract

This document defines the structure and content contracts for all configuration files in the Universo Platformo Vue repository.

## Root Configuration Files

### pnpm-workspace.yaml

**Purpose**: Defines PNPM workspace configuration with package patterns and dependency catalog.

**Location**: `/pnpm-workspace.yaml`

**Structure**:

```yaml
packages:
  # Include all top-level packages
  - 'packages/*'
  # Include all base implementations
  - 'packages/*/base'

catalog:
  # TypeScript toolchain
  typescript: ^5.0.0
  
  # Build tools
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
  
  # Icons
  "@mdi/js": ^7.4.0
  
  # Development tools
  eslint: ^8.55.0
  prettier: ^3.1.0
  
  # Testing
  "@testing-library/vue": ^8.0.0
```

**Validation Rules**:
- Must include at minimum: `packages/*`
- Catalog versions must be valid semver ranges
- All catalog entries must use caret (^) or tilde (~) ranges

---

### turbo.json

**Purpose**: Configures Turborepo build orchestration and caching.

**Location**: `/turbo.json`

**Structure**:

```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": [
    "**/.env.*local"
  ],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", "build/**", ".next/**"],
      "env": ["NODE_ENV"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": ["coverage/**"],
      "cache": true
    },
    "lint": {
      "outputs": []
    },
    "type-check": {
      "dependsOn": ["^build"],
      "outputs": []
    }
  }
}
```

**Key Fields**:
- `pipeline.build.dependsOn`: `["^build"]` ensures dependencies build first
- `pipeline.build.outputs`: Defines what gets cached
- `pipeline.dev.cache`: `false` for watch mode
- `pipeline.test.cache`: `true` for test result caching

---

### package.json (Root)

**Purpose**: Root package.json defining workspace scripts and devDependencies.

**Location**: `/package.json`

**Structure**:

```json
{
  "name": "universo-platformo-vue",
  "version": "0.1.0",
  "private": true,
  "description": "Universo Platformo implementation with Vue and Django",
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "test": "turbo run test",
    "lint": "turbo run lint",
    "type-check": "turbo run type-check",
    "format": "prettier --write \"**/*.{ts,tsx,vue,js,json,md}\"",
    "create-package": "node scripts/create-package.js",
    "validate:i18n": "node scripts/validate-i18n-docs.js",
    "clean": "turbo run clean && rm -rf node_modules"
  },
  "devDependencies": {
    "turbo": "^1.11.0",
    "prettier": "catalog:",
    "eslint": "catalog:",
    "typescript": "catalog:"
  },
  "engines": {
    "node": ">=18.0.0",
    "pnpm": ">=9.0.0"
  },
  "packageManager": "pnpm@9.0.0"
}
```

**Requirements**:
- `private: true` to prevent accidental publishing
- `engines` specifies minimum versions
- `packageManager` pins PNPM version
- All build commands use `turbo run`

---

### tsconfig.json (Root)

**Purpose**: Base TypeScript configuration extended by all packages.

**Location**: `/tsconfig.json`

**Structure**:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    
    "jsx": "preserve",
    "jsxImportSource": "vue"
  },
  "exclude": [
    "node_modules",
    "dist",
    "build",
    "**/*.spec.ts"
  ]
}
```

**Key Settings**:
- `strict: true` enforces strict type checking
- `moduleResolution: "bundler"` for Vite compatibility
- `jsx: "preserve"` for Vue SFC support
- Source maps enabled for debugging

---

### .eslintrc.js

**Purpose**: ESLint configuration for code quality.

**Location**: `/.eslintrc.js`

**Structure**:

```javascript
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
  overrides: [
    {
      files: ['*.spec.ts', '*.test.ts'],
      env: {
        vitest: true,
      },
    },
  ],
};
```

---

### .prettierrc

**Purpose**: Prettier code formatting configuration.

**Location**: `/.prettierrc`

**Structure**:

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "endOfLine": "lf"
}
```

---

### .gitignore

**Purpose**: Specifies files and directories to ignore in version control.

**Location**: `/.gitignore`

**Structure**:

```gitignore
# Dependencies
node_modules/
.pnpm-store/
__pycache__/
*.pyc
*.pyo
*.pyd
.Python
venv/
env/
ENV/

# Build outputs
dist/
build/
.next/
out/
*.egg-info/

# IDE
.vscode/
.idea/
*.swp
*.swo
*~
.DS_Store

# Environment files
.env
.env.local
.env.*.local
*.local

# Testing
coverage/
.nyc_output/
*.log

# Turbo
.turbo/

# Misc
*.tsbuildinfo
.cache/
```

---

## Package Configuration Files

### package.json (Frontend Package)

**Location**: `/packages/{name}-frt/base/package.json`

**Structure**:

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
    "lint": "eslint src",
    "type-check": "tsc --noEmit",
    "clean": "rm -rf dist"
  },
  "dependencies": {
    "vue": "catalog:",
    "@universo/types": "workspace:*",
    "@universo/utils": "workspace:*",
    "@universo/i18n": "workspace:*"
  },
  "devDependencies": {
    "typescript": "catalog:",
    "vite": "catalog:",
    "vitest": "catalog:",
    "eslint": "catalog:",
    "@testing-library/vue": "catalog:"
  }
}
```

**Requirements**:
- `name` must follow `@universo/{name}-frt` pattern
- Use `catalog:` for shared dependencies from workspace catalog
- Use `workspace:*` for internal package dependencies
- Must include build, dev, test, lint, type-check, clean scripts

---

### tsconfig.json (Package)

**Location**: `/packages/{name}-frt/base/tsconfig.json`

**Structure**:

```json
{
  "extends": "../../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "composite": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.spec.ts"]
}
```

**Requirements**:
- Must extend root tsconfig.json
- `composite: true` for project references
- `outDir` and `rootDir` properly configured

---

### vite.config.ts (Package)

**Location**: `/packages/{name}-frt/base/vite.config.ts`

**Structure**:

```typescript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: '{Name}',
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vue', 'vue-router', 'pinia'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
});
```

---

### requirements.txt (Backend Package)

**Location**: `/packages/{name}-srv/base/requirements.txt`

**Structure**:

```txt
Django>=4.2.0,<5.0.0
djangorestframework>=3.14.0
djangorestframework-simplejwt>=5.3.0
pydantic>=2.5.0
pytest>=7.4.0
pytest-django>=4.7.0
black>=23.12.0
flake8>=7.0.0
mypy>=1.8.0
```

---

### setup.py (Backend Package)

**Location**: `/packages/{name}-srv/base/setup.py`

**Structure**:

```python
from setuptools import setup, find_packages

setup(
    name='universo-{name}-srv',
    version='0.1.0',
    packages=find_packages(),
    install_requires=[
        'Django>=4.2.0,<5.0.0',
        'djangorestframework>=3.14.0',
        'djangorestframework-simplejwt>=5.3.0',
        'pydantic>=2.5.0',
    ],
    extras_require={
        'dev': [
            'pytest>=7.4.0',
            'pytest-django>=4.7.0',
            'black>=23.12.0',
            'flake8>=7.0.0',
            'mypy>=1.8.0',
        ],
    },
    python_requires='>=3.10',
)
```

---

## GitHub Configuration

### Issue Template

**Location**: `/.github/ISSUE_TEMPLATE/feature_request.md`

**Structure**:

```markdown
---
name: Feature Request
about: Suggest a new feature for Universo Platformo Vue
title: '[FEATURE] '
labels: 'type: feature'
---

## Description

Brief description of the feature.

## Use Case

Explain the use case and why this feature is needed.

## Proposed Solution

Describe how you envision this feature working.

## Alternatives Considered

What alternative solutions have you considered?

<details>
<summary>In Russian</summary>

## Описание

Краткое описание функционала.

## Сценарий использования

Объясните сценарий использования и почему эта функция нужна.

## Предлагаемое решение

Опишите, как вы представляете работу этой функции.

## Рассмотренные альтернативы

Какие альтернативные решения вы рассматривали?

</details>
```

---

### Pull Request Template

**Location**: `/.github/PULL_REQUEST_TEMPLATE.md`

**Structure**:

```markdown
Fixes #

## Description

Brief description of the changes made in this PR.

## Changes Made

- List of specific changes
- Another change
- Third change

## Additional Work

This section includes supplementary work completed as part of this PR:

- Documentation updates
- Test additions
- Configuration changes
- Any other related improvements

## Testing

- [ ] Manual testing completed
- [ ] Automated tests pass
- [ ] No breaking changes introduced

<details>
<summary>In Russian</summary>

Исправляет #

## Описание

Краткое описание изменений, внесенных в этом PR.

## Внесенные изменения

- Список конкретных изменений
- Другое изменение
- Третье изменение

## Дополнительная работа

Этот раздел включает дополнительную работу, выполненную в рамках данного PR:

- Обновления документации
- Добавление тестов
- Изменения конфигурации
- Любые другие связанные улучшения

## Тестирование

- [ ] Ручное тестирование завершено
- [ ] Автоматические тесты проходят
- [ ] Не внесено критических изменений

</details>
```

---

## Validation Rules

### Configuration File Validation

All configuration files must:
1. Use consistent formatting (Prettier for JSON/YAML)
2. Include comments explaining non-obvious settings
3. Follow schema validation where applicable
4. Be committed to version control
5. Not contain sensitive data (use environment variables)

### Version Constraints

- Catalog dependencies: Use caret ranges (^) for minor version flexibility
- Package dependencies: Use `catalog:` or `workspace:*` protocol
- Minimum versions specified in root package.json engines field

### File Naming

- Configuration files use kebab-case: `vite.config.ts`, `turbo.json`
- Package directories use kebab-case with suffix: `clusters-frt`, `auth-srv`
- TypeScript files use camelCase: `createPackage.ts`
- Python files use snake_case: `create_package.py`

## Notes

- All paths in this document are relative to repository root
- Configuration files should be validated before committing
- Breaking changes to shared configurations require coordination
- Environment-specific settings use `.env` files (not committed)
