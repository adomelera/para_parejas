import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { BottomNavComponent } from './components/bottom-nav/bottom-nav';
import { HeaderComponent } from './components/header/header';
import { APP_CONFIG } from './data/tantra-data';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, BottomNavComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly router = inject(Router);
  readonly appConfig = APP_CONFIG;

  navigateToTalleres(): void {
    this.router.navigate(['/talleres']);
  }
}
