# Refactorización del Proyecto - Lecciones Aprendidas

## Resumen

Esta refactorización tiene como objetivo eliminar código duplicado entre las vistas, extraer componentes reutilizables y crear una estructura más escalable y mantenible siguiendo principios DRY (Don't Repeat Yourself) y separación de responsabilidades.

## Estructura de Carpetas Propuesta

```
src/
├── components/
│   ├── layout/           # Componentes de layout reutilizables
│   │   ├── AppLayout.tsx      # Layout principal con Sidebar
│   │   ├── MainLayout.tsx     # Layout para área de contenido principal
│   │   ├── Sidebar.tsx        # Sidebar de navegación (existente)
│   │   ├── MainContent.tsx    # Contenido principal (refactorizado)
│   │   ├── RightPanel.tsx    # Panel derecho de búsqueda (refactorizado)
│   │   └── RightPanelDetail.tsx # Panel derecho de detalle (refactorizado)
│   ├── shared/           # Componentes compartidos reutilizables
│   │   ├── Breadcrumbs.tsx    # Componente de breadcrumbs
│   │   ├── PageHeader.tsx      # Header de página con breadcrumbs y acciones
│   │   ├── EmptyState.tsx      # Estado vacío para cuando no hay resultados
│   │   ├── InfoField.tsx      # Campo de información reutilizable
│   │   ├── LessonCard.tsx     # Tarjeta de lección reutilizable
│   │   └── PaginationInfo.tsx # Información de paginación
│   └── ui/               # Componentes UI base (existente)
├── utils/                # Funciones utilitarias
│   ├── date.ts          # Utilidades para formateo de fechas
│   └── score.ts         # Utilidades para manejo de scores
├── hooks/               # Hooks personalizados
│   └── usePagination.ts # Hook para manejo de paginación
└── pages/               # Páginas de la aplicación (refactorizadas)
```

## Componentes Reutilizables Creados

### 1. **Layouts**

#### `AppLayout`
- Layout principal que envuelve todas las páginas
- Incluye el Sidebar y permite agregar un panel derecho opcional
- Elimina la duplicación de estructura en todas las páginas

#### `MainLayout`
- Layout para el área principal de contenido
- Permite personalizar el color de fondo
- Maneja el scroll y overflow

### 2. **Componentes Compartidos**

#### `Breadcrumbs`
- Componente reutilizable para navegación breadcrumb
- Usado en múltiples páginas

#### `PageHeader`
- Header estándar con breadcrumbs, título y acciones
- Reemplaza headers duplicados en diferentes páginas
- Soporta botones de acción personalizados

#### `EmptyState`
- Componente para mostrar estados vacíos
- Elimina código duplicado de "no hay resultados"
- Personalizable con imagen, título y descripción

#### `InfoField`
- Campo de información reutilizable
- Usado en `RightPanelDetail` para mostrar información de lecciones
- Reduce código repetitivo de campos de información

#### `LessonCard`
- Tarjeta de lección reutilizable
- Extrae la lógica de renderizado de tarjetas de `MainContent`
- Incluye toda la información y estilos necesarios

#### `PaginationInfo`
- Componente para mostrar información de paginación
- Muestra "Mostrando X - Y de Z resultados"

### 3. **Utilidades**

#### `utils/date.ts`
- `formatDateTime()`: Formatea fechas ISO a formato legible en español
- Elimina duplicación de esta función en múltiples componentes

#### `utils/score.ts`
- `getScoreColor()`: Obtiene el color según el score
- `getScoreLabel()`: Obtiene la etiqueta descriptiva del score
- Elimina duplicación de lógica de colores

### 4. **Hooks Personalizados**

#### `usePagination`
- Hook para manejar paginación de items
- Calcula páginas, items actuales, índices
- Resetea automáticamente cuando cambian las dependencias
- Elimina lógica duplicada de paginación

## Refactorizaciones Realizadas

### Antes y Después

#### 1. **Estructura de Páginas**

**Antes:**
```tsx
// Cada página tenía su propia estructura
<div className="flex h-screen overflow-hidden">
  <Sidebar />
  <main className="flex-1 flex flex-col bg-background overflow-auto">
    {/* contenido */}
  </main>
</div>
```

**Después:**
```tsx
// Todas las páginas usan el mismo layout
<AppLayout>
  <MainLayout>
    {/* contenido */}
  </MainLayout>
</AppLayout>
```

#### 2. **Formateo de Fechas**

**Antes:**
```tsx
// Duplicado en MainContent.tsx, RightPanelDetail.tsx, LessonDetail.tsx
const formatDateTime = (dateTimeString: string) => {
  const date = new Date(dateTimeString);
  const dateStr = date.toLocaleDateString('es-ES', { ... });
  const timeStr = date.toLocaleTimeString('es-ES', { ... });
  return { date: dateStr, time: timeStr };
};
```

**Después:**
```tsx
// Una sola función en utils/date.ts
import { formatDateTime } from "@/utils/date";
const { date, time } = formatDateTime(lesson.dateTime);
```

#### 3. **Función getScoreColor**

**Antes:**
```tsx
// Duplicado en MainContent.tsx y RightPanel.tsx
const getScoreColor = (score: number) => {
  if (score >= 0.7) return "hsl(142, 71%, 45%)";
  if (score >= 0.4) return "hsl(45, 93%, 47%)";
  return "hsl(0, 72%, 51%)";
};
```

**Después:**
```tsx
// Una sola función en utils/score.ts
import { getScoreColor } from "@/utils/score";
const color = getScoreColor(score);
```

#### 4. **Headers de Página**

**Antes:**
```tsx
// Código duplicado en MainContent y LessonDetailContent
<div className="bg-white border-b border-border">
  <div className="px-6 py-3">
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Lecciones Aprendidas</span>
          <ChevronRight className="h-4 w-4" />
          <span>Resultados de búsqueda</span>
        </div>
        <h1 className="text-2xl font-semibold text-foreground">
          Resultados de búsqueda
        </h1>
      </div>
    </div>
  </div>
</div>
```

**Después:**
```tsx
// Componente reutilizable
<PageHeader
  breadcrumbs={[
    { label: "Lecciones Aprendidas" },
    { label: "Resultados de búsqueda", active: true },
  ]}
  title="Resultados de búsqueda"
/>
```

#### 5. **Estado Vacío**

**Antes:**
```tsx
// Código duplicado en MainContent (2 veces)
<div className="flex flex-col items-center justify-center h-full min-h-[500px] text-center">
  <div className="mb-8">
    <img src={notFoundImage} alt="..." className="w-64 h-64 object-contain" />
  </div>
  <h2 className="text-2xl font-bold text-gray-700 mb-2">Oops,</h2>
  <p className="text-base text-gray-500">No hay resultados para tu búsqueda.</p>
</div>
```

**Después:**
```tsx
// Componente reutilizable
<EmptyState />
```

#### 6. **Campos de Información**

**Antes:**
```tsx
// Código repetitivo en RightPanelDetail
<div className="relative">
  <div className="relative w-full rounded-md border border-gray-300 bg-white px-3 py-2.5">
    <label className="absolute -top-2 left-2 px-1.5 bg-white text-xs font-medium text-foreground pointer-events-none">
      Clasificación
    </label>
    <p className="text-sm text-foreground pt-1">{lesson.situationType}</p>
  </div>
</div>
```

**Después:**
```tsx
// Componente reutilizable
<InfoField label="Clasificación" value={lesson.situationType} />
```

#### 7. **Paginación**

**Antes:**
```tsx
// Lógica de paginación en MainContent
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 5;
const totalPages = Math.ceil(filteredAndSortedLessons.length / itemsPerPage);
const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const currentLessons = filteredAndSortedLessons.slice(startIndex, endIndex);
useEffect(() => {
  setCurrentPage(1);
}, [minScore, searchText, hasSearched]);
```

**Después:**
```tsx
// Hook reutilizable
const {
  currentPage,
  setCurrentPage,
  totalPages,
  currentItems,
  startIndex,
  endIndex,
  totalItems,
} = usePagination({
  items: filteredAndSortedLessons,
  itemsPerPage: 5,
  dependencies: [minScore, searchText, hasSearched],
});
```

## Beneficios de la Refactorización

### 1. **Reducción de Código Duplicado**
- Eliminación de funciones duplicadas (`formatDateTime`, `getScoreColor`)
- Eliminación de componentes duplicados (headers, empty states, campos de información)
- Reducción estimada de ~40% en líneas de código duplicado

### 2. **Mejor Mantenibilidad**
- Cambios en un solo lugar se reflejan en toda la aplicación
- Más fácil de entender y modificar
- Menos puntos de fallo

### 3. **Escalabilidad**
- Fácil agregar nuevas páginas usando los layouts existentes
- Componentes reutilizables listos para usar
- Estructura clara y organizada

### 4. **Separación de Responsabilidades**
- Layouts separados de contenido
- Utilidades separadas de componentes
- Hooks para lógica reutilizable

### 5. **Consistencia**
- Todas las páginas usan la misma estructura
- Componentes compartidos aseguran consistencia visual
- Mismo comportamiento en toda la aplicación

## Principios Aplicados

1. **DRY (Don't Repeat Yourself)**: Eliminación de código duplicado
2. **Separación de Responsabilidades**: Cada componente tiene una responsabilidad única
3. **Composición**: Componentes pequeños que se combinan para crear vistas complejas
4. **Reutilización**: Componentes y funciones reutilizables en toda la aplicación
5. **Mantenibilidad**: Código más fácil de mantener y modificar

## Próximos Pasos Recomendados

1. **Extraer constantes**: Mover datos mock (como `lessons` en `MainContent`) a archivos separados
2. **Crear tipos compartidos**: Centralizar tipos TypeScript en `src/types/`
3. **Agregar tests**: Crear tests para componentes reutilizables
4. **Documentación**: Agregar JSDoc a funciones y componentes públicos
5. **Optimización**: Considerar memoización para componentes que se renderizan frecuentemente

## Archivos Modificados

### Nuevos Archivos
- `src/utils/date.ts`
- `src/utils/score.ts`
- `src/components/layout/AppLayout.tsx`
- `src/components/layout/MainLayout.tsx`
- `src/components/shared/Breadcrumbs.tsx`
- `src/components/shared/PageHeader.tsx`
- `src/components/shared/EmptyState.tsx`
- `src/components/shared/InfoField.tsx`
- `src/components/shared/LessonCard.tsx`
- `src/components/shared/PaginationInfo.tsx`
- `src/hooks/usePagination.ts`

### Archivos Refactorizados
- `src/components/layout/MainContent.tsx`
- `src/components/layout/RightPanel.tsx`
- `src/components/layout/RightPanelDetail.tsx`
- `src/components/LessonDetailContent.tsx`
- `src/pages/Index.tsx`
- `src/pages/HomePage.tsx`
- `src/pages/LessonDetailPage.tsx`
- `src/pages/InstructionsPage.tsx`














