import IngredientesRepositorio from "../repositories/ingredientes.repository.js";
import { ObjectId } from "mongodb";

export default class IngredientesService {
    constructor(base, cliente) {
        this.repositorio = new IngredientesRepositorio(base, cliente);
    }

    async agregarIngrediente(ingrediente) {
        if (!ingrediente.nombre || !ingrediente.tipo || ingrediente.stock == null) {
            throw new Error("El ingrediente debe tener nombre, tipo y stock");
        }
        return await this.repositorio.crearIngrediente(ingrediente);
    }

    async editarIngrediente(id, ingredienteEditado) {
        const ingExistente = await this.repositorio.buscarPorId(new ObjectId(id));
        if (!ingExistente) {
            throw new Error("Ingrediente no encontrado");
        }
        return await this.repositorio.editarStock({ id: new ObjectId(id), cantidad: ingredienteEditado.stock });
    }

    async eliminarIngrediente(id) {
        const ingExistente = await this.repositorio.buscarPorId(new ObjectId(id));
        if (!ingExistente) {
            throw new Error("Ingrediente no encontrado");
        }
        return await this.repositorio.eliminarIngrediente({ id: new ObjectId(id) });
    }

    async listarIngredientes() {
        return await this.repositorio.listarTodos();
    }
}
