// ============================================
// HOOK DE AUTENTICAÇÃO
// ============================================

import { useState, useEffect } from 'react';
import { User, AuthView } from '../types';
import { StorageUtils } from '../constants/storage';

interface UseAuthReturn {
  user: User | null;
  authView: AuthView;
  isLoading: boolean;
  showWelcome: boolean;
  showWelcomeScreen: boolean;
  setAuthView: (view: AuthView) => void;
  handleLogin: (userData: User) => void;
  handleRegister: (userData: User) => void;
  handleLogout: () => void;
  handleWelcomeComplete: () => void;
  handleWelcomeScreenStart: () => void;
  handleWelcomeScreenLogin: () => void;
}

export const useAuth = (): UseAuthReturn => {
  // ========== ESTADOS ==========
  const [user, setUser] = useState<User | null>(null);
  const [authView, setAuthView] = useState<AuthView>('login');
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);

  // ========== EFEITO: CARREGAR USUÁRIO DO STORAGE ==========
  useEffect(() => {
    try {
      const storedUser = StorageUtils.loadUser();
      const hasSeenWelcome = StorageUtils.hasSeenWelcome();
      
      if (storedUser) {
        setUser(storedUser);
        setShowWelcomeScreen(false);
      } else if (hasSeenWelcome) {
        setShowWelcomeScreen(false);
      }
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
      StorageUtils.clearAll();
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ========== HANDLERS DE AUTENTICAÇÃO ==========
  
  const handleLogin = (userData: User) => {
    try {
      setUser(userData);
      StorageUtils.saveUser(userData);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  const handleRegister = (userData: User) => {
    try {
      setUser(userData);
      StorageUtils.saveUser(userData);
      setShowWelcome(true);
    } catch (error) {
      console.error('Erro ao registrar:', error);
    }
  };

  const handleLogout = () => {
    try {
      setUser(null);
      StorageUtils.removeUser();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
  };

  const handleWelcomeScreenStart = () => {
    StorageUtils.markWelcomeSeen();
    setShowWelcomeScreen(false);
    setAuthView('register');
  };

  const handleWelcomeScreenLogin = () => {
    StorageUtils.markWelcomeSeen();
    setShowWelcomeScreen(false);
    setAuthView('login');
  };

  return {
    user,
    authView,
    isLoading,
    showWelcome,
    showWelcomeScreen,
    setAuthView,
    handleLogin,
    handleRegister,
    handleLogout,
    handleWelcomeComplete,
    handleWelcomeScreenStart,
    handleWelcomeScreenLogin,
  };
};
