
import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { Task, TaskFilter } from "../constants/types";

// Estado global de las tareas.
// Global tasks state.
type TasksState = {
  tasks: Task[];
  filter: TaskFilter;
};

// Tareas iniciales y filtro por defecto.
// Initial tasks and default filter.
const initialState: TasksState = {
  tasks: [
    {
      id: "1",
      title: "Estudiar React Native",
      description: "Repasar FlatList y componentes",
      category: "Estudio",
      createdAt: new Date().toISOString(),
      completed: false,
    },
    {
      id: "2",
      title: "Crear TaskFlow",
      description: "Continuar con el proyecto de tareas",
      category: "Trabajo",
      createdAt: new Date().toISOString(),
      completed: false,
    },
  ],
  filter: "all",
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,

  reducers: {
    // Agregar una tarea con ID automático.
    // Add a task with an automatically generated ID.
    addTask: {
      reducer: (state, action: PayloadAction<Task>) => {
        state.tasks.unshift(action.payload);
      },

      prepare: (data: {
        title: string;
        description: string;
        category: string;
      }) => {
        const task: Task = {
          id: nanoid(),
          title: data.title,
          description: data.description,
          category: data.category,
          createdAt: new Date().toISOString(),
          completed: false,
        };

        return { payload: task };
      },
    },

    // Alternar el estado de completado.
    // Toggle the task completion status.
    toggleTaskStatus: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(
        (item) => item.id === action.payload
      );

      if (task) {
        task.completed = !task.completed;
      }
    },

    // Eliminar una tarea por ID.
    // Delete a task by ID.
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(
        (item) => item.id !== action.payload
      );
    },

    // Cambiar el filtro global.
    // Update the global filter.
    setFilter: (state, action: PayloadAction<TaskFilter>) => {
      state.filter = action.payload;
    },
  },
});

export const {
  addTask,
  toggleTaskStatus,
  deleteTask,
  setFilter,
} = tasksSlice.actions;

export default tasksSlice.reducer;
