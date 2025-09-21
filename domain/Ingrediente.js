
export default class Ingrediente {
  
  constructor({ nombre, tipo, stock }) {
    if (!nombre || !tipo) 
        throw new Error('Ingrediente: nombre y tipo son requeridos');
    if (typeof stock !== 'number' || stock < 0) 
        throw new Error('Ingrediente: stock inválido');

    this.nombre = nombre;
    this.tipo = tipo;
    this.stock = stock;
  }

  descripcion() {
    return `${this.cantidad} ${this.unidad} de ${this.nombre}`;
  }

   actualizarCantidad(nuevaCantidad) {
    if (nuevaCantidad > 0) {
      this.cantidad = nuevaCantidad;
    } else {
      throw new Error('La cantidad debe ser mayor a 0.');
    }
}

  descontar(cantidad) {
    if (cantidad > this.stock) 
        throw new Error(`Stock insuficiente de ${this.nombre}`);
        this.stock -= cantidad;
  }

  
}
