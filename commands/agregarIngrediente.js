import inquirer from "inquirer";

export default class AgregarIngredienteCommand {
    constructor({ ingredientesService }) {
        this.ingredientesService = ingredientesService;
    }

    async execute() {
        try {
            const respuestas = await inquirer.prompt([
                { name: "nombre", message: "Nombre del ingrediente:" },
                { name: "tipo", message: "Tipo del ingrediente:" },
                { name: "stock", message: "Stock inicial:", validate: v => !isNaN(v) }
            ]);

            await this.ingredientesService.agregarIngrediente({
                nombre: respuestas.nombre,
                tipo: respuestas.tipo,
                stock: Number(respuestas.stock)
            });

            console.log("✅ Ingrediente agregado correctamente");
        } catch (error) {
            console.error("❌ Error al agregar ingrediente:", error.message);
        }
    }
}

