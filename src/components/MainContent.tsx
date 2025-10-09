import { Plus, Filter, Camera, Image as ImageIcon, MapPin, X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { PlaceStories } from './PlaceStories';
import { PostItem } from './PostItem';
import { useState } from 'react';
import { Post } from '../App';

interface MainContentProps {
  posts: Post[];
  onAddPost: (post: Omit<Post, 'id' | 'timestamp' | 'likes' | 'comments' | 'shares' | 'liked'>) => void;
  onLikePost: (postId: string) => void;
}

export function MainContent({ posts, onAddPost, onLikePost }: MainContentProps) {
  const [postText, setPostText] = useState('');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState<string>('');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setSelectedImages(prev => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handlePost = () => {
    const selectedPetData = userPets.find(pet => pet.id === selectedPet);
    
    onAddPost({
      text: postText,
      images: selectedImages,
      petId: selectedPet || undefined,
      petName: selectedPetData?.name,
      petType: selectedPetData?.type,
      petImage: selectedPetData?.image,
      author: {
        name: 'Você',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        username: '@voce'
      }
    });
    
    setPostText('');
    setSelectedImages([]);
    setSelectedPet('');
    setIsPostDialogOpen(false);
  };

  // Mock data dos pets salvos pelo usuário
  const userPets = [
    { id: '1', name: 'Buddy', type: 'Cão', image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=150&h=150&fit=crop' },
    { id: '2', name: 'Mimi', type: 'Gato', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=150&h=150&fit=crop' },
    { id: '3', name: 'Rex', type: 'Cão', image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=150&h=150&fit=crop' },
    { id: '4', name: 'Luna', type: 'Gato', image: 'https://images.unsplash.com/photo-1472491235688-bdc81a63246e?w=150&h=150&fit=crop' }
  ];
  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 md:px-6 py-4">
        <Dialog open={isPostDialogOpen} onOpenChange={setIsPostDialogOpen}>
          <div className="flex items-center gap-3 md:gap-4">
            <Plus className="w-5 h-5 text-purple-600 hidden sm:block" />
            <DialogTrigger asChild>
              <div className="flex-1 relative cursor-pointer">
                <input
                  type="text"
                  placeholder="Compartilhe algo..."
                  className="w-full px-4 py-2 md:py-3 bg-gray-100 rounded-full text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm md:text-base cursor-pointer"
                  readOnly
                />
              </div>
            </DialogTrigger>
            <DialogTrigger asChild>
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
                <Plus className="w-4 h-4 text-gray-500" />
              </div>
            </DialogTrigger>
          </div>
          
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Criar publicação</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              {/* User info */}
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" />
                  <AvatarFallback>US</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900">Você</p>
                  <p className="text-sm text-gray-500">Público</p>
                </div>
              </div>
              
              {/* Pet selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Postando sobre qual pet?</label>
                <Select value={selectedPet} onValueChange={setSelectedPet}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione um pet (opcional)" />
                  </SelectTrigger>
                  <SelectContent>
                    {userPets.map((pet) => (
                      <SelectItem key={pet.id} value={pet.id}>
                        <div className="flex items-center gap-2">
                          <img 
                            src={pet.image} 
                            alt={pet.name}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <span>{pet.name} - {pet.type}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Text area */}
              <Textarea
                placeholder="O que você está pensando?"
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                className="border-none resize-none focus:ring-0 p-0 text-lg placeholder:text-gray-400"
                rows={3}
              />
              
              {/* Selected images */}
              {selectedImages.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {selectedImages.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Selected ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 w-6 h-6 bg-black bg-opacity-60 rounded-full flex items-center justify-center text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Action buttons */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <div className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                      <ImageIcon className="w-5 h-5 text-purple-600" />
                    </div>
                  </label>
                  <div className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer">
                    <Camera className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer">
                    <MapPin className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
                
                <Button
                  onClick={handlePost}
                  disabled={!postText.trim() && selectedImages.length === 0}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6"
                >
                  Publicar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filter */}
      <div className="px-4 md:px-6 py-4 bg-white">
        <div className="flex items-center gap-2 overflow-x-auto">
          <Filter className="w-4 h-4 text-purple-600" />
          <span className="text-gray-700 text-sm md:text-base whitespace-nowrap">Filtrar por espécie:</span>
          <Select defaultValue="todos">
            <SelectTrigger className="w-28 md:w-32 border-none bg-transparent shadow-none text-sm md:text-base">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="cao">Cão</SelectItem>
              <SelectItem value="gato">Gato</SelectItem>
              <SelectItem value="passaro">Pássaro</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 md:px-6 py-4 md:py-6">
        {/* Place Stories */}
        <PlaceStories />
        
        {/* Posts Feed */}
        <div className="space-y-4">
          {/* User posts first */}
          {posts.map(post => (
            <PostItem key={post.id} post={post} onLike={onLikePost} />
          ))}
          
          {/* Default posts - always show for variety */}
          <PostItem 
            post={{
              id: 'default-1',
              text: 'Aaaa',
              images: ['https://images.unsplash.com/photo-1648170723309-46a266549e73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicm93biUyMHRhYmJ5JTIwY2F0JTIwY2xvc2UlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTg5MjI0MzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'],
              petName: 'Miau',
              petType: 'Gato',
              author: {
                name: 'Jackeline Luana',
                image: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=150&h=150&fit=crop&crop=face',
                username: '@jackeline'
              },
              timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
              likes: 42,
              comments: 8,
              shares: 3,
              liked: false
            }}
            onLike={onLikePost}
          />

          <PostItem 
            post={{
              id: 'default-2',
              text: 'Que dia incrível no parque! O Max estava tão animado brincando com outros cãozinhos 🐕💙 Nada melhor que ver nossos peludos felizes!',
              images: ['https://images.unsplash.com/photo-1596653048850-7918adea48b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGRvZyUyMHBsYXlpbmclMjBwYXJrfGVufDF8fHx8MTc1ODg5MjMzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'],
              petName: 'Max',
              petType: 'Cão',
              author: {
                name: 'Carlos Mendes',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
                username: '@carlosm'
              },
              timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
              likes: 89,
              comments: 15,
              shares: 7,
              liked: true
            }}
            onLike={onLikePost}
          />

          <PostItem 
            post={{
              id: 'default-3',
              text: 'Minha pequena princesa dormindo depois de um dia cheio de travessuras 😴💕 Como não amar essa carinha?',
              images: ['https://images.unsplash.com/photo-1609331894992-38c5990e553b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwa2l0dGVuJTIwc2xlZXBpbmd8ZW58MXx8fHwxNzU4OTI5Mjg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'],
              petName: 'Nina',
              petType: 'Gato',
              author: {
                name: 'Marina Santos',
                image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
                username: '@marina'
              },
              timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
              likes: 156,
              comments: 23,
              shares: 12,
              liked: false
            }}
            onLike={onLikePost}
          />

          <PostItem 
            post={{
              id: 'default-4',
              text: 'Sessão de treino hoje! O Thor já consegue dar a patinha, sentar e deitar. Próximo desafio: rolou! 🐕‍🦺✨ #treinamentopositivo',
              images: ['https://images.unsplash.com/photo-1591946614720-90a587da4a36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2clMjB0cmFpbmluZyUyMHRyaWNrc3xlbnwxfHx8fDE3NTg5MjkyOTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'],
              petName: 'Thor',
              petType: 'Cão',
              author: {
                name: 'Pedro Silva',
                image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
                username: '@pedros'
              },
              timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
              likes: 67,
              comments: 19,
              shares: 4,
              liked: false
            }}
            onLike={onLikePost}
          />

          <PostItem 
            post={{
              id: 'default-5',
              text: 'Apresento a vocês o Kiwi! Meu novo companheiro que enche a casa de cores e alegria 🌈🦜 Ainda está se adaptando, mas já fala "oi" perfeitamente!',
              images: ['https://images.unsplash.com/photo-1700048802079-ec47d07f7919?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMHBhcnJvdCUyMGJpcmR8ZW58MXx8fHwxNzU4ODM5NjgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'],
              petName: 'Kiwi',
              petType: 'Pássaro',
              author: {
                name: 'Ana Carolina',
                image: 'https://images.unsplash.com/photo-1485893086445-ed75865251e0?w=150&h=150&fit=crop&crop=face',
                username: '@ana_carol'
              },
              timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
              likes: 134,
              comments: 31,
              shares: 8,
              liked: true
            }}
            onLike={onLikePost}
          />

          <PostItem 
            post={{
              id: 'default-6',
              text: 'Dia de spa para a Bella! Ela sempre fica linda depois da tosa, mas hoje ficou ainda mais princesa 💅✂️ #petgrooming #cuidados',
              images: ['https://images.unsplash.com/photo-1725419876939-f8f9987cf0d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjBncm9vbWluZyUyMHNhbG9ufGVufDF8fHx8MTc1ODg3NjY4M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'],
              petName: 'Bella',
              petType: 'Cão',
              author: {
                name: 'Fernanda Costa',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
                username: '@fernanda'
              },
              timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000), // 18 hours ago
              likes: 98,
              comments: 12,
              shares: 5,
              liked: false
            }}
            onLike={onLikePost}
          />

          <PostItem 
            post={{
              id: 'default-7',
              text: 'Check-up de rotina da Luna hoje! A veterinária disse que ela está perfeitamente saudável 🩺💚 Prevenção é sempre o melhor cuidado.',
              images: ['https://images.unsplash.com/photo-1733783489145-f3d3ee7a9ccf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXQlMjBleGFtaW5hdGlvbiUyMHBldHxlbnwxfHx8fDE3NTg5MjkzMDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'],
              petName: 'Luna',
              petType: 'Gato',
              author: {
                name: 'Roberto Alves',
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
                username: '@roberto'
              },
              timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
              likes: 76,
              comments: 9,
              shares: 3,
              liked: true
            }}
            onLike={onLikePost}
          />

          <PostItem 
            post={{
              id: 'default-8',
              text: 'Novo membro da família! O Pipoca chegou hoje e já conquistou todos nós 🐰💛 Quem disse que coelhos não são carinhosos?',
              images: ['https://images.unsplash.com/photo-1599777850235-3e8f4f0ac3ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFsbCUyMHJhYmJpdCUyMGJ1bm55fGVufDF8fHx8MTc1ODkyOTMwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'],
              petName: 'Pipoca',
              petType: 'Coelho',
              author: {
                name: 'Juliana Rocha',
                image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
                username: '@ju_rocha'
              },
              timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
              likes: 203,
              comments: 45,
              shares: 15,
              liked: false
            }}
            onLike={onLikePost}
          />

          <PostItem 
            post={{
              id: 'default-9',
              text: 'Alguém mais tem um gato que sempre escolhe a caixa de papelão ao invés dos brinquedos caros? 😂📦 O Félix é especialista nisso!',
              images: [],
              petName: 'Félix',
              petType: 'Gato',
              author: {
                name: 'Lucas Ferreira',
                image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
                username: '@lucasf'
              },
              timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
              likes: 245,
              comments: 67,
              shares: 18,
              liked: true
            }}
            onLike={onLikePost}
          />
        </div>
      </div>
    </div>
  );
}