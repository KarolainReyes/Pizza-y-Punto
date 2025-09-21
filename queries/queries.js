import { ObjectId } from "mongodb";

export default class ConsultasService {
  constructor(base) {
    this.base = base;
    this.pizzas = base.collection("pizzas");
    this.ingredientes = base.collection("ingredientes");
    this.pedidos = base.collection("pedidos");
  }

  // Ingredientes más utilizados en pedidos del último mes
  async ingredientesMasUsadosUltimoMes() {
    const unMesAtras = new Date();
    unMesAtras.setMonth(unMesAtras.getMonth() - 1);
    return await this.pedidos.aggregate([
      { $match: { fecha: { $gte: unMesAtras } } },    
      { $unwind: "$pizzas" },                            
      { $lookup: {                                      
          from: "pizzas",
          localField: "pizzas",
          foreignField: "_id",
          as: "pizzaInfo"
      }},
      { $unwind: "$pizzaInfo" },
      { $unwind: "$pizzaInfo.ingredientes" },           
      { $group: {
          _id: "$pizzaInfo.ingredientes",
          vecesUsado: { $sum: 1 }
      }},
      { $lookup: {                                  
          from: "ingredientes",
          localField: "_id",
          foreignField: "_id",
          as: "ingrediente"
      }},
      { $unwind: "$ingrediente" },
      { $project: {
          _id: 0,
          nombreIngrediente: "$ingrediente.nombre",
          vecesUsado: 1
      }},
      { $sort: { vecesUsado: -1 } }
    ]).toArray();
  }

  //Promedio de precios por categoría de pizza
  async promedioPreciosPorCategoria() {
    return await this.pizzas.aggregate([
      { $group: {
          _id: "$categoria",
          precioPromedio: { $avg: "$precio" }
      }},
      { $project: {
          _id: 0,
          categoria: "$_id",
          precioPromedio: 1
      }},
      { $sort: { precioPromedio: -1 } }
    ]).toArray();
  }

  // Categoría de pizzas con más ventas históricas
  async categoriaMasVendida() {
    return await this.pedidos.aggregate([
      { $unwind: "$pizzas" },                            
      { $lookup: {                                     
          from: "pizzas",
          localField: "pizzas",
          foreignField: "_id",
          as: "pizzaInfo"
      }},
      { $unwind: "$pizzaInfo" },
      { $group: {                                    
          _id: "$pizzaInfo.categoria",
          totalVentas: { $sum: 1 }
      }},
      { $sort: { totalVentas: -1 } },
      { $limit: 1 },                                    
      { $project: {
          _id: 0,
          categoria: "$_id",
          totalVentas: 1
      }}
    ]).toArray();
  }
}

