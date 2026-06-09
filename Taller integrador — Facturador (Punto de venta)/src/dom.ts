// ============================================================
// dom.ts — funciones de render. Reciben datos y pintan el HTML.
// (Manipulación del DOM ya vista en Semana 6; aquí ya viene lista.)
// ============================================================

import type { Cliente, Producto, LineaFactura, Totales } from "./types";

// Helper con narrowing: garantiza que el elemento existe y es HTMLElement.
function el(selector: string): HTMLElement {
  const nodo = document.querySelector(selector);
  if (!(nodo instanceof HTMLElement)) {
    throw new Error("No se encontró el elemento: " + selector);
  }
  return nodo;
}

export function renderClientes(clientes: Cliente[]): void {
  el("#lista-clientes").innerHTML = clientes
    .map(
      (c) => `
      <li class="cliente" data-id="${c.id}">
        <strong>${c.nombre}</strong>
        <span class="ruc">${c.ruc}</span>
      </li>`
    )
    .join("");
}

export function renderCatalogo(productos: Producto[]): void {
  el("#catalogo").innerHTML = productos
    .map(
      (p) => `
      <div class="producto">
        <div>
          <span class="nombre">${p.nombre}</span>
          <span class="categoria">${p.categoria}</span>
        </div>
        <span class="precio">$${p.precio.toFixed(2)}</span>
        <button class="btn-agregar" data-id="${p.id}">Agregar</button>
      </div>`
    )
    .join("");
}

export function renderFactura(lineas: LineaFactura[]): void {
  const cont = el("#lineas-factura");
  if (lineas.length === 0) {
    cont.innerHTML = `<tr><td colspan="5" class="vacio">Sin productos en la factura</td></tr>`;
    return;
  }
  cont.innerHTML = lineas
    .map(
      (l) => `
      <tr data-id="${l.producto.id}">
        <td>${l.producto.nombre}</td>
        <td>$${l.producto.precio.toFixed(2)}</td>
        <td class="cant">
          <button class="btn-menos" data-id="${l.producto.id}">−</button>
          <span class="cantidad">${l.cantidad}</span>
          <button class="btn-mas" data-id="${l.producto.id}">+</button>
        </td>
        <td>$${(l.producto.precio * l.cantidad).toFixed(2)}</td>
        <td><button class="btn-quitar" data-id="${l.producto.id}">✕</button></td>
      </tr>`
    )
    .join("");
}

export function renderTotales(totales: Totales): void {
  el("#subtotal").textContent = "$" + totales.subtotal.toFixed(2);
  el("#iva").textContent = "$" + totales.iva.toFixed(2);
  el("#total").textContent = "$" + totales.total.toFixed(2);
}

export function renderClienteSeleccionado(cliente: Cliente | null): void {
  el("#cliente-actual").textContent = cliente
    ? `${cliente.nombre} — ${cliente.ruc}`
    : "Ningún cliente seleccionado";
}

// Muestra/oculta un mensaje de estado (cargando / error).
export function mostrarMensaje(texto: string): void {
  const m = el("#mensaje");
  m.textContent = texto;
  m.style.display = texto === "" ? "none" : "block";
}
