import { useState } from 'react';
import { Search, MapPin, Clock, Star, Filter, Map } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const places = [
  {
    id: 1,
    name: "Café & Cia Pet",
    type: "Café",
    image: "https://images.unsplash.com/photo-1758346974833-080877659c5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjBmcmllbmRseSUyMHJlc3RhdXJhbnQlMjBjYWZlfGVufDF8fHx8MTc1ODkyNDE1NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    address: "Rua Augusta, 1234 - Consolação",
    distance: "350m",
    rating: 4.8,
    reviewCount: 127,
    hours: "08:00 - 20:00",
    isOpen: true,
    tags: ["Café", "Pet Friendly", "Wi-Fi", "Área Externa"],
    description: "Café aconchegante que recebe pets com carinho. Área externa especial para os peludos."
  },
  {
    id: 2,
    name: "Parque Villa Lobos",
    type: "Parque",
    image: "https://images.unsplash.com/photo-1734921696542-7f7c9e831edb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJrJTIwZG9ncyUyMHBsYXlpbmclMjBvdXRkb29yfGVufDF8fHx8MTc1ODkyNDE1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    address: "Av. Prof. Fonseca Rodrigues",
    distance: "1.2km",
    rating: 4.9,
    reviewCount: 234,
    hours: "06:00 - 18:00",
    isOpen: true,
    tags: ["Parque", "Área de Lazer", "Trilhas", "Playground Pet"],
    description: "Amplo parque urbano com área especial para cães, trilhas e muito espaço para exercícios."
  },
  {
    id: 3,
    name: "PetShop Amigos",
    type: "Pet Shop",
    image: "https://images.unsplash.com/photo-1633104319705-2d03d9d8f58a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjBzdG9yZSUyMGludGVyaW9yJTIwYW5pbWFsc3xlbnwxfHx8fDE3NTg5MjQxNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    address: "Rua Oscar Freire, 567",
    distance: "800m",
    rating: 4.6,
    reviewCount: 89,
    hours: "09:00 - 19:00",
    isOpen: true,
    tags: ["Pet Shop", "Banho e Tosa", "Ração", "Brinquedos"],
    description: "Pet shop completo com produtos de qualidade e serviços de banho e tosa."
  },
  {
    id: 4,
    name: "Clínica VetCare",
    type: "Veterinária",
    image: "https://images.unsplash.com/photo-1724632824319-4b43e74e000c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXRlcmluYXJ5JTIwY2xpbmljJTIwbW9kZXJufGVufDF8fHx8MTc1ODgxMzI5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    address: "Rua dos Três Irmãos, 890",
    distance: "2.1km",
    rating: 4.7,
    reviewCount: 156,
    hours: "08:00 - 22:00",
    isOpen: true,
    tags: ["Veterinária", "24h", "Cirurgia", "Emergência"],
    description: "Clínica veterinária moderna com atendimento 24h e equipe especializada."
  }
];

const categories = [
  { id: 'todos', label: 'Todos', count: places.length },
  { id: 'cafe', label: 'Cafés', count: 1 },
  { id: 'parque', label: 'Parques', count: 1 },
  { id: 'petshop', label: 'Pet Shops', count: 1 },
  { id: 'veterinaria', label: 'Veterinárias', count: 1 }
];

export function PlacesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [currentView, setCurrentView] = useState<'list' | 'map'>('list');

  const filteredPlaces = places.filter(place => {
    const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'todos' || 
      place.type.toLowerCase().includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-900 mb-4">Lugares Pet Friendly</h1>
        
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar lugares pet friendly..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-600" />
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.label} ({category.count})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={currentView === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentView('list')}
              className="text-purple-600 border-purple-200"
            >
              Lista
            </Button>
            <Button
              variant={currentView === 'map' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentView('map')}
              className="text-purple-600 border-purple-200"
            >
              <Map className="w-4 h-4 mr-1" />
              Mapa
            </Button>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {currentView === 'list' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlaces.map((place) => (
              <Card 
                key={place.id} 
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => window.location.hash = `lugar-${place.id}`}
              >
                <div className="aspect-video relative">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-white/90 text-gray-800 backdrop-blur-sm">
                      {place.type}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge 
                      className={`backdrop-blur-sm ${
                        place.isOpen 
                          ? 'bg-green-500/90 text-white' 
                          : 'bg-red-500/90 text-white'
                      }`}
                    >
                      {place.isOpen ? 'Aberto' : 'Fechado'}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{place.name}</h3>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-gray-600">{place.rating}</span>
                      <span className="text-gray-400">({place.reviewCount})</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{place.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{place.distance}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{place.hours}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {place.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {place.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{place.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg p-8 text-center">
            <Map className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Visualização do Mapa</h3>
            <p className="text-gray-600">
              Aqui seria exibido um mapa interativo com a localização dos lugares pet friendly.
            </p>
          </div>
        )}
        
        {filteredPlaces.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum lugar encontrado</h3>
            <p className="text-gray-600">
              Tente ajustar os filtros ou buscar por outros termos.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}