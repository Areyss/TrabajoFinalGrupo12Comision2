# 📘 Trabajo Práctico Integrador – Programación Visual

## 👨‍💻 Integrantes del grupo

| Nombre completo       | Usuario de GitHub        |
|-----------------------|--------------------------|
| Ariel Sergio Reyes    | @Areyss                  |
| Joel Brian Garcia     | @JoelGarcia21            |

## 🧠 Descripción del proyecto

Este proyecto es una aplicación de gestión de productos desarrollada en **React** con **Vite** como parte del Trabajo Práctico Integrador de la materia **Programación Visual**. Se utiliza **Chakra UI** para la interfaz y **React Router Dom** junto con **Context API** para el manejo del estado y la navegación.

El objetivo principal es implementar un CRUD completo de productos, trabajando primero con datos locales y luego consumiendo una API externa. Además la posibilidad de marcar productos como favoritos.

### 🛠 Funcionalidades implementadas

- 🏠 **Home**: Listado de productos (solo aquellos con deleted: false).
- 📋 **Lista de Productos**: Mostrar todos los productos en tarjetas estilizadas con Chakra UI.
- ❤️ **Favoritos**: Vista que filtra y muestra solo los productos marcados como favoritos (favorite: true).
- 🔍 **Detalle del Producto**: Vista con información completa de un producto (imagen, nombre, precio, descripción, categoría).
- ➕ **Agregar Producto**: Formulario (Chakra UI) para crear un nuevo producto en datos locales, asignando deleted: false y favorite: false por defecto.
- 🖊 **Editar Producto**: Formulario precargado para modificar un producto existente en el estado global.
- 🌎 **Uso de Contexto globales**: Guarda el estado de funciones o variables.
- 🗺 **Navegación general**: Barra de navegación con enlaces a Home, Favoritos, Crear y vistas de detalle/edición.
- 🌐 **Integración API externa**: Carga de productos desde https://fakestoreapi.com/products, mapeando la respuesta para incluir favorite y deleted en cada ítem.

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
