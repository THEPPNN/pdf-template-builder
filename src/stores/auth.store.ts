import { create } from 'zustand';

type AuthState = {
  isAuthenticated: boolean;
  user: { email: string } | null;

  login: (email: string, password: string) => boolean;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,

  login: (email, password) => {
    // mock auth
    if (email === 'admin@gmail.com' && password === '123456') {
      set({
        isAuthenticated: true,
        user: { email },
      });
      return true;
    }

    return false;
  },

  logout: () => {
    set({
      isAuthenticated: false,
      user: null,
    });
  },
}));