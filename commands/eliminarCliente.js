import inquirer from "inquirer";

export default class EliminarClienteCommand {
  constructor({ clienteService }) {
    this.clienteService = clienteService;
  }

  async execute() {
    console.clear();
    console.log("=== ❌ Eliminar Cliente ===");

    const clientes = await this.clienteService.listarClientes();
    if (!clientes || clientes.length === 0) {
      console.log("⚠️ No hay clientes registrados.");
      return;
    }

    const { clienteSeleccionado } = await inquirer.prompt([
      {
        type: "list",
        name: "clienteSeleccionado",
        message: "Seleccione un cliente para eliminar:",
        choices: clientes.map(c => ({ name: c.nombre, value: c._id }))
      }
    ]);

    try {
      await this.clienteService.eliminarCliente(clienteSeleccionado);
      console.log("✅ Cliente eliminado con éxito");
    } catch (err) {
      console.error("❌ Error al eliminar cliente:", err.message);
    }
  }
}
