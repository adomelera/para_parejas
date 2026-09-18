import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingFormComponent } from '../../components/booking-form/booking-form';
import { APP_CONFIG, SESSIONS_DATA, WORKSHOP_DATA } from '../../data/tantra-data';
import { BookingSubmission } from '../../models/tantra.models';

@Component({
  selector: 'app-booking-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BookingFormComponent],
  template: `
    <div class="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-8 pb-28">
      <!-- Header Banner -->
      <section class="flex flex-col gap-2 bg-surface-variant/80 p-6 sm:p-8 rounded-3xl border border-neutral/6">
        <div class="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-white text-primary text-xs font-semibold shadow-xs">
          <span class="material-symbols-outlined text-[16px]">calendar_month</span>
          <span>Reserva & Contacto</span>
        </div>
        <h1 class="font-editorial text-3xl sm:text-4xl text-neutral-dark font-medium leading-tight">
          Solicitar Plaza o Sesión
        </h1>
        <p class="text-sm sm:text-base text-neutral-muted leading-relaxed">
          Indicad qué experiencia os interesa o explicad vuestra inquietud. Contesto en menos de 24 horas con la máxima discreción para acordar fecha y resolver cualquier duda.
        </p>
      </section>

      <!-- Quick Service Selector Pills -->
      <div class="flex flex-col gap-2">
        <span class="text-xs font-semibold uppercase tracking-wider text-secondary">
          Selecciona una experiencia:
        </span>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button
            type="button"
            (click)="selectedService.set('taller-mensual')"
            class="p-3.5 rounded-xl border text-left flex items-center justify-between transition-all"
            [class]="selectedService() === 'taller-mensual' ? 'bg-primary/10 border-primary shadow-xs' : 'bg-white border-neutral/10 hover:bg-surface'"
          >
            <div>
              <span class="text-xs font-bold block text-neutral-dark">Taller Mensual Parejas</span>
              <span class="text-[11px] text-neutral-muted">2 horas · Grupo reducido</span>
            </div>
            <span class="text-xs font-bold text-primary">40€ / pareja</span>
          </button>

          <button
            type="button"
            (click)="selectedService.set('terapia-vinculo')"
            class="p-3.5 rounded-xl border text-left flex items-center justify-between transition-all"
            [class]="selectedService() === 'terapia-vinculo' ? 'bg-secondary/10 border-secondary shadow-xs' : 'bg-white border-neutral/10 hover:bg-surface'"
          >
            <div>
              <span class="text-xs font-bold block text-neutral-dark">Terapia de Vínculo</span>
              <span class="text-[11px] text-neutral-muted">90 min · Sesión de pareja</span>
            </div>
            <span class="text-xs font-bold text-secondary">90€</span>
          </button>

          <button
            type="button"
            (click)="selectedService.set('masaje-tantrico')"
            class="p-3.5 rounded-xl border text-left flex items-center justify-between transition-all"
            [class]="selectedService() === 'masaje-tantrico' ? 'bg-primary/10 border-primary shadow-xs' : 'bg-white border-neutral/10 hover:bg-surface'"
          >
            <div>
              <span class="text-xs font-bold block text-neutral-dark">Masaje Tántrico Somático</span>
              <span class="text-[11px] text-neutral-muted">90 min · Sobre tatami</span>
            </div>
            <span class="text-xs font-bold text-primary">90€</span>
          </button>

          <button
            type="button"
            (click)="selectedService.set('sesion-individual')"
            class="p-3.5 rounded-xl border text-left flex items-center justify-between transition-all"
            [class]="selectedService() === 'sesion-individual' ? 'bg-tertiary/15 border-tertiary shadow-xs' : 'bg-white border-neutral/10 hover:bg-surface'"
          >
            <div>
              <span class="text-xs font-bold block text-neutral-dark">Sesión Individual</span>
              <span class="text-[11px] text-neutral-muted">60 min · Reconexión</span>
            </div>
            <span class="text-xs font-bold text-tertiary">60€</span>
          </button>
        </div>
      </div>

      <!-- Booking Form Component -->
      <app-booking-form
        [initialServiceId]="selectedService()"
        [initialPreferredDate]="initialDate()"
        (submitBooking)="handleSubmission($event)"
      />

      <!-- Studio & Location Reminder -->
      <section class="bg-white p-5 rounded-2xl border border-neutral/8 flex items-start gap-4">
        <div class="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0 mt-0.5">
          <span class="material-symbols-outlined text-[24px]">apartment</span>
        </div>
        <div class="text-xs sm:text-sm text-neutral-muted leading-relaxed">
          <strong class="text-neutral-dark block mb-0.5">Clases en Casa Lazar & Sesiones Flexibles</strong>
          <span><strong>Clases de Parejas:</strong> Casa Lazar (C/ Pere IV, 29 7º 4ª Ático, Barcelona &lt;M&gt; Bogatell). Sala de 80 m² con luz natural y equipo de sonido, acondicionada acústicamente, y terraza de 30 m² con vistas al mar.</span>
          <br />
          <span class="mt-1 block"><strong>Sesiones Privadas:</strong> Disponibles online (videollamada), presenciales en Molins de Rei o directamente a domicilio.</span>
        </div>
      </section>
    </div>
  `
})
export class BookingViewComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);

  readonly appConfig = APP_CONFIG;
  readonly workshop = WORKSHOP_DATA;
  readonly sessions = SESSIONS_DATA;

  readonly selectedService = signal<string>('taller-mensual');
  readonly initialDate = signal<string>('');

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['service']) {
        this.selectedService.set(params['service']);
      }
      if (params['date']) {
        const found = this.workshop.dates.find((d) => d.id === params['date']);
        if (found) {
          this.initialDate.set(`${found.dateStr} (19:00 - 21:00)`);
        } else {
          this.initialDate.set(params['date']);
        }
      }
    });
  }

  handleSubmission(submission: BookingSubmission): void {
    console.log('Reserva confirmada en pantalla de reservas:', submission);
  }
}
