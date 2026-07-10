# QuestiaSpace - Resumen del Proyecto

¡La plataforma **QuestiaSpace** ha sido desarrollada exitosamente de principio a fin, lista para ser presentada en un Demo Day universitario!

A lo largo de las 8 fases planificadas, construimos una arquitectura de **micro-frontends** escalable e independiente, donde cada framework se enfoca en una tarea específica sin colisionar con los demás.

## Arquitectura y Módulos

-   **Contenedora (Vanilla TS + Vite):** 
    Actúa como el orquestador principal. Implementa un sistema de diseño propio y premium (Glassmorphism, animaciones, modo oscuro/claro) con Vanilla CSS (sin Tailwind). Maneja el inicio de sesión, ruteo SPA básico, y carga de submódulos en iframes.
-   **Angular Quiz (`/angular-quiz/`):** 
    Módulo para crear y jugar cuestionarios de opción múltiple. Usa Reactive Forms para la validación de creación de preguntas y Signals para el estado global.
-   **React Matching (`/react-matching/`):** 
    Módulo para relacionar pares (concepto-definición). Utiliza un flujo de juego interactivo manejado por React Hooks (`useMemo`, `useState`) para desordenar y comprobar asociaciones en tiempo real.
-   **Vue Cards (`/vue-cards/`):** 
    Módulo de Flashcards estilo Anki. Cuenta con animaciones 3D (flip) de las tarjetas y permite al usuario navegar en un "Modo Estudio" auto-evaluándose.
-   **Supabase (Backend):** 
    Base de datos unificada en PostgreSQL. Contiene las tablas `usuarios`, `categorias`, `preguntas`, `tarjetas`, y `relaciones`. Todo está protegido por Políticas RLS (Row Level Security) para que cada estudiante gestione exclusivamente su propio material.

## Cómo Ejecutar el Proyecto (Desarrollo)

Dado que es una aplicación basada en iframes distribuidos en puertos, debes levantar todos los servidores.

1.  Abre una terminal en la raíz (`AppWeb/`).
2.  Ejecuta:
    ```bash
    npm run install:all
    ```
    *Esto instalará las dependencias de la raíz y de los 4 submódulos.*
3.  Ejecuta:
    ```bash
    npm run dev:all
    ```
    *Esto levantará:*
    -   Vite Contenedora (puerto 3000)
    -   Angular (puerto 4200)
    -   React (puerto 5173)
    -   Vue (puerto 5174)
4.  Abre tu navegador en `http://localhost:3000`.

## Cómo Desplegar en Producción

Para el despliegue a **Vercel** o **Netlify**, el repositorio está configurado de manera unificada:

-   Se proveyó un script global `build.js` que el servidor ejecutará (`npm run build:all`).
-   Este script compila los 4 micro-frontends de manera individual y finalmente mueve los recursos estáticos de Angular, React y Vue a los subdirectorios `/angular`, `/react` y `/vue` dentro de la carpeta `dist/` de la Contenedora.
-   Gracias a esto, la aplicación se servirá en un **único dominio** sin problemas de CORS y con una carga imperceptible, resolviendo completamente las direcciones a través del ruteo dinámico codificado en `container/src/router.ts`.

> [!TIP]
> Si subes el repositorio a GitHub, solo tienes que conectarlo a tu cuenta de Vercel o Netlify. El archivo `vercel.json` o `netlify.toml` será detectado automáticamente y desplegará la plataforma completa sin ninguna configuración adicional.

¡Mucho éxito en la presentación del proyecto!
