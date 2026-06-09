// ============================================================
// types.ts — los "moldes" de datos de toda la app
// ============================================================

export interface Cliente {
  id: number;
  nombre: string;
  ruc: string;
  email: string;
}

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  categoria: string;
}

// Una línea de la factura: un producto y cuántas unidades.
export interface LineaFactura {
  producto: Producto;
  cantidad: number;
}

// Los tres números que muestra el pie de la factura.
export interface Totales {
  subtotal: number;
  iva: number;
  total: number;
}

// Estado de una carga desde el servidor (discriminated union):
// o está cargando, o falló con un mensaje, o llegó con datos.
export type EstadoCarga<T> =
  | { estado: "cargando" }
  | { estado: "error"; mensaje: string }
  | { estado: "listo"; datos: T };
