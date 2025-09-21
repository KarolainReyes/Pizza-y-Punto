export default class Cliente {
  #correo;
  #telefono;

  constructor(nombre, correo, telefono) {
    this.nombre = nombre;
    this.#correo = correo;       
    this.#telefono = telefono;   
    this.pedidos = [];
  }

  // ======== SETTERS/GETTERS PRIVADOS ========
  set correo(nuevoCorreo) {
    if (this.#validarCorreo(nuevoCorreo)) {
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
      throw new Error('❌ Teléfono inválido (debe tener al menos 7 dígitos)');
    }
  }

  get telefono() {
    return this.#telefono;
  }

  // ======== MÉTODOS PÚBLICOS ========
  agregarPedido(pedido) {
    this.pedidos.push(pedido);
  }

  historialPedidos() {
    return this.pedidos.length === 0
      ? `${this.nombre} no tiene pedidos registrados.`
      : `Pedidos de ${this.nombre}: ${this.pedidos.join(', ')}`;
  }

  // ======== MÉTODO PRIVADO ========
  #validarCorreo(correo) {
    // Regex simple para validar emails
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
  }
}
