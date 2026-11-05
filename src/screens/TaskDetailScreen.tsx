
import { View, Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";

import type { TaskStackParamList } from "../navigation/TasksStack";
import type { Task } from "../constants/types";
import TaskDetail from "../components/TaskDetail";

// Tipo de los parámetros de navegación.
// Navigation route parameters type.
type TaskDetailRouteProp = RouteProp<
  TaskStackParamList,
  "TaskDetail"
>;

// Recibimos las tareas del estado compartido.
// Receive tasks from the shared state.
type Props = {
  tasks: Task[];
};

export default function TaskDetailScreen({ tasks }: Props) {
  const route = useRoute<TaskDetailRouteProp>();
  const navigation = useNavigation();

  // Buscar la tarea utilizando únicamente su ID.
  // Find the task using only its ID.
  const task = tasks.find(
    (item) => item.id === route.params.id
  );

  // Mostrar un mensaje si la tarea no existe.
  // Display a message if the task does not exist.
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
    />
  );
}
