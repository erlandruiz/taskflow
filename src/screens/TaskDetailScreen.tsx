
import { Alert, Text, View } from "react-native";
import { useState } from "react";

import {
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import type { RouteProp } from "@react-navigation/native";

import { useSelector } from "react-redux";

import type { TaskStackParamList } from "../navigation/TasksStack";
import type { RootState } from "../store/store";

import {
  updateTaskStatus,
  removeTask,
} from "../services/tasksFirestore";

import TaskDetail from "../components/TaskDetail";

type TaskDetailRouteProp = RouteProp<
  TaskStackParamList,
  "TaskDetail"
>;

export default function TaskDetailScreen() {
  const route = useRoute<TaskDetailRouteProp>();
  const navigation = useNavigation();

  const { id } = route.params;

  const [saving, setSaving] = useState(false);

  // Buscar la tarea sincronizada con Firestore.
  // Find the task synchronized with Firestore.
  const task = useSelector((state: RootState) =>
    state.tasks.tasks.find((item) => item.id === id)
  );

  // Actualizar el estado en Firestore.
  // Update task status in Firestore.
  const handleToggleTask = async () => {
    if (!task || saving) return;

    try {
      setSaving(true);

      await updateTaskStatus(
        task.id,
        !task.completed
      );

      // onSnapshot actualizará Redux automáticamente.
      // onSnapshot will automatically update Redux.
    } catch (error) {
      console.error("Error al actualizar tarea:", error);

      Alert.alert(
        "Error",
        "No se pudo actualizar la tarea."
      );
    } finally {
      setSaving(false);
    }
  };

  // Eliminar la tarea de Firestore.
  // Delete the task from Firestore.
  const handleDeleteTask = async () => {
    if (!task || saving) return;

    try {
      setSaving(true);

      await removeTask(task.id);

      // Regresar a la lista después de eliminar.
      // Return to the list after deleting.
      navigation.goBack();
    } catch (error) {
      console.error("Error al eliminar tarea:", error);

      Alert.alert(
        "Error",
        "No se pudo eliminar la tarea."
      );
    } finally {
      setSaving(false);
    }
  };

  if (!task) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>No se encontró la tarea.</Text>
      </View>
    );
  }

  return (
    <TaskDetail
      task={task}
      onBack={() => navigation.goBack()}
      onToggle={handleToggleTask}
      onDelete={handleDeleteTask}
    />
  );
}
