
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { useDispatch, useSelector } from "react-redux";

import { COLORS } from "../constants/theme";
import type { Task, TaskFilter } from "../constants/types";
import type { TaskStackParamList } from "../navigation/TasksStack";

import { EmptyState } from "../components/EmptyState";

import type { RootState, AppDispatch } from "../store/store";
import { setFilter } from "../store/tasksSlice";

type HomeNavProp = NativeStackNavigationProp<
  TaskStackParamList,
  "TaskList"
>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeNavProp>();

  // Obtener dispatch de Redux.
  // Get Redux dispatch.
  const dispatch = useDispatch<AppDispatch>();

  // Leer las tareas y el filtro global.
  // Read tasks and the global filter.
  const { tasks, filter } = useSelector(
    (state: RootState) => state.tasks
  );

  // Filtrar las tareas según su estado.
  // Filter tasks according to their status.
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") {
      return task.completed;
    }

    if (filter === "pending") {
      return !task.completed;
    }

    return true;
  });

  // Navegar al detalle enviando únicamente el ID.
  // Navigate to task details using only the ID.
  const handleTaskPress = (task: Task) => {
    navigation.navigate("TaskDetail", {
      id: task.id,
    });
  };

  const handleAddPress = () => {
    navigation.navigate("TaskForm");
  };

  const filters: TaskFilter[] = [
    "all",
    "pending",
    "completed",
  ];

  return (
    <View style={styles.container}>

      {/* Filtros globales / Global filters */}
      <View style={styles.filters}>
        {filters.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.filterButton,
              filter === item && styles.filterActive,
            ]}
            onPress={() => dispatch(setFilter(item))}
          >
            <Text
              style={[
                styles.filterText,
                filter === item && styles.filterTextActive,
              ]}
            >
              {item === "all"
                ? "Todas"
                : item === "pending"
                ? "Pendientes"
                : "Completadas"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Lista de tareas / Task list */}
      {filteredTasks.length === 0 ? (
        <EmptyState />
      ) : (
        <FlatList
          data={filteredTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.card,
                item.completed && styles.cardCompleted,
              ]}
              onPress={() => handleTaskPress(item)}
            >
              <Text
                style={[
                  styles.cardTitle,
                  item.completed && styles.titleCompleted,
                ]}
              >
                {item.completed ? "✅ " : ""}
                {item.title}
              </Text>

              <Text style={styles.cardCategory}>
                {item.category}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Botón agregar tarea / Add task button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddPress}
      >
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

  // Estilos de filtros / Filter styles
  filters: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
  },

  filterButton: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },

  filterActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  filterText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.text,
  },

  filterTextActive: {
    color: "#FFFFFF",
  },

  // Tarjetas de tareas / Task cards
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    width: "100%",
  },

  cardCompleted: {
    opacity: 0.6,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 6,
  },

  titleCompleted: {
    textDecorationLine: "line-through",
    color: COLORS.textLight,
  },

  cardCategory: {
    fontSize: 14,
    color: COLORS.textLight,
  },

  // Botón + / Add button
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
