import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkTheme = signal<boolean>(true);

  constructor() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      this.isDarkTheme.set(false);
    }
    
    effect(() => {
      const isDark = this.isDarkTheme();
      if (isDark) {
        document.body.classList.remove('light-theme');
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
      }
    });
  }

  get isDark() {
    return this.isDarkTheme();
  }

  toggleTheme() {
    this.isDarkTheme.update(v => !v);
  }
}
