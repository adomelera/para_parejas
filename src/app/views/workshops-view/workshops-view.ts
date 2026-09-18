import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FaqAccordionComponent } from '../../components/faq-accordion/faq-accordion';
import { WorkshopCardComponent } from '../../components/workshop-card/workshop-card';
import { APP_CONFIG, FAQ_DATA, WORKSHOP_DATA } from '../../data/tantra-data';

@Component({
  selector: 'app-workshops-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [WorkshopCardComponent, FaqAccordionComponent],
  template: `
    <div class="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-8 pb-28">
      <!-- Header Banner -->
      <section class="flex flex-col gap-2 bg-surface p-6 sm:p-8 rounded-3xl border border-neutral/8">
        <div class="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-white text-primary text-xs font-semibold shadow-xs">
          <span class="material-symbols-outlined text-[16px]">event</span>
          <span>Clases Regulares para Parejas</span>
        </div>
        <h1 class="font-editorial text-3xl sm:text-4xl text-neutral-dark font-medium leading-tight">
          Clases de Parejas: 3er Miércoles de Mes
        </h1>
        <p class="text-sm sm:text-base text-neutral-muted leading-relaxed">
          De octubre a junio (de 19:00 a 21:00) en <strong>Casa Lazar (Barcelona)</strong>. Una amplia sala de 80 m² con luz natural y equipo de sonido, acondicionada acústicamente, zona de recepción y terraza de 30 m² con vistas al mar.
        </p>
      </section>

      <!-- Featured Workshop Card -->
      <app-workshop-card
        [workshop]="workshop"
        (reserve)="handleReserveWorkshop($event)"
      />

      

      <!-- Practical Notes -->
      <section class="bg-surface-variant p-6 rounded-2xl border border-neutral/8 flex flex-col gap-3">
        <h4 class="font-editorial text-lg text-neutral-dark font-medium flex items-center gap-2">
          <span class="material-symbols-outlined text-secondary">info</span>
          <span>Información Práctica para Asistir</span>
        </h4>
        <ul class="text-xs sm:text-sm text-neutral-muted space-y-2 pl-4 list-disc">
          <li><strong>Ubicación:</strong> Casa Lazar · C/ Pere IV, 29, 7º 4ª Ático, 08018 Barcelona (Metro &lt;M&gt; Bogatell L4).</li>
          <li><strong>Instalaciones:</strong> Sala de 80 m² con abundante luz natural y equipo de sonido, acondicionada acústicamente, zona de recepción y terraza de 30 m² con vistas al mar.</li>
          <li><strong>Horario:</strong> 19:00h a 21:00h (3er miércoles de cada mes, de octubre a junio). Apertura de puertas a las 18:45h.</li>
          <li><strong>Indumentaria:</strong> Ropa cómoda, preferiblemente de fibras naturales (algodón, lino) que permita sentarse y moverse en el suelo con holgura.</li>
          <li><strong>Comida:</strong> Es recomendable evitar comidas copiosas en las dos horas previas al taller.</li>
        </ul>
      </section>

      <!-- Workshop FAQs Section -->
      <section class="flex flex-col gap-4">
        <h4 class="font-editorial text-xl text-neutral-dark font-medium">
          Dudas Frecuentes sobre el Taller
        </h4>
        <div class="flex flex-col gap-3">
          @for (faq of faqs; track faq.id) {
            <app-faq-accordion
              [faq]="faq"
              [isOpen]="openFaqId() === faq.id"
              (toggleOpen)="handleToggleFaq($event)"
            />
          }
        </div>
      </section>
    </div>
  `
})

      // <!-- Workshop Timeline Breakdown -->
      // <section class="bg-white p-6 sm:p-7 rounded-2xl border border-neutral/8 shadow-xs flex flex-col gap-5">
      //   <div class="flex flex-col gap-1">
      //     <span class="text-xs text-secondary uppercase tracking-wider font-semibold">
      //       Estructura Pedagógica
      //     </span>
      //     <h3 class="font-editorial text-xl sm:text-2xl text-neutral-dark font-medium">
      //       ¿Qué ocurre durante las 2 horas?
      //     </h3>
      //   </div>

      //   <div class="space-y-4 text-xs sm:text-sm text-neutral-muted">
      //     <div class="p-3.5 rounded-xl bg-surface border border-neutral/6 flex items-start gap-3">
      //       <span class="font-mono font-bold text-xs text-secondary bg-white px-2 py-1 rounded-md shadow-2xs">
      //         00 - 20 min
      //       </span>
      //       <div>
      //         <strong class="text-neutral-dark block mb-0.5">Aterrizaje en el Cuerpo & Calibración Vagal</strong>
      //         Llegada serena, infusión de hierbas, descarga de la prisa urbana y primeras pautas para habitar el silencio juntos.
      //       </div>
      //     </div>

      //     <div class="p-3.5 rounded-xl bg-surface border border-neutral/6 flex items-start gap-3">
      //       <span class="font-mono font-bold text-xs text-secondary bg-white px-2 py-1 rounded-md shadow-2xs">
      //         20 - 50 min
      //       </span>
      //       <div>
      //         <strong class="text-neutral-dark block mb-0.5">Respiración Sincronizada y Mapas de Sensibilidad</strong>
      //         Ejercicios diafragmáticos sentados frente a frente. Aprendemos a leer el pulso del otro sin exigencia de rendimiento.
      //       </div>
      //     </div>

      //     <div class="p-3.5 rounded-xl bg-surface border border-neutral/6 flex items-start gap-3">
      //       <span class="font-mono font-bold text-xs text-secondary bg-white px-2 py-1 rounded-md shadow-2xs">
      //         50 - 90 min
      //       </span>
      //       <div>
      //         <strong class="text-neutral-dark block mb-0.5">El Tacto sin Demanda y Consentimiento Gradual</strong>
      //         La práctica nuclear: una persona entrega presencia a través de un contacto atento en manos, cuello y rostro, mientras la otra reposa y recibe con total libertad.
      //       </div>
      //     </div>

      //     <div class="p-3.5 rounded-xl bg-surface border border-neutral/6 flex items-start gap-3">
      //       <span class="font-mono font-bold text-xs text-secondary bg-white px-2 py-1 rounded-md shadow-2xs">
      //         90 - 120 min
      //       </span>
      //       <div>
      //         <strong class="text-neutral-dark block mb-0.5">Descanso Compartido, Silencio e Integración</strong>
      //         Momento de relajación sobre las esterillas de lino, integración sensorial y pautas para seguir nutriendo el vínculo en casa.
      //       </div>
      //     </div>
      //   </div>
      // </section>


export class WorkshopsViewComponent {
  private readonly router = inject(Router);

  readonly appConfig = APP_CONFIG;
  readonly workshop = WORKSHOP_DATA;
  readonly faqs = FAQ_DATA;
  readonly openFaqId = signal<string>('');

  handleToggleFaq(id: string): void {
    this.openFaqId.update((current) => (current === id ? '' : id));
  }

  handleReserveWorkshop(dateId: string): void {
    this.router.navigate(['/reservar'], { queryParams: { service: 'taller-mensual', date: dateId } });
  }
}
