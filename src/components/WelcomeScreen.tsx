import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface WelcomeScreenProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

export function WelcomeScreen({ onGetStarted, onLogin }: WelcomeScreenProps) {
  const [showPawPrints, setShowPawPrints] = useState(false);

  useEffect(() => {
    // Animar paw prints após um pequeno delay
    const timer = setTimeout(() => setShowPawPrints(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex">
      {/* Lado esquerdo - Imagem de fundo */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="absolute inset-0">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1609348490161-a879e4327ae9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGdvbGRlbiUyMHJldHJpZXZlciUyMGRvZyUyMHBvcnRyYWl0fGVufDF8fHx8MTc1ODkwODQ3N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Pet feliz"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
        </div>
        
        {/* Paw prints decorativos no lado da imagem */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className={`absolute top-10 left-10 text-white/30 transform transition-all duration-1000 ${
              showPawPrints ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0 -translate-x-4 -translate-y-4'
            }`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9C22.1 9 23 9.9 23 11C23 12.1 22.1 13 21 13C19.9 13 19 12.1 19 11C19 9.9 19.9 9 21 9ZM3 9C4.1 9 5 9.9 5 11C5 12.1 4.1 13 3 13C1.9 13 1 12.1 1 11C1 9.9 1.9 9 3 9ZM19 20C19 18.9 18.1 18 17 18C15.9 18 15 18.9 15 20C15 21.1 15.9 22 17 22C18.1 22 19 21.1 19 20ZM9 20C9 18.9 8.1 18 7 18C5.9 18 5 18.9 5 20C5 21.1 5.9 22 7 22C8.1 22 9 21.1 9 20ZM12 13C15.31 13 18 15.69 18 19C18 19.83 17.67 20.6 17.1 21.2C16.45 21.85 15.55 22.2 14.6 22.2H9.4C8.45 22.2 7.55 21.85 6.9 21.2C6.33 20.6 6 19.83 6 19C6 15.69 8.69 13 12 13Z"/>
            </svg>
          </div>
          
          <div 
            className={`absolute bottom-20 left-8 text-white/30 transform transition-all duration-1000 delay-300 ${
              showPawPrints ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0 -translate-x-4 translate-y-4'
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9C22.1 9 23 9.9 23 11C23 12.1 22.1 13 21 13C19.9 13 19 12.1 19 11C19 9.9 19.9 9 21 9ZM3 9C4.1 9 5 9.9 5 11C5 12.1 4.1 13 3 13C1.9 13 1 12.1 1 11C1 9.9 1.9 9 3 9ZM19 20C19 18.9 18.1 18 17 18C15.9 18 15 18.9 15 20C15 21.1 15.9 22 17 22C18.1 22 19 21.1 19 20ZM9 20C9 18.9 8.1 18 7 18C5.9 18 5 18.9 5 20C5 21.1 5.9 22 7 22C8.1 22 9 21.1 9 20ZM12 13C15.31 13 18 15.69 18 19C18 19.83 17.67 20.6 17.1 21.2C16.45 21.85 15.55 22.2 14.6 22.2H9.4C8.45 22.2 7.55 21.85 6.9 21.2C6.33 20.6 6 19.83 6 19C6 15.69 8.69 13 12 13Z"/>
            </svg>
          </div>
        </div>

        {/* Texto overlay na imagem */}
        <div className="absolute bottom-8 left-8 text-white z-10">
          <p className="text-lg font-medium opacity-90">
            "Cada pet tem sua personalidade única"
          </p>
        </div>
      </div>

      {/* Lado direito - Conteúdo */}
      <div className="w-full lg:w-1/2 bg-gradient-to-br from-purple-50 via-white to-purple-100 flex flex-col items-center justify-center p-8 relative">
        {/* Paw prints decorativos no lado do conteúdo */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className={`absolute top-16 right-16 text-purple-200 transform transition-all duration-1000 delay-500 ${
              showPawPrints ? 'opacity-30 translate-x-0 translate-y-0' : 'opacity-0 translate-x-4 -translate-y-4'
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9C22.1 9 23 9.9 23 11C23 12.1 22.1 13 21 13C19.9 13 19 12.1 19 11C19 9.9 19.9 9 21 9ZM3 9C4.1 9 5 9.9 5 11C5 12.1 4.1 13 3 13C1.9 13 1 12.1 1 11C1 9.9 1.9 9 3 9ZM19 20C19 18.9 18.1 18 17 18C15.9 18 15 18.9 15 20C15 21.1 15.9 22 17 22C18.1 22 19 21.1 19 20ZM9 20C9 18.9 8.1 18 7 18C5.9 18 5 18.9 5 20C5 21.1 5.9 22 7 22C8.1 22 9 21.1 9 20ZM12 13C15.31 13 18 15.69 18 19C18 19.83 17.67 20.6 17.1 21.2C16.45 21.85 15.55 22.2 14.6 22.2H9.4C8.45 22.2 7.55 21.85 6.9 21.2C6.33 20.6 6 19.83 6 19C6 15.69 8.69 13 12 13Z"/>
            </svg>
          </div>
          
          <div 
            className={`absolute bottom-32 right-12 text-purple-200 transform transition-all duration-1000 delay-700 ${
              showPawPrints ? 'opacity-30 translate-x-0 translate-y-0' : 'opacity-0 translate-x-4 translate-y-4'
            }`}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9C22.1 9 23 9.9 23 11C23 12.1 22.1 13 21 13C19.9 13 19 12.1 19 11C19 9.9 19.9 9 21 9ZM3 9C4.1 9 5 9.9 5 11C5 12.1 4.1 13 3 13C1.9 13 1 12.1 1 11C1 9.9 1.9 9 3 9ZM19 20C19 18.9 18.1 18 17 18C15.9 18 15 18.9 15 20C15 21.1 15.9 22 17 22C18.1 22 19 21.1 19 20ZM9 20C9 18.9 8.1 18 7 18C5.9 18 5 18.9 5 20C5 21.1 5.9 22 7 22C8.1 22 9 21.1 9 20ZM12 13C15.31 13 18 15.69 18 19C18 19.83 17.67 20.6 17.1 21.2C16.45 21.85 15.55 22.2 14.6 22.2H9.4C8.45 22.2 7.55 21.85 6.9 21.2C6.33 20.6 6 19.83 6 19C6 15.69 8.69 13 12 13Z"/>
            </svg>
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="w-full max-w-md z-10 text-center">
          {/* Logo */}
          <div className="mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-600 rounded-3xl mb-6 shadow-lg">
              <Heart className="w-10 h-10 text-white fill-current" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Pets<span className="text-purple-600">Like</span>
            </h1>
          </div>

          {/* Mobile - Imagem pequena para telas menores */}
          <div className="lg:hidden mb-8">
            <div className="relative mx-auto w-32 h-32 rounded-2xl overflow-hidden shadow-lg">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1609348490161-a879e4327ae9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGdvbGRlbiUyMHJldHJpZXZlciUyMGRvZyUyMHBvcnRyYWl0fGVufDF8fHx8MTc1ODkwODQ3N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Pet feliz"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
            </div>
          </div>

          {/* Textos de boas-vindas */}
          <div className="mb-12 space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">
              Seja bem-vindo ao <span className="text-purple-600">PetsLike</span>!
            </h2>
            <p className="text-xl text-gray-700 font-semibold mb-3">
              Seu pet é único.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg">
              Crie o perfil dele agora e conecte-se com outros tutores apaixonados!
            </p>
          </div>

          {/* Botões */}
          <div className="space-y-4">
            <Button 
              onClick={onGetStarted}
              className="w-full h-14 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Começar
            </Button>
            
            <button
              onClick={onLogin}
              className="text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200 hover:underline text-lg"
            >
              Já possui uma conta? Entrar
            </button>
          </div>

          {/* Rodapé */}
          <div className="mt-12 text-center text-sm text-gray-500">
            Conecte-se, compartilhe e cuide junto da comunidade pet!
          </div>
        </div>
      </div>
    </div>
  );
}