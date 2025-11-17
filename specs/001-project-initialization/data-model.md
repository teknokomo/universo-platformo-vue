# Data Model: Universo Platformo Vue Project Initialization

**Date**: 2025-11-17  
**Feature**: 001-project-initialization  
**Phase**: Phase 1 - Design & Contracts

## Overview

This document defines the data entities and their relationships for the Universo Platformo Vue project initialization. Since this is a project setup feature rather than a business feature, the data model focuses on configuration and metadata entities rather than domain entities.

## Core Entities

### 1. Package

Represents a package in the monorepo workspace.

**Fields**:
- `name` (string, required): Scoped package name (e.g., "@universo/clusters-frt")
- `type` (enum, required): "frontend" | "backend" | "shared"
- `category` (enum, required): "feature" | "shared" | "tooling"
- `path` (string, required): Relative path from repository root (e.g., "packages/clusters-frt/base")
- `version` (string, required): Semantic version (e.g., "0.1.0")
- `description` (string, optional): Package description
- `dependencies` (array of strings): List of dependency package names
- `devDependencies` (array of strings): List of dev dependency package names
- `hasDocumentation` (boolean): Whether README.md and README-RU.md exist
- `hasTests` (boolean): Whether test files exist

**Relationships**:
- Has many dependencies (references other Package entities)
- Belongs to a WorkspaceConfiguration

**Validation Rules**:
- `name` must match pattern `@universo/[a-z0-9-]+(-(frt|srv))?`
- `version` must follow semantic versioning (x.y.z)
- `path` must exist in filesystem
- Frontend packages must end with `-frt`
- Backend packages must end with `-srv`
- Shared packages must not have `-frt` or `-srv` suffix

**State Transitions**:
- Created → Scaffolded (package structure created)
- Scaffolded → Initialized (package.json and configs created)
- Initialized → Documented (README files added)
- Documented → Published (added to workspace)

### 2. WorkspaceConfiguration

Represents the PNPM workspace configuration.

**Fields**:
- `rootPath` (string, required): Absolute path to repository root
- `workspacePatterns` (array of strings, required): Workspace glob patterns (e.g., ["packages/*", "packages/*/base"])
- `catalogDependencies` (object, required): Map of dependency names to versions
- `packages` (array): List of Package entities in workspace

**Relationships**:
- Has many Packages

**Validation Rules**:
- `rootPath` must be valid directory
- `workspacePatterns` must include "packages/*"
- `catalogDependencies` must have valid semver versions

### 3. DocumentationPair

Represents a pair of English and Russian documentation files.

**Fields**:
- `englishPath` (string, required): Path to English file (e.g., "README.md")
- `russianPath` (string, required): Path to Russian file (e.g., "README-RU.md")
- `type` (enum, required): "readme" | "guide" | "specification" | "api"
- `lineCount` (number): Number of lines in both files (must match)
- `lastValidated` (datetime, optional): When validation last ran
- `isValid` (boolean): Whether files are in sync

**Validation Rules**:
- Both files must exist
- Both files must have same line count
- Both files must have same section structure
- Russian path must follow pattern: `{basename}-RU.{ext}`

### 4. GitHubLabel

Represents a GitHub repository label.

**Fields**:
- `name` (string, required): Label name (e.g., "type: feature")
- `color` (string, required): Hex color code (e.g., "#0E8A16")
- `description` (string, optional): Label description
- `category` (enum, optional): "type" | "area" | "priority" | "project"

**Validation Rules**:
- `name` must be unique
- `color` must be valid hex color code (#RRGGBB)
- `name` must not contain newlines or special characters

### 5. SharedPackageDefinition

Represents the definition of a shared package to be created.

**Fields**:
- `name` (string, required): Package name without scope (e.g., "types")
- `scopedName` (string, required): Full scoped name (e.g., "@universo/types")
- `description` (string, required): Package description
- `exports` (array of strings): List of exported modules/types
- `dependencies` (array of strings): Required dependencies
- `templateType` (enum, required): "types" | "utils" | "i18n" | "api-client" | "template-vue"

**Relationships**:
- Is a type of Package

**Validation Rules**:
- `name` must match `scopedName` pattern
- `templateType` must be one of the predefined templates

## Entity Relationships Diagram

```
WorkspaceConfiguration
    ├─── has many ──→ Package
    │                    ├─── depends on ──→ Package (dependencies)
    │                    └─── documented by ──→ DocumentationPair
    └─── configures ──→ CatalogDependencies

SharedPackageDefinition
    └─── is a type of ──→ Package

GitHubLabel
    (independent, used for repository metadata)
```

## Data Flow

### Package Creation Flow

1. Developer runs `pnpm create-package <name>`
2. Script validates name against PackageSchema
3. Script checks if Package with same name exists
4. Script creates Package entity with status "Created"
5. Script scaffolds directory structure
6. Package status → "Scaffolded"
7. Script generates package.json and configs
8. Package status → "Initialized"
9. Script creates DocumentationPair (README files)
10. Package status → "Documented"
11. Script updates WorkspaceConfiguration
12. Package status → "Published"

### Documentation Validation Flow

1. Script scans repository for *.md files
2. For each file, check if *-RU.md pair exists
3. Create DocumentationPair entity for each pair
4. Compare line counts between English and Russian
5. Parse and compare section structures
6. Set `isValid` field based on comparison
7. Report validation results

## Configuration Files as Data

### pnpm-workspace.yaml

```yaml
# WorkspaceConfiguration entity serialized to YAML
packages:
  - 'packages/*'
  - 'packages/*/base'

catalog:
  # catalogDependencies as key-value pairs
  vue: ^3.4.0
  typescript: ^5.0.0
  # ... more dependencies
```

### turbo.json

```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", "build/**"]
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": ["coverage/**"]
    },
    "lint": {}
  }
}
```

### package.json (shared package template)

```json
{
  "name": "@universo/{name}",
  "version": "0.1.0",
  "description": "{description}",
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
  "dependencies": {},
  "devDependencies": {
    "typescript": "catalog:",
    "vite": "catalog:",
    "vitest": "catalog:"
  }
}
```

## Schema Definitions (TypeScript)

```typescript
// Core entity types

export interface Package {
  name: string;
  type: 'frontend' | 'backend' | 'shared';
  category: 'feature' | 'shared' | 'tooling';
  path: string;
  version: string;
  description?: string;
  dependencies: string[];
  devDependencies: string[];
  hasDocumentation: boolean;
  hasTests: boolean;
}

export interface WorkspaceConfiguration {
  rootPath: string;
  workspacePatterns: string[];
  catalogDependencies: Record<string, string>;
  packages: Package[];
}

export interface DocumentationPair {
  englishPath: string;
  russianPath: string;
  type: 'readme' | 'guide' | 'specification' | 'api';
  lineCount: number;
  lastValidated?: Date;
  isValid: boolean;
}

export interface GitHubLabel {
  name: string;
  color: string;
  description?: string;
  category?: 'type' | 'area' | 'priority' | 'project';
}

export interface SharedPackageDefinition {
  name: string;
  scopedName: string;
  description: string;
  exports: string[];
  dependencies: string[];
  templateType: 'types' | 'utils' | 'i18n' | 'api-client' | 'template-vue';
}
```

## Validation Schemas (Zod)

```typescript
import { z } from 'zod';

export const PackageSchema = z.object({
  name: z.string()
    .regex(/^@universo\/[a-z0-9-]+(-(frt|srv))?$/, 
           'Package name must match @universo/{name}[-frt|-srv] pattern'),
  type: z.enum(['frontend', 'backend', 'shared']),
  category: z.enum(['feature', 'shared', 'tooling']),
  path: z.string(),
  version: z.string().regex(/^\d+\.\d+\.\d+$/, 'Must be valid semver'),
  description: z.string().optional(),
  dependencies: z.array(z.string()),
  devDependencies: z.array(z.string()),
  hasDocumentation: z.boolean(),
  hasTests: z.boolean(),
});

export const WorkspaceConfigurationSchema = z.object({
  rootPath: z.string(),
  workspacePatterns: z.array(z.string()).min(1),
  catalogDependencies: z.record(z.string()),
  packages: z.array(PackageSchema),
});

export const DocumentationPairSchema = z.object({
  englishPath: z.string(),
  russianPath: z.string(),
  type: z.enum(['readme', 'guide', 'specification', 'api']),
  lineCount: z.number().int().positive(),
  lastValidated: z.date().optional(),
  isValid: z.boolean(),
});

export const GitHubLabelSchema = z.object({
  name: z.string().min(1),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Must be valid hex color'),
  description: z.string().optional(),
  category: z.enum(['type', 'area', 'priority', 'project']).optional(),
});
```

## Notes

This data model is specific to the project initialization phase. It defines configuration and metadata entities rather than business domain entities. As features are implemented (e.g., Clusters, Metaverses), additional data models will be created for those specific domains.

The entities defined here primarily exist as:
- Configuration files (YAML, JSON)
- In-memory structures during script execution
- GitHub repository metadata (labels, issues)

No database storage is required for these entities as they represent the project structure itself rather than runtime application data.
