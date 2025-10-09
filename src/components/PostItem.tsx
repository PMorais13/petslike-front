import { useState } from 'react';
import { MoreHorizontal, MessageCircle, Share2 } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { PawIcon } from './PawIcon';
import { PostDetailModal } from './PostDetailModal';
import { Post } from '../App';

interface PostItemProps {
  post: Post;
  onLike?: (postId: string) => void;
}

export function PostItem({ post, onLike }: PostItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'agora';
    if (diffInMinutes < 60) return `há ${diffInMinutes}m`;
    if (diffInMinutes < 1440) return `há ${Math.floor(diffInMinutes / 60)}h`;
    return `há ${Math.floor(diffInMinutes / 1440)} dias`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
      {/* Post Header */}
      <div className="p-3 md:p-4 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 md:gap-3 cursor-pointer hover:bg-gray-50 -m-2 p-2 rounded-lg transition-colors"
          onClick={() => {
            // Se é o próprio usuário, vai para o perfil próprio
            if (post.author.username === '@voce') {
              window.location.hash = 'perfil';
            } else {
              // Se é outro usuário, vai para o perfil do usuário
              window.location.hash = 'perfil-usuario';
            }
          }}
        >
          <Avatar className="w-8 h-8 md:w-10 md:h-10">
            <AvatarImage src={post.author.image} />
            <AvatarFallback className="bg-purple-100 text-purple-600">
              {post.author.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-1 md:gap-2">
              <span className="font-medium text-gray-900 text-sm md:text-base hover:text-purple-600 transition-colors">
                {post.petName || post.author.name}
              </span>
              {post.petName && (
                <>
                  <span className="text-gray-500 hidden sm:inline">-</span>
                  <span className="text-gray-500 text-sm md:text-base hidden sm:inline hover:text-purple-600 transition-colors">
                    {post.author.name}
                  </span>
                </>
              )}
            </div>
            <span className="text-xs md:text-sm text-gray-400">
              {formatTimeAgo(post.timestamp)}
            </span>
          </div>
        </div>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="w-4 h-4 text-gray-400" />
        </Button>
      </div>

      {/* Post Content */}
      {post.text && (
        <div className="px-3 md:px-4 pb-2">
          <p className="text-gray-800 text-sm md:text-base">{post.text}</p>
        </div>
      )}

      {/* Post Images */}
      {post.images.length > 0 && (
        <div className="pb-3 md:pb-4">
          {post.images.length === 1 ? (
            <div className="relative w-full cursor-pointer hover:opacity-95 transition-opacity" onClick={() => setIsModalOpen(true)}>
              <img
                src={post.images[0]}
                alt="Post image"
                className="w-full h-auto object-contain max-h-[70vh] bg-gray-50"
                style={{
                  display: 'block',
                  maxHeight: '70vh',
                  minHeight: '200px'
                }}
                onLoad={(e) => {
                  const img = e.target as HTMLImageElement;
                  const aspectRatio = img.naturalWidth / img.naturalHeight;
                  
                  // Se a imagem for muito alta (vertical), limitar altura e centralizar
                  if (aspectRatio < 0.8) {
                    img.style.objectFit = 'cover';
                    img.style.height = '60vh';
                    img.style.objectPosition = 'center';
                  }
                  // Se for muito larga (paisagem), manter proporção natural
                  else if (aspectRatio > 1.5) {
                    img.style.objectFit = 'contain';
                    img.style.maxHeight = '50vh';
                  }
                  // Para proporções intermediárias, usar contain para mostrar a imagem inteira
                  else {
                    img.style.objectFit = 'contain';
                    img.style.maxHeight = '60vh';
                  }
                }}
              />
            </div>
          ) : (
            <div className="px-3 md:px-4">
              <div className={`grid gap-2 rounded-lg overflow-hidden ${
                post.images.length === 2 ? 'grid-cols-2' : 
                post.images.length === 3 ? 'grid-cols-2' : 'grid-cols-2'
              }`}>
                {post.images.map((image, index) => (
                  <div key={index} className="relative overflow-hidden rounded-lg bg-gray-50">
                    <img
                      src={image}
                      alt={`Post image ${index + 1}`}
                      className={`w-full object-cover cursor-pointer hover:opacity-95 transition-opacity ${
                        post.images.length === 3 && index === 0 ? 'h-64' : 'h-32'
                      }`}
                      onClick={() => setIsModalOpen(true)}
                      style={{
                        objectPosition: 'center'
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Post Actions */}
      <div className="px-3 md:px-4 pb-3 md:pb-4 flex items-center justify-between">
        <div className="flex items-center gap-4 md:gap-6">
          <button 
            className={`flex items-center gap-1 md:gap-2 transition-colors ${
              post.liked ? 'text-purple-600' : 'text-gray-600 hover:text-purple-600'
            }`}
            onClick={() => onLike?.(post.id)}
          >
            <PawIcon className="w-4 h-4 md:w-5 md:h-5" />
            <span className="text-xs md:text-sm">{post.likes}</span>
          </button>
          <button className="flex items-center gap-1 md:gap-2 text-gray-600 hover:text-purple-600 transition-colors">
            <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
            <span className="text-xs md:text-sm">{post.comments}</span>
          </button>
          <button className="flex items-center gap-1 md:gap-2 text-gray-600 hover:text-purple-600 transition-colors">
            <Share2 className="w-4 h-4 md:w-5 md:h-5" />
            <span className="text-xs md:text-sm">{post.shares}</span>
          </button>
        </div>
      </div>
      
      <PostDetailModal
        post={post}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLike={onLike}
      />
    </div>
  );
}