import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { NavigationItem, NavigationService } from '../../../core/services/navigation.service';
import { User } from '../../../models';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input({ required: true }) user!: User;
  @Output() navigate = new EventEmitter<void>();

  constructor(public readonly navigationService: NavigationService) {}

  trackByRoute(_: number, item: NavigationItem): string {
    return item.route;
  }
}
