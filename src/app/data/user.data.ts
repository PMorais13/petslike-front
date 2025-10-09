import { User } from '../models';

export const DEFAULT_USER: User = {
  id: 'user-1',
  name: 'Jacqueline Luana',
  username: '@jackluana',
  email: 'jacqueline@example.com',
  image: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80',
  bio: 'Apaixonada por pets, fotógrafa nas horas vagas.',
  location: 'São Paulo - SP',
  pets: [
    {
      id: 'pet-1',
      name: 'Miau',
      type: 'cat',
      age: 3,
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=200&q=80',
      ownerId: 'user-1'
    },
    {
      id: 'pet-2',
      name: 'Thor',
      type: 'dog',
      age: 5,
      image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=200&q=80',
      ownerId: 'user-1'
    }
  ]
};
