import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { loginUser, registerUser } from '../services/authService';

function normalizeSession(data) {
  const backendUser = data?.user || data?.data?.user || data?.account || data;
  return {
    user: backendUser || null,
    token: data?.token || data?.accessToken || null,
  };
}

const useAuthStore = create()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      register: async (userData) => {
        set({ loading: true, error: null });
        try {
          const session = normalizeSession(await registerUser(userData));
          set({ ...session, isAuthenticated: Boolean(session.user), loading: false });
          return session;
        } catch (error) {
          set({ error: error.message, loading: false });
          throw error;
        }
      },

      login: async (credentials) => {
        set({ loading: true, error: null });
        try {
          const session = normalizeSession(await loginUser(credentials));
          set({ ...session, isAuthenticated: Boolean(session.user), loading: false });
          return session;
        } catch (error) {
          set({ error: error.message, loading: false });
          throw error;
        }
      },

      logout: () => {
        // BACK-END : appeler POST /api/v1/auth/logout si le back invalide les tokens.
        set({ user: null, token: null, isAuthenticated: false, error: null });
      },
    }),
    {
      name: 'destinyline-auth',
      partialize: (state) => ({ user: state.user, token: state.token, isAuthenticated: state.isAuthenticated }),
    },
  ),
);

export default useAuthStore;
