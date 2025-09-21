import RepartidoresRepositorio from "../repositories/repartidores.repository.js";
import { ObjectId } from "mongodb";

export default class RepartidoresService {
    constructor(base, cliente) {
        this.repositorio = new RepartidoresRepositorio(base, cliente);
    }

    async agregarRepartidor(repartidor) {
        if (!repartidor.nombre || !repartidor.zona || !repartidor.estado) {
            throw new Error("El repartidor debe tener nombre, zona y estado");
        }
        return await this.repositorio.crearRepartidor(repartidor);
    }

    async editarRepartidor(id, repartidorEditado) {
        const repExistente = await this.repositorio.buscarPorId(new ObjectId(id));
        if (!repExistente) {
            throw new Error("Repartidor no encontrado");
        }
        return await this.repositorio.editarRepartidor(id, repartidorEditado);
    }

    async eliminarRepartidor(id) {
        const repExistente = await this.repositorio.buscarPorId(new ObjectId(id));
        if (!repExistente) {
            throw new Error("Repartidor no encontrado");
        }
        return await this.repositorio.eliminarRepartidor(id);
    }

    async listarRepartidores() {
        return await this.repositorio.listarTodos();
    }

    async marcarOcupado(id) {
        const repExistente = await this.repositorio.buscarPorId(new ObjectId(id));
        if (!repExistente) {
            throw new Error("Repartidor no encontrado");
        }
        return await this.repositorio.actualizarEstado(id, "ocupado");
    }

    async marcarDisponible(id) {
        const repExistente = await this.repositorio.buscarPorId(new ObjectId(id));
        if (!repExistente) {
            throw new Error("Repartidor no encontrado");
        }
        return await this.repositorio.actualizarEstado(id, "disponible");
    }
}
