
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { auth, db } from "../firebase/config";
import type { Task } from "../constants/types";

type NewTask = Pick<
  Task,
  "title" | "description" | "category"
>;

// Verificar que exista una sesión.
// Verify that a user is authenticated.
function requireUser() {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("Debes iniciar sesión.");
  }

  return user;
}

// Crear una tarea en Firestore.
// Create a task in Firestore.
export async function createTask(data: NewTask) {
  const user = requireUser();

  await addDoc(collection(db, "tasks"), {
    ...data,
    userId: user.uid,
    completed: false,
    createdAt: new Date().toISOString(),
  });
}

// Actualizar el estado de una tarea.
// Update task completion status.
export async function updateTaskStatus(
  id: string,
  completed: boolean
) {
  requireUser();

  await updateDoc(doc(db, "tasks", id), {
    completed,
  });
}

// Eliminar una tarea.
// Delete a task.
export async function removeTask(id: string) {
  requireUser();

  await deleteDoc(doc(db, "tasks", id));
}
