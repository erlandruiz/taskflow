import { Text, View, StyleSheet } from "react-native";
import { COLORS } from "../constants/theme";

export function EmptyState() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        ¡No tienes tareas pendientes!
      </Text>

      <Text style={styles.message}>
        Empieza por crear una arriba.
      </Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
    marginTop: 40,
    backgroundColor: COLORS.card,
    borderRadius: 12,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.primary,
    textAlign: "center",
    marginBottom: 12,
  },

  message: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: "center",
    lineHeight: 24,
  },
});
