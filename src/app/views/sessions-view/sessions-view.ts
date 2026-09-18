import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SessionCardComponent } from '../../components/session-card/session-card';
import { APP_CONFIG, SESSIONS_DATA } from '../../data/tantra-data';

@Component({
  selector: 'app-sessions-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SessionCardComponent],
  template: `
    <div class="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-8 pb-28">
      <!-- Header Banner -->
      <section class="flex flex-col gap-2 bg-surface-variant/80 p-6 sm:p-8 rounded-3xl border border-neutral/6">
        <div class="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-white text-secondary text-xs font-semibold shadow-xs">
          <span class="material-symbols-outlined text-[16px]">favorite</span>
          <span>Acompañamiento Personalizado</span>
        </div>
        <h1 class="font-editorial text-3xl sm:text-4xl text-neutral-dark font-medium leading-tight">
          Sesiones Privadas
        </h1>
        <p class="text-sm sm:text-base text-neutral-muted leading-relaxed">
          Acompañamiento terapéutico somático para parejas e individuos. Disponible en 3 modalidades según vuestra conveniencia: <strong>online</strong>, <strong>presencial en Molins de Rei</strong> o <strong>a domicilio</strong>.
        </p>

        <!-- Guarantee Pill -->
        <div class="flex flex-wrap gap-2 pt-2">
          <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-neutral-dark text-xs font-medium">
            <span class="material-symbols-outlined text-tertiary text-[16px]">verified</span>
            100% Confidencial
          </span>
          <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-neutral-dark text-xs font-medium">
            <span class="material-symbols-outlined text-secondary text-[16px]">diversity_1</span>
            LGTBIQ+ Afirmativo
          </span>
          <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-neutral-dark text-xs font-medium">
            <span class="material-symbols-outlined text-primary text-[16px]">psychiatry</span>
            Somatic Experiencing®
          </span>
        </div>
      </section>

      <!-- Three Modalities Highlight Box -->
      <section class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div class="bg-white p-4 rounded-2xl border border-neutral/8 shadow-2xs flex flex-col gap-1.5">
          <div class="w-8 h-8 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center">
            <span class="material-symbols-outlined text-[18px]">videocam</span>
          </div>
          <strong class="font-editorial text-sm text-neutral-dark font-semibold">Online</strong>
          <p class="text-xs text-neutral-muted leading-relaxed">
            Videollamada encriptada y cercana. Ideal para conciliar agendas sin desplazamientos.
          </p>
        </div>

        <div class="bg-white p-4 rounded-2xl border border-neutral/8 shadow-2xs flex flex-col gap-1.5">
          <div class="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <span class="material-symbols-outlined text-[18px]">nature_people</span>
          </div>
          <strong class="font-editorial text-sm text-neutral-dark font-semibold">En Molins de Rei</strong>
          <p class="text-xs text-neutral-muted leading-relaxed">
            Consulta privada y acogedora con futón tradicional y máxima discreción.
          </p>
        </div>

        <div class="bg-white p-4 rounded-2xl border border-neutral/8 shadow-2xs flex flex-col gap-1.5">
          <div class="w-8 h-8 rounded-lg bg-tertiary/15 text-tertiary flex items-center justify-center">
            <span class="material-symbols-outlined text-[18px]">home</span>
          </div>
          <strong class="font-editorial text-sm text-neutral-dark font-semibold">A Domicilio</strong>
          <p class="text-xs text-neutral-muted leading-relaxed">
            Me desplazo con todo el material necesario a vuestro hogar en Barcelona y cercanías.
          </p>
        </div>
      </section>

      <!-- Visual Photography -->
      <div class="relative w-full rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(44,45,42,0.06)] aspect-[16/9] bg-secondary">
        <img
          [src]="appConfig.images.privateSessions"
          alt="Sesión de acompañamiento íntimo consciente"
          class="w-full h-full object-cover"
        />
        <div class="absolute bottom-3 left-3 bg-surface/95 backdrop-blur-md px-3 py-1 rounded-full text-primary text-xs font-semibold flex items-center gap-1.5">
          <span class="material-symbols-outlined text-[14px]">home_pin</span>
          <span>Online · Molins de Rei · A Domicilio</span>
        </div>
      </div>

      <!-- Filter Buttons -->
      <div class="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          type="button"
          (click)="selectedCategory.set('all')"
          class="px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors"
          [class]="selectedCategory() === 'all' ? 'bg-primary text-white shadow-xs' : 'bg-white text-neutral-muted border border-neutral/10 hover:bg-surface'"
        >
          Todas las Modalidades ({{ sessions.length }})
        </button>
        <button
          type="button"
          (click)="selectedCategory.set('pareja')"
          class="px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors"
          [class]="selectedCategory() === 'pareja' ? 'bg-primary text-white shadow-xs' : 'bg-white text-neutral-muted border border-neutral/10 hover:bg-surface'"
        >
          Para Parejas
        </button>
        <button
          type="button"
          (click)="selectedCategory.set('individual')"
          class="px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors"
          [class]="selectedCategory() === 'individual' ? 'bg-primary text-white shadow-xs' : 'bg-white text-neutral-muted border border-neutral/10 hover:bg-surface'"
        >
          Individual & Corporal
        </button>
      </div>

      <!-- Sessions List -->
      <div class="flex flex-col gap-5">
        @for (session of filteredSessions(); track session.id) {
          <app-session-card
            [session]="session"
            (selectSession)="goToBooking(session.id)"
          />
        }
      </div>

      <!-- How A Session Works Protocol -->
      <section class="bg-white p-6 sm:p-7 rounded-2xl border border-neutral/8 shadow-xs flex flex-col gap-4">
        <h3 class="font-editorial text-xl sm:text-2xl text-neutral-dark font-medium">
          ¿Cómo transcurre una sesión en consulta?
        </h3>

        <div class="space-y-4 text-xs sm:text-sm text-neutral-muted">
          <div class="flex items-start gap-3">
            <span class="w-6 h-6 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-bold text-xs shrink-0">
              1
            </span>
            <div>
              <strong class="text-neutral-dark block mb-0.5">Llegada y Aterrizaje Somático (15 min)</strong>
              Bajamos de la mente al cuerpo, chequeamos lo que esta vivo ahora en el cuerpo. Delimitamos intenciones y límites no negociables.
            </div>
          </div>

          <div class="flex items-start gap-3">
            <span class="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0">
              2
            </span>
            <div>
              <strong class="text-neutral-dark block mb-0.5">Práctica Somática Guiada (60 min)</strong>
              Ejercicios de respiración diafragmática, tacto sin demanda, regulación del pulso vagal o masaje sobre futón tradicional con total consentimiento.
            </div>
          </div>

          <div class="flex items-start gap-3">
            <span class="w-6 h-6 rounded-full bg-tertiary/15 text-tertiary flex items-center justify-center font-bold text-xs shrink-0">
              3
            </span>
            <div>
              <strong class="text-neutral-dark block mb-0.5">Integración y Micro-rituales para Casa (15 min)</strong>
              Cierre en reposo, retorno gradual al tono cotidiano y pautas concretas para extender la experiencia al hogar sin presiones.
            </div>
          </div>
        </div>
      </section>
    </div>
  `
})
export class SessionsViewComponent {
  private readonly router = inject(Router);

  readonly appConfig = APP_CONFIG;
  readonly sessions = SESSIONS_DATA;
  readonly selectedCategory = signal<'all' | 'pareja' | 'individual'>('all');

  filteredSessions() {
    const cat = this.selectedCategory();
    if (cat === 'pareja') {
      return this.sessions.filter((s) => s.id === 'terapia-vinculo');
    }
    if (cat === 'individual') {
      return this.sessions.filter((s) => s.id !== 'terapia-vinculo');
    }
    return this.sessions;
  }

  goToBooking(sessionId: string): void {
    this.router.navigate(['/reservar'], { queryParams: { service: sessionId } });
  }
}
