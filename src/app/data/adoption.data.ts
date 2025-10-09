import { AdoptionPet } from '../models';

export const ADOPTION_PETS: AdoptionPet[] = [
  {
    id: 'thor',
    name: 'Thor',
    type: 'dog',
    breed: 'Golden Retriever',
    age: 3,
    gender: 'male',
    size: 'large',
    image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80',
    description: 'Carinhoso e super sociável, adora passear e brincar com crianças. Está vacinado e castrado.',
    location: 'São Paulo - SP',
    contactName: 'ONG Cuidar é Amar',
    contactPhone: '(11) 99999-0000',
    vaccinated: true,
    neutered: true,
    goodWithKids: true,
    goodWithPets: true
  },
  {
    id: 'miau',
    name: 'Miau',
    type: 'cat',
    breed: 'SRD',
    age: 2,
    gender: 'female',
    size: 'small',
    image: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&w=900&q=80',
    description: 'Gatinha tranquila, gosta de lugares calmos e aconchegantes. Está vermifugada e castrada.',
    location: 'São Paulo - SP',
    contactName: 'Lar Temporário Patinhas',
    contactPhone: '(11) 98888-1234',
    vaccinated: true,
    neutered: true,
    goodWithKids: true,
    goodWithPets: true
  },
  {
    id: 'pingo',
    name: 'Pingo',
    type: 'bird',
    breed: 'Canário',
    age: 1,
    gender: 'male',
    size: 'small',
    image: 'https://images.unsplash.com/photo-1555617981-dac3880eac6c?auto=format&fit=crop&w=900&q=80',
    description: 'Canário super alegre e cantador. Está acostumado com crianças e com outros pássaros.',
    location: 'Osasco - SP',
    contactName: 'Projeto Asas Livres',
    contactPhone: '(11) 97777-5555',
    vaccinated: true,
    neutered: false,
    goodWithKids: true,
    goodWithPets: true
  }
];
