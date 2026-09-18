import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  path: string;
  label: string;
  icon: string;
  isSpecial?: boolean;
}

@Component({
  selector: 'app-bottom-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav
      class="fixed bottom-0 inset-x-0 z-50 pb-safe bg-surface/95 backdrop-blur-xl border-t border-neutral/8 shadow-[0_-4px_20px_rgba(0,0,0,0.04)]"
      role="navigation"
      aria-label="Navegación principal"
    >
      <div class="max-w-md mx-auto flex justify-around items-center h-16 px-2">
        @for (item of navItems; track item.path) {
          @if (item.isSpecial) {
            <!-- Prominent Reserve CTA Button -->
            <a
              [routerLink]="item.path"
              routerLinkActive="scale-105"
              [routerLinkActiveOptions]="{ exact: false }"
              class="flex flex-col items-center justify-center -mt-4 min-w-[56px] group active:scale-95 transition-transform"
              [attr.aria-label]="item.label"
            >
              <div
                class="w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center shadow-[0_4px_14px_rgba(200,100,70,0.38)] group-hover:bg-primary-hover transition-colors"
              >
                <span class="material-symbols-outlined text-[22px]">{{ item.icon }}</span>
              </div>
              <span class="text-[11px] font-semibold text-primary tracking-normal mt-1">
                {{ item.label }}
              </span>
            </a>
          } @else {
            <!-- Standard Nav Tab -->
            <a
              [routerLink]="item.path"
              routerLinkActive="text-primary font-semibold"
              [routerLinkActiveOptions]="{ exact: item.path === '/' }"
              class="flex flex-col items-center justify-center gap-1 min-w-[48px] min-h-[48px] px-2 text-neutral-subtle hover:text-neutral-dark transition-colors"
            >
              <span class="material-symbols-outlined text-[22px]">{{ item.icon }}</span>
              <span class="text-[11px] tracking-normal capitalize">
                {{ item.label }}
              </span>
            </a>
          }
        }
      </div>
    </nav>
  `
})
export class BottomNavComponent {
  readonly navItems: NavItem[] = [
    { path: '/', label: 'Inicio', icon: 'spa' },
    { path: '/sesiones', label: 'Sesiones', icon: 'favorite' },
    { path: '/reservar', label: 'Reservar', icon: 'calendar_month', isSpecial: true },
    { path: '/talleres', label: 'Talleres', icon: 'event' },
    { path: '/espacio', label: 'Espacio', icon: 'verified_user' }
  ];
}
