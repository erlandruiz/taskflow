import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { Provider, useSelector } from "react-redux";

import { store } from "./src/store/store";
import type { RootState } from "./src/store/store";

import AppNavigator from "./src/navigation/AppNavigator";
import AuthStack from "./src/navigation/AuthStack";
import { useAuthSession } from "./src/hooks/useAuthSession";

// Controlar el acceso según Firebase Authentication.
// Control access based on Firebase Authentication.
function AppContent() {
  useAuthSession();

  const { user, initializing } = useSelector((state: RootState) => state.auth);

  // Esperar mientras Firebase comprueba la sesión.
  // Wait while Firebase checks the session.
  if (initializing) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#7B68EE" />
        <Text style={styles.message}>Verificando sesión...</Text>
      </View>
    );
  }

  // Mostrar Login/Register si no existe una sesión.
  // Show Login/Register when there is no active session.
  if (!user) {
    return <AuthStack />;
  }

  // Mostrar TaskFlow solo a usuarios autenticados.
  // Show TaskFlow only to authenticated users.
  return <AppNavigator />;

}

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <AppContent />
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#7B68EE",
    marginBottom: 15,
  },

  message: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 12,
  },
});
