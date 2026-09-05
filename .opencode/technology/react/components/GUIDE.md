# react - components

## Objetivo
Guía completa de mejores prácticas para componentes React con Vite, Tailwind CSS y shadcn/ui.

## Principios de diseño de componentes

### Atomic Design
```
atoms → molecules → organisms → templates → pages

Atoms: Button, Input, Badge, Avatar, Icon
Molecules: FormField (Label + Input + Error), SearchBar, Card
Organisms: Header, Sidebar, DataTable, Form
Templates: DashboardLayout, AuthLayout, LandingLayout
Pages: HomePage, LoginPage, SettingsPage
```

### Componentes con personalidad (no genéricos)
```tsx
// ❌ GENÉRICO (parece AI)
<Button className="bg-blue-500 text-white px-4 py-2 rounded">
  Click me
</Button>

// ✅ CON PERSONALIDAD (usa design tokens)
<Button 
  variant="primary" 
  size="lg"
  className="shadow-md hover:shadow-lg transition-all duration-200"
>
  Crear proyecto
</Button>
```

### Patrones de composición

#### Compound Components
```tsx
// Permiten composición flexible sin prop drilling
<Card>
  <CardHeader>
    <CardTitle>Mi tarjeta</CardTitle>
    <CardDescription>Descripción</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Contenido</p>
  </CardContent>
  <CardFooter>
    <Button>ACTION</Button>
  </CardFooter>
</Card>
```

#### Render Props
```tsx
// Lógica reusable sin herencia
<DataFetcher url="/api/users">
  {({ data, loading, error }) => (
    loading ? <Skeleton /> : <UserList users={data} />
  )}
</DataFetcher>
```

#### Custom Hooks para lógica
```tsx
// Separar lógica de presentación
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])
  return debouncedValue
}
```

## Manejo de estados

### Estados de UI (siempre implementar los 4)
```tsx
// 1. LOADING
if (isLoading) return <Skeleton className="h-48 w-full" />

// 2. EMPTY
if (data.length === 0) {
  return (
    <EmptyState 
      icon={<PackageIcon />}
      title="Sin proyectos"
      description="Crea tu primer proyecto para comenzar"
      action={<Button onClick={createProject}>Crear proyecto</Button>}
    />
  )
}

// 3. ERROR
if (error) {
  return (
    <Alert variant="destructive">
      <AlertTitle>Error al cargar</AlertTitle>
      <AlertDescription>{error.message}</AlertDescription>
      <Button onClick={refetch} variant="outline">Reintentar</Button>
    </Alert>
  )
}

// 4. SUCCESS
return <DataGrid data={data} />
```

### Estado global vs local
| Tipo | Herramienta | Cuándo usar |
|---|---|---|
| Estado local de componente | useState/useReducer | Form inputs, toggles, UI local |
| Estado compartido entre hermanos | lifting state up | Componentes que necesitan el mismo dato |
| Estado global de app | Zustand | Auth, theme, user preferences |
| Estado del servidor | TanStack Query | API data, caching, optimistic updates |
| Estado de URL | React Router | Filtros, paginación, breadcrumbs |

## Performance de componentes

### Memoización inteligente
```tsx
// ❌ MEMO INNECESARIO (no optimiza nada)
const SimpleComponent = React.memo(({ text }) => <div>{text}</div>)

// ✅ MEMO JUSTIFICADO (evita re-render costoso)
const ExpensiveList = React.memo(({ items }: { items: Item[] }) => {
  return items.map(item => <ExpensiveItem key={item.id} item={item} />)
})

// ✅useMemo para cálculos costosos
const sortedItems = useMemo(() => {
  return items.toSorted((a, b) => a.name.localeCompare(b.name))
}, [items])

// ✅ useCallback para funciones pasadas como props
const handleSort = useCallback((field: string) => {
  setSortField(field)
}, [])
```

### Lazy loading
```tsx
// Lazy load de rutas
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Settings = lazy(() => import('./pages/Settings'))

// En el router
<Suspense fallback={<PageSkeleton />}>
  <Routes>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/settings" element={<Settings />} />
  </Routes>
</Suspense>
```

## Patrones anti-AI (rechazar)
- Componentes con más de 300 líneas → dividir
- Props con más de 8 parámetros → usar objeto
- `any` en TypeScript → siempre tipar
- CSS inline → usar Tailwind classes
- Lógica en componentes → extraer a hooks
- Sin loading/error/empty states
- Estados hardcoded

## Quality gates
- [ ] Componentes < 300 líneas
- [ ] Props tipadas (sin any)
- [ ] Loading state implementado
- [ ] Empty state implementado
- [ ] Error state implementado
- [ ] Accesibilidad (aria-labels, focus management)
- [ ] Responsive en todos los breakpoints
- [ ] Usa design tokens del proyecto
