
export default class Pizza {

  constructor({ nombre, categoria, precio, ingredientes }) {
    if (!nombre || !categoria) 
        throw new Error('Pizza: nombre y categoría son requeridos');
    if (typeof precio !== 'number' || precio <= 0) 
        throw new Error('Pizza: precio inválido');
    if (!Array.isArray(ingredientes) || ingredientes.length === 0)
        throw new Error('Pizza: ingredientes requeridos');

    this.nombre = nombre;
    this.categoria = categoria;
    this.precio = precio;
    this.ingredientes = ingredientes;
  }

  agregarIngrediente(ingrediente) {
    this.ingredientes.push(ingrediente);
  }

  descripcion() {
    return `${this.nombre} (${this.tamaño}) con: ${this.ingredientes.join(', ')}`;
  }
}
