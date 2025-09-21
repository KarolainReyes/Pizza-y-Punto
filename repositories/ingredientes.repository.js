import chalk from "chalk";
import {MongoClient} from "mongodb"

export default class IngredientesRepositorio {
    constructor(base, cliente) {
        this.coleccion = base.collection("ingredientes");
        this.cliente = cliente;
    }

    async listarTodos() {
        return await this.coleccion.find().toArray();
    }

    async editarStock(ingrediente) {
    const session = this.cliente.startSession();
    try {
        await session.withTransaction(async () => {
            const ingredienteEncontrado = await this.coleccion.findOne({ _id: ingrediente.id }, { session });
            if (!ingredienteEncontrado) throw new Error("Ingrediente no encontrado");

            await this.coleccion.updateOne(
                { _id: ingrediente.id },
                { $set: { stock: ingrediente.cantidad } },  // <-- usar ingrediente.cantidad
                { session }
            );

            console.log("Stock editado exitosamente");
        });
    } catch (error) {
        console.error("Error en la transacción:", error.message);
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

    async crearIngrediente(ingrediente) {
        return await this.coleccion.insertOne(ingrediente)
    }

    async eliminarIngrediente(ingrediente) {
        return await this.coleccion.deleteOne({_id:ingrediente.id});
    }

async buscarPorId(id) {
    return await this.coleccion.findOne({ _id: id });
}
}
