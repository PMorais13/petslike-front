import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { COMMUNITY_STATS, TOP_MEMBERS } from '../../data/community.data';
import { INITIAL_POSTS } from '../../data/posts.data';

@Component({
  selector: 'app-community-page',
  standalone: true,
  imports: [CommonModule, DatePipe, LucideAngularModule],
  templateUrl: './community-page.component.html',
  styleUrl: './community-page.component.scss'
})
export class CommunityPageComponent {
  readonly stats = COMMUNITY_STATS;
  readonly topMembers = TOP_MEMBERS;
  readonly highlights = INITIAL_POSTS.slice(0, 2);
}
