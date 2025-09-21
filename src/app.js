import dotenv from "dotenv";
dotenv.config();

import { conectar, obtenerBase, obtenerCliente, cerrarConexion } from './config/database.js';
import menuPrincipal from "../cli/menuPrincipal.js"; 
const uri = process.env.MONGO_URI;
try {
  await conectar(uri, "pizza_y_punto");
  const base = obtenerBase();
  const cliente = obtenerCliente();
  await menuPrincipal(base, cliente);

} catch (error) {
  console.error("Error en la aplicación:", error);
} finally {
  await cerrarConexion();
  console.log("Conexión a la base de datos cerrada.");
}