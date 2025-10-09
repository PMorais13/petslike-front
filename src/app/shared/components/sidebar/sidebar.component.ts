import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import {
  NavigationChildItem,
  NavigationItem,
  NavigationService
} from '../../../core/services/navigation.service';
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

  private readonly expandedSections = new Set<string>(['/servicos']);

  constructor(public readonly navigationService: NavigationService) {}

  trackByRoute(_: number, item: NavigationItem): string {
    return item.route;
  }

  trackByChildRoute(_: number, item: NavigationChildItem): string {
    const categoria = item.queryParams?.['categoria'] ?? '';
    return `${item.route}-${categoria}`;
  }

  isExpanded(route: string): boolean {
    return this.expandedSections.has(route);
  }

  toggleSection(route: string): void {
    if (this.expandedSections.has(route)) {
      this.expandedSections.delete(route);
    } else {
      this.expandedSections.add(route);
    }
  }

  onParentClick(item: NavigationItem): void {
    if (item.children?.length) {
      this.toggleSection(item.route);
      return;
    }

    if (item.route) {
      this.navigate.emit();
    }
  }
}
