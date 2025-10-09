// ============================================
// COMPONENTE PRINCIPAL DA APLICAÇÃO PETSLIKE
// ============================================
// Este é o componente raiz que gerencia:
// - Autenticação de usuários
// - Navegação entre páginas
// - Estado global de posts
// - Layout responsivo (desktop/mobile)
// ============================================

import { useState } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AppSidebar } from './components/layout/AppSidebar';
import { MobileHeader } from './components/layout/MobileHeader';
import { PageRouter } from './components/layout/PageRouter';
import { LoadingScreen } from './components/layout/LoadingScreen';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { WelcomePage } from './components/WelcomePage';
import { WelcomeScreen } from './components/WelcomeScreen';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from './components/ui/sheet';
import { VisuallyHidden } from './components/ui/visually-hidden';

// ========== CUSTOM HOOKS ==========
import { useAuth } from './hooks/useAuth';
import { useNavigation } from './hooks/useNavigation';
import { usePosts } from './hooks/usePosts';
import { useResponsive } from './hooks/useResponsive';

// ========== TIPOS ==========
import { Post } from './types';

// Exportar interface de Post para retrocompatibilidade
export type { Post };

export default function App() {
  // ========== HOOKS PERSONALIZADOS ==========
  const auth = useAuth();
  const { currentPage } = useNavigation(!!auth.user);
  const { posts, addPost, handleLikePost } = usePosts();
  const { isMobile } = useResponsive();
  
  // ========== ESTADOS LOCAIS ==========
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ========== RENDERIZAÇÃO CONDICIONAL: LOADING ==========
  if (auth.isLoading) {
    return <LoadingScreen />;
  }

  // ========== RENDERIZAÇÃO CONDICIONAL: WELCOME SCREEN ==========
  if (auth.showWelcomeScreen) {
    return (
      <WelcomeScreen 
        onGetStarted={auth.handleWelcomeScreenStart}
        onLogin={auth.handleWelcomeScreenLogin}
      />
    );
  }

  // ========== RENDERIZAÇÃO CONDICIONAL: AUTENTICAÇÃO ==========
  if (!auth.user) {
    return auth.authView === 'login' ? (
      <LoginPage 
        onLogin={auth.handleLogin}
        onSwitchToRegister={() => auth.setAuthView('register')}
      />
    ) : (
      <RegisterPage 
        onRegister={auth.handleRegister}
        onSwitchToLogin={() => auth.setAuthView('login')}
      />
    );
  }

  // ========== RENDERIZAÇÃO CONDICIONAL: WELCOME PAGE ==========
  if (auth.showWelcome) {
    return (
      <WelcomePage 
        user={auth.user}
        onComplete={auth.handleWelcomeComplete}
      />
    );
  }

  // ========== RENDERIZAÇÃO PRINCIPAL: APLICAÇÃO ==========
  return (
    <ErrorBoundary>
      <div className="flex h-screen bg-gray-50">
        
        {/* ========== SIDEBAR DESKTOP ========== */}
        {!isMobile && (
          <aside className="hidden md:block">
            <AppSidebar />
          </aside>
        )}
        
        {/* ========== SIDEBAR MOBILE (SHEET) ========== */}
        {isMobile && (
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetContent side="left" className="p-0 w-64">
              <VisuallyHidden>
                <SheetTitle>Menu de Navegação</SheetTitle>
                <SheetDescription>
                  Navegue pelas diferentes seções do PetsLike
                </SheetDescription>
              </VisuallyHidden>
              <AppSidebar onNavigate={() => setSidebarOpen(false)} />
            </SheetContent>
          </Sheet>
        )}
        
        {/* ========== ÁREA PRINCIPAL ========== */}
        <div className="flex-1 flex flex-col min-h-0">
          
          {/* ========== HEADER MOBILE ========== */}
          {isMobile && (
            <MobileHeader onMenuToggle={() => setSidebarOpen(true)} />
          )}
          
          {/* ========== CONTEÚDO DA PÁGINA ========== */}
          <main className="flex-1 overflow-auto">
            <PageRouter 
              currentPage={currentPage}
              posts={posts}
              onAddPost={addPost}
              onLikePost={handleLikePost}
            />
          </main>
          
        </div>
      </div>
    </ErrorBoundary>
  );
}
