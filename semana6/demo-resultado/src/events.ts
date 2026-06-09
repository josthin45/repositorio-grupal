import { actualizarContador, elementos, limpiarErrores, mostrarError, renderizar } from "./dom";
import type { Producto } from "./types";
import { validarCategoria, validarNombre, validarPrecio, validarStock } from "./validators";

const productos: Producto[] = [];

function refrescar(): void {
    renderizar(productos);
    actualizarContador(productos);
}

function registrarEnvio(): void {
    elementos.form.addEventListener("submit", (e) => {
        e.preventDefault();
        limpiarErrores();
        
        try {
            const nombreResult = validarNombre(elementos.nombre.value);
            const precioResult = validarPrecio(elementos.precio.value);
            const stockResult = validarStock(elementos.stock.value);
            const categoriaResult = validarCategoria(elementos.categoria.value);
            
            const nuevoProducto: Producto = {
                id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
                nombre: nombreResult,
                precio: precioResult,
                stock: stockResult,
                categoria: categoriaResult
            };
            
            productos.push(nuevoProducto);
            refrescar();
            elementos.form.reset();
        } catch (error) {
            if (error instanceof Error) {
                if (error.message.includes("nombre")) mostrarError("nombre", error.message);
                if (error.message.includes("precio")) mostrarError("precio", error.message);
                if (error.message.includes("stock")) mostrarError("stock", error.message);
                if (error.message.includes("categoría")) mostrarError("categoria", error.message);
            }
        }
    });
}

function registrarDelegacionEliminar(): void {
    elementos.lista.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains("eliminar")) {
            const index = target.dataset.id;
            if (index !== undefined) {
                productos.splice(parseInt(index), 1);
                refrescar();
            }
        }
    });
}

function registrarValidacionesReactivas(): void {
    elementos.nombre.addEventListener("input", () => {
        try {
            validarNombre(elementos.nombre.value);
            mostrarError("nombre", "");
        } catch (error) {
            if (error instanceof Error) mostrarError("nombre", error.message);
        }
    });
    
    elementos.precio.addEventListener("input", () => {
        try {
            validarPrecio(elementos.precio.value);
            mostrarError("precio", "");
        } catch (error) {
            if (error instanceof Error) mostrarError("precio", error.message);
        }
    });
    
    elementos.stock.addEventListener("input", () => {
        try {
            validarStock(elementos.stock.value);
            mostrarError("stock", "");
        } catch (error) {
            if (error instanceof Error) mostrarError("stock", error.message);
        }
    });
    
    elementos.categoria.addEventListener("change", () => {
        try {
            validarCategoria(elementos.categoria.value);
            mostrarError("categoria", "");
        } catch (error) {
            if (error instanceof Error) mostrarError("categoria", error.message);
        }
    });
}

export function iniciar(): void {
    registrarEnvio();
    registrarDelegacionEliminar();
    registrarValidacionesReactivas();
    refrescar();
}