import dotenv from "dotenv";
dotenv.config();

import { conectar, obtenerBase, obtenerCliente, cerrarConexion } from '../src/config/database.js';
import PedidosService from "../services/PedidosService.js";
import RegistrarPedidoCommand from "../commands/reqistrarPedido.js";
import PizzasService from "../services/PizzasService.js";
import ClientesService from "../services/ClientesService.js";
const uri = process.env.MONGO_URI;
try {
  await conectar(uri, "pizza_y_punto");
  const base = obtenerBase();
  const cliente = obtenerCliente();
      const pizzasService = new PizzasService(base, cliente);
    const pedidosService = new PedidosService(base, cliente);
    const clientesService = new ClientesService(base, cliente)

    const comando = new RegistrarPedidoCommand({ pedidoService: pedidosService, pizzaService: pizzasService , clienteService:clientesService});

    await comando.execute();


} catch (error) {
  console.error("Error en la aplicación:", error);
} finally {
  await cerrarConexion();
  console.log("Conexión a la base de datos cerrada.");
}