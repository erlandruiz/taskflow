
import {
  Alert,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
    ScrollView,
} from "react-native";

import { COLORS } from "../constants/theme";
import type { Task } from "../constants/types";

type Props = {
  task: Task;
  onBack: () => void;
  onToggle: () => void;
  onDelete: () => void;
};

export default function TaskDetail({
  task,
  onBack,
  onToggle,
  onDelete,
}: Props) {

  // Confirmar antes de eliminar la tarea.
  // Confirm before deleting the task.
  const handleDeletePress = () => {
    Alert.alert(
      "Eliminar tarea",
      "¿Estás seguro de que deseas eliminar esta tarea?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: onDelete,
        },
      ]
    );
  };

  return (
      <ScrollView
    style={styles.container}
    contentContainerStyle={{ paddingBottom: 50 }}
    showsVerticalScrollIndicator={true}
  >
      <Text style={styles.heading}>
        Detalle de la tarea
      </Text>

      <View style={styles.card}>
        <Text style={styles.title}>
          {task.title}
        </Text>

        <Text style={styles.label}>
          Descripción
        </Text>
        <Text style={styles.value}>
          {task.description}
        </Text>

        <Text style={styles.label}>
          Categoría
        </Text>
        <Text style={styles.value}>
          {task.category}
        </Text>

        <Text style={styles.label}>
          Fecha
        </Text>
        <Text style={styles.value}>
          {new Date(task.createdAt).toLocaleDateString("es-PE")}
        </Text>

        <Text style={styles.label}>
          Estado
        </Text>
        <Text
          style={[
            styles.value,
            task.completed
              ? styles.completedText
              : styles.pendingText,
          ]}
        >
          {task.completed ? "Completada" : "Pendiente"}
        </Text>
      </View>

      {/* Cambiar el estado / Toggle task status */}
      <TouchableOpacity
        style={[styles.button, styles.completeButton]}
        onPress={onToggle}
      >
        <Text style={styles.buttonText}>
          {task.completed
            ? "Marcar como pendiente"
            : "Marcar como completada"}
        </Text>
      </TouchableOpacity>

      {/* Eliminar tarea / Delete task */}
      <TouchableOpacity
        style={[styles.button, styles.deleteButton]}
        onPress={handleDeletePress}
      >
        <Text style={styles.buttonText}>
          Eliminar tarea
        </Text>
      </TouchableOpacity>

      {/* Regresar / Go back */}
      <TouchableOpacity
        style={styles.button}
        onPress={onBack}
      >
        <Text style={styles.buttonText}>
          Volver
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },

  heading: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.primary,
    marginBottom: 24,
  },

  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 18,
  },

  label: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.primary,
    marginTop: 14,
    marginBottom: 6,
  },

  value: {
    fontSize: 16,
    color: COLORS.text,
    lineHeight: 24,
  },

  completedText: {
    color: COLORS.success,
    fontWeight: "700",
  },

  pendingText: {
    color: COLORS.textLight,
    fontWeight: "700",
  },

  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 16,
  },

  completeButton: {
    backgroundColor: COLORS.success,
    marginTop: 24,
  },

  deleteButton: {
    backgroundColor: COLORS.danger,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },
});
