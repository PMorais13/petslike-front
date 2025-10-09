import { Post } from '../models';

export const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    text: 'Passeio matinal no parque com a Mel! Ela adorou encontrar outros doguinhos por lá. 🐶💜',
    images: [
      'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=800&q=80'
    ],
    author: {
      name: 'Marina Santos',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
      username: '@marina.pets'
    },
    timestamp: new Date('2024-05-20T09:30:00'),
    likes: 128,
    comments: 32,
    shares: 14,
    liked: false,
    petId: 'pet-1',
    petName: 'Mel',
    petType: 'dog',
    petImage: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: '2',
    text: 'Atualização sobre o gatinho resgatado no bairro. Ele já está seguro e em tratamento. Obrigada a todos pelo apoio! 🐱✨',
    images: [
      'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?auto=format&fit=crop&w=800&q=80'
    ],
    author: {
      name: 'Clínica VetCare',
      image: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=120&q=80',
      username: '@vetcare'
    },
    timestamp: new Date('2024-05-19T16:45:00'),
    likes: 236,
    comments: 58,
    shares: 42,
    liked: false
  },
  {
    id: '3',
    text: 'Aulinha de adestramento com o Pingo foi um sucesso! Ele está aprendendo truques novos toda semana. 🐦🎓',
    images: [
      'https://images.unsplash.com/photo-1555617981-dac3880eac6c?auto=format&fit=crop&w=800&q=80'
    ],
    author: {
      name: 'Ricardo Lima',
      image: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=120&q=80',
      username: '@ricardo.trainer'
    },
    timestamp: new Date('2024-05-18T11:10:00'),
    likes: 96,
    comments: 12,
    shares: 6,
    liked: false,
    petId: 'pet-2',
    petName: 'Pingo',
    petType: 'bird',
    petImage: 'https://images.unsplash.com/photo-1525253013412-55c1a69a5738?auto=format&fit=crop&w=200&q=80'
  }
];
