import type { Category } from "./types";
import { CATEGORIAS } from "./types";

export function validarNombre(valor: string): string {
    if (!valor.trim()) {
        throw new Error("El nombre es requerido");
    }
    if (valor.trim().length < 3) {
        throw new Error("El nombre debe tener al menos 3 caracteres");
    }
    return valor.trim();
}

export function validarPrecio(valor: string): number {
    const num = parseFloat(valor);
    if (isNaN(num)) {
        throw new Error("El precio debe ser un número");
    }
    if (num <= 0) {
        throw new Error("El precio debe ser mayor a 0");
    }
    return num;
}

export function validarStock(valor: string): number {
    const num = parseInt(valor, 10);
    if (isNaN(num)) {
        throw new Error("El stock debe ser un número entero");
    }
    if (num < 0) {
        throw new Error("El stock no puede ser negativo");
    }
    return num;
}

export function validarCategoria(valor: string): Category {
    if (!CATEGORIAS.includes(valor as Category)) {
        throw new Error(`Categoría inválida. Debe ser: ${CATEGORIAS.join(", ")}`);
    }
    return valor as Category;
}