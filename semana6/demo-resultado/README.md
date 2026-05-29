# Mini App de Productos · Semana 6 (Demo resultado)

Este es el **estado final de la Sesión 1** del martes 26 de mayo.

Es la app que el docente proyecta al final de la clase, con
todo lo que se construyó paso a paso en el live coding.

## ¿Qué quedó construido?

- ✅ Selección tipada de los 6 elementos del DOM con manejo de `null`.
- ✅ Submit del formulario con `preventDefault`.
- ✅ Lectura de los 4 inputs (siempre como `string`).
- ✅ Validación con la librería de Semana 5 (función helper `tomar` que envuelve la unión discriminada).
- ✅ Errores específicos bajo cada campo con `textContent` (no innerHTML).
- ✅ Resaltado del campo inválido con `classList.toggle`.
- ✅ Creación de productos con `createElement` + `appendChild`.
- ✅ Ocultamiento del estado "vacío" cuando ya hay productos.
- ✅ Reset del formulario y focus de nuevo en nombre.

## Lo que NO está aún (eso es Semana 7)

- ❌ Eliminar productos individuales (taller del viernes 29).
- ❌ Validación en tiempo real mientras el usuario escribe.
- ❌ Event delegation.
- ❌ Refactor a módulos `dom.ts`, `events.ts`, `types.ts`.

## Cómo arrancar

```bash
npm install
npm run dev
```

Abre http://localhost:5173 y prueba con casos válidos e inválidos.
Prueba también el caso "todo bien" para ver la lista crecer.
