import inquirer from "inquirer";
import { ObjectId } from "mongodb";
import PizzaService from "../services/PizzasService.js";
import IngredientesService from "../services/IngredientesService.js";

export default class AgregarPizzaCommand {
  constructor({ pizzaService, ingredientesService }) {
    if (!pizzaService || !ingredientesService) {
      throw new Error("Debes pasar pizzaService e ingredientesService correctamente");
    }
    this.pizzaService = pizzaService;
    this.ingredientesService = ingredientesService;
  }

  async execute() {
    console.clear();
    console.log("=== ➕ Agregar Pizza ===");

    const ingredientes = await this.ingredientesService.listarIngredientes();

    if (!ingredientes || ingredientes.length === 0) {
      console.log("⚠️ No hay ingredientes disponibles.");
      return;
    }

    const listaIngredientes = ingredientes.map(ing => ({
      name: `${ing.nombre} (Stock: ${ing.stock})`,
      value: ing._id.toString()  
    }));

    const answers = await inquirer.prompt([
      { type: "input", name: "nombre", message: "Nombre de la pizza:" },
      { type: "input", name: "categoria", message: "Categoría:" },
      { type: "number", name: "precio", message: "Precio:" },
      { type: "checkbox", name: "ingredientes", message: "Seleccione los ingredientes:", choices: listaIngredientes }
    ]);

    if (!answers.ingredientes || answers.ingredientes.length === 0) {
      console.log("⚠️ Debes seleccionar al menos un ingrediente.");
      return;
    }

    try {
      const ingredientesObjectId = answers.ingredientes.map(id => new ObjectId(id));

      await this.pizzaService.agregarPizza({
        nombre: answers.nombre,
        categoria: answers.categoria,
        precio: answers.precio,
        ingredientes: ingredientesObjectId
      });

      console.log("Pizza agregada con éxito");
    } catch (error) {
      console.log("Error al agregar pizza:", error);
    }
  }
}
