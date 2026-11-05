
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Información del usuario autenticado.
// Authenticated user information.
export type AuthUser = {
  uid: string;
  email: string | null;
};

// Estado de autenticación.
// Authentication state.
type AuthState = {
  user: AuthUser | null;
  initializing: boolean;
};

const initialState: AuthState = {
  user: null,
  initializing: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    // Guardar o limpiar el usuario autenticado.
    // Save or clear the authenticated user.
    setUser: (
      state,
      action: PayloadAction<AuthUser | null>
    ) => {
      state.user = action.payload;
      state.initializing = false;
    },
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
