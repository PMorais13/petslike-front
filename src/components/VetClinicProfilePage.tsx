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
  Stethoscope,
  Activity,
  Zap,
  Scissors,
  Users,
  CreditCard,
  Globe,
  AlertCircle,
  GraduationCap,
  Building
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
  images?: string[];
}

interface VetDoctor {
  id: string;
  name: string;
  image: string;
  specialty: string;
  crmv: string;
  experience: number;
  education: string[];
}

const mockReviews: Review[] = [
  {
    id: '1',
    author: {
      name: 'Maria Santos',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    rating: 5,
    comment: 'Atendimento excepcional! Dr. Carlos foi muito atencioso com minha Luna. A clínica é bem equipada e o ambiente é calmo.',
    date: new Date(2024, 0, 15),
    petName: 'Luna',
    service: 'Consulta cardiológica',
    images: ['https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&h=200&fit=crop']
  },
  {
    id: '2',
    author: {
      name: 'João Silva',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    rating: 5,
    comment: 'Emergência às 2h da madrugada e foram super atenciosos. Salvaram a vida do meu Thor!',
    date: new Date(2024, 0, 10),
    petName: 'Thor',
    service: 'Atendimento emergencial'
  },
  {
    id: '3',
    author: {
      name: 'Ana Costa',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
    },
    rating: 4,
    comment: 'Ótima estrutura e profissionais qualificados. O preço é justo pelos serviços oferecidos.',
    date: new Date(2024, 0, 5),
    petName: 'Mel',
    service: 'Exames laboratoriais'
  }
];

const mockDoctors: VetDoctor[] = [
  {
    id: '1',
    name: 'Dr. Carlos Veterinário',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
    specialty: 'Cardiologia Veterinária',
    crmv: 'SP-12345',
    experience: 15,
    education: ['FMVZ-USP', 'Especialização em Cardiologia', 'Mestrado em Clínica Médica']
  },
  {
    id: '2',
    name: 'Dra. Ana Silva',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
    specialty: 'Dermatologia Veterinária',
    crmv: 'SP-67890',
    experience: 12,
    education: ['FMVZ-USP', 'Residência em Dermatologia', 'Pós-graduação em Dermatopatologia']
  },
  {
    id: '3',
    name: 'Dr. Roberto Lima',
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face',
    specialty: 'Cirurgia Geral',
    crmv: 'SP-11223',
    experience: 18,
    education: ['UNESP Botucatu', 'Residência em Cirurgia', 'Fellowship em Cirurgia Minimamente Invasiva']
  },
  {
    id: '4',
    name: 'Dra. Paula Costa',
    image: 'https://images.unsplash.com/photo-1594824881796-40f0e4d57d69?w=150&h=150&fit=crop&crop=face',
    specialty: 'Oftalmologia Veterinária',
    crmv: 'SP-33445',
    experience: 10,
    education: ['PUC-PR', 'Especialização em Oftalmologia', 'Certificação Internacional']
  }
];

const clinicData = {
  id: '1',
  name: 'Centro Veterinário 24h',
  image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=300&h=300&fit=crop',
  coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=300&fit=crop',
  rating: 4.9,
  reviewCount: 342,
  description: 'Centro Veterinário 24h é referência em atendimento de emergência e especialidades veterinárias. Com mais de 20 anos de experiência, oferecemos cuidados completos para seu pet.',
  is24h: true,
  services: {
    'Consulta geral': 80,
    'Consulta emergência': 200,
    'Cardiologia': 150,
    'Dermatologia': 120,
    'Oftalmologia': 130,
    'Cirurgia pequeno porte': 800,
    'Cirurgia grande porte': 1500,
    'Raio-X': 120,
    'Ultrassom': 180,
    'Ecocardiograma': 250,
    'Exames laboratoriais': 80
  },
  specialties: ['Cardiologia', 'Dermatologia', 'Oftalmologia', 'Ortopedia', 'Cirurgia Geral', 'Neurologia'],
  exams: ['Raio-X', 'Ultrassom', 'Laboratório', 'Ecocardiograma', 'Eletrocardiograma'],
  species: ['Cães', 'Gatos', 'Aves', 'Pequenos Mamíferos'],
  insurances: ['Porto Seguro Pet', 'SulAmérica Pet', 'Petlove', 'Allianz Pet'],
  address: 'Av. Principal, 123 - Centro, São Paulo - SP',
  phone: '(11) 3333-4444',
  emergencyPhone: '(11) 9999-0000',
  whatsapp: '5511999990000',
  website: 'www.centroveterinario24h.com.br',
  openingHours: {
    'Segunda-feira': '24 horas',
    'Terça-feira': '24 horas',
    'Quarta-feira': '24 horas',
    'Quinta-feira': '24 horas',
    'Sexta-feira': '24 horas',
    'Sábado': '24 horas',
    'Domingo': '24 horas'
  },
  paymentMethods: ['Dinheiro', 'Cartão de Crédito', 'Cartão de Débito', 'PIX', 'Convênios'],
  facilities: [
    'Centro cirúrgico completo',
    'UTI veterinária',
    'Sala de raio-X digital',
    'Laboratório próprio',
    'Internação 24h',
    'Farmácia veterinária',
    'Recepção climatizada',
    'Estacionamento gratuito'
  ],
  instructions: [
    {
      type: 'Exames laboratoriais',
      instruction: 'Jejum de 12 horas para exames de sangue'
    },
    {
      type: 'Ultrassom abdominal',
      instruction: 'Jejum de 12 horas e bexiga cheia'
    },
    {
      type: 'Cirurgias',
      instruction: 'Jejum de 12 horas e banho na véspera'
    },
    {
      type: 'Emergência',
      instruction: 'Ligue antes de vir para orientações específicas'
    }
  ],
  gallery: [
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=300&h=200&fit=crop'
  ]
};

export function VetClinicProfilePage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedService, setSelectedService] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  const handleBack = () => {
    window.location.hash = '#clinicas';
  };

  const handleWhatsAppContact = () => {
    const message = `Olá! Gostaria de agendar uma consulta no ${clinicData.name}. Podemos conversar?`;
    window.open(`https://wa.me/${clinicData.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleEmergencyCall = () => {
    window.open(`tel:${clinicData.emergencyPhone}`, '_self');
  };

  const handleBooking = () => {
    if (!selectedDate || !selectedService) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }
    
    const servicePrice = clinicData.services[selectedService as keyof typeof clinicData.services];
    const doctor = selectedDoctor ? mockDoctors.find(d => d.id === selectedDoctor) : null;
    const bookingDetails = `
Serviço: ${selectedService} - R$ ${servicePrice}
${doctor ? `Veterinário: ${doctor.name}` : ''}
Data: ${selectedDate.toLocaleDateString('pt-BR')}
${specialRequests ? `Observações: ${specialRequests}` : ''}
    `.trim();
    
    const message = `Olá! Gostaria de agendar uma consulta no ${clinicData.name}:\n\n${bookingDetails}`;
    window.open(`https://wa.me/${clinicData.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
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

      {/* Emergency Notice */}
      {clinicData.is24h && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-red-600" />
            <span className="font-medium text-red-800">Emergência 24h — sempre ligar antes: {clinicData.emergencyPhone}</span>
          </div>
        </div>
      )}

      {/* Cover Image */}
      <div className="relative h-64 rounded-xl overflow-hidden">
        <img 
          src={clinicData.coverImage} 
          alt="Capa da clínica"
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
                  src={clinicData.image} 
                  alt={clinicData.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center md:text-left mt-4">
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <h1 className="text-2xl font-bold text-gray-900">{clinicData.name}</h1>
                  {clinicData.is24h && (
                    <Badge className="bg-red-100 text-red-700">
                      <Zap className="w-3 h-3 mr-1" />
                      24h
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1 justify-center md:justify-start">
                  <div className="flex items-center gap-1">
                    {renderStars(clinicData.rating)}
                  </div>
                  <span className="font-medium">{clinicData.rating}</span>
                  <span className="text-gray-600">({clinicData.reviewCount} avaliações)</span>
                </div>
                <div className="flex items-center gap-2 mt-2 justify-center md:justify-start">
                  <Clock className="w-4 h-4 text-green-600" />
                  <span className="text-green-600 font-medium">Aberto 24 horas</span>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <p className="text-gray-700 leading-relaxed">{clinicData.description}</p>
              
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="outline" className="gap-1">
                  <MapPin className="w-3 h-3" />
                  Centro
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <Users className="w-3 h-3" />
                  {mockDoctors.length} veterinários
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <Activity className="w-3 h-3" />
                  {clinicData.exams.length} tipos de exame
                </Badge>
              </div>

              <div className="flex gap-3 mt-6">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white flex-1">
                      <Calendar className="w-4 h-4 mr-2" />
                      Agendar consulta
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Agendar consulta no {clinicData.name}</DialogTitle>
                      <DialogDescription>
                        Escolha o serviço, data e veterinário
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Data da consulta</label>
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
                            {Object.entries(clinicData.services).map(([service, price]) => (
                              <SelectItem key={service} value={service}>
                                {service} - R$ {price}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Veterinário (opcional)</label>
                        <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                          <SelectTrigger>
                            <SelectValue placeholder="Qualquer veterinário disponível" />
                          </SelectTrigger>
                          <SelectContent>
                            {mockDoctors.map((doctor) => (
                              <SelectItem key={doctor.id} value={doctor.id}>
                                {doctor.name} - {doctor.specialty}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-2 block">Observações</label>
                        <Textarea
                          placeholder="Informações sobre seu pet, sintomas, etc."
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
                
                {clinicData.is24h ? (
                  <Button 
                    onClick={handleEmergencyCall}
                    className="bg-red-600 hover:bg-red-700 text-white gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    Emergência
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    onClick={handleWhatsAppContact}
                    className="gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="servicos" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="servicos">Serviços</TabsTrigger>
          <TabsTrigger value="equipe">Equipe</TabsTrigger>
          <TabsTrigger value="estrutura">Estrutura</TabsTrigger>
          <TabsTrigger value="avaliacoes">Avaliações</TabsTrigger>
        </TabsList>

        <TabsContent value="servicos" className="space-y-6">
          {/* Services and Pricing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-purple-600" />
                Serviços e Preços
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {Object.entries(clinicData.services).map(([service, price]) => (
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
                {clinicData.specialties.map((specialty, index) => (
                  <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-700">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Exams */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-purple-600" />
                Exames Disponíveis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {clinicData.exams.map((exam, index) => (
                  <Badge key={index} variant="outline">
                    {exam}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-purple-600" />
                Instruções Importantes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {clinicData.instructions.map((instruction, index) => (
                  <div key={index} className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-medium text-yellow-800">{instruction.type}</h4>
                    <p className="text-yellow-700 text-sm mt-1">{instruction.instruction}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact and Insurance */}
          <div className="grid md:grid-cols-2 gap-6">
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
                  <span className="text-sm">{clinicData.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{clinicData.phone}</span>
                </div>
                {clinicData.emergencyPhone && (
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-red-600">Emergência: {clinicData.emergencyPhone}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">WhatsApp</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{clinicData.website}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-purple-600" />
                  Convênios e Pagamento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-medium mb-2">Convênios aceitos:</h4>
                  <div className="flex flex-wrap gap-1">
                    {clinicData.insurances.map((insurance, index) => (
                      <Badge key={index} className="bg-blue-100 text-blue-700 text-xs">
                        {insurance}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Formas de pagamento:</h4>
                  <div className="flex flex-wrap gap-1">
                    {clinicData.paymentMethods.map((method, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {method}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="equipe">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-600" />
                Nossa Equipe Médica
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {mockDoctors.map((doctor) => (
                  <div key={doctor.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={doctor.image} alt={doctor.name} />
                        <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{doctor.name}</h3>
                        <p className="text-purple-600 font-medium">{doctor.specialty}</p>
                        <p className="text-sm text-gray-600">CRMV: {doctor.crmv}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium">{doctor.experience} anos de experiência</span>
                      </div>
                      <div className="space-y-1">
                        {doctor.education.map((edu, index) => (
                          <div key={index} className="text-sm text-gray-600 ml-6">
                            • {edu}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="estrutura">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5 text-purple-600" />
                Estrutura e Facilidades
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {clinicData.facilities.map((facility, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Building className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="font-medium text-green-700">{facility}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium mb-3">Galeria da Clínica</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {clinicData.gallery.map((image, index) => (
                    <div key={index} className="aspect-square rounded-lg overflow-hidden">
                      <img 
                        src={image} 
                        alt={`Foto ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                  ))}
                </div>
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
                  <div className="text-4xl font-bold text-gray-900">{clinicData.rating}</div>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    {renderStars(clinicData.rating)}
                  </div>
                  <p className="text-gray-600 mt-1">Baseado em {clinicData.reviewCount} avaliações</p>
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
          Denunciar clínica
        </Button>
      </div>
    </div>
  );
}