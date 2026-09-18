import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { SessionService } from '../../models/tantra.models';

@Component({
  selector: 'app-session-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article
      class="bg-white p-5 sm:p-6 rounded-2xl border border-neutral/6 shadow-[0_2px_12px_rgba(44,45,42,0.03)] flex flex-col gap-3.5 transition-all hover:shadow-[0_8px_24px_rgba(44,45,42,0.06)]"
    >
      <!-- Header: Tag & Price -->
      <div class="flex justify-between items-start gap-2">
        <span
          class="px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider"
          [class]="getBadgeClass()"
        >
          {{ session().categoryTag }}
        </span>
        <div class="text-right">
          <span class="font-editorial text-lg sm:text-xl font-bold text-neutral-dark">
            {{ session().price }}€
          </span>
          <span class="text-xs text-neutral-muted font-normal block">
            / {{ session().durationMinutes }} min
          </span>
        </div>
      </div>

      <!-- Title & Description -->
      <div>
        <h3 class="font-editorial text-lg sm:text-xl text-neutral-dark font-medium leading-snug">
          {{ session().title }}
        </h3>
        <p class="text-sm text-neutral-muted leading-relaxed pt-1.5">
          {{ session().description }}
        </p>
      </div>

      <!-- Suitable For List (if expanded or shown) -->
      @if (session().suitableFor && session().suitableFor.length > 0) {
        <div class="bg-surface p-3 rounded-xl border border-neutral/6 text-xs text-neutral flex flex-col gap-1.5">
          <span class="font-semibold text-secondary uppercase tracking-wider text-[10px]">
            Momentos en los que suele acompañarse:
          </span>
          <ul class="space-y-1 pl-4 list-disc text-neutral-muted">
            @for (item of session().suitableFor; track item) {
              <li>{{ item }}</li>
            }
          </ul>
        </div>
      }

      <!-- Modalities & Action Button -->
      <div class="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <span class="text-xs text-tertiary flex items-center gap-1.5 font-medium">
          <span class="material-symbols-outlined text-[16px]">home_pin</span>
          <span>{{ session().locationNote || 'Online · Molins de Rei · A domicilio' }}</span>
        </span>

        <button
          type="button"
          (click)="selectSession.emit(session().id)"
          class="px-4 py-2 rounded-lg bg-surface text-secondary border border-secondary/25 hover:bg-secondary hover:text-white transition-colors text-xs font-semibold flex items-center justify-center gap-1.5 self-start sm:self-auto"
        >
          <span>Consultar o Reservar</span>
          <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
        </button>
      </div>
    </article>
  `
})
export class SessionCardComponent {
  readonly session = input.required<SessionService>();
  readonly selectSession = output<string>();

  getBadgeClass(): string {
    const c = this.session().tagColor;
    if (c === 'primary') return 'bg-primary/12 text-primary';
    if (c === 'tertiary') return 'bg-tertiary/15 text-tertiary';
    return 'bg-secondary/10 text-secondary';
  }
}
