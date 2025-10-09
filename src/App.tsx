import { useState, useEffect } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Sidebar } from './components/Sidebar';
import { MainContent } from './components/MainContent';
import { ProfilePage } from './components/ProfilePage';
import { ExplorePage } from './components/ExplorePage';
import { AdoptionPage } from './components/AdoptionPage';
import { UserProfilePage } from './components/UserProfilePage';
import { PlacesPage } from './components/PlacesPage';
import { PlaceProfilePage } from './components/PlaceProfilePage';
import { CommunityPage } from './components/CommunityPage';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { WelcomePage } from './components/WelcomePage';
import { WelcomeScreen } from './components/WelcomeScreen';
import { WalkersPage } from './components/WalkersPage';
import { WalkerProfilePage } from './components/WalkerProfilePage';
import { PetShopsPage } from './components/PetShopsPage';
import { PetShopProfilePage } from './components/PetShopProfilePage';
import { VetClinicsPage } from './components/VetClinicsPage';
import { VetClinicProfilePage } from './components/VetClinicProfilePage';
import { TrainersPage } from './components/TrainersPage';
import { TrainerProfilePage } from './components/TrainerProfilePage';
import { HousingsPage } from './components/HousingsPage';
import { HousingProfilePage } from './components/HousingProfilePage';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from './components/ui/sheet';
import { VisuallyHidden } from './components/ui/visually-hidden';
import { Button } from './components/ui/button';
import { Menu } from 'lucide-react';

export interface Post {
  id: string;
  text: string;
  images: string[];
  petId?: string;
  petName?: string;
  petType?: string;
  petImage?: string;
  author: {
    name: string;
    image: string;
    username: string;
  };
  timestamp: Date;
  likes: number;
  comments: number;
  shares: number;
  liked: boolean;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('feed');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [user, setUser] = useState<any>(null);
  const [authView, setAuthView] = useState<'login' | 'register'>('login');
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar se é mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Verificar se há usuário logado no localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('petslike_user');
      const hasSeenWelcome = localStorage.getItem('petslike_seen_welcome');
      
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setShowWelcomeScreen(false);
      } else if (hasSeenWelcome) {
        setShowWelcomeScreen(false);
      }
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
      localStorage.removeItem('petslike_user');
      localStorage.removeItem('petslike_seen_welcome');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Gerenciar mudanças de hash para navegação
  useEffect(() => {
    if (!user) return; // Só gerenciar navegação se usuário estiver logado
    
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      const pageMap: { [key: string]: string } = {
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
        'hospedagens': 'hospedagens'
      };
      
      if (hash.startsWith('lugar-')) {
        setCurrentPage('perfil-lugar');
      } else if (hash.startsWith('passeador-')) {
        setCurrentPage('perfil-passeador');
      } else if (hash.startsWith('petshop-')) {
        setCurrentPage('perfil-petshop');
      } else if (hash.startsWith('clinica-')) {
        setCurrentPage('perfil-clinica');
      } else if (hash.startsWith('adestrador-')) {
        setCurrentPage('perfil-adestrador');
      } else if (hash.startsWith('hospedagem-')) {
        setCurrentPage('perfil-hospedagem');
      } else {
        setCurrentPage(pageMap[hash] || 'feed');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [user]);

  const addPost = (newPost: Omit<Post, 'id' | 'timestamp' | 'likes' | 'comments' | 'shares' | 'liked'>) => {
    const post: Post = {
      ...newPost,
      id: Date.now().toString(),
      timestamp: new Date(),
      likes: 0,
      comments: 0,
      shares: 0,
      liked: false
    };
    setPosts(prev => [post, ...prev]);
  };

  const handleLikePost = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            liked: !post.liked,
            likes: post.liked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  const handleLogin = (userData: any) => {
    try {
      setUser(userData);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  const handleRegister = (userData: any) => {
    try {
      setUser(userData);
      setShowWelcome(true);
    } catch (error) {
      console.error('Erro ao registrar:', error);
    }
  };

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
  };

  const handleWelcomeScreenStart = () => {
    localStorage.setItem('petslike_seen_welcome', 'true');
    setShowWelcomeScreen(false);
    setAuthView('register');
  };

  const handleWelcomeScreenLogin = () => {
    localStorage.setItem('petslike_seen_welcome', 'true');
    setShowWelcomeScreen(false);
    setAuthView('login');
  };

  // Renderização baseada no estado
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando PetsLike...</p>
        </div>
      </div>
    );
  }

  if (showWelcomeScreen) {
    return (
      <WelcomeScreen 
        onGetStarted={handleWelcomeScreenStart}
        onLogin={handleWelcomeScreenLogin}
      />
    );
  }

  if (!user) {
    return authView === 'login' ? (
      <LoginPage 
        onLogin={handleLogin}
        onSwitchToRegister={() => setAuthView('register')}
      />
    ) : (
      <RegisterPage 
        onRegister={handleRegister}
        onSwitchToLogin={() => setAuthView('login')}
      />
    );
  }

  if (showWelcome) {
    return (
      <WelcomePage 
        user={user}
        onComplete={handleWelcomeComplete}
      />
    );
  }

  const renderContent = () => {
    try {
      switch (currentPage) {
        case 'perfil':
          return <ProfilePage />;
        case 'explorar':
          return <ExplorePage />;
        case 'adocao':
          return <AdoptionPage />;
        case 'perfil-usuario':
          return <UserProfilePage />;
        case 'lugares':
          return <PlacesPage />;
        case 'perfil-lugar':
          return <PlaceProfilePage />;
        case 'comunidade':
          return <CommunityPage />;
        case 'passeadores':
          return <WalkersPage />;
        case 'perfil-passeador':
          return <WalkerProfilePage />;
        case 'petshops':
          return <PetShopsPage />;
        case 'perfil-petshop':
          return <PetShopProfilePage />;
        case 'clinicas':
          return <VetClinicsPage />;
        case 'perfil-clinica':
          return <VetClinicProfilePage />;
        case 'adestradores':
          return <TrainersPage />;
        case 'perfil-adestrador':
          return <TrainerProfilePage />;
        case 'hospedagens':
          return <HousingsPage />;
        case 'perfil-hospedagem':
          return <HousingProfilePage />;
        default:
          return <MainContent posts={posts} onAddPost={addPost} onLikePost={handleLikePost} />;
      }
    } catch (error) {
      console.error('Erro ao renderizar conteúdo:', error);
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <p className="text-gray-600">Erro ao carregar a página</p>
            <button 
              onClick={() => setCurrentPage('feed')}
              className="mt-2 px-4 py-2 bg-purple-600 text-white rounded-lg"
            >
              Voltar ao Feed
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <ErrorBoundary>
      <div className="flex h-screen bg-gray-50">
        {/* Desktop Sidebar */}
        {!isMobile && (
          <aside className="hidden md:block">
            <Sidebar />
          </aside>
        )}
        
        {/* Mobile Sidebar */}
        {isMobile && (
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetContent side="left" className="p-0 w-64">
              <VisuallyHidden>
                <SheetTitle>Menu de Navegação</SheetTitle>
                <SheetDescription>Navegue pelas diferentes seções do PetsLike</SheetDescription>
              </VisuallyHidden>
              <Sidebar onNavigate={() => setSidebarOpen(false)} />
            </SheetContent>
          </Sheet>
        )}
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Mobile Header */}
          {isMobile && (
            <header className="bg-white border-b border-gray-200 p-4 md:hidden">
              <div className="flex items-center justify-between">
                <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="sm" aria-label="Abrir menu">
                      <Menu className="w-5 h-5" />
                    </Button>
                  </SheetTrigger>
                </Sheet>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">PL</span>
                  </div>
                  <span className="font-semibold text-gray-900">PetsLike</span>
                </div>
              </div>
            </header>
          )}
          
          {/* Page Content */}
          <main className="flex-1 overflow-auto">
            {renderContent()}
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
}