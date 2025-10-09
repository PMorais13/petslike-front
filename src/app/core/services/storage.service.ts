import { Injectable } from '@angular/core';

const STORAGE_KEYS = {
  USER: 'petslike_user',
  WELCOME_SEEN: 'petslike_seen_welcome',
  POSTS: 'petslike_posts'
} as const;

type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

@Injectable({ providedIn: 'root' })
export class StorageService {
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage;
  }

  set<T>(key: StorageKey, value: T): void {
    if (!this.isBrowser()) {
      return;
    }

    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Erro ao salvar no storage', error);
    }
  }

  get<T>(key: StorageKey): T | null {
    if (!this.isBrowser()) {
      return null;
    }

    try {
      const stored = window.localStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : null;
    } catch (error) {
      console.error('Erro ao ler storage', error);
      return null;
    }
  }

  remove(key: StorageKey): void {
    if (!this.isBrowser()) {
      return;
    }

    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error('Erro ao remover storage', error);
    }
  }

  markWelcomeSeen(): void {
    if (!this.isBrowser()) {
      return;
    }

    try {
      window.localStorage.setItem(STORAGE_KEYS.WELCOME_SEEN, 'true');
    } catch (error) {
      console.error('Erro ao marcar welcome', error);
    }
  }

  hasSeenWelcome(): boolean {
    if (!this.isBrowser()) {
      return false;
    }

    try {
      return window.localStorage.getItem(STORAGE_KEYS.WELCOME_SEEN) === 'true';
    } catch (error) {
      console.error('Erro ao consultar welcome', error);
      return false;
    }
  }

  clearAll(): void {
    if (!this.isBrowser()) {
      return;
    }

    try {
      Object.values(STORAGE_KEYS).forEach(key => window.localStorage.removeItem(key));
    } catch (error) {
      console.error('Erro ao limpar storage', error);
    }
  }
}

export { STORAGE_KEYS };
