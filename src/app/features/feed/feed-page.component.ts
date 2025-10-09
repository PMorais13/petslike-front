import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PostsService } from '../../core/services/posts.service';
import { AuthService } from '../../core/services/auth.service';
import { PLACES } from '../../data/places.data';
import { Post } from '../../models';
import { FeedComposerComponent } from './components/feed-composer/feed-composer.component';
import { PlaceStoriesComponent } from './components/place-stories/place-stories.component';
import { PostCardComponent } from './components/post-card/post-card.component';

@Component({
  selector: 'app-feed-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FeedComposerComponent, PlaceStoriesComponent, PostCardComponent],
  templateUrl: './feed-page.component.html',
  styleUrl: './feed-page.component.scss'
})
export class FeedPageComponent {
  private readonly postsService = inject(PostsService);
  private readonly authService = inject(AuthService);

  readonly user = computed(() => this.authService.user());
  readonly posts = computed(() => this.postsService.posts());
  readonly places = PLACES;

  trackByPostId = (_: number, post: Post) => post.id;

  handleCreatePost = (post: Parameters<PostsService['addPost']>[0]) => {
    this.postsService.addPost(post);
  };

  handleLikePost = (postId: string) => {
    this.postsService.toggleLike(postId);
  };
}
