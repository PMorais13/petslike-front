import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { LUCIDE_ICONS } from '../../icons';
import { SERVICES_BY_CATEGORY } from '../../data/services.data';
import { ServiceProvider } from '../../models';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './services-page.component.html',
  styleUrl: './services-page.component.scss'
})
export class ServicesPageComponent {
  readonly categories: Array<{
    id: keyof typeof SERVICES_BY_CATEGORY;
    label: string;
    icon: keyof typeof LUCIDE_ICONS;
  }> = [
    { id: 'walker', label: 'Passeadores', icon: 'PawPrint' },
    { id: 'petshop', label: 'Pet Shops', icon: 'ShoppingBag' },
    { id: 'clinic', label: 'Clínicas', icon: 'HeartPulse' },
    { id: 'trainer', label: 'Adestradores', icon: 'GraduationCap' },
    { id: 'housing', label: 'Hospedagens', icon: 'Home' }
  ];

  readonly selectedCategory = signal<keyof typeof SERVICES_BY_CATEGORY>('walker');

  readonly providers = computed<ServiceProvider[]>(() => SERVICES_BY_CATEGORY[this.selectedCategory()]);

  setCategory(category: keyof typeof SERVICES_BY_CATEGORY): void {
    this.selectedCategory.set(category);
  }
}
