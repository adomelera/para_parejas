import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  output,
  signal
} from '@angular/core';
import { MicroRitual } from '../../models/tantra.models';

@Component({
  selector: 'app-micro-ritual',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="bg-surface rounded-xl border border-neutral/8 overflow-hidden transition-all duration-300"
    >
      <!-- Accordion Header -->
      <button
        type="button"
        (click)="toggleOpen.emit(ritual().id)"
        class="w-full p-4 sm:p-5 flex items-center justify-between text-left focus:outline-none hover:bg-surface-variant/60 transition-colors"
        [attr.aria-expanded]="isOpen()"
      >
        <div class="flex items-center gap-3.5">
          <span
            class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-xs shrink-0"
            [class]="getStepBadgeClass()"
          >
            {{ ritual().stepNumber }}
          </span>
          <div>
            <h4 class="font-editorial text-base sm:text-lg text-neutral-dark font-medium leading-snug">
              {{ ritual().title }}
            </h4>
            <div class="flex items-center gap-2 text-xs text-neutral-muted mt-0.5">
              <span>{{ ritual().duration }}</span>
              <span>·</span>
              <span class="text-tertiary font-medium">{{ ritual().format }}</span>
            </div>
          </div>
        </div>

        <span
          class="material-symbols-outlined text-neutral-subtle transition-transform duration-300"
          [class.rotate-180]="isOpen()"
        >
          expand_more
        </span>
      </button>

      <!-- Expandable Content -->
      @if (isOpen()) {
        <div class="px-4 sm:px-5 pb-5 text-neutral-muted text-sm flex flex-col gap-3.5 border-t border-neutral/6 pt-3.5 bg-white/60">
          <p class="leading-relaxed">
            {{ ritual().description }}
          </p>

          <div class="bg-surface-variant p-3.5 rounded-lg text-xs sm:text-sm text-neutral-dark border-l-3" [class]="getInstructionBorderClass()">
            <strong class="font-semibold block mb-1">Instrucción:</strong>
            <p class="leading-relaxed">{{ ritual().instruction }}</p>
          </div>

          @if (ritual().bullets && ritual().bullets!.length > 0) {
            <ul class="space-y-1.5 pl-4 list-disc text-xs sm:text-sm text-neutral">
              @for (bullet of ritual().bullets; track bullet) {
                <li class="italic">{{ bullet }}</li>
              }
            </ul>
          }

          <!-- Interactive Breathing / Presence Guide Toggle -->
          <div class="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 border-t border-neutral/6">
            <span class="text-xs text-neutral-subtle flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[16px] text-tertiary">self_improvement</span>
              ¿Queréis sincronizar la respiración ahora?
            </span>

            <button
              type="button"
              (click)="toggleBreathingGuide()"
              class="px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
              [class]="isBreathingActive() ? 'bg-secondary text-white' : 'bg-surface text-secondary border border-secondary/20 hover:bg-surface-variant'"
            >
              <span class="material-symbols-outlined text-[16px]">
                {{ isBreathingActive() ? 'stop_circle' : 'play_circle' }}
              </span>
              <span>{{ isBreathingActive() ? 'Detener Guía' : 'Iniciar Guía de Respiración' }}</span>
            </button>
          </div>

          <!-- Interactive Guided Breathing Container -->
          @if (isBreathingActive()) {
            <div class="mt-2 p-5 bg-surface rounded-xl border border-secondary/20 flex flex-col items-center justify-center text-center gap-3">
              <div class="text-xs font-semibold uppercase tracking-wider text-secondary">
                Sintonización Vagal Guiada
              </div>

              <!-- Animated Visual Pulse Ring -->
              <div class="relative w-24 h-24 flex items-center justify-center">
                <div
                  class="absolute rounded-full transition-all duration-1000 ease-in-out"
                  [class]="breathingPhase() === 'Inhala' ? 'w-24 h-24 bg-secondary/20 scale-110' : breathingPhase() === 'Sostén' ? 'w-20 h-20 bg-tertiary/30 scale-105' : 'w-14 h-14 bg-primary/20 scale-90'"
                ></div>
                <div
                  class="w-14 h-14 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-sm shadow-md"
                >
                  {{ breathTimer() }}s
                </div>
              </div>

              <div class="font-editorial text-lg text-neutral-dark font-medium">
                {{ breathingPhase() }}
              </div>
              <p class="text-xs text-neutral-muted max-w-xs">
                Mano en el pecho del otro. Sentid el ascenso y descenso del aire sin juicio.
              </p>
            </div>
          }
        </div>
      }
    </div>
  `
})
export class MicroRitualComponent {
  readonly ritual = input.required<MicroRitual>();
  readonly isOpen = input<boolean>(false);
  readonly toggleOpen = output<string>();

  readonly isBreathingActive = signal<boolean>(false);
  readonly breathingPhase = signal<'Inhala' | 'Sostén' | 'Exhala'>('Inhala');
  readonly breathTimer = signal<number>(4);

  private timerInterval: ReturnType<typeof setInterval> | null = null;
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.stopTimer();
    });
  }

  getStepBadgeClass(): string {
    const color = this.ritual().themeColor;
    if (color === 'primary') return 'bg-white text-primary border border-primary/20';
    if (color === 'secondary') return 'bg-white text-secondary border border-secondary/20';
    return 'bg-white text-tertiary border border-tertiary/20';
  }

  getInstructionBorderClass(): string {
    const color = this.ritual().themeColor;
    if (color === 'primary') return 'border-l-primary';
    if (color === 'secondary') return 'border-l-secondary';
    return 'border-l-tertiary';
  }

  toggleBreathingGuide(): void {
    if (this.isBreathingActive()) {
      this.stopTimer();
      this.isBreathingActive.set(false);
    } else {
      this.isBreathingActive.set(true);
      this.startBreathingLoop();
    }
  }

  private startBreathingLoop(): void {
    this.stopTimer();
    let secondsLeft = 4;
    let phase: 'Inhala' | 'Sostén' | 'Exhala' = 'Inhala';
    this.breathingPhase.set(phase);
    this.breathTimer.set(secondsLeft);

    this.timerInterval = setInterval(() => {
      secondsLeft--;
      if (secondsLeft <= 0) {
        if (phase === 'Inhala') {
          phase = 'Sostén';
          secondsLeft = 2;
        } else if (phase === 'Sostén') {
          phase = 'Exhala';
          secondsLeft = 5;
        } else {
          phase = 'Inhala';
          secondsLeft = 4;
        }
        this.breathingPhase.set(phase);
      }
      this.breathTimer.set(secondsLeft);
    }, 1000);
  }

  private stopTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }
}
