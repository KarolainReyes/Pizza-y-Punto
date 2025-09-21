import inquirer from "inquirer";

export default class EliminarPedidoCommand {
  constructor({ pedidoService } = {}) {
    this.pedidoService = pedidoService;
  }

  async execute() {
    console.clear();
    console.log("=== 🗑️ Eliminar Pedido ===");

    const pedidos = await this.pedidoService.listarPedidos();
    if (!pedidos || pedidos.length === 0) {
      console.log("⚠️ No hay pedidos registrados.");
      return;
    }

    const { pedidoSeleccionado } = await inquirer.prompt([
      {
        type: "list",
        name: "pedidoSeleccionado",
        message: "Seleccione el pedido a eliminar:",
        choices: pedidos.map(p => ({
          name: `Pedido ${p._id} - Total: $${p.total}`,
          value: p._id.toString()
        }))
      }
    ]);

    try {
      await this.pedidoService.eliminarPedido(pedidoSeleccionado);
      console.log("✅ Pedido eliminado con éxito");
    } catch (error) {
      console.error("❌ Error al eliminar pedido:", error.message);
    }
  }
}
