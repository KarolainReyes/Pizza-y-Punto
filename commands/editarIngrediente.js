import inquirer from "inquirer";

export default class EditarIngredienteCommand {
  constructor({ ingredientesService }) {
    this.ingredientesService = ingredientesService;
  }

  async execute() {
    try {
      const ingredientes = await this.ingredientesService.listarIngredientes();
      if (ingredientes.length === 0) {
        console.log("No hay ingredientes para editar");
        return;
      }

      const { id } = await inquirer.prompt([
        {
          type: "list",
          name: "id",
          message: "Seleccione el ingrediente para editar su stock:",
          choices: ingredientes.map(i => ({ name: `${i.nombre} (Stock: ${i.stock})`, value: i._id.toString() }))
        }
      ]);

      const { stock } = await inquirer.prompt([
        {
          name: "stock",
          message: "Nuevo stock:",
          validate: input => !isNaN(input) && Number(input) >= 0
        }
      ]);

      await this.ingredientesService.editarIngrediente(id, { stock: Number(stock) });
      console.log("✅ Stock actualizado correctamente");
    } catch (error) {
      console.error("❌ Error al editar ingrediente:", error.message);
    }
  }
}
