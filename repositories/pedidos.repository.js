import { ObjectId } from "mongodb";

export default class PedidosRepositorio {
    constructor(base, cliente) {
        this.coleccion = base.collection("pedidos");
        this.cliente = cliente;
    }

    async crearPedido(pedido, session = null) {
        return await this.coleccion.insertOne(pedido, { session });
    }

    async listarTodos() {
        return await this.coleccion.find().toArray();
    }

    async buscarPorId(id) {
        return await this.coleccion.findOne({ _id: new ObjectId(id) });
    }

    async eliminarPedido(id) {
        return await this.coleccion.deleteOne({ _id: new ObjectId(id) });
    }
}
