import { Injectable, computed, effect, signal } from '@angular/core';
import { AuthView, User } from '../../models';
import { STORAGE_KEYS, StorageService } from './storage.service';
import { DEFAULT_USER } from '../../data/user.data';

interface AuthStateSnapshot {
  user: User | null;
  authView: AuthView;
  showWelcome: boolean;
  showWelcomeScreen: boolean;
  isLoading: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly userSignal = signal<User | null>(null);
  private readonly authViewSignal = signal<AuthView>('login');
  private readonly isLoadingSignal = signal(true);
  private readonly showWelcomeSignal = signal(false);
  private readonly showWelcomeScreenSignal = signal(true);

  readonly user = computed(() => this.userSignal());
  readonly authView = computed(() => this.authViewSignal());
  readonly isLoading = computed(() => this.isLoadingSignal());
  readonly showWelcome = computed(() => this.showWelcomeSignal());
  readonly showWelcomeScreen = computed(() => this.showWelcomeScreenSignal());

  readonly snapshot = computed<AuthStateSnapshot>(() => ({
    user: this.userSignal(),
    authView: this.authViewSignal(),
    showWelcome: this.showWelcomeSignal(),
    showWelcomeScreen: this.showWelcomeScreenSignal(),
    isLoading: this.isLoadingSignal()
  }));

  constructor(private readonly storageService: StorageService) {
    effect(() => {
      const user = this.userSignal();
      if (user) {
        this.storageService.set(STORAGE_KEYS.USER, user);
      } else {
        this.storageService.remove(STORAGE_KEYS.USER);
      }
    });
  }

  initializeAuth(): void {
    try {
      const storedUser = this.storageService.get<User>(STORAGE_KEYS.USER);
      const hasSeenWelcome = this.storageService.hasSeenWelcome();

      if (storedUser) {
        this.userSignal.set(storedUser);
        this.showWelcomeScreenSignal.set(false);
      } else if (hasSeenWelcome) {
        this.showWelcomeScreenSignal.set(false);
      } else {
        this.userSignal.set(DEFAULT_USER);
        this.showWelcomeScreenSignal.set(false);
      }
    } catch (error) {
      console.error('Erro ao inicializar autenticação', error);
      this.storageService.clearAll();
    } finally {
      this.isLoadingSignal.set(false);
    }
  }

  setAuthView(view: AuthView): void {
    this.authViewSignal.set(view);
  }

  login(user: User): void {
    this.userSignal.set(user);
    this.showWelcomeSignal.set(false);
  }

  register(user: User): void {
    this.userSignal.set(user);
    this.showWelcomeSignal.set(true);
  }

  logout(): void {
    this.userSignal.set(null);
    this.authViewSignal.set('login');
  }

  completeWelcome(): void {
    this.showWelcomeSignal.set(false);
  }

  startWelcomeFlow(): void {
    this.storageService.markWelcomeSeen();
    this.showWelcomeScreenSignal.set(false);
    this.authViewSignal.set('register');
  }

  loginFromWelcome(): void {
    this.storageService.markWelcomeSeen();
    this.showWelcomeScreenSignal.set(false);
    this.authViewSignal.set('login');
  }
}
