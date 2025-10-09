import { MapPin, Calendar, Users, Heart, MessageCircle, Share2, MoreHorizontal, Settings, Edit3, Award } from 'lucide-react';
import { PawIcon } from './PawIcon';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

export function ProfilePage() {
  const userPosts = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1687211818108-667d028f1ae4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjByZXRyaWV2ZXIlMjBkb2d8ZW58MXx8fHwxNzU4ODg3NDE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      text: "Meu bebê brincando no parque hoje! 🐕",
      time: "há 2 horas",
      likes: 24,
      comments: 8
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1660983947114-d893fcf89c7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzaWFuJTIwY2F0fGVufDF8fHx8MTc1ODkyMjYwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      text: "Luna dormindo na sua posição favorita ❤️",
      time: "há 5 dias",
      likes: 156,
      comments: 23
    }
  ];

  const pets = [
    {
      name: "Rex",
      type: "Golden Retriever",
      age: "3 anos",
      image: "https://images.unsplash.com/photo-1687211818108-667d028f1ae4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjByZXRyaWV2ZXIlMjBkb2d8ZW58MXx8fHwxNzU4ODg3NDE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      name: "Luna",
      type: "Gato Persa",
      age: "2 anos",
      image: "https://images.unsplash.com/photo-1660983947114-d893fcf89c7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzaWFuJTIwY2F0fGVufDF8fHx8MTc1ODkyMjYwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  return (
    <div className="flex-1 bg-gray-50">
      {/* Cover and Profile Header */}
      <div className="bg-white">
        {/* Cover Photo */}
        <div className="h-48 bg-gradient-to-r from-purple-400 to-purple-600 relative">
          <Button 
            variant="outline" 
            size="sm" 
            className="absolute top-4 right-4 bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <Edit3 className="w-4 h-4 mr-2" />
            Editar Capa
          </Button>
        </div>

        {/* Profile Info */}
        <div className="px-6 pb-6">
          <div className="flex items-end justify-between -mt-16">
            <div className="flex items-end gap-4">
              <Avatar className="w-32 h-32 border-4 border-white">
                <AvatarImage src="https://images.unsplash.com/photo-1704070225934-b3fd5e8f1a17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBldCUyMG93bmVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU4OTIyNTk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" />
                <AvatarFallback className="w-32 h-32 bg-purple-100 text-purple-600 text-3xl">JL</AvatarFallback>
              </Avatar>
              <div className="pb-4">
                <h1 className="text-2xl font-semibold text-gray-900">Jackeline Luana</h1>
                <p className="text-gray-600">Amante de animais e veterinária</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    São Paulo, SP
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Membro desde 2023
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 pb-4">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Configurações
              </Button>
              <Button size="sm">
                <Edit3 className="w-4 h-4 mr-2" />
                Editar Perfil
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-6 pt-6 border-t border-gray-200">
            <div className="text-center">
              <div className="text-xl font-semibold text-gray-900">127</div>
              <div className="text-sm text-gray-500">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-semibold text-gray-900">2.4k</div>
              <div className="text-sm text-gray-500">Seguidores</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-semibold text-gray-900">892</div>
              <div className="text-sm text-gray-500">Seguindo</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-semibold text-gray-900">2</div>
              <div className="text-sm text-gray-500">Pets</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="px-6 py-6">
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="pets">Meus Pets</TabsTrigger>
            <TabsTrigger value="about">Sobre</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-6 mt-6">
            {userPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <CardContent className="p-0">
                  {/* Post Header */}
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src="https://images.unsplash.com/photo-1704070225934-b3fd5e8f1a17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBldCUyMG93bmVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU4OTIyNTk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" />
                        <AvatarFallback className="bg-purple-100 text-purple-600">JL</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-gray-900">Jackeline Luana</div>
                        <div className="text-sm text-gray-400">{post.time}</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4 text-gray-400" />
                    </Button>
                  </div>

                  {/* Post Content */}
                  <div className="px-4 pb-2">
                    <p className="text-gray-800">{post.text}</p>
                  </div>

                  {/* Post Image */}
                  <img
                    src={post.image}
                    alt="Post"
                    className="w-full object-cover"
                    style={{ aspectRatio: '16/10' }}
                  />

                  {/* Post Actions */}
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
                        <PawIcon className="w-5 h-5" />
                        <span className="text-sm">{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-sm">{post.comments}</span>
                      </button>
                    </div>
                    <button className="text-gray-600 hover:text-purple-600 transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="pets" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pets.map((pet, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <img
                      src={pet.image}
                      alt={pet.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900">{pet.name}</h3>
                      <p className="text-sm text-gray-600">{pet.type}</p>
                      <p className="text-sm text-gray-500 mt-1">{pet.age}</p>
                      <div className="flex gap-2 mt-3">
                        <Badge variant="secondary" className="text-xs">Castrado</Badge>
                        <Badge variant="secondary" className="text-xs">Vacinado</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {/* Add Pet Card */}
              <Card className="border-2 border-dashed border-gray-300 hover:border-purple-400 transition-colors cursor-pointer">
                <CardContent className="p-6 flex flex-col items-center justify-center h-48 text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                    <Heart className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">Adicionar Pet</h3>
                  <p className="text-sm text-gray-500">Cadastre mais um membro da família</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="about" className="space-y-6 mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Sobre mim</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Veterinária formada há 8 anos, apaixonada por cuidar dos nossos amigos de quatro patas. 
                  Especialista em medicina felina e defensora da adoção responsável.
                </p>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-gray-900">Especialidades:</span>
                    <span className="text-gray-600 ml-2">Medicina Felina, Cirurgia Geral, Dermatologia</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Localização:</span>
                    <span className="text-gray-600 ml-2">São Paulo, SP</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Clínica:</span>
                    <span className="text-gray-600 ml-2">PetCare Veterinária</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Horário:</span>
                    <span className="text-gray-600 ml-2">Segunda a Sexta, 8h às 18h</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Conquistas</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div className="font-medium text-gray-900">Pet Lover</div>
                    <div className="text-sm text-gray-500">100+ posts</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div className="font-medium text-gray-900">Comunidade</div>
                    <div className="text-sm text-gray-500">1k+ seguidores</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div className="font-medium text-gray-900">Especialista</div>
                    <div className="text-sm text-gray-500">Veterinária</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div className="font-medium text-gray-900">Veterano</div>
                    <div className="text-sm text-gray-500">2+ anos</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}