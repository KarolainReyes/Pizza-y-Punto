/**
 * Valida que un ID de MongoDB tenga 24 caracteres hexadecimales.
 * @param {string} id
 */
export function isValidObjectId(id) {
  return /^[a-f\d]{24}$/i.test(id);
}

/**
 * Verifica que un numero sea positivo.
 * @param {number} value
 * @param {string} fieldName
 */
export function validatePositiveNumber(value, fieldName = "Valor") {
  if (typeof value !== "number" || value <= 0) {
    throw new Error(`${fieldName} debe ser un número mayor que 0`);
  }
}

/**
 * Valida el nombre de una pizza (no vacio y minimo 3 caracteres).
 */
export function validatePizzaName(nombre) {
  if (!nombre || nombre.trim().length < 3) {
    throw new Error("El nombre de la pizza debe tener al menos 3 caracteres");
  }
}

/**
 * Valida el stock de un ingrediente.
 */
export function validateStock(stock) {
  if (!Number.isInteger(stock) || stock < 0) {
    throw new Error("El stock debe ser un número entero >= 0");
  }
}
