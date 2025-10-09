import { Injectable } from '@angular/core';

export interface NavigationChildItem {
  label: string;
  route: string;
  queryParams?: Record<string, string | null | undefined>;
}

export interface NavigationItem {
  label: string;
  icon: string;
  route: string;
  badge?: string;
  queryParams?: Record<string, string | null | undefined>;
  children?: NavigationChildItem[];
}

@Injectable({ providedIn: 'root' })
export class NavigationService {
  readonly mainNavigation: NavigationItem[] = [
    { label: 'Feed', icon: 'home', route: '/feed' },
    { label: 'Explorar', icon: 'compass', route: '/explorar' },
    {
      label: 'Serviços',
      icon: 'briefcase',
      route: '/servicos',
      queryParams: { categoria: 'walker' },
      children: [
        { label: 'Passeadores', route: '/servicos', queryParams: { categoria: 'walker' } },
        { label: 'Pet Shops', route: '/servicos', queryParams: { categoria: 'petshop' } },
        { label: 'Clínicas', route: '/servicos', queryParams: { categoria: 'clinic' } },
        { label: 'Adestradores', route: '/servicos', queryParams: { categoria: 'trainer' } },
        { label: 'Hospedagens', route: '/servicos', queryParams: { categoria: 'housing' } }
      ]
    },
    { label: 'Comunidade', icon: 'users', route: '/comunidade' },
    { label: 'Adoção e Pets Perdidos', icon: 'heart', route: '/adocao' },
    { label: 'Lugares Pet Friendly', icon: 'map', route: '/lugares' }
  ];

  readonly profileNavigation: NavigationItem[] = [
    { label: 'Meu Perfil', icon: 'user', route: '/perfil' },
    { label: 'Configurações', icon: 'settings', route: '/configuracoes' }
  ];
}
