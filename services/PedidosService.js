import PedidosRepositorio from "../repositories/pedidos.repository.js";
import PizzasRepositorio from "../repositories/pizzas.repository.js";
import IngredientesRepositorio from "../repositories/ingredientes.repository.js";
import RepartidoresRepositorio from "../repositories/repartidores.repository.js";
import { ObjectId } from "mongodb";

export default class PedidosService {
    constructor(base, cliente) {
        this.cliente = cliente;
        this.pedidosRepo = new PedidosRepositorio(base, cliente);
        this.pizzasRepo = new PizzasRepositorio(base, cliente);
        this.ingredientesRepo = new IngredientesRepositorio(base, cliente);
        this.repartidoresRepo = new RepartidoresRepositorio(base, cliente);
    }

    async realizarPedido(clienteObj, pizzaIds) {
        const session = this.cliente.startSession();

        try {
            await session.withTransaction(async () => {

                const pizzas = [];
                const ingredientesNecesarios = [];

                for (const id of pizzaIds) {
                    const pizza = await this.pizzasRepo.buscarPorId(new ObjectId(id));
                    if (!pizza) throw new Error(`Pizza ${id} no encontrada`);
                    pizzas.push(pizza);

                    for (const ing of pizza.ingredientes) {
                        ingredientesNecesarios.push({ id: new ObjectId(ing.id), cantidad: ing.cantidad });
                    }
                }

                await this.ingredientesRepo.restarVarios(ingredientesNecesarios);

                const repartidor = await this.repartidoresRepo.obtenerDisponiblePorZona(clienteObj.zona);
                if (!repartidor) throw new Error("No hay repartidores disponibles en la zona del cliente");

                await this.repartidoresRepo.actualizarEstado(repartidor._id, "ocupado", session);


                const total = pizzas.reduce((sum, p) => sum + p.precio, 0);

                const pedido = {
                    clienteId: new ObjectId(clienteObj._id),
                    pizzas: pizzaIds.map(id => new ObjectId(id)),
                    total,
                    fecha: new Date(),
                    repartidorAsignado: repartidor._id
                };

                await this.pedidosRepo.crearPedido(pedido, session);
            });

            console.log("Pedido realizado con éxito");
        } catch (error) {
            console.error("Error al realizar pedido:", error);
        } finally {
            await session.endSession();
        }
    }
     async listarPedidos() {
        const pedidos = await this.pedidosRepo.listarTodos();

        return pedidos.map(p => ({
            _id: p._id,
            clienteId: p.clienteId,
            pizzas: p.pizzas,
            total: p.total,
            fecha: p.fecha,
            repartidorAsignado: p.repartidorAsignado
        }));
    }

    async eliminarPedido(id) {
        const pedido = await this.pedidosRepo.buscarPorId(new ObjectId(id));
        if (!pedido) {
            throw new Error("Pedido no encontrado");
        }

        return await this.pedidosRepo.eliminarPedido(id);
    }
}
