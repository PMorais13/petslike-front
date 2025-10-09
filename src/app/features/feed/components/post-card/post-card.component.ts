import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { Post } from '../../../../models';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule, DatePipe, LucideAngularModule],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss'
})
export class PostCardComponent {
  @Input({ required: true }) post!: Post;
  @Output() like = new EventEmitter<string>();

  handleLike(): void {
    this.like.emit(this.post.id);
  }
}
