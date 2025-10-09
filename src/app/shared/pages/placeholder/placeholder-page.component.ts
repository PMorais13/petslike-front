import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ComingSoonComponent } from '../../components/coming-soon/coming-soon.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-placeholder-page',
  standalone: true,
  imports: [CommonModule, RouterModule, ComingSoonComponent],
  template: `
    <app-coming-soon
      [title]="title()"
      [description]="description()"
      [icon]="icon()"
    />
  `
})
export class PlaceholderPageComponent {
  private readonly route = inject(ActivatedRoute);

  readonly title = computed(() => this.route.snapshot.data['title'] ?? 'Em breve');
  readonly description = computed(() => this.route.snapshot.data['description'] ?? 'Estamos preparando novidades.');
  readonly icon = computed(() => this.route.snapshot.data['icon'] ?? 'PawPrint');
}
