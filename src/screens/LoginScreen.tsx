import { useState } from "react";

import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../firebase/config";
import { COLORS } from "../constants/theme";

import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AuthStackParamList } from "../navigation/AuthStack";

// Tipo de navegación para Login.
// Navigation type for Login.
type LoginNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "Login"
>;

export default function LoginScreen() {
  const navigation = useNavigation<LoginNavigationProp>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Iniciar sesión mediante Firebase Authentication.
  // Sign in using Firebase Authentication.
  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert(
        "Campos obligatorios",
        "Ingresa tu correo electrónico y contraseña.",
      );
      return;
    }

    try {
      setLoading(true);

      await signInWithEmailAndPassword(auth, email.trim(), password);

      // onAuthStateChanged detectará la sesión.
      // onAuthStateChanged will detect the session.
    } catch (error: unknown) {
      const code =
        typeof error === "object" && error !== null && "code" in error
          ? String(error.code)
          : "";

      let message = "No fue posible iniciar sesión. Inténtalo nuevamente.";

      if (
        code === "auth/invalid-credential" ||
        code === "auth/wrong-password" ||
        code === "auth/user-not-found"
      ) {
        message = "Correo o contraseña incorrectos.";
      } else if (code === "auth/invalid-email") {
        message = "El correo electrónico no es válido.";
      } else if (code === "auth/network-request-failed") {
        message = "Revisa tu conexión a Internet.";
      } else if (code === "auth/too-many-requests") {
        message = "Demasiados intentos. Intenta más tarde.";
      }

      Alert.alert("Error de inicio de sesión", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.title}>TaskFlow</Text>

      <Text style={styles.subtitle}>Iniciar sesión</Text>

      <Text style={styles.label}>Correo electrónico</Text>

      <TextInput
        style={styles.input}
        placeholder="correo@ejemplo.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="email"
      />

      <Text style={styles.label}>Contraseña</Text>

      <TextInput
        style={styles.input}
        placeholder="Ingresa tu contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        autoComplete="current-password"
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.disabledButton]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        )}
      </TouchableOpacity>

      {/* Navegar a la pantalla de registro. */}
      {/* Navigate to the registration screen. */}
      <TouchableOpacity
        style={styles.registerLink}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.registerText}>
          ¿No tienes una cuenta? Regístrate aquí
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    paddingHorizontal: 25,
  },

  title: {
    fontSize: 36,
    fontWeight: "800",
    color: COLORS.primary,
    textAlign: "center",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 22,
    fontWeight: "600",
    color: COLORS.text,
    textAlign: "center",
    marginBottom: 35,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 8,
  },

  input: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 20,
  },

  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 10,
  },

  disabledButton: {
    opacity: 0.6,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },
  registerLink: {
  marginTop: 25,
  alignItems: "center",
},

registerText: {
  fontSize: 15,
  fontWeight: "600",
  color: COLORS.primary,
},
});
