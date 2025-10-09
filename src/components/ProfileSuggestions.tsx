import { UserPlus, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

const suggestedProfiles = [
  {
    id: 1,
    tutorName: "João Oliveira",
    username: "@joao_pets",
    bio: "Adestrador profissional",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    petName: "Rex",
    petBreed: "Pastor Alemão",
    petImage: "https://images.unsplash.com/photo-1734966213753-1b361564bab4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjByZXRyaWV2ZXIlMjBkb2clMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTg4NTQxMDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    followersCount: 892,
    isVerified: true,
    mutualFriends: 3
  },
  {
    id: 2,
    tutorName: "Carla Santos",
    username: "@carla_felinos",
    bio: "Criadora de persas",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616c6031a83?w=100&h=100&fit=crop&crop=face",
    petName: "Mimi",
    petBreed: "Persa",
    petImage: "https://images.unsplash.com/photo-1735618603118-89e26b0dcf6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzaWFuJTIwY2F0JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU4ODU3Mzc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    followersCount: 1243,
    isVerified: false,
    mutualFriends: 7
  },
  {
    id: 3,
    tutorName: "Ricardo Lima",
    username: "@rick_dogs",
    bio: "Veterinário comportamental",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    petName: "Bolt",
    petBreed: "Border Collie",
    petImage: "https://images.unsplash.com/photo-1734921696542-7f7c9e831edb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJrJTIwZG9ncyUyMHBsYXlpbmclMjBvdXRkb29yfGVufDF8fHx8MTc1ODkyNDE1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    followersCount: 2156,
    isVerified: true,
    mutualFriends: 12
  }
];

export function ProfileSuggestions() {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-900">Sugestões para Você</h2>
        <Button variant="ghost" size="sm" className="text-purple-600 hover:bg-purple-50">
          Ver todas
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {suggestedProfiles.map((profile) => (
          <Card key={profile.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              {/* Pet Image */}
              <div className="aspect-square rounded-lg overflow-hidden mb-3">
                <img
                  src={profile.petImage}
                  alt={profile.petName}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Profile Info */}
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={profile.avatar} alt={profile.tutorName} />
                  <AvatarFallback className="bg-purple-100 text-purple-600">
                    {profile.tutorName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <h3 className="font-medium text-gray-900 truncate">{profile.tutorName}</h3>
                    {profile.isVerified && (
                      <Star className="w-4 h-4 text-purple-600 fill-current" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500 truncate">{profile.username}</p>
                </div>
              </div>
              
              {/* Pet Info */}
              <div className="mb-3">
                <p className="font-medium text-gray-900">{profile.petName}</p>
                <p className="text-sm text-gray-500">{profile.petBreed}</p>
              </div>
              
              {/* Bio */}
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{profile.bio}</p>
              
              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                <span>{profile.followersCount.toLocaleString()} seguidores</span>
                <span>{profile.mutualFriends} amigos em comum</span>
              </div>
              
              {/* Actions */}
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={() => window.location.hash = 'perfil-usuario'}
                >
                  <UserPlus className="w-4 h-4 mr-1" />
                  Amigar
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-purple-600 border-purple-200 hover:bg-purple-50"
                  onClick={() => window.location.hash = 'perfil-usuario'}
                >
                  Ver Perfil
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}