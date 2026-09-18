import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FaqItem } from '../../models/tantra.models';

@Component({
  selector: 'app-faq-accordion',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="bg-white rounded-xl border border-neutral/8 p-4 sm:p-5 shadow-xs transition-all hover:border-secondary/30"
    >
      <button
        type="button"
        (click)="toggleOpen.emit(faq().id)"
        class="w-full flex justify-between items-center text-left focus:outline-none gap-3"
        [attr.aria-expanded]="isOpen()"
      >
        <span class="font-editorial text-base sm:text-lg text-neutral-dark font-medium leading-snug">
          {{ faq().question }}
        </span>
        <span
          class="material-symbols-outlined text-neutral-subtle shrink-0 transition-transform duration-300"
          [class.rotate-180]="isOpen()"
        >
          expand_more
        </span>
      </button>

      @if (isOpen()) {
        <div class="pt-3 mt-2 border-t border-neutral/6 text-sm text-neutral-muted leading-relaxed animate-in fade-in duration-200">
          <p>{{ faq().answer }}</p>
        </div>
      }
    </div>
  `
})
export class FaqAccordionComponent {
  readonly faq = input.required<FaqItem>();
  readonly isOpen = input<boolean>(false);
  readonly toggleOpen = output<string>();
}
