import { useState } from 'react';
import { Search, Users, Calendar, MessageCircle, Plus, Trophy, Clock, MapPin, Star, Eye, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { PawIcon } from './PawIcon';

export function CommunityPage() {
  const [activeTab, setActiveTab] = useState('grupos');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 md:px-6 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <h1 className="text-lg md:text-xl font-semibold text-gray-900">Comunidade PetsLike</h1>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            <span className="sm:inline">Criar Grupo</span>
          </Button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar grupos, discussões, eventos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="px-4 md:px-6 py-4 md:py-6">
        <div className="max-w-7xl mx-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
            <Card>
              <CardContent className="p-3 md:p-4">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-lg md:text-2xl font-semibold text-gray-900">127</p>
                    <p className="text-xs md:text-sm text-gray-500">Grupos Ativos</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-3 md:p-4">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-lg md:text-2xl font-semibold text-gray-900">1.2K</p>
                    <p className="text-xs md:text-sm text-gray-500">Discussões</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-3 md:p-4">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-lg md:text-2xl font-semibold text-gray-900">18</p>
                    <p className="text-xs md:text-sm text-gray-500">Eventos</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-3 md:p-4">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Trophy className="w-4 h-4 md:w-5 md:h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-lg md:text-2xl font-semibold text-gray-900">5.6K</p>
                    <p className="text-xs md:text-sm text-gray-500">Membros Ativos</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                  <TabsTrigger value="grupos" className="text-xs md:text-sm">Grupos</TabsTrigger>
                  <TabsTrigger value="discussoes" className="text-xs md:text-sm">Discussões</TabsTrigger>
                  <TabsTrigger value="eventos" className="text-xs md:text-sm">Eventos</TabsTrigger>
                  <TabsTrigger value="perguntas" className="text-xs md:text-sm">Q&A</TabsTrigger>
                </TabsList>

                <TabsContent value="grupos">
                  <div className="space-y-4">
                    {/* Golden Retrievers Group */}
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                      <div className="aspect-video md:aspect-video relative">
                        <img
                          src="https://images.unsplash.com/photo-1612353413650-314b2f5146ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2dzJTIwZ3JvdXAlMjBtZWV0aW5nJTIwcGFya3xlbnwxfHx8fDE3NTg5MjQ3MjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                          alt="Golden Retrievers SP"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 left-3">
                          <Badge>Raças</Badge>
                        </div>
                        <div className="absolute top-3 right-3">
                          <Badge>Muito ativa</Badge>
                        </div>
                      </div>
                      
                      <CardContent className="p-3 md:p-4">
                        <h3 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">Golden Retrievers SP</h3>
                        <p className="text-xs md:text-sm text-gray-600 mb-3">Comunidade para tutores de Golden Retrievers em São Paulo</p>
                        
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs md:text-sm text-gray-500 mb-3 gap-2">
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3 md:w-4 md:h-4" />
                            <span>1,247 membros</span>
                          </div>
                          <span className="hidden sm:inline">Último post há 15 min</span>
                        </div>
                        
                        <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white text-xs md:text-sm">
                          Participar do Grupo
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Cat Apartment Group */}
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                      <div className="aspect-video relative">
                        <img
                          src="https://images.unsplash.com/photo-1752834368595-87001d44ed9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXQlMjBvd25lcnMlMjBjb21tdW5pdHklMjBtZWV0aW5nfGVufDF8fHx8MTc1ODkyNDcyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                          alt="Gatos de Apartamento"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 left-3">
                          <Badge>Habitat</Badge>
                        </div>
                        <div className="absolute top-3 right-3">
                          <Badge variant="secondary">Ativa</Badge>
                        </div>
                      </div>
                      
                      <CardContent className="p-3 md:p-4">
                        <h3 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">Gatos de Apartamento</h3>
                        <p className="text-xs md:text-sm text-gray-600 mb-3">Dicas e experiências para quem tem gatos em apartamentos</p>
                        
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs md:text-sm text-gray-500 mb-3 gap-2">
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3 md:w-4 md:h-4" />
                            <span>892 membros</span>
                          </div>
                          <span className="hidden sm:inline">Último post há 2 horas</span>
                        </div>
                        
                        <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white text-xs md:text-sm">
                          Participar do Grupo
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="discussoes">
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                      <h3 className="font-semibold text-gray-900 text-sm md:text-base">Discussões Recentes</h3>
                      <Button className="bg-purple-600 hover:bg-purple-700 text-white w-full sm:w-auto text-xs md:text-sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Nova Discussão
                      </Button>
                    </div>

                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-3 md:p-4">
                        <div className="flex items-start gap-3 md:gap-4">
                          <Avatar className="w-8 h-8 md:w-10 md:h-10">
                            <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" />
                            <AvatarFallback>CS</AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-2">
                              <h3 className="font-medium text-gray-900 text-sm md:text-base">Melhor ração para Golden Retriever filhote?</h3>
                              <Badge variant="secondary" className="text-xs">Alimentação</Badge>
                            </div>
                            
                            <div className="flex items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-500 mb-2">
                              <span>por Carlos Silva</span>
                              <span>há 10 min</span>
                            </div>
                            
                            <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <MessageSquare className="w-3 h-3 md:w-4 md:h-4" />
                                <span>23</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Eye className="w-3 h-3 md:w-4 md:h-4" />
                                <span>156</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <PawIcon className="w-3 h-3 md:w-4 md:h-4" />
                                <span>12</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="eventos">
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                      <h3 className="font-semibold text-gray-900 text-sm md:text-base">Próximos Eventos</h3>
                      <Button className="bg-purple-600 hover:bg-purple-700 text-white w-full sm:w-auto text-xs md:text-sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Criar Evento
                      </Button>
                    </div>

                    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                      <div className="aspect-video relative">
                        <img
                          src="https://images.unsplash.com/photo-1612353413650-314b2f5146ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2dzJTIwZ3JvdXAlMjBtZWV0aW5nJTIwcGFya3xlbnwxfHx8fDE3NTg5MjQ3MjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                          alt="Encontro Golden Retrievers"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-white/90 text-gray-800 backdrop-blur-sm">
                            24/30 participantes
                          </Badge>
                        </div>
                      </div>
                      
                      <CardContent className="p-3 md:p-4">
                        <h3 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">Encontro Golden Retrievers - Ibirapuera</h3>
                        <p className="text-xs md:text-sm text-gray-600 mb-3">Encontro mensal dos tutores de Golden Retrievers para socialização dos pets</p>
                        
                        <div className="space-y-2 text-xs md:text-sm text-gray-500 mb-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                            <span>05/01/2025 às 09:00</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3 h-3 md:w-4 md:h-4" />
                            <span className="truncate">Parque Ibirapuera - Portão 7</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-3 h-3 md:w-4 md:h-4" />
                            <span>Organizado por Marina Santos</span>
                          </div>
                        </div>
                        
                        <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white text-xs md:text-sm">
                          Participar do Evento
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="perguntas">
                  <div className="text-center py-12">
                    <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Sistema de Perguntas e Respostas</h3>
                    <p className="text-gray-600 mb-4">
                      Faça perguntas específicas e receba respostas da comunidade de especialistas.
                    </p>
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Fazer uma Pergunta
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Top Members */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-purple-600" />
                    Top Membros
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616c6031a83?w=100&h=100&fit=crop&crop=face" />
                          <AvatarFallback>MS</AvatarFallback>
                        </Avatar>
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                          <Trophy className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <p className="font-medium text-gray-900 truncate">Marina Santos</p>
                          <Star className="w-4 h-4 text-purple-600 fill-current" />
                        </div>
                        <p className="text-xs text-gray-500">Expert em Adestramento</p>
                        <p className="text-xs text-gray-400">1,248 pontos</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
                        <AvatarFallback>RL</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <p className="font-medium text-gray-900 truncate">Dr. Ricardo Lima</p>
                          <Star className="w-4 h-4 text-purple-600 fill-current" />
                        </div>
                        <p className="text-xs text-gray-500">Veterinário Certificado</p>
                        <p className="text-xs text-gray-400">956 pontos</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Suas Estatísticas</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Posts criados</span>
                      <span className="font-medium">23</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Grupos participando</span>
                      <span className="font-medium">8</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pontos totais</span>
                      <span className="font-medium">342</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ranking</span>
                      <span className="font-medium text-purple-600">#156</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-purple-600" />
                    Atividade Recente
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-gray-900">João curtiu seu post</p>
                      <p className="text-gray-500">há 15 min</p>
                    </div>
                    <div>
                      <p className="text-gray-900">Nova resposta em "Ração para filhotes"</p>
                      <p className="text-gray-500">há 1 hora</p>
                    </div>
                    <div>
                      <p className="text-gray-900">Novo membro em Golden Retrievers SP</p>
                      <p className="text-gray-500">há 2 horas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}