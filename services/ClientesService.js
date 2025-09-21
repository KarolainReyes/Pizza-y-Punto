import ClientesRepositorio from "../repositories/clientes.repository.js";
import { ObjectId } from "mongodb";

export default class ClientesService {
    constructor(base, cliente) {
        this.repositorio = new ClientesRepositorio(base, cliente);
    }

    async agregarCliente(clienteObj) {
        if (!clienteObj.nombre || !clienteObj.telefono || !clienteObj.direccion || !clienteObj.zona) {
            throw new Error("El cliente debe tener nombre, teléfono, dirección y zona");
        }
        return await this.repositorio.crearCliente(clienteObj);
    }

    async editarCliente(id, clienteEditado) {
        const clienteExistente = await this.repositorio.buscarPorId(new ObjectId(id));
        if (!clienteExistente) {
            throw new Error("Cliente no encontrado");
        }
        return await this.repositorio.editarCliente(id, clienteEditado);
    }

    async eliminarCliente(id) {
        const clienteExistente = await this.repositorio.buscarPorId(new ObjectId(id));
        if (!clienteExistente) {
            throw new Error("Cliente no encontrado");
        }
        return await this.repositorio.eliminarCliente(id);
    }

    async listarClientes() {
        return await this.repositorio.listarTodos();
    }
}
