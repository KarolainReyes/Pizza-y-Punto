import inquirer from "inquirer";

export default class AgregarClienteCommand {
  constructor({ clienteService }) {
    this.clienteService = clienteService;
  }

  async execute() {
    console.clear();
    console.log("=== ➕ Agregar Cliente ===");

    const answers = await inquirer.prompt([
      { type: "input", name: "nombre", message: "Nombre del cliente:" },
      { type: "input", name: "telefono", message: "Teléfono del cliente:" },
      { type: "input", name: "zona", message: "Zona del cliente:" }
    ]);

    try {
      await this.clienteService.agregarCliente({nombre:answers.nombre,telefono:answers.telefono,zona:answers.zona});
      console.log("✅ Cliente agregado con éxito");
    } catch (err) {
      console.error("❌ Error al agregar cliente:", err.message);
    }
  }
}
