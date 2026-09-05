# Vite — Build Optimization

## Objetivo
Guía de optimización del build de Vite: code splitting, chunking, minificación, y análisis de bundle.

## Configuración de build

### Base config
```ts
build: {
  target: 'es2020',           // Target de navegador
  outDir: 'dist',             // Directorio de salida
  sourcemap: true,            // Sourcemaps para debugging
  minify: 'esbuild',          // Minificador (esbuild es más rápido)
  cssMinify: true,            // Minificar CSS
  reportCompressedSize: true, // Reportar tamaño gzip/brotli
  chunkSizeWarningLimit: 500, // Límite de warning (kB)
}
```

### Code splitting manual
```ts
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        // Separar librerías grandes
        'react-vendor': ['react', 'react-dom'],
        'router': ['react-router-dom'],
        'ui-libs': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
        'query': ['@tanstack/react-query'],
        'motion': ['framer-motion'],
      },
    },
  },
}
```

### Dynamic chunks
```ts
build: {
  rollupOptions: {
    output: {
      manualChunks(id) {
        // Separar node_modules
        if (id.includes('node_modules')) {
          if (id.includes('react')) return 'react-vendor'
          if (id.includes('@radix-ui')) return 'ui-vendor'
          if (id.includes('date-fns') || id.includes('lodash')) return 'utils-vendor'
          return 'vendor'
        }
        // Separar features grandes
        if (id.includes('features/editor')) return 'editor-feature'
      },
    },
  },
}
```

## Análisis de bundle

### Visualizer
```bash
npm install -D rollup-plugin-visualizer
```

```ts
import { visualizer } from 'rollup-plugin-visualizer'

plugins: [
  visualizer({
    open: true,           // Abrir automáticamente
    gzipSize: true,       // Mostrar tamaño gzip
    brotliSize: true,     // Mostrar tamaño brotli
    filename: 'dist/stats.html',
  }),
]
```

### Bundlephobia (online)
```
https://bundlephobia.com/
→ Buscar paquetes antes de instalarlos
→ Verificar tamaño real de cada dependencia
```

## Optimización de assets

### Imágenes
```bash
npm install -D vite-plugin-image-optimizer
```

```ts
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

plugins: [
  ViteImageOptimizer({
    jpeg: { quality: 80, progressive: true },
    png: { quality: 80, optimizationLevel: 6 },
    webp: { quality: 80, lossless: false },
    avif: { quality: 70 },
  }),
]
```

### Fuentes
```ts
build: {
  // fonts: {
  //   autoImport: true,
  // }
}
```

## Análisis de dependencias

### Dependencias pesadas (candidatas a reemplazar)
| Dependencia | Tamaño | Alternativa |
|---|---|---|
| moment.js | 300kB | date-fns (tree-shakeable) |
| lodash | 70kB | lodash-es (tree-shakeable) |
| axios | 14kB | fetch nativo |
| styled-components | 13kB | Tailwind CSS |
| MUI | 900kB+ | shadcn/ui (40kB) |
| Ant Design | 2MB+ | shadcn/ui |

### Verificar tamaño de dependencias
```bash
# Instalar dependencia para analizar
npx depcheck
npx bundle-phobia axios
```

## Performance de build

### Velocidad de build
```ts
build: {
  minify: 'esbuild',  // esbuild es 10-100x más rápido que terser
  // Para build más rápido en desarrollo:
  // skipTranspileIncludes: ['some-lib'],
}
```

### Caché de build
```bash
# Vite usa caché automáticamente
# Limpiar si hay problemas:
rm -rf node_modules/.vite
rm -rf dist
```

## Output optimization

### HTML injection
```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- Preload de fuentes principales -->
  <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin />
  
  <!-- Preconnect a APIs externas -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://api.example.com" />
  
  <title>My App</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>
```

## Scripts de build
```json
{
  "scripts": {
    "build": "tsc -b && vite build",
    "build:analyze": "vite build && open dist/stats.html",
    "build:prod": "NODE_ENV=production vite build",
    "preview": "vite preview",
    "preview:prod": "vite preview --host 0.0.0.0"
  }
}
```

## Quality gates
- [ ] Bundle < 200KB (landing), < 500KB (app completa)
- [ ] Vendor chunk separado
- [ ] Code splitting por ruta
- [ ] Imágenes optimizadas (WebP/AVIF)
- [ ] Fuentes con font-display: swap
- [ ] Sourcemaps habilitados para producción
- [ ] Sin dependencias no usadas en bundle
- [ ] Análisis de bundle revisado
