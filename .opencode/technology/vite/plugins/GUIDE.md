# Vite — Plugins

## Objetivo
Guía de los plugins más importantes de Vite para proyectos React.

## Plugins esenciales

### React
```ts
import react from '@vitejs/plugin-react'
// Fast Refresh, JSX transform, React Compiler support
// OBLIGATORIO para proyectos React
```

### Tailwind CSS v4
```ts
import tailwindcss from '@tailwindcss/vite'
// Tailwind CSS con soporte nativo de Vite
// Reemplaza PostCSS plugin en v4
```

### SVG as React Components
```ts
import svgr from 'vite-plugin-svgr'
// Importa SVGs como componentes React
// import { ReactComponent as Icon } from './icon.svg'
// <Icon className="h-5 w-5" />
```

### Path Resolution
```ts
import path from 'path'
// Aliases de importación
// import { Button } from '@/components/ui/button'
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
}
```

## Plugins de build

### Compression
```ts
import viteCompression from 'vite-plugin-compression'
// Genera versiones .gz de assets
// Reduce tamaño de transferencia ~60-80%
```

### Bundle Analyzer
```ts
import { visualizer } from 'rollup-plugin-visualizer'
// Abre reporte visual del bundle
// Identifica dependencias pesadas
```

### Minification
```ts
// Vite usa esbuild por defecto (más rápido que terser)
// Para minificación más agresiva:
import terser from '@rollup/plugin-terser'
build: {
  minify: 'terser',
}
```

## Plugins de DX

### ESLint
```ts
import eslint from 'vite-plugin-eslint'
// Ejecuta ESLint durante el dev server
// Muestra errores en el overlay
```

### Stylelint
```ts
import stylelint from 'vite-plugin-stylelint'
// Linting de estilos en tiempo real
```

### Checker
```ts
import checker from 'vite-plugin-checker'
// Type checking + ESLint en background
checker({
  typescript: true,
  eslint: { lintCommand: 'eslint .' },
})
```

## Plugins de deploy

### SSG (Static Site Generation)
```ts
import ssg from '@vitessl/vite-ssg'
// Genera HTML estático para SPAs
```

### PWA
```ts
import { VitePWA } from 'vite-plugin-pwa'
// Service worker, manifest, offline support
VitePWA({
  registerType: 'autoUpdate',
  manifest: {
    name: 'My App',
    short_name: 'MyApp',
    theme_color: '#ffffff',
  },
})
```

## Plugins de imagen

### Image Optimization
```ts
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
// Optimiza imágenes durante el build
ViteImageOptimizer({
  jpeg: { quality: 80 },
  png: { quality: 80 },
  webp: { quality: 80 },
})
```

## Configuración típica completa
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```
