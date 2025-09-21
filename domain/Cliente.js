export default class Cliente {
  #telefono;

  constructor(nombre, telefono, zona) {
    this.nombre = nombre;
    this.#telefono = telefono;
    this.zona = zona;     
  }

  set telefono(nuevoTelefono) {
    const soloNumeros = String(nuevoTelefono).replace(/\D/g, '');
    if (soloNumeros.length >= 7) {
      this.#telefono = soloNumeros;
    } else {
      throw new Error('❌ Teléfono inválido (debe tener al menos 7 dígitos)');
    }
  }

  get telefono() {
    return this.#telefono;
  }

  agregarPedido(pedido) {
    this.pedidos.push(pedido);
  }

  historialPedidos() {
    return this.pedidos.length === 0
      ? `${this.nombre} no tiene pedidos registrados.`
      : `Pedidos de ${this.nombre}: ${this.pedidos.join(', ')}`;
  }

}
