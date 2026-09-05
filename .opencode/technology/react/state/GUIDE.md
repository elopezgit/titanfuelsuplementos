# react - state

## Objetivo
Guía completa de gestión de estado en React: local, global, del servidor y de URL.

## Jerarquía de estados

### 1. Estado local (useState/useReducer)
```tsx
// Para: form inputs, toggles, UI local, datos de un solo componente
const [isOpen, setIsOpen] = useState(false)
const [form, dispatch] = useReducer(formReducer, initialState)

// useReducer para lógica compleja
function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value }
    case 'RESET':
      return initialState
    case 'VALIDATE':
      return { ...state, errors: validate(state) }
  }
}
```

### 2. Estado compartido (lifting state up)
```tsx
// Para: componentes hermanos que necesitan el mismo dato
function Parent() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  return (
    <>
      <Sidebar selectedId={selectedId} onSelect={setSelectedId} />
      <Content selectedId={selectedId} />
    </>
  )
}
```

### 3. Estado global (Zustand) — RECOMENDADO
```tsx
// Para: auth, theme, user preferences, datos compartidos globalmente
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthStore {
  user: User | null
  token: string | null
  login: (credentials: Credentials) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: async (credentials) => {
        const { user, token } = await api.login(credentials)
        set({ user, token })
      },
      logout: () => set({ user: null, token: null }),
    }),
    { name: 'auth-storage' }
  )
)

// Uso en componente
function UserProfile() {
  const { user, logout } = useAuthStore()
  return (
    <div>
      <span>{user?.name}</span>
      <Button onClick={logout}>Cerrar sesión</Button>
    </div>
  )
}
```

### 4. Estado del servidor (TanStack Query) — RECOMENDADO para API data
```tsx
// Para: datos de API, caching, optimistic updates, pagination
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => fetch('/api/users').then(r => r.json()),
    staleTime: 5 * 60 * 1000, // 5 min
  })
}

function useUpdateUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: UpdateUserDTO) => api.updateUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}
```

### 5. Estado de URL (React Router)
```tsx
// Para: filtros, paginación, búsqueda, breadcrumbs, deep linking
import { useSearchParams } from 'react-router-dom'

function ProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams()
  const category = searchParams.get('category') || 'all'
  
  return (
    <Select 
      value={category} 
      onValueChange={(v) => setSearchParams({ category: v })}
    >
      <SelectItem value="all">Todas</SelectItem>
      <SelectItem value="electronics">Electrónica</SelectItem>
    </Select>
  )
}
```

## Cuándo usar cada herramienta

| Necesidad | Herramienta | Ejemplo |
|---|---|---|
| Input de formulario | useState | `<Input value={name} onChange={...} />` |
| Toggle sidebar | useState | `const [open, setOpen] = useState(false)` |
| Tema global | Zustand | `useThemeStore(s => s.theme)` |
| Auth global | Zustand | `useAuthStore(s => s.user)` |
| Datos de API | TanStack Query | `useQuery({ queryKey: ['users'], queryFn })` |
| Filtros de URL | useSearchParams | `?category=electronics&sort=name` |
| Carrito de compras | Zustand + persist | `useCartStore(s => s.items)` |
| Formulario complejo | useReducer + React Hook Form | `useForm({ resolver: zodResolver(schema) })` |

## Anti-patrones de estado
- **❌ Todo en Context/Redux**: Crea re-renders innecesarios. Usar Zustand.
- **❌ useState para datos de API**: No tiene caching, stale data, retry. Usar TanStack Query.
- **❌ Estado en URLs que no deben compartirse**: No meter theme o auth en URL.
- **❌ Prop drilling > 2 niveles**: Usar Zustand o Context.
- **❌ Estado derivado**: No guardar lo que se puede calcular con useMemo.
- **❌ Mutaciones directas**: Siempre crear nueva referencia (spread, map, filter).

## Quality gates
- [ ] Estado local solo para UI de un componente
- [ ] Zustand para estado global (no Redux sin razón)
- [ ] TanStack Query para datos de API
- [ ] useSearchParams para filtros/paginación
- [ ] Sin prop drilling > 2 niveles
- [ ] Estados derivados con useMemo
- [ ] Sin mutaciones directas de estado
