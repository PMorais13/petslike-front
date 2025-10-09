import { useState } from 'react';
import { MapPin, Clock, Phone, Globe, Instagram, Star, Sun, Cloud, CloudRain, ArrowLeft, Share2, Heart, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';

const placeData = {
  id: 1,
  name: "Café & Cia Pet",
  type: "Café",
  coverImage: "https://images.unsplash.com/photo-1758346974833-080877659c5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjBmcmllbmRseSUyMHJlc3RhdXJhbnQlMjBjYWZlfGVufDF8fHx8MTc1ODkyNDE1NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  description: "Um café aconchegante no coração de São Paulo que recebe pets com muito carinho. Nossa área externa foi especialmente pensada para que você e seu melhor amigo possam relaxar juntos. Oferecemos um menu especial para pets e um ambiente seguro e confortável.",
  address: "Rua Augusta, 1234 - Consolação, São Paulo - SP",
  phone: "(11) 3456-7890",
  website: "www.cafeciapet.com.br",
  instagram: "@cafeciapet",
  rating: 4.8,
  reviewCount: 127,
  hours: {
    monday: "08:00 - 20:00",
    tuesday: "08:00 - 20:00",
    wednesday: "08:00 - 20:00",
    thursday: "08:00 - 20:00",
    friday: "08:00 - 22:00",
    saturday: "09:00 - 22:00",
    sunday: "09:00 - 20:00"
  },
  isOpen: true,
  weather: {
    condition: 'sunny' as const,
    temperature: 24,
    description: 'Ensolarado'
  },
  tags: ["Café", "Pet Friendly", "Wi-Fi Gratuito", "Área Externa", "Menu Pet", "Estacionamento"],
  amenities: [
    "Bebedouros para pets",
    "Área externa coberta",
    "Menu especial para cães",
    "Wi-Fi gratuito",
    "Estacionamento disponível",
    "Aceita cartão"
  ],
  gallery: [
    "https://images.unsplash.com/photo-1758346974833-080877659c5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjBmcmllbmRseSUyMHJlc3RhdXJhbnQlMjBjYWZlfGVufDF8fHx8MTc1ODkyNDE1NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1734921696542-7f7c9e831edb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJrJTIwZG9ncyUyMHBsYXlpbmclMjBvdXRkb29yfGVufDF8fHx8MTc1ODkyNDE1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1633104319705-2d03d9d8f58a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjBzdG9yZSUyMGludGVyaW9yJTIwYW5pbWFsc3xlbnwxfHx8fDE3NTg5MjQxNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  ]
};

const reviews = [
  {
    id: 1,
    user: {
      name: "Carlos Silva",
      avatar: "https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=100&h=100&fit=crop&crop=face",
      petName: "Bob"
    },
    rating: 5,
    comment: "Lugar incrível! O Bob adorou a área externa e o atendimento foi excepcional. Café delicioso e ambiente muito acolhedor para pets.",
    date: "há 3 dias",
    likes: 12
  },
  {
    id: 2,
    user: {
      name: "Ana Costa",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616c6031a83?w=100&h=100&fit=crop&crop=face",
      petName: "Luna"
    },
    rating: 4,
    comment: "Muito bom! A Luna se sentiu super à vontade. Só achei que poderiam ter mais opções no menu pet, mas no geral recomendo!",
    date: "há 1 semana",
    likes: 8
  }
];

export function PlaceProfilePage() {
  const [activeTab, setActiveTab] = useState('info');

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny': return <Sun className="w-5 h-5 text-yellow-500" />;
      case 'cloudy': return <Cloud className="w-5 h-5 text-gray-500" />;
      case 'rainy': return <CloudRain className="w-5 h-5 text-blue-500" />;
      default: return <Sun className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getCurrentDay = () => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[new Date().getDay()];
  };

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header com botão voltar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => window.history.back()}
              className="text-purple-600 hover:bg-purple-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">{placeData.name}</h1>
              <p className="text-sm text-gray-500">{placeData.type}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-purple-600 hover:bg-purple-50">
              <Share2 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-purple-600 hover:bg-purple-50">
              <Heart className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Cover Image */}
          <div className="relative h-64 md:h-80 rounded-lg overflow-hidden mb-6">
            <img
              src={placeData.coverImage}
              alt={placeData.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            
            {/* Status badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              <Badge className="bg-white/90 text-gray-800 backdrop-blur-sm">
                {placeData.type}
              </Badge>
              <Badge 
                className={`backdrop-blur-sm ${
                  placeData.isOpen 
                    ? 'bg-green-500/90 text-white' 
                    : 'bg-red-500/90 text-white'
                }`}
              >
                {placeData.isOpen ? 'Aberto agora' : 'Fechado'}
              </Badge>
            </div>
            
            {/* Weather info */}
            <div className="absolute top-4 right-4">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2">
                {getWeatherIcon(placeData.weather.condition)}
                <span className="text-sm font-medium text-gray-900">
                  {placeData.weather.temperature}°C
                </span>
              </div>
            </div>
            
            {/* Rating */}
            <div className="absolute bottom-4 right-4">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="font-medium text-gray-900">{placeData.rating}</span>
                <span className="text-sm text-gray-600">({placeData.reviewCount})</span>
              </div>
            </div>
          </div>

          {/* Quick Info */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">{placeData.name}</h2>
            <p className="text-gray-600 mb-4">{placeData.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-purple-600" />
                <span className="text-gray-900">{placeData.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-purple-600" />
                <span className="text-gray-900">
                  Hoje: {placeData.hours[getCurrentDay() as keyof typeof placeData.hours]}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-purple-600" />
                <span className="text-gray-900">{placeData.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-purple-600" />
                <span className="text-gray-900">{placeData.website}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {placeData.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="info">Informações</TabsTrigger>
              <TabsTrigger value="hours">Horários</TabsTrigger>
              <TabsTrigger value="gallery">Fotos</TabsTrigger>
              <TabsTrigger value="reviews">Avaliações</TabsTrigger>
            </TabsList>

            <TabsContent value="info">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Comodidades</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {placeData.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-600 rounded-full" />
                        <span className="text-gray-700">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="hours">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Horário de Funcionamento</h3>
                  <div className="space-y-2">
                    {Object.entries(placeData.hours).map(([day, hours]) => (
                      <div key={day} className="flex justify-between py-2">
                        <span className="capitalize text-gray-700">
                          {day === 'monday' ? 'Segunda' :
                           day === 'tuesday' ? 'Terça' :
                           day === 'wednesday' ? 'Quarta' :
                           day === 'thursday' ? 'Quinta' :
                           day === 'friday' ? 'Sexta' :
                           day === 'saturday' ? 'Sábado' : 'Domingo'}
                        </span>
                        <span className="font-medium text-gray-900">{hours}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="gallery">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {placeData.gallery.map((image, index) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden">
                    <img
                      src={image}
                      alt={`${placeData.name} - Foto ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reviews">
              <div className="space-y-4">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarImage src={review.user.avatar} alt={review.user.name} />
                          <AvatarFallback>{review.user.name[0]}</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium text-gray-900">{review.user.name}</span>
                            <span className="text-sm text-gray-500">com {review.user.petName}</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          
                          <p className="text-gray-700 mb-3">{review.comment}</p>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>{review.date}</span>
                            <button className="flex items-center gap-1 hover:text-purple-600">
                              <Heart className="w-4 h-4" />
                              <span>{review.likes}</span>
                            </button>
                            <button className="flex items-center gap-1 hover:text-purple-600">
                              <MessageCircle className="w-4 h-4" />
                              <span>Responder</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}