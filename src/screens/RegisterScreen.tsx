
import { useState } from "react";

import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "../firebase/config";
import { COLORS } from "../constants/theme";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Registrar una cuenta en Firebase Authentication.
  // Register an account using Firebase Authentication.
  const handleRegister = async () => {
    const cleanEmail = email.trim();

    // Validar campos obligatorios.
    // Validate required fields.
    if (!cleanEmail || !password || !confirmPassword) {
      Alert.alert(
        "Campos obligatorios",
        "Completa todos los campos."
      );
      return;
    }

    // Validar longitud mínima de contraseña.
    // Validate minimum password length.
    if (password.length < 6) {
      Alert.alert(
        "Contraseña inválida",
        "La contraseña debe tener al menos 6 caracteres."
      );
      return;
    }

    // Verificar que las contraseñas coincidan.
    // Check that passwords match.
    if (password !== confirmPassword) {
      Alert.alert(
        "Contraseñas diferentes",
        "Las contraseñas no coinciden."
      );
      return;
    }

    try {
      setLoading(true);

      // Crear el usuario en Firebase.
      // Create the user in Firebase.
      await createUserWithEmailAndPassword(
        auth,
        cleanEmail,
        password
      );

      // Firebase inicia la sesión después del registro.
      // Firebase signs in the user after registration.
      // onAuthStateChanged actualizará Redux automáticamente.

    } catch (error: unknown) {
      const code =
        typeof error === "object" &&
        error !== null &&
        "code" in error
          ? String(error.code)
          : "";

      let message =
        "No fue posible crear la cuenta. Inténtalo nuevamente.";

      if (code === "auth/email-already-in-use") {
        message = "Este correo electrónico ya está registrado.";
      } else if (code === "auth/invalid-email") {
        message = "Ingresa un correo electrónico válido.";
      } else if (code === "auth/weak-password") {
        message = "La contraseña no cumple los requisitos de seguridad.";
      } else if (code === "auth/network-request-failed") {
        message = "Revisa tu conexión a Internet.";
      } else if (code === "auth/operation-not-allowed") {
        message = "El registro con correo y contraseña no está habilitado.";
      }

      Alert.alert("Error de registro", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>TaskFlow</Text>

        <Text style={styles.subtitle}>
          Crear cuenta
        </Text>

        <Text style={styles.label}>
          Correo electrónico
        </Text>

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

        <Text style={styles.label}>
          Contraseña
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Mínimo 6 caracteres"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          autoComplete="new-password"
        />

        <Text style={styles.label}>
          Confirmar contraseña
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Repite tu contraseña"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          autoCapitalize="none"
          autoComplete="new-password"
        />

        <TouchableOpacity
          style={[
            styles.button,
            loading && styles.disabledButton,
          ]}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>
              Crear cuenta
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 25,
    paddingVertical: 35,
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
});
