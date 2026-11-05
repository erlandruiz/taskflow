
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

import { ProfileCard } from "../components/ProfileCards";
import { COLORS } from "../constants/theme";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

export function ProfileScreen() {

  
  // Cerrar la sesión del usuario en Firebase.
  // Sign out the user from Firebase.
  const handleLogout = () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Estás seguro de que deseas cerrar sesión?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Cerrar sesión",
          style: "destructive",
          onPress: async () => {
            try {
              await signOut(auth);
            } catch (error) {
              console.error(
                "Error al cerrar sesión:",
                error
              );

              Alert.alert(
                "Error",
                "No se pudo cerrar la sesión. Inténtalo nuevamente."
              );
            }
          },
        },
      ]
    );
  };

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

      
      {/* Cerrar sesión / Sign out */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutText}>
          Cerrar sesión
        </Text>
      </TouchableOpacity>


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
  
  logoutButton: {
    backgroundColor: "#DC2626",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },

  logoutText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },

});
