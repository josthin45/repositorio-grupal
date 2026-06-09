export function formatMoneda(n: number): string {
    return new Intl.NumberFormat("es-ec", {
        style: "currency",
        currency: "USD",
    }).format(n);
}