// ============================================
// CONSTANTES DE ARMAZENAMENTO LOCAL
// ============================================

// ========== CHAVES DO LOCALSTORAGE ==========
export const STORAGE_KEYS = {
  USER: 'petslike_user',
  WELCOME_SEEN: 'petslike_seen_welcome',
  THEME: 'petslike_theme',
  POSTS: 'petslike_posts',
} as const;

// ========== UTILITÁRIOS DE STORAGE ==========
export const StorageUtils = {
  // Salvar usuário
  saveUser: (user: any) => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      return true;
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
      return false;
    }
  },

  // Carregar usuário
  loadUser: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Erro ao carregar usuário:', error);
      return null;
    }
  },

  // Remover usuário
  removeUser: () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.USER);
      return true;
    } catch (error) {
      console.error('Erro ao remover usuário:', error);
      return false;
    }
  },

  // Marcar welcome como visto
  markWelcomeSeen: () => {
    try {
      localStorage.setItem(STORAGE_KEYS.WELCOME_SEEN, 'true');
      return true;
    } catch (error) {
      console.error('Erro ao marcar welcome:', error);
      return false;
    }
  },

  // Verificar se welcome foi visto
  hasSeenWelcome: () => {
    try {
      return localStorage.getItem(STORAGE_KEYS.WELCOME_SEEN) === 'true';
    } catch (error) {
      console.error('Erro ao verificar welcome:', error);
      return false;
    }
  },

  // Limpar todos os dados
  clearAll: () => {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
      return true;
    } catch (error) {
      console.error('Erro ao limpar storage:', error);
      return false;
    }
  },
};
