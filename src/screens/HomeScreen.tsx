
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../constants/theme";

export function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TaskFlow</Text>

      <Text style={styles.subtitle}>
        Bienvenido a TaskFlow
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
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
});
