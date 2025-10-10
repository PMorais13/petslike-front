import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { Post } from '../../../../models';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss'
})
export class PostCardComponent {
  @Input({ required: true }) post!: Post;
  @Output() like = new EventEmitter<string>();

  handleLike(): void {
    this.like.emit(this.post.id);
  }

  getRelativeTime(date: Date): string {
    const now = new Date();
    const diffInSeconds = Math.round((date.getTime() - now.getTime()) / 1000);

    const units: { limit: number; divisor: number; unit: Intl.RelativeTimeFormatUnit }[] = [
      { limit: 60, divisor: 1, unit: 'second' },
      { limit: 3600, divisor: 60, unit: 'minute' },
      { limit: 86400, divisor: 3600, unit: 'hour' },
      { limit: 604800, divisor: 86400, unit: 'day' },
      { limit: 2592000, divisor: 604800, unit: 'week' },
      { limit: 31536000, divisor: 2592000, unit: 'month' },
      { limit: Infinity, divisor: 31536000, unit: 'year' }
    ];

    const rtf = new Intl.RelativeTimeFormat('pt-BR', { numeric: 'auto' });
    const diffInSecondsAbs = Math.abs(diffInSeconds);

    for (const { limit, divisor, unit } of units) {
      if (diffInSecondsAbs < limit) {
        const value = Math.round(diffInSeconds / divisor);
        return rtf.format(value, unit);
      }
    }

    return rtf.format(0, 'second');
  }
}
