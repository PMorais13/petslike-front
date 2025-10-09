import { useState } from 'react';
import { Search, Filter, MapPin, Map, List, Star, Clock, Heart, MessageCircle, Phone, Stethoscope, Activity, Zap, Scissors } from 'lucide-react';
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

interface VetClinic {
  id: string;
  name: string;
  image: string;
  coverImage: string;
  rating: number;
  reviewCount: number;
  distance: number;
  isOpenNow: boolean;
  is24h: boolean;
  services: string[];
  specialties: string[];
  exams: string[];
  species: string[];
  insurances: string[];
  priceRange: {
    consultation: { min: number; max: number };
    emergency: { min: number; max: number };
  };
  phone: string;
  emergencyPhone: string;
  whatsapp: string;
  address: string;
  openingHours: {
    [key: string]: string;
  };
  teamSize: number;
  hasEmergency: boolean;
  hasSurgery: boolean;
  hasExams: boolean;
}

const mockVetClinics: VetClinic[] = [
  {
    id: '1',
    name: 'Centro Veterinário 24h',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=300&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=300&fit=crop',
    rating: 4.9,
    reviewCount: 342,
    distance: 0.5,
    isOpenNow: true,
    is24h: true,
    services: ['Clínica Geral', 'Emergência', 'Cirurgia', 'Internação'],
    specialties: ['Cardiologia', 'Dermatologia', 'Oftalmologia', 'Ortopedia'],
    exams: ['Raio-X', 'Ultrassom', 'Laboratório', 'Ecocardiograma'],
    species: ['Cães', 'Gatos', 'Aves', 'Pequenos Mamíferos'],
    insurances: ['Porto Seguro Pet', 'SulAmérica Pet', 'Petlove'],
    priceRange: {
      consultation: { min: 80, max: 150 },
      emergency: { min: 200, max: 500 }
    },
    phone: '(11) 3333-4444',
    emergencyPhone: '(11) 9999-0000',
    whatsapp: '5511999990000',
    address: 'Av. Principal, 123 - Centro',
    openingHours: {
      'Segunda': '24h',
      'Terça': '24h',
      'Quarta': '24h',
      'Quinta': '24h',
      'Sexta': '24h',
      'Sábado': '24h',
      'Domingo': '24h'
    },
    teamSize: 8,
    hasEmergency: true,
    hasSurgery: true,
    hasExams: true
  },
  {
    id: '2',
    name: 'Clínica Veterinária VidaPet',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=300&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=300&fit=crop',
    rating: 4.7,
    reviewCount: 189,
    distance: 1.2,
    isOpenNow: true,
    is24h: false,
    services: ['Clínica Geral', 'Vacinação', 'Consultas'],
    specialties: ['Dermatologia', 'Comportamento Animal'],
    exams: ['Laboratório', 'Raio-X'],
    species: ['Cães', 'Gatos'],
    insurances: ['Porto Seguro Pet'],
    priceRange: {
      consultation: { min: 60, max: 120 },
      emergency: { min: 150, max: 300 }
    },
    phone: '(11) 3333-5555',
    emergencyPhone: '',
    whatsapp: '5511999995555',
    address: 'Rua das Flores, 456 - Vila Madalena',
    openingHours: {
      'Segunda': '08:00-18:00',
      'Terça': '08:00-18:00',
      'Quarta': '08:00-18:00',
      'Quinta': '08:00-18:00',
      'Sexta': '08:00-18:00',
      'Sábado': '08:00-14:00',
      'Domingo': 'Fechado'
    },
    teamSize: 4,
    hasEmergency: false,
    hasSurgery: false,
    hasExams: true
  },
  {
    id: '3',
    name: 'Hospital Veterinário Especializado',
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=300&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&h=300&fit=crop',
    rating: 4.8,
    reviewCount: 267,
    distance: 2.1,
    isOpenNow: false,
    is24h: false,
    services: ['Cirurgia', 'Oncologia', 'Neurologia'],
    specialties: ['Cardiologia', 'Oncologia', 'Neurologia', 'Cirurgia Cardíaca'],
    exams: ['Ressonância', 'Tomografia', 'Ultrassom', 'Laboratório'],
    species: ['Cães', 'Gatos'],
    insurances: ['Porto Seguro Pet', 'SulAmérica Pet', 'Petlove', 'Allianz Pet'],
    priceRange: {
      consultation: { min: 120, max: 300 },
      emergency: { min: 300, max: 800 }
    },
    phone: '(11) 3333-6666',
    emergencyPhone: '(11) 9999-1111',
    whatsapp: '5511999991111',
    address: 'Av. Especializada, 789 - Jardins',
    openingHours: {
      'Segunda': '07:00-19:00',
      'Terça': '07:00-19:00',
      'Quarta': '07:00-19:00',
      'Quinta': '07:00-19:00',
      'Sexta': '07:00-19:00',
      'Sábado': '07:00-15:00',
      'Domingo': 'Fechado'
    },
    teamSize: 12,
    hasEmergency: true,
    hasSurgery: true,
    hasExams: true
  },
  {
    id: '4',
    name: 'Clínica Popular Pet Saúde',
    image: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=300&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=800&h=300&fit=crop',
    rating: 4.5,
    reviewCount: 123,
    distance: 1.8,
    isOpenNow: true,
    is24h: false,
    services: ['Clínica Geral', 'Vacinação', 'Castração'],
    specialties: ['Clínica Geral'],
    exams: ['Laboratório'],
    species: ['Cães', 'Gatos'],
    insurances: [],
    priceRange: {
      consultation: { min: 40, max: 80 },
      emergency: { min: 100, max: 200 }
    },
    phone: '(11) 3333-7777',
    emergencyPhone: '',
    whatsapp: '5511999997777',
    address: 'Rua Popular, 321 - Zona Norte',
    openingHours: {
      'Segunda': '08:00-17:00',
      'Terça': '08:00-17:00',
      'Quarta': '08:00-17:00',
      'Quinta': '08:00-17:00',
      'Sexta': '08:00-17:00',
      'Sábado': '08:00-12:00',
      'Domingo': 'Fechado'
    },
    teamSize: 3,
    hasEmergency: false,
    hasSurgery: true,
    hasExams: true
  }
];

export function VetClinicsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [sortBy, setSortBy] = useState('distance');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [selectedExams, setSelectedExams] = useState<string[]>([]);
  const [selectedSpecies, setSelectedSpecies] = useState<string[]>([]);
  const [hasInsurance, setHasInsurance] = useState(false);
  const [is24hOnly, setIs24hOnly] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [ratingFilter, setRatingFilter] = useState(0);

  const serviceOptions = ['Clínica Geral', 'Emergência', 'Cirurgia', 'Vacinação', 'Internação', 'Oncologia', 'Neurologia'];
  const specialtyOptions = ['Cardiologia', 'Dermatologia', 'Oftalmologia', 'Ortopedia', 'Oncologia', 'Neurologia', 'Comportamento Animal'];
  const examOptions = ['Raio-X', 'Ultrassom', 'Laboratório', 'Ressonância', 'Tomografia', 'Ecocardiograma'];
  const speciesOptions = ['Cães', 'Gatos', 'Aves', 'Pequenos Mamíferos', 'Répteis'];

  const activeFilters = [
    ...selectedServices,
    ...selectedSpecialties,
    ...selectedExams,
    ...selectedSpecies,
    ...(hasInsurance ? ['Com convênio'] : []),
    ...(is24hOnly ? ['24 horas'] : []),
    ...(ratingFilter > 0 ? [`${ratingFilter}+ estrelas`] : []),
    ...(priceRange[1] < 300 ? [`Até R$${priceRange[1]}`] : [])
  ];

  const clearAllFilters = () => {
    setSelectedServices([]);
    setSelectedSpecialties([]);
    setSelectedExams([]);
    setSelectedSpecies([]);
    setHasInsurance(false);
    setIs24hOnly(false);
    setPriceRange([0, 300]);
    setRatingFilter(0);
  };

  const filteredClinics = mockVetClinics
    .filter(clinic => {
      if (searchQuery && !clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !clinic.address.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (selectedServices.length > 0 && !selectedServices.some(service => clinic.services.includes(service))) {
        return false;
      }
      if (selectedSpecialties.length > 0 && !selectedSpecialties.some(specialty => clinic.specialties.includes(specialty))) {
        return false;
      }
      if (selectedExams.length > 0 && !selectedExams.some(exam => clinic.exams.includes(exam))) {
        return false;
      }
      if (selectedSpecies.length > 0 && !selectedSpecies.some(species => clinic.species.includes(species))) {
        return false;
      }
      if (hasInsurance && clinic.insurances.length === 0) {
        return false;
      }
      if (is24hOnly && !clinic.is24h) {
        return false;
      }
      if (clinic.priceRange.consultation.max < priceRange[0] || clinic.priceRange.consultation.min > priceRange[1]) {
        return false;
      }
      if (clinic.rating < ratingFilter) {
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
          return a.priceRange.consultation.min - b.priceRange.consultation.min;
        case 'recent':
          return b.reviewCount - a.reviewCount;
        default:
          return 0;
      }
    });

  const handleClinicClick = (clinicId: string) => {
    window.location.hash = `#clinica-${clinicId}`;
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clínicas Veterinárias</h1>
          <p className="text-gray-600 mt-2">
            Encontre clínicas veterinárias, hospitais e especialistas para cuidar da saúde do seu pet
          </p>
        </div>

        {/* Search and Register */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Pesquisar por nome, bairro ou especialidade..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            Cadastrar sua clínica
          </Button>
        </div>
      </div>

      {/* Emergency Notice */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-red-600" />
          <span className="font-medium text-red-800">Emergência 24h — sempre ligar antes de ir</span>
        </div>
        <p className="text-red-700 text-sm mt-1">
          Em casos de emergência, ligue diretamente para a clínica para confirmar disponibilidade e orientações.
        </p>
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
                  Refine sua busca por clínicas veterinárias
                </SheetDescription>
              </SheetHeader>
              
              <div className="space-y-6 mt-6">
                {/* Atendimento */}
                <div>
                  <h4 className="font-medium mb-3">Tipo de atendimento</h4>
                  <div className="space-y-2">
                    {serviceOptions.map((service) => (
                      <div key={service} className="flex items-center space-x-2">
                        <Checkbox
                          id={`service-${service}`}
                          checked={selectedServices.includes(service)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedServices([...selectedServices, service]);
                            } else {
                              setSelectedServices(selectedServices.filter(s => s !== service));
                            }
                          }}
                        />
                        <label htmlFor={`service-${service}`} className="text-sm">{service}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Especialidades */}
                <div>
                  <h4 className="font-medium mb-3">Especialidades</h4>
                  <div className="space-y-2">
                    {specialtyOptions.map((specialty) => (
                      <div key={specialty} className="flex items-center space-x-2">
                        <Checkbox
                          id={`specialty-${specialty}`}
                          checked={selectedSpecialties.includes(specialty)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedSpecialties([...selectedSpecialties, specialty]);
                            } else {
                              setSelectedSpecialties(selectedSpecialties.filter(s => s !== specialty));
                            }
                          }}
                        />
                        <label htmlFor={`specialty-${specialty}`} className="text-sm">{specialty}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Exames */}
                <div>
                  <h4 className="font-medium mb-3">Exames disponíveis</h4>
                  <div className="space-y-2">
                    {examOptions.map((exam) => (
                      <div key={exam} className="flex items-center space-x-2">
                        <Checkbox
                          id={`exam-${exam}`}
                          checked={selectedExams.includes(exam)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedExams([...selectedExams, exam]);
                            } else {
                              setSelectedExams(selectedExams.filter(e => e !== exam));
                            }
                          }}
                        />
                        <label htmlFor={`exam-${exam}`} className="text-sm">{exam}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Espécies */}
                <div>
                  <h4 className="font-medium mb-3">Espécies atendidas</h4>
                  <div className="space-y-2">
                    {speciesOptions.map((species) => (
                      <div key={species} className="flex items-center space-x-2">
                        <Checkbox
                          id={`species-${species}`}
                          checked={selectedSpecies.includes(species)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedSpecies([...selectedSpecies, species]);
                            } else {
                              setSelectedSpecies(selectedSpecies.filter(s => s !== species));
                            }
                          }}
                        />
                        <label htmlFor={`species-${species}`} className="text-sm">{species}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Filtros especiais */}
                <div>
                  <h4 className="font-medium mb-3">Filtros especiais</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="has-insurance"
                        checked={hasInsurance}
                        onCheckedChange={setHasInsurance}
                      />
                      <label htmlFor="has-insurance" className="text-sm">Aceita convênio</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="is-24h"
                        checked={is24hOnly}
                        onCheckedChange={setIs24hOnly}
                      />
                      <label htmlFor="is-24h" className="text-sm">Atendimento 24h</label>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Preço */}
                <div>
                  <h4 className="font-medium mb-3">Faixa de preço (consulta)</h4>
                  <div className="space-y-3">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={300}
                      step={20}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>R${priceRange[0]}</span>
                      <span>R${priceRange[1]}{priceRange[1] >= 300 ? '+' : ''}</span>
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
          {filteredClinics.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <Stethoscope className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhuma clínica encontrada
              </h3>
              <p className="text-gray-600 mb-4">
                Tente ajustar os filtros ou cadastre sua clínica
              </p>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                Cadastrar sua clínica
              </Button>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredClinics.map((clinic) => (
                <Card 
                  key={clinic.id} 
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border-0 shadow-sm"
                  onClick={() => handleClinicClick(clinic.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={clinic.image} 
                          alt={clinic.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 text-lg">{clinic.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-medium">{clinic.rating}</span>
                                <span className="text-gray-600 text-sm">
                                  • {clinic.reviewCount} avaliações
                                </span>
                              </div>
                            </div>
                            <p className="text-purple-600 font-semibold mt-1">
                              Consulta: R${clinic.priceRange.consultation.min} - R${clinic.priceRange.consultation.max}
                            </p>
                          </div>
                          
                          <div className="flex flex-col items-end gap-2">
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="text-xs">
                                <MapPin className="w-3 h-3 mr-1" />
                                {clinic.distance} km
                              </Badge>
                              {clinic.isOpenNow && (
                                <Badge className="bg-green-100 text-green-700 text-xs">
                                  <Clock className="w-3 h-3 mr-1" />
                                  Aberto agora
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mt-3">
                          {clinic.is24h && (
                            <Badge className="bg-red-100 text-red-700 text-xs">
                              <Zap className="w-3 h-3 mr-1" />
                              24h
                            </Badge>
                          )}
                          {clinic.hasExams && (
                            <Badge variant="outline" className="text-xs">
                              <Activity className="w-3 h-3 mr-1" />
                              Exames
                            </Badge>
                          )}
                          {clinic.hasSurgery && (
                            <Badge variant="outline" className="text-xs">
                              <Scissors className="w-3 h-3 mr-1" />
                              Cirurgia
                            </Badge>
                          )}
                          {clinic.specialties.slice(0, 2).map((specialty) => (
                            <Badge key={specialty} variant="outline" className="text-xs">
                              <Stethoscope className="w-3 h-3 mr-1" />
                              {specialty}
                            </Badge>
                          ))}
                          {clinic.specialties.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{clinic.specialties.length - 2} especialidades
                            </Badge>
                          )}
                        </div>

                        {/* Insurance info */}
                        {clinic.insurances.length > 0 && (
                          <div className="mt-2">
                            <Badge className="bg-blue-100 text-blue-700 text-xs">
                              💳 Aceita convênio ({clinic.insurances.length})
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
                              handleClinicClick(clinic.id);
                            }}
                          >
                            Ver perfil
                          </Button>
                          {clinic.hasEmergency ? (
                            <Button 
                              size="sm" 
                              className="bg-red-600 hover:bg-red-700 text-white"
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(`tel:${clinic.emergencyPhone || clinic.phone}`, '_self');
                              }}
                            >
                              <Phone className="w-4 h-4 mr-1" />
                              Emergência
                            </Button>
                          ) : (
                            <Button 
                              size="sm" 
                              className="bg-purple-600 hover:bg-purple-700 text-white"
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(`https://wa.me/${clinic.whatsapp}`, '_blank');
                              }}
                            >
                              <MessageCircle className="w-4 h-4 mr-1" />
                              WhatsApp
                            </Button>
                          )}
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