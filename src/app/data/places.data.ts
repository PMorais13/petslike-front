import { Place } from '../models';

export const PLACES: Place[] = [
  {
    id: 1,
    name: 'Café & Cia Pet',
    type: 'restaurant',
    image: 'https://images.unsplash.com/photo-1758346974833-080877659c5a?auto=format&fit=crop&w=900&q=80',
    location: 'Rua Augusta, 1234 - Consolação',
    distance: '350m',
    rating: 4.8,
    reviewCount: 127,
    hours: '08:00 - 20:00',
    isOpen: true,
    tags: ['Café', 'Pet Friendly', 'Wi-Fi', 'Área Externa'],
    description: 'Café aconchegante que recebe pets com carinho. Área externa especial para os peludos.'
  },
  {
    id: 2,
    name: 'Parque Villa Lobos',
    type: 'park',
    image: 'https://images.unsplash.com/photo-1734921696542-7f7c9e831edb?auto=format&fit=crop&w=900&q=80',
    location: 'Av. Prof. Fonseca Rodrigues',
    distance: '1.2km',
    rating: 4.9,
    reviewCount: 234,
    hours: '06:00 - 18:00',
    isOpen: true,
    tags: ['Parque', 'Área de Lazer', 'Trilhas', 'Playground Pet'],
    description: 'Amplo parque urbano com área especial para cães, trilhas e muito espaço para exercícios.'
  },
  {
    id: 3,
    name: 'PetShop Amigos',
    type: 'store',
    image: 'https://images.unsplash.com/photo-1633104319705-2d03d9d8f58a?auto=format&fit=crop&w=900&q=80',
    location: 'Rua Oscar Freire, 567',
    distance: '800m',
    rating: 4.6,
    reviewCount: 89,
    hours: '09:00 - 19:00',
    isOpen: true,
    tags: ['Pet Shop', 'Banho e Tosa', 'Ração', 'Brinquedos'],
    description: 'Pet shop completo com produtos de qualidade e serviços de banho e tosa.'
  },
  {
    id: 4,
    name: 'Clínica VetCare',
    type: 'other',
    image: 'https://images.unsplash.com/photo-1724632824319-4b43e74e000c?auto=format&fit=crop&w=900&q=80',
    location: 'Rua dos Três Irmãos, 890',
    distance: '2.1km',
    rating: 4.7,
    reviewCount: 156,
    hours: '08:00 - 22:00',
    isOpen: true,
    tags: ['Veterinária', '24h', 'Cirurgia', 'Emergência'],
    description: 'Clínica veterinária moderna com atendimento 24h e equipe especializada.'
  }
];
