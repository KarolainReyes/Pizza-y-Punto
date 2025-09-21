export default class VerIngredientesCommand {
  constructor({ ingredientesService }) {
    this.ingredientesService = ingredientesService;
  }

  async execute() {
    try {
      const ingredientes = await this.ingredientesService.listarIngredientes();

      if (ingredientes.length === 0) {
        console.log("No hay ingredientes registrados");
        return;
      }

      console.log("📋 Lista de Ingredientes:");
      ingredientes.forEach((i, index) => {
        console.log(`${index + 1}. ${i.nombre} | Tipo: ${i.tipo} | Stock: ${i.stock}`);
      });
    } catch (error) {
      console.error("❌ Error al obtener ingredientes:", error.message);
    }
  }
}
