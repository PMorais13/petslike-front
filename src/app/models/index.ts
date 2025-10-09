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

export interface Pet {
  id: string;
  name: string;
  type: 'dog' | 'cat' | 'bird' | 'other';
  breed?: string;
  age?: number;
  image: string;
  ownerId: string;
}

export interface PostAuthor {
  name: string;
  image: string;
  username: string;
}

export interface Post {
  id: string;
  text: string;
  images: string[];
  petId?: string;
  petName?: string;
  petType?: string;
  petImage?: string;
  author: PostAuthor;
  timestamp: Date;
  likes: number;
  comments: number;
  shares: number;
  liked: boolean;
}

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

export interface Place {
  id: number | string;
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
  isOpen?: boolean;
  tags?: string[];
}

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

export interface CommunityPost {
  id: string;
  type: 'lost' | 'found' | 'discussion' | 'help';
  title: string;
  description: string;
  images?: string[];
  author: PostAuthor;
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
