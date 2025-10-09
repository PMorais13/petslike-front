// ============================================
// TIPOS E INTERFACES DA APLICAÇÃO PETSLIKE
// ============================================

// ========== TIPOS DE USUÁRIO ==========
export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  image: string;
  bio?: string;
  location?: string;
  pets?: Pet[];
}

// ========== TIPOS DE PET ==========
export interface Pet {
  id: string;
  name: string;
  type: 'dog' | 'cat' | 'bird' | 'other';
  breed?: string;
  age?: number;
  image: string;
  ownerId: string;
}

// ========== TIPOS DE POST ==========
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

export interface Comment {
  id: string;
  postId: string;
  author: {
    name: string;
    image: string;
    username: string;
  };
  text: string;
  timestamp: Date;
  likes: number;
  liked: boolean;
}

// ========== TIPOS DE SERVIÇOS ==========
export interface ServiceProvider {
  id: string;
  name: string;
  type: 'walker' | 'petshop' | 'clinic' | 'trainer' | 'housing';
  image: string;
  rating: number;
  reviewCount: number;
  location: string;
  distance?: string;
  price?: string;
  priceRange?: string;
  description?: string;
  services?: string[];
  amenities?: string[];
  hours?: string;
  phone?: string;
  website?: string;
  verified?: boolean;
}

// ========== TIPOS DE LUGARES ==========
export interface Place {
  id: string;
  name: string;
  type: 'park' | 'restaurant' | 'store' | 'hotel' | 'beach' | 'other';
  image: string;
  rating: number;
  reviewCount: number;
  location: string;
  distance?: string;
  description?: string;
  amenities?: string[];
  petFriendlyFeatures?: string[];
  hours?: string;
  phone?: string;
  website?: string;
}

// ========== TIPOS DE ADOÇÃO ==========
export interface AdoptionPet {
  id: string;
  name: string;
  type: 'dog' | 'cat' | 'bird' | 'other';
  breed?: string;
  age: number;
  gender: 'male' | 'female';
  size: 'small' | 'medium' | 'large';
  image: string;
  images?: string[];
  description?: string;
  location: string;
  contactName: string;
  contactPhone?: string;
  vaccinated?: boolean;
  neutered?: boolean;
  goodWithKids?: boolean;
  goodWithPets?: boolean;
}

// ========== TIPOS DE COMUNIDADE ==========
export interface CommunityPost {
  id: string;
  type: 'lost' | 'found' | 'discussion' | 'help';
  title: string;
  description: string;
  images?: string[];
  author: {
    name: string;
    image: string;
    username: string;
  };
  timestamp: Date;
  location?: string;
  petInfo?: {
    name?: string;
    type: string;
    breed?: string;
    lastSeen?: string;
  };
  likes: number;
  comments: number;
  liked: boolean;
}

// ========== TIPOS DE NAVEGAÇÃO ==========
export type PageType = 
  | 'feed'
  | 'perfil'
  | 'explorar'
  | 'adocao'
  | 'perfil-usuario'
  | 'lugares'
  | 'perfil-lugar'
  | 'comunidade'
  | 'passeadores'
  | 'perfil-passeador'
  | 'petshops'
  | 'perfil-petshop'
  | 'clinicas'
  | 'perfil-clinica'
  | 'adestradores'
  | 'perfil-adestrador'
  | 'hospedagens'
  | 'perfil-hospedagem';

export type AuthView = 'login' | 'register';

// ========== TIPOS DE FILTROS ==========
export interface FilterOptions {
  species?: string[];
  distance?: number;
  priceRange?: string;
  rating?: number;
  amenities?: string[];
  services?: string[];
  verified?: boolean;
  availability?: boolean;
}
