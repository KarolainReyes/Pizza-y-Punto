export default class VerClientesCommand {
  constructor({ clienteService }) {
    this.clienteService = clienteService;
  }

  async execute() {
    console.clear();
    console.log("=== 👥 Ver Clientes ===");

    const clientes = await this.clienteService.listarClientes();
    if (!clientes || clientes.length === 0) {
      console.log("⚠️ No hay clientes registrados.");
      return;
    }

    clientes.forEach(c => {
      console.log(`- ${c.nombre} | Teléfono: ${c.telefono} | Zona: ${c.zona}`);
    });
  }
}
