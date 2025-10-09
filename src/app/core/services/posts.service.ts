import { Injectable, computed, signal } from '@angular/core';
import { Post } from '../../models';
import { INITIAL_POSTS } from '../../data/posts.data';
import { STORAGE_KEYS, StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private readonly postsSignal = signal<Post[]>(this.loadFromStorage());

  readonly posts = computed(() => this.postsSignal());

  constructor(private readonly storageService: StorageService) {}

  addPost(post: Omit<Post, 'id' | 'timestamp' | 'likes' | 'comments' | 'shares' | 'liked'>): void {
    const newPost: Post = {
      ...post,
      id: Date.now().toString(),
      timestamp: new Date(),
      likes: 0,
      comments: 0,
      shares: 0,
      liked: false
    };

    this.postsSignal.update(posts => [newPost, ...posts]);
    this.persist();
  }

  toggleLike(postId: string): void {
    this.postsSignal.update(posts =>
      posts.map(post =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1
            }
          : post
      )
    );
    this.persist();
  }

  private persist(): void {
    this.storageService.set(STORAGE_KEYS.POSTS, this.postsSignal());
  }

  private loadFromStorage(): Post[] {
    const stored = this.storageService.get<Post[]>(STORAGE_KEYS.POSTS);
    if (!stored || !stored.length) {
      return INITIAL_POSTS;
    }

    return stored.map(post => ({
      ...post,
      timestamp: new Date(post.timestamp)
    }));
  }
}
