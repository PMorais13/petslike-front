import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { MobileHeaderComponent } from './shared/components/mobile-header/mobile-header.component';
import { LoadingScreenComponent } from './shared/components/loading-screen/loading-screen.component';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, MobileHeaderComponent, LoadingScreenComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private readonly authService = inject(AuthService);

  readonly isLoading = computed(() => this.authService.isLoading());
  readonly user = computed(() => this.authService.user());
  readonly isSidebarOpen = signal(false);

  ngOnInit(): void {
    this.authService.initializeAuth();
  }

  openSidebar(): void {
    this.isSidebarOpen.set(true);
  }

  closeSidebar(): void {
    this.isSidebarOpen.set(false);
  }
}
