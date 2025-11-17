# Architecture Patterns Enhancement

**Date**: 2025-11-17  
**Purpose**: Document additional architectural patterns from universo-platformo-react that should be incorporated into universo-platformo-vue plans  
**Status**: Enhancement Recommendations

## Executive Summary

This document identifies architectural patterns, concepts, and best practices from the universo-platformo-react repository that are not yet fully documented in the current universo-platformo-vue plans. These patterns should be incorporated to ensure the Vue implementation maintains conceptual parity with the proven React architecture while adapting to Vue/Django best practices.

## Analysis Methodology

1. Deep examination of universo-platformo-react repository structure (35+ packages)
2. Comparison with existing constitution (v1.2.0), specifications, and plans
3. Identification of gaps and missing patterns
4. Evaluation of applicability to Vue/Django stack
5. Recommendations for integration into planning documents

## Patterns Already Well-Covered

The following patterns from the React repository are already documented in the constitution v1.2.0:

✅ **Monorepo with PNPM and Catalog Dependencies** (Principle I)
✅ **Build Orchestration with Turbo** (Principle XII)  
✅ **Centralized Shared Packages** (Principle XI)
✅ **i18n Architecture with Namespace Registration** (Principle X)
✅ **Entity Patterns (UUID, timestamps)** (Principle III)
✅ **Package Lifecycle Management** (Principle IX)
✅ **Bilingual Documentation** (Principle V)
✅ **Issue-Driven Development** (Principle VI)

## Patterns Requiring Enhancement or Documentation

### 1. Frontend Package Internal Structure Pattern

**Current Status**: Not explicitly documented  
**React Implementation**: Clear folder structure within packages

**Pattern from React**:
```
packages/{feature}-frt/base/src/
├── api/              # API client methods for this feature
├── hooks/            # React hooks (Vue composables)
├── i18n/             # Translations
│   └── locales/
│       ├── en/       # English translations
│       └── ru/       # Russian translations
├── menu-items/       # Navigation menu configuration
├── pages/            # Page components
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
├── __mocks__/        # Test mocks (optional)
└── index.ts          # Public exports
```

**Adaptation for Vue**:
```
packages/{feature}-frt/base/src/
├── api/              # API client methods for this feature
├── composables/      # Vue composables (like React hooks)
├── i18n/             # Translations
│   └── locales/
│       ├── en/       # English translations
│       └── ru/       # Russian translations
├── components/       # Vue components
├── pages/            # Page/view components
├── router/           # Route definitions (optional, may be in menu-items)
├── menu-items/       # Navigation menu configuration
├── stores/           # Pinia stores for feature state
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
├── __tests__/        # Test files (optional)
└── index.ts          # Public exports
```

**Recommendation**: Add this pattern to data-model.md or create a new "Package Structure Guide" document that shows the canonical directory layout for frontend packages.

### 2. Backend Package Internal Structure Pattern

**Current Status**: Not explicitly documented  
**React Implementation**: Express-based structure with TypeORM

**Pattern from React**:
```
packages/{feature}-srv/base/src/
├── database/         # TypeORM entities and migrations
│   ├── entities/
│   └── migrations/
├── routes/           # Express route handlers
├── schemas/          # Validation schemas (Zod)
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
├── tests/            # Test files
└── index.ts          # Public exports (routes, entities)
```

**Adaptation for Django**:
```
packages/{feature}-srv/base/
├── {feature}/        # Django app directory
│   ├── __init__.py
│   ├── models.py     # Django ORM models (entities)
│   ├── serializers.py # DRF serializers
│   ├── views.py      # DRF ViewSets and APIViews
│   ├── urls.py       # URL routing
│   ├── admin.py      # Django admin configuration
│   ├── permissions.py # Custom permissions
│   ├── filters.py    # Query filters
│   ├── migrations/   # Django migrations
│   │   └── __init__.py
│   ├── tests/        # Test files
│   │   ├── __init__.py
│   │   ├── test_models.py
│   │   ├── test_views.py
│   │   └── test_serializers.py
│   └── utils.py      # Utility functions
├── requirements.txt  # Python dependencies
├── pyproject.toml    # Poetry configuration (optional)
└── README.md         # Package documentation
```

**Recommendation**: Document Django app structure pattern explicitly, noting the differences from Express/TypeORM but maintaining conceptual equivalence (models=entities, serializers=schemas, views=routes).

### 3. Three-Tier Entity Hierarchy Pattern

**Current Status**: Mentioned in ARCHITECTURE_ANALYSIS.md but not formalized in specifications  
**React Implementation**: Consistent pattern across multiple features

**Pattern**:
Most features follow a three-level hierarchy with clear parent-child relationships:

**Clusters Domain**:
- Cluster (top-level container)
  - Domain (middle-level organizational unit)
    - Resource (individual items)

**Metaverses Domain**:
- Metaverse (top-level world)
  - Section (middle-level area)
    - Entity (individual objects)

**Projects Domain**:
- Project (top-level container)
  - Workflow (middle-level process)
    - Node (individual steps)

**Spaces Domain**:
- Space (top-level environment)
  - Canvas (middle-level workspace)
    - Node (graph elements)

**Common Characteristics**:
- Top level: Access control, ownership, billing context
- Middle level: Logical grouping, categorization
- Bottom level: Actual content/functionality

**Relationship Patterns**:
- One-to-Many: Parent → Children
- Many-to-Many: Users → Top-level entities (with roles via junction table)
- Optional: Bottom-level entities may reference external resources

**Recommendation**: 
1. Add "Three-Tier Entity Pattern" section to data-model.md
2. Document when to use 2-tier vs 3-tier vs more levels
3. Provide decision matrix for entity hierarchy design
4. Include examples adapted to Django models with proper foreign keys

### 4. Menu Items Registration Pattern

**Current Status**: Not documented  
**React Implementation**: Each package exports menu configuration

**Pattern from React**:
```typescript
// packages/clusters-frt/base/src/menu-items/index.tsx
export const clustersMenuItem = {
  id: 'clusters',
  title: 'clusters.navigation.title', // i18n key
  type: 'group',
  icon: AccountTreeIcon,
  children: [
    {
      id: 'clusters-list',
      title: 'clusters.navigation.list',
      type: 'item',
      url: '/clusters',
      icon: ListIcon,
    },
    {
      id: 'clusters-create',
      title: 'clusters.navigation.create',
      type: 'item',
      url: '/clusters/create',
      icon: AddIcon,
    }
  ]
}
```

**Adaptation for Vue with Vue Router**:
```typescript
// packages/clusters-frt/base/src/menu-items/index.ts
import type { MenuItemConfig } from '@universo/template-vue'

export const clustersMenuItem: MenuItemConfig = {
  id: 'clusters',
  title: 'clusters.navigation.title', // i18n key
  type: 'group',
  icon: 'mdi-file-tree', // MDI icon
  children: [
    {
      id: 'clusters-list',
      title: 'clusters.navigation.list',
      type: 'item',
      url: '/clusters',
      icon: 'mdi-format-list-bulleted',
    },
    {
      id: 'clusters-create',
      title: 'clusters.navigation.create',
      type: 'item',
      url: '/clusters/create',
      icon: 'mdi-plus',
    }
  ]
}
```

**Integration**:
Each feature package registers its menu items with the main application during initialization.

**Recommendation**: 
1. Add menu items pattern to quickstart.md
2. Document how @universo/template-vue aggregates menu items
3. Include type definitions for menu configuration

### 5. API Client Structure with Query Keys

**Current Status**: Partially documented in research.md  
**React Implementation**: Resource-based API classes with TanStack Query integration

**Pattern from React**:
```typescript
// Hierarchical query keys factory
export const clusterQueryKeys = {
  all: ['clusters'] as const,
  lists: () => [...clusterQueryKeys.all, 'list'] as const,
  list: (filters: ClusterFilters) => [...clusterQueryKeys.lists(), filters] as const,
  details: () => [...clusterQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...clusterQueryKeys.details(), id] as const,
  domains: (clusterId: string) => [...clusterQueryKeys.detail(clusterId), 'domains'] as const,
}

// API client methods
export class ClustersApi {
  // GET /clusters
  async getClusters(filters?: ClusterFilters): Promise<ClusterListResponse> { ... }
  
  // GET /clusters/:id
  async getCluster(id: string): Promise<Cluster> { ... }
  
  // POST /clusters
  async createCluster(data: CreateClusterData): Promise<Cluster> { ... }
  
  // PATCH /clusters/:id
  async updateCluster(id: string, data: UpdateClusterData): Promise<Cluster> { ... }
  
  // DELETE /clusters/:id
  async deleteCluster(id: string): Promise<void> { ... }
  
  // GET /clusters/:id/domains
  async getClusterDomains(clusterId: string): Promise<Domain[]> { ... }
}
```

**Query Hooks Usage** (for Vue, similar pattern):
```typescript
// Vue composable using @tanstack/vue-query
import { useQuery, useMutation } from '@tanstack/vue-query'

export function useClusters(filters?: Ref<ClusterFilters>) {
  return useQuery({
    queryKey: computed(() => clusterQueryKeys.list(filters?.value || {})),
    queryFn: () => clustersApi.getClusters(filters?.value),
  })
}

export function useCluster(id: Ref<string>) {
  return useQuery({
    queryKey: computed(() => clusterQueryKeys.detail(id.value)),
    queryFn: () => clustersApi.getCluster(id.value),
  })
}
```

**Benefits**:
- Type-safe cache keys
- Hierarchical cache invalidation
- Consistent patterns across all resources
- Easy to test and mock

**Recommendation**:
1. Expand API client section in research.md with query keys pattern
2. Add examples to contracts/api-contracts.md
3. Document relationship between query keys hierarchy and resource relationships

### 6. Explicit Junction Tables for Many-to-Many Relationships

**Current Status**: Mentioned in ARCHITECTURE_ANALYSIS.md  
**React Implementation**: All many-to-many relationships use explicit junction entities

**Pattern from React** (TypeORM):
```typescript
@Entity({ name: 'cluster_users', schema: 'clusters' })
export class ClusterUser {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ name: 'cluster_id' })
  clusterId!: string

  @Column({ name: 'user_id' })
  userId!: string

  @Column()
  role!: string // 'admin' | 'editor' | 'viewer'

  @Column({ type: 'text', nullable: true })
  comment?: string // Why this user has access

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date

  // Relationships
  @ManyToOne(() => Cluster, cluster => cluster.clusterUsers)
  @JoinColumn({ name: 'cluster_id' })
  cluster!: Cluster

  @ManyToOne(() => User, user => user.clusterUsers)
  @JoinColumn({ name: 'user_id' })
  user!: User
}
```

**Adaptation for Django**:
```python
class ClusterUser(models.Model):
    """
    Junction table for Cluster-User many-to-many relationship.
    Explicit model allows storing additional metadata like role and comment.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    cluster = models.ForeignKey(
        'Cluster',
        on_delete=models.CASCADE,
        related_name='cluster_users',
        db_column='cluster_id'
    )
    user = models.ForeignKey(
        'auth.User',  # or custom User model
        on_delete=models.CASCADE,
        related_name='cluster_users',
        db_column='user_id'
    )
    role = models.CharField(
        max_length=20,
        choices=[
            ('admin', 'Admin'),
            ('editor', 'Editor'),
            ('viewer', 'Viewer'),
        ]
    )
    comment = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'cluster_users'
        db_table_comment = 'clusters'  # Schema-like grouping via comment
        unique_together = [('cluster', 'user')]
        indexes = [
            models.Index(fields=['cluster', 'role']),
            models.Index(fields=['user']),
        ]
```

**Why Not Django's Through Table**:
While Django supports through tables in ManyToManyField, explicitly defining the model provides:
- Better visibility and control
- Easier to add business logic methods
- More obvious in codebase
- Consistent with other entity patterns

**Recommendation**:
1. Add explicit section in data-model.md: "Junction Table Pattern"
2. Document when to use explicit junction vs. Django's through tables
3. Provide decision criteria and examples

### 7. Package Naming Consistency

**Current Status**: Documented in constitution  
**React Implementation**: Inconsistency discovered that should be avoided

**Observation**:
In the React repository, shared packages have inconsistent naming:
- ✅ `universo-types` (correct)
- ✅ `universo-utils` (correct)
- ✅ `universo-i18n` (correct)
- ✅ `universo-api-client` (correct)
- ✅ `universo-template-mui` (correct)
- ✅ `universo-rest-docs` (correct)
- ❌ `updl` (should be `universo-updl` for consistency)

**Recommendation**:
1. In Vue implementation, ensure ALL shared packages use `universo-` prefix
2. Document this explicitly in constitution: "Shared packages MUST use universo- prefix"
3. Add to package scaffolding script validation

### 8. Legacy Code Identification Strategy

**Current Status**: Mentioned in constitution (Principle VII) but not operationalized  
**React Repository Reality**: Contains significant legacy Flowise code

**Legacy Packages Identified**:
- flowise-ui
- flowise-server
- flowise-components
- flowise-chatmessage
- flowise-store
- flowise-template-mui

These packages:
- Come from the original Flowise project
- Are being gradually replaced/rewritten
- Should NOT be used as reference patterns
- Represent technical debt to avoid in Vue implementation

**Recommendation**:
1. Create a "Legacy Code Identification Guide" in research.md
2. List which React packages are mature vs. legacy
3. Document criteria for identifying legacy code:
   - Comments indicating "from Flowise" or "legacy"
   - Older coding patterns
   - Missing TypeScript types
   - Inconsistent with constitution patterns
4. Add explicit warnings in quickstart.md about which patterns to avoid

### 9. Shared Package Dependency Graph

**Current Status**: Shared packages listed but dependencies not mapped  
**React Implementation**: Clear dependency hierarchy

**Dependency Structure from React**:
```
universo-types (no dependencies on other universo packages)
    ↓
universo-utils (depends on: universo-types)
    ↓
universo-i18n (depends on: universo-types)
    ↓
universo-api-client (depends on: universo-types, universo-utils)
    ↓
universo-template-mui (depends on: all above)
```

**Principles**:
- Types package has zero internal dependencies (only external like TypeScript)
- Utils can depend on types but nothing else
- i18n is independent (only depends on types)
- API client depends on types and utils
- Template package depends on everything (is the top of the hierarchy)

**Benefits**:
- Prevents circular dependencies
- Clear build order
- Easier to test in isolation
- Simpler to understand and maintain

**Recommendation**:
1. Add "Shared Package Dependency Rules" section to plan.md
2. Document the hierarchy and rationale
3. Include dependency graph diagram
4. Add validation in build process to prevent violations

### 10. Configuration File Patterns

**Current Status**: Some files mentioned but not comprehensive  
**React Implementation**: Consistent configuration across packages

**Standard Files in Each Frontend Package**:
```
package.json         # Dependencies, scripts, exports
tsconfig.json        # TypeScript configuration (extends root)
tsdown.config.ts     # Build configuration (for library packages)
vite.config.ts       # Vite config (for application packages)
vitest.config.ts     # Test configuration
setupTests.ts        # Test setup and global mocks
.eslintrc.js         # Linting rules (extends root)
```

**Standard Files in Each Backend Package**:
```
package.json         # Dependencies, scripts
tsconfig.json        # TypeScript configuration (extends root)
jest.config.js       # Test configuration
```

**Adaptation for Vue/Django**:
**Frontend**:
```
package.json         # Dependencies, scripts, exports
tsconfig.json        # TypeScript configuration (extends root)
vite.config.ts       # Vite config (production build)
vitest.config.ts     # Test configuration
setupTests.ts        # Test setup
```

**Backend (Django)**:
```
requirements.txt     # Python dependencies
pyproject.toml       # Poetry config (optional)
pytest.ini           # Pytest configuration
.coveragerc          # Coverage configuration
setup.cfg            # Flake8, mypy configs
```

**Recommendation**:
1. Create "Package Configuration Standards" document
2. Provide templates for each file type
3. Document what extends root vs. package-specific
4. Include in scaffolding script

### 11. Testing Structure and Patterns

**Current Status**: Testing mentioned but patterns not detailed  
**React Implementation**: Consistent test organization

**Frontend Testing Pattern (React)**:
```typescript
// __tests__/ClustersList.test.tsx
import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ClustersList } from '../pages/ClustersList'

describe('ClustersList', () => {
  it('renders clusters list', async () => {
    const queryClient = new QueryClient()
    render(
      <QueryClientProvider client={queryClient}>
        <ClustersList />
      </QueryClientProvider>
    )
    await waitFor(() => {
      expect(screen.getByText('Clusters')).toBeInTheDocument()
    })
  })
})
```

**Adaptation for Vue**:
```typescript
// __tests__/ClustersList.test.ts
import { mount } from '@vue/test-utils'
import { VueQueryPlugin } from '@tanstack/vue-query'
import ClustersList from '../pages/ClustersList.vue'

describe('ClustersList', () => {
  it('renders clusters list', async () => {
    const wrapper = mount(ClustersList, {
      global: {
        plugins: [VueQueryPlugin],
      },
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('Clusters')
  })
})
```

**Backend Testing Pattern (Express)**:
```typescript
// src/tests/clusters.test.ts
import request from 'supertest'
import app from '../index'

describe('Clusters API', () => {
  it('GET /clusters returns list', async () => {
    const response = await request(app)
      .get('/api/clusters')
      .expect(200)
    expect(response.body).toHaveProperty('results')
  })
})
```

**Adaptation for Django**:
```python
# tests/test_views.py
import pytest
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

@pytest.mark.django_db
class TestClustersAPI:
    def test_list_clusters(self):
        client = APIClient()
        url = reverse('cluster-list')
        response = client.get(url)
        assert response.status_code == status.HTTP_200_OK
        assert 'results' in response.data
```

**Recommendation**:
1. Add "Testing Standards" section to quickstart.md
2. Document testing patterns for Vue components, composables, API clients
3. Document Django testing patterns for models, serializers, views
4. Include test setup and fixture patterns

### 12. Environment Variables and Configuration Management

**Current Status**: Mentioned in security requirements but pattern not detailed  
**React Implementation**: Consistent .env pattern

**Pattern from React**:
```
# Root .env.example
DATABASE_URL=postgresql://user:pass@localhost:5432/universo
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=xxx
JWT_SECRET=xxx
PORT=3000

# Package-specific might override
# packages/auth-srv/base/.env.example
JWT_ACCESS_EXPIRATION=30m
JWT_REFRESH_EXPIRATION=7d
```

**Best Practices**:
- .env.example in root (committed)
- .env (gitignored, developer-specific)
- Production uses environment variables (not .env files)
- Validation on startup (fail fast if required vars missing)

**Django Adaptation**:
```python
# settings.py
import environ

env = environ.Env(
    DEBUG=(bool, False),
    ALLOWED_HOSTS=(list, ['localhost']),
)

# Read .env file
environ.Env.read_env()

DATABASE_URL = env('DATABASE_URL')
SECRET_KEY = env('SECRET_KEY')
SUPABASE_URL = env('SUPABASE_URL')
```

**Recommendation**:
1. Document environment variable naming conventions
2. Provide .env.example template
3. Document validation approach for required variables
4. Include in quickstart.md setup instructions

### 13. Migration Management Patterns

**Current Status**: Mentioned but strategy not detailed  
**React Implementation**: TypeORM migrations with timestamps

**Pattern from React** (TypeORM):
```typescript
// packages/clusters-srv/base/src/database/migrations/1234567890123-CreateClusters.ts
export class CreateClusters1234567890123 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'clusters',
            schema: 'clusters',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: '255',
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()',
                },
            ],
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('clusters.clusters')
    }
}
```

**Django Adaptation**:
```python
# packages/clusters-srv/base/clusters/migrations/0001_initial.py
from django.db import migrations, models
import uuid

class Migration(migrations.Migration):
    initial = True
    
    dependencies = []
    
    operations = [
        migrations.CreateModel(
            name='Cluster',
            fields=[
                ('id', models.UUIDField(
                    primary_key=True,
                    default=uuid.uuid4,
                    editable=False
                )),
                ('name', models.CharField(max_length=255)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'db_table': 'clusters',
                'db_table_comment': 'clusters',  # Schema-like grouping
            },
        ),
    ]
```

**Migration Strategy**:
- One migration per logical change
- Always provide both up and down (forward/backward)
- Test migrations on copy of production data
- Coordinate migrations across packages (dependencies)
- Document breaking migrations prominently

**Recommendation**:
1. Add "Migration Management" section to data-model.md
2. Document Django migration best practices
3. Include guidance on coordinating migrations across packages
4. Document testing procedures for migrations

### 14. REST API Documentation Generation

**Current Status**: Not documented  
**React Implementation**: universo-rest-docs package

**Purpose**: Auto-generate API documentation from backend code

**React Approach**: Custom documentation generation from TypeORM entities and Express routes

**Django Adaptation Options**:
1. **drf-spectacular** (recommended): Auto-generates OpenAPI 3.0 schema from DRF serializers and viewsets
2. **drf-yasg**: Alternative OpenAPI generator
3. **Django REST Swagger**: Older, less maintained

**Recommended Approach** (drf-spectacular):
```python
# settings.py
INSTALLED_APPS = [
    ...
    'drf_spectacular',
]

REST_FRAMEWORK = {
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
}

SPECTACULAR_SETTINGS = {
    'TITLE': 'Universo Platformo API',
    'VERSION': '1.0.0',
    'SERVE_INCLUDE_SCHEMA': False,
}

# urls.py
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
]
```

**Benefits**:
- Auto-generated, always in sync with code
- Interactive API explorer (Swagger UI)
- Type-safe contracts for frontend
- Can export OpenAPI JSON for code generation

**Recommendation**:
1. Add "API Documentation" section to research.md
2. Document drf-spectacular setup
3. Include in backend package template
4. Document how frontend consumes OpenAPI spec

### 15. Package README Template Structure

**Current Status**: Template mentioned but structure not defined  
**React Implementation**: Consistent README structure across all packages

**Standard README Structure from React**:
```markdown
# @universo/{package-name}

Brief description of package purpose.

## Overview

Detailed description of what this package does and when to use it.

## Installation

```bash
pnpm add @universo/{package-name}
```

## Usage

Basic usage examples.

## API Reference

Key exports and their purpose.

## Development

How to develop and test this package.

## Dependencies

List of key dependencies and why they're used.

## Architecture

Brief architectural notes specific to this package.

## Contributing

Guidelines for contributing to this package.

## License

MIT
```

**Bilingual Requirement**: Each section must be mirrored in README-RU.md

**Recommendation**:
1. Create formal README template in packages/TEMPLATE-README.md
2. Create formal README-RU template in packages/TEMPLATE-README-RU.md
3. Document template usage in package scaffolding
4. Include template in scaffolding script

### 16. Build Output Patterns

**Current Status**: Output directories mentioned in turbo.json but not formalized  
**React Implementation**: Consistent build outputs

**Frontend Package Outputs**:
```
packages/{name}-frt/base/
└── dist/           # Build output
    ├── index.js    # Main entry
    ├── index.d.ts  # Type declarations
    └── ...
```

**Backend Package Outputs**:
```
packages/{name}-srv/base/
└── dist/           # Compiled TypeScript
    ├── index.js
    ├── routes/
    └── ...
```

**Gitignore Pattern**:
```
# Build outputs
dist/
build/
*.tsbuildinfo

# Python
__pycache__/
*.pyc
.pytest_cache/
.coverage
htmlcov/

# Environment
.env
.env.local
```

**Turbo Cache Outputs**:
```json
{
  "pipeline": {
    "build": {
      "outputs": ["dist/**", "build/**"]
    }
  }
}
```

**Recommendation**:
1. Document standard output directories
2. Update .gitignore template in repository
3. Ensure turbo.json includes all output patterns
4. Document in package scaffolding

### 17. Error Handling Patterns

**Current Status**: Error handling mentioned in security requirements  
**React Implementation**: Consistent error response format

**API Error Response Pattern** (React/Express):
```typescript
interface ErrorResponse {
  error: {
    code: string,       // Machine-readable error code
    message: string,    // Human-readable message
    details?: any,      // Additional context
    field?: string,     // Field that caused error (validation)
  }
}

// Example:
{
  "error": {
    "code": "CLUSTER_NOT_FOUND",
    "message": "Cluster with ID '123' does not exist",
    "details": {
      "clusterId": "123"
    }
  }
}
```

**Django Adaptation**:
```python
# utils/exceptions.py
from rest_framework.views import exception_handler
from rest_framework.response import Response

def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)
    
    if response is not None:
        custom_response = {
            'error': {
                'code': getattr(exc, 'default_code', 'ERROR'),
                'message': str(exc),
                'details': response.data if hasattr(exc, 'detail') else None,
            }
        }
        response.data = custom_response
    
    return response

# settings.py
REST_FRAMEWORK = {
    'EXCEPTION_HANDLER': 'utils.exceptions.custom_exception_handler'
}
```

**Recommendation**:
1. Add "Error Handling Standards" to research.md
2. Document standard error codes and formats
3. Provide Django exception handler template
4. Include in API contracts documentation

### 18. Internationalization Key Naming Convention

**Current Status**: i18n architecture documented but key conventions not formalized  
**React Implementation**: Consistent dot notation hierarchy

**Key Naming Pattern**:
```
{namespace}.{section}.{subsection}.{key}

Examples:
clusters.navigation.title           → "Clusters"
clusters.navigation.list            → "All Clusters"
clusters.form.name.label            → "Cluster Name"
clusters.form.name.placeholder      → "Enter cluster name"
clusters.form.name.error.required   → "Cluster name is required"
clusters.members.title              → "Access"
clusters.members.inviteMember       → "Invite Member"
clusters.members.roles.admin        → "Admin"
clusters.messages.created           → "Cluster created successfully"
clusters.messages.createError       → "Failed to create cluster"
```

**Conventions**:
- Use camelCase for last segment (key)
- Use dot notation for hierarchy
- Common sections:
  - `navigation.*` - Menu items
  - `form.{field}.*` - Form fields
  - `messages.*` - Success/error messages
  - `actions.*` - Button labels
  - `table.columns.*` - Table headers
  - `validation.*` - Validation messages

**Pluralization**:
```json
{
  "clusters": {
    "items": {
      "count_one": "{{count}} cluster",
      "count_other": "{{count}} clusters"
    }
  }
}
```

**Recommendation**:
1. Add "Translation Key Naming Conventions" section to research.md
2. Document standard sections and patterns
3. Provide examples for common UI patterns
4. Include in i18n package documentation

## Summary of Enhancements Required

### High Priority (Critical for Initial Implementation)

1. **Package Internal Structure Patterns** (Frontend and Backend)
   - Location: Create new document or expand data-model.md
   - Rationale: Developers need this immediately when creating packages

2. **Three-Tier Entity Hierarchy Pattern**
   - Location: data-model.md
   - Rationale: Core architectural pattern affecting all feature design

3. **Explicit Junction Table Pattern**
   - Location: data-model.md
   - Rationale: Affects database design decisions

4. **Legacy Code Identification Guide**
   - Location: research.md
   - Rationale: Prevents copying bad patterns from React repo

5. **Shared Package Dependency Rules**
   - Location: plan.md
   - Rationale: Prevents circular dependencies and build issues

### Medium Priority (Important for Quality and Consistency)

6. **Menu Items Registration Pattern**
   - Location: quickstart.md

7. **API Client Query Keys Pattern**
   - Location: research.md and contracts/

8. **Configuration File Standards**
   - Location: Create Package Configuration Standards document

9. **Testing Patterns** (Vue and Django)
   - Location: quickstart.md

10. **Environment Variables Management**
    - Location: quickstart.md

### Lower Priority (Nice to Have, Can Be Added Later)

11. **Migration Management Strategy**
    - Location: data-model.md

12. **REST API Documentation Generation**
    - Location: research.md

13. **Package README Template**
    - Location: packages/TEMPLATE-README.md

14. **Build Output Patterns**
    - Location: plan.md or quickstart.md

15. **Error Handling Standards**
    - Location: research.md

16. **Translation Key Naming Conventions**
    - Location: research.md

## Implementation Roadmap

### Phase 1: Critical Enhancements (Do Now)
1. Update data-model.md with package structure patterns
2. Add three-tier entity hierarchy section
3. Document explicit junction tables
4. Create legacy code identification guide in research.md
5. Add shared package dependency rules to plan.md

### Phase 2: Quality Enhancements (Before Implementation Starts)
6. Document menu items pattern in quickstart.md
7. Expand API client section in research.md
8. Create package configuration standards document
9. Add testing patterns to quickstart.md
10. Document environment variables in quickstart.md

### Phase 3: Polish Enhancements (Can Be Added During Implementation)
11. Add migration management to data-model.md
12. Document REST API docs generation in research.md
13. Create README templates
14. Document build outputs
15. Add error handling standards
16. Document translation key conventions

## Conclusion

The existing constitution (v1.2.0) and specifications already cover the major architectural principles from the universo-platformo-react repository. However, there are specific implementation patterns, internal package structures, and conventions that need to be documented to ensure developers have concrete guidance when building the Vue/Django implementation.

The enhancements recommended in this document will:
1. Provide concrete examples developers can follow
2. Prevent copying legacy code patterns from React repo
3. Ensure consistency across all packages
4. Make the Vue implementation genuinely best-in-class rather than a direct port
5. Establish clear conventions that scale as the project grows

All patterns should be adapted to Vue/Django best practices rather than blindly copying React/Express patterns.
