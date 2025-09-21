import PizzasRepositorio from "../repositories/pizzas.repository.js";

export default class PizzasService {
    constructor(base, cliente) {
        this.repositorio = new PizzasRepositorio(base, cliente);
    }

    async agregarPizza(pizza) {
        if (!pizza.nombre || !pizza.precio || !pizza.ingredientes) {
            throw new Error("La pizza debe tener nombre, precio y lista de ingredientes");
        }
        return await this.repositorio.crear(pizza);
    }

    async editarPizza(id, pizzaEditada) {
        const pizza = await this.repositorio.buscarPorId(id);
        if (!pizza) {
            throw new Error("Pizza no encontrada");
        }

        return await this.repositorio.actualizarPizza(id, pizzaEditada);
    }

    async eliminarPizza(id) {
        const pizza = await this.repositorio.buscarPorId(id);
        if (!pizza) {
            throw new Error("Pizza no encontrada");
        }
        return await this.repositorio.eliminarPizza(id);
    }
        
    async listarPizzas() {
        return await this.repositorio.listarTodas();
    }
}
