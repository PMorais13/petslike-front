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
  DollarSign,
  Brain,
  Target,
  Users,
  CheckCircle,
  PlayCircle,
  Shield,
  TrendingUp,
  BookOpen,
  Zap
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
import { VisuallyHidden } from './ui/visually-hidden';

interface Testimonial {
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
  beforeAfter?: {
    before: string;
    after: string;
    description: string;
  };
  progress: string;
  videoUrl?: string;
}

interface TrainingPackage {
  id: string;
  name: string;
  sessions: number;
  price: number;
  duration: number; // em semanas
  description: string;
  includes: string[];
  bestFor: string[];
}

const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    author: {
      name: 'Maria Santos',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    rating: 5,
    comment: 'Incrível transformação! Minha Luna está muito mais calma.',
    date: new Date(2024, 0, 15),
    petName: 'Luna',
    petType: 'Golden Retriever',
    progress: 'Reduziu 90% dos comportamentos destrutivos'
  },
  {
    id: '2',
    author: {
      name: 'João Silva',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    rating: 5,
    comment: 'Thor aprendeu comandos básicos rapidamente.',
    date: new Date(2024, 0, 10),
    petName: 'Thor',
    petType: 'Pastor Alemão',
    progress: 'Dominou 5 comandos básicos em 4 semanas'
  }
];

const mockPackages: TrainingPackage[] = [
  {
    id: '1',
    name: 'Básico - Primeiros Passos',
    sessions: 5,
    price: 400,
    duration: 3,
    description: 'Ideal para filhotes e cães que nunca passaram por adestramento',
    includes: [
      'Avaliação comportamental inicial',
      '5 sessões de 60 minutos',
      'Comandos básicos (senta, fica, vem)',
      'Material de apoio digital',
      'Suporte via WhatsApp'
    ],
    bestFor: ['Filhotes 3-6 meses', 'Primeiros comandos', 'Socialização inicial']
  },
  {
    id: '2',
    name: 'Intermediário - Obediência',
    sessions: 8,
    price: 600,
    duration: 5,
    description: 'Para cães com noções básicas que precisam aprimorar obediência',
    includes: [
      'Avaliação comportamental',
      '8 sessões de 60 minutos',
      'Comandos básicos e intermediários',
      'Trabalho de coleira e guia',
      'Exercícios de autocontrole',
      'Material de apoio digital',
      'Suporte via WhatsApp',
      'Sessão de revisão após 30 dias'
    ],
    bestFor: ['Cães 6+ meses', 'Aprimoramento de comandos', 'Controle de impulsos']
  },
  {
    id: '3',
    name: 'Avançado - Comportamento',
    sessions: 12,
    price: 900,
    duration: 8,
    description: 'Solução para problemas comportamentais específicos',
    includes: [
      'Avaliação comportamental detalhada',
      '12 sessões de 60 minutos',
      'Plano personalizado',
      'Trabalho com ansiedade/agressividade',
      'Técnicas de modificação comportamental',
      'Orientação para toda família',
      'Material de apoio completo',
      'Suporte via WhatsApp',
      '2 sessões de revisão',
      'Relatório final de progresso'
    ],
    bestFor: ['Problemas comportamentais', 'Ansiedade de separação', 'Agressividade controlada']
  }
];

const trainerData = {
  id: '1',
  name: 'Carlos Mendes',
  image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
  coverImage: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&h=300&fit=crop',
  rating: 4.9,
  reviewCount: 156,
  experience: 8,
  description: 'Adestrador certificado especializado em reforço positivo. Trabalho com amor, paciência e técnicas cientificamente comprovadas para o bem-estar do seu pet.',
  method: 'Reforço Positivo',
  philosophy: 'Acredito que todo cão pode aprender quando respeitamos seu tempo e usamos métodos gentis. Minha abordagem foca no fortalecimento do vínculo entre tutor e pet, criando uma comunicação clara e respeitosa.',
  certifications: [
    'CCPDT - Certification Council for Professional Dog Trainers',
    'KPA-CTP - Karen Pryor Academy Certified Training Partner',
    'Especialização em Comportamento Animal - USP',
    'Curso Avançado de Modificação Comportamental'
  ],
  specialties: [
    'Ansiedade de separação',
    'Socialização de filhotes',
    'Agressividade por medo',
    'Adestramento básico',
    'Problemas de latido excessivo',
    'Truques e exercícios mentais'
  ],
  serviceArea: ['Vila Madalena', 'Pinheiros', 'Jardins', 'Itaim Bibi', 'Moema', 'Vila Olímpia'],
  modalities: ['Presencial na casa', 'Presencial no local', 'Online'],
  sessionDuration: 60,
  phone: '(11) 99999-1111',
  whatsapp: '5511999991111',
  email: 'carlos@adestramentopositivo.com',
  website: 'www.adestramentopositivo.com',
  instagram: '@carlosadestramento',
  address: 'Vila Madalena, São Paulo - SP',
  requirements: [
    'Vacinação em dia (V8 ou V10 + antirrábica)',
    'Vermifugação atualizada',
    'Coleira e guia em boas condições',
    'Petiscos favoritos do pet para recompensas'
  ],
  expectedResults: [
    'Melhora significativa em 2-3 sessões',
    'Comandos básicos dominados em 4-6 semanas',
    'Problemas comportamentais reduzidos em 60-80%',
    'Fortalecimento do vínculo tutor-pet',
    'Maior qualidade de vida para toda família'
  ],
  successRate: 95,
  completedTrainings: 340
};

export function TrainerProfilePage() {
  const [selectedPackage, setSelectedPackage] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  const handleBack = () => {
    window.location.hash = '#adestradores';
  };

  const handleWhatsAppContact = () => {
    const message = `Olá ${trainerData.name}! Gostaria de saber mais sobre seus serviços de adestramento. Podemos conversar?`;
    window.open(`https://wa.me/${trainerData.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleEvaluation = () => {
    if (!selectedPackage) {
      alert('Por favor, selecione um pacote para solicitar avaliação');
      return;
    }
    
    const selectedPkg = mockPackages.find(pkg => pkg.id === selectedPackage);
    const message = `Olá ${trainerData.name}! Gostaria de solicitar uma avaliação para o pacote "${selectedPkg?.name}". 

${contactMessage ? `Observações: ${contactMessage}` : ''}

Aguardo seu contato!`;
    
    window.open(`https://wa.me/${trainerData.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
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
          src={trainerData.coverImage} 
          alt="Capa do adestrador"
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
                  src={trainerData.image} 
                  alt={trainerData.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center md:text-left mt-4">
                <h1 className="text-2xl font-bold text-gray-900">{trainerData.name}</h1>
                <div className="flex items-center gap-2 mt-1 justify-center md:justify-start">
                  <div className="flex items-center gap-1">
                    {renderStars(trainerData.rating)}
                  </div>
                  <span className="font-medium">{trainerData.rating}</span>
                  <span className="text-gray-600">({trainerData.reviewCount} avaliações)</span>
                </div>
                <div className="flex items-center gap-2 mt-2 justify-center md:justify-start">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">{trainerData.experience} anos de experiência</span>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <p className="text-gray-700 leading-relaxed">{trainerData.description}</p>
              
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge className="bg-blue-100 text-blue-700 gap-1">
                  <Brain className="w-3 h-3" />
                  {trainerData.method}
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <MapPin className="w-3 h-3" />
                  {trainerData.serviceArea.length} regiões
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <Award className="w-3 h-3" />
                  {trainerData.certifications.length} certificações
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {trainerData.successRate}% sucesso
                </Badge>
              </div>

              <div className="flex gap-3 mt-6">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white flex-1">
                      <Calendar className="w-4 h-4 mr-2" />
                      Solicitar avaliação
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Solicitar avaliação com {trainerData.name}</DialogTitle>
                      <DialogDescription>
                        Escolha o pacote de interesse e envie sua solicitação
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Pacote de interesse</label>
                        <Select value={selectedPackage} onValueChange={setSelectedPackage}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um pacote" />
                          </SelectTrigger>
                          <SelectContent>
                            {mockPackages.map((pkg) => (
                              <SelectItem key={pkg.id} value={pkg.id}>
                                {pkg.name} - R$ {pkg.price}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-2 block">Mensagem (opcional)</label>
                        <Textarea
                          placeholder="Conte sobre seu pet, principais desafios, objetivos..."
                          value={contactMessage}
                          onChange={(e) => setContactMessage(e.target.value)}
                          rows={4}
                        />
                      </div>
                      
                      <Button onClick={handleEvaluation} className="w-full bg-purple-600 hover:bg-purple-700">
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
      <Tabs defaultValue="pacotes" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pacotes">Pacotes</TabsTrigger>
          <TabsTrigger value="metodo">Método</TabsTrigger>
          <TabsTrigger value="depoimentos">Depoimentos</TabsTrigger>
          <TabsTrigger value="contato">Contato</TabsTrigger>
        </TabsList>

        <TabsContent value="pacotes" className="space-y-6">
          {/* Training Packages */}
          <div className="grid gap-6">
            {mockPackages.map((pkg) => (
              <Card key={pkg.id} className="border-2 hover:border-purple-200 transition-colors">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl text-gray-900">{pkg.name}</CardTitle>
                      <p className="text-gray-600 mt-1">{pkg.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-600">R$ {pkg.price}</div>
                      <div className="text-sm text-gray-600">{pkg.sessions} sessões</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        O que inclui:
                      </h4>
                      <ul className="space-y-2">
                        {pkg.includes.map((item, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <Target className="w-4 h-4 text-blue-600" />
                        Ideal para:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {pkg.bestFor.map((item, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 mt-3">
                        <Clock className="w-4 h-4 inline mr-1" />
                        Duração: {pkg.duration} semanas
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Results and Requirements */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  Resultados Esperados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {trainerData.expectedResults.map((result, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Zap className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      {result}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-green-800">
                      {trainerData.successRate}% de taxa de sucesso
                    </span>
                  </div>
                  <p className="text-green-700 text-sm mt-1">
                    Em {trainerData.completedTrainings} adestramentos realizados
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-purple-600" />
                  Pré-requisitos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {trainerData.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-blue-800 text-sm">
                    <Shield className="w-4 h-4 inline mr-1" />
                    Todos os requisitos são para garantir a segurança e eficácia do treinamento
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="metodo" className="space-y-6">
          {/* Philosophy and Method */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-600" />
                Filosofia e Método
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed mb-6">{trainerData.philosophy}</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Award className="w-4 h-4 text-purple-600" />
                    Certificações
                  </h4>
                  <ul className="space-y-2">
                    {trainerData.certifications.map((cert, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
                        {cert}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Target className="w-4 h-4 text-purple-600" />
                    Especialidades
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {trainerData.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Service Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-600" />
                Detalhes do Atendimento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Modalidades</h4>
                  <ul className="space-y-2">
                    {trainerData.modalities.map((modality, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        {modality}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Duração das sessões</h4>
                  <p className="text-2xl font-bold text-purple-600">{trainerData.sessionDuration} min</p>
                  <p className="text-sm text-gray-600">Por sessão individual</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Área de atendimento</h4>
                  <div className="flex flex-wrap gap-1">
                    {trainerData.serviceArea.slice(0, 3).map((area, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {area}
                      </Badge>
                    ))}
                    {trainerData.serviceArea.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{trainerData.serviceArea.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="depoimentos">
          <div className="space-y-6">
            {/* Progress Summary */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900">{trainerData.rating}</div>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    {renderStars(trainerData.rating)}
                  </div>
                  <p className="text-gray-600 mt-1">
                    {trainerData.reviewCount} tutores satisfeitos • {trainerData.completedTrainings} pets treinados
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Individual Testimonials */}
            <div className="space-y-4">
              {mockTestimonials.map((testimonial) => (
                <Card key={testimonial.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={testimonial.author.image} alt={testimonial.author.name} />
                        <AvatarFallback>{testimonial.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-medium">{testimonial.author.name}</h4>
                            <p className="text-sm text-gray-600">
                              {testimonial.petName} - {testimonial.petType}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1">
                              {renderStars(testimonial.rating)}
                            </div>
                            <p className="text-sm text-gray-600">
                              {testimonial.date.toLocaleDateString('pt-BR')}
                            </p>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 mb-3">{testimonial.comment}</p>
                        
                        {/* Progress highlight */}
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-green-600" />
                            <span className="font-medium text-green-800">Progresso alcançado:</span>
                          </div>
                          <p className="text-green-700 text-sm mt-1">{testimonial.progress}</p>
                        </div>
                        
                        {/* Before/After images */}
                        {testimonial.beforeAfter && (
                          <div>
                            <h5 className="font-medium mb-2">Antes e depois:</h5>
                            <div className="grid grid-cols-2 gap-4 max-w-md">
                              <div>
                                <p className="text-xs text-gray-500 mb-1">Antes</p>
                                <img 
                                  src={testimonial.beforeAfter.before} 
                                  alt="Antes do treinamento"
                                  className="w-full h-24 rounded-lg object-cover"
                                />
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 mb-1">Depois</p>
                                <img 
                                  src={testimonial.beforeAfter.after} 
                                  alt="Depois do treinamento"
                                  className="w-full h-24 rounded-lg object-cover"
                                />
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">
                              {testimonial.beforeAfter.description}
                            </p>
                          </div>
                        )}
                        
                        {/* Video testimonial */}
                        {testimonial.videoUrl && (
                          <div className="mt-3">
                            <Button variant="outline" size="sm" className="gap-2">
                              <PlayCircle className="w-4 h-4" />
                              Ver vídeo do progresso
                            </Button>
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

        <TabsContent value="contato">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-purple-600" />
                  Informações de Contato
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium">Telefone</p>
                    <p className="text-gray-600">{trainerData.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium">WhatsApp</p>
                    <p className="text-gray-600">Disponível para contato</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium">Localização</p>
                    <p className="text-gray-600">{trainerData.address}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <h4 className="font-medium">Redes sociais e site</h4>
                  <div className="space-y-2">
                    <p className="text-sm">📧 {trainerData.email}</p>
                    <p className="text-sm">🌐 {trainerData.website}</p>
                    <p className="text-sm">📱 {trainerData.instagram}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-purple-600" />
                  Área de Atendimento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Atendo nas seguintes regiões de São Paulo:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {trainerData.serviceArea.map((area, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <MapPin className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium">{area}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h5 className="font-medium text-blue-800 mb-2">Modalidades disponíveis:</h5>
                  <ul className="space-y-1">
                    <li className="text-sm text-blue-700">🏠 Presencial na casa do tutor</li>
                    <li className="text-sm text-blue-700">🏞️ Presencial em parques/locais</li>
                    <li className="text-sm text-blue-700">💻 Consultoria online</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
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