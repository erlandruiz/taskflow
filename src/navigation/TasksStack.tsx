import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import TaskDetailScreen from "../screens/TaskDetailScreen";
import TaskForm from "../components/TaskForm";
import { COLORS } from "../constants/theme";

import { useState } from "react";
import type { Task } from "../constants/types";

export type TaskStackParamList = {
  TaskList: undefined;
  TaskDetail: {
    id: string;
  };
  TaskForm: undefined;
};

const Stack = createNativeStackNavigator<TaskStackParamList>();

export default function TasksStack() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Estudiar React Native",
      description: "Repasar Flatlist y componentes",
      category: "Estudio",
      createAt: new Date(),
    },
    {
      id: "2",
      title: "Crear TaskFlow",
      description: "Continuar con el proyecto de tareas",
      category: "Trabajo",
      createAt: new Date(),
    },
  ]);

  const handleAddTask = (newTask: Task) => {
    setTasks((previousTasks) => [newTask, ...previousTasks]);
  };

  return (
    <Stack.Navigator
      initialRouteName="TaskList"
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name="TaskList" options={{ title: "Mis tareas" }}>
        {(props) => <HomeScreen {...props} tasks={tasks} />}
      </Stack.Screen>
      <Stack.Screen name="TaskDetail" options={{ title: "Detalle de tarea" }}>
        {(props) => <TaskDetailScreen {...props} tasks={tasks} />}
      </Stack.Screen>
      <Stack.Screen
        name="TaskForm"
        options={{
          title: "Nueva tarea",
          presentation: "modal",
        }}
      >
        {(props) => <TaskForm {...props} onAddTask={handleAddTask} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
