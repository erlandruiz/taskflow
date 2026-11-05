
import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasksSlice";

// Configurar el Store global de la aplicación.
// Configure the application's global Store.
export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

// Tipos para trabajar con Redux y TypeScript.
// Types for Redux and TypeScript.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
