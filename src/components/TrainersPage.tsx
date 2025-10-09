import { useState, useMemo } from 'react';
import { Search, Filter, MapPin, Map, List, Star, Clock, Heart, MessageCircle, Phone, Brain, Target, Users, Award } from 'lucide-react';
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

interface Trainer {
  id: string;
  name: string;
  image: string;
  coverImage: string;
  rating: number;
  reviewCount: number;
  distance: number;
  experience: number;
  method: string;
  modalities: string[];
  focus: string[];
  ageGroups: string[];
  packagePrices: {
    min: number;
    max: number;
  };
  sessionDuration: number;
  phone: string;
  whatsapp: string;
  address: string;
  serviceArea: string[];
  certifications: string[];
  specialties: string[];
  hasOnline: boolean;
  hasInHome: boolean;
  hasInLocation: boolean;
}

const mockTrainers: Trainer[] = [
  {
    id: '1',
    name: 'Carlos Mendes',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
    coverImage: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&h=300&fit=crop',
    rating: 4.9,
    reviewCount: 156,
    distance: 2.3,
    experience: 8,
    method: 'Reforço Positivo',
    modalities: ['Presencial na casa', 'Presencial no local', 'Online'],
    focus: ['Obediência básica', 'Comportamento', 'Socialização'],
    ageGroups: ['Filhotes', 'Adultos', 'Idosos'],
    packagePrices: { min: 180, max: 800 },
    sessionDuration: 60,
    phone: '(11) 99999-1111',
    whatsapp: '5511999991111',
    address: 'Vila Madalena, São Paulo',
    serviceArea: ['Vila Madalena', 'Pinheiros', 'Jardins', 'Itaim'],
    certifications: ['CCPDT', 'KPA-CTP', 'Especialização USP'],
    specialties: ['Ansiedade de separação', 'Agressividade', 'Socialização'],
    hasOnline: true,
    hasInHome: true,
    hasInLocation: true
  },
  {
    id: '2',
    name: 'Ana Silva',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=300&h=300&fit=crop&crop=face',
    coverImage: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=300&fit=crop',
    rating: 4.8,
    reviewCount: 203,
    distance: 1.5,
    experience: 12,
    method: 'Método Balanceado',
    modalities: ['Presencial na casa', 'Presencial no local'],
    focus: ['Obediência básica', 'Truques', 'Comportamento'],
    ageGroups: ['Filhotes', 'Adultos'],
    packagePrices: { min: 220, max: 950 },
    sessionDuration: 90,
    phone: '(11) 99999-2222',
    whatsapp: '5511999992222',
    address: 'Moema, São Paulo',
    serviceArea: ['Moema', 'Vila Olímpia', 'Brooklin', 'Campo Belo'],
    certifications: ['CCPDT', 'Certificação Internacional'],
    specialties: ['Cães de grande porte', 'Esportes caninos', 'Obediência avançada'],
    hasOnline: false,
    hasInHome: true,
    hasInLocation: true
  },
  {
    id: '3',
    name: 'Roberto Costa',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
    coverImage: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=300&fit=crop',
    rating: 4.7,
    reviewCount: 89,
    distance: 3.8,
    experience: 5,
    method: 'Reforço Positivo',
    modalities: ['Online', 'Presencial no local'],
    focus: ['Comportamento', 'Socialização'],
    ageGroups: ['Filhotes', 'Adultos'],
    packagePrices: { min: 150, max: 600 },
    sessionDuration: 45,
    phone: '(11) 99999-3333',
    whatsapp: '5511999993333',
    address: 'Santana, São Paulo',
    serviceArea: ['Santana', 'Tucuruvi', 'Vila Maria', 'Casa Verde'],
    certifications: ['KPA-CTP'],
    specialties: ['Filhotes', 'Primeiros comandos', 'Socialização'],
    hasOnline: true,
    hasInHome: false,
    hasInLocation: true
  },
  {
    id: '4',
    name: 'Mariana Oliveira',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
    coverImage: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&h=300&fit=crop',
    rating: 4.6,
    reviewCount: 134,
    distance: 4.2,
    experience: 6,
    method: 'Reforço Positivo',
    modalities: ['Presencial na casa', 'Online'],
    focus: ['Truques', 'Comportamento', 'Obediência básica'],
    ageGroups: ['Adultos', 'Idosos'],
    packagePrices: { min: 200, max: 750 },
    sessionDuration: 75,
    phone: '(11) 99999-4444',
    whatsapp: '5511999994444',
    address: 'Ipiranga, São Paulo',
    serviceArea: ['Ipiranga', 'Vila Mariana'],
    certifications: ['CCPDT'],
    specialties: ['Cães idosos', 'Truques avançados'],
    hasOnline: true,
    hasInHome: true,
    hasInLocation: false
  }
];

export function TrainersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [sortBy, setSortBy] = useState('distance');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModalities, setSelectedModalities] = useState<string[]>([]);
  const [selectedFocus, setSelectedFocus] = useState<string[]>([]);
  const [selectedMethods, setSelectedMethods] = useState<string[]>([]);
  const [selectedAgeGroups, setSelectedAgeGroups] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [experienceFilter, setExperienceFilter] = useState(0);

  const modalityOptions = ['Presencial na casa', 'Presencial no local', 'Online'];
  const focusOptions = ['Obediência básica', 'Comportamento', 'Socialização', 'Truques'];
  const methodOptions = ['Reforço Positivo', 'Método Balanceado', 'Tradicional'];
  const ageGroupOptions = ['Filhotes', 'Adultos', 'Idosos'];

  const activeFilters = [
    ...selectedModalities,
    ...selectedFocus,
    ...selectedMethods,
    ...selectedAgeGroups,
    ...(experienceFilter > 0 ? [`${experienceFilter}+ anos experiência`] : []),
    ...(ratingFilter > 0 ? [`${ratingFilter}+ estrelas`] : []),
    ...(priceRange[1] < 1000 ? [`Até R$${priceRange[1]}`] : [])
  ];

  const clearAllFilters = () => {
    setSelectedModalities([]);
    setSelectedFocus([]);
    setSelectedMethods([]);
    setSelectedAgeGroups([]);
    setPriceRange([0, 1000]);
    setRatingFilter(0);
    setExperienceFilter(0);
  };

  const filteredTrainers = useMemo(() => mockTrainers
    .filter(trainer => {
      if (searchQuery && !trainer.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !trainer.address.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !trainer.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))) {
        return false;
      }
      if (selectedModalities.length > 0 && !selectedModalities.some(modality => trainer.modalities.includes(modality))) {
        return false;
      }
      if (selectedFocus.length > 0 && !selectedFocus.some(focus => trainer.focus.includes(focus))) {
        return false;
      }
      if (selectedMethods.length > 0 && !selectedMethods.includes(trainer.method)) {
        return false;
      }
      if (selectedAgeGroups.length > 0 && !selectedAgeGroups.some(age => trainer.ageGroups.includes(age))) {
        return false;
      }
      if (trainer.packagePrices.max < priceRange[0] || trainer.packagePrices.min > priceRange[1]) {
        return false;
      }
      if (trainer.rating < ratingFilter) {
        return false;
      }
      if (trainer.experience < experienceFilter) {
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
          return a.packagePrices.min - b.packagePrices.min;
        case 'experience':
          return b.experience - a.experience;
        default:
          return 0;
      }
    }), [
      searchQuery,
      selectedModalities,
      selectedFocus,
      selectedMethods,
      selectedAgeGroups,
      priceRange,
      ratingFilter,
      experienceFilter,
      sortBy
    ]);

  const handleTrainerClick = (trainerId: string) => {
    window.location.hash = `#adestrador-${trainerId}`;
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Adestradores</h1>
          <p className="text-gray-600 mt-2">
            Encontre adestradores qualificados para educar e treinar seu pet com métodos eficazes
          </p>
        </div>

        {/* Search and Register */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Pesquisar por nome, região ou especialidade..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            Cadastrar como adestrador
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
                  Refine sua busca por adestradores
                </SheetDescription>
              </SheetHeader>
              
              <div className="space-y-6 mt-6">
                {/* Modalidade */}
                <div>
                  <h4 className="font-medium mb-3">Modalidade de atendimento</h4>
                  <div className="space-y-2">
                    {modalityOptions.map((modality) => (
                      <div key={modality} className="flex items-center space-x-2">
                        <Checkbox
                          id={`modality-${modality}`}
                          checked={selectedModalities.includes(modality)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedModalities([...selectedModalities, modality]);
                            } else {
                              setSelectedModalities(selectedModalities.filter(m => m !== modality));
                            }
                          }}
                        />
                        <label htmlFor={`modality-${modality}`} className="text-sm">{modality}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Foco do treinamento */}
                <div>
                  <h4 className="font-medium mb-3">Foco do treinamento</h4>
                  <div className="space-y-2">
                    {focusOptions.map((focus) => (
                      <div key={focus} className="flex items-center space-x-2">
                        <Checkbox
                          id={`focus-${focus}`}
                          checked={selectedFocus.includes(focus)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedFocus([...selectedFocus, focus]);
                            } else {
                              setSelectedFocus(selectedFocus.filter(f => f !== focus));
                            }
                          }}
                        />
                        <label htmlFor={`focus-${focus}`} className="text-sm">{focus}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Método */}
                <div>
                  <h4 className="font-medium mb-3">Método de adestramento</h4>
                  <div className="space-y-2">
                    {methodOptions.map((method) => (
                      <div key={method} className="flex items-center space-x-2">
                        <Checkbox
                          id={`method-${method}`}
                          checked={selectedMethods.includes(method)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedMethods([...selectedMethods, method]);
                            } else {
                              setSelectedMethods(selectedMethods.filter(m => m !== method));
                            }
                          }}
                        />
                        <label htmlFor={`method-${method}`} className="text-sm">{method}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Idade do pet */}
                <div>
                  <h4 className="font-medium mb-3">Idade/nível do pet</h4>
                  <div className="space-y-2">
                    {ageGroupOptions.map((ageGroup) => (
                      <div key={ageGroup} className="flex items-center space-x-2">
                        <Checkbox
                          id={`age-${ageGroup}`}
                          checked={selectedAgeGroups.includes(ageGroup)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedAgeGroups([...selectedAgeGroups, ageGroup]);
                            } else {
                              setSelectedAgeGroups(selectedAgeGroups.filter(a => a !== ageGroup));
                            }
                          }}
                        />
                        <label htmlFor={`age-${ageGroup}`} className="text-sm">{ageGroup}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Preço */}
                <div>
                  <h4 className="font-medium mb-3">Faixa de preço (pacote)</h4>
                  <div className="space-y-3">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={1000}
                      step={50}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>R${priceRange[0]}</span>
                      <span>R${priceRange[1]}{priceRange[1] >= 1000 ? '+' : ''}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Experiência */}
                <div>
                  <h4 className="font-medium mb-3">Experiência mínima</h4>
                  <div className="space-y-2">
                    {[5, 3, 1].map((years) => (
                      <div key={years} className="flex items-center space-x-2">
                        <Checkbox
                          id={`experience-${years}`}
                          checked={experienceFilter === years}
                          onCheckedChange={(checked) => {
                            setExperienceFilter(checked ? years : 0);
                          }}
                        />
                        <label htmlFor={`experience-${years}`} className="text-sm">
                          {years}+ anos de experiência
                        </label>
                      </div>
                    ))}
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
              <SelectItem value="experience">Mais experiente</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results */}
      {viewMode === 'list' ? (
        <div className="space-y-4">
          {filteredTrainers.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <Brain className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum adestrador encontrado
              </h3>
              <p className="text-gray-600 mb-4">
                Tente ajustar os filtros ou cadastre-se como adestrador
              </p>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                Cadastrar como adestrador
              </Button>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredTrainers.map((trainer) => (
                <Card 
                  key={trainer.id} 
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border-0 shadow-sm"
                  onClick={() => handleTrainerClick(trainer.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={trainer.image} 
                          alt={trainer.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 text-lg">{trainer.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-medium">{trainer.rating}</span>
                                <span className="text-gray-600 text-sm">
                                  • {trainer.reviewCount} avaliações
                                </span>
                              </div>
                            </div>
                            <p className="text-purple-600 font-semibold mt-1">
                              Pacotes a partir de R${trainer.packagePrices.min}
                            </p>
                          </div>
                          
                          <div className="flex flex-col items-end gap-2">
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="text-xs">
                                <MapPin className="w-3 h-3 mr-1" />
                                {trainer.distance} km
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                <Clock className="w-3 h-3 mr-1" />
                                {trainer.experience} anos
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mt-3">
                          <Badge className="bg-blue-100 text-blue-700 text-xs">
                            <Brain className="w-3 h-3 mr-1" />
                            {trainer.method}
                          </Badge>
                          {trainer.hasInHome && (
                            <Badge variant="outline" className="text-xs">
                              🏠 Presencial casa
                            </Badge>
                          )}
                          {trainer.hasOnline && (
                            <Badge variant="outline" className="text-xs">
                              💻 Online
                            </Badge>
                          )}
                          {trainer.focus.slice(0, 2).map((focus) => (
                            <Badge key={focus} variant="outline" className="text-xs">
                              <Target className="w-3 h-3 mr-1" />
                              {focus}
                            </Badge>
                          ))}
                          {trainer.focus.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{trainer.focus.length - 2} focos
                            </Badge>
                          )}
                        </div>

                        {/* Certifications */}
                        {trainer.certifications.length > 0 && (
                          <div className="mt-2">
                            <Badge className="bg-green-100 text-green-700 text-xs">
                              <Award className="w-3 h-3 mr-1" />
                              Certificado ({trainer.certifications.length})
                            </Badge>
                          </div>
                        )}
                        
                        <div className="flex gap-2 mt-4">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleTrainerClick(trainer.id);
                            }}
                          >
                            Ver perfil
                          </Button>
                          <Button 
                            size="sm" 
                            className="bg-purple-600 hover:bg-purple-700 text-white"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(`https://wa.me/${trainer.whatsapp}`, '_blank');
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