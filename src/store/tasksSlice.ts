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
  // Las tareas se cargarán desde Firestore.
  // Tasks will be loaded from Firestore.
  tasks: [],

  // Filtro inicial.
  // Default filter.
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
      const task = state.tasks.find((item) => item.id === action.payload);

      if (task) {
        task.completed = !task.completed;
      }
    },

    // Eliminar una tarea por ID.
    // Delete a task by ID.
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((item) => item.id !== action.payload);
    },

    // Cambiar el filtro global.
    // Update the global filter.
    setFilter: (state, action: PayloadAction<TaskFilter>) => {
      state.filter = action.payload;
    },

    // Sincronizar las tareas recibidas desde Firestore.
    // Synchronize tasks received from Firestore.
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
  },
});

export const { addTask, toggleTaskStatus, deleteTask, setFilter, setTasks } =
  tasksSlice.actions;

export default tasksSlice.reducer;
