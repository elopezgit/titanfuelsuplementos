# react - routing

## Objetivo
Guía completa de enrutamiento en React con React Router v6+, incluyendo layouts anidados, lazy loading, guards de autenticación y patrones de navegación.

## Configuración base

### App Router con React Router v6
```tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { lazy, Suspense } from 'react'

// Lazy loading de páginas
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Settings = lazy(() => import('./pages/Settings'))
const Login = lazy(() => import('./pages/Login'))
const Products = lazy(() => import('./pages/Products'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'dashboard',
        element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
        children: [
          { index: true, element: <Dashboard /> },
          { path: 'settings', element: <Settings /> },
        ],
      },
      {
        path: 'products',
        element: <Products />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
```

### Layouts anidados
```tsx
// RootLayout — envuelve toda la app
function RootLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Outlet /> {/* Aquí renderizan las rutas hijas */}
      </main>
      <Footer />
    </div>
  )
}

// DashboardLayout — sidebar + contenido
function DashboardLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <Outlet /> {/* Aquí renderizan las rutas del dashboard */}
      </div>
    </div>
  )
}
```

### Protected Routes
```tsx
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuthStore()
  
  if (isLoading) return <PageSkeleton />
  if (!user) return <Navigate to="/login" replace />
  
  return <>{children}</>
}

// Route guard con roles
function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore()
  
  if (user?.role !== 'admin') return <Navigate to="/dashboard" replace />
  
  return <>{children}</>
}
```

### Navegación programática
```tsx
import { useNavigate, useLocation, useParams } from 'react-router-dom'

function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate()
  
  return (
    <Card onClick={() => navigate(`/products/${product.id}`)}>
      <h3>{product.name}</h3>
    </Card>
  )
}

// Parámetros de URL
function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  
  return <div>Product {id}</div>
}
```

### Búsqueda y filtros en URL
```tsx
import { useSearchParams } from 'react-router-dom'

function ProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams()
  
  const category = searchParams.get('category') || 'all'
  const sort = searchParams.get('sort') || 'name'
  const page = Number(searchParams.get('page')) || 1
  
  const updateFilter = (key: string, value: string) => {
    setSearchParams(prev => {
      prev.set(key, value)
      return prev
    })
  }
  
  return (
    <div>
      <Select value={category} onValueChange={(v) => updateFilter('category', v)}>
        <SelectItem value="all">Todas</SelectItem>
        <SelectItem value="electronics">Electrónica</SelectItem>
      </Select>
      <Pagination 
        page={page} 
        onPageChange={(p) => updateFilter('page', String(p))} 
      />
    </div>
  )
}
```

### Prefetching de rutas
```tsx
import { prefetchRoute } from './utils/prefetch'

// Prefetch on hover/focus
<Link 
  to="/products"
  onMouseEnter={() => prefetchRoute('/products')}
>
  Productos
</Link>

// Prefetch de datos relacionados
function Sidebar() {
  const queryClient = useQueryClient()
  
  const handleHoverProducts = () => {
    queryClient.prefetchQuery({
      queryKey: ['products'],
      queryFn: fetchProducts,
      staleTime: 60000,
    })
  }
  
  return (
    <nav>
      <Link to="/products" onMouseEnter={handleHoverProducts}>
        Productos
      </Link>
    </nav>
  )
}
```

## Patrones de navegación

### Breadcrumbs
```tsx
function Breadcrumbs() {
  const matches = useMatches()
  
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 text-sm">
        {matches.map((match, i) => (
          <li key={match.id} className="flex items-center gap-2">
            {i > 0 && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
            {match.handle?.breadcrumb ? (
              <Link to={match.pathname} className="text-muted-foreground hover:text-foreground">
                {match.handle.breadcrumb}
              </Link>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  )
}
```

### Tab navigation con rutas
```tsx
function SettingsLayout() {
  const tabs = [
    { label: 'Perfil', value: 'profile', path: '/settings/profile' },
    { label: 'Seguridad', value: 'security', path: '/settings/security' },
    { label: 'Notificaciones', value: 'notifications', path: '/settings/notifications' },
  ]
  
  return (
    <div>
      <Tabs>
        {tabs.map(tab => (
          <TabsTrigger key={tab.value} value={tab.value} asChild>
            <Link to={tab.path}>{tab.label}</Link>
          </TabsTrigger>
        ))}
      </Tabs>
      <Outlet />
    </div>
  )
}
```

## Anti-patrones de routing
- **❌ Rutas sin lazy loading**: Carga todo el JS de golpe. Usar React.lazy.
- **❌ Navegación sin feedback**: No hay loading state al cambiar de ruta.
- **❌ Filtros en estado local**: No se pueden compartir por URL. Usar useSearchParams.
- **❌ Rutas sin protección**: Páginas protegidas accesibles sin auth.
- **❌ Redirecciones con window.location**: Rompe el SPA. Usar Navigate o navigate().
- **❌ Nested routes sin Outlet**: Las rutas hijas no renderizan.

## Quality gates
- [ ] Lazy loading en todas las rutas
- [ ] Protected routes para contenido privado
- [ ] Loading states al navegar
- [ ] Filtros/paginación en URL
- [ ] Breadcrumbs para navegación profunda
- [ ] 404 page para rutas inexistentes
- [ ] Back button funciona correctamente
- [ ] Deep linking funciona
