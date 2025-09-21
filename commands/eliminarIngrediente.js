import inquirer from "inquirer";

export default class EliminarIngredienteCommand {
  constructor({ ingredientesService }) {
    this.ingredientesService = ingredientesService;
  }

  async execute() {
    try {
      const ingredientes = await this.ingredientesService.listarIngredientes();
      if (ingredientes.length === 0) {
        console.log("No hay ingredientes para eliminar");
        return;
      }

      const { id } = await inquirer.prompt([
        {
          type: "list",
          name: "id",
          message: "Seleccione el ingrediente a eliminar:",
          choices: ingredientes.map(i => ({ name: `${i.nombre} (Stock: ${i.stock})`, value: i._id.toString() }))
        }
      ]);

      await this.ingredientesService.eliminarIngrediente(id);
      console.log("✅ Ingrediente eliminado correctamente");
    } catch (error) {
      console.error("❌ Error al eliminar ingrediente:", error.message);
    }
  }
}
