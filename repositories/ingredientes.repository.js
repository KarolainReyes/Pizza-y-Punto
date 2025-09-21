import chalk from "chalk";

export default class IngredientesRepositorio {
    constructor(base, cliente) {
        this.coleccion = base.collection("ingredientes");
        this.cliente = cliente;
    }

    async listarTodos() {
        return await this.coleccion.find().toArray();
    }

    async restarSiHay(id, cantidad) {
        const session = this.cliente.startSession();
        try {
            await session.withTransaction(async () => {
                const ingrediente = await this.coleccion.findOne({ _id: id }, { session });
                if (!ingrediente) { throw new Error("Ingrediente no encontrado"); }
                if (ingrediente.stock < cantidad) { throw new Error("Stock insuficiente"); }
                await this.coleccion.updateOne(
                    { _id: id },
                    { $inc: { stock: -cantidad } },
                    { session }
                );
                console.log(chalk.green("Ingredientes restados exitosamente"));
            });
        } catch (error) {
            console.error(chalk.red("Error en la transacción:"), error.message);
        } finally {
            await session.endSession();
        }
    }

    async añadirIngredientes(id, cantidad) {
        const session = this.cliente.startSession();
        try {
            await session.withTransaction(async () => {
                const ingrediente = await this.coleccion.findOne({ _id: id }, { session });
                if (!ingrediente) { throw new Error("Ingrediente no encontrado"); }
                await this.coleccion.updateOne(
                    { _id: id },
                    { $inc: { stock: +cantidad } },
                    { session }
                );
                console.log(chalk.green("Ingredientes añadidos exitosamente"));
            });
        } catch (error) {
            console.error(chalk.red("Error en la transacción:"), error.message);
        } finally {
            await session.endSession();
        }
    }

    async restarVarios(listaIngredientes) {
        const session = this.cliente.startSession();
        try {
            await session.withTransaction(async () => {
                for (const { id, cantidad } of listaIngredientes) {
                    const ingrediente = await this.coleccion.findOne({ _id: id }, { session });
                    if (!ingrediente) { throw new Error("Ingrediente no encontrado"); }
                    if (ingrediente.stock < cantidad) { throw new Error("Stock insuficiente"); }
                    await this.coleccion.updateOne(
                        { _id: id },
                        { $inc: { stock: -cantidad } },
                        { session }
                    );
                }
            });
            console.log("Todos los ingredientes fueron restados con éxito");
        } catch (error) {
            console.error("Error al restar ingredientes:", error.message);
        } finally {
            await session.endSession();
        }
    }

    async crearIngrediente(nombre, tipo, cantidad) {
        try {
            const ingredienteNuevo = new Ingrediente(nombre, tipo, cantidad);
            const resultado = await this.coleccion.insertOne(ingredienteNuevo);

            console.log("Ingrediente creado correctamente");
        } catch (error) {
            console.error("Error al crear ingrediente:", error);
        }
    }

    async eliminarIngredientes(id) {
        try {
                await this.coleccion.deleteOne({ _id: id });
                console.log(chalk.green("Ingrediente eliminado exitosamente"));
        } catch (error) {
            console.error(chalk.red("Error en la transacción:"), error);
        } 
    }

    
}
