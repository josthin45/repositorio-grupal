export type Category = "Bebidas" | "Snacks" | "Lacteos" | "Panaderia";

export interface Producto {
    id: string;
    nombre: string;
    precio: number;
    stock: number;
    categoria: Category;
}

export type Resultado<T> = 
    | { ok: true; valor: T;} 
    | { ok: false; error: string;};

export const CATEGORIAS: readonly Category[] = [
    "Bebidas",
    "Snacks",
    "Lacteos",
    "Panaderia",
];