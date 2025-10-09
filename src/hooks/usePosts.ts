// ============================================
// HOOK DE GERENCIAMENTO DE POSTS
// ============================================

import { useState } from 'react';
import { Post } from '../types';

interface UsePostsReturn {
  posts: Post[];
  addPost: (newPost: Omit<Post, 'id' | 'timestamp' | 'likes' | 'comments' | 'shares' | 'liked'>) => void;
  handleLikePost: (postId: string) => void;
  deletePost: (postId: string) => void;
  updatePost: (postId: string, updates: Partial<Post>) => void;
}

export const usePosts = (): UsePostsReturn => {
  const [posts, setPosts] = useState<Post[]>([]);

  // ========== ADICIONAR POST ==========
  const addPost = (newPost: Omit<Post, 'id' | 'timestamp' | 'likes' | 'comments' | 'shares' | 'liked'>) => {
    const post: Post = {
      ...newPost,
      id: Date.now().toString(),
      timestamp: new Date(),
      likes: 0,
      comments: 0,
      shares: 0,
      liked: false,
    };
    setPosts(prev => [post, ...prev]);
  };

  // ========== CURTIR/DESCURTIR POST ==========
  const handleLikePost = (postId: string) => {
    setPosts(prev => 
      prev.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1
            }
          : post
      )
    );
  };

  // ========== DELETAR POST ==========
  const deletePost = (postId: string) => {
    setPosts(prev => prev.filter(post => post.id !== postId));
  };

  // ========== ATUALIZAR POST ==========
  const updatePost = (postId: string, updates: Partial<Post>) => {
    setPosts(prev =>
      prev.map(post =>
        post.id === postId ? { ...post, ...updates } : post
      )
    );
  };

  return {
    posts,
    addPost,
    handleLikePost,
    deletePost,
    updatePost,
  };
};
