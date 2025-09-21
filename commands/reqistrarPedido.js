import inquirer from "inquirer";
import { ObjectId } from "mongodb";


export default class RegistrarPedidoCommand {
  constructor({ pedidoService, pizzaService, repartidoresService, clienteService } = {}) {
    this.pedidoService = pedidoService;
    this.pizzaService = pizzaService;
    this.repartidoresService = repartidoresService;
    this.clienteService = clienteService;
  }

  async execute() {
    console.clear();
    console.log("=== 📝 Registrar Pedido ===");

    const clientes = await this.clienteService.listarClientes();
    if (!clientes || clientes.length === 0) {
      console.log("⚠️ No hay clientes registrados.");
      return;
    }
    const { clienteSeleccionado } = await inquirer.prompt([
      {
        type: "list",
        name: "clienteSeleccionado",
        message: "Seleccione un cliente:",
        choices: clientes.map(c => ({
          name: c.nombre,
          value: c 
        }))
      }
    ]);

    // Listar pizzas
    const listaPizzas = await this.pizzaService.listarPizzas();
    if (!listaPizzas || listaPizzas.length === 0) {
      console.log("⚠️ No hay pizzas disponibles.");
      return;
    }

    // Opciones para el checkbox (cada pizza solo una vez)
    const pizzasOpciones = listaPizzas.map(p => ({
      name: p.nombre,
      value: p._id.toString()
    }));
    
    // Selección de pizzas (múltiples)
    const { pizzas } = await inquirer.prompt([
      {
        type: "checkbox",
        name: "pizzas",
        message: "Seleccione las pizzas que desea (una de cada tipo):",
        choices: pizzasOpciones
      }
    ]);

    if (!pizzas || pizzas.length === 0) {
      console.log("⚠️ Debes seleccionar al menos una pizza.");
      return;
    }

    // Ejecutar pedido
    try {
      const pizzasObjectId = pizzas.map(id => new ObjectId(id));
      await this.pedidoService.realizarPedido(clienteSeleccionado, pizzasObjectId);
      console.log("✅ Pedido registrado con éxito");
    } catch (err) {
      console.error("❌ Error al registrar pedido:", err.message);
    }
  }
}
