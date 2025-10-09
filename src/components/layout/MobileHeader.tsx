// ============================================
// COMPONENTE: HEADER MOBILE
// ============================================

import { Menu } from 'lucide-react';
import { Button } from '../ui/button';
import { Sheet, SheetTrigger } from '../ui/sheet';

interface MobileHeaderProps {
  onMenuToggle: () => void;
}

export function MobileHeader({ onMenuToggle }: MobileHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 p-4 md:hidden">
      <div className="flex items-center justify-between">
        {/* ========== BOTÃO DE MENU ========== */}
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              aria-label="Abrir menu"
              onClick={onMenuToggle}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
        </Sheet>

        {/* ========== LOGO MOBILE ========== */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">PL</span>
          </div>
          <span className="font-semibold text-gray-900">PetsLike</span>
        </div>
      </div>
    </header>
  );
}
