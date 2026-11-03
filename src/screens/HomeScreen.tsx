import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../constants/theme";
import TaskForm from "../components/TaskForm";
import { useState } from "react";
import { EmptyState } from "../components/EmptyState";
import TaskDetail from "../components/TaskDetail";
import { Task } from "../constants/types";

export default function HomeScreen() {
  const [task, setTask] = useState<Task[]>([
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

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleAddTask = (newTask: Task) => {
    setTask((previousTasks) => [newTask, ...previousTasks]);

    setShowForm(false);
  };

  if (selectedTask) {
    return (
      <TaskDetail task={selectedTask} onBack={() => setSelectedTask(null)} />
    );
  }
  if (showForm) {
    return <TaskForm onAddTask={handleAddTask} />;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis tareas</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setShowForm(true)}
      >
        <Text style={styles.addButtonText}>+ Nueva tarea</Text>
      </TouchableOpacity>

      {task.length === 0 ? (
        <EmptyState />
      ) : (
        <FlatList
          data={task}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => setSelectedTask(item)}
            >
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardCategory}>{item.category}</Text>
            </TouchableOpacity>
          )}
        />
      )}
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
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },

  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
