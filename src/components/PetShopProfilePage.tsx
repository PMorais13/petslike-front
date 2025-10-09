import { useState } from 'react';
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Phone, 
  MessageCircle, 
  Clock, 
  Award, 
  Heart,
  Flag,
  Calendar,
  DollarSign,
  ShoppingCart,
  Scissors,
  Truck,
  Instagram,
  CreditCard,
  Globe,
  Percent
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar as CalendarComponent } from './ui/calendar';
import { VisuallyHidden } from './ui/visually-hidden';

interface Review {
  id: string;
  author: {
    name: string;
    image: string;
  };
  rating: number;
  comment: string;
  date: Date;
  petName: string;
  service: string;
  beforeAfterImages?: {
    before: string;
    after: string;
  };
}

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
}

const mockReviews: Review[] = [
  {
    id: '1',
    author: {
      name: 'Maria Santos',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    rating: 5,
    comment: 'Excelente serviço! A tosa ficou perfeita e minha Luna saiu linda. Equipe muito profissional e carinhosa.',
    date: new Date(2024, 0, 15),
    petName: 'Luna',
    service: 'Banho e tosa',
    beforeAfterImages: {
      before: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&h=200&fit=crop',
      after: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=200&fit=crop'
    }
  },
  {
    id: '2',
    author: {
      name: 'João Silva',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    rating: 5,
    comment: 'Primeira vez que trouxe meu Thor aqui e já virou cliente fiel. O banho relaxante foi incrível!',
    date: new Date(2024, 0, 10),
    petName: 'Thor',
    service: 'Spa relaxante'
  },
  {
    id: '3',
    author: {
      name: 'Ana Costa',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
    },
    rating: 4,
    comment: 'Ótimo atendimento e preço justo. O delivery chegou super rápido!',
    date: new Date(2024, 0, 5),
    petName: 'Mel',
    service: 'Delivery de ração'
  }
];

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Ração Premium Golden Formula',
    price: 89.90,
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=200&h=200&fit=crop',
    category: 'Ração',
    inStock: true
  },
  {
    id: '2',
    name: 'Shampoo Hidratante Pet',
    price: 24.90,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop',
    category: 'Higiene',
    inStock: true
  },
  {
    id: '3',
    name: 'Brinquedo Mordedor',
    price: 15.90,
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=200&h=200&fit=crop',
    category: 'Brinquedos',
    inStock: false
  },
  {
    id: '4',
    name: 'Coleira Ajustável',
    price: 32.90,
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=200&h=200&fit=crop',
    category: 'Acessórios',
    inStock: true
  }
];

const petShopData = {
  id: '1',
  name: 'Pet Palace Spa',
  image: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=300&h=300&fit=crop',
  coverImage: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=800&h=300&fit=crop',
  rating: 4.8,
  reviewCount: 234,
  description: 'O Pet Palace Spa é um espaço dedicado ao bem-estar e beleza do seu pet. Com mais de 10 anos de experiência, oferecemos serviços completos de estética, higiene e cuidados especiais.',
  services: {
    'Banho simples': 25,
    'Banho e tosa': 45,
    'Tosa higiênica': 30,
    'Hidratação': 35,
    'Corte de unha': 15,
    'Limpeza de ouvido': 20,
    'Spa relaxante': 80,
    'Banho seco': 20
  },
  deliveryOptions: ['Delivery', 'Drive-thru'],
  address: 'Rua das Flores, 123 - Vila Madalena, São Paulo - SP',
  phone: '(11) 99999-1111',
  whatsapp: '5511999991111',
  instagram: '@petpalacespa',
  website: 'www.petpalacespa.com.br',
  openingHours: {
    'Segunda-feira': '08:00 - 18:00',
    'Terça-feira': '08:00 - 18:00',
    'Quarta-feira': '08:00 - 18:00',
    'Quinta-feira': '08:00 - 18:00',
    'Sexta-feira': '08:00 - 18:00',
    'Sábado': '08:00 - 16:00',
    'Domingo': 'Fechado'
  },
  paymentMethods: ['Dinheiro', 'Cartão de Crédito', 'Cartão de Débito', 'PIX', 'PetPay'],
  promotions: [
    {
      title: '10% desconto nas terças',
      description: 'Todos os serviços de banho e tosa com 10% de desconto às terças-feiras',
      validUntil: new Date(2024, 5, 30)
    },
    {
      title: 'Pacote banho e tosa',
      description: 'Banho completo + tosa por apenas R$ 80 (economia de R$ 10)',
      validUntil: new Date(2024, 3, 15)
    }
  ],
  specialties: ['Cães de grande porte', 'Tosa criativa', 'Spa relaxante', 'Atendimento VIP'],
  gallery: [
    'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=200&fit=crop'
  ]
};

export function PetShopProfilePage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedService, setSelectedService] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  const handleBack = () => {
    window.location.hash = '#petshops';
  };

  const handleWhatsAppContact = () => {
    const message = `Olá! Gostaria de conhecer mais sobre os serviços do ${petShopData.name}. Podemos conversar?`;
    window.open(`https://wa.me/${petShopData.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleBooking = () => {
    if (!selectedDate || !selectedService) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }
    
    const servicePrice = petShopData.services[selectedService as keyof typeof petShopData.services];
    const bookingDetails = `
Serviço: ${selectedService} - R$ ${servicePrice}
Data: ${selectedDate.toLocaleDateString('pt-BR')}
${specialRequests ? `Observações: ${specialRequests}` : ''}
    `.trim();
    
    const message = `Olá! Gostaria de agendar um serviço no ${petShopData.name}:\n\n${bookingDetails}`;
    window.open(`https://wa.me/${petShopData.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleProductOrder = () => {
    const message = `Olá! Gostaria de fazer um pedido de produtos do ${petShopData.name}. Podem me ajudar?`;
    window.open(`https://wa.me/${petShopData.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const isOpenNow = () => {
    const now = new Date();
    const dayMap: { [key: string]: string } = {
      'sunday': 'Domingo',
      'monday': 'Segunda-feira',
      'tuesday': 'Terça-feira',
      'wednesday': 'Quarta-feira',
      'thursday': 'Quinta-feira',
      'friday': 'Sexta-feira',
      'saturday': 'Sábado'
    };
    const todayWeekday = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const currentDay = dayMap[todayWeekday];
    const todayHours = petShopData.openingHours[currentDay];
    
    if (todayHours === 'Fechado') return false;
    
    const [start, end] = todayHours.split(' - ');
    const [startHour, startMin] = start.split(':').map(Number);
    const [endHour, endMin] = end.split(':').map(Number);
    
    const currentTime = now.getHours() * 60 + now.getMinutes();
    const startTime = startHour * 60 + startMin;
    const endTime = endHour * 60 + endMin;
    
    return currentTime >= startTime && currentTime <= endTime;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? 'fill-yellow-400 text-yellow-400' 
            : i < rating 
            ? 'fill-yellow-200 text-yellow-400' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleBack}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Button>
      </div>

      {/* Cover Image */}
      <div className="relative h-64 rounded-xl overflow-hidden">
        <img 
          src={petShopData.coverImage} 
          alt="Capa do pet shop"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Profile Header */}
      <Card className="border-0 shadow-lg -mt-16 relative z-10">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center md:items-start">
              <div className="w-24 h-24 rounded-xl overflow-hidden border-4 border-white shadow-lg">
                <img 
                  src={petShopData.image} 
                  alt={petShopData.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center md:text-left mt-4">
                <h1 className="text-2xl font-bold text-gray-900">{petShopData.name}</h1>
                <div className="flex items-center gap-2 mt-1 justify-center md:justify-start">
                  <div className="flex items-center gap-1">
                    {renderStars(petShopData.rating)}
                  </div>
                  <span className="font-medium">{petShopData.rating}</span>
                  <span className="text-gray-600">({petShopData.reviewCount} avaliações)</span>
                </div>
                <div className="flex items-center gap-2 mt-2 justify-center md:justify-start">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className={isOpenNow() ? 'text-green-600 font-medium' : 'text-red-600'}>
                    {isOpenNow() ? 'Aberto agora' : 'Fechado'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <p className="text-gray-700 leading-relaxed">{petShopData.description}</p>
              
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="outline" className="gap-1">
                  <MapPin className="w-3 h-3" />
                  Vila Madalena
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <Scissors className="w-3 h-3" />
                  Banho e tosa
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <Truck className="w-3 h-3" />
                  Delivery
                </Badge>
              </div>

              <div className="flex gap-3 mt-6">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white flex-1">
                      <Calendar className="w-4 h-4 mr-2" />
                      Agendar serviço
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Agendar serviço no {petShopData.name}</DialogTitle>
                      <DialogDescription>
                        Escolha o serviço e data desejados
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Data do agendamento</label>
                        <CalendarComponent
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={(date) => date < new Date()}
                          className="rounded-md border"
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-2 block">Serviço</label>
                        <Select value={selectedService} onValueChange={setSelectedService}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o serviço" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(petShopData.services).map(([service, price]) => (
                              <SelectItem key={service} value={service}>
                                {service} - R$ {price}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-2 block">Observações especiais</label>
                        <Textarea
                          placeholder="Informações sobre seu pet, preferências, etc."
                          value={specialRequests}
                          onChange={(e) => setSpecialRequests(e.target.value)}
                          rows={3}
                        />
                      </div>
                      
                      <Button onClick={handleBooking} className="w-full bg-purple-600 hover:bg-purple-700">
                        Confirmar agendamento
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button 
                  variant="outline" 
                  onClick={handleWhatsAppContact}
                  className="gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="servicos" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="servicos">Serviços</TabsTrigger>
          <TabsTrigger value="produtos">Produtos</TabsTrigger>
          <TabsTrigger value="galeria">Galeria</TabsTrigger>
          <TabsTrigger value="avaliacoes">Avaliações</TabsTrigger>
        </TabsList>

        <TabsContent value="servicos" className="space-y-6">
          {/* Services and Pricing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scissors className="w-5 h-5 text-purple-600" />
                Serviços e Preços
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {Object.entries(petShopData.services).map(([service, price]) => (
                  <div key={service} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">{service}</span>
                    <span className="text-purple-600 font-semibold">R$ {price}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Specialties */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-600" />
                Especialidades
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {petShopData.specialties.map((specialty, index) => (
                  <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-700">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Promotions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Percent className="w-5 h-5 text-purple-600" />
                Promoções Ativas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {petShopData.promotions.map((promo, index) => (
                  <div key={index} className="p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg border border-red-200">
                    <h4 className="font-semibold text-red-800 mb-1">{promo.title}</h4>
                    <p className="text-red-700 text-sm mb-2">{promo.description}</p>
                    <p className="text-red-600 text-xs">
                      Válido até {promo.validUntil.toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact and Hours */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-purple-600" />
                  Horário de Funcionamento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(petShopData.openingHours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between">
                      <span className="font-medium">{day}</span>
                      <span className={hours === 'Fechado' ? 'text-red-600' : 'text-gray-700'}>
                        {hours}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-purple-600" />
                  Contato e Localização
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{petShopData.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{petShopData.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">WhatsApp</span>
                </div>
                <div className="flex items-center gap-2">
                  <Instagram className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{petShopData.instagram}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{petShopData.website}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Methods */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-purple-600" />
                Formas de Pagamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {petShopData.paymentMethods.map((method, index) => (
                  <Badge key={index} variant="outline">
                    {method}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="produtos">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-purple-600" />
                  Produtos Mais Vendidos
                </CardTitle>
                <Button onClick={handleProductOrder} className="bg-purple-600 hover:bg-purple-700">
                  Fazer pedido
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {mockProducts.map((product) => (
                  <div key={product.id} className="border rounded-lg p-4 space-y-2">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <h4 className="font-medium text-sm">{product.name}</h4>
                    <p className="text-purple-600 font-semibold">R$ {product.price.toFixed(2)}</p>
                    <Badge 
                      variant={product.inStock ? "secondary" : "destructive"} 
                      className="text-xs"
                    >
                      {product.inStock ? 'Em estoque' : 'Esgotado'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="galeria">
          <Card>
            <CardHeader>
              <CardTitle>Galeria de Fotos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {petShopData.gallery.map((image, index) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden">
                    <img 
                      src={image} 
                      alt={`Foto ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="avaliacoes">
          <div className="space-y-6">
            {/* Reviews Summary */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900">{petShopData.rating}</div>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    {renderStars(petShopData.rating)}
                  </div>
                  <p className="text-gray-600 mt-1">Baseado em {petShopData.reviewCount} avaliações</p>
                </div>
              </CardContent>
            </Card>

            {/* Individual Reviews */}
            <div className="space-y-4">
              {mockReviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={review.author.image} alt={review.author.name} />
                        <AvatarFallback>{review.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-medium">{review.author.name}</h4>
                            <p className="text-sm text-gray-600">{review.service} - {review.petName}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1">
                              {renderStars(review.rating)}
                            </div>
                            <p className="text-sm text-gray-600">
                              {review.date.toLocaleDateString('pt-BR')}
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-3">{review.comment}</p>
                        {review.beforeAfterImages && (
                          <div className="grid grid-cols-2 gap-2 max-w-md">
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Antes</p>
                              <img 
                                src={review.beforeAfterImages.before} 
                                alt="Antes do serviço"
                                className="w-full h-20 rounded-lg object-cover"
                              />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Depois</p>
                              <img 
                                src={review.beforeAfterImages.after} 
                                alt="Depois do serviço"
                                className="w-full h-20 rounded-lg object-cover"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Report Button */}
      <div className="text-center pt-6 border-t">
        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-600 gap-2">
          <Flag className="w-4 h-4" />
          Denunciar estabelecimento
        </Button>
      </div>
    </div>
  );
}