
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

import { auth, db } from "../firebase/config";
import { setUser } from "../store/authSlice";
import { setTasks } from "../store/tasksSlice";

import type { AppDispatch, RootState } from "../store/store";
import type { Task } from "../constants/types";

export function useAuthSession() {
  const dispatch = useDispatch<AppDispatch>();

  // Obtener el ID del usuario autenticado.
  // Get the authenticated user ID.
  const userId = useSelector(
    (state: RootState) => state.auth.user?.uid
  );

  // 1. Restaurar y controlar la sesión.
  // Restore and manage the session.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        // Evitar mostrar tareas de una sesión anterior.
        // Prevent displaying tasks from a previous session.
        dispatch(setTasks([]));

        if (firebaseUser) {
          dispatch(
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
            })
          );
        } else {
          dispatch(setUser(null));
        }
      },
      (error) => {
        console.error("Error de autenticación:", error);
        dispatch(setTasks([]));
        dispatch(setUser(null));
      }
    );

    return unsubscribe;
  }, [dispatch]);

  // 2. Sincronizar las tareas desde Cloud Firestore.
  // Synchronize tasks from Cloud Firestore.
  useEffect(() => {
    if (!userId) {
      dispatch(setTasks([]));
      return;
    }

    // Consultar únicamente las tareas del usuario.
    // Query only the current user's tasks.
    const tasksQuery = query(
      collection(db, "tasks"),
      where("userId", "==", userId)
    );

    const unsubscribe = onSnapshot(
      tasksQuery,
      (snapshot) => {
        const tasks: Task[] = snapshot.docs.map((document) => {
          const data = document.data();

          return {
            id: document.id,
            title: data.title,
            description: data.description,
            category: data.category,
            completed: data.completed === true,
            createdAt: data.createdAt,
          };
        });

        // Actualizar Redux con los datos de Firestore.
        // Update Redux with Firestore data.
        dispatch(setTasks(tasks));
      },
      (error) => {
        console.error(
          "Error al sincronizar las tareas:",
          error
        );
      }
    );

    // Detener la escucha al cambiar de usuario.
    // Stop listening when the user changes.
    return unsubscribe;
  }, [userId, dispatch]);
}
