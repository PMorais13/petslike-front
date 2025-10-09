import { useState } from 'react';
import { Search, Filter, MapPin, Map, List, Star, Clock, Heart, MessageCircle, Phone, Scissors, ShoppingCart, Truck } from 'lucide-react';
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

interface PetShop {
  id: string;
  name: string;
  image: string;
  coverImage: string;
  rating: number;
  reviewCount: number;
  distance: number;
  isOpenNow: boolean;
  services: string[];
  deliveryOptions: string[];
  products: string[];
  priceRange: {
    min: number;
    max: number;
  };
  promotions: string[];
  phone: string;
  whatsapp: string;
  address: string;
  openingHours: {
    [key: string]: string;
  };
  specialties: string[];
  paymentMethods: string[];
}

const mockPetShops: PetShop[] = [
  {
    id: '1',
    name: 'Pet Palace Spa',
    image: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=300&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=800&h=300&fit=crop',
    rating: 4.8,
    reviewCount: 234,
    distance: 0.8,
    isOpenNow: true,
    services: ['Banho', 'Tosa', 'Hidratação', 'Unha', 'Orelha'],
    deliveryOptions: ['Delivery', 'Drive-thru'],
    products: ['Ração Premium', 'Acessórios', 'Medicamentos'],
    priceRange: { min: 25, max: 120 },
    promotions: ['10% desconto nas terças', 'Pacote banho e tosa por R$ 80'],
    phone: '(11) 99999-1111',
    whatsapp: '5511999991111',
    address: 'Rua das Flores, 123 - Vila Madalena',
    openingHours: {
      'Segunda': '08:00-18:00',
      'Terça': '08:00-18:00',
      'Quarta': '08:00-18:00',
      'Quinta': '08:00-18:00',
      'Sexta': '08:00-18:00',
      'Sábado': '08:00-16:00',
      'Domingo': 'Fechado'
    },
    specialties: ['Cães de grande porte', 'Tosa criativa', 'Spa relaxante'],
    paymentMethods: ['Dinheiro', 'Cartão', 'PIX', 'PetPay']
  },
  {
    id: '2',
    name: 'Mundo Pet Shopping',
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=300&fit=crop',
    rating: 4.6,
    reviewCount: 189,
    distance: 1.2,
    isOpenNow: true,
    services: ['Banho', 'Tosa', 'Táxi Pet'],
    deliveryOptions: ['Delivery'],
    products: ['Ração', 'Brinquedos', 'Medicamentos', 'Acessórios'],
    priceRange: { min: 20, max: 80 },
    promotions: ['Frete grátis acima de R$ 50'],
    phone: '(11) 99999-2222',
    whatsapp: '5511999992222',
    address: 'Av. Paulista, 456 - Bela Vista',
    openingHours: {
      'Segunda': '09:00-19:00',
      'Terça': '09:00-19:00',
      'Quarta': '09:00-19:00',
      'Quinta': '09:00-19:00',
      'Sexta': '09:00-19:00',
      'Sábado': '09:00-17:00',
      'Domingo': '10:00-16:00'
    },
    specialties: ['Variedade de produtos', 'Entrega rápida', 'Preços competitivos'],
    paymentMethods: ['Dinheiro', 'Cartão', 'PIX']
  },
  {
    id: '3',
    name: 'Clínica e Estética Pet Zen',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=300&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&h=300&fit=crop',
    rating: 4.9,
    reviewCount: 156,
    distance: 2.1,
    isOpenNow: false,
    services: ['Banho', 'Tosa', 'Hidratação', 'Unha', 'Orelha', 'Spa'],
    deliveryOptions: [],
    products: ['Produtos de higiene', 'Medicamentos'],
    priceRange: { min: 40, max: 200 },
    promotions: ['Spa completo por R$ 150'],
    phone: '(11) 99999-3333',
    whatsapp: '5511999993333',
    address: 'Rua dos Jardins, 789 - Jardins',
    openingHours: {
      'Segunda': '08:00-17:00',
      'Terça': '08:00-17:00',
      'Quarta': '08:00-17:00',
      'Quinta': '08:00-17:00',
      'Sexta': '08:00-17:00',
      'Sábado': '08:00-14:00',
      'Domingo': 'Fechado'
    },
    specialties: ['Tratamentos estéticos', 'Relaxamento', 'Cuidados especiais'],
    paymentMethods: ['Dinheiro', 'Cartão', 'PIX', 'Parcelamento']
  },
  {
    id: '4',
    name: 'Pet Express 24h',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&h=300&fit=crop',
    rating: 4.5,
    reviewCount: 98,
    distance: 1.8,
    isOpenNow: true,
    services: ['Banho', 'Tosa', 'Táxi Pet'],
    deliveryOptions: ['Delivery', 'Drive-thru'],
    products: ['Ração', 'Medicamentos emergência'],
    priceRange: { min: 30, max: 100 },
    promotions: ['Atendimento 24h', 'Emergência pet'],
    phone: '(11) 99999-4444',
    whatsapp: '5511999994444',
    address: 'Rua 24 Horas, 321 - Centro',
    openingHours: {
      'Segunda': '24h',
      'Terça': '24h',
      'Quarta': '24h',
      'Quinta': '24h',
      'Sexta': '24h',
      'Sábado': '24h',
      'Domingo': '24h'
    },
    specialties: ['Atendimento 24h', 'Emergências', 'Serviços expressos'],
    paymentMethods: ['Dinheiro', 'Cartão', 'PIX']
  }
];

export function PetShopsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [sortBy, setSortBy] = useState('distance');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedDelivery, setSelectedDelivery] = useState<string[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [ratingFilter, setRatingFilter] = useState(0);

  const serviceOptions = ['Banho', 'Tosa', 'Hidratação', 'Unha', 'Orelha', 'Táxi Pet', 'Spa'];
  const deliveryOptions = ['Delivery', 'Drive-thru'];
  const productOptions = ['Ração', 'Acessórios', 'Medicamentos', 'Brinquedos', 'Produtos de higiene'];

  const activeFilters = [
    ...selectedServices,
    ...selectedDelivery,
    ...selectedProducts,
    ...(ratingFilter > 0 ? [`${ratingFilter}+ estrelas`] : []),
    ...(priceRange[1] < 200 ? [`Até R$${priceRange[1]}`] : [])
  ];

  const clearAllFilters = () => {
    setSelectedServices([]);
    setSelectedDelivery([]);
    setSelectedProducts([]);
    setPriceRange([0, 200]);
    setRatingFilter(0);
  };

  const filteredPetShops = mockPetShops
    .filter(shop => {
      if (searchQuery && !shop.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !shop.address.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (selectedServices.length > 0 && !selectedServices.some(service => shop.services.includes(service))) {
        return false;
      }
      if (selectedDelivery.length > 0 && !selectedDelivery.some(delivery => shop.deliveryOptions.includes(delivery))) {
        return false;
      }
      if (selectedProducts.length > 0 && !selectedProducts.some(product => shop.products.some(p => p.includes(product)))) {
        return false;
      }
      if (shop.priceRange.max < priceRange[0] || shop.priceRange.min > priceRange[1]) {
        return false;
      }
      if (shop.rating < ratingFilter) {
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
          return a.priceRange.min - b.priceRange.min;
        case 'recent':
          return b.reviewCount - a.reviewCount;
        default:
          return 0;
      }
    });

  const handlePetShopClick = (shopId: string) => {
    window.location.hash = `#petshop-${shopId}`;
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pet Shops</h1>
          <p className="text-gray-600 mt-2">
            Encontre os melhores pet shops, serviços de banho e tosa, e produtos para seu pet
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
            Cadastrar seu pet shop
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
                  Refine sua busca por pet shops
                </SheetDescription>
              </SheetHeader>
              
              <div className="space-y-6 mt-6">
                {/* Serviços */}
                <div>
                  <h4 className="font-medium mb-3">Serviços</h4>
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

                {/* Entrega/Retirada */}
                <div>
                  <h4 className="font-medium mb-3">Entrega/Retirada</h4>
                  <div className="space-y-2">
                    {deliveryOptions.map((delivery) => (
                      <div key={delivery} className="flex items-center space-x-2">
                        <Checkbox
                          id={`delivery-${delivery}`}
                          checked={selectedDelivery.includes(delivery)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedDelivery([...selectedDelivery, delivery]);
                            } else {
                              setSelectedDelivery(selectedDelivery.filter(d => d !== delivery));
                            }
                          }}
                        />
                        <label htmlFor={`delivery-${delivery}`} className="text-sm">{delivery}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Produtos */}
                <div>
                  <h4 className="font-medium mb-3">Produtos</h4>
                  <div className="space-y-2">
                    {productOptions.map((product) => (
                      <div key={product} className="flex items-center space-x-2">
                        <Checkbox
                          id={`product-${product}`}
                          checked={selectedProducts.includes(product)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedProducts([...selectedProducts, product]);
                            } else {
                              setSelectedProducts(selectedProducts.filter(p => p !== product));
                            }
                          }}
                        />
                        <label htmlFor={`product-${product}`} className="text-sm">{product}</label>
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
          {filteredPetShops.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <ShoppingCart className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum pet shop encontrado
              </h3>
              <p className="text-gray-600 mb-4">
                Tente ajustar os filtros ou cadastre seu pet shop
              </p>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                Cadastrar seu pet shop
              </Button>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredPetShops.map((shop) => (
                <Card 
                  key={shop.id} 
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border-0 shadow-sm"
                  onClick={() => handlePetShopClick(shop.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={shop.image} 
                          alt={shop.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 text-lg">{shop.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-medium">{shop.rating}</span>
                                <span className="text-gray-600 text-sm">
                                  • {shop.reviewCount} avaliações
                                </span>
                              </div>
                            </div>
                            <p className="text-purple-600 font-semibold mt-1">
                              R${shop.priceRange.min} - R${shop.priceRange.max}
                            </p>
                          </div>
                          
                          <div className="flex flex-col items-end gap-2">
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="text-xs">
                                <MapPin className="w-3 h-3 mr-1" />
                                {shop.distance} km
                              </Badge>
                              {shop.isOpenNow && (
                                <Badge className="bg-green-100 text-green-700 text-xs">
                                  <Clock className="w-3 h-3 mr-1" />
                                  Aberto agora
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mt-3">
                          {shop.services.slice(0, 3).map((service) => (
                            <Badge key={service} variant="outline" className="text-xs">
                              <Scissors className="w-3 h-3 mr-1" />
                              {service}
                            </Badge>
                          ))}
                          {shop.deliveryOptions.map((delivery) => (
                            <Badge key={delivery} variant="outline" className="text-xs">
                              <Truck className="w-3 h-3 mr-1" />
                              {delivery}
                            </Badge>
                          ))}
                          {shop.services.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{shop.services.length - 3} serviços
                            </Badge>
                          )}
                        </div>

                        {/* Promotions */}
                        {shop.promotions.length > 0 && (
                          <div className="mt-2">
                            <Badge className="bg-red-100 text-red-700 text-xs">
                              🎉 {shop.promotions[0]}
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
                              handlePetShopClick(shop.id);
                            }}
                          >
                            Ver perfil
                          </Button>
                          <Button 
                            size="sm" 
                            className="bg-purple-600 hover:bg-purple-700 text-white"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(`https://wa.me/${shop.whatsapp}`, '_blank');
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