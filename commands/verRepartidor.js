export default class VerRepartidoresCommand {
  constructor({ repartidorService }) {  
    this.repartidoresService = repartidorService;
  }

  async execute() {
    console.clear();
    console.log("=== 👀 Lista de Repartidores ===");

    const repartidores = await this.repartidoresService.listarRepartidores();
    if (!repartidores || repartidores.length === 0) {
      console.log("⚠️ No hay repartidores registrados.");
      return;
    }

    repartidores.forEach(r => {
      console.log(`- ${r.nombre} | Zona: ${r.zona} | Estado: ${r.estado}`);
    });
  }
}
