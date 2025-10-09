import { LogOut, Heart } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName: string;
}

export function LogoutModal({ isOpen, onClose, onConfirm, userName }: LogoutModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto rounded-3xl border border-purple-100">
        <div className="text-center space-y-6 p-6">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-50 rounded-2xl">
            <LogOut className="w-8 h-8 text-red-500" />
          </div>

          {/* Title and Description */}
          <div className="space-y-2">
            <DialogTitle className="text-xl font-bold text-gray-900">
              Sair do PetsLike?
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Olá {userName}, tem certeza de que deseja sair da sua conta? Você precisará fazer login novamente para acessar o PetsLike.
            </DialogDescription>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 h-12 rounded-xl border-gray-200 text-gray-600 hover:bg-gray-50"
            >
              Cancelar
            </Button>
            <Button
              onClick={onConfirm}
              className="flex-1 h-12 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-all duration-200"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-center gap-2 text-purple-600 text-sm pt-2">
            <Heart className="w-4 h-4 fill-current" />
            <span>Volte sempre ao PetsLike!</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}