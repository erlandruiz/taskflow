import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../constants/theme";
import TaskForm from "../components/TaskForm";

import { EmptyState } from "../components/EmptyState";
import TaskDetail from "../components/TaskDetail";
import { Task } from "../constants/types";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { TaskStackParamList } from "../navigation/TasksStack";

type HomeNavProp = NativeStackNavigationProp<TaskStackParamList, "TaskList">;
type Props = {
  tasks: Task[];
};

export default function HomeScreen({ tasks }: Props) {
  const navigation = useNavigation<HomeNavProp>();

  // const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  // const [showForm, setShowForm] = useState(false);

  // const handleAddTask = (newTask: Task) => {
  //   setTask((previousTasks) => [newTask, ...previousTasks]);

  //   setShowForm(false);
  // };

  // if (selectedTask) {
  //   return (
  //     <TaskDetail task={selectedTask} onBack={() => setSelectedTask(null)} />
  //   );
  // }
  // if (showForm) {
  //   return <TaskForm onAddTask={handleAddTask} />;
  // }


const handleTaskPress = (task: Task) => {
  // Enviar únicamente el ID de la tarea.
  // Send only the task ID.
  navigation.navigate("TaskDetail", {
    id: task.id,
  });
};


  const handleAddPress = () => {
    navigation.navigate("TaskForm");
  };

  return (
    <View style={styles.container}>
      {tasks.length === 0 ? (
        <EmptyState />
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => handleTaskPress(item)}
            >
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardCategory}>{item.category}</Text>
            </TouchableOpacity>
          )}
        />
      )}
      <TouchableOpacity style={styles.addButton} onPress={handleAddPress}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "flex-start",
    alignItems: "stretch",
    padding: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 18,
    color: COLORS.textLight,
    textAlign: "center",
  },

  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    width: "100%",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 6,
  },

  cardCategory: {
    fontSize: 14,
    color: COLORS.textLight,
  },

  addButton: {
    backgroundColor: COLORS.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    marginTop: 15,
    elevation: 4,
  },

  addButtonText: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "400",
    lineHeight: 42,
  },
});
