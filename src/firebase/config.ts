
import { initializeApp, getApp, getApps } from "firebase/app";


import {
  initializeAuth,
  getAuth,
} from "firebase/auth";

// Compatibilidad de tipos de Firebase con React Native.
// Firebase React Native type compatibility.
// @ts-expect-error: La función existe en el módulo de React Native,
// pero TypeScript está resolviendo los tipos del módulo web.
import { getReactNativePersistence } from "firebase/auth";


import { getFirestore } from "firebase/firestore";

import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyC_BaxAT_gqPx1_bh0ihrLvmaCYNYE8usc",
  authDomain: "epps-d3059.firebaseapp.com",
  projectId: "epps-d3059",
  storageBucket: "epps-d3059.firebasestorage.app",
  messagingSenderId: "949317583622",
  appId: "1:949317583622:web:4abb04d46aa8df446cd487"
};


// Inicializar Firebase.
// Initialize Firebase.
export const app = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig);

// Configurar autenticación persistente.
// Configure persistent authentication.
export const auth = (() => {
  try {
    return initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (error: any) {
    if (error.code === "auth/already-initialized") {
      return getAuth(app);
    }
    throw error;
  }
})();

// Inicializar Cloud Firestore.
// Initialize Cloud Firestore.
export const db = getFirestore(app);
