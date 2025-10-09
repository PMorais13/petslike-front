import { MapPin, Calendar, Users, MessageCircle, Share2, MoreHorizontal, UserPlus, ArrowLeft, Star, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { PawIcon } from './PawIcon';

export function UserProfilePage() {
  const userData = {
    tutor: {
      name: "Marina Santos",
      username: "@marinasantos",
      bio: "Veterinária apaixonada por animais 🐾 Mãe de pets e defensora da adoção responsável",
      location: "São Paulo, SP",
      joinDate: "Março 2023",
      followers: 1250,
      following: 380,
      isVerified: true,
      avatar: "https://images.unsplash.com/photo-1601758003122-53c40e686a19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHdpdGglMjBwZXRzJTIwaGFwcHl8ZW58MXx8fHwxNzU4OTIzNzQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    pets: [
      {
        id: 1,
        name: "Zeus",
        species: "Cão",
        breed: "Golden Retriever",
        age: "3 anos",
        gender: "Macho",
        image: "https://images.unsplash.com/photo-1734966213753-1b361564bab4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjByZXRyaWV2ZXIlMjBkb2clMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTg4NTQxMDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        personality: ["Carinhoso", "Energético", "Brincalhão"]
      },
      {
        id: 2,
        name: "Luna",
        species: "Gato",
        breed: "Persa",
        age: "2 anos",
        gender: "Fêmea",
        image: "https://images.unsplash.com/photo-1735618603118-89e26b0dcf6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzaWFuJTIwY2F0JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU4ODU3Mzc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        personality: ["Independente", "Carinhosa", "Tranquila"]
      }
    ]
  };

  const posts = [
    {
      id: 1,
      content: "Zeus está adorando as aulas de adestramento! 🎾 Cada dia mais obediente e carinhoso. A socialização faz toda diferença no comportamento dos nossos peludos.",
      image: "https://images.unsplash.com/photo-1734966213753-1b361564bab4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjByZXRyaWV2ZXIlMjBkb2clMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTg4NTQxMDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      likes: 89,
      comments: 12,
      shares: 3,
      timeAgo: "2 dias",
      petName: "Zeus"
    },
    {
      id: 2,
      content: "Luna descobriu que adora observar os passarinhos da janela. Ficamos horas assim, ela hipnotizada e eu apaixonada por essa fofura! 😻",
      image: "https://images.unsplash.com/photo-1735618603118-89e26b0dcf6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzaWFuJTIwY2F0JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU4ODU3Mzc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      likes: 156,
      comments: 24,
      shares: 7,
      timeAgo: "5 dias",
      petName: "Luna"
    },
    {
      id: 3,
      content: "Dica de veterinária: A escovação regular não só mantém o pelo bonito, mas também fortalece o vínculo com seu pet. Zeus e Luna adoram esse momento especial! ✨",
      image: null,
      likes: 203,
      comments: 31,
      shares: 15,
      timeAgo: "1 semana",
      petName: null
    }
  ];

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header com botão voltar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
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
            <h1 className="text-xl font-semibold text-gray-900">{userData.tutor.name}</h1>
            <p className="text-sm text-gray-500">{userData.tutor.username}</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-start gap-6">
              <Avatar className="w-24 h-24 border-4 border-purple-100">
                <AvatarImage src={userData.tutor.avatar} alt={userData.tutor.name} />
                <AvatarFallback className="bg-purple-100 text-purple-600 text-xl">
                  {userData.tutor.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-semibold text-gray-900">{userData.tutor.name}</h1>
                  {userData.tutor.isVerified && (
                    <div className="flex items-center gap-1">
                      <Shield className="w-5 h-5 text-purple-600" />
                      <span className="text-sm text-purple-600">Verificado</span>
                    </div>
                  )}
                </div>
                
                <p className="text-gray-600 mb-3">{userData.tutor.bio}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{userData.tutor.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Ingressou em {userData.tutor.joinDate}</span>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-sm mb-4">
                  <div>
                    <span className="font-semibold text-gray-900">{userData.tutor.following}</span>
                    <span className="text-gray-500 ml-1">seguindo</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">{userData.tutor.followers}</span>
                    <span className="text-gray-500 ml-1">seguidores</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Amigar
                  </Button>
                  <Button variant="outline" className="text-purple-600 border-purple-200 hover:bg-purple-50">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Mensagem
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Pet Cards */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Pets de {userData.tutor.name.split(' ')[0]}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userData.pets.map((pet) => (
                <Card key={pet.id} className="overflow-hidden">
                  <div className="aspect-square relative">
                    <img
                      src={pet.image}
                      alt={pet.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-white/90 text-gray-800 backdrop-blur-sm">
                        {pet.species}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{pet.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">4.9</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{pet.breed} • {pet.age} • {pet.gender}</p>
                    <div className="flex flex-wrap gap-1">
                      {pet.personality.map((trait, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {trait}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="posts" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="posts">Publicações</TabsTrigger>
              <TabsTrigger value="pets">Galeria dos Pets</TabsTrigger>
              <TabsTrigger value="sobre">Sobre</TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="space-y-6">
              {posts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  {/* Post Header */}
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={userData.tutor.avatar} alt={userData.tutor.name} />
                        <AvatarFallback className="bg-purple-100 text-purple-600">
                          {userData.tutor.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">{post.petName || userData.tutor.name}</span>
                          {post.petName && (
                            <>
                              <span className="text-gray-500">-</span>
                              <span className="text-gray-500">{userData.tutor.name}</span>
                            </>
                          )}
                        </div>
                        <span className="text-sm text-gray-400">há {post.timeAgo}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4 text-gray-400" />
                    </Button>
                  </div>

                  {/* Post Content */}
                  <div className="px-4 pb-2">
                    <p className="text-gray-800">{post.content}</p>
                  </div>

                  {/* Post Image */}
                  {post.image && (
                    <div className="px-4 pb-4">
                      <img
                        src={post.image}
                        alt="Post"
                        className="w-full rounded-lg object-cover"
                        style={{ aspectRatio: '16/10' }}
                      />
                    </div>
                  )}

                  {/* Post Actions */}
                  <div className="px-4 pb-4 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <button className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
                        <PawIcon className="w-5 h-5" />
                        <span className="text-sm">{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-sm">{post.comments}</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
                        <Share2 className="w-5 h-5" />
                        <span className="text-sm">{post.shares}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="pets">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {userData.pets.map((pet) => (
                  <div key={pet.id} className="aspect-square rounded-lg overflow-hidden">
                    <img
                      src={pet.image}
                      alt={pet.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="sobre">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Sobre {userData.tutor.name}</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Profissão</h4>
                    <p className="text-gray-600">Médica Veterinária especializada em comportamento animal</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Experiência com Pets</h4>
                    <p className="text-gray-600">Mais de 8 anos cuidando de animais domésticos. Defensora da adoção responsável e bem-estar animal.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Interesses</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Adestramento</Badge>
                      <Badge variant="secondary">Nutrição Animal</Badge>
                      <Badge variant="secondary">Comportamento</Badge>
                      <Badge variant="secondary">Adoção</Badge>
                      <Badge variant="secondary">Bem-estar Animal</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}