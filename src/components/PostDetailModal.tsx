import { useState, useEffect } from "react";
import {
  MoreHorizontal,
  MessageCircle,
  Share2,
  Send,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { VisuallyHidden } from "./ui/visually-hidden";
import { PawIcon } from "./PawIcon";
import { MediaCarousel } from "./MediaCarousel";
import { Post } from "../App";

interface Comment {
  id: string;
  author: {
    name: string;
    image: string;
    username: string;
  };
  text: string;
  timestamp: Date;
  likes: number;
  liked: boolean;
}

interface PostDetailModalProps {
  post: Post;
  isOpen: boolean;
  onClose: () => void;
  onLike?: (postId: string) => void;
}

export function PostDetailModal({
  post,
  isOpen,
  onClose,
  onLike,
}: PostDetailModalProps) {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: {
        name: "Ana Silva",
        image:
          "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=150&h=150&fit=crop&crop=face",
        username: "@ana.silva",
      },
      text: "Que fofo! 😍 Meu gato também adora essa posição para dormir!",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      likes: 5,
      liked: false,
    },
    {
      id: "2",
      author: {
        name: "Pedro Santos",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        username: "@pedro.santos",
      },
      text: "Gatinhos são muito fofos mesmo! ❤️",
      timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
      likes: 2,
      liked: true,
    },
    {
      id: "3",
      author: {
        name: "Carla Mendes",
        image:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
        username: "@carla.mendes",
      },
      text: "Adorei a foto! Qual câmera você usou?",
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      likes: 1,
      liked: false,
    },
    {
      id: "4",
      author: {
        name: "Marcos Costa",
        image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        username: "@marcos.costa",
      },
      text: "Pets são uma bênção em nossas vidas! 🐾",
      timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      likes: 3,
      liked: true,
    },
  ]);

  // Block body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60),
    );

    if (diffInMinutes < 1) return "agora";
    if (diffInMinutes < 60) return `há ${diffInMinutes}m`;
    if (diffInMinutes < 1440)
      return `há ${Math.floor(diffInMinutes / 60)}h`;
    return `há ${Math.floor(diffInMinutes / 1440)} dias`;
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: {
        name: "Você",
        image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        username: "@voce",
      },
      text: newComment,
      timestamp: new Date(),
      likes: 0,
      liked: false,
    };

    setComments((prev) => [...prev, comment]);
    setNewComment("");
  };

  const handleLikeComment = (commentId: string) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              liked: !comment.liked,
              likes: comment.liked
                ? comment.likes - 1
                : comment.likes + 1,
            }
          : comment,
      ),
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  const handleLikePost = () => {
    onLike?.(post.id);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="p-0 border-0 shadow-2xl overflow-hidden"
        style={{
          width: "80vw",
          maxHeight: "90vh",
          borderRadius: "12px",
        }}
        onKeyDown={handleKeyDown}
      >
        <VisuallyHidden>
          <DialogTitle>
            Post de {post.petName || post.author.name}
          </DialogTitle>
          <DialogDescription>
            Visualize o post completo com comentários e
            interações
          </DialogDescription>
        </VisuallyHidden>

        {/* Mobile Layout - Stacked */}
        <div className="flex flex-col lg:hidden h-full max-h-[90vh]">
          {/* Media Section - Mobile */}
          {post.images.length > 0 && (
            <div
              className="relative"
              style={{ maxHeight: "70vh" }}
            >
              <MediaCarousel
                images={post.images}
                onLike={handleLikePost}
                isLiked={post.liked}
                className="h-full"
              />
            </div>
          )}

          {/* Content Section - Mobile */}
          <div className="flex-1 flex flex-col bg-white min-h-0">
            {/* Post Header */}
            <div className="p-4 border-b flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={post.author.image} />
                  <AvatarFallback className="bg-purple-100 text-purple-600">
                    {post.author.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">
                      {post.petName || post.author.name}
                    </span>
                    {post.petName && (
                      <>
                        <span className="text-gray-500">–</span>
                        <span className="text-gray-500 text-sm">
                          {post.author.name}
                        </span>
                      </>
                    )}
                  </div>
                  <span className="text-sm text-gray-400">
                    {formatTimeAgo(post.timestamp)}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4 text-gray-400" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Post Content */}
            {post.text && (
              <div className="p-4 border-b flex-shrink-0">
                <p className="text-gray-800">{post.text}</p>
              </div>
            )}

            {/* Post Actions */}
            <div className="p-4 border-b flex-shrink-0">
              <div className="flex items-center gap-6">
                <button
                  className={`flex items-center gap-2 transition-all duration-200 ${
                    post.liked
                      ? "text-purple-600 scale-110"
                      : "text-gray-600 hover:text-purple-600 hover:scale-105"
                  }`}
                  onClick={handleLikePost}
                >
                  <PawIcon className="w-5 h-5" />
                  <span className="font-medium">
                    {post.likes}
                  </span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-medium">
                    {comments.length}
                  </span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
                  <Share2 className="w-5 h-5" />
                  <span className="font-medium">
                    {post.shares}
                  </span>
                </button>
              </div>
            </div>

            {/* Comments */}
            <div className="flex-1 overflow-y-auto min-h-0">
              <div className="p-4 space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <Avatar className="w-8 h-8 mt-1 flex-shrink-0">
                      <AvatarImage src={comment.author.image} />
                      <AvatarFallback className="bg-purple-100 text-purple-600 text-xs">
                        {comment.author.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="bg-gray-50 rounded-2xl px-3 py-2">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">
                            {comment.author.name}
                          </span>
                          <span className="text-xs text-gray-400">
                            {formatTimeAgo(comment.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-800 break-words">
                          {comment.text}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 mt-2 px-3">
                        <button
                          className={`text-xs transition-colors font-medium ${
                            comment.liked
                              ? "text-purple-600"
                              : "text-gray-500 hover:text-purple-600"
                          }`}
                          onClick={() =>
                            handleLikeComment(comment.id)
                          }
                        >
                          Curtir
                        </button>
                        {comment.likes > 0 && (
                          <span className="text-xs text-gray-400">
                            {comment.likes} curtida
                            {comment.likes !== 1 ? "s" : ""}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Comment */}
            <div className="p-4 border-t flex-shrink-0 bg-white">
              <div className="flex gap-3">
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" />
                  <AvatarFallback className="bg-purple-100 text-purple-600">
                    US
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 flex gap-2">
                  <Textarea
                    placeholder="Adicione um comentário..."
                    value={newComment}
                    onChange={(e) =>
                      setNewComment(e.target.value)
                    }
                    className="border-none resize-none focus:ring-0 p-2 text-sm bg-gray-50 rounded-2xl min-h-[40px] max-h-[120px]"
                    rows={1}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleAddComment();
                      }
                    }}
                  />
                  <Button
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-3 self-end"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Side by side */}
        <div className="hidden lg:flex h-[90vh]">
          {/* Left side - Media (55-60% width) */}
          <div
            className="flex-1 min-w-0"
            style={{ flexBasis: "58%" }}
          >
            {post.images.length > 0 && (
              <MediaCarousel
                images={post.images}
                onLike={handleLikePost}
                isLiked={post.liked}
                className="w-full h-full"
              />
            )}
          </div>

          {/* Right side - Post details (40-45% width) */}
          <div
            className="flex flex-col bg-white border-l border-gray-200"
            style={{ flexBasis: "42%", minWidth: "400px" }}
          >
            {/* Post Header */}
            <div className="p-4 border-b flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={post.author.image} />
                  <AvatarFallback className="bg-purple-100 text-purple-600">
                    {post.author.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">
                      {post.petName || post.author.name}
                    </span>
                    {post.petName && (
                      <>
                        <span className="text-gray-500">–</span>
                        <span className="text-gray-500 text-sm">
                          {post.author.name}
                        </span>
                      </>
                    )}
                  </div>
                  <span className="text-sm text-gray-400">
                    {formatTimeAgo(post.timestamp)}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4 text-gray-400" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Post Content */}
            {post.text && (
              <div className="p-4 border-b flex-shrink-0">
                <p className="text-gray-800">{post.text}</p>
              </div>
            )}

            {/* Post Actions */}
            <div className="p-4 border-b flex-shrink-0">
              <div className="flex items-center gap-6">
                <button
                  className={`flex items-center gap-2 transition-all duration-200 ${
                    post.liked
                      ? "text-purple-600 scale-110"
                      : "text-gray-600 hover:text-purple-600 hover:scale-105"
                  }`}
                  onClick={handleLikePost}
                >
                  <PawIcon className="w-5 h-5" />
                  <span className="font-medium">
                    {post.likes}
                  </span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-medium">
                    {comments.length}
                  </span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
                  <Share2 className="w-5 h-5" />
                  <span className="font-medium">
                    {post.shares}
                  </span>
                </button>
              </div>
            </div>

            {/* Comments */}
            <div className="flex-1 overflow-y-auto min-h-0">
              <div className="p-4 space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <Avatar className="w-8 h-8 mt-1 flex-shrink-0">
                      <AvatarImage src={comment.author.image} />
                      <AvatarFallback className="bg-purple-100 text-purple-600 text-xs">
                        {comment.author.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="bg-gray-50 rounded-2xl px-3 py-2">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">
                            {comment.author.name}
                          </span>
                          <span className="text-xs text-gray-400">
                            {formatTimeAgo(comment.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-800 break-words">
                          {comment.text}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 mt-2 px-3">
                        <button
                          className={`text-xs transition-colors font-medium ${
                            comment.liked
                              ? "text-purple-600"
                              : "text-gray-500 hover:text-purple-600"
                          }`}
                          onClick={() =>
                            handleLikeComment(comment.id)
                          }
                        >
                          Curtir
                        </button>
                        {comment.likes > 0 && (
                          <span className="text-xs text-gray-400">
                            {comment.likes} curtida
                            {comment.likes !== 1 ? "s" : ""}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Comment */}
            <div className="p-4 border-t flex-shrink-0 bg-white">
              <div className="flex gap-3">
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" />
                  <AvatarFallback className="bg-purple-100 text-purple-600">
                    US
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 flex gap-2">
                  <Textarea
                    placeholder="Adicione um comentário..."
                    value={newComment}
                    onChange={(e) =>
                      setNewComment(e.target.value)
                    }
                    className="border-none resize-none focus:ring-0 p-2 text-sm bg-gray-50 rounded-2xl min-h-[40px] max-h-[120px]"
                    rows={1}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleAddComment();
                      }
                    }}
                  />
                  <Button
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-3 self-end"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}