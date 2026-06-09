// ============================================================
// validadores.ts — type predicates (HITO 3)
// ============================================================

import type { Cliente, Producto } from "./types";

// HITO 3 · GUIADO: la guía te lleva paso a paso a completar este predicado.
export function esCliente(x: unknown): x is Cliente {
  return (
    typeof x === "object" &&
    x !== null &&
    typeof (x as Cliente).id === "number" &&
    typeof (x as Cliente).nombre === "string" &&
    typeof (x as Cliente).ruc === "string" &&
    typeof (x as Cliente).email === "string"
  );
}

// HITO 3 · REPLICA: haz exactamente lo mismo que esCliente,
// pero con los campos de Producto (id, nombre, precio, categoria).
export function esProducto(x: unknown): x is Producto {
  return (
    typeof x === "object" &&
    x !== null &&
    typeof (x as Producto).id === "number" &&
    typeof (x as Producto).nombre === "string" &&
    typeof (x as Producto).precio === "number" &&
    typeof (x as Producto).categoria === "string"
  );


}
