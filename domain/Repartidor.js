export default class Repartidor {
  #correo;
  #telefono;
  #estado; // Disponible | Ocupado | Fuera de servicio

  constructor(nombre, correo, telefono, vehiculo = 'moto') {
    this.nombre = nombre;
    this.vehiculo = vehiculo;    // Tipo de transporte
    this.pedidosAsignados = [];  // Lista de pedidos en curso
    this.#correo = correo;        
    this.#telefono = telefono;    
    this.#estado = 'Disponible';  // Estado inicial
  }

  // ======== GETTERS & SETTERS CON VALIDACIÓN ========

  set correo(nuevoCorreo) {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nuevoCorreo)) {
      this.#correo = nuevoCorreo;
    } else {
      throw new Error('❌ Correo electrónico inválido');
    }
  }

  get correo() {
    return this.#correo;
  }

  set telefono(nuevoTelefono) {
    const soloNumeros = String(nuevoTelefono).replace(/\D/g, '');
    if (soloNumeros.length >= 7) {
      this.#telefono = soloNumeros;
    } else {
      throw new Error('❌ Teléfono inválido (mínimo 7 dígitos)');
    }
  }

  get telefono() {
    return this.#telefono;
  }

  set estado(nuevoEstado) {
    const estadosValidos = ['Disponible', 'Ocupado', 'Fuera de servicio'];
    if (estadosValidos.includes(nuevoEstado)) {
      this.#estado = nuevoEstado;
    } else {
      throw new Error(`❌ Estado inválido. Use: ${estadosValidos.join(', ')}`);
    }
  }

  get estado() {
    return this.#estado;
  }

  // ======== MÉTODOS DE NEGOCIO ========

  asignarPedido(pedido) {
    this.pedidosAsignados.push(pedido);
    this.estado = 'Ocupado';
  }

  entregarPedido(pedido) {
    const index = this.pedidosAsignados.indexOf(pedido);
    if (index !== -1) {
      this.pedidosAsignados.splice(index, 1);
      if (this.pedidosAsignados.length === 0) {
        this.estado = 'Disponible';
      }
    } else {
      throw new Error(`El pedido "${pedido}" no está asignado a ${this.nombre}.`);
    }
  }

  listarPedidos() {
    return this.pedidosAsignados.length === 0
      ? `${this.nombre} no tiene pedidos asignados.`
      : `Pedidos de ${this.nombre}: ${this.pedidosAsignados.join(', ')}`;
  }
}

