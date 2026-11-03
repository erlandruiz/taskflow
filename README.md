# TaskFlow - Entregas 2 y 3

Aplicación móvil desarrollada con React Native, Expo y TypeScript para el curso de CoderHouse.

## Objetivo

Desarrollar una aplicación móvil de gestión de tareas utilizando una arquitectura modular, componentes reutilizables, manejo de estado local y validaciones de formularios.

## Tecnologías

- React Native
- Expo
- TypeScript
- StyleSheet
- React Hooks (`useState`)
- React Native Safe Area Context

## Estructura

- `src/components`: Componentes reutilizables, como `ProfileCards.tsx` y `TaskForm.tsx`.
- `src/screens`: Pantallas de la aplicación.
- `src/constants`: Colores y estilos globales.
- `src/assets`: Recursos locales.

## Entrega 2 - Componentes reutilizables

### HomeScreen

Pantalla inicial de bienvenida a TaskFlow.

### ProfileScreen

Pantalla de perfiles que utiliza el componente ProfileCard para mostrar nombre, cargo, imagen y estado activo o inactivo.

## Entrega 3 - Formulario de creación de tareas

### TaskForm

Formulario que permite capturar la información de una nueva tarea.

**Funcionalidades implementadas:**

- Campo de título y descripción.
- Selección de categoría: Trabajo, Estudio o Personal.
- Manejo de estado local mediante `useState`.
- Validación de título obligatorio con mínimo 5 caracteres.
- Validación de descripción obligatoria con mínimo 10 caracteres.
- Mensajes de error en rojo.
- Bordes personalizados según el foco o los errores de validación.
- Ajuste del formulario cuando aparece el teclado mediante `KeyboardAvoidingView` y `ScrollView`.
- Botón Guardar mediante `TouchableOpacity`.

### Simulación de API

La función `handleAddTask` valida los datos y genera un objeto con las siguientes propiedades:

- `title`
- `description`
- `category`
- `createdAt`

Cuando la información es válida:

1. Se muestra el objeto generado en la consola.
2. Aparece una alerta con el mensaje «Éxito - Tarea capturada localmente».
3. Se limpian los campos del formulario.
4. La categoría regresa a su valor inicial: Trabajo.

Esta entrega realiza una simulación local y no envía los datos a una API externa.

## Pantalla visualizada

Actualmente, `App.tsx` muestra el componente `TaskForm`, correspondiente a la Tarea 03.

Las pantallas y componentes de la Entrega 2 se conservan dentro del proyecto.

## Ejecución local

1. Clonar el repositorio.
2. Instalar las dependencias con `npm install`.
3. Iniciar el proyecto con `npx expo start`.
4. Escanear el código QR con Expo Go.

## Organización de ramas

- `main`: Entrega 2.
- `feature/add-task-form`: Entrega 3 - Formulario de creación de tareas.

## Estado

Entrega 3 implementada y probada localmente en Expo Go, con validaciones, selección de categorías y simulación de captura de tareas.