import { ObjectId } from "mongodb";

export default class RepartidoresRepositorio {
  constructor(base) {
    this.coleccion = base.collection("repartidores");
  }

  // Crear un nuevo repartidor
  async crearRepartidor(repartidor) {
    if (!repartidor.nombre || !repartidor.zona) {
      throw new Error("El repartidor debe tener nombre y zona");
    }
    repartidor.estado = repartidor.estado || "Disponible";
    return await this.coleccion.insertOne(repartidor);
  }

  // Buscar repartidor por _id
  async buscarPorId(id) {
    return await this.coleccion.findOne({ _id: new ObjectId(id) });
  }

  // Listar todos los repartidores
  async listarTodos() {
    return await this.coleccion.find().toArray();
  }

  // Actualizar el estado de un repartidor
  async actualizarEstado(id, nuevoEstado) {
    const estadosValidos = ["Disponible", "Ocupado"];
    if (!estadosValidos.includes(nuevoEstado)) {
      throw new Error(`Estado inválido. Use: ${estadosValidos.join(", ")}`);
    }
    return await this.coleccion.updateOne(
      { _id: new ObjectId(id) },
      { $set: { estado: nuevoEstado } }
    );
  }

  // Eliminar repartidor
  async eliminarRepartidor(id) {
    return await this.coleccion.deleteOne({ _id: new ObjectId(id) });
  }
}
