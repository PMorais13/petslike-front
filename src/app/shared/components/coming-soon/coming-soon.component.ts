import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { LUCIDE_ICONS } from '../../../icons';

@Component({
  selector: 'app-coming-soon',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './coming-soon.component.html',
  styleUrl: './coming-soon.component.scss'
})
export class ComingSoonComponent {
  @Input() title = 'Em breve';
  @Input() description = 'Estamos preparando algo especial para você e seu pet.';
  @Input() icon: keyof typeof LUCIDE_ICONS = 'PawPrint';
}
