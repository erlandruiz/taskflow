
import { View, Text, ScrollView, StyleSheet } from "react-native";

import { ProfileCard } from "../components/ProfileCards";
import { COLORS } from "../constants/theme";

export function ProfileScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Mi Perfil</Text>
        <Text style={styles.subtitle}>Equipo de trabajo</Text>
      </View>

      <View style={styles.profileList}>
        <ProfileCard
          name="Melisa Lopez"
          role="Diseñadora"
          image="https://i.pravatar.cc/150?img=47"
           
        />

        <ProfileCard
          name="Erland Ruiz"
          role="Estudiante de React Native"
          image="https://i.pravatar.cc/150?img=12"
           isActive={true}
             
        />

        <ProfileCard
          name="Rebeca Perez"
          role="Arquitecta"
          image="https://i.pravatar.cc/150?img=32"
         
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 70,
    paddingBottom: 30,
  },

  header: {
    marginBottom: 24,
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: COLORS.primary,
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    color: COLORS.textLight,
  },

  profileList: {
    gap: 12,
  },
});
