import { useState } from 'react';
import { MapPin, Clock, Sun, Cloud, CloudRain } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface Place {
  id: number;
  name: string;
  type: string;
  image: string;
  address: string;
  distance: string;
  weather: {
    condition: 'sunny' | 'cloudy' | 'rainy';
    temperature: number;
  };
  hours: {
    open: string;
    close: string;
    isOpen: boolean;
  };
  rating: number;
}

const nearbyPlaces: Place[] = [
  {
    id: 1,
    name: "Café & Cia Pet",
    type: "Café",
    image: "https://images.unsplash.com/photo-1758346974833-080877659c5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjBmcmllbmRseSUyMHJlc3RhdXJhbnQlMjBjYWZlfGVufDF8fHx8MTc1ODkyNDE1NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    address: "Rua Augusta, 1234 - Consolação",
    distance: "350m",
    weather: { condition: 'sunny', temperature: 24 },
    hours: { open: "08:00", close: "20:00", isOpen: true },
    rating: 4.8
  },
  {
    id: 2,
    name: "Parque Villa Lobos",
    type: "Parque",
    image: "https://images.unsplash.com/photo-1734921696542-7f7c9e831edb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJrJTIwZG9ncyUyMHBsYXlpbmclMjBvdXRkb29yfGVufDF8fHx8MTc1ODkyNDE1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    address: "Av. Prof. Fonseca Rodrigues",
    distance: "1.2km",
    weather: { condition: 'cloudy', temperature: 22 },
    hours: { open: "06:00", close: "18:00", isOpen: true },
    rating: 4.9
  },
  {
    id: 3,
    name: "PetShop Amigos",
    type: "Pet Shop",
    image: "https://images.unsplash.com/photo-1633104319705-2d03d9d8f58a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjBzdG9yZSUyMGludGVyaW9yJTIwYW5pbWFsc3xlbnwxfHx8fDE3NTg5MjQxNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    address: "Rua Oscar Freire, 567",
    distance: "800m",
    weather: { condition: 'sunny', temperature: 24 },
    hours: { open: "09:00", close: "19:00", isOpen: true },
    rating: 4.6
  },
  {
    id: 4,
    name: "Clínica VetCare",
    type: "Veterinária",
    image: "https://images.unsplash.com/photo-1724632824319-4b43e74e000c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXRlcmluYXJ5JTIwY2xpbmljJTIwbW9kZXJufGVufDF8fHx8MTc1ODgxMzI5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    address: "Rua dos Três Irmãos, 890",
    distance: "2.1km",
    weather: { condition: 'rainy', temperature: 18 },
    hours: { open: "08:00", close: "22:00", isOpen: true },
    rating: 4.7
  }
];

export function PlaceStories() {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny': return <Sun className="w-4 h-4 text-yellow-500" />;
      case 'cloudy': return <Cloud className="w-4 h-4 text-gray-500" />;
      case 'rainy': return <CloudRain className="w-4 h-4 text-blue-500" />;
      default: return <Sun className="w-4 h-4 text-yellow-500" />;
    }
  };

  return (
    <>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-gray-900">Lugares Próximos</h2>
          <Button variant="ghost" size="sm" className="text-purple-600 hover:bg-purple-50">
            Ver todos
          </Button>
        </div>
        
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {nearbyPlaces.map((place) => (
            <div
              key={place.id}
              className="flex-shrink-0 cursor-pointer group"
              onClick={() => setSelectedPlace(place)}
            >
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 p-0.5">
                  <div className="w-full h-full rounded-full overflow-hidden bg-white p-0.5">
                    <img
                      src={place.image}
                      alt={place.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm">
                  {getWeatherIcon(place.weather.condition)}
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-1 text-center max-w-[70px] truncate">
                {place.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal imersivo */}
      <Dialog open={!!selectedPlace} onOpenChange={() => setSelectedPlace(null)}>
        <DialogContent className="max-w-md p-0 overflow-hidden">
          {selectedPlace && (
            <>
              <DialogTitle className="sr-only">{selectedPlace.name}</DialogTitle>
              
              {/* Imagem de capa */}
              <div className="relative h-48">
                <img
                  src={selectedPlace.image}
                  alt={selectedPlace.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                {/* Badge do tipo */}
                <div className="absolute top-3 left-3">
                  <Badge className="bg-white/90 text-gray-900 backdrop-blur-sm">
                    {selectedPlace.type}
                  </Badge>
                </div>
                
                {/* Status de funcionamento */}
                <div className="absolute top-3 right-3">
                  <Badge 
                    className={`backdrop-blur-sm ${
                      selectedPlace.hours.isOpen 
                        ? 'bg-green-500/90 text-white' 
                        : 'bg-red-500/90 text-white'
                    }`}
                  >
                    {selectedPlace.hours.isOpen ? 'Aberto' : 'Fechado'}
                  </Badge>
                </div>
                
                {/* Nome do lugar */}
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-white font-semibold text-lg">{selectedPlace.name}</h3>
                </div>
              </div>
              
              {/* Informações */}
              <div className="p-4 space-y-4">
                {/* Endereço */}
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-900">{selectedPlace.address}</p>
                    <p className="text-sm text-gray-500">{selectedPlace.distance} de distância</p>
                  </div>
                </div>
                
                {/* Clima */}
                <div className="flex items-center gap-3">
                  {getWeatherIcon(selectedPlace.weather.condition)}
                  <span className="text-gray-900">
                    {selectedPlace.weather.temperature}°C hoje
                  </span>
                </div>
                
                {/* Horário */}
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <span className="text-gray-900">
                    {selectedPlace.hours.open} - {selectedPlace.hours.close}
                  </span>
                </div>
                
                {/* Botão Ver Página */}
                <Button 
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={() => {
                    window.location.hash = `lugar-${selectedPlace.id}`;
                    setSelectedPlace(null);
                  }}
                >
                  Ver página do lugar
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}