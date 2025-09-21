
export default class Pedido {

  constructor({ clienteId, pizzas, total, repartidorId = null, fecha = new Date() }) {
    if (!clienteId) throw new Error('Pedido: clienteId es requerido');
    if (!Array.isArray(pizzas) || pizzas.length === 0) throw new Error('Pedido: pizzas requeridas');
    if (typeof total !== 'number' || total <= 0) throw new Error('Pedido: total inválido');

    this.clienteId = clienteId;
    this.pizzas = pizzas;
    this.total = total;
    this.repartidorId = repartidorId;
    this.fecha = fecha;
  }

  asignarRepartidor(repartidorId) {
    this.repartidorId = repartidorId;
  }
}
