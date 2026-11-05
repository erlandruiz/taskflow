
import { View, Text } from "react-native";

import {
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import type { RouteProp } from "@react-navigation/native";

import { useDispatch, useSelector } from "react-redux";

import type { TaskStackParamList } from "../navigation/TasksStack";
import type { RootState, AppDispatch } from "../store/store";

import {
  toggleTaskStatus,
  deleteTask,
} from "../store/tasksSlice";

import TaskDetail from "../components/TaskDetail";

type TaskDetailRouteProp = RouteProp<
  TaskStackParamList,
  "TaskDetail"
>;

export default function TaskDetailScreen() {
  const route = useRoute<TaskDetailRouteProp>();
  const navigation = useNavigation();

  // Obtener dispatch de Redux.
  // Get Redux dispatch.
  const dispatch = useDispatch<AppDispatch>();

  // Recibir únicamente el ID desde la navegación.
  // Receive only the task ID from navigation.
  const { id } = route.params;

  // Buscar la tarea directamente en Redux.
  // Find the task directly in Redux.
  const task = useSelector((state: RootState) =>
    state.tasks.tasks.find((item) => item.id === id)
  );

  // Cambiar el estado de la tarea.
  // Toggle task completion status.
  const handleToggleTask = () => {
    dispatch(toggleTaskStatus(id));
  };

  // Eliminar la tarea y regresar a la lista.
  // Delete task and return to the list.
  const handleDeleteTask = () => {
    dispatch(deleteTask(id));
    navigation.goBack();
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
