import PedidosRepositorio from "../repositories/pedidos.repository.js";
import PizzasRepositorio from "../repositories/pizzas.repository.js";
import IngredientesRepositorio from "../repositories/ingredientes.repository.js";
import RepartidoresService from "./RepartidoresService.js";
import { ObjectId } from "mongodb";

export default class PedidosService {
    constructor(base, cliente) {
        this.cliente = cliente;
        this.pedidosRepo = new PedidosRepositorio(base, cliente);
        this.pizzasRepo = new PizzasRepositorio(base, cliente);
        this.ingredientesRepo = new IngredientesRepositorio(base, cliente);
        this.repartidoresService = new RepartidoresService(base, cliente);
    }

    async realizarPedido(clienteObj, pizzaIds) {
    const session = this.cliente.startSession();

    try {
        await session.withTransaction(async () => {
            const pizzas = [];
            const ingredientesNecesarios = [];

            // Buscar pizzas y acumular ingredientes
            for (const id of pizzaIds) {
                const pizza = await this.pizzasRepo.buscarPorId(new ObjectId(id));
                if (!pizza) throw new Error(`Pizza ${id} no encontrada`);
                pizzas.push(pizza);

                // Acumular ingredientes necesarios (1 unidad por pizza)
                for (const ingId of pizza.ingredientes) {
                    ingredientesNecesarios.push({ id: new ObjectId(ingId), cantidad: 1 });
                }
            }

            // Restar ingredientes
            await this.ingredientesRepo.restarVarios(ingredientesNecesarios);

            // Asignar repartidor según la zona del cliente
            const repartidores = await this.repartidoresService.listarRepartidores();
            const repartidorDisponible = repartidores.find(
                r => r.zona === clienteObj.zona && r.estado === 'Disponible'
            );
            if (!repartidorDisponible) throw new Error("No hay repartidores disponibles en la zona del cliente");

            // Marcar repartidor como ocupado
            await this.repartidoresService.marcarOcupado(repartidorDisponible._id);

            // Calcular total
            const total = pizzas.reduce((sum, p) => sum + p.precio, 0);

            // Crear pedido
            const pedido = {
                clienteId: new ObjectId(clienteObj._id),
                pizzas: pizzaIds.map(id => new ObjectId(id)),
                total,
                fecha: new Date(),
                repartidorAsignado: repartidorDisponible._id
            };

            await this.pedidosRepo.crearPedido(pedido, session);
        });

        console.log("✅ Pedido realizado con éxito");
    } catch (error) {
        console.error("❌ Error al realizar pedido:", error.message);
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
        if (!pedido) throw new Error("Pedido no encontrado");
        return await this.pedidosRepo.eliminarPedido(id);
    }
}
