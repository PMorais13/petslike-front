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
  Users,
  PawPrint,
  Shield
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
  images?: string[];
}

const mockReviews: Review[] = [
  {
    id: '1',
    author: {
      name: 'Maria Santos',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    rating: 5,
    comment: 'Ana é incrível! Meu Thor adora os passeios com ela. Sempre muito cuidadosa e manda fotos durante o passeio.',
    date: new Date(2024, 0, 15),
    petName: 'Thor',
    images: ['https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&h=200&fit=crop']
  },
  {
    id: '2',
    author: {
      name: 'João Silva',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    rating: 5,
    comment: 'Profissional excepcional! Luna voltou super cansada e feliz. Recomendo muito!',
    date: new Date(2024, 0, 10),
    petName: 'Luna'
  },
  {
    id: '3',
    author: {
      name: 'Carla Mendes',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
    },
    rating: 4,
    comment: 'Ótima passeadora, muito pontual e carinhosa. Max ficou bem à vontade.',
    date: new Date(2024, 0, 5),
    petName: 'Max'
  }
];

const walkerData = {
  id: '1',
  name: 'Ana Paula Silva',
  image: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=300&h=300&fit=crop&crop=face',
  coverImage: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=300&fit=crop',
  rating: 4.9,
  reviewCount: 127,
  experience: 5,
  bio: 'Apaixonada por cães há mais de 5 anos, ofereço passeios seguros e divertidos para seu melhor amigo. Acredito que cada pet tem sua personalidade única e adapto meu serviço às necessidades específicas de cada um.',
  certifications: ['Pet Sitter Certificado', 'Primeiros Socorros Pet', 'Comportamento Canino'],
  specialties: ['Cães ansiosos', 'Filhotes', 'Adestramento básico', 'Cães idosos'],
  walkTypes: ['Individual', 'Coletivo'],
  acceptedSizes: ['P', 'M', 'G'],
  coverageArea: ['Vila Madalena', 'Pinheiros', 'Jardins', 'Itaim Bibi'],
  availability: {
    'Segunda': ['07:00-09:00', '17:00-19:00'],
    'Terça': ['07:00-09:00', '17:00-19:00'],
    'Quarta': ['07:00-09:00', '17:00-19:00'],
    'Quinta': ['07:00-09:00', '17:00-19:00'],
    'Sexta': ['07:00-09:00', '17:00-19:00'],
    'Sábado': ['08:00-12:00', '14:00-18:00'],
    'Domingo': ['08:00-12:00']
  },
  pricing: {
    individual30: 25,
    individual45: 35,
    individual60: 45,
    group30: 20,
    group45: 28,
    group60: 35,
    package5: 200,
    package10: 380
  },
  phone: '(11) 99999-1234',
  whatsapp: '5511999991234',
  gallery: [
    'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=200&fit=crop'
  ],
  isVerified: true,
  totalWalks: 500
};

export function WalkerProfilePage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedDuration, setSelectedDuration] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  const handleBack = () => {
    window.location.hash = '#passeadores';
  };

  const handleWhatsAppContact = () => {
    const message = `Olá ${walkerData.name}! Gostaria de contratar seus serviços de passeio para meu pet. Podemos conversar?`;
    window.open(`https://wa.me/${walkerData.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleBooking = () => {
    if (!selectedDate || !selectedDuration || !selectedType) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }
    
    const bookingDetails = `
Data: ${selectedDate.toLocaleDateString('pt-BR')}
Tipo: ${selectedType}
Duração: ${selectedDuration}
${specialRequests ? `Observações: ${specialRequests}` : ''}
    `.trim();
    
    const message = `Olá ${walkerData.name}! Gostaria de agendar um passeio:\n\n${bookingDetails}`;
    window.open(`https://wa.me/${walkerData.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
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
          src={walkerData.coverImage} 
          alt="Capa do perfil"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Profile Header */}
      <Card className="border-0 shadow-lg -mt-16 relative z-10">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center md:items-start">
              <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                <AvatarImage src={walkerData.image} alt={walkerData.name} />
                <AvatarFallback className="text-xl">{walkerData.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-center md:text-left mt-4">
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <h1 className="text-2xl font-bold text-gray-900">{walkerData.name}</h1>
                  {walkerData.isVerified && (
                    <Badge className="bg-green-100 text-green-700">
                      <Shield className="w-3 h-3 mr-1" />
                      Verificado
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1 justify-center md:justify-start">
                  <div className="flex items-center gap-1">
                    {renderStars(walkerData.rating)}
                  </div>
                  <span className="font-medium">{walkerData.rating}</span>
                  <span className="text-gray-600">({walkerData.reviewCount} avaliações)</span>
                </div>
                <p className="text-gray-600 mt-1">{walkerData.experience} anos de experiência</p>
                <p className="text-purple-600 font-semibold mt-1">{walkerData.totalWalks}+ passeios realizados</p>
              </div>
            </div>

            <div className="flex-1">
              <p className="text-gray-700 leading-relaxed">{walkerData.bio}</p>
              
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="outline" className="gap-1">
                  <MapPin className="w-3 h-3" />
                  {walkerData.coverageArea.slice(0, 2).join(', ')}
                  {walkerData.coverageArea.length > 2 && ` +${walkerData.coverageArea.length - 2}`}
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <PawPrint className="w-3 h-3" />
                  Portes: {walkerData.acceptedSizes.join(', ')}
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <Users className="w-3 h-3" />
                  {walkerData.walkTypes.join(' e ')}
                </Badge>
              </div>

              <div className="flex gap-3 mt-6">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white flex-1">
                      <Calendar className="w-4 h-4 mr-2" />
                      Agendar passeio
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Agendar passeio com {walkerData.name}</DialogTitle>
                      <DialogDescription>
                        Preencha os detalhes do passeio desejado
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Data do passeio</label>
                        <CalendarComponent
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={(date) => date < new Date()}
                          className="rounded-md border"
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-2 block">Tipo de passeio</label>
                        <Select value={selectedType} onValueChange={setSelectedType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="individual">Individual</SelectItem>
                            <SelectItem value="coletivo">Coletivo</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-2 block">Duração</label>
                        <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a duração" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="30min">30 minutos</SelectItem>
                            <SelectItem value="45min">45 minutos</SelectItem>
                            <SelectItem value="60min">60 minutos</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-2 block">Observações especiais</label>
                        <Textarea
                          placeholder="Informações sobre seu pet, local de encontro, etc."
                          value={specialRequests}
                          onChange={(e) => setSpecialRequests(e.target.value)}
                          rows={3}
                        />
                      </div>
                      
                      <Button onClick={handleBooking} className="w-full bg-purple-600 hover:bg-purple-700">
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
          <TabsTrigger value="disponibilidade">Disponibilidade</TabsTrigger>
          <TabsTrigger value="galeria">Galeria</TabsTrigger>
          <TabsTrigger value="avaliacoes">Avaliações</TabsTrigger>
        </TabsList>

        <TabsContent value="servicos" className="space-y-6">
          {/* Certifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-600" />
                Certificações e Qualificações
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {walkerData.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Award className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="font-medium text-green-700">{cert}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Specialties */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-purple-600" />
                Especialidades
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {walkerData.specialties.map((specialty, index) => (
                  <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-700">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-purple-600" />
                Preços
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Passeios Individuais</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>30 minutos</span>
                      <span className="font-medium">R$ {walkerData.pricing.individual30}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>45 minutos</span>
                      <span className="font-medium">R$ {walkerData.pricing.individual45}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>60 minutos</span>
                      <span className="font-medium">R$ {walkerData.pricing.individual60}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Passeios em Grupo</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>30 minutos</span>
                      <span className="font-medium">R$ {walkerData.pricing.group30}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>45 minutos</span>
                      <span className="font-medium">R$ {walkerData.pricing.group28}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>60 minutos</span>
                      <span className="font-medium">R$ {walkerData.pricing.group60}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div>
                <h4 className="font-medium mb-3">Pacotes</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <span>5 passeios</span>
                      <div className="text-right">
                        <span className="font-medium">R$ {walkerData.pricing.package5}</span>
                        <p className="text-sm text-green-600">Economize R$ 25</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <span>10 passeios</span>
                      <div className="text-right">
                        <span className="font-medium">R$ {walkerData.pricing.package10}</span>
                        <p className="text-sm text-green-600">Economize R$ 70</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Coverage Area */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-purple-600" />
                Área de Atendimento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {walkerData.coverageArea.map((area, index) => (
                  <Badge key={index} variant="outline" className="gap-1">
                    <MapPin className="w-3 h-3" />
                    {area}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="disponibilidade">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-600" />
                Horários Disponíveis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(walkerData.availability).map(([day, times]) => (
                  <div key={day} className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="w-20 font-medium">{day}</div>
                    <div className="flex flex-wrap gap-2">
                      {times.map((time, index) => (
                        <Badge key={index} variant="secondary" className="bg-green-100 text-green-700">
                          {time}
                        </Badge>
                      ))}
                    </div>
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
                {walkerData.gallery.map((image, index) => (
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
                  <div className="text-4xl font-bold text-gray-900">{walkerData.rating}</div>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    {renderStars(walkerData.rating)}
                  </div>
                  <p className="text-gray-600 mt-1">Baseado em {walkerData.reviewCount} avaliações</p>
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
                            <p className="text-sm text-gray-600">Passeio com {review.petName}</p>
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
          Denunciar perfil
        </Button>
      </div>
    </div>
  );
}