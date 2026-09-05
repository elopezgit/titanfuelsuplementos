# Vite — Configuration & Build

## Objetivo
Guía completa de configuración, plugins y optimización de Vite para proyectos React.

## Configuración base

### vite.config.ts
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    host: true,
    open: true,
  },
  build: {
    target: 'es2020',
    outDir: 'dist',
    sourcemap: true,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
        },
      },
    },
  },
})
```

## Plugins esenciales

### React
```ts
import react from '@vitejs/plugin-react'
// Fast Refresh, JSX transform, React 18+ features
```

### Tailwind CSS
```ts
import tailwindcss from '@tailwindcss/vite'
// Tailwind v4 con soporte nativo de Vite
```

### Path aliases
```ts
import path from 'path'
resolve: {
  alias: { '@': path.resolve(__dirname, './src') }
}
```

### SVG as React components
```ts
import svgr from 'vite-plugin-svgr'
// Permite importar SVGs como componentes React
// import { ReactComponent as Logo } from './logo.svg'
```

### Bundle analyzer
```ts
import { visualizer } from 'rollup-plugin-visualizer'
// Abre reporte visual del bundle
```

### Compression
```ts
import viteCompression from 'vite-plugin-compression'
// Genera versiones .gz y .br de assets
```

## Variables de entorno

### Tipado
```ts
// src/vite-env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

### Uso
```tsx
const apiUrl = import.meta.env.VITE_API_URL
```

### .env files
```
.env                # Variables globales (commiteado)
.env.local          # Variables locales (NO commiteado)
.env.development    # Variables de desarrollo
.env.production     # Variables de producción
.env.development.local  # Variables locales de dev
.env.production.local   # Variables locales de prod
```

## Optimización de build

### Code splitting manual
```ts
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        // Separar vendor libraries
        vendor: ['react', 'react-dom'],
        router: ['react-router-dom'],
        ui: ['@radix-ui/react-dialog', 'framer-motion'],
      },
    },
  },
}
```

### Chunk sizing
```ts
build: {
  chunkSizeWarningLimit: 500, // kB
  rollupOptions: {
    output: {
      manualChunks(id) {
        if (id.includes('node_modules')) {
          if (id.includes('react')) return 'react-vendor'
          if (id.includes('@radix-ui')) return 'ui-vendor'
          return 'vendor'
        }
      },
    },
  },
}
```

## Development server

### Proxy de API
```ts
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
    },
  },
}
```

### HTTPS para desarrollo
```ts
import basicSsl from '@vitejs/plugin-basic-ssl'

server: {
  https: true,
}
```

## Performance de dev server

### Optimizaciones
```ts
optimizeDeps: {
  include: ['react', 'react-dom', 'react-router-dom'],
  exclude: ['@angular/core'], // Si usas Angular
}
```

### Pre-bundling
```ts
// Vite pre-bundlea dependencias automáticamente
// Forzar re-bundle si hay problemas:
optimizeDeps: {
  force: true,
}
```

## Testing con Vitest

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
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
})
```

## Troubleshooting

### Errores comunes
| Error | Solución |
|---|---|
| `Module not found` | Verificar alias en vite.config.ts y tsconfig |
| `Cannot use import statement` | Verificar que el archivo es .tsx/.ts, no .js |
| `Unexpected token` | Verificar configuración de TypeScript |
| `Failed to resolve import` | Verificar que el path existe |
| `Hydration mismatch` | No usar typeof window en SSR-like code |

### HMR no funciona
```bash
# Limpiar caché
rm -rf node_modules/.vite
npm run dev
```

## Scripts útiles
```json
{
  "scripts": {
    "dev": "vite",
    "dev:https": "vite --https",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "analyze": "vite build && open dist/stats.html"
  }
}
```

## Quality gates
- [ ] vite.config.ts optimizado
- [ ] Path aliases configurados
- [ ] Variables de entorno tipadas
- [ ] Build con sourcemaps
- [ ] Code splitting manual para vendor
- [ ] Bundle size dentro de límites
- [ ] Proxy de API configurado (si aplica)
- [ ] Vitest configurado y funcionando
