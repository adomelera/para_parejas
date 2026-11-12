import { ChangeDetectionStrategy, Component, effect, input, output, signal, untracked } from '@angular/core';
import { Workshop, WorkshopDate } from '../../models/tantra.models';
import { buildNotifyWhatsAppUrl } from '../../utils/whatsapp';
import { isWorkshopDatePast, nextWorkshopDate } from '../../utils/workshop-dates';

@Component({
  selector: 'app-workshop-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article
      class="bg-white rounded-2xl overflow-hidden border border-neutral/8 shadow-[0_8px_24px_rgba(44,45,42,0.06)] flex flex-col transition-all hover:shadow-[0_12px_32px_rgba(44,45,42,0.08)]"
    >
      <!-- Visual Header Image -->
      <div class="relative w-full h-56 sm:h-64 bg-secondary overflow-hidden">
        <img
          [src]="workshop().imageUrl"
          [alt]="workshop().title"
          class="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
        <div
          class="absolute top-3 left-3 bg-surface/95 backdrop-blur-md px-3 py-1 rounded-full text-secondary text-xs font-semibold uppercase tracking-wider shadow-sm"
        >
          {{ workshop().badge }}
        </div>

        <div
          class="absolute bottom-3 left-3 bg-surface/95 backdrop-blur-md text-neutral-dark text-[11px] px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm font-medium"
        >
          <span class="material-symbols-outlined text-primary text-[14px]">apartment</span>
          <span>Casa Lazar · 80m² & Terraza al Mar</span>
        </div>

        <div
          class="absolute bottom-3 right-3 bg-secondary/90 backdrop-blur-md text-white text-[11px] px-2.5 py-1 rounded-full flex items-center gap-1.5"
        >
          <span class="material-symbols-outlined text-[14px]">groups</span>
          <span>Máx. 8 plazas</span>
        </div>
      </div>

      <!-- Content Body -->
      <div class="p-5 sm:p-7 flex flex-col gap-5">
        <div>
          <div class="flex items-center justify-between flex-wrap gap-2">
            <span class="text-xs text-primary uppercase font-bold tracking-widest">
              Encuentro Mensual Regular
            </span>
            <div class="text-right">
              <span class="font-editorial text-2xl font-bold text-secondary">
                {{ workshop().price }}€
              </span>
              <span class="text-xs text-neutral-muted font-normal"> / {{ workshop().priceUnit }}</span>
            </div>
          </div>

          <h3 class="font-editorial text-xl sm:text-2xl text-neutral-dark pt-1.5 leading-snug font-medium">
            {{ workshop().title }}
          </h3>

          <p class="text-sm text-neutral-muted pt-2 leading-relaxed">
            {{ workshop().description }}
          </p>
        </div>

        <!-- Key Feature Bullets -->
        <div class="bg-surface p-4 sm:p-5 rounded-xl border border-neutral/6 flex flex-col gap-3">
          @for (feature of workshop().features; track feature) {
            <div class="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-dark">
              <span class="material-symbols-outlined text-secondary text-[18px] mt-0.5 shrink-0">
                check_circle
              </span>
              <span>{{ feature }}</span>
            </div>
          }
        </div>

        <!-- Upcoming Dates Selector -->
        @if (workshop().dates && workshop().dates.length > 0) {
          <div class="flex flex-col gap-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold text-secondary uppercase tracking-wider">
                Fechas del Curso (Octubre 2026 - Junio 2027):
              </span>
              <span class="text-[11px] text-neutral-subtle font-medium">
                3er miércoles de mes
              </span>
            </div>
            <div class="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto pr-1">
              @for (d of workshop().dates; track d.id) {
                <button
                  type="button"
                  [disabled]="isPast(d)"
                  (click)="selectDate(d.id)"
                  class="p-3 rounded-xl border text-left flex items-center justify-between gap-2.5 sm:gap-3 transition-all"
                  [class]="dateClasses(d)"
                >
                  <div class="flex items-center gap-2.5 min-w-0 flex-1">
                    <span class="material-symbols-outlined text-[18px] text-secondary shrink-0">
                      event
                    </span>
                    <div class="min-w-0 flex-1">
                      <span class="text-xs sm:text-sm font-semibold block leading-tight">{{ d.dateStr }}</span>
                      <span class="text-[11px] text-neutral-muted block leading-tight truncate sm:whitespace-normal">{{ d.timeStr }} · {{ d.location }}</span>
                    </div>
                  </div>
                  @if (isPast(d)) {
                    <span
                      class="text-[11px] px-2.5 py-1 rounded-full font-medium shrink-0 whitespace-nowrap text-center inline-flex items-center justify-center leading-none bg-neutral/8 text-neutral-subtle"
                    >
                      Ya celebrado
                    </span>
                  } @else {
                    <span
                      class="text-[11px] px-2.5 py-1 rounded-full font-medium shrink-0 whitespace-nowrap text-center inline-flex items-center justify-center leading-none"
                      [class]="d.spotsLeft <= 4 ? 'bg-primary/15 text-primary' : 'bg-tertiary/20 text-tertiary'"
                    >
                      {{ d.spotsLeft }} plazas
                    </span>
                  }
                </button>
              }
            </div>
          </div>
        }

        <!-- Aviso de próximas fechas -->
        <a
          [href]="notifyUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="group text-xs text-secondary hover:text-secondary-hover transition-colors self-start inline-flex items-center gap-1"
        >
          <span class="material-symbols-outlined text-[14px] no-underline" aria-hidden="true">notifications</span>
          <span class="underline underline-offset-2 decoration-secondary/40 group-hover:decoration-secondary"
            >¿No te encaja ninguna fecha? Avísame y te escribo cuando abra las siguientes</span
          >
        </a>

        <!-- CTA Action -->
        <button
          type="button"
          [disabled]="!selectedDateId()"
          (click)="reserve.emit(selectedDateId())"
          class="w-full py-3.5 px-6 bg-primary text-white font-semibold text-sm rounded-xl shadow-md text-center hover:bg-primary-hover transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:bg-neutral/20 disabled:text-neutral-subtle disabled:shadow-none disabled:cursor-not-allowed disabled:active:scale-100"
        >
          <span class="material-symbols-outlined text-[18px]">event_available</span>
          <span>{{ selectedDateId() ? 'Reservar Plaza para la Fecha Seleccionada' : 'Sin fechas disponibles' }}</span>
        </button>
      </div>
    </article>
  `
})
export class WorkshopCardComponent {
  readonly workshop = input.required<Workshop>();
  readonly reserve = output<string>();

  readonly selectedDateId = signal<string>('');
  readonly notifyUrl = buildNotifyWhatsAppUrl();

  constructor() {
    // La fecha preseleccionada es siempre la siguiente que se puede reservar.
    effect(() => {
      const dates = this.workshop().dates;
      const current = untracked(this.selectedDateId);
      const isUsable = dates.some((date) => date.id === current && !isWorkshopDatePast(date));

      if (!isUsable) {
        this.selectedDateId.set(nextWorkshopDate(dates)?.id ?? '');
      }
    });
  }

  isPast(date: WorkshopDate): boolean {
    return isWorkshopDatePast(date);
  }

  selectDate(id: string): void {
    const date = this.workshop().dates.find((item) => item.id === id);
    if (date && !this.isPast(date)) {
      this.selectedDateId.set(id);
    }
  }

  dateClasses(date: WorkshopDate): string {
    if (this.isPast(date)) {
      return 'bg-surface border-neutral/6 text-neutral-subtle opacity-60 cursor-not-allowed';
    }
    if (this.selectedDateId() === date.id) {
      return 'bg-secondary/8 border-secondary text-neutral-dark shadow-2xs ring-1 ring-secondary/20 cursor-pointer';
    }
    return 'bg-surface border-neutral/10 text-neutral-muted hover:bg-surface-variant cursor-pointer';
  }
}
