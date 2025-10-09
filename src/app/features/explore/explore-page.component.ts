import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EXPLORE_PETS } from '../../data/explore.data';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-explore-page',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './explore-page.component.html',
  styleUrl: './explore-page.component.scss'
})
export class ExplorePageComponent {
  readonly pets = EXPLORE_PETS;
  activeTab = 'pets';
}
