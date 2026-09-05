# react - testing

## Objetivo
Guía completa de testing en React con Vitest, React Testing Library y Playwright. Pirámide de testing: muchas unitarias, algunas integración, pocas E2E.

## Pirámide de testing
```
        ╱╲
       ╱ E2E ╲         ← Pocas: Flujos críticos de usuario (Playwright)
      ╱────────╲
     ╱ Integración ╲   ← Algunas: Componentes con hooks, API (Vitest + RTL)
    ╱────────────────╲
   ╱  Pruebas Unitarias ╲  ← Muchas: Funciones puras, utils, hooks (Vitest)
  ╱──────────────────────╲
```

## Unit Testing (Vitest + React Testing Library)

### Configuración
```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
  },
})

// src/test/setup.ts
import '@testing-library/jest-dom'
```

### Patrones de testing

#### Testing de componentes
```tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

// Arrange → Act → Assert
describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click</Button>)
    
    await user.click(screen.getByRole('button'))
    
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('shows loading spinner when loading', () => {
    render(<Button isLoading>Submit</Button>)
    expect(screen.getByText(/enviando/i)).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
```

#### Testing de formularios
```tsx
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoginForm } from './LoginForm'

describe('LoginForm', () => {
  it('validates required fields', async () => {
    const user = userEvent.setup()
    render(<LoginForm onSubmit={vi.fn()} />)
    
    await user.click(screen.getByRole('button', { name: /iniciar sesión/i }))
    
    expect(await screen.findByText(/email es requerido/i)).toBeInTheDocument()
    expect(await screen.findByText(/contraseña es requerida/i)).toBeInTheDocument()
  })

  it('submits form with valid data', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<LoginForm onSubmit={onSubmit} />)
    
    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/contraseña/i), 'password123')
    await user.click(screen.getByRole('button', { name: /iniciar sesión/i }))
    
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      })
    })
  })
})
```

#### Testing de hooks custom
```tsx
import { renderHook, act } from '@testing-library/react'
import { useCounter } from './useCounter'

describe('useCounter', () => {
  it('increments counter', () => {
    const { result } = renderHook(() => useCounter(0))
    
    act(() => result.current.increment())
    
    expect(result.current.count).toBe(1)
  })

  it('decrements counter', () => {
    const { result } = renderHook(() => useCounter(5))
    
    act(() => result.current.decrement())
    
    expect(result.current.count).toBe(4)
  })
})
```

#### Testing con mocks
```tsx
// Mock de API
vi.mock('./api', () => ({
  fetchUsers: vi.fn(),
}))

import { fetchUsers } from './api'

it('loads users on mount', async () => {
  const mockUsers = [{ id: '1', name: 'John' }]
  vi.mocked(fetchUsers).mockResolvedValue(mockUsers)
  
  render(<UserList />)
  
  expect(await screen.findByText('John')).toBeInTheDocument()
  expect(fetchUsers).toHaveBeenCalledTimes(1)
})

// Mock de store
import { useAuthStore } from './stores/auth'

beforeEach(() => {
  useAuthStore.setState({ user: null })
})

it('redirects to login when not authenticated', () => {
  render(<ProtectedPage />)
  expect(screen.getByText(/iniciar sesión/i)).toBeInTheDocument()
})
```

## Integration Testing

### Testing de componentes con providers
```tsx
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { ProductPage } from './ProductPage'

function renderWithProviders(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={['/products/1']}>
        {ui}
      </MemoryRouter>
    </QueryClientProvider>
  )
}

it('loads and displays product', async () => {
  renderWithProviders(<ProductPage />)
  
  expect(await screen.findByText('Product Name')).toBeInTheDocument()
})
```

## E2E Testing (Playwright)

### Configuración
```ts
// playwright.config.ts
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:5173',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run dev',
    port: 5173,
    reuseExistingServer: !process.env.CI,
  },
})
```

### Patrones E2E
```ts
// e2e/auth.spec.ts
import { test, expect } from '@playwright/test'

test('user can login and access dashboard', async ({ page }) => {
  await page.goto('/login')
  
  await page.fill('[data-testid="email-input"]', 'test@example.com')
  await page.fill('[data-testid="password-input"]', 'password123')
  await page.click('[data-testid="login-button"]')
  
  await expect(page).toHaveURL('/dashboard')
  await expect(page.getByText('Bienvenido')).toBeVisible()
})

test('user cannot access protected route without auth', async ({ page }) => {
  await page.goto('/dashboard')
  
  await expect(page).toHaveURL('/login')
})
```

## Naming conventions
```
// Given_When_Then (BDD style)
it('given empty cart, when adding item, then cart has 1 item', ...)
it('given valid credentials, when clicking login, then redirects to dashboard', ...)

// Component_Event_Expected
it('Button - renders with text', ...)
it('Button - calls onClick when clicked', ...)
it('LoginForm - validates required fields', ...)
```

## Anti-patrones de testing
- **❌ Testing implementation details**: Testear que usa useState, no el comportamiento
- **❌ Snapshots excesivos**: Usar solo para componentes de interfaz estable
- **❌ Tests interdependientes**: Cada test debe ser aislado
- **❌ Testing sin waiting**: RTL es async, usar waitFor/findBy
- **❌ Mocks excesivos**: Mockear solo lo necesario, preferir datos reales
- **❌ Tests lentos en unit**: Unit tests < 100ms, integration < 2s

## Quality gates
- [ ] Cobertura unitaria > 70%
- [ ] Tests de integración para APIs y hooks críticos
- [ ] E2E para flujos principales (login, crud principal)
- [ ] Tests pasan en CI
- [ ] Sin tests interdependientes
- [ ] Sin snapshots excesivos (> 50 líneas)
- [ ] Tests con datos realistas (no solo "test")
