import inquirer from "inquirer";

export default class VerPedidosCommand {
  constructor({ pedidoService } = {}) {
    if (!pedidoService) throw new Error("PedidoService es requerido");
    this.pedidoService = pedidoService;
  }

  async execute() {
    console.clear();
    console.log("=== 📜 Lista de Pedidos ===");

    try {
      const pedidos = await this.pedidoService.listarPedidos();

      if (!pedidos || pedidos.length === 0) {
        console.log("⚠️ No hay pedidos registrados.");
        return;
      }

      // Mostrar todos los pedidos con resumen simple
      pedidos.forEach((p, index) => {
        console.log(`\nPedido #${index + 1}`);
        console.log(`ID: ${p._id}`);
        console.log(`Cliente: ${p.clienteId}`);
        console.log(`Pizzas: ${p.pizzas.join(", ")}`);
        console.log(`Total: $${p.total}`);
        console.log(`Fecha: ${p.fecha}`);
        console.log(`Repartidor asignado: ${p.repartidorAsignado}`);
      });

      // Opcional: seleccionar un pedido para más detalles
      const { pedidoSeleccionado } = await inquirer.prompt([
        {
          type: "list",
          name: "pedidoSeleccionado",
          message: "Seleccione un pedido para más detalles:",
          choices: pedidos.map(p => ({
            name: `Pedido ${p._id} - $${p.total}`,
            value: p
          }))
        }
      ]);

      console.log("\n=== Detalle del Pedido Seleccionado ===");
      console.log(`ID: ${pedidoSeleccionado._id}`);
      console.log(`Cliente: ${pedidoSeleccionado.clienteId}`);
      console.log(`Pizzas: ${pedidoSeleccionado.pizzas.join(", ")}`);
      console.log(`Total: $${pedidoSeleccionado.total}`);
      console.log(`Fecha: ${pedidoSeleccionado.fecha}`);
      console.log(`Repartidor asignado: ${pedidoSeleccionado.repartidorAsignado}`);

    } catch (err) {
      console.error("❌ Error al listar pedidos:", err.message);
    }
  }
}
