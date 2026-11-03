import { useState } from "react";
import { COLORS } from "../constants/theme";
import type { Task } from "../constants/types";

import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  onAddTask: (task: Task) => void;
};

export default function TaskForm({ onAddTask }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Trabajo");

  const [touchedTitle, setTouchedTitle] = useState(false);
  const [touchedDescription, setTouchedDescription] = useState(false);

  const [focusedTitle, setFocusedTitle] = useState(false);
  const [focusedDescription, setFocusedDescription] = useState(false);

  const handleAddTask = () => {
    setTouchedTitle(true);
    setTouchedDescription(true);
    if (title.trim().length < 5 || description.trim().length < 10) {
      return;
    }

    const task = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      category,
      createAt: new Date(),
    };
    onAddTask(task);

    console.log("tarea ok", task);
    Alert.alert("Éxito", "Tarea capturada localmente");

    setTitle("");
    setDescription("");
    setCategory("Trabajo");
    setTouchedTitle(false);
    setTouchedDescription(false);
  };

  const titleError = touchedTitle && title.trim().length < 5;
  const descriptionError = touchedDescription && description.trim().length < 10;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Nueva Tarea</Text>
        <Text style={styles.label}>Título</Text>
        <TextInput
          style={[
            styles.input,
            focusedTitle && styles.focusedInput,
            titleError && styles.errorInput,
          ]}
          placeholder="Título de la tarea"
          value={title}
          onChangeText={setTitle}
          onFocus={() => setFocusedTitle(true)}
          onBlur={() => {
            setFocusedTitle(false);
            setTouchedTitle(true);
          }}
          autoCapitalize="sentences"
          returnKeyType="next"
        />
        {titleError && (
          <Text style={styles.error}>
            El título debe tener al menos 5 caracteres
          </Text>
        )}

        <Text style={styles.label}>Descripción</Text>
        <TextInput
          style={[
            styles.input,
            styles.description,
            focusedDescription && styles.focusedInput,
            descriptionError && styles.errorInput,
          ]}
          placeholder="Descripción"
          value={description}
          onChangeText={setDescription}
          onFocus={() => setFocusedDescription(true)}
          onBlur={() => {
            setFocusedDescription(false);
            setTouchedDescription(true);
          }}
          autoCapitalize="sentences"
          multiline
        />
        {descriptionError && (
          <Text style={styles.error}>
            La descripción debe tener al menos 10 caracteres
          </Text>
        )}

        <Text style={styles.label}>Categoría</Text>
        <View style={styles.categories}>
          {["Trabajo", "Estudio", "Personal"].map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.category,
                category === item && styles.selectedCategory,
              ]}
              onPress={() => setCategory(item)}
            >
              <Text
                style={[
                  styles.categoryText,
                  category === item && styles.selectedCategoryText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.button} onPress={handleAddTask}>
          <Text style={styles.buttonText}> Guardar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 30,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: COLORS.primary,
    marginBottom: 25,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 8,
    marginTop: 15,
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
  },

  description: {
    height: 110,
    textAlignVertical: "top",
  },

  errorInput: {
    borderColor: "#DC2626",
    borderWidth: 2,
  },

  error: {
    color: "#DC2626",
    fontSize: 12,
    marginTop: 6,
  },

  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 6,
  },

  category: {
    backgroundColor: "#F1F5F9",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  selectedCategory: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  categoryText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textLight,
  },

  selectedCategoryText: {
    color: "#FFFFFF",
  },

  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },
  focusedInput: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
});
