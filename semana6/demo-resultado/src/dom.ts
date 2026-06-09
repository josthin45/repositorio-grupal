import type { Producto } from "./types";
import { formatMoneda } from "./formatters";

function exigir<T extends HTMLElement>(selector: string): T {
    const el = document.querySelector<T>(selector);
    if (!el) throw new Error(`Falta el elemento ${selector}`);
    return el;
}

export const elementos = {
    form: exigir<HTMLFormElement>("form-producto"),
    nombre: exigir<HTMLInputElement>("#nombre"),
    precio: exigir<HTMLInputElement>("#precio"),
    stock: exigir<HTMLInputElement>("#stock"),
    categoria: exigir<HTMLSelectElement>("#categoria"),
    lista: exigir<HTMLUListElement>("#lista-productos"),
    contador: exigir<HTMLParagraphElement>("#contador")
};

export function mostrarError(idCampo: string, mensaje: string): void {
    const campo = document.getElementById(idCampo);
    const errorSpan = document.getElementById(`${idCampo}-error`);
    if (campo && errorSpan) {
        if (mensaje) {
            campo.classList.add("error");
            errorSpan.textContent = mensaje;
            errorSpan.style.display = "block";
        } else {
            campo.classList.remove("error");
            errorSpan.textContent = "";
            errorSpan.style.display = "none";
        }
    }
}

export function limpiarErrores(): void {
    const campos = ["nombre", "precio", "stock", "categoria"];
    campos.forEach(campo => mostrarError(campo, ""));
}

export function contarPorCategoria(items: Producto[]): Record<string, number> {
    const conteo: Record<string, number> = {};
    items.forEach(item => {
        conteo[item.categoria] = (conteo[item.categoria] || 0) + 1;
    });
    return conteo;
}

export function actualizarContador(productos: Producto[]): void {
    const conteo = contarPorCategoria(productos);
    const total = productos.length;
    elementos.contador.textContent = `Total: ${total} productos | ${Object.entries(conteo).map(([cat, num]) => `${cat}: ${num}`).join(", ")}`;
}

export function renderizar(productos: Producto[]): void {
    if (!elementos.lista) return;
    
    elementos.lista.innerHTML = "";
    
    productos.forEach((producto, index) => {
        const li = document.createElement("li");
        li.dataset.index = index.toString();
        li.innerHTML = `
            <span>${producto.nombre}</span>
            <span>${formatMoneda(producto.precio)}</span>
            <span>Stock: ${producto.stock}</span>
            <span>Categoría: ${producto.categoria}</span>
            <button class="eliminar" data-id="${index}">Eliminar</button>
        `;
        elementos.lista.appendChild(li);
    });
}