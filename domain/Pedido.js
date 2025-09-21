export default class Pedido {
  #estado; // Pendiente | En preparación | En camino | Entregado | Cancelado
  #fecha;
  #montoTotal;

  constructor(id, cliente, productos = []) {
    this.id = id;                 
    this.cliente = cliente;       
    this.productos = productos;   // Array de productos [{nombre, precio, cantidad}]
    this.#fecha = new Date();     // Fecha de creación
    this.#estado = 'Pendiente';   // Estado inicial
    this.#montoTotal = this.#calcularTotal();
  }

  // ======== GETTERS & SETTERS ========

  get estado() {
    return this.#estado;
  }

  set estado(nuevoEstado) {
    const estadosValidos = [
      'Pendiente',
      'En preparación',
      'En camino',
      'Entregado',
      'Cancelado'
    ];
    if (estadosValidos.includes(nuevoEstado)) {
      this.#estado = nuevoEstado;
    } else {
      throw new Error(`❌ Estado inválido. Use: ${estadosValidos.join(', ')}`);
    }
  }

  get fecha() {
    return this.#fecha;
  }

  get montoTotal() {
    return this.#montoTotal;
  }

  // ======== MÉTODOS DE NEGOCIO ========

  agregarProducto(producto) {
    // producto = { nombre, precio, cantidad }
    if (!producto.nombre || !producto.precio || !producto.cantidad) {
      throw new Error('❌ El producto debe tener nombre, precio y cantidad.');
    }
    this.productos.push(producto);
    this.#montoTotal = this.#calcularTotal();
  }

  eliminarProducto(nombreProducto) {
    const index = this.productos.findIndex(p => p.nombre === nombreProducto);
    if (index !== -1) {
      this.productos.splice(index, 1);
      this.#montoTotal = this.#calcularTotal();
    } else {
      throw new Error(`El producto "${nombreProducto}" no existe en el pedido.`);
    }
  }

  resumen() {
    const lista = this.productos
      .map(p => `${p.cantidad}x ${p.nombre} ($${p.precio})`)
      .join(', ');
    return `Pedido #${this.id} - ${this.cliente.nombre}\n` +
           `Estado: ${this.estado}\n` +
           `Productos: ${lista}\n` +
           `Total: $${this.montoTotal}`;
  }

  // ======== MÉTODO PRIVADO ========

  #calcularTotal() {
    return this.productos.reduce(
      (acc, p) => acc + p.precio * p.cantidad,
      0
    );
  }
}
