import { Injectable } from '@angular/core';

export interface NavigationItem {
  label: string;
  icon: string;
  route: string;
  badge?: string;
}

@Injectable({ providedIn: 'root' })
export class NavigationService {
  readonly mainNavigation: NavigationItem[] = [
    { label: 'Feed', icon: 'home', route: '/feed' },
    { label: 'Explorar', icon: 'compass', route: '/explorar' },
    { label: 'Serviços', icon: 'briefcase', route: '/servicos' },
    { label: 'Comunidade', icon: 'users', route: '/comunidade' },
    { label: 'Adoção e Pets Perdidos', icon: 'heart', route: '/adocao' },
    { label: 'Lugares Pet Friendly', icon: 'map', route: '/lugares' }
  ];

  readonly profileNavigation: NavigationItem[] = [
    { label: 'Meu Perfil', icon: 'user', route: '/perfil' },
    { label: 'Configurações', icon: 'settings', route: '/configuracoes' }
  ];
}
