import { useState, useMemo } from 'react';
import { Search, Filter, MapPin, Map, List, Star, Clock, Heart, MessageCircle, Phone, Home, Camera, Trees, Shield, Users, Zap } from 'lucide-react';
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

interface Housing {
  id: string;
  name: string;
  image: string;
  coverImage: string;
  rating: number;
  reviewCount: number;
  distance: number;
  type: string;
  features: string[];
  requirements: string[];
  capacity: {
    small: number;
    medium: number;
    large: number;
    total: number;
  };
  pricing: {
    daycare: { min: number; max: number };
    overnight: { min: number; max: number };
  };
  phone: string;
  whatsapp: string;
  address: string;
  owner: {
    name: string;
    image: string;
    experience: number;
  };
  hasYard: boolean;
  hasCamera: boolean;
  is24h: boolean;
  isIndoor: boolean;
  acceptsAllSizes: boolean;
  requiresVaccination: boolean;
  requiresNeutering: boolean;
  requiresEvaluation: boolean;
}

const mockHousings: Housing[] = [
  {
    id: '1',
    name: 'Hotel Canino Premium',
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=300&fit=crop',
    rating: 4.9,
    reviewCount: 234,
    distance: 1.2,
    type: 'Hotel',
    features: ['Câmeras 24h', 'Quintal amplo', 'Veterinário'],
    requirements: ['Vacinas em dia', 'Castração obrigatória'],
    capacity: { small: 15, medium: 10, large: 8, total: 33 },
    pricing: { daycare: { min: 45, max: 65 }, overnight: { min: 80, max: 120 } },
    phone: '(11) 3333-1111',
    whatsapp: '5511999991111',
    address: 'Vila Madalena, São Paulo',
    owner: {
      name: 'Patricia Silva',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      experience: 8
    },
    hasYard: true,
    hasCamera: true,
    is24h: true,
    isIndoor: true,
    acceptsAllSizes: true,
    requiresVaccination: true,
    requiresNeutering: true,
    requiresEvaluation: true
  },
  {
    id: '2',
    name: 'Creche Amigos Peludos',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=300&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&h=300&fit=crop',
    rating: 4.7,
    reviewCount: 156,
    distance: 2.1,
    type: 'Creche',
    features: ['Quintal gramado', 'Atividades recreativas'],
    requirements: ['Vacinas em dia'],
    capacity: { small: 20, medium: 15, large: 5, total: 40 },
    pricing: { daycare: { min: 35, max: 50 }, overnight: { min: 0, max: 0 } },
    phone: '(11) 3333-2222',
    whatsapp: '5511999992222',
    address: 'Pinheiros, São Paulo',
    owner: {
      name: 'Carlos Mendes',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      experience: 5
    },
    hasYard: true,
    hasCamera: false,
    is24h: false,
    isIndoor: false,
    acceptsAllSizes: false,
    requiresVaccination: true,
    requiresNeutering: false,
    requiresEvaluation: true
  }
];

export function HousingsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [sortBy, setSortBy] = useState('distance');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedRequirements, setSelectedRequirements] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [serviceType, setServiceType] = useState('both'); // daycare, overnight, both

  const typeOptions = ['Hotel', 'Creche', 'Anfitrião'];
  const featureOptions = ['Quintal', 'Câmeras 24h', 'Indoor', 'Veterinário', 'Piscina', 'Ar condicionado'];
  const requirementOptions = ['Vacinas obrigatórias', 'Castração obrigatória', 'Avaliação prévia'];
  const sizeOptions = ['Pequeno porte', 'Médio porte', 'Grande porte'];

  const activeFilters = [
    ...selectedTypes,
    ...selectedFeatures,
    ...selectedRequirements,
    ...selectedSizes,
    ...(serviceType !== 'both' ? [serviceType === 'daycare' ? 'Creche' : 'Pernoite'] : []),
    ...(ratingFilter > 0 ? [`${ratingFilter}+ estrelas`] : []),
    ...(priceRange[1] < 200 ? [`Até R$${priceRange[1]}`] : [])
  ];

  const clearAllFilters = () => {
    setSelectedTypes([]);
    setSelectedFeatures([]);
    setSelectedRequirements([]);
    setSelectedSizes([]);
    setPriceRange([0, 200]);
    setRatingFilter(0);
    setServiceType('both');
  };

  const filteredHousings = useMemo(() => {
    return mockHousings
      .filter(housing => {
        if (searchQuery && !housing.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !housing.address.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !housing.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()))) {
          return false;
        }
        if (selectedTypes.length > 0 && !selectedTypes.includes(housing.type)) {
          return false;
        }
        if (selectedFeatures.length > 0) {
          const hasQuintal = selectedFeatures.includes('Quintal') && housing.hasYard;
          const hasCameras = selectedFeatures.includes('Câmeras 24h') && housing.hasCamera;
          const hasIndoor = selectedFeatures.includes('Indoor') && housing.isIndoor;
          const hasVet = selectedFeatures.includes('Veterinário') && housing.features.some(f => f.toLowerCase().includes('veterinário'));
          const hasPiscina = selectedFeatures.includes('Piscina') && housing.features.some(f => f.toLowerCase().includes('piscina'));
          const hasAr = selectedFeatures.includes('Ar condicionado') && housing.features.some(f => f.toLowerCase().includes('ar condicionado'));
          
          if (!hasQuintal && !hasCameras && !hasIndoor && !hasVet && !hasPiscina && !hasAr) {
            return false;
          }
        }
        if (selectedRequirements.length > 0) {
          const hasVaccines = selectedRequirements.includes('Vacinas obrigatórias') && housing.requiresVaccination;
          const hasNeutering = selectedRequirements.includes('Castração obrigatória') && housing.requiresNeutering;
          const hasEvaluation = selectedRequirements.includes('Avaliação prévia') && housing.requiresEvaluation;
          
          if (!hasVaccines && !hasNeutering && !hasEvaluation) {
            return false;
          }
        }
        if (serviceType === 'daycare' && housing.pricing.daycare.max === 0) {
          return false;
        }
        if (serviceType === 'overnight' && housing.pricing.overnight.max === 0) {
          return false;
        }
        
        const relevantPrice = serviceType === 'overnight' 
          ? housing.pricing.overnight.max || housing.pricing.daycare.max
          : housing.pricing.daycare.max;
        
        if (relevantPrice < priceRange[0] || relevantPrice > priceRange[1]) {
          return false;
        }
        if (housing.rating < ratingFilter) {
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
            const aPrice = serviceType === 'overnight' ? a.pricing.overnight.min || a.pricing.daycare.min : a.pricing.daycare.min;
            const bPrice = serviceType === 'overnight' ? b.pricing.overnight.min || b.pricing.daycare.min : b.pricing.daycare.min;
            return aPrice - bPrice;
          case 'capacity':
            return b.capacity.total - a.capacity.total;
          default:
            return 0;
        }
      });
  }, [
    searchQuery, 
    selectedTypes, 
    selectedFeatures, 
    selectedRequirements, 
    selectedSizes, 
    priceRange, 
    ratingFilter, 
    serviceType, 
    sortBy
  ]);

  const handleHousingClick = (housingId: string) => {
    window.location.hash = `hospedagem-${housingId}`;
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hospedagem</h1>
          <p className="text-gray-600 mt-2">
            Encontre hotéis, creches e anfitriões confiáveis para cuidar do seu pet
          </p>
        </div>

        {/* Search and Register */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Pesquisar por nome, localização ou tipo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            Cadastrar hospedagem
          </Button>
        </div>
      </div>

      {/* Service Type Selector */}
      <div className="flex gap-2">
        <Button
          variant={serviceType === 'both' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setServiceType('both')}
          className={serviceType === 'both' ? 'bg-purple-600 text-white' : ''}
        >
          Todos os serviços
        </Button>
        <Button
          variant={serviceType === 'daycare' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setServiceType('daycare')}
          className={serviceType === 'daycare' ? 'bg-purple-600 text-white' : ''}
        >
          Creche (diurno)
        </Button>
        <Button
          variant={serviceType === 'overnight' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setServiceType('overnight')}
          className={serviceType === 'overnight' ? 'bg-purple-600 text-white' : ''}
        >
          Pernoite
        </Button>
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
                  Refine sua busca por hospedagens
                </SheetDescription>
              </SheetHeader>
              
              <div className="space-y-6 mt-6">
                {/* Tipo de estabelecimento */}
                <div>
                  <h4 className="font-medium mb-3">Tipo de estabelecimento</h4>
                  <div className="space-y-2">
                    {typeOptions.map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={`type-${type}`}
                          checked={selectedTypes.includes(type)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedTypes([...selectedTypes, type]);
                            } else {
                              setSelectedTypes(selectedTypes.filter(t => t !== type));
                            }
                          }}
                        />
                        <label htmlFor={`type-${type}`} className="text-sm">{type}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Características do ambiente */}
                <div>
                  <h4 className="font-medium mb-3">Características do ambiente</h4>
                  <div className="space-y-2">
                    {featureOptions.map((feature) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <Checkbox
                          id={`feature-${feature}`}
                          checked={selectedFeatures.includes(feature)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedFeatures([...selectedFeatures, feature]);
                            } else {
                              setSelectedFeatures(selectedFeatures.filter(f => f !== feature));
                            }
                          }}
                        />
                        <label htmlFor={`feature-${feature}`} className="text-sm">{feature}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Preço por dia */}
                <div>
                  <h4 className="font-medium mb-3">Preço por dia</h4>
                  <div className="space-y-3">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={200}
                      step={10}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>R${priceRange[0]}</span>
                      <span>R${priceRange[1]}{priceRange[1] >= 200 ? '+' : ''}</span>
                    </div>
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
              <SelectItem value="capacity">Maior capacidade</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results */}
      {viewMode === 'list' ? (
        <div className="space-y-4">
          {filteredHousings.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <Home className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhuma hospedagem encontrada
              </h3>
              <p className="text-gray-600 mb-4">
                Tente ajustar os filtros ou cadastre sua hospedagem
              </p>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                Cadastrar hospedagem
              </Button>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredHousings.map((housing) => (
                <Card 
                  key={housing.id} 
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border-0 shadow-sm"
                  onClick={() => handleHousingClick(housing.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={housing.image} 
                          alt={housing.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 text-lg">{housing.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-medium">{housing.rating}</span>
                                <span className="text-gray-600 text-sm">
                                  • {housing.reviewCount} avaliações
                                </span>
                              </div>
                            </div>
                            <p className="text-purple-600 font-semibold mt-1">
                              A partir de R${
                                serviceType === 'overnight' 
                                  ? housing.pricing.overnight.min || housing.pricing.daycare.min
                                  : housing.pricing.daycare.min
                              }/dia
                            </p>
                          </div>
                          
                          <div className="flex flex-col items-end gap-2">
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="text-xs">
                                <MapPin className="w-3 h-3 mr-1" />
                                {housing.distance} km
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                <Users className="w-3 h-3 mr-1" />
                                {housing.capacity.total} vagas
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mt-3">
                          <Badge className="bg-blue-100 text-blue-700 text-xs">
                            <Home className="w-3 h-3 mr-1" />
                            {housing.type}
                          </Badge>
                          {housing.hasYard && (
                            <Badge variant="outline" className="text-xs">
                              <Trees className="w-3 h-3 mr-1" />
                              Quintal
                            </Badge>
                          )}
                          {housing.hasCamera && (
                            <Badge variant="outline" className="text-xs">
                              <Camera className="w-3 h-3 mr-1" />
                              Câmeras
                            </Badge>
                          )}
                          {housing.is24h && (
                            <Badge variant="outline" className="text-xs">
                              <Zap className="w-3 h-3 mr-1" />
                              24h
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex gap-2 mt-4">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleHousingClick(housing.id);
                            }}
                          >
                            Ver perfil
                          </Button>
                          <Button 
                            size="sm" 
                            className="bg-purple-600 hover:bg-purple-700 text-white"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(`https://wa.me/${housing.whatsapp}`, '_blank');
                            }}
                          >
                            <MessageCircle className="w-4 h-4 mr-1" />
                            WhatsApp
                          </Button>
                        </div>
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