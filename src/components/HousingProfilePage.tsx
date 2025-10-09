import { useState, useMemo } from 'react';
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
  Home,
  Camera,
  Trees,
  Shield,
  Users,
  Zap,
  CheckCircle,
  AlertCircle,
  DollarSign,
  PlayCircle
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
// import { Calendar as CalendarComponent } from './ui/calendar';
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
  petType: string;
  service: string;
  images?: string[];
}

interface DailySchedule {
  time: string;
  activity: string;
  description: string;
}

const mockReviews: Review[] = [
  {
    id: '1',
    author: {
      name: 'Maria Santos',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    rating: 5,
    comment: 'Excelente cuidado com minha Luna! As câmeras me deram muita tranquilidade.',
    date: new Date(2024, 0, 15),
    petName: 'Luna',
    petType: 'Golden Retriever',
    service: 'Hospedagem 5 dias'
  },
  {
    id: '2',
    author: {
      name: 'João Silva',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    rating: 5,
    comment: 'Thor se divertiu muito! Ambiente muito limpo e organizado.',
    date: new Date(2024, 0, 10),
    petName: 'Thor',
    petType: 'Pastor Alemão',
    service: 'Creche diária'
  }
];

const mockSchedule: DailySchedule[] = [
  { time: '8:00', activity: 'Café da manhã', description: 'Primeira refeição do dia' },
  { time: '10:00', activity: 'Recreação', description: 'Brincadeiras no quintal' },
  { time: '12:00', activity: 'Almoço', description: 'Segunda refeição' },
  { time: '16:00', activity: 'Lanche', description: 'Petiscos e água' },
  { time: '18:00', activity: 'Jantar', description: 'Última refeição' }
];

const housingData = {
  id: '1',
  name: 'Hotel Canino Premium',
  image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300&h=300&fit=crop',
  coverImage: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=300&fit=crop',
  rating: 4.9,
  reviewCount: 234,
  type: 'Hotel',
  description: 'Hotel canino premium com estrutura completa para hospedagem e creche. Ambiente seguro, monitorado 24h e com toda comodidade que seu pet merece.',
  owner: {
    name: 'Patricia Silva',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    experience: 8,
    bio: 'Veterinária e apaixonada por animais há mais de 8 anos. Fundei o Hotel Canino Premium para oferecer o melhor cuidado para pets enquanto seus tutores viajam.'
  },
  features: [
    'Monitoramento 24h com câmeras',
    'Quintal amplo (500m²)',
    'Área coberta climatizada',
    'Veterinário de plantão',
    'Piscina canina aquecida',
    'Área de isolamento',
    'Sistema de som ambiente',
    'Brinquedos e equipamentos'
  ],
  capacity: {
    small: 15,
    medium: 10,
    large: 8,
    total: 33
  },
  pricing: {
    daycare: {
      small: { min: 45, max: 50 },
      medium: { min: 50, max: 55 },
      large: { min: 55, max: 65 }
    },
    overnight: {
      small: { min: 80, max: 90 },
      medium: { min: 90, max: 100 },
      large: { min: 100, max: 120 }
    }
  },
  policies: [
    {
      title: 'Vacinação obrigatória',
      description: 'V8 ou V10 + antirrábica em dia (comprovante obrigatório)',
      required: true
    },
    {
      title: 'Castração obrigatória',
      description: 'Todos os pets devem ser castrados',
      required: true
    },
    {
      title: 'Avaliação comportamental',
      description: 'Visita prévia para conhecer o temperamento do pet',
      required: true
    },
    {
      title: 'Fêmeas no cio',
      description: 'Não aceitas para evitar agitação dos demais pets',
      required: false
    },
    {
      title: 'Medicação',
      description: 'Administramos medicações conforme prescrição veterinária',
      required: false
    }
  ],
  requirements: [
    'Ração habitual do pet (quantidade para todo período)',
    'Coleira com identificação',
    'Brinquedo preferido (opcional)',
    'Medicamentos com bula e posologia',
    'Contato de veterinário de confiança',
    'Autorização para emergências médicas'
  ],
  schedule: {
    checkin: '8:00 - 10:00',
    checkout: '16:00 - 18:00',
    visits: 'Permitidas das 14:00 às 16:00 (agendamento prévio)'
  },
  contact: {
    phone: '(11) 3333-1111',
    whatsapp: '5511999991111',
    email: 'contato@hotelcaninossp.com.br',
    address: 'Rua das Palmeiras, 123 - Vila Madalena, São Paulo - SP',
    coordinates: { lat: -23.5505, lng: -46.6333 }
  },
  gallery: [
    'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=200&fit=crop'
  ],
  monitoring: {
    cameras: true,
    reports: true,
    photos: true,
    videos: false,
    updates: '3x ao dia via WhatsApp'
  }
};

export function HousingProfilePage() {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [selectedService, setSelectedService] = useState('overnight');
  const [petSize, setPetSize] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  const handleBack = () => {
    window.location.hash = '#hospedagens';
  };

  const handleWhatsAppContact = () => {
    const message = `Olá! Gostaria de saber mais sobre hospedagem no ${housingData.name}. Podemos conversar?`;
    window.open(`https://wa.me/${housingData.contact.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleReservation = () => {
    if (!petSize) {
      alert('Por favor, selecione o porte do pet');
      return;
    }
    
    const serviceText = selectedService === 'overnight' ? 'Hospedagem' : 'Creche';
    
    const message = `Olá! Gostaria de solicitar uma reserva no ${housingData.name}:

🏨 Serviço: ${serviceText}
🐕 Porte do pet: ${petSize}
${specialRequests ? `📝 Observações: ${specialRequests}` : ''}

Aguardo contato para confirmar disponibilidade e valores!`;
    
    window.open(`https://wa.me/${housingData.contact.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
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
          src={housingData.coverImage} 
          alt="Capa da hospedagem"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4 flex gap-2">
          <Badge className="bg-white/90 text-gray-900">
            <Camera className="w-3 h-3 mr-1" />
            Câmeras 24h
          </Badge>
          <Badge className="bg-white/90 text-gray-900">
            <Trees className="w-3 h-3 mr-1" />
            Quintal 500m²
          </Badge>
        </div>
      </div>

      {/* Profile Header */}
      <Card className="border-0 shadow-lg -mt-16 relative z-10">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center md:items-start">
              <div className="w-24 h-24 rounded-xl overflow-hidden border-4 border-white shadow-lg">
                <img 
                  src={housingData.image} 
                  alt={housingData.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center md:text-left mt-4">
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <h1 className="text-2xl font-bold text-gray-900">{housingData.name}</h1>
                  <Badge className="bg-blue-100 text-blue-700">
                    <Home className="w-3 h-3 mr-1" />
                    {housingData.type}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 mt-1 justify-center md:justify-start">
                  <div className="flex items-center gap-1">
                    {renderStars(housingData.rating)}
                  </div>
                  <span className="font-medium">{housingData.rating}</span>
                  <span className="text-gray-600">({housingData.reviewCount} avaliações)</span>
                </div>
                <div className="flex items-center gap-2 mt-2 justify-center md:justify-start">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">{housingData.capacity.total} vagas totais</span>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <p className="text-gray-700 leading-relaxed">{housingData.description}</p>
              
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="outline" className="gap-1">
                  <MapPin className="w-3 h-3" />
                  Vila Madalena
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <Zap className="w-3 h-3" />
                  Monitoramento 24h
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <Shield className="w-3 h-3" />
                  Veterinário
                </Badge>
              </div>

              <div className="flex gap-3 mt-6">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white flex-1">
                      <Calendar className="w-4 h-4 mr-2" />
                      Solicitar reserva
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Solicitar reserva no {housingData.name}</DialogTitle>
                      <DialogDescription>
                        Preencha os dados para enviar sua solicitação
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Tipo de serviço</label>
                        <Select value={selectedService} onValueChange={setSelectedService}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="overnight">Hospedagem (pernoite)</SelectItem>
                            <SelectItem value="daycare">Creche (diurno)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Porte do pet</label>
                        <Select value={petSize} onValueChange={setPetSize}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o porte" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="small">Pequeno (até 10kg)</SelectItem>
                            <SelectItem value="medium">Médio (10-25kg)</SelectItem>
                            <SelectItem value="large">Grande (acima de 25kg)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-2 block">Data(s) desejada(s)</label>
                        <p className="text-sm text-gray-600 p-3 border rounded-md bg-gray-50">
                          Calendário será implementado em breve. Por favor, informe as datas nas observações.
                        </p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-2 block">Observações</label>
                        <Textarea
                          placeholder="Informações sobre seu pet, necessidades especiais, medicações..."
                          value={specialRequests}
                          onChange={(e) => setSpecialRequests(e.target.value)}
                          rows={3}
                        />
                      </div>
                      
                      <Button onClick={handleReservation} className="w-full bg-purple-600 hover:bg-purple-700">
                        Enviar solicitação
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
          <TabsTrigger value="estrutura">Estrutura</TabsTrigger>
          <TabsTrigger value="politicas">Políticas</TabsTrigger>
          <TabsTrigger value="avaliacoes">Avaliações</TabsTrigger>
        </TabsList>

        <TabsContent value="servicos" className="space-y-6">
          {/* Pricing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-purple-600" />
                Preços por Porte
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Creche (diurno)</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span>Pequeno porte (até 10kg)</span>
                      <span className="font-semibold text-purple-600">
                        R${housingData.pricing.daycare.small.min} - R${housingData.pricing.daycare.small.max}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span>Médio porte (10-25kg)</span>
                      <span className="font-semibold text-purple-600">
                        R${housingData.pricing.daycare.medium.min} - R${housingData.pricing.daycare.medium.max}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span>Grande porte (25kg+)</span>
                      <span className="font-semibold text-purple-600">
                        R${housingData.pricing.daycare.large.min} - R${housingData.pricing.daycare.large.max}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Hospedagem (pernoite)</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span>Pequeno porte (até 10kg)</span>
                      <span className="font-semibold text-purple-600">
                        R${housingData.pricing.overnight.small.min} - R${housingData.pricing.overnight.small.max}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span>Médio porte (10-25kg)</span>
                      <span className="font-semibold text-purple-600">
                        R${housingData.pricing.overnight.medium.min} - R${housingData.pricing.overnight.medium.max}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span>Grande porte (25kg+)</span>
                      <span className="font-semibold text-purple-600">
                        R${housingData.pricing.overnight.large.min} - R${housingData.pricing.overnight.large.max}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Daily Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-600" />
                Rotina Diária
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockSchedule.map((item, index) => (
                  <div key={index} className="flex gap-4 p-3 border rounded-lg">
                    <div className="w-16 text-center">
                      <span className="font-semibold text-purple-600">{item.time}</span>
                    </div>
                    <div className="flex-1">
                      <h5 className="font-medium">{item.activity}</h5>
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Schedule and Contact */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-purple-600" />
                  Horários
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h5 className="font-medium">Check-in</h5>
                  <p className="text-sm text-gray-600">{housingData.schedule.checkin}</p>
                </div>
                <div>
                  <h5 className="font-medium">Check-out</h5>
                  <p className="text-sm text-gray-600">{housingData.schedule.checkout}</p>
                </div>
                <div>
                  <h5 className="font-medium">Visitas</h5>
                  <p className="text-sm text-gray-600">{housingData.schedule.visits}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5 text-purple-600" />
                  Monitoramento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Câmeras de segurança 24h</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Relatórios diários via WhatsApp</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Fotos e vídeos do seu pet</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Atualizações 3x ao dia</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="estrutura" className="space-y-6">
          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="w-5 h-5 text-purple-600" />
                Facilidades e Estrutura
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {housingData.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-green-700">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Capacity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-600" />
                Capacidade por Porte
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{housingData.capacity.small}</div>
                  <div className="text-sm text-blue-700">Pequeno porte</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{housingData.capacity.medium}</div>
                  <div className="text-sm text-green-700">Médio porte</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{housingData.capacity.large}</div>
                  <div className="text-sm text-orange-700">Grande porte</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{housingData.capacity.total}</div>
                  <div className="text-sm text-purple-700">Total de vagas</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Gallery */}
          <Card>
            <CardHeader>
              <CardTitle>Galeria do Espaço</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {housingData.gallery.map((image, index) => (
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

          {/* Owner */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-600" />
                Responsável
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={housingData.owner.image} alt={housingData.owner.name} />
                  <AvatarFallback>{housingData.owner.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold">{housingData.owner.name}</h4>
                  <p className="text-sm text-gray-600">{housingData.owner.experience} anos de experiência</p>
                  <p className="text-sm text-gray-700 mt-2">{housingData.owner.bio}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="politicas" className="space-y-6">
          {/* Policies */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-600" />
                Políticas e Regras
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {housingData.policies.map((policy, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      {policy.required ? (
                        <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      ) : (
                        <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      )}
                      <div>
                        <h5 className="font-medium">{policy.title}</h5>
                        <p className="text-sm text-gray-600 mt-1">{policy.description}</p>
                        {policy.required && (
                          <Badge variant="destructive" className="mt-2 text-xs">
                            OBRIGATÓRIO
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-purple-600" />
                Itens Obrigatórios
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {housingData.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm">{requirement}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-purple-600" />
                Localização e Contato
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-500" />
                <span className="text-sm">{housingData.contact.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-500" />
                <span className="text-sm">{housingData.contact.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-gray-500" />
                <span className="text-sm">WhatsApp disponível</span>
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
                  <div className="text-4xl font-bold text-gray-900">{housingData.rating}</div>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    {renderStars(housingData.rating)}
                  </div>
                  <p className="text-gray-600 mt-1">Baseado em {housingData.reviewCount} avaliações</p>
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
                            <p className="text-sm text-gray-600">
                              {review.petName} ({review.petType}) - {review.service}
                            </p>
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
                        {review.images && (
                          <div className="flex gap-2">
                            {review.images.map((image, index) => (
                              <img 
                                key={index}
                                src={image} 
                                alt="Foto da avaliação"
                                className="w-16 h-16 rounded-lg object-cover"
                              />
                            ))}
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