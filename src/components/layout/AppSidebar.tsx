// ============================================
// COMPONENTE: SIDEBAR PRINCIPAL DA APLICAÇÃO
// ============================================

import { 
  Heart, Home, Search, Users, Settings, MapPin, 
  Award, User, LogOut, ChevronDown, ChevronRight, ArrowLeft 
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { LogoutModal } from '../LogoutModal';

interface SidebarProps {
  onNavigate?: () => void;
}

// ========== DEFINIÇÃO DOS ITENS DO MENU ==========
const MENU_CONFIG = [
  { icon: Home, label: 'Feed', hash: '', page: 'feed' },
  { icon: Search, label: 'Explorar', hash: 'explorar', page: 'explorar' },
  { 
    icon: Settings, 
    label: 'Serviços', 
    hasSubmenu: true,
    submenu: [
      { label: 'Passeadores', hash: 'passeadores', page: 'passeadores' },
      { label: 'Pet Shops', hash: 'petshops', page: 'petshops' },
      { label: 'Clínicas', hash: 'clinicas', page: 'clinicas' },
      { label: 'Adestradores', hash: 'adestradores', page: 'adestradores' },
      { label: 'Hospedagens', hash: 'hospedagens', page: 'hospedagens' },
    ]
  },
  { icon: Users, label: 'Comunidade', hash: 'comunidade', page: 'comunidade' },
  { icon: Award, label: 'Adoção e Pets Perdidos', hash: 'adocao', page: 'adocao' },
  { icon: MapPin, label: 'Lugares Pet Friendly', hash: 'lugares', page: 'lugares' },
];

export function AppSidebar({ onNavigate }: SidebarProps = {}) {
  // ========== ESTADOS ==========
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('feed');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [user, setUser] = useState<any>(null);

  // ========== EFEITO: CARREGAR USUÁRIO ==========
  useEffect(() => {
    const storedUser = localStorage.getItem('petslike_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ========== EFEITO: SINCRONIZAR PÁGINA COM HASH ==========
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      setCurrentPage(hash || 'feed');
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // ========== HANDLERS ==========
  const handleNavigate = (hash: string) => {
    window.location.hash = hash;
    onNavigate?.();
  };

  const handleLogout = () => {
    localStorage.removeItem('petslike_user');
    window.location.reload();
  };

  const isPageActive = (page: string) => {
    return currentPage === page || (page === 'feed' && currentPage === '');
  };

  const shouldShowBackButton = ['perfil', 'explorar', 'adocao'].includes(currentPage);

  return (
    <div className="w-full md:w-64 h-full md:h-screen bg-white border-r border-gray-200 flex flex-col">
      
      {/* ========== SEÇÃO: LOGO / BOTÃO VOLTAR ========== */}
      <div className="p-6 flex items-center gap-2">
        {shouldShowBackButton ? (
          <button
            onClick={() => handleNavigate('')}
            className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar</span>
          </button>
        ) : (
          <>
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="text-purple-600 font-semibold text-lg">Petslike</span>
          </>
        )}
      </div>

      {/* ========== SEÇÃO: NAVEGAÇÃO PRINCIPAL ========== */}
      <nav className="flex-1 px-4">
        {MENU_CONFIG.map((item, index) => (
          <div key={index} className="mb-1">
            {/* Item do Menu */}
            <div
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
                item.page && isPageActive(item.page)
                  ? 'bg-purple-50 text-purple-600' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => {
                if (item.hasSubmenu) {
                  setIsServicesOpen(!isServicesOpen);
                } else if (item.hash !== undefined) {
                  handleNavigate(item.hash);
                }
              }}
            >
              <item.icon className="w-5 h-5" />
              <span className="flex-1">{item.label}</span>
              {item.hasSubmenu && (
                isServicesOpen ? 
                  <ChevronDown className="w-4 h-4" /> : 
                  <ChevronRight className="w-4 h-4" />
              )}
            </div>
            
            {/* Submenu de Serviços */}
            {item.hasSubmenu && isServicesOpen && item.submenu && (
              <div className="ml-8 mt-1 space-y-1">
                {item.submenu.map((subItem, subIndex) => (
                  <div
                    key={subIndex}
                    className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg cursor-pointer transition-colors ${
                      isPageActive(subItem.page)
                        ? 'bg-purple-50 text-purple-600' 
                        : 'text-gray-500 hover:bg-gray-50'
                    }`}
                    onClick={() => handleNavigate(subItem.hash)}
                  >
                    <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                    {subItem.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* ========== SEÇÃO: PERFIL E LOGOUT ========== */}
      <div className="p-4 border-t border-gray-200">
        {/* Botão Meu Perfil */}
        <div 
          className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
          onClick={() => handleNavigate('perfil')}
        >
          <User className="w-5 h-5" />
          <span>Meu Perfil</span>
        </div>

        {/* Botão Sair */}
        <div 
          className="flex items-center gap-3 px-3 py-2.5 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"
          onClick={() => setShowLogoutModal(true)}
        >
          <LogOut className="w-5 h-5" />
          <span>Sair</span>
        </div>

        {/* Modal de Confirmação de Logout */}
        <LogoutModal
          isOpen={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          onConfirm={handleLogout}
          userName={user?.name || 'Usuário'}
        />
      </div>
    </div>
  );
}
