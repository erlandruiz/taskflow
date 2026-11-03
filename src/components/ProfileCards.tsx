import { Text, View, Image, StyleSheet } from "react-native";

import { COLORS } from "../constants/theme";

type Props = {
  name: string;
  role: string;
  image: string;
  isActive?: boolean;
};

export function ProfileCard({ name, role, image, isActive = true }: Props) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.avatar} />

      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.role}>{role}</Text>

        <View
          style={[
            styles.statusBadge,
            isActive ? styles.active : styles.inactive,
          ]}
        >
          <Text style={styles.statusText}>
            {isActive ? "Activo" : "Inactivo"}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginVertical: 8,

    // Sombra en iOS
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,

    // Sombra en Android
    elevation: 3,
  },

  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginRight: 16,
    backgroundColor: COLORS.background,
  },

  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },

  name: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 6,
  },

  role: {
    fontSize: 14,
    color: COLORS.textLight,
  },

  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 10,
  },

  active: {
    backgroundColor: COLORS.success,
  },

  inactive: {
    backgroundColor: COLORS.danger,
  },

  statusText: {
    color: COLORS.card,
    fontSize: 12,
    fontWeight: "600",
  },
});
