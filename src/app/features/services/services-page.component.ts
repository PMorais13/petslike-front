import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { LUCIDE_ICONS } from '../../icons';
import { SERVICES_BY_CATEGORY } from '../../data/services.data';
import { ServiceProvider } from '../../models';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly selectedCategory = signal<keyof typeof SERVICES_BY_CATEGORY>('walker');

  constructor() {
    this.activatedRoute.queryParamMap
      .pipe(takeUntilDestroyed())
      .subscribe(params => {
        const categoria = params.get('categoria');
        if (categoria && this.isValidCategory(categoria)) {
          if (this.selectedCategory() !== categoria) {
            this.selectedCategory.set(categoria);
          }
          return;
        }

        if (this.selectedCategory() !== 'walker') {
          this.selectedCategory.set('walker');
        }

        if (categoria !== 'walker') {
          void this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: { categoria: 'walker' },
            queryParamsHandling: 'merge'
          });
        }
      });
  }

  readonly providers = computed<ServiceProvider[]>(() => SERVICES_BY_CATEGORY[this.selectedCategory()]);

  setCategory(category: keyof typeof SERVICES_BY_CATEGORY): void {
    if (this.selectedCategory() !== category) {
      this.selectedCategory.set(category);
    }

    const currentCategory = this.activatedRoute.snapshot.queryParamMap.get('categoria');
    if (currentCategory === category) {
      return;
    }

    void this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        categoria: category
      },
      queryParamsHandling: 'merge'
    });
  }

  private isValidCategory(category: string): category is keyof typeof SERVICES_BY_CATEGORY {
    return Object.prototype.hasOwnProperty.call(SERVICES_BY_CATEGORY, category);
  }
}
