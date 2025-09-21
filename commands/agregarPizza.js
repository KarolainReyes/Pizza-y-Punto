
import inquirer from "inquirer";
import PizzaService from "";

export default class AgregarPizzaCommand {
  constructor({ pizzaService = new PizzaService() } = {}) {
    this.pizzaService = pizzaService;
  }

  async execute() {
    console.clear();
    console.log("=== ➕ Agregar Pizza ===");

    const answers = await inquirer.prompt([
      { type: "input", name: "nombre", message: "Nombre de la pizza:" },
      { type: "input", name: "categoria", message: "Categoría:" },
      { type: "number", name: "precio", message: "Precio:" },
      { type: "input", name: "ingredientes", message: "IDs de ingredientes (coma separada):" }
    ]);

    try {
      await this.pizzaService.agregarPizza({
        nombre: answers.nombre,
        categoria: answers.categoria,
        precio: answers.precio,
        ingredientes: answers.ingredientes.split(",")
      });
      console.log("✅ Pizza agregada con éxito");
    } catch (error) {
      console.log("❌ Error al agregar pizza:", error);
    }
  }
}
