import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Place } from '../../../../models';

@Component({
  selector: 'app-place-stories',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './place-stories.component.html',
  styleUrl: './place-stories.component.scss'
})
export class PlaceStoriesComponent {
  @Input() places: Place[] = [];
}
