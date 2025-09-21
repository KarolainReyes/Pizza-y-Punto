import inquirer from "inquirer";

export default class EliminarRepartidorCommand {
  constructor({ repartidorService }) {
    this.repartidorService = repartidorService;
  }

  async execute() {
    console.clear();
    console.log("=== 🗑 Eliminar Repartidor ===");

    const repartidores = await this.repartidorService.listarRepartidores();
    if (!repartidores || repartidores.length === 0) {
      console.log("⚠️ No hay repartidores registrados.");
      return;
    }

    const { repartidorId } = await inquirer.prompt([
      {
        type: "list",
        name: "repartidorId",
        message: "Seleccione un repartidor para eliminar:",
        choices: repartidores.map(r => ({ name: `${r.nombre} (${r.zona}) - ${r.estado}`, value: r._id.toString() }))
      }
    ]);

    try {
      await this.repartidorService.eliminarRepartidor(repartidorId);
      console.log("Repartidor eliminado ✅");
    } catch (err) {
      console.error("Error al eliminar repartidor:", err.message);
    }
  }
}
