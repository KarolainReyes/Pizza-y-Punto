import { ObjectId } from "mongodb";

export default class RepartidoresRepositorio {
    constructor(base) {
        this.coleccion = base.collection("repartidores");
    }

    async crear(repartidor) {
        return await this.coleccion.insertOne(repartidor);
    }

    async listarTodos() {
        return await this.coleccion.find().toArray();
    }

    async buscarPorId(id) {
        return await this.coleccion.findOne({ _id: new ObjectId(id) });
    }

    async actualizarEstado(id, estado, session = null) {
        return await this.coleccion.updateOne(
            { _id: new ObjectId(id) },
            { $set: { estado } },
            { session }
        );
    }

    async obtenerDisponible() {
        return await this.coleccion.findOne({ estado: "disponible" });
    }
}
