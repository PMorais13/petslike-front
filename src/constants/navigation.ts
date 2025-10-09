// ============================================
// CONSTANTES DE NAVEGAÇÃO
// ============================================

import { PageType } from '../types';

// ========== MAPEAMENTO DE ROTAS ==========
export const PAGE_ROUTES: Record<string, PageType> = {
  'perfil': 'perfil',
  'explorar': 'explorar',
  'adocao': 'adocao',
  'perfil-usuario': 'perfil-usuario',
  'lugares': 'lugares',
  'comunidade': 'comunidade',
  'passeadores': 'passeadores',
  'petshops': 'petshops',
  'clinicas': 'clinicas',
  'adestradores': 'adestradores',
  'hospedagens': 'hospedagens',
};

// ========== PADRÕES DE ROTA DINÂMICA ==========
export const DYNAMIC_ROUTE_PATTERNS = {
  PLACE_PROFILE: 'lugar-',
  WALKER_PROFILE: 'passeador-',
  PETSHOP_PROFILE: 'petshop-',
  CLINIC_PROFILE: 'clinica-',
  TRAINER_PROFILE: 'adestrador-',
  HOUSING_PROFILE: 'hospedagem-',
} as const;

// ========== ITENS DO MENU SIDEBAR ==========
export const MENU_ITEMS = [
  { id: 'feed', label: 'Feed', icon: 'Home', hash: '' },
  { id: 'explorar', label: 'Explorar', icon: 'Compass', hash: 'explorar' },
  { id: 'adocao', label: 'Adoção', icon: 'Heart', hash: 'adocao' },
  { id: 'lugares', label: 'Lugares Pet Friendly', icon: 'MapPin', hash: 'lugares' },
  { id: 'comunidade', label: 'Comunidade', icon: 'Users', hash: 'comunidade' },
] as const;

// ========== SUBMENU DE SERVIÇOS ==========
export const SERVICE_MENU_ITEMS = [
  { id: 'passeadores', label: 'Passeadores', hash: 'passeadores' },
  { id: 'petshops', label: 'Pet Shops', hash: 'petshops' },
  { id: 'clinicas', label: 'Clínicas', hash: 'clinicas' },
  { id: 'adestradores', label: 'Adestradores', hash: 'adestradores' },
  { id: 'hospedagens', label: 'Hospedagem', hash: 'hospedagens' },
] as const;
