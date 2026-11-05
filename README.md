# TaskFlow — Entregas 2, 3, 4 y 5

Aplicación móvil de gestión de tareas desarrollada con **React Native, Expo y TypeScript** para el curso de React Native de CoderHouse.

## Objetivo

Desarrollar progresivamente una aplicación móvil que permita crear tareas, validarlas, mostrarlas en una lista, consultar sus detalles y navegar entre diferentes pantallas utilizando React Navigation.

## Tecnologías utilizadas

- React Native
- Expo
- TypeScript
- React Hooks (`useState`)
- StyleSheet
- FlatList
- TouchableOpacity
- React Navigation
- Native Stack Navigator
- Bottom Tab Navigator
- Expo Vector Icons (Ionicons)
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
│   ├── navigation/
│   │   ├── AppNavigator.tsx
│   │   └── TasksStack.tsx
│   ├── screens/
│   │   ├── HomeScreen.tsx
│   │   ├── TaskDetailScreen.tsx
│   │   └── ProfileScreen.tsx
│   └── assets/
├── App.tsx
├── package.json
└── README.md
```

## Entrega 2 — Componentes reutilizables

Se implementaron componentes reutilizables y estilos personalizados.

### ProfileScreen

Pantalla de perfiles que utiliza el componente `ProfileCard` para mostrar:

- Nombre del usuario.
- Cargo o rol.
- Imagen de perfil.
- Estado activo o inactivo.

Los colores y estilos globales se organizan en `src/constants/theme.ts`.

## Entrega 3 — Formulario de creación de tareas

Se desarrolló `TaskForm.tsx`, que permite ingresar los datos de una tarea.

### Funcionalidades

- Campo de título y descripción.
- Selección de categoría: Trabajo, Estudio o Personal.
- Estado local mediante `useState`.
- Validación del título con mínimo 5 caracteres.
- Validación de la descripción con mínimo 10 caracteres.
- Mensajes de error en rojo.
- Bordes personalizados según el foco y los errores.
- Manejo del teclado con `KeyboardAvoidingView` y `ScrollView`.
- Botón Guardar mediante `TouchableOpacity`.

### Validación

La función `handleAddTask` valida la información, construye un objeto de tarea y registra sus datos en consola.

Cuando los datos son válidos, se muestra una alerta de éxito y se limpian los campos.

## Entrega 4 — Lista, estado vacío y detalle de tareas

Se amplió TaskFlow para visualizar tareas y consultar su información completa.

### HomeScreen

Se implementó una lista dinámica mediante `FlatList`, utilizando `keyExtractor` para identificar cada tarea.

### EmptyState

Cuando no existen tareas, se muestra el mensaje:

**¡No tienes tareas pendientes! Empieza por crear una arriba.**

### TaskDetail

El componente de detalle muestra:

- Título de la tarea.
- Descripción.
- Categoría.
- Fecha de creación.
- Botón para regresar.

### Integración

En esta entrega se implementó la creación de tareas y su incorporación a la lista mediante actualizaciones inmutables del estado.

## Entrega 5 — Navegación con React Navigation

Se integró React Navigation para organizar las pantallas de TaskFlow y mejorar la experiencia de navegación.

### Bottom Tab Navigator

El archivo `src/navigation/AppNavigator.tsx` configura las dos pestañas principales:

**Home:** permite acceder a la lista y al flujo de gestión de tareas.

**Profile:** permite visualizar la pantalla de perfiles desarrollada anteriormente.

Las pestañas utilizan iconos de `Ionicons` y los colores definidos en `theme.ts`.

### Native Stack Navigator

El archivo `src/navigation/TasksStack.tsx` administra la navegación de tareas con tres rutas:

- **TaskList:** muestra la lista de tareas mediante `HomeScreen`.
- **TaskDetail:** muestra la información de una tarea seleccionada mediante `TaskDetailScreen`.
- **TaskForm:** presenta el formulario para crear una tarea, configurado como una pantalla modal.

El Stack utiliza un encabezado personalizado y permite regresar a las pantallas anteriores.

### Estructura de navegación

```text
App.tsx
   │
   ▼
AppNavigator
   │
   ├── Home
   │    │
   │    ▼
   │   TasksStack
   │    │
   │    ├── TaskList
   │    ├── TaskDetail
   │    └── TaskForm
   │
   └── Profile
        │
        ▼
      ProfileScreen
```


### Paso de parámetros

Al seleccionar una tarea en `HomeScreen`, se utiliza
`navigation.navigate()` para enviar únicamente su ID:

```tsx
navigation.navigate("TaskDetail", {
  id: task.id,
});
```

`TaskDetailScreen` recibe el ID mediante `route.params`
y busca la tarea en el estado compartido utilizando
`tasks.find()`.

De esta manera, evitamos enviar datos duplicados
entre pantallas y conservamos una única fuente de información.


### Redirección programática

Al guardar una tarea válida desde el formulario, se ejecuta:

```tsx
navigation.navigate("TaskList");
```

Esto permite regresar automáticamente a la lista de tareas.

### Estado compartido

El estado de las tareas se administra en `TasksStack.tsx` mediante `useState`.

- `HomeScreen` recibe el arreglo de tareas mediante props.
- `TaskForm` recibe la función `onAddTask`.
- Al guardar, se actualiza el estado de forma inmutable.
- La lista muestra las tareas nuevas sin perder las anteriores.

### Modelo de datos

El tipo `Task`, definido en `src/constants/types.ts`, contiene:

- `id`: Identificador único.
- `title`: Título.
- `description`: Descripción.
- `category`: Categoría.
- `createAt`: Fecha de creación.

### Almacenamiento

Las tareas se administran temporalmente en memoria mediante `useState`.

Esta versión no utiliza una base de datos ni una API externa, por lo que los datos agregados no se conservan al reiniciar la aplicación.


## Evidencias visuales — Entrega 5

Las siguientes capturas fueron realizadas en un iPhone utilizando Expo Go.

### 1. Pantalla principal — Home

Lista de tareas y navegación mediante pestañas.

![Pantalla Home](docs/screenshots/home.jpeg)

### 2. Detalle de tarea — TaskDetail

Visualización de la información de una tarea seleccionada.

![Pantalla TaskDetail](docs/screenshots/task-detail.jpeg)

### 3. Formulario — TaskForm

Creación de tareas con validaciones y selección de categoría.

![Pantalla TaskForm](docs/screenshots/task-form.jpeg)

### 4. Perfiles — Profile

Pantalla de perfiles accesible desde Bottom Tab Navigator.

![Pantalla Profile](docs/screenshots/profile.jpeg)


## Ejecución local

1. Clonar el repositorio.
2. Instalar dependencias:

   ```bash
   npm install
   ```

3. Iniciar Expo:

   ```bash
   npx expo start
   ```

4. Abrir Expo Go en un dispositivo compatible y escanear el código QR.

## Verificación de TypeScript

Para comprobar los tipos del proyecto:

```bash
npx tsc --noEmit
```

La verificación se completó sin errores de TypeScript.

## Pruebas funcionales

Se realizaron pruebas en Expo Go para verificar:

- Visualización de la lista de tareas.
- Navegación entre Home y Profile.
- Apertura del detalle al seleccionar una tarea.
- Regreso mediante la navegación del Stack.
- Apertura del formulario de creación.
- Guardado de tareas con validaciones.
- Redirección automática a TaskList.
- Visualización de tareas recién creadas.
- Funcionamiento del estado vacío.

## Organización de ramas de Git

- `main`: Entrega 2 — Componentes reutilizables.
- `feature/add-task-form`: Entrega 3 — Formulario con validaciones.
- `feature/task-list-detail`: Entrega 4 — Lista, estado vacío y detalle.
- `feature/task-navigation`: Entrega 5 — Navegación con React Navigation.

## Estado del proyecto

**Entrega 5:** Navegación por pestañas y Stack implementada, con integración del formulario y la lista de tareas.

Aplicación desarrollada para el curso de React Native de CoderHouse.