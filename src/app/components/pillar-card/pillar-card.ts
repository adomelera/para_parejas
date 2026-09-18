import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PillarItem } from '../../models/tantra.models';

@Component({
  selector: 'app-pillar-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article
      class="bg-white p-5 sm:p-6 rounded-2xl border border-neutral/6 shadow-[0_2px_12px_rgba(44,45,42,0.03)] flex flex-col gap-3 transition-transform hover:-translate-y-0.5"
    >
      <div class="flex items-center justify-between">
        <div
          class="w-10 h-10 rounded-full flex items-center justify-center"
          [class]="getIconBgClass()"
        >
          <span class="material-symbols-outlined text-[20px]">{{ pillar().icon }}</span>
        </div>
        <span
          class="text-xs font-mono font-bold tracking-widest"
          [class]="getNumberClass()"
        >
          {{ pillar().number }}
        </span>
      </div>

      <h3 class="font-editorial text-lg sm:text-xl text-neutral-dark font-medium leading-snug pt-0.5">
        {{ pillar().title }}
      </h3>

      <p class="text-sm text-neutral-muted leading-relaxed">
        {{ pillar().description }}
      </p>
    </article>
  `
})
export class PillarCardComponent {
  readonly pillar = input.required<PillarItem>();

  getIconBgClass(): string {
    const c = this.pillar().colorClass;
    if (c === 'primary') return 'bg-primary/10 text-primary';
    if (c === 'tertiary') return 'bg-tertiary/15 text-tertiary';
    return 'bg-secondary/10 text-secondary';
  }

  getNumberClass(): string {
    const c = this.pillar().colorClass;
    if (c === 'primary') return 'text-primary';
    if (c === 'tertiary') return 'text-tertiary';
    return 'text-secondary';
  }
}
