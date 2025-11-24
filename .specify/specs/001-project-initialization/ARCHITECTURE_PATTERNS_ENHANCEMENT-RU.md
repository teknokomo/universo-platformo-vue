# Улучшение архитектурных паттернов

**Дата**: 2025-11-17  
**Цель**: Документировать дополнительные архитектурные паттерны из universo-platformo-react, которые должны быть включены в планы universo-platformo-vue  
**Статус**: Рекомендации по улучшению

## Краткое содержание

Этот документ определяет архитектурные паттерны, концепции и лучшие практики из репозитория universo-platformo-react, которые еще не полностью документированы в текущих планах universo-platformo-vue. Эти паттерны должны быть включены для обеспечения того, чтобы реализация на Vue поддерживала концептуальное соответствие с проверенной архитектурой React, адаптируя её к лучшим практикам Vue/Django.

## Методология анализа

1. Глубокое изучение структуры репозитория universo-platformo-react (35+ пакетов)
2. Сравнение с существующей конституцией (v1.2.0), спецификациями и планами
3. Выявление пробелов и отсутствующих паттернов
4. Оценка применимости к стеку Vue/Django
5. Рекомендации по интеграции в документы планирования

## Паттерны, уже хорошо освещенные

Следующие паттерны из репозитория React уже документированы в конституции v1.2.0:

✅ **Монорепозиторий с PNPM и каталогом зависимостей** (Принцип I)
✅ **Оркестрация сборки с Turbo** (Принцип XII)  
✅ **Централизованные общие пакеты** (Принцип XI)
✅ **Архитектура i18n с регистрацией пространств имен** (Принцип X)
✅ **Паттерны сущностей (UUID, временные метки)** (Принцип III)
✅ **Управление жизненным циклом пакетов** (Принцип IX)
✅ **Двуязычная документация** (Принцип V)
✅ **Разработка, основанная на задачах** (Принцип VI)

## Паттерны, требующие улучшения или документирования

### 1. Паттерн внутренней структуры фронтенд-пакета

**Текущий статус**: Не документирован явно  
**Реализация в React**: Четкая структура папок внутри пакетов

**Паттерн из React**:
```
packages/{feature}-frt/base/src/
├── api/              # Методы API-клиента для этой функции
├── hooks/            # React hooks (composables в Vue)
├── i18n/             # Переводы
│   └── locales/
│       ├── en/       # Английские переводы
│       └── ru/       # Русские переводы
├── menu-items/       # Конфигурация навигационного меню
├── pages/            # Компоненты страниц
├── types/            # Определения типов TypeScript
├── utils/            # Утилитарные функции
├── __mocks__/        # Моки для тестов (опционально)
└── index.ts          # Публичные экспорты
```

**Адаптация для Vue**:
```
packages/{feature}-frt/base/src/
├── api/              # Методы API-клиента для этой функции
├── composables/      # Vue composables (как React hooks)
├── i18n/             # Переводы
│   └── locales/
│       ├── en/       # Английские переводы
│       └── ru/       # Русские переводы
├── components/       # Vue-компоненты
├── pages/            # Компоненты страниц/представлений
├── router/           # Определения маршрутов (опционально, может быть в menu-items)
├── menu-items/       # Конфигурация навигационного меню
├── stores/           # Хранилища Pinia для состояния функции
├── types/            # Определения типов TypeScript
├── utils/            # Утилитарные функции
├── __tests__/        # Тестовые файлы (опционально)
└── index.ts          # Публичные экспорты
```

**Рекомендация**: Добавить этот паттерн в data-model.md или создать новый документ "Руководство по структуре пакетов", показывающий каноническую структуру каталогов для фронтенд-пакетов.

### 2. Паттерн внутренней структуры бэкенд-пакета

**Текущий статус**: Не документирован явно  
**Реализация в React**: Структура на основе Express с TypeORM

**Паттерн из React**:
```
packages/{feature}-srv/base/src/
├── database/         # Сущности и миграции TypeORM
│   ├── entities/
│   └── migrations/
├── routes/           # Обработчики маршрутов Express
├── schemas/          # Схемы валидации (Zod)
├── types/            # Определения типов TypeScript
├── utils/            # Утилитарные функции
├── tests/            # Тестовые файлы
└── index.ts          # Публичные экспорты (маршруты, сущности)
```

**Адаптация для Django**:
```
packages/{feature}-srv/base/
├── {feature}/        # Каталог Django-приложения
│   ├── __init__.py
│   ├── models.py     # Модели Django ORM (сущности)
│   ├── serializers.py # Сериализаторы DRF
│   ├── views.py      # ViewSets и APIViews DRF
│   ├── urls.py       # URL-маршрутизация
│   ├── admin.py      # Конфигурация Django admin
│   ├── permissions.py # Пользовательские разрешения
│   ├── filters.py    # Фильтры запросов
│   ├── migrations/   # Миграции Django
│   │   └── __init__.py
│   ├── tests/        # Тестовые файлы
│   │   ├── __init__.py
│   │   ├── test_models.py
│   │   ├── test_views.py
│   │   └── test_serializers.py
│   └── utils.py      # Утилитарные функции
├── requirements.txt  # Python-зависимости
├── pyproject.toml    # Конфигурация Poetry (опционально)
└── README.md         # Документация пакета
```

**Рекомендация**: Явно документировать паттерн структуры Django-приложения, отмечая отличия от Express/TypeORM, но сохраняя концептуальную эквивалентность (models=entities, serializers=schemas, views=routes).

### 3. Паттерн трехуровневой иерархии сущностей

**Текущий статус**: Упоминается в ARCHITECTURE_ANALYSIS.md, но не формализован в спецификациях  
**Реализация в React**: Последовательный паттерн в нескольких функциях

**Паттерн**:
Большинство функций следуют трехуровневой иерархии с четкими отношениями родитель-потомок:

**Домен кластеров**:
- Cluster (контейнер верхнего уровня)
  - Domain (организационная единица среднего уровня)
    - Resource (отдельные элементы)

**Домен метавселенных**:
- Metaverse (мир верхнего уровня)
  - Section (область среднего уровня)
    - Entity (отдельные объекты)

**Домен проектов**:
- Project (контейнер верхнего уровня)
  - Workflow (процесс среднего уровня)
    - Node (отдельные шаги)

**Домен пространств**:
- Space (среда верхнего уровня)
  - Canvas (рабочее пространство среднего уровня)
    - Node (элементы графа)

**Общие характеристики**:
- Верхний уровень: Контроль доступа, владение, контекст биллинга
- Средний уровень: Логическая группировка, категоризация
- Нижний уровень: Фактический контент/функциональность

**Паттерны отношений**:
- Один-ко-многим: Родитель → Дети
- Многие-ко-многим: Пользователи → Сущности верхнего уровня (с ролями через промежуточную таблицу)
- Опционально: Сущности нижнего уровня могут ссылаться на внешние ресурсы

**Рекомендация**: 
1. Добавить раздел "Паттерн трехуровневой сущности" в data-model.md
2. Документировать, когда использовать 2-уровневую vs 3-уровневую vs более уровней
3. Предоставить матрицу решений для проектирования иерархии сущностей
4. Включить примеры, адаптированные к моделям Django с правильными внешними ключами

### 4. Паттерн регистрации элементов меню

**Текущий статус**: Не документирован  
**Реализация в React**: Каждый пакет экспортирует конфигурацию меню

**Паттерн из React**:
```typescript
// packages/clusters-frt/base/src/menu-items/index.tsx
export const clustersMenuItem = {
  id: 'clusters',
  title: 'clusters.navigation.title', // ключ i18n
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

**Адаптация для Vue с Vue Router**:
```typescript
// packages/clusters-frt/base/src/menu-items/index.ts
import type { MenuItemConfig } from '@universo/template-vue'

export const clustersMenuItem: MenuItemConfig = {
  id: 'clusters',
  title: 'clusters.navigation.title', // ключ i18n
  type: 'group',
  icon: 'mdi-file-tree', // MDI-иконка
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

**Интеграция**:
Каждый пакет функций регистрирует свои элементы меню в главном приложении при инициализации.

**Рекомендация**: 
1. Добавить паттерн элементов меню в quickstart.md
2. Документировать, как @universo/template-vue агрегирует элементы меню
3. Включить определения типов для конфигурации меню

### 5. Структура API-клиента с ключами запросов

**Текущий статус**: Частично документирован в research.md  
**Реализация в React**: Классы API на основе ресурсов с интеграцией TanStack Query

**Паттерн из React**:
```typescript
// Фабрика иерархических ключей запросов
export const clusterQueryKeys = {
  all: ['clusters'] as const,
  lists: () => [...clusterQueryKeys.all, 'list'] as const,
  list: (filters: ClusterFilters) => [...clusterQueryKeys.lists(), filters] as const,
  details: () => [...clusterQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...clusterQueryKeys.details(), id] as const,
  domains: (clusterId: string) => [...clusterQueryKeys.detail(clusterId), 'domains'] as const,
}

// Методы API-клиента
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

**Использование хуков запросов** (для Vue, аналогичный паттерн):
```typescript
// Vue composable, использующий @tanstack/vue-query
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

**Преимущества**:
- Типобезопасные ключи кэша
- Иерархическая инвалидация кэша
- Последовательные паттерны для всех ресурсов
- Легко тестировать и мокировать

**Рекомендация**:
1. Расширить раздел API-клиента в research.md паттерном ключей запросов
2. Добавить примеры в contracts/api-contracts.md
3. Документировать связь между иерархией ключей запросов и отношениями ресурсов

### 6. Явные промежуточные таблицы для отношений многие-ко-многим

**Текущий статус**: Упоминается в ARCHITECTURE_ANALYSIS.md  
**Реализация в React**: Все отношения многие-ко-многим используют явные промежуточные сущности

**Паттерн из React** (TypeORM):
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
  comment?: string // Почему этот пользователь имеет доступ

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date

  // Отношения
  @ManyToOne(() => Cluster, cluster => cluster.clusterUsers)
  @JoinColumn({ name: 'cluster_id' })
  cluster!: Cluster

  @ManyToOne(() => User, user => user.clusterUsers)
  @JoinColumn({ name: 'user_id' })
  user!: User
}
```

**Адаптация для Django**:
```python
class ClusterUser(models.Model):
    """
    Промежуточная таблица для отношения многие-ко-многим Cluster-User.
    Явная модель позволяет хранить дополнительные метаданные, такие как role и comment.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    cluster = models.ForeignKey(
        'Cluster',
        on_delete=models.CASCADE,
        related_name='cluster_users',
        db_column='cluster_id'
    )
    user = models.ForeignKey(
        'auth.User',  # или пользовательская модель User
        on_delete=models.CASCADE,
        related_name='cluster_users',
        db_column='user_id'
    )
    role = models.CharField(
        max_length=20,
        choices=[
            ('admin', 'Администратор'),
            ('editor', 'Редактор'),
            ('viewer', 'Наблюдатель'),
        ]
    )
    comment = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'cluster_users'
        db_table_comment = 'clusters'  # Группировка в виде схемы через комментарий
        unique_together = [('cluster', 'user')]
        indexes = [
            models.Index(fields=['cluster', 'role']),
            models.Index(fields=['user']),
        ]
```

**Почему не через through-таблицу Django**:
Хотя Django поддерживает through-таблицы в ManyToManyField, явное определение модели обеспечивает:
- Лучшую видимость и контроль
- Легче добавлять бизнес-логику в методы
- Более очевидно в кодовой базе
- Последовательно с другими паттернами сущностей

**Рекомендация**:
1. Добавить явный раздел в data-model.md: "Паттерн промежуточной таблицы"
2. Документировать, когда использовать явную промежуточную таблицу vs. through-таблицы Django
3. Предоставить критерии решения и примеры

### 7. Последовательность именования пакетов

**Текущий статус**: Документирован в конституции  
**Реализация в React**: Обнаружена непоследовательность, которую следует избегать

**Наблюдение**:
В репозитории React общие пакеты имеют непоследовательное именование:
- ✅ `universo-types` (правильно)
- ✅ `universo-utils` (правильно)
- ✅ `universo-i18n` (правильно)
- ✅ `universo-api-client` (правильно)
- ✅ `universo-template-mui` (правильно)
- ✅ `universo-rest-docs` (правильно)
- ❌ `updl` (должно быть `universo-updl` для последовательности)

**Рекомендация**:
1. В реализации на Vue обеспечить, чтобы ВСЕ общие пакеты использовали префикс `universo-`
2. Документировать это явно в конституции: "Общие пакеты ДОЛЖНЫ использовать префикс universo-"
3. Добавить в валидацию скрипта создания пакетов

### 8. Стратегия идентификации устаревшего кода

**Текущий статус**: Упоминается в конституции (Принцип VII), но не операционализирован  
**Реальность репозитория React**: Содержит значительный устаревший код Flowise

**Выявленные устаревшие пакеты**:
- flowise-ui
- flowise-server
- flowise-components
- flowise-chatmessage
- flowise-store
- flowise-template-mui

Эти пакеты:
- Происходят из оригинального проекта Flowise
- Постепенно заменяются/переписываются
- НЕ должны использоваться в качестве эталонных паттернов
- Представляют технический долг, которого следует избегать в реализации на Vue

**Рекомендация**:
1. Создать "Руководство по идентификации устаревшего кода" в research.md
2. Перечислить, какие пакеты React зрелые vs. устаревшие
3. Документировать критерии для идентификации устаревшего кода:
   - Комментарии, указывающие "из Flowise" или "устаревший"
   - Старые паттерны кодирования
   - Отсутствующие типы TypeScript
   - Несоответствие паттернам конституции
4. Добавить явные предупреждения в quickstart.md о том, каких паттернов следует избегать

### 9. Граф зависимостей общих пакетов

**Текущий статус**: Общие пакеты перечислены, но зависимости не отображены  
**Реализация в React**: Четкая иерархия зависимостей

**Структура зависимостей из React**:
```
universo-types (нет зависимостей от других universo-пакетов)
    ↓
universo-utils (зависит от: universo-types)
    ↓
universo-i18n (зависит от: universo-types)
    ↓
universo-api-client (зависит от: universo-types, universo-utils)
    ↓
universo-template-mui (зависит от: всех вышеперечисленных)
```

**Принципы**:
- Пакет types имеет нулевые внутренние зависимости (только внешние, как TypeScript)
- Utils может зависеть от types, но ни от чего больше
- i18n независим (зависит только от types)
- API-клиент зависит от types и utils
- Пакет template зависит от всего (находится на вершине иерархии)

**Преимущества**:
- Предотвращает циклические зависимости
- Четкий порядок сборки
- Легче тестировать изолированно
- Проще понимать и поддерживать

**Рекомендация**:
1. Добавить раздел "Правила зависимостей общих пакетов" в plan.md
2. Документировать иерархию и обоснование
3. Включить диаграмму графа зависимостей
4. Добавить валидацию в процесс сборки для предотвращения нарушений

### 10. Паттерны конфигурационных файлов

**Текущий статус**: Некоторые файлы упоминаются, но не исчерпывающе  
**Реализация в React**: Последовательная конфигурация в пакетах

**Стандартные файлы в каждом фронтенд-пакете**:
```
package.json         # Зависимости, скрипты, экспорты
tsconfig.json        # Конфигурация TypeScript (расширяет корневую)
tsdown.config.ts     # Конфигурация сборки (для библиотечных пакетов)
vite.config.ts       # Конфигурация Vite (для приложений)
vitest.config.ts     # Конфигурация тестов
setupTests.ts        # Настройка тестов и глобальные моки
.eslintrc.js         # Правила линтинга (расширяет корневые)
```

**Стандартные файлы в каждом бэкенд-пакете**:
```
package.json         # Зависимости, скрипты
tsconfig.json        # Конфигурация TypeScript (расширяет корневую)
jest.config.js       # Конфигурация тестов
```

**Адаптация для Vue/Django**:
**Фронтенд**:
```
package.json         # Зависимости, скрипты, экспорты
tsconfig.json        # Конфигурация TypeScript (расширяет корневую)
vite.config.ts       # Конфигурация Vite (production-сборка)
vitest.config.ts     # Конфигурация тестов
setupTests.ts        # Настройка тестов
```

**Бэкенд (Django)**:
```
requirements.txt     # Python-зависимости
pyproject.toml       # Конфигурация Poetry (опционально)
pytest.ini           # Конфигурация Pytest
.coveragerc          # Конфигурация покрытия
setup.cfg            # Конфигурации Flake8, mypy
```

**Рекомендация**:
1. Создать документ "Стандарты конфигурации пакетов"
2. Предоставить шаблоны для каждого типа файлов
3. Документировать, что расширяет корневую vs. специфична для пакета
4. Включить в скрипт создания пакетов

### 11. Структура и паттерны тестирования

**Текущий статус**: Тестирование упоминается, но паттерны не детализированы  
**Реализация в React**: Последовательная организация тестов

**Паттерн фронтенд-тестирования (React)**:
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

**Адаптация для Vue**:
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

**Паттерн бэкенд-тестирования (Express)**:
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

**Адаптация для Django**:
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

**Рекомендация**:
1. Добавить раздел "Стандарты тестирования" в quickstart.md
2. Документировать паттерны тестирования для Vue-компонентов, composables, API-клиентов
3. Документировать паттерны тестирования Django для моделей, сериализаторов, представлений
4. Включить паттерны настройки тестов и фикстур

### 12. Переменные окружения и управление конфигурацией

**Текущий статус**: Упоминается в требованиях безопасности, но паттерн не детализирован  
**Реализация в React**: Последовательный паттерн .env

**Паттерн из React**:
```
# Корневой .env.example
DATABASE_URL=postgresql://user:pass@localhost:5432/universo
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=xxx
JWT_SECRET=xxx
PORT=3000

# Специфичный для пакета может переопределять
# packages/auth-srv/base/.env.example
JWT_ACCESS_EXPIRATION=30m
JWT_REFRESH_EXPIRATION=7d
```

**Лучшие практики**:
- .env.example в корне (в git)
- .env (игнорируется git, специфичен для разработчика)
- Production использует переменные окружения (не .env файлы)
- Валидация при запуске (fail fast, если требуемые переменные отсутствуют)

**Адаптация Django**:
```python
# settings.py
import environ

env = environ.Env(
    DEBUG=(bool, False),
    ALLOWED_HOSTS=(list, ['localhost']),
)

# Чтение .env файла
environ.Env.read_env()

DATABASE_URL = env('DATABASE_URL')
SECRET_KEY = env('SECRET_KEY')
SUPABASE_URL = env('SUPABASE_URL')
```

**Рекомендация**:
1. Документировать конвенции именования переменных окружения
2. Предоставить шаблон .env.example
3. Документировать подход к валидации требуемых переменных
4. Включить в инструкции по настройке quickstart.md

### 13. Паттерны управления миграциями

**Текущий статус**: Упоминается, но стратегия не детализирована  
**Реализация в React**: Миграции TypeORM с временными метками

**Паттерн из React** (TypeORM):
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

**Адаптация Django**:
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
                'db_table_comment': 'clusters',  # Группировка в виде схемы
            },
        ),
    ]
```

**Стратегия миграций**:
- Одна миграция на логическое изменение
- Всегда предоставлять и прямую, и обратную миграцию (forward/backward)
- Тестировать миграции на копии production-данных
- Координировать миграции между пакетами (зависимости)
- Явно документировать breaking-миграции

**Рекомендация**:
1. Добавить раздел "Управление миграциями" в data-model.md
2. Документировать лучшие практики миграций Django
3. Включить руководство по координации миграций между пакетами
4. Документировать процедуры тестирования для миграций

### 14. Генерация документации REST API

**Текущий статус**: Не документирован  
**Реализация в React**: Пакет universo-rest-docs

**Цель**: Автоматическая генерация документации API из кода бэкенда

**Подход React**: Пользовательская генерация документации из сущностей TypeORM и маршрутов Express

**Варианты адаптации для Django**:
1. **drf-spectacular** (рекомендуется): Автоматически генерирует схему OpenAPI 3.0 из сериализаторов и viewsets DRF
2. **drf-yasg**: Альтернативный генератор OpenAPI
3. **Django REST Swagger**: Старый, менее поддерживаемый

**Рекомендуемый подход** (drf-spectacular):
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

**Преимущества**:
- Автоматически генерируется, всегда синхронизирована с кодом
- Интерактивный исследователь API (Swagger UI)
- Типобезопасные контракты для фронтенда
- Может экспортировать OpenAPI JSON для генерации кода

**Рекомендация**:
1. Добавить раздел "Документация API" в research.md
2. Документировать настройку drf-spectacular
3. Включить в шаблон бэкенд-пакета
4. Документировать, как фронтенд использует спецификацию OpenAPI

### 15. Структура шаблона README пакета

**Текущий статус**: Шаблон упоминается, но структура не определена  
**Реализация в React**: Последовательная структура README во всех пакетах

**Стандартная структура README из React**:
```markdown
# @universo/{package-name}

Краткое описание назначения пакета.

## Обзор

Подробное описание того, что делает этот пакет и когда его использовать.

## Установка

```bash
pnpm add @universo/{package-name}
```

## Использование

Примеры базового использования.

## Справочник API

Ключевые экспорты и их назначение.

## Разработка

Как разрабатывать и тестировать этот пакет.

## Зависимости

Список ключевых зависимостей и причины их использования.

## Архитектура

Краткие архитектурные заметки, специфичные для этого пакета.

## Участие

Руководство по участию в этом пакете.

## Лицензия

MIT
```

**Требование двуязычности**: Каждый раздел должен быть отражен в README-RU.md

**Рекомендация**:
1. Создать формальный шаблон README в packages/TEMPLATE-README.md
2. Создать формальный шаблон README-RU в packages/TEMPLATE-README-RU.md
3. Документировать использование шаблона в создании пакетов
4. Включить шаблон в скрипт создания пакетов

### 16. Паттерны выходных данных сборки

**Текущий статус**: Выходные каталоги упоминаются в turbo.json, но не формализованы  
**Реализация в React**: Последовательные выходные данные сборки

**Выходные данные фронтенд-пакета**:
```
packages/{name}-frt/base/
└── dist/           # Выходные данные сборки
    ├── index.js    # Основная точка входа
    ├── index.d.ts  # Объявления типов
    └── ...
```

**Выходные данные бэкенд-пакета**:
```
packages/{name}-srv/base/
└── dist/           # Скомпилированный TypeScript
    ├── index.js
    ├── routes/
    └── ...
```

**Паттерн Gitignore**:
```
# Выходные данные сборки
dist/
build/
*.tsbuildinfo

# Python
__pycache__/
*.pyc
.pytest_cache/
.coverage
htmlcov/

# Окружение
.env
.env.local
```

**Выходные данные кэша Turbo**:
```json
{
  "pipeline": {
    "build": {
      "outputs": ["dist/**", "build/**"]
    }
  }
}
```

**Рекомендация**:
1. Документировать стандартные выходные каталоги
2. Обновить шаблон .gitignore в репозитории
3. Убедиться, что turbo.json включает все паттерны выходных данных
4. Документировать в создании пакетов

### 17. Паттерны обработки ошибок

**Текущий статус**: Обработка ошибок упоминается в требованиях безопасности  
**Реализация в React**: Последовательный формат ответов об ошибках

**Паттерн ответа об ошибке API** (React/Express):
```typescript
interface ErrorResponse {
  error: {
    code: string,       // Машиночитаемый код ошибки
    message: string,    // Человекочитаемое сообщение
    details?: any,      // Дополнительный контекст
    field?: string,     // Поле, вызвавшее ошибку (валидация)
  }
}

// Пример:
{
  "error": {
    "code": "CLUSTER_NOT_FOUND",
    "message": "Кластер с ID '123' не существует",
    "details": {
      "clusterId": "123"
    }
  }
}
```

**Адаптация Django**:
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

**Рекомендация**:
1. Добавить "Стандарты обработки ошибок" в research.md
2. Документировать стандартные коды ошибок и форматы
3. Предоставить шаблон обработчика исключений Django
4. Включить в документацию контрактов API

### 18. Конвенция именования ключей интернационализации

**Текущий статус**: Архитектура i18n документирована, но конвенции ключей не формализованы  
**Реализация в React**: Последовательная иерархия с точечной нотацией

**Паттерн именования ключей**:
```
{namespace}.{section}.{subsection}.{key}

Примеры:
clusters.navigation.title           → "Кластеры"
clusters.navigation.list            → "Все кластеры"
clusters.form.name.label            → "Имя кластера"
clusters.form.name.placeholder      → "Введите имя кластера"
clusters.form.name.error.required   → "Требуется имя кластера"
clusters.members.title              → "Доступ"
clusters.members.inviteMember       → "Пригласить участника"
clusters.members.roles.admin        → "Администратор"
clusters.messages.created           → "Кластер успешно создан"
clusters.messages.createError       → "Не удалось создать кластер"
```

**Конвенции**:
- Используйте camelCase для последнего сегмента (ключ)
- Используйте точечную нотацию для иерархии
- Общие разделы:
  - `navigation.*` - Элементы меню
  - `form.{field}.*` - Поля формы
  - `messages.*` - Сообщения об успехе/ошибке
  - `actions.*` - Метки кнопок
  - `table.columns.*` - Заголовки таблиц
  - `validation.*` - Сообщения валидации

**Плюрализация**:
```json
{
  "clusters": {
    "items": {
      "count_one": "{{count}} кластер",
      "count_other": "{{count}} кластеров"
    }
  }
}
```

**Рекомендация**:
1. Добавить раздел "Конвенции именования ключей переводов" в research.md
2. Документировать стандартные разделы и паттерны
3. Предоставить примеры для общих паттернов UI
4. Включить в документацию i18n-пакета

## Резюме необходимых улучшений

### Высокий приоритет (Критично для начальной реализации)

1. **Паттерны внутренней структуры пакетов** (Фронтенд и Бэкенд)
   - Расположение: Создать новый документ или расширить data-model.md
   - Обоснование: Разработчикам это нужно сразу при создании пакетов

2. **Паттерн трехуровневой иерархии сущностей**
   - Расположение: data-model.md
   - Обоснование: Основной архитектурный паттерн, влияющий на все проектирование функций

3. **Паттерн явной промежуточной таблицы**
   - Расположение: data-model.md
   - Обоснование: Влияет на решения по проектированию базы данных

4. **Руководство по идентификации устаревшего кода**
   - Расположение: research.md
   - Обоснование: Предотвращает копирование плохих паттернов из репозитория React

5. **Правила зависимостей общих пакетов**
   - Расположение: plan.md
   - Обоснование: Предотвращает циклические зависимости и проблемы со сборкой

### Средний приоритет (Важно для качества и последовательности)

6. **Паттерн регистрации элементов меню**
   - Расположение: quickstart.md

7. **Паттерн ключей запросов API-клиента**
   - Расположение: research.md и contracts/

8. **Стандарты конфигурационных файлов**
   - Расположение: Создать документ "Стандарты конфигурации пакетов"

9. **Паттерны тестирования** (Vue и Django)
   - Расположение: quickstart.md

10. **Управление переменными окружения**
    - Расположение: quickstart.md

### Низкий приоритет (Хорошо иметь, можно добавить позже)

11. **Стратегия управления миграциями**
    - Расположение: data-model.md

12. **Генерация документации REST API**
    - Расположение: research.md

13. **Шаблон README пакета**
    - Расположение: packages/TEMPLATE-README.md

14. **Паттерны выходных данных сборки**
    - Расположение: plan.md или quickstart.md

15. **Стандарты обработки ошибок**
    - Расположение: research.md

16. **Конвенции именования ключей переводов**
    - Расположение: research.md

## Дорожная карта реализации

### Фаза 1: Критичные улучшения (Сделать сейчас)
1. Обновить data-model.md паттернами структуры пакетов
2. Добавить раздел трехуровневой иерархии сущностей
3. Документировать явные промежуточные таблицы
4. Создать руководство по идентификации устаревшего кода в research.md
5. Добавить правила зависимостей общих пакетов в plan.md

### Фаза 2: Улучшения качества (Перед началом реализации)
6. Документировать паттерн элементов меню в quickstart.md
7. Расширить раздел API-клиента в research.md
8. Создать документ стандартов конфигурации пакетов
9. Добавить паттерны тестирования в quickstart.md
10. Документировать переменные окружения в quickstart.md

### Фаза 3: Улучшения для полировки (Можно добавить во время реализации)
11. Добавить управление миграциями в data-model.md
12. Документировать генерацию документации REST API в research.md
13. Создать шаблоны README
14. Документировать выходные данные сборки
15. Добавить стандарты обработки ошибок
16. Документировать конвенции ключей переводов

## Заключение

Существующая конституция (v1.2.0) и спецификации уже охватывают основные архитектурные принципы из репозитория universo-platformo-react. Однако существуют специфические паттерны реализации, внутренние структуры пакетов и конвенции, которые необходимо документировать, чтобы обеспечить разработчиков конкретным руководством при построении реализации Vue/Django.

Рекомендуемые в этом документе улучшения:
1. Предоставят конкретные примеры, которым могут следовать разработчики
2. Предотвратят копирование устаревших паттернов кода из репозитория React
3. Обеспечат последовательность во всех пакетах
4. Сделают реализацию на Vue действительно лучшей в своем классе, а не прямым портом
5. Установят четкие конвенции, которые масштабируются по мере роста проекта

Все паттерны должны быть адаптированы к лучшим практикам Vue/Django, а не слепо копировать паттерны React/Express.
