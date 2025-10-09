import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { ADOPTION_PETS } from '../../data/adoption.data';

@Component({
  selector: 'app-adoption-page',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './adoption-page.component.html',
  styleUrl: './adoption-page.component.scss'
})
export class AdoptionPageComponent {
  readonly pets = ADOPTION_PETS;
}
