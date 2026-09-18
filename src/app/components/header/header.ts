import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <header class="fixed top-0 inset-x-0 z-50 bg-surface/90 backdrop-blur-xl border-b border-neutral/6 shadow-[0_1px_8px_rgba(0,0,0,0.03)] pt-safe">
      <div class="max-w-4xl mx-auto h-16 sm:h-20 px-3.5 sm:px-6 flex items-center justify-between gap-2.5 sm:gap-4">
        <!-- Logo & Brand Title -->
        <a routerLink="/" class="flex items-center gap-2 sm:gap-3 group cursor-pointer min-w-0" title="Tantra para Parejas">
          <img
            [src]="logoUrl()"
            alt="Tantra para Parejas Logo"
            class="h-10 sm:h-12 w-auto object-contain shrink-0 transition-transform group-hover:scale-105"
          />
          <div class="flex flex-col justify-center min-w-0">
            <span class="font-editorial text-xl sm:text-2xl md:text-[27px] font-semibold tracking-tight text-neutral-dark leading-none transition-colors group-hover:text-primary">
              Tantra
            </span>
            <span class="text-[10px] sm:text-xs font-semibold tracking-[0.14em] uppercase text-secondary group-hover:text-neutral-dark transition-colors leading-tight mt-1 whitespace-nowrap">
              para parejas
            </span>
          </div>
        </a>

        <!-- Action / Quick Links -->
        <div class="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            routerLink="/talleres"
            aria-label="Próximos Eventos"
            title="Próximos Eventos"
            class="w-9 h-9 sm:w-auto sm:h-auto inline-flex items-center justify-center gap-1.5 p-2 sm:px-3.5 sm:py-1.5 rounded-full bg-secondary/8 text-secondary border border-secondary/15 text-xs font-semibold hover:bg-secondary/15 transition-all"
          >
            <span class="material-symbols-outlined text-[19px] sm:text-[16px]">calendar_today</span>
            <span class="hidden sm:inline">Próximos Eventos</span>
          </a>

          <a
            routerLink="/reservar"
            aria-label="Contacto"
            title="Contacto"
            class="w-9 h-9 sm:w-auto sm:h-auto inline-flex items-center justify-center gap-1.5 p-2 sm:px-4 sm:py-2 rounded-full sm:rounded-xl bg-primary text-white text-xs sm:text-sm font-semibold shadow-xs hover:bg-primary-hover transition-all active:scale-[0.98]"
          >
            <span class="material-symbols-outlined text-[19px] sm:text-[16px]">chat</span>
            <span class="hidden sm:inline">Contacto</span>
          </a>
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent {
  readonly title = input<string>('Tantra para Parejas');
  readonly logoUrl = input<string>('/logo.png');
  readonly openBooking = output<void>();
}
