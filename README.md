# FakeStore App

Esta aplicación móvil desarrollada con React Native permite gestionar productos a través de una interfaz intuitiva, conectándose a una API de productos.

## Características principales

- Listado de productos
- Visualización detallada de productos
- Agregar nuevos productos
- Editar productos existentes
- Eliminar productos

## Tecnologías utilizadas

- React Native
- TypeScript
- React Navigation
- API REST

## Estructura del proyecto

```
├── assets/           # Recursos estáticos
├── hooks/            # Custom hooks para la lógica de negocio
├── screens/          # Pantallas de la aplicación
├── services/         # Servicios y configuración de API
└── types/            # Definiciones de tipos TypeScript
```

### Componentes principales

- `ListaProductosScreen`: Pantalla principal que muestra todos los productos
- `DetalleProductoScreen`: Visualización detallada de un producto
- `AgregarProductoScreen`: Formulario para crear nuevos productos
- `EditarProductoScreen`: Formulario para modificar productos existentes
- `EliminarProductoScreen`: Confirmación para eliminar productos

### Custom Hooks

- `useProductos`: Gestiona la obtención y manejo de la lista de productos
- `useProductoID`: Maneja la obtención de un producto específico
- `useAgregar`: Lógica para agregar nuevos productos
- `useEditar`: Lógica para editar productos existentes
- `useEliminar`: Lógica para eliminar productos

## Instalación

1. Clonar el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar la aplicación:
```bash
npm start
```

## Navegación

La aplicación utiliza React Navigation para gestionar la navegación entre pantallas, definido en `AppNavigation.tsx`.

## Servicios

La aplicación se conecta a una API externa a través del servicio definido en `services/Api.ts` para realizar operaciones CRUD con los productos.

## Tipos

Las definiciones de tipos para la navegación se encuentran en `types/navigation.ts`, asegurando un tipado correcto en toda la aplicación.

## Scripts disponibles

- `npm start`: Inicia el servidor de desarrollo
- `npm test`: Ejecuta las pruebas
- `npm run ios`: Inicia la aplicación en iOS
- `npm run android`: Inicia la aplicación en Android

## Requisitos del sistema

- Node.js
- npm o yarn
- React Native CLI
- Android Studio (para Android)



