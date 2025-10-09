import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { PLACES } from '../../data/places.data';

type CategoryId = 'todos' | 'park' | 'restaurant' | 'store' | 'other';

@Component({
  selector: 'app-places-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, LucideAngularModule],
  templateUrl: './places-page.component.html',
  styleUrl: './places-page.component.scss'
})
export class PlacesPageComponent {
  readonly search = signal('');
  readonly category = signal<CategoryId>('todos');
  readonly viewMode = signal<'list' | 'map'>('list');

  readonly categories: Array<{ id: CategoryId; label: string }> = [
    { id: 'todos', label: 'Todos' },
    { id: 'park', label: 'Parques' },
    { id: 'restaurant', label: 'Cafés' },
    { id: 'store', label: 'Pet Shops' },
    { id: 'other', label: 'Veterinárias' }
  ];

  readonly filteredPlaces = computed(() => {
    const query = this.search().toLowerCase();
    const category = this.category();

    return PLACES.filter(place => {
      const matchesQuery = place.name.toLowerCase().includes(query);
      const matchesCategory = category === 'todos' || place.type === category;
      return matchesQuery && matchesCategory;
    });
  });

  setCategory(category: CategoryId): void {
    this.category.set(category);
  }

  setView(mode: 'list' | 'map'): void {
    this.viewMode.set(mode);
  }
}
