import { useState } from 'react';
import { Search, Filter, MapPin, Map, List, Star, Clock, Heart, MessageCircle, Phone } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from './ui/sheet';
import { Separator } from './ui/separator';
import { Checkbox } from './ui/checkbox';
import { Slider } from './ui/slider';
import { VisuallyHidden } from './ui/visually-hidden';

interface Walker {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  priceFrom: number;
  distance: number;
  isAvailableToday: boolean;
  walkTypes: string[];
  durations: string[];
  acceptedSizes: string[];
  experience: number;
  bio: string;
  certifications: string[];
  specialties: string[];
  availability: {
    [key: string]: string[];
  };
  coverageArea: string[];
  phone: string;
  whatsapp: string;
}

const mockWalkers: Walker[] = [
  {
    id: '1',
    name: 'Ana Paula Silva',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=150&h=150&fit=crop&crop=face',
    rating: 4.9,
    reviewCount: 127,
    priceFrom: 25,
    distance: 0.8,
    isAvailableToday: true,
    walkTypes: ['Individual', 'Coletivo'],
    durations: ['30min', '45min', '60min'],
    acceptedSizes: ['P', 'M', 'G'],
    experience: 5,
    bio: 'Apaixonada por cães há mais de 5 anos, ofereço passeios seguros e divertidos.',
    certifications: ['Pet Sitter Certificado', 'Primeiros Socorros Pet'],
    specialties: ['Cães ansiosos', 'Filhotes', 'Adestramento básico'],
    availability: {
      'Segunda': ['07:00-09:00', '17:00-19:00'],
      'Terça': ['07:00-09:00', '17:00-19:00'],
      'Quarta': ['07:00-09:00', '17:00-19:00'],
      'Quinta': ['07:00-09:00', '17:00-19:00'],
      'Sexta': ['07:00-09:00', '17:00-19:00'],
      'Sábado': ['08:00-12:00', '14:00-18:00'],
      'Domingo': ['08:00-12:00']
    },
    coverageArea: ['Vila Madalena', 'Pinheiros', 'Jardins'],
    phone: '(11) 99999-1234',
    whatsapp: '5511999991234'
  },
  {
    id: '2',
    name: 'Carlos Oliveira',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    rating: 4.7,
    reviewCount: 89,
    priceFrom: 20,
    distance: 1.2,
    isAvailableToday: false,
    walkTypes: ['Individual'],
    durations: ['45min', '60min'],
    acceptedSizes: ['M', 'G'],
    experience: 3,
    bio: 'Especialista em cães de grande porte, com experiência em comportamento canino.',
    certifications: ['Comportamento Animal'],
    specialties: ['Cães grandes', 'Exercícios intensos'],
    availability: {
      'Segunda': ['06:00-08:00', '18:00-20:00'],
      'Terça': ['06:00-08:00', '18:00-20:00'],
      'Quarta': ['06:00-08:00', '18:00-20:00'],
      'Quinta': ['06:00-08:00', '18:00-20:00'],
      'Sexta': ['06:00-08:00', '18:00-20:00']
    },
    coverageArea: ['Moema', 'Vila Olímpia', 'Brooklin'],
    phone: '(11) 99999-5678',
    whatsapp: '5511999995678'
  },
  {
    id: '3',
    name: 'Marina Santos',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    rating: 4.8,
    reviewCount: 156,
    priceFrom: 30,
    distance: 2.1,
    isAvailableToday: true,
    walkTypes: ['Individual', 'Coletivo'],
    durations: ['30min', '45min'],
    acceptedSizes: ['P', 'M'],
    experience: 4,
    bio: 'Veterinária formada, especializada em cuidados especiais e cães idosos.',
    certifications: ['Medicina Veterinária', 'Pet Sitter Certificado'],
    specialties: ['Cães idosos', 'Medicação', 'Cuidados especiais'],
    availability: {
      'Segunda': ['08:00-12:00', '14:00-18:00'],
      'Terça': ['08:00-12:00', '14:00-18:00'],
      'Quarta': ['08:00-12:00', '14:00-18:00'],
      'Quinta': ['08:00-12:00', '14:00-18:00'],
      'Sexta': ['08:00-12:00', '14:00-18:00']
    },
    coverageArea: ['Higienópolis', 'Consolação', 'Santa Cecília'],
    phone: '(11) 99999-9012',
    whatsapp: '5511999999012'
  },
  {
    id: '4',
    name: 'Roberto Lima',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    rating: 4.6,
    reviewCount: 73,
    priceFrom: 22,
    distance: 1.8,
    isAvailableToday: true,
    walkTypes: ['Coletivo'],
    durations: ['45min', '60min'],
    acceptedSizes: ['P', 'M', 'G'],
    experience: 2,
    bio: 'Passeios em grupo com foco na socialização e diversão dos pets.',
    certifications: ['Pet Sitter'],
    specialties: ['Socialização', 'Cães tímidos'],
    availability: {
      'Segunda': ['15:00-19:00'],
      'Terça': ['15:00-19:00'],
      'Quarta': ['15:00-19:00'],
      'Quinta': ['15:00-19:00'],
      'Sexta': ['15:00-19:00'],
      'Sábado': ['09:00-17:00'],
      'Domingo': ['09:00-17:00']
    },
    coverageArea: ['Ipanema', 'Copacabana', 'Leblon'],
    phone: '(21) 99999-3456',
    whatsapp: '5521999993456'
  }
];

export function WalkersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [sortBy, setSortBy] = useState('distance');
  const [selectedWalkTypes, setSelectedWalkTypes] = useState<string[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [ratingFilter, setRatingFilter] = useState(0);

  const activeFilters = [
    ...selectedWalkTypes,
    ...selectedDurations,
    ...selectedSizes,
    ...(ratingFilter > 0 ? [`${ratingFilter}+ estrelas`] : []),
    ...(priceRange[1] < 100 ? [`Até R$${priceRange[1]}`] : [])
  ];

  const clearAllFilters = () => {
    setSelectedWalkTypes([]);
    setSelectedDurations([]);
    setSelectedSizes([]);
    setPriceRange([0, 100]);
    setRatingFilter(0);
  };

  const filteredWalkers = mockWalkers
    .filter(walker => {
      if (searchQuery && !walker.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !walker.coverageArea.some(area => area.toLowerCase().includes(searchQuery.toLowerCase()))) {
        return false;
      }
      if (selectedWalkTypes.length > 0 && !selectedWalkTypes.some(type => walker.walkTypes.includes(type))) {
        return false;
      }
      if (selectedDurations.length > 0 && !selectedDurations.some(duration => walker.durations.includes(duration))) {
        return false;
      }
      if (selectedSizes.length > 0 && !selectedSizes.some(size => walker.acceptedSizes.includes(size))) {
        return false;
      }
      if (walker.priceFrom > priceRange[1]) {
        return false;
      }
      if (walker.rating < ratingFilter) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'distance':
          return a.distance - b.distance;
        case 'rating':
          return b.rating - a.rating;
        case 'price':
          return a.priceFrom - b.priceFrom;
        case 'recent':
          return b.experience - a.experience;
        default:
          return 0;
      }
    });

  const handleWalkerClick = (walkerId: string) => {
    window.location.hash = `#passeador-${walkerId}`;
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Passeadores</h1>
          <p className="text-gray-600 mt-2">
            Encontre passeadores qualificados e confiáveis para seu pet na sua região
          </p>
        </div>

        {/* Search and Register */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Pesquisar por nome, bairro ou serviço..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            Cadastrar como passeador
          </Button>
        </div>
      </div>

      {/* Filters and Sorting */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        {/* Quick Filters */}
        <div className="flex flex-wrap gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="w-4 h-4" />
                Filtros {activeFilters.length > 0 && `(${activeFilters.length})`}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Filtros</SheetTitle>
                <SheetDescription>
                  Refine sua busca por passeadores
                </SheetDescription>
              </SheetHeader>
              
              <div className="space-y-6 mt-6">
                {/* Tipo de passeio */}
                <div>
                  <h4 className="font-medium mb-3">Tipo de passeio</h4>
                  <div className="space-y-2">
                    {['Individual', 'Coletivo'].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={`walk-type-${type}`}
                          checked={selectedWalkTypes.includes(type)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedWalkTypes([...selectedWalkTypes, type]);
                            } else {
                              setSelectedWalkTypes(selectedWalkTypes.filter(t => t !== type));
                            }
                          }}
                        />
                        <label htmlFor={`walk-type-${type}`} className="text-sm">{type}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Duração */}
                <div>
                  <h4 className="font-medium mb-3">Duração</h4>
                  <div className="space-y-2">
                    {['30min', '45min', '60min'].map((duration) => (
                      <div key={duration} className="flex items-center space-x-2">
                        <Checkbox
                          id={`duration-${duration}`}
                          checked={selectedDurations.includes(duration)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedDurations([...selectedDurations, duration]);
                            } else {
                              setSelectedDurations(selectedDurations.filter(d => d !== duration));
                            }
                          }}
                        />
                        <label htmlFor={`duration-${duration}`} className="text-sm">{duration}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Porte aceito */}
                <div>
                  <h4 className="font-medium mb-3">Porte aceito</h4>
                  <div className="space-y-2">
                    {[
                      { value: 'P', label: 'Pequeno (P)' },
                      { value: 'M', label: 'Médio (M)' },
                      { value: 'G', label: 'Grande (G)' }
                    ].map((size) => (
                      <div key={size.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`size-${size.value}`}
                          checked={selectedSizes.includes(size.value)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedSizes([...selectedSizes, size.value]);
                            } else {
                              setSelectedSizes(selectedSizes.filter(s => s !== size.value));
                            }
                          }}
                        />
                        <label htmlFor={`size-${size.value}`} className="text-sm">{size.label}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Preço */}
                <div>
                  <h4 className="font-medium mb-3">Faixa de preço</h4>
                  <div className="space-y-3">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>R${priceRange[0]}</span>
                      <span>R${priceRange[1]}{priceRange[1] >= 100 ? '+' : ''}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Avaliação */}
                <div>
                  <h4 className="font-medium mb-3">Avaliação mínima</h4>
                  <div className="space-y-2">
                    {[4.5, 4.0, 3.5].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <Checkbox
                          id={`rating-${rating}`}
                          checked={ratingFilter === rating}
                          onCheckedChange={(checked) => {
                            setRatingFilter(checked ? rating : 0);
                          }}
                        />
                        <label htmlFor={`rating-${rating}`} className="text-sm flex items-center gap-1">
                          {rating} <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> ou mais
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {activeFilters.length > 0 && (
                  <>
                    <Separator />
                    <Button 
                      variant="outline" 
                      onClick={clearAllFilters}
                      className="w-full"
                    >
                      Limpar filtros
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>

          {/* Active Filters */}
          {activeFilters.map((filter, index) => (
            <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-700">
              {filter}
            </Badge>
          ))}
        </div>

        {/* View Mode and Sorting */}
        <div className="flex items-center gap-4">
          <div className="flex border rounded-lg overflow-hidden">
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-purple-600 text-white' : ''}
            >
              <List className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'map' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('map')}
              className={viewMode === 'map' ? 'bg-purple-600 text-white' : ''}
            >
              <Map className="w-4 h-4" />
            </Button>
          </div>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="distance">Mais perto</SelectItem>
              <SelectItem value="rating">Melhor avaliado</SelectItem>
              <SelectItem value="price">Mais acessível</SelectItem>
              <SelectItem value="recent">Mais recente</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results */}
      {viewMode === 'list' ? (
        <div className="space-y-4">
          {filteredWalkers.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <MapPin className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum passeador encontrado
              </h3>
              <p className="text-gray-600 mb-4">
                Tente ajustar os filtros ou cadastre-se como passeador
              </p>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                Cadastrar como passeador
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
              {filteredWalkers.map((walker) => (
                <Card 
                  key={walker.id} 
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border-0 shadow-sm"
                  onClick={() => handleWalkerClick(walker.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col space-y-4">
                      {/* Header com Avatar e Info Principal */}
                      <div className="flex items-start gap-4">
                        <Avatar className="w-16 h-16 flex-shrink-0">
                          <AvatarImage src={walker.image} alt={walker.name} />
                          <AvatarFallback>{walker.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 text-lg">{walker.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium">{walker.rating}</span>
                              <span className="text-gray-600 text-sm">
                                • {walker.reviewCount} avaliações
                              </span>
                            </div>
                          </div>
                          <p className="text-purple-600 font-semibold mt-1">
                            a partir de R${walker.priceFrom}/hora
                          </p>
                        </div>
                        
                        <div className="flex flex-col items-end gap-2">
                          <Badge variant="secondary" className="text-xs">
                            <MapPin className="w-3 h-3 mr-1" />
                            {walker.distance} km
                          </Badge>
                          {walker.isAvailableToday && (
                            <Badge className="bg-green-100 text-green-700 text-xs">
                              Disponível hoje
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      {/* Tags de Serviços */}
                      <div className="flex flex-wrap gap-2">
                        {walker.walkTypes.map((type) => (
                          <Badge key={type} variant="outline" className="text-xs">
                            {type}
                          </Badge>
                        ))}
                        {walker.durations.slice(0, 2).map((duration) => (
                          <Badge key={duration} variant="outline" className="text-xs">
                            <Clock className="w-3 h-3 mr-1" />
                            {duration}
                          </Badge>
                        ))}
                        <Badge variant="outline" className="text-xs">
                          Portes: {walker.acceptedSizes.join(', ')}
                        </Badge>
                      </div>
                      
                      {/* Botões */}
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleWalkerClick(walker.id);
                          }}
                        >
                          Ver perfil
                        </Button>
                        <Button 
                          size="sm" 
                          className="bg-purple-600 hover:bg-purple-700 text-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(`https://wa.me/${walker.whatsapp}`, '_blank');
                          }}
                        >
                          <MessageCircle className="w-4 h-4 mr-1" />
                          Contato
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="bg-gray-100 rounded-xl h-96 flex items-center justify-center">
          <div className="text-center">
            <Map className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">Visualização em mapa será implementada em breve</p>
          </div>
        </div>
      )}
    </div>
  );
}