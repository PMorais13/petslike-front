import { ServiceProvider } from '../models';

type ServicesByCategory = Record<'walker' | 'petshop' | 'clinic' | 'trainer' | 'housing', ServiceProvider[]>;

export const SERVICES_BY_CATEGORY: ServicesByCategory = {
  walker: [
    {
      id: 'walker-1',
      name: 'Maria Passinhos',
      type: 'walker',
      image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80',
      rating: 4.9,
      reviewCount: 86,
      location: 'Pinheiros - SP',
      distance: '1.1km',
      price: 'R$ 45 / passeio',
      description: 'Passeios personalizados para cães de todos os portes. Atualizações em tempo real.',
      services: ['Passeios individuais', 'Passeios em grupo', 'Relatórios pós passeio'],
      verified: true
    },
    {
      id: 'walker-2',
      name: 'João Dog Walker',
      type: 'walker',
      image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80',
      rating: 4.7,
      reviewCount: 54,
      location: 'Perdizes - SP',
      distance: '2.0km',
      price: 'R$ 35 / passeio',
      description: 'Passeios divertidos com foco em socialização e exercícios para cães energéticos.',
      services: ['Socialização', 'Treinamento básico', 'Relatórios com fotos']
    }
  ],
  petshop: [
    {
      id: 'petshop-1',
      name: 'PetShop Amigos',
      type: 'petshop',
      image: 'https://images.unsplash.com/photo-1618213837799-25d5d0fd4f8b?auto=format&fit=crop&w=800&q=80',
      rating: 4.8,
      reviewCount: 210,
      location: 'Rua Oscar Freire, 567',
      distance: '800m',
      priceRange: 'R$ 40 - R$ 180',
      services: ['Banho & Tosa', 'Petiscos especiais', 'Acessórios exclusivos'],
      description: 'Pet shop completo com equipe especializada e produtos premium para todas as necessidades.'
    },
    {
      id: 'petshop-2',
      name: 'PetLove Store',
      type: 'petshop',
      image: 'https://images.unsplash.com/photo-1546421845-6471bdcf3edf?auto=format&fit=crop&w=800&q=80',
      rating: 4.6,
      reviewCount: 98,
      location: 'Shopping Eldorado',
      distance: '2.4km',
      priceRange: 'R$ 50 - R$ 220',
      services: ['Banho & Tosa', 'Farmácia Pet', 'Clube de Assinatura'],
      description: 'Loja com variedade de marcas, consultoria personalizada e entrega em domicílio.'
    }
  ],
  clinic: [
    {
      id: 'clinic-1',
      name: 'Clínica VetCare',
      type: 'clinic',
      image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80',
      rating: 4.9,
      reviewCount: 312,
      location: 'Av. Paulista, 1000',
      distance: '1.5km',
      hours: '24 horas',
      services: ['Pronto atendimento', 'Cirurgias', 'Exames laboratoriais'],
      amenities: ['Estacionamento', 'Farmácia'],
      description: 'Equipe especializada com atendimento emergencial 24h e equipamentos modernos.',
      verified: true
    },
    {
      id: 'clinic-2',
      name: 'Hospital Pet Vida',
      type: 'clinic',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
      rating: 4.7,
      reviewCount: 188,
      location: 'Moema - SP',
      distance: '3.8km',
      hours: '08:00 às 22:00',
      services: ['Consultas', 'Vacinação', 'Fisioterapia'],
      description: 'Hospital veterinário completo com centro de diagnóstico e cuidados pós-operatórios.'
    }
  ],
  trainer: [
    {
      id: 'trainer-1',
      name: 'Ricardo Lima',
      type: 'trainer',
      image: 'https://images.unsplash.com/photo-1601758064220-0ef3c08c0632?auto=format&fit=crop&w=800&q=80',
      rating: 4.9,
      reviewCount: 143,
      location: 'Vila Mariana - SP',
      distance: '2.1km',
      priceRange: 'R$ 150 - R$ 280',
      services: ['Adestramento positivo', 'Consultoria comportamental', 'Aulas em domicílio'],
      description: 'Especialista em comportamento canino com 8 anos de experiência.',
      verified: true
    },
    {
      id: 'trainer-2',
      name: 'Luana Martins',
      type: 'trainer',
      image: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=800&q=80',
      rating: 4.7,
      reviewCount: 67,
      location: 'Brooklin - SP',
      distance: '3.2km',
      priceRange: 'R$ 120 - R$ 250',
      services: ['Adestramento para filhotes', 'Socialização', 'Dog sitter'],
      description: 'Treinadora especializada em reforço positivo e socialização para filhotes.'
    }
  ],
  housing: [
    {
      id: 'housing-1',
      name: 'Hotel Pet & Cia',
      type: 'housing',
      image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80',
      rating: 4.8,
      reviewCount: 94,
      location: 'Aclimação - SP',
      distance: '4.0km',
      priceRange: 'R$ 90 - R$ 190 / diária',
      amenities: ['Monitoramento 24h', 'Playground', 'Banho diário'],
      description: 'Hotel com suítes temáticas, recreação diária e equipe preparada para cuidados especiais.'
    },
    {
      id: 'housing-2',
      name: 'Pet Lodge',
      type: 'housing',
      image: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=800&q=80',
      rating: 4.6,
      reviewCount: 72,
      location: 'Santana - SP',
      distance: '5.5km',
      priceRange: 'R$ 80 - R$ 160 / diária',
      amenities: ['Área externa', 'Câmeras ao vivo', 'Equipe veterinária'],
      description: 'Hospedagem acolhedora com acompanhamento veterinário e transmissão ao vivo para tutores.'
    }
  ]
};
