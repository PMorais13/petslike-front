// ============================================
// COMPONENTE: ROTEADOR DE PÁGINAS
// ============================================

import { PageType, Post } from '../../types';
import { MainContent } from '../MainContent';
import { ProfilePage } from '../ProfilePage';
import { ExplorePage } from '../ExplorePage';
import { AdoptionPage } from '../AdoptionPage';
import { UserProfilePage } from '../UserProfilePage';
import { PlacesPage } from '../PlacesPage';
import { PlaceProfilePage } from '../PlaceProfilePage';
import { CommunityPage } from '../CommunityPage';
import { WalkersPage } from '../WalkersPage';
import { WalkerProfilePage } from '../WalkerProfilePage';
import { PetShopsPage } from '../PetShopsPage';
import { PetShopProfilePage } from '../PetShopProfilePage';
import { VetClinicsPage } from '../VetClinicsPage';
import { VetClinicProfilePage } from '../VetClinicProfilePage';
import { TrainersPage } from '../TrainersPage';
import { TrainerProfilePage } from '../TrainerProfilePage';
import { HousingsPage } from '../HousingsPage';
import { HousingProfilePage } from '../HousingProfilePage';

interface PageRouterProps {
  currentPage: PageType;
  posts: Post[];
  onAddPost: (post: Omit<Post, 'id' | 'timestamp' | 'likes' | 'comments' | 'shares' | 'liked'>) => void;
  onLikePost: (postId: string) => void;
}

export function PageRouter({ currentPage, posts, onAddPost, onLikePost }: PageRouterProps) {
  // ========== RENDERIZAÇÃO BASEADA NA PÁGINA ATUAL ==========
  
  try {
    switch (currentPage) {
      // ========== PÁGINAS DE PERFIL ==========
      case 'perfil':
        return <ProfilePage />;
      
      case 'perfil-usuario':
        return <UserProfilePage />;
      
      // ========== PÁGINAS DE EXPLORAÇÃO ==========
      case 'explorar':
        return <ExplorePage />;
      
      // ========== PÁGINAS DE ADOÇÃO E COMUNIDADE ==========
      case 'adocao':
        return <AdoptionPage />;
      
      case 'comunidade':
        return <CommunityPage />;
      
      // ========== PÁGINAS DE LUGARES ==========
      case 'lugares':
        return <PlacesPage />;
      
      case 'perfil-lugar':
        return <PlaceProfilePage />;
      
      // ========== PÁGINAS DE SERVIÇOS: PASSEADORES ==========
      case 'passeadores':
        return <WalkersPage />;
      
      case 'perfil-passeador':
        return <WalkerProfilePage />;
      
      // ========== PÁGINAS DE SERVIÇOS: PET SHOPS ==========
      case 'petshops':
        return <PetShopsPage />;
      
      case 'perfil-petshop':
        return <PetShopProfilePage />;
      
      // ========== PÁGINAS DE SERVIÇOS: CLÍNICAS ==========
      case 'clinicas':
        return <VetClinicsPage />;
      
      case 'perfil-clinica':
        return <VetClinicProfilePage />;
      
      // ========== PÁGINAS DE SERVIÇOS: ADESTRADORES ==========
      case 'adestradores':
        return <TrainersPage />;
      
      case 'perfil-adestrador':
        return <TrainerProfilePage />;
      
      // ========== PÁGINAS DE SERVIÇOS: HOSPEDAGENS ==========
      case 'hospedagens':
        return <HousingsPage />;
      
      case 'perfil-hospedagem':
        return <HousingProfilePage />;
      
      // ========== PÁGINA PADRÃO: FEED ==========
      default:
        return (
          <MainContent 
            posts={posts} 
            onAddPost={onAddPost} 
            onLikePost={onLikePost} 
          />
        );
    }
  } catch (error) {
    // ========== FALLBACK EM CASO DE ERRO ==========
    console.error('Erro ao renderizar página:', error);
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-gray-600">Erro ao carregar a página</p>
          <button 
            onClick={() => window.location.hash = ''}
            className="mt-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Voltar ao Feed
          </button>
        </div>
      </div>
    );
  }
}
