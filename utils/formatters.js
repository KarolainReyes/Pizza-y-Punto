/**
 * Formatea un número a moneda colombiana (COP).
 * @param {number} value
 * @returns {string}
 */
export function formatCurrency(value) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0
  }).format(value);
}

/**
 * Convierte una fecha de Mongo a formato legible.
 * @param {Date|string} date
 */
export function formatDate(date) {
  const d = date instanceof Date ? date : new Date(date);
  return d.toLocaleString("es-CO", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}

/**
 * Prepara una tabla de ingredientes para imprimir en consola.
 * @param {Array} ingredientes
 */
export function formatIngredientesTable(ingredientes) {
  return ingredientes.map(i => ({
    Nombre: i.nombre,
    Tipo: i.tipo,
    Stock: i.stock
  }));
}

/**
 * Formatea una pizza con precio en COP.
 * @param {Object} pizza
 */
export function formatPizza(pizza) {
  return `${pizza.nombre} (${pizza.categoria}) - ${formatCurrency(pizza.precio)}`;
}
