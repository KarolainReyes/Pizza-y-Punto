import inquirer from "inquirer";

// Importar comandos
import AgregarPizzaCommand from "../commands/agregarPizza.js";
import VerPizzasCommand from "../commands/verPizza.js";
import EliminarPizzaCommand from "../commands/eliminarPizza.js";

import AgregarClienteCommand from "../commands/añadirCliente.js";
import VerClientesCommand from "../commands/verCliente.js";
import EliminarClienteCommand from "../commands/eliminarCliente.js";

import AgregarRepartidorCommand from "../commands/agregarRepartidor.js";
import VerRepartidoresCommand from "../commands/verRepartidor.js";
import EliminarRepartidorCommand from "../commands/eliminarRepartidor.js";

import AgregarIngredienteCommand from "../commands/agregarIngrediente.js";
import VerIngredientesCommand from "../commands/verIngrediente.js";
import EditarIngredienteCommand from "../commands/editarIngrediente.js";
import EliminarIngredienteCommand from "../commands/eliminarIngrediente.js";

import RegistrarPedido from "../commands/registrarPedido.js";
import VerPedidosCommand from "../commands/verPedido.js";
import EliminarPedidoCommand from "../commands/eliminarPedido.js";

import PizzasService from "../services/PizzasService.js";
import IngredientesService from "../services/IngredientesService.js";
import RepartidoresService from "../services/RepartidoresService.js";
import PedidosService from "../services/PedidosService.js";
import ClientesService from "../services/ClientesService.js";

export default async function menuPrincipal(base, cliente) {
  // Instanciar servicios
  const pizzaService = new PizzasService(base, cliente);
  const ingredientesService = new IngredientesService(base, cliente);
  const repartidorService = new RepartidoresService(base, cliente);
  const pedidoService = new PedidosService(base, cliente);
  const clienteService = new ClientesService(base, cliente);

  let salir = false;
  console.log("Bienvenido");

  while (!salir) {
    const { opcion } = await inquirer.prompt([
      {
        type: "list",
        name: "opcion",
        message: "Selecciona una opción:",
        choices: [
          { name: " Gestionar Pizzas ", value: "1" },
          { name: " Gestionar Pedidos ", value: "2" },
          { name: " Gestionar Clientes ", value: "3" },
          { name: " Gestionar Repartidores ", value: "4" },
          { name: " Gestionar Almacen ", value: "5" },
          { name: " Salir ", value: "6" }
        ]
      }
    ]);

    switch (opcion) {
      case "1":
        await subMenuPizzas(pizzaService, ingredientesService);
        break;
      case "2":
        await subMenuPedidos(pedidoService, pizzaService, clienteService, repartidorService);
        break;
      case "3":
        await subMenuClientes(clienteService);
        break;
      case "4":
        await subMenuRepartidores(repartidorService);
        break;
      case "5":
        await subMenuAlmacen(ingredientesService);
        break;
      case "6":
        salir = true;
        console.log("Saliendo...");
        break;
    }
  }
}

/* ------------------- SUBMENUS ------------------- */

async function subMenuPizzas(pizzaService, ingredientesService) {
  const { opcionPizza } = await inquirer.prompt([
    {
      type: "list",
      name: "opcionPizza",
      message: "Selecciona una opción:",
      choices: [
        { name: " Agregar Pizza ", value: "1" },
        { name: " Eliminar Pizza ", value: "2" },
        { name: " Ver Pizzas ", value: "3" },
        { name: " Volver ", value: "4" }
      ]
    }
  ]);

  switch (opcionPizza) {
    case "1":
      await new AgregarPizzaCommand({ pizzaService, ingredientesService }).execute();
      break;
    case "2":
      await new EliminarPizzaCommand({pizzaService}).execute()
      break;
    case "3":
      await new VerPizzasCommand({ pizzaService }).execute();
      break;
    case "4":
      return;
  }
}

async function subMenuPedidos(pedidoService, pizzaService, clienteService, repartidorService) {
  const { opcionPedido } = await inquirer.prompt([
    {
      type: "list",
      name: "opcionPedido",
      message: "Selecciona una opción:",
      choices: [
        { name: " Agregar Pedido ", value: "1" },
        { name: " Eliminar Pedido ", value: "2" },
        { name: " Ver Pedidos ", value: "3" },
        { name: " Volver ", value: "4" }
      ]
    }
  ]);

  switch (opcionPedido) {
    case "1":
      await new RegistrarPedido({ pedidoService, clienteService, pizzaService}).execute();
      break;
    case "2":
      await new EliminarPedidoCommand({pedidoService}).execute();
      break;
    case "3":
      await new VerPedidosCommand({ pedidoService }).execute();
      break;
    case "4":
      return;
  }
}

async function subMenuClientes(clienteService) {
  const { opcionCliente } = await inquirer.prompt([
    {
      type: "list",
      name: "opcionCliente",
      message: "Selecciona una opción:",
      choices: [
        { name: " Agregar Cliente ", value: "1" },
        { name: " Eliminar Cliente ", value: "2" },
        { name: " Ver Clientes ", value: "3" },
        { name: " Volver ", value: "4" }
      ]
    }
  ]);

  switch (opcionCliente) {
    case "1":
      await new AgregarClienteCommand({ clienteService }).execute();
      break;
    case "2":
      await new EliminarClienteCommand({ clienteService }).execute();
      break;
    case "3":
      await new VerClientesCommand({ clienteService }).execute();
      break;
    case "4":
      return;
  }
}

async function subMenuRepartidores(repartidorService) {
  const { opcionRepartidor } = await inquirer.prompt([
    {
      type: "list",
      name: "opcionRepartidor",
      message: "Selecciona una opción:",
      choices: [
        { name: " Agregar Repartidor ", value: "1" },
        { name: " Eliminar Repartidor ", value: "2" },
        { name: " Ver Repartidores ", value: "3" },
        { name: " Volver ", value: "4" }
      ]
    }
  ]);

  switch (opcionRepartidor) {
    case "1":
      await new AgregarRepartidorCommand({ repartidorService }).execute();
      break;
    case "2":
      await new EliminarRepartidorCommand({ repartidorService }).execute();
      break;
    case "3":
      await new VerRepartidoresCommand({ repartidorService }).execute();
      break;
    case "4":
      return;
  }
}

async function subMenuAlmacen(ingredientesService) {
  const { opcionAlmacen } = await inquirer.prompt([
    {
      type: "list",
      name: "opcionAlmacen",
      message: "Selecciona una opción:",
      choices: [
        { name: " Agregar Ingrediente ", value: "1" },
        { name: " Eliminar Ingrediente ", value: "2" },
        { name: " Editar stock ", value: "3" },
        { name: " Ver Ingredientes ", value: "4" },
        { name: " Volver ", value: "5" }
      ]
    }
  ]);

  switch (opcionAlmacen) {
    case "1":
      await new AgregarIngredienteCommand({ ingredientesService }).execute();
      break;
    case "2":
      await new EliminarIngredienteCommand({ ingredientesService }).execute();
      break;
    case "3":
      await new EditarIngredienteCommand({ ingredientesService }).execute();
      break;
    case "4":
      await new VerIngredientesCommand({ ingredientesService }).execute();
      break;
    case "5":
      return;
  }
}
