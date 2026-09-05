# react - performance

## Objetivo
Guía completa de optimización de rendimiento en React+Vite: Core Web Vitals, bundle optimization, lazy loading, memoización y monitoreo.

## Core Web Vitals targets

| Métrica | Objetivo | Cómo medir |
|---|---|---|
| LCP (Largest Contentful Paint) | < 1.5s | Lighthouse, CrUX |
| FID (First Input Delay) | < 50ms | Lighthouse, CrUX |
| CLS (Cumulative Layout Shift) | < 0.05 | Lighthouse, CrUX |
| INP (Interaction to Next Paint) | < 150ms | Lighthouse, CrUX |
| TTFB (Time to First Byte) | < 200ms | Network tab |

## Optimización de bundle

### Code splitting por ruta
```tsx
// ❌ Carga todo el JS de golpe
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'

// ✅ Lazy loading por ruta
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Settings = lazy(() => import('./pages/Settings'))
```

### Code splitting de librerías pesadas
```tsx
// ❌ Importación completa
import _ from 'lodash'
import { Chart } from 'chart.js'

// ✅ Importaciones específicas
import debounce from 'lodash/debounce'
import { Line } from 'react-chartjs-2'

// ✅ Lazy de componentes pesados
const MarkdownEditor = lazy(() => import('./components/MarkdownEditor'))
const VideoPlayer = lazy(() => import('./components/VideoPlayer'))
```

### Bundle analysis
```bash
# Instalar plugin
npm install -D rollup-plugin-visualizer

# vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true, gzipSize: true }),
  ],
})
```

### Tree shaking efectivo
```tsx
// ❌ Importación de librería completa
import { format, parse, add } from 'date-fns'

// ✅ Solo lo necesario
import format from 'date-fns/format'

// ❌ Barrel exports grandes
import { Button, Card, Dialog, Input, Select, Tabs } from '@/components/ui'

// ✅ Imports directos (mejor para tree shaking)
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
```

## Optimización de rendering

### React.memo inteligente
```tsx
// ❌ Memo innecesario (no hay re-render costoso)
const SimpleText = React.memo(({ text }) => <span>{text}</span>)

// ✅ Memo justificado (evita re-render de lista grande)
const ProductRow = React.memo(({ product }: { product: Product }) => {
  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.price}</td>
    </tr>
  )
})
```

### useMemo y useCallback
```tsx
// ✅ useMemo para cálculos costosos
const sortedProducts = useMemo(() => {
  return products.toSorted((a, b) => a.name.localeCompare(b.name))
}, [products])

// ✅ useCallback para funciones pasadas como props a hijos memoizados
const handleSort = useCallback((field: string) => {
  setSortField(field)
}, [])

// ❌ useCallback innecesario (el hijo no está memoizado)
const handleClick = useCallback(() => setCount(c => c + 1), [])
// → Mejor: const handleClick = () => setCount(c => c + 1)
```

### Evitar re-renders innecesarios
```tsx
// ❌ Nuevo objeto cada render → re-render de hijos
<Component style={{ padding: 16 }} onClick={() => handleSave()} />

// ✅ Estilos y funciones estables
const containerStyle = useMemo(() => ({ padding: 16 }), [])
const handleSave = useCallback(() => saveData(), [])
<Component style={containerStyle} onClick={handleSave} />

// ❌ Array nuevo cada render
<Component items={[1, 2, 3]} />

// ✅ Constante fuera del render
const ITEMS = [1, 2, 3]
<Component items={ITEMS} />
```

## Optimización de imágenes

### Next/Image pattern (con Vite)
```tsx
// Componente de imagen optimizada
function OptimizedImage({ src, alt, width, height }: Props) {
  return (
    <picture>
      <source srcSet={`${src}?format=avif&w=${width}`} type="image/avif" />
      <source srcSet={`${src}?format=webp&w=${width}`} type="image/webp" />
      <img
        src={`${src}?w=${width}`}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className="object-cover"
      />
    </picture>
  )
}
```

### Imágenes con srcset
```tsx
<img
  src="/hero-800.jpg"
  srcSet="/hero-400.jpg 400w, /hero-800.jpg 800w, /hero-1200.jpg 1200w"
  sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px"
  alt="Hero image"
  loading="lazy"
/>
```

## Optimización de fuentes

```css
/* Preload de fuentes principales */
<link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin />

/* Font display swap para evitar FOIT */
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter-var.woff2') format('woff2');
  font-display: swap;
  font-weight: 100 900;
}
```

## Optimización de APIs

### Prefetching
```tsx
import { useQueryClient } from '@tanstack/react-query'

function ProductCard({ id }: { id: string }) {
  const queryClient = useQueryClient()
  
  return (
    <Card 
      onMouseEnter={() => {
        queryClient.prefetchQuery({
          queryKey: ['product', id],
          queryFn: () => fetchProduct(id),
          staleTime: 60000,
        })
      }}
    >
      {/* ... */}
    </Card>
  )
}
```

### Pagination con infinite scroll
```tsx
function useInfiniteProducts() {
  return useInfiniteQuery({
    queryKey: ['products'],
    queryFn: ({ pageParam = 1 }) => fetchProducts(pageParam),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 1,
  })
}
```

## Herramientas de monitoreo
```tsx
// Performance observer para Core Web Vitals
if ('PerformanceObserver' in window) {
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'largest-contentful-paint') {
        console.log('LCP:', entry.startTime)
      }
      if (entry.entryType === 'first-input') {
        console.log('FID:', entry.processingStart - entry.startTime)
      }
      if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
        console.log('CLS:', entry.value)
      }
    }
  }).observe({ type: 'largest-contentful-paint', buffered: true })
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      console.log('CLS:', entry.value)
    }
  }).observe({ type: 'layout-shift', buffered: true })
}
```

## Anti-patrones de performance
- **❌ useEffect para cálculos**: Usar useMemo
- **❌ Funciones anidadas en render**: Usar useCallback
- **❌ Nuevo objeto/array cada render**: Constantes fuera del componente
- **❌ Importaciones de librería completa**: Importaciones específicas
- **❌ Imágenes sin lazy loading**: Agregar loading="lazy"
- **❌ Bundle sin code splitting**: Lazy loading por ruta
- **❌ Infinite scroll sin prefetch**: Prefetch de siguiente página

## Quality gates
- [ ] Lighthouse Performance > 95
- [ ] Bundle < 200KB (landing), < 500KB (app completa)
- [ ] LCP < 1.5s
- [ ] CLS < 0.05
- [ ] Code splitting por ruta
- [ ] Lazy loading de imágenes
- [ ] Fuentes con font-display: swap
- [ ] Sin re-renders innecesarios
- [ ] Tree shaking efectivo
