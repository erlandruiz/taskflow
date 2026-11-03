import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

import { COLORS } from "../constants/theme";
import type { Task } from "../constants/types";

type Props = {
  task: Task;
  onBack: () => void;
};

export default function TaskDetail({ task, onBack }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Detalle de la tarea</Text>

      <View style={styles.card}>
        <Text style={styles.title}>{task.title}</Text>

        <Text style={styles.label}>Descripción</Text>
        <Text style={styles.value}>{task.description}</Text>

        <Text style={styles.label}>Categoría</Text>
        <Text style={styles.value}>{task.category}</Text>

        <Text style={styles.label}>Fecha</Text>
        <Text style={styles.value}>
          {task.createAt.toLocaleDateString("es-PE")}
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={onBack}>
        <Text style={styles.buttonText}>Volver</Text>
      </TouchableOpacity>
    </View>
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

  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 24,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },
});
