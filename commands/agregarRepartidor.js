import inquirer from "inquirer";

export default class AgregarRepartidorCommand {
  constructor({ repartidorService }) {
    this.repartidorService = repartidorService;
  }

  async execute() {
    console.clear();
    console.log("=== ➕ Agregar Repartidor ===");

    const answers = await inquirer.prompt([
      { type: "input", name: "nombre", message: "Nombre:" },
      { type: "input", name: "zona", message: "Zona:" },
      { type: "list", name: "estado", message: "Estado inicial:", choices: ["Disponible", "Ocupado"] }
    ]);

    try {
      await this.repartidorService.agregarRepartidor({
        nombre: answers.nombre,
        zona: answers.zona,
        estado: answers.estado
      });
      console.log("Repartidor agregado con éxito ✅");
    } catch (err) {
      console.error("Error al agregar repartidor:", err.message);
    }
  }
}
