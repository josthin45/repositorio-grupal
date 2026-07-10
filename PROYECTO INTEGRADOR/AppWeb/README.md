# QuestiaSpace

Plataforma educativa para estudiar mediante cuestionarios, tarjetas didácticas y ejercicios de relación de conceptos.

Esta aplicación está construida utilizando una arquitectura de micro-frontends basados en iFrames y consta de:

- **Contenedora:** Desarrollada con Vite + Vanilla TypeScript. Encargada de login, layout principal (menú/navbar) e inyección de los módulos.
- **Módulo Quiz:** Desarrollado con Angular.
- **Módulo Matching:** Desarrollado con React.
- **Módulo Cards:** Desarrollado con Vue 3.
- **Backend:** Supabase (Auth, Postgres, RLS).

## Desarrollo e Inicialización (En progreso)

El proyecto se está desarrollando por fases:
1. Arquitectura y estructura base. (Completada)
2. Contenedora (Vite + Vanilla TS). (Pendiente)
3. Supabase (Tablas y Políticas RLS). (Pendiente)
4. Módulo Angular Quiz. (Pendiente)
5. Módulo React Matching. (Pendiente)
6. Módulo Vue Cards. (Pendiente)
7. Integración Final. (Pendiente)
8. Despliegue. (Pendiente)

## Variables de Entorno

Copie el archivo `.env.example` a `.env` y agregue las credenciales de Supabase correspondientes en todos los proyectos que lo requieran (o comparta las de la raíz).
