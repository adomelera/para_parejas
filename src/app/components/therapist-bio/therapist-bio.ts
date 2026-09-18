import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TherapistProfile } from '../../models/tantra.models';

@Component({
  selector: 'app-therapist-bio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="bg-white rounded-2xl p-5 sm:p-7 border border-neutral/8 shadow-[0_4px_20px_rgba(44,45,42,0.04)] flex flex-col gap-5">
      <!-- Portrait & Intro -->
      <div class="flex items-center gap-4">
        <div class="w-20 h-20 rounded-full overflow-hidden shrink-0 shadow-md border-2 border-surface bg-surface">
          <img
            [src]="therapist().portraitUrl"
            [alt]="therapist().name"
            class="w-full h-full object-cover"
          />
        </div>
        <div class="flex flex-col">
          <h3 class="font-editorial text-xl sm:text-2xl text-neutral-dark font-medium leading-tight">
            {{ therapist().name }}
          </h3>
          <span class="text-xs sm:text-sm text-secondary font-semibold">
            {{ therapist().role }}
          </span>
          <span class="text-xs text-neutral-muted pt-0.5">
            {{ therapist().subtitle }}
          </span>
        </div>
        <div class="ml-auto">
          <a
            [href]="therapist().instagram"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-white text-xs font-semibold shadow-xs hover:bg-primary-hover transition-all active:scale-[0.98]"
          >
            <span class="material-symbols-outlined text-[16px]">photo_camera</span> 
            <span> Instagram</span>
          </a>
        </div>
      </div>

      <!-- Quote -->
      <blockquote
        class="font-editorial italic text-base sm:text-lg text-primary leading-relaxed bg-surface-variant/80 p-4 sm:p-5 rounded-xl border-l-3 border-primary"
      >
        {{ therapist().quote }}
      </blockquote>

      <!-- Bio Paragraphs -->
      <div class="text-xs sm:text-sm text-neutral-muted flex flex-col gap-3 leading-relaxed">
        @for (p of therapist().paragraphs; track p) {
          <p>{{ p }}</p>
        }
      </div>

      <!-- Trust Credentials -->
      <div class="flex flex-wrap gap-2 pt-1 border-t border-neutral/6">
        @for (cred of therapist().credentials; track cred.text) {
          <span
            class="px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5"
            [class]="getCredClass(cred.color)"
          >
            <span class="material-symbols-outlined text-[16px]">{{ cred.icon }}</span>
            <span>{{ cred.text }}</span>
          </span>
        }
      </div>
    </article>
  `
})
export class TherapistBioComponent {
  readonly therapist = input.required<TherapistProfile>();

  getCredClass(color: 'primary' | 'secondary' | 'tertiary'): string {
    if (color === 'primary') return 'bg-primary/10 text-primary';
    if (color === 'tertiary') return 'bg-tertiary/15 text-tertiary';
    return 'bg-secondary/10 text-secondary';
  }
}
