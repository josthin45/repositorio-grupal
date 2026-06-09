// ============================================================
// calculos.ts — métodos funcionales (HITO 2)
// Ninguna de estas funciones toca el DOM ni muta sus entradas.
// ============================================================

import type { Cliente, Producto, LineaFactura, Totales } from "./types";

const IVA = 0.15; // Tarifa general del IVA en Ecuador (2026)

// HITO 2 · GUIADO: filter sobre clientes (por nombre o RUC).
export function buscarClientes(clientes: Cliente[], texto: string): Cliente[] {
  const q = texto.trim().toLowerCase();
  if (q === "") return clientes;
  return clientes.filter(
    (c) => c.nombre.toLowerCase().includes(q) || c.ruc.includes(q)
)

}

// HITO 2 · REPLICA: lo mismo que buscarClientes, pero por nombre de producto.
export function buscarProductos(productos: Producto[], texto: string): Producto[] {
  const q = texto.trim().toLowerCase();
  if (q === "") return productos;
  return productos.filter(
    (p) => p.nombre.toLowerCase().includes(q) || p.id.toString().includes(q)
  );
}

// HITO 2 · GUIADO: find + map. ¿Ya está el producto? +1; si no, agregarlo.
export function agregarProducto(lineas: LineaFactura[], producto: Producto): LineaFactura[] {
  const existente = lineas.find((l) => l.producto.id === producto.id);
  if (existente) {
    return lineas.map((l) =>
      l.producto.id === producto.id ? { ...l, cantidad: l.cantidad + 1 } : l
    );
  }
  return [...lineas, { producto, cantidad: 1 }];
}

// HITO 2 · GUIADO: reduce. Subtotal en una pasada; de ahí IVA y total.
export function calcularTotales(lineas: LineaFactura[]): Totales {
  const subtotal = lineas.reduce(
    (acc, linea) => acc + linea.producto.precio * linea.cantidad,
    0
  );
  const iva = subtotal * IVA;
  const total = subtotal + iva;
  return { subtotal, iva, total };  
}

export function ordenarProductosPorPrecioAscendente (productos: Producto[]): Producto[] {
  return productos.sort((a, b) => a.precio - b.precio);
}

export function ordenarProductosPorPrecioDescendente(productos: Producto[]): Producto[] {
  return productos.sort((a, b) => b.precio - a.precio);
}