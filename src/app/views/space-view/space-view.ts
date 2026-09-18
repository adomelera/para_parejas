import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TherapistBioComponent } from '../../components/therapist-bio/therapist-bio';
import { APP_CONFIG, STUDIO_DATA, THERAPIST_DATA } from '../../data/tantra-data';

@Component({
  selector: 'app-space-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, TherapistBioComponent],
  template: `
    <div class="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-8 pb-28">
      <!-- Header Banner -->
      <section class="flex flex-col gap-2 bg-surface p-6 sm:p-8 rounded-3xl border border-neutral/8">
        <div class="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-white text-tertiary text-xs font-semibold shadow-xs">
          <span class="material-symbols-outlined text-[16px]">verified_user</span>
          <span>Santuario Somático · Barcelona & Molins de Rei</span>
        </div>
        <h1 class="font-editorial text-3xl sm:text-4xl text-neutral-dark font-medium leading-tight">
          Espacios & Marco Ético
        </h1>
        <p class="text-sm sm:text-base text-neutral-muted leading-relaxed">
          Clases de parejas en <strong>Casa Lazar (Barcelona)</strong> con 80 m² de luz natural y terraza de 30 m² al mar. Sesiones privadas en <strong>Molins de Rei</strong>, <strong>online</strong> o <strong>a domicilio</strong>.
        </p>
      </section>

      <!-- Atmosphere Features Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        @for (feature of studio.features; track feature.title) {
          <div class="bg-white p-5 rounded-2xl border border-neutral/6 shadow-2xs flex flex-col gap-2">
            <div class="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
              <span class="material-symbols-outlined text-[20px]">{{ feature.icon }}</span>
            </div>
            <h3 class="font-editorial text-base text-neutral-dark font-medium">
              {{ feature.title }}
            </h3>
            <p class="text-xs text-neutral-muted leading-relaxed">
              {{ feature.description }}
            </p>
          </div>
        }
      </div>

      <!-- Safe Sanctuary & Consent Manifesto -->
      <section class="bg-surface-variant p-6 sm:p-7 rounded-2xl border border-tertiary/30 flex flex-col gap-4">
        <div class="flex items-center gap-2 text-tertiary">
          <span class="material-symbols-outlined text-[24px]">shield</span>
          <h3 class="font-editorial text-xl text-neutral-dark font-medium">
            Marco Ético y de Consentimiento Explícito
          </h3>
        </div>

        <p class="text-xs sm:text-sm text-neutral-muted leading-relaxed">
          En consulta y talleres, la soberanía sobre el propio cuerpo es inviolable. No hay dogmas místicos forzados ni presiones para sobrepasar límites:
        </p>

        <div class="space-y-2.5 text-xs sm:text-sm text-neutral-dark">
          <div class="flex items-start gap-2.5">
            <span class="material-symbols-outlined text-secondary text-[18px] mt-0.5">check_circle</span>
            <span><strong>Regla de la pausa inmediata:</strong> En cualquier momento puedes decir «pausa» o «hasta aquí» sin tener que dar explicaciones ni sentir culpa.</span>
          </div>
          <div class="flex items-start gap-2.5">
            <span class="material-symbols-outlined text-secondary text-[18px] mt-0.5">check_circle</span>
            <span><strong>Inclusividad plena:</strong> Espacio afirmativo LGTBIQ+, monógamo, no monógamo y de identidades diversas. Todos los cuerpos y ritmos son bienvenidos.</span>
          </div>
          <div class="flex items-start gap-2.5">
            <span class="material-symbols-outlined text-secondary text-[18px] mt-0.5">check_circle</span>
            <span><strong>Sin exigencias de desnudez:</strong> Todo el trabajo de respiración y conexión en talleres grupales se realiza con ropa cómoda y respetando tu pudor.</span>
          </div>
        </div>
      </section>

      <!-- Therapist Profile -->
      <app-therapist-bio [therapist]="therapist" />

      <!-- Location & Access Card -->
      <section class="bg-white p-6 sm:p-7 rounded-2xl border border-neutral/8 shadow-xs flex flex-col gap-5">
        <div class="flex items-center gap-2 text-secondary">
          <span class="material-symbols-outlined text-[22px]">apartment</span>
          <h3 class="font-editorial text-xl text-neutral-dark font-medium">
            Sedes y Ubicaciones
          </h3>
        </div>

        <!-- Clases de Parejas: Casa Lazar -->
        <div class="p-4 rounded-xl bg-surface border border-neutral/8 flex flex-col gap-3">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-wider">
              Clases Grupales de Parejas
            </span>
            <span class="text-xs text-neutral-muted">3er miércoles de mes</span>
          </div>

          <div class="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-muted">
            <span class="material-symbols-outlined text-primary text-[18px] mt-0.5 shrink-0">pin_drop</span>
            <div>
              <strong class="text-neutral-dark block text-sm">Casa Lazar (Barcelona)</strong>
              <span>C/ Pere IV, 29, 7º 4ª Ático, 08018 Barcelona</span>
              <div class="mt-1 text-xs text-secondary font-medium">
                Metro &lt;M&gt; Bogatell (L4, a 2 min) · &lt;M&gt; Marina (L1)
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs text-neutral-muted border-t border-neutral/8">
            <div class="flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[16px] text-tertiary">wb_sunny</span>
              <span>Sala de 80 m² con luz natural y equipo de sonido</span>
            </div>
            <div class="flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[16px] text-tertiary">volume_off</span>
              <span>Acondicionada acústicamente</span>
            </div>
            <div class="flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[16px] text-tertiary">deck</span>
              <span>Terraza de 30 m² con vistas al mar</span>
            </div>
            <div class="flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[16px] text-tertiary">chair</span>
              <span>Zona de recepción y bienvenida</span>
            </div>
          </div>
        </div>

        <!-- Sesiones Privadas -->
        <div class="p-4 rounded-xl bg-surface-variant/60 border border-neutral/8 flex flex-col gap-3">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded-full bg-secondary/15 text-secondary text-[11px] font-bold uppercase tracking-wider">
              Sesiones Privadas
            </span>
            <span class="text-xs text-neutral-muted">Pareja e Individual</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-neutral-muted">
            <div class="p-2.5 rounded-lg bg-white border border-neutral/6">
              <strong class="text-neutral-dark block font-semibold mb-0.5">Online</strong>
              <span>Por videollamada desde la intimidad de tu hogar.</span>
            </div>
            <div class="p-2.5 rounded-lg bg-white border border-neutral/6">
              <strong class="text-neutral-dark block font-semibold mb-0.5">En Molins de Rei</strong>
              <span>Consulta presencial serena con futón y aceites tibios.</span>
            </div>
            <div class="p-2.5 rounded-lg bg-white border border-neutral/6">
              <strong class="text-neutral-dark block font-semibold mb-0.5">A Domicilio</strong>
              <span>Me desplazo a tu domicilio con todo el material.</span>
            </div>
          </div>
        </div>

        <div class="pt-1">
          <a
            routerLink="/reservar"
            class="w-full py-3.5 px-5 bg-secondary text-white text-xs sm:text-sm font-semibold rounded-xl text-center hover:bg-secondary-hover transition-colors flex items-center justify-center gap-2"
          >
            <span class="material-symbols-outlined text-[18px]">calendar_today</span>
            <span>Reservar Plaza de Clase o Sesión Privada</span>
          </a>
        </div>
      </section>
    </div>
  `
})
export class SpaceViewComponent {
  readonly appConfig = APP_CONFIG;
  readonly studio = STUDIO_DATA;
  readonly therapist = THERAPIST_DATA;
}
