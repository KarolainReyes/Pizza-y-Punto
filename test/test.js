import dotenv from "dotenv";
dotenv.config();

import { conectar, obtenerBase, obtenerCliente, cerrarConexion } from '../src/config/database.js';
import IngredientesService from "../services/IngredientesService.js";
import AgregarIngredienteCommand from "../commands/agregarIngrediente.js";
import EliminarIngredienteCommand from "../commands/eliminarIngrediente.js";
import EditarIngredienteCommand from "../commands/editarIngrediente.js";
import VerIngredientesCommand from "../commands/verIngrediente.js";

const uri = process.env.MONGO_URI;

try {

  await conectar(uri, "pizza_y_punto");
  const base = obtenerBase();
  const cliente = obtenerCliente();


  const ingredientesService = new IngredientesService(base, cliente);


  const agregarCmd = new AgregarIngredienteCommand({ ingredienteService: ingredientesService });
  await agregarCmd.execute();


  const editarCmd = new EditarIngredienteCommand({ ingredienteService: ingredientesService });
  await editarCmd.execute();


  const eliminarCmd = new EliminarIngredienteCommand({ ingredienteService: ingredientesService });
  await eliminarCmd.execute();


  const verCmd = new VerIngredientesCommand({ ingredienteService: ingredientesService });
  await verCmd.execute();

} catch (error) {
  console.error("Error en la aplicación:", error);
} finally {
  await cerrarConexion();
  console.log("Conexión a la base de datos cerrada.");
}
