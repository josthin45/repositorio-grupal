// ─────────────────────────────────────────────────────────────
//  main.ts · Sesión 1 — Semana 6 (resultado final)
//
//  Lo que construimos en clase:
//    1. Selección tipada de elementos del DOM (con manejo de null).
//    2. Lectura segura de inputs (siempre devuelven string).
//    3. Conexión con la librería de validadores de Semana 5.
//    4. Escritura de errores específicos bajo cada campo.
//    5. Creación dinámica de elementos en la lista.
//
//  IMPORTANTE: cada querySelector debe declarar QUÉ TIPO espera.
//  Esto NO es opcional en modo strict.
// ─────────────────────────────────────────────────────────────

import {
  validarNombre,
  validarPrecio,
  validarStock,
  validarCategoria,
  formatearMoneda,
  type Resultado,
  type Categoria,
} from "./validators.ts";

// ─────────────────────────────────────────────────────────────
//  Tipo del dominio
// ─────────────────────────────────────────────────────────────
type Producto = {
  id: string;
  nombre: string;
  precio: number;
  stock: number;
  categoria: Categoria;
};



// ─────────────────────────────────────────────────────────────
//  Estado local (sin frameworks, sin librerías)
// ─────────────────────────────────────────────────────────────
const productos: Producto[] = [];

function eliminarProducto(id: string): void {
  // 1. Encuentra el índice del producto en el array
  const indice = productos.findIndex((p) => p.id === id);
  if (indice === -1) return; // no existe, salir silencioso
  // 2. Lo quita del array
  productos.splice(indice, 1);
  // 3. Lo quita del DOM
  const li = lista.querySelector(`li [data-id="${id}"]`)?.closest("li");
  if (li) li.remove();
  // 4. Si la lista quedó vacía, vuelve a mostrar el mensaje
  if (productos.length === 0) {
    estadoVacio.classList.remove("oculto");
  
  } 
  actualizarContador();
}

function contarPorCategoria(items: Producto[]): Record<Categoria, number> {
  const conteo: Record<Categoria, number> = {
    electronica: 0,
    ropa: 0,
    alimentos: 0,
  };
  for (const p of items) {
    conteo[p.categoria] = conteo[p.categoria] + 1;
  }
  return conteo;
}



// ─────────────────────────────────────────────────────────────
//  Selección tipada de elementos
//
//  Patrón canónico de la semana:
//    1. querySelector<TipoEsperado>(selector)
//    2. Verificar null con if (!elemento) throw ...
//    3. A partir de ahí TypeScript sabe que el tipo es seguro.
// ─────────────────────────────────────────────────────────────
const form = document.querySelector<HTMLFormElement>("#form-producto");
const inputNombre = document.querySelector<HTMLInputElement>("#nombre");
const inputPrecio = document.querySelector<HTMLInputElement>("#precio");
const inputStock = document.querySelector<HTMLInputElement>("#stock");
const selectCategoria = document.querySelector<HTMLSelectElement>("#categoria");
const lista = document.querySelector<HTMLUListElement>("#lista-productos");
const estadoVacio = document.querySelector<HTMLParagraphElement>("#estado-vacio");



// Guarda de null: si falta cualquier elemento crítico, abortamos
// con un error claro en consola. Mejor fallar pronto que silencioso.
if (
  !form ||
  !inputNombre ||
  !inputPrecio ||
  !inputStock ||
  !selectCategoria ||
  !lista ||
  !estadoVacio
) {
  throw new Error("Faltan elementos en el HTML. Revisa los id.");
}

function actualizarContador(): void {
  const conteo = contarPorCategoria(productos);

  const items = document.querySelectorAll<HTMLSpanElement>(".contador-item");
  items.forEach((item) => {
    const cat = item.dataset.cat as Categoria;
    const label = cat.charAt(0).toUpperCase() + cat.slice(1);
    item.textContent = `${label}: ${conteo[cat]}`;
  });
}

// ─────────────────────────────────────────────────────────────
//  Helper: muestra u oculta el error bajo un campo
//
//  Recibe el id del <p class="error"> y el mensaje a mostrar.
//  Si el mensaje es string vacío, limpia el error.
// ─────────────────────────────────────────────────────────────
function mostrarError(idCampo: string, mensaje: string): void {
  const p = document.querySelector<HTMLParagraphElement>(`#error-${idCampo}`);
  if (!p) return; // si no existe, no hacemos nada (no es crítico)
  p.textContent = mensaje;

  // Resaltamos el .campo padre cuando hay error
  const campoPadre = p.parentElement;
  if (campoPadre) {
    campoPadre.classList.toggle("invalido", mensaje.length > 0);
  }
}

// Limpia los 4 mensajes de error en una sola pasada
function limpiarErrores(): void {
  mostrarError("nombre", "");
  mostrarError("precio", "");
  mostrarError("stock", "");
  mostrarError("categoria", "");
}

// ─────────────────────────────────────────────────────────────
//  Render de un producto en la lista
//
//  Patrón: createElement tipado en lugar de innerHTML.
//  Por qué: innerHTML con datos de usuario abre la puerta a XSS.
//  Aquí los datos ya están validados, pero practicamos el hábito.
// ─────────────────────────────────────────────────────────────
function renderProducto(p: Producto): HTMLLIElement {
  const li = document.createElement("li");
  li.className = "producto";

  const nombre = document.createElement("span");
  nombre.className = "nombre";
  nombre.textContent = p.nombre;

  const precio = document.createElement("span");
  precio.className = "precio";
  precio.textContent = formatearMoneda(p.precio);

  const meta = document.createElement("span");
  meta.className = "meta";

  const tag = document.createElement("span");
  tag.className = "categoria-tag";
  tag.textContent = p.categoria;

  const stock = document.createElement("span");
  stock.textContent = ` Stock: ${p.stock} unidades`;

  meta.appendChild(tag);
  meta.appendChild(stock);

  li.appendChild(nombre);
  li.appendChild(precio);
  li.appendChild(meta);

  const botonEliminar = document.createElement("button");
  botonEliminar.type = "button";
  botonEliminar.className = "btn-eliminar";
  botonEliminar.textContent = "Eliminar";
  botonEliminar.dataset.id = p.id; // ← clave: vincula DOM ↔ datos
  botonEliminar.addEventListener("click", () => {
    eliminarProducto(p.id);
  });
  li.appendChild(botonEliminar);

  return li;
}



// ─────────────────────────────────────────────────────────────
//  Helper genérico: desempaqueta un Resultado o devuelve null
//
//  Esto encapsula la unión discriminada: si es 'ok' devuelve el
//  valor; si es 'error' muestra el mensaje bajo el campo y
//  devuelve null para que el llamador sepa que falló.
// ─────────────────────────────────────────────────────────────
function tomar<T>(resultado: Resultado<T>, idCampo: string): T | null {
  if (resultado.tipo === "ok") {
    mostrarError(idCampo, "");
    return resultado.valor;
  }
  mostrarError(idCampo, resultado.mensaje);
  return null;
}

// ─────────────────────────────────────────────────────────────
//  Handler del submit
//
//  Flujo:
//    1. preventDefault para que el form no recargue la página.
//    2. Limpiar errores anteriores.
//    3. Leer los 4 campos (siempre como string).
//    4. Validar cada uno con la librería de S5.
//    5. Si los 4 son 'ok' → crear producto y agregar a la lista.
// ─────────────────────────────────────────────────────────────
form.addEventListener("submit", (evento) => {
  evento.preventDefault();
  limpiarErrores();

  // Los 4 valores siempre son string. Esa es una regla del DOM.
  // type="number" en el HTML NO cambia el tipo en JS.
  const valorNombre = inputNombre.value;
  const valorPrecio = inputPrecio.value;
  const valorStock = inputStock.value;
  const valorCategoria = selectCategoria.value;

  const nombre = tomar(validarNombre(valorNombre), "nombre");
  const precio = tomar(validarPrecio(valorPrecio), "precio");
  const stock = tomar(validarStock(valorStock), "stock");
  const categoria = tomar(validarCategoria(valorCategoria), "categoria");

  // Si alguno falló, no continuamos. Los mensajes ya están visibles.
  if (
    nombre === null ||
    precio === null ||
    stock === null ||
    categoria === null
  ) {
    return;
  }

  // Caso feliz: construimos el producto y lo agregamos.
  const nuevo: Producto = { id: crypto.randomUUID(), nombre, precio, stock, categoria };
  productos.push(nuevo);
  const li = renderProducto(nuevo);
  lista.appendChild(li);
  actualizarContador();

  // Ocultamos el mensaje de "aún no hay productos"
  estadoVacio.classList.add("oculto");

  // Limpiamos el formulario para el próximo
  form.reset();
  inputNombre.focus();
});

console.log("App lista. Probá agregar productos. ✋");
