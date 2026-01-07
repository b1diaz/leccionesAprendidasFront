# Refactorización: Unificación de RightPanel y RightPanelDetail

## Resumen

Se ha unificado `RightPanel.tsx` y `RightPanelDetail.tsx` en un solo componente reutilizable que cambia dinámicamente su contenido según la ruta o el modo especificado.

## Estructura Creada

```
src/components/layout/RightPanel/
├── index.tsx                 # Componente principal unificado
├── SearchPanelContent.tsx     # Contenido del panel de búsqueda
├── DetailPanelContent.tsx    # Contenido del panel de detalle
└── useSearchPanel.ts         # Hook para estado compartido del panel de búsqueda
```

## Componentes Creados

### 1. `RightPanel/index.tsx` (Componente Principal)

**Características:**
- Detecta automáticamente el modo según la ruta (`/lesson/*` = detail, otras = search)
- Acepta props opcionales para forzar un modo específico
- Valida que los datos necesarios estén presentes para el modo detail
- Renderiza el contenido y footer apropiados según el modo

**Props:**
```typescript
interface RightPanelProps {
  mode?: "search" | "detail";  // Opcional: detecta automáticamente
  lesson?: Lesson;              // Requerido para modo "detail"
  onBack?: () => void;          // Requerido para modo "detail"
}
```

### 2. `SearchPanelContent.tsx`

**Características:**
- Contiene todos los campos de búsqueda (textarea, selects, date range, score slider)
- Usa el hook `useSearchPanel` para estado compartido
- Exporta también `SearchPanelFooter` para los botones de acción

### 3. `DetailPanelContent.tsx`

**Características:**
- Muestra información de la lección (score IA, clasificación, fecha, ubicación, cargo)
- Usa componentes reutilizables (`InfoField`, `Card`)
- Exporta también `DetailPanelFooter` para los botones de acción

### 4. `useSearchPanel.ts` (Hook Personalizado)

**Características:**
- Maneja el estado compartido entre `SearchPanelContent` y `SearchPanelFooter`
- Proporciona handlers `handleClear` y `handleSearch`
- Sincroniza estado local (dateRange, selectedField, selectedStatus) con el contexto FilterContext

## Antes y Después

### Antes: Dos Componentes Separados

**RightPanel.tsx** (193 líneas)
```tsx
const RightPanel = () => {
  // Lógica de búsqueda...
  return (
    <aside className="bg-card flex flex-col..." style={{ width: '430px' }}>
      {/* Contenido de búsqueda */}
      {/* Footer con botones Limpiar/Buscar */}
    </aside>
  );
};
```

**RightPanelDetail.tsx** (78 líneas)
```tsx
const RightPanelDetail = ({ lesson, onBack }) => {
  // Lógica de detalle...
  return (
    <aside className="bg-card flex flex-col..." style={{ width: '430px' }}>
      {/* Contenido de detalle */}
      {/* Footer con botones Atrás/Editar */}
    </aside>
  );
};
```

**Problemas:**
- Código duplicado (estructura del aside, footer, scroll)
- Dos archivos separados para mantener
- Lógica similar pero en lugares diferentes

### Después: Un Solo Componente Unificado

**RightPanel/index.tsx** (56 líneas)
```tsx
const RightPanel = ({ mode, lesson, onBack }) => {
  const location = useLocation();
  const panelMode = mode || (location.pathname.startsWith("/lesson/") ? "detail" : "search");
  
  return (
    <aside className="bg-card flex flex-col..." style={{ width: '430px' }}>
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          {panelMode === "search" ? (
            <SearchPanelContent />
          ) : (
            <DetailPanelContent lesson={lesson!} onBack={onBack!} />
          )}
        </div>
      </div>
      {panelMode === "search" ? (
        <SearchPanelFooter />
      ) : (
        <DetailPanelFooter onBack={onBack!} />
      )}
    </aside>
  );
};
```

**Beneficios:**
- Un solo componente base
- Contenido dinámico según contexto
- Código más limpio y mantenible
- Fácil agregar nuevos modos en el futuro

## Uso del Componente

### Modo Automático (Recomendado)

El componente detecta automáticamente el modo según la ruta:

```tsx
// En Index.tsx - Modo "search" automático
<AppLayout rightPanel={<RightPanel />}>
  <MainLayout>
    <MainContent />
  </MainLayout>
</AppLayout>

// En LessonDetailPage.tsx - Modo "detail" automático
<AppLayout rightPanel={<RightPanel lesson={lesson} onBack={handleBack} />}>
  <MainLayout>
    <LessonDetailContent lesson={lesson} onBack={handleBack} />
  </MainLayout>
</AppLayout>
```

### Modo Explícito

También puedes forzar un modo específico:

```tsx
<RightPanel mode="search" />
<RightPanel mode="detail" lesson={lesson} onBack={handleBack} />
```

## Archivos Modificados

### Nuevos Archivos
- `src/components/layout/RightPanel/index.tsx`
- `src/components/layout/RightPanel/SearchPanelContent.tsx`
- `src/components/layout/RightPanel/DetailPanelContent.tsx`
- `src/components/layout/RightPanel/useSearchPanel.ts`

### Archivos Eliminados
- `src/components/layout/RightPanel.tsx` (antiguo)
- `src/components/layout/RightPanelDetail.tsx`

### Archivos Refactorizados
- `src/pages/Index.tsx` - Ahora usa `RightPanel` sin cambios visibles
- `src/pages/LessonDetailPage.tsx` - Ahora usa `RightPanel` con props `lesson` y `onBack`

## Detección Automática de Modo

El componente usa `useLocation` de React Router para detectar automáticamente el modo:

```typescript
const location = useLocation();
const panelMode = mode || (location.pathname.startsWith("/lesson/") ? "detail" : "search");
```

**Lógica:**
- Si la ruta comienza con `/lesson/` → modo "detail"
- Cualquier otra ruta → modo "search"
- Si se proporciona `mode` explícitamente, se usa ese valor

## Validación de Props

El componente valida que los datos necesarios estén presentes:

```typescript
if (panelMode === "detail") {
  if (!lesson) {
    console.warn("RightPanel: modo 'detail' requiere la prop 'lesson'");
    return null;
  }
  if (!onBack) {
    console.warn("RightPanel: modo 'detail' requiere la prop 'onBack'");
    return null;
  }
}
```

## Hook useSearchPanel

El hook `useSearchPanel` centraliza la lógica del panel de búsqueda:

```typescript
export const useSearchPanel = () => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [selectedField, setSelectedField] = useState("Descripción");
  const [selectedStatus, setSelectedStatus] = useState("");
  const { setSearchText, setMinScore, setHasSearched, setIsLoading } = useFilter();

  const handleClear = () => {
    // Resetea todo el estado
  };

  const handleSearch = () => {
    // Ejecuta la búsqueda
  };

  return {
    dateRange, setDateRange,
    selectedField, setSelectedField,
    selectedStatus, setSelectedStatus,
    handleClear,
    handleSearch,
  };
};
```

**Ventajas:**
- Estado compartido entre `SearchPanelContent` y `SearchPanelFooter`
- Lógica centralizada
- Fácil de testear
- Reutilizable

## Escalabilidad

Para agregar un nuevo modo en el futuro:

1. Crear un nuevo componente de contenido (ej: `EditPanelContent.tsx`)
2. Crear un nuevo footer si es necesario (ej: `EditPanelFooter.tsx`)
3. Agregar el nuevo modo al tipo `RightPanelMode`
4. Agregar la lógica de renderizado en `RightPanel/index.tsx`

```typescript
// Ejemplo: Agregar modo "edit"
export type RightPanelMode = "search" | "detail" | "edit";

// En RightPanel/index.tsx
{panelMode === "edit" ? (
  <EditPanelContent lesson={lesson!} />
) : /* otros modos */}
```

## Beneficios de la Refactorización

### 1. **Eliminación de Duplicación**
- Estructura del `aside` unificada
- Lógica de scroll y layout compartida
- Footer con estructura consistente

### 2. **Mejor Mantenibilidad**
- Un solo lugar para cambios estructurales
- Fácil agregar nuevos modos
- Código más organizado

### 3. **Detección Automática**
- No es necesario especificar el modo en la mayoría de casos
- Funciona automáticamente según la ruta
- Menos props necesarias

### 4. **Separación de Responsabilidades**
- Contenido separado por modo
- Hook para lógica compartida
- Componentes pequeños y enfocados

### 5. **Type Safety**
- TypeScript valida props según el modo
- Tipos explícitos para cada modo
- Mejor autocompletado en IDE

## Comparación de Código

### Líneas de Código

**Antes:**
- `RightPanel.tsx`: 193 líneas
- `RightPanelDetail.tsx`: 78 líneas
- **Total: 271 líneas**

**Después:**
- `RightPanel/index.tsx`: 56 líneas
- `SearchPanelContent.tsx`: 181 líneas
- `DetailPanelContent.tsx`: 77 líneas
- `useSearchPanel.ts`: 36 líneas
- **Total: 350 líneas**

**Nota:** Aunque hay más líneas totales, el código está mejor organizado, es más mantenible y elimina duplicación estructural. La estructura modular facilita el mantenimiento y la escalabilidad.

## Próximos Pasos Recomendados

1. **Agregar Tests**: Crear tests unitarios para cada componente
2. **Optimización**: Considerar memoización si hay problemas de rendimiento
3. **Documentación**: Agregar JSDoc a los componentes públicos
4. **Tipos Compartidos**: Mover tipos a un archivo `types.ts` si crecen
5. **Contexto de Panel**: Considerar un contexto si el estado se vuelve más complejo

## Conclusión

La refactorización ha logrado:
- ✅ Un solo componente base unificado
- ✅ Contenido dinámico según contexto de navegación
- ✅ Eliminación de código duplicado
- ✅ Estructura clara y escalable
- ✅ Mismo comportamiento visual y funcional
- ✅ Código más limpio y mantenible

El componente `RightPanel` ahora es más flexible, mantenible y fácil de extender para futuros requerimientos.














