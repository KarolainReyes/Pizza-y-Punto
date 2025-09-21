import dotenv from "dotenv";
dotenv.config();

import { conectar, obtenerBase, obtenerCliente, cerrarConexion } from './config/database.js';
import AgregarPizzaCommand from "../commands/agregarPizza.js";
import PizzasService from "../services/PizzasService.js";
import IngredientesService from "../services/IngredientesService.js";


const uri = process.env.MONGO_URI;

if (!uri) {
  throw new Error("La variable de entorno MONGO_URI no está definida.");
}

await conectar(uri, "pizza_y_punto");

const base = obtenerBase();
const cliente = obtenerCliente();

const comando = new AgregarPizzaCommand({pizzaService: new PizzasService(base, cliente),ingredientesService: new IngredientesService(base, cliente)});

await comando.execute(); 

await cerrarConexion();