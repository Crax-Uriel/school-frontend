import { Component, inject, Inject } from '@angular/core';
import { ThemeService } from '../../services/theme-service';

@Component({
  selector: 'app-button-theme',
  standalone: false,
  templateUrl: './button-theme.html',
  styleUrl: './button-theme.scss',
})
export class ButtonTheme {
  protected themeService = inject(ThemeService);

  isDarkMode: boolean = this.themeService.isDarkMode;

  toggleTheme(checked: boolean): void {
    this.themeService.escogerTema(checked);
  }
}