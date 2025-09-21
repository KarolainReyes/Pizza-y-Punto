# 🍕 Pizza y Punto - Sistema de Pedidos e Inventario

Aplicación **por consola** desarrollada en **Node.js** con conexión a **MongoDB**, diseñada para que la cadena de pizzerías *Pizza y Punto* lleve el control de:

- Pedidos de clientes  
- Inventario de ingredientes  
- Asignación de repartidores  
- Reportes de ventas y tendencias (Aggregation Framework)

El sistema utiliza **transacciones** para garantizar que cada pedido afecte múltiples colecciones de forma segura.

---

## 🚀 Características

- **Pedidos con transacción:** Verifica ingredientes, descuenta stock, registra pedido y asigna repartidor de manera atómica.
- **Reportes de ventas:** Agregaciones para analizar ingredientes más usados, promedios por categoría y pizzas más vendidas.
- **Arquitectura SOLID:** Código modular y escalable, con separación de responsabilidades.
- **CLI interactiva:** Uso de [`inquirer`](https://www.npmjs.com/package/inquirer) para un flujo amigable en consola.

---

## 🏗️ Estructura del Proyecto

```
pizza-y-punto/
│
├─ src/
│ ├─ app.js # Punto de entrada de la CLI
│ ├─ config/
│ │ └─ database.js # Conexión a MongoDB
│ │
│ ├─ domain/ # Entidades de negocio (POJOs)
│ │ ├─ Pedido.js
│ │ ├─ Pizza.js
│ │ ├─ Ingrediente.js
│ │ ├─ Repartidor.js
│ │ └─ Cliente.js
│ │
│ ├─ repositories/ # Acceso a datos (Repository Pattern)
│ │ ├─ pedidos.repository.js
│ │ ├─ pizzas.repository.js
│ │ ├─ ingredientes.repository.js
│ │ ├─ repartidores.repository.js
│ │ └─ clientes.repository.js
│ │
│ ├─ services/ # Lógica de negocio
│ │ ├─ PedidoService.js
│ │ ├─ InventarioService.js
│ │ ├─ ReporteService.js
│ │ └─ RepartidorService.js
│ │
│ ├─ commands/ # CLI Commands (Command Pattern)
│ │ ├─ registrarPedido.js
│ │ ├─ agregarPizza.js
│ │ ├─ generarReporte.js
│ │ └─ listarInventario.js
│ │
│ ├─ cli/
│ │ ├─ menuPrincipal.js # Menú interactivo con inquirer
│ │ └─ prompts.js # Preguntas reutilizables
│ │
│ └─ utils/
│ ├─ validators.js
│ └─ formatters.js
│ │
│ └─ Queries/
│ └─ queries.js
│
├─ tests/ # Unit tests (Jest u otro)
│
├─ .env # Variables de entorno (Mongo URI, etc.)
├─ .gitignore
└─ package.json
```


---

## 💾 Requerimientos

- [Node.js](https://nodejs.org/) 18 o superior
- [MongoDB](https://www.mongodb.com/) (local o en la nube)
- NPM o Yarn

---

## ⚙️ Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/pizza-y-punto.git
   cd pizza-y-punto
2. **Instalar dependencias**
   ```bash
    npm install
3. **Configurar variables de entorno**
   ```bash
    MONGO_URI=mongodb://localhost:27017
    DB_NAME=pizza_y_punto
4. **Ejecutar la aplicación**
   ```bash
   npm start
## 🕹️ Uso

El sistema abre un menú interactivo en consola donde podrás:

- Registrar pedidos

- Controlar inventario

- Generar reportes de ventas

- Listar repartidores disponibles

Cada operación utiliza los servicios que interactúan con MongoDB mediante transacciones y agregaciones.

## 📐 Arquitectura y Patrones

- SOLID para un código mantenible.

- Repository Pattern para aislar la base de datos.

- Service Layer para encapsular lógica de negocio.

- Command Pattern para modularizar las operaciones CLI.

- Strategy Pattern para distintas formas de asignar repartidores.

## 👩‍💻 Autores

Pizza y Punto Dev Team

 * [Karol Reyes](https://github.com/KarolainReyes)

 * [Andres Leal](https://github.com/Andre07g)

---

## 📝 License

This project is for educational use. It can be used as a reference for modeling NoSQL databases in MongoDB.

Hecho con ❤️ y Node.js