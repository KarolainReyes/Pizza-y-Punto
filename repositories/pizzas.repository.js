import { ObjectId } from "mongodb";

export default class PizzasRepositorio {
    constructor(base) {
        this.coleccion = base.collection("pizzas");
    }

    async crear(pizza) {
        return await this.coleccion.insertOne(pizza);
    }

    async listarTodas() {
        return await this.coleccion.find().toArray();
    }

    async buscarPorId(id) {
        return await this.coleccion.findOne({ _id: new ObjectId(id) });
    }

    async eliminarPizza(id) {
        return await this.coleccion.deleteOne({ _id: new ObjectId(id) });
    }

    async actualizarPizza(id, data) {
        return await this.coleccion.updateOne(
            { _id: new ObjectId(id) },
            { $set: data }
        );
    }
}
