import { Heart, Home, Search, Users, Settings, MapPin, Award, User, LogOut, ChevronDown, ChevronRight, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { LogoutModal } from './LogoutModal';

interface SidebarProps {
  onNavigate?: () => void;
}

export function Sidebar({ onNavigate }: SidebarProps = {}) {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('feed');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('petslike_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      setCurrentPage(hash || 'feed');
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const menuItems = [
    { icon: Home, label: 'Feed', active: currentPage === 'feed' || currentPage === '', hash: '' },
    { icon: Search, label: 'Explorar', active: currentPage === 'explorar', hash: 'explorar' },
    { 
      icon: Settings, 
      label: 'Serviços', 
      active: false, 
      hasSubmenu: true,
      submenuItems: ['Passeadores', 'Pet Shops', 'Clínicas', 'Adestradores', 'Hospedagens']
    },
    { icon: Users, label: 'Comunidade', active: currentPage === 'comunidade', hash: 'comunidade' },
    { icon: Award, label: 'Adoção e Pets Perdidos', active: currentPage === 'adocao', hash: 'adocao' },
    { icon: MapPin, label: 'Lugares Pet Friendly', active: currentPage === 'lugares', hash: 'lugares' },
  ];

  return (
    <div className="w-full md:w-64 h-full md:h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 flex items-center gap-2">
        {currentPage === 'perfil' || currentPage === 'explorar' || currentPage === 'adocao' ? (
          <button
            onClick={() => {
              window.location.hash = '';
              onNavigate?.();
            }}
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

      {/* Navigation */}
      <nav className="flex-1 px-4">
        {menuItems.map((item, index) => (
          <div key={index} className="mb-1">
            <div
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
                item.active 
                  ? 'bg-purple-50 text-purple-600' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => {
                if (item.hasSubmenu) {
                  setIsServicesOpen(!isServicesOpen);
                } else if (item.hash !== undefined) {
                  window.location.hash = item.hash;
                  onNavigate?.();
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
            
            {/* Submenu */}
            {item.hasSubmenu && isServicesOpen && (
              <div className="ml-8 mt-1 space-y-1">
                {item.submenuItems?.map((subItem, subIndex) => (
                  <div
                    key={subIndex}
                    className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg cursor-pointer transition-colors ${
                      (subItem === 'Passeadores' && currentPage === 'passeadores') ||
                      (subItem === 'Pet Shops' && currentPage === 'petshops') ||
                      (subItem === 'Clínicas' && currentPage === 'clinicas') ||
                      (subItem === 'Adestradores' && currentPage === 'adestradores') ||
                      (subItem === 'Hospedagens' && currentPage === 'hospedagens')
                        ? 'bg-purple-50 text-purple-600' 
                        : 'text-gray-500 hover:bg-gray-50'
                    }`}
                    onClick={() => {
                      if (subItem === 'Passeadores') {
                        window.location.hash = 'passeadores';
                        onNavigate?.();
                      } else if (subItem === 'Pet Shops') {
                        window.location.hash = 'petshops';
                        onNavigate?.();
                      } else if (subItem === 'Clínicas') {
                        window.location.hash = 'clinicas';
                        onNavigate?.();
                      } else if (subItem === 'Adestradores') {
                        window.location.hash = 'adestradores';
                        onNavigate?.();
                      } else if (subItem === 'Hospedagens') {
                        window.location.hash = 'hospedagens';
                        onNavigate?.();
                      }
                    }}
                  >
                    <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                    {subItem}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="p-4 border-t border-gray-200">
        <div 
          className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
          onClick={() => window.location.hash = 'perfil'}
        >
          <User className="w-5 h-5" />
          <span>Meu Perfil</span>
        </div>
        <div 
          className="flex items-center gap-3 px-3 py-2.5 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"
          onClick={() => setShowLogoutModal(true)}
        >
          <LogOut className="w-5 h-5" />
          <span>Sair</span>
        </div>

        {/* Logout Modal */}
        <LogoutModal
          isOpen={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          onConfirm={() => {
            localStorage.removeItem('petslike_user');
            window.location.reload();
          }}
          userName={user?.name || 'Usuário'}
        />
      </div>
    </div>
  );
}