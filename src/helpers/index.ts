export function formatCurrency(amout: number) {
    return new Intl.NumberFormat('es-ES', {style: 'currency', currency: 'EUR'}).format(amout)
}