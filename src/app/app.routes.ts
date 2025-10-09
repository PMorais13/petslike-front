import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'feed' },
  {
    path: 'feed',
    loadComponent: () => import('./features/feed/feed-page.component').then(m => m.FeedPageComponent)
  },
  {
    path: 'explorar',
    loadComponent: () => import('./features/explore/explore-page.component').then(m => m.ExplorePageComponent)
  },
  {
    path: 'adocao',
    loadComponent: () => import('./features/adoption/adoption-page.component').then(m => m.AdoptionPageComponent)
  },
  {
    path: 'lugares',
    loadComponent: () => import('./features/places/places-page.component').then(m => m.PlacesPageComponent)
  },
  {
    path: 'comunidade',
    loadComponent: () => import('./features/community/community-page.component').then(m => m.CommunityPageComponent)
  },
  {
    path: 'servicos',
    loadComponent: () => import('./features/services/services-page.component').then(m => m.ServicesPageComponent)
  },
  {
    path: 'perfil',
    loadComponent: () => import('./features/profile/profile-page.component').then(m => m.ProfilePageComponent)
  },
  {
    path: 'perfil-usuario',
    loadComponent: () => import('./shared/pages/placeholder/placeholder-page.component').then(m => m.PlaceholderPageComponent),
    data: {
      title: 'Perfil do Usuário',
      description: 'Detalhes completos dos tutores estarão disponíveis em breve.',
      icon: 'Users'
    }
  },
  {
    path: 'perfil-lugar',
    loadComponent: () => import('./shared/pages/placeholder/placeholder-page.component').then(m => m.PlaceholderPageComponent),
    data: {
      title: 'Perfil do Local',
      description: 'Estamos finalizando a página dedicada para cada lugar pet friendly.',
      icon: 'MapPin'
    }
  },
  {
    path: 'perfil-passeador',
    loadComponent: () => import('./shared/pages/placeholder/placeholder-page.component').then(m => m.PlaceholderPageComponent),
    data: {
      title: 'Passeador',
      description: 'Perfil com depoimentos e agenda do passeador chegará em breve.',
      icon: 'PawPrint'
    }
  },
  {
    path: 'perfil-petshop',
    loadComponent: () => import('./shared/pages/placeholder/placeholder-page.component').then(m => m.PlaceholderPageComponent),
    data: {
      title: 'Pet Shop',
      description: 'Em breve você poderá conhecer os detalhes de cada pet shop parceiro.',
      icon: 'ShoppingBag'
    }
  },
  {
    path: 'perfil-clinica',
    loadComponent: () => import('./shared/pages/placeholder/placeholder-page.component').then(m => m.PlaceholderPageComponent),
    data: {
      title: 'Clínica Veterinária',
      description: 'Informações completas das clínicas veterinárias estarão aqui.',
      icon: 'HeartPulse'
    }
  },
  {
    path: 'perfil-adestrador',
    loadComponent: () => import('./shared/pages/placeholder/placeholder-page.component').then(m => m.PlaceholderPageComponent),
    data: {
      title: 'Adestrador',
      description: 'Agenda, depoimentos e planos de treino chegam em breve.',
      icon: 'GraduationCap'
    }
  },
  {
    path: 'perfil-hospedagem',
    loadComponent: () => import('./shared/pages/placeholder/placeholder-page.component').then(m => m.PlaceholderPageComponent),
    data: {
      title: 'Hospedagem Pet',
      description: 'Estamos preparando recomendações de hotéis e hospedagens confiáveis.',
      icon: 'Home'
    }
  },
  { path: '**', redirectTo: 'feed' }
];
