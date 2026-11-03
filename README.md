# TaskFlow - Entregas 2, 3 y 4

Aplicación móvil de gestión de tareas desarrollada con **React Native, Expo y TypeScript** para el curso de React Native de CoderHouse.

## Objetivo

Desarrollar progresivamente una aplicación móvil de gestión de tareas, utilizando componentes reutilizables, manejo de estado local, validaciones, listas dinámicas y renderizado condicional.

## Tecnologías utilizadas

- React Native
- Expo
- TypeScript
- React Hooks (`useState`)
- `StyleSheet`
- `FlatList`
- `TouchableOpacity`
- React Native Safe Area Context

## Estructura del proyecto

```text
taskflow/
├── src/
│   ├── components/
│   │   ├── ProfileCards.tsx
│   │   ├── TaskForm.tsx
│   │   ├── TaskDetail.tsx
│   │   └── EmptyState.tsx
│   ├── constants/
│   │   ├── theme.ts
│   │   └── types.ts
│   ├── screens/
│   │   ├── HomeScreen.tsx
│   │   └── ProfileScreen.tsx
│   └── assets/
├── App.tsx
├── package.json
└── README.md
```

## Entrega 2 - Componentes reutilizables

Se implementaron componentes reutilizables y estilos personalizados.

### ProfileScreen

Pantalla de perfiles que utiliza el componente `ProfileCard` para mostrar:

- Nombre del usuario.
- Cargo o rol.
- Imagen de perfil.
- Estado activo o inactivo.

Los colores y estilos globales se organizan en `src/constants/theme.ts`.

## Entrega 3 - Formulario de creación de tareas

Se desarrolló el componente `TaskForm.tsx`, que permite ingresar los datos de una tarea.

### Funcionalidades

- Campo de título.
- Campo de descripción.
- Selección de categoría: Trabajo, Estudio o Personal.
- Manejo de estado mediante `useState`.
- Validación de título obligatorio con mínimo 5 caracteres.
- Validación de descripción obligatoria con mínimo 10 caracteres.
- Mensajes de error en rojo.
- Bordes personalizados según el foco y los errores.
- Manejo del teclado mediante `KeyboardAvoidingView` y `ScrollView`.
- Botón Guardar utilizando `TouchableOpacity`.

### Validación y captura

La función `handleAddTask` valida la información ingresada, construye un objeto de tarea y registra sus datos en consola.

Cuando la validación es exitosa, se muestra una alerta de confirmación y se limpian los campos.

## Entrega 4 - Lista, estado vacío y detalle de tareas

Se amplió TaskFlow para permitir crear tareas, visualizarlas en una lista y consultar sus detalles.

### HomeScreen

Pantalla principal que administra el arreglo de tareas mediante `useState`.

Implementa:

- Lista dinámica utilizando `FlatList`.
- Identificación de elementos mediante `keyExtractor`.
- Estado `selectedTask` para controlar la tarea seleccionada.
- Estado `showForm` para mostrar u ocultar el formulario.
- Renderizado condicional de la lista, el formulario y el detalle.
- Botón «+ Nueva tarea».

### EmptyState

Componente que muestra el siguiente mensaje cuando el arreglo de tareas está vacío:

**¡No tienes tareas pendientes! Empieza por crear una arriba.**

### TaskDetail

Componente que recibe la tarea seleccionada y muestra:

- Título.
- Descripción.
- Categoría.
- Fecha de creación.
- Botón «Volver» para regresar a la lista.

### Integración del formulario

El componente `TaskForm` se conecta con `HomeScreen` mediante la propiedad `onAddTask`.

Al guardar una tarea válida:

1. Se genera un objeto con los datos de la tarea.
2. Se actualiza el estado de la lista de forma inmutable.
3. Se muestra una alerta de confirmación.
4. Se limpian los campos del formulario.
5. La aplicación regresa a la lista y muestra la nueva tarea.

### Modelo de datos

El tipo `Task`, definido en `src/constants/types.ts`, contiene:

- `id`: Identificador único.
- `title`: Título.
- `description`: Descripción.
- `category`: Categoría.
- `createAt`: Fecha de creación.

### Almacenamiento

Las tareas se mantienen en el estado local de React mediante `useState`.

Esta versión no utiliza una base de datos ni una API externa, por lo que las tareas creadas no se conservan al reiniciar la aplicación.

## Pantalla principal

Actualmente, `App.tsx` muestra `HomeScreen`.

Desde esta pantalla es posible abrir el formulario, visualizar las tareas disponibles y consultar sus detalles.

Los componentes de las entregas anteriores se conservan dentro del proyecto.

## Ejecución local

1. Clonar el repositorio.
2. Instalar las dependencias:

   `npm install`

3. Iniciar Expo:

   `npx expo start`

4. Abrir Expo Go en un dispositivo compatible y escanear el código QR.

## Verificación de TypeScript

Para verificar los tipos del proyecto:

`npx tsc --noEmit`

La verificación se realizó correctamente, sin errores de TypeScript.

## Pruebas funcionales

Se comprobó el funcionamiento de la aplicación en Expo Go, incluyendo:

- Visualización de la pantalla principal.
- Apertura del formulario de creación.
- Guardado y visualización de una nueva tarea.
- Selección de una tarea y visualización de sus detalles.
- Regreso a la lista mediante el botón «Volver».
- Visualización del estado vacío cuando no existen tareas.

## Organización de ramas de Git

- `main`: Entrega 2 - Componentes reutilizables.
- `feature/add-task-form`: Entrega 3 - Formulario con validaciones.
- `feature/task-list-detail`: Entrega 4 - Lista, estado vacío y detalle de tareas.

## Estado del proyecto

**Entrega 4:** Funcionalidades implementadas y probadas localmente en Expo Go.

Proyecto desarrollado como parte del curso de React Native de CoderHouse.