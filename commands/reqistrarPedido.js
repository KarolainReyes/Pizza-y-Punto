import inquirer from "inquirer";
import RealizarPedidoService from "../services/PedidosService.js";

export default class RegistrarPedidoCommand {
  constructor({ pedidoService = new RealizarPedidoService() } = {}) {
    this.pedidoService = pedidoService;
  }

  async execute() {
    console.clear();
    console.log("=== 📝 Registrar Pedido ===");

    const { clienteId } = await inquirer.prompt([
      { type: "input", name: "clienteId", message: "ID del cliente:" }
    ]);

    const { pizzas } = await inquirer.prompt([
      { type: "input", name: "pizzas", message: "IDs de pizzas (coma separada):" }
    ]);

    try {
      await this.pedidoService.realizarPedido(clienteId, pizzas.split(","));
      console.log("✅ Pedido registrado con éxito");
    } catch (err) {
      console.error("❌ Error al registrar pedido:", err.message);
    }
  }
}
