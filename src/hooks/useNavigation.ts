// ============================================
// HOOK DE NAVEGAÇÃO
// ============================================

import { useState, useEffect } from 'react';
import { PageType } from '../types';
import { PAGE_ROUTES, DYNAMIC_ROUTE_PATTERNS } from '../constants/navigation';

interface UseNavigationReturn {
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
}

export const useNavigation = (isAuthenticated: boolean): UseNavigationReturn => {
  const [currentPage, setCurrentPage] = useState<PageType>('feed');

  // ========== EFEITO: GERENCIAR NAVEGAÇÃO POR HASH ==========
  useEffect(() => {
    // Só gerenciar navegação se usuário estiver logado
    if (!isAuthenticated) return;
    
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      
      // Verificar rotas dinâmicas (perfis)
      if (hash.startsWith(DYNAMIC_ROUTE_PATTERNS.PLACE_PROFILE)) {
        setCurrentPage('perfil-lugar');
      } else if (hash.startsWith(DYNAMIC_ROUTE_PATTERNS.WALKER_PROFILE)) {
        setCurrentPage('perfil-passeador');
      } else if (hash.startsWith(DYNAMIC_ROUTE_PATTERNS.PETSHOP_PROFILE)) {
        setCurrentPage('perfil-petshop');
      } else if (hash.startsWith(DYNAMIC_ROUTE_PATTERNS.CLINIC_PROFILE)) {
        setCurrentPage('perfil-clinica');
      } else if (hash.startsWith(DYNAMIC_ROUTE_PATTERNS.TRAINER_PROFILE)) {
        setCurrentPage('perfil-adestrador');
      } else if (hash.startsWith(DYNAMIC_ROUTE_PATTERNS.HOUSING_PROFILE)) {
        setCurrentPage('perfil-hospedagem');
      } else {
        // Verificar rotas estáticas
        setCurrentPage(PAGE_ROUTES[hash] || 'feed');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Executar na montagem

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isAuthenticated]);

  return {
    currentPage,
    setCurrentPage,
  };
};
