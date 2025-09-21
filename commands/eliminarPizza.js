import inquirer from "inquirer";

export default class EliminarPizzaCommand {
  constructor({ pizzaService } = {}) {
    this.pizzaService = pizzaService;
  }

  async execute() {
    console.clear();
    console.log("=== 🗑️ Eliminar Pizza ===");

    const pizzas = await this.pizzaService.listarPizzas();
    if (!pizzas || pizzas.length === 0) {
      console.log("⚠️ No hay pizzas registradas.");
      return;
    }

    const { pizzaSeleccionada } = await inquirer.prompt([
      {
        type: "list",
        name: "pizzaSeleccionada",
        message: "Seleccione la pizza a eliminar:",
        choices: pizzas.map(p => ({
          name: `${p.nombre} - $${p.precio}`,
          value: p._id.toString()
        }))
      }
    ]);

    try {
      await this.pizzaService.eliminarPizza(pizzaSeleccionada);
      console.log("✅ Pizza eliminada con éxito");
    } catch (error) {
      console.error("❌ Error al eliminar pizza:", error.message);
    }
  }
}
