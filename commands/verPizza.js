import inquirer from "inquirer";

export default class VerPizzasCommand {
  constructor({ pizzaService } = {}) {
    if (!pizzaService) throw new Error("Se requiere pizzaService");
    this.pizzaService = pizzaService;
  }

  async execute() {
    console.clear();
    console.log("=== 🍕 Listado de Pizzas ===");

    try {
      const pizzas = await this.pizzaService.listarPizzas();

      if (!pizzas || pizzas.length === 0) {
        console.log("⚠️ No hay pizzas registradas.");
        return;
      }

      pizzas.forEach((p, i) => {
        console.log(
          `${i + 1}. ${p.nombre} | Categoría: ${p.categoria} | Precio: $${p.precio} | Ingredientes: ${p.ingredientes.join(", ")}`
        );
      });

      // Pausa antes de volver al menú
      await inquirer.prompt([
        {
          type: "input",
          name: "enter",
          message: "Presione ENTER para continuar..."
        }
      ]);
    } catch (error) {
      console.error("❌ Error al listar pizzas:", error.message);
    }
  }
}
