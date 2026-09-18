import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  output,
  signal
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookingSubmission } from '../../models/tantra.models';

@Component({
  selector: 'app-booking-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  template: `
    <div class="bg-white p-5 sm:p-7 rounded-2xl border border-neutral/8 shadow-[0_4px_20px_rgba(44,45,42,0.04)] flex flex-col gap-5">
      <!-- Direct WhatsApp Action Button -->
      <a
        [href]="whatsAppUrl()"
        target="_blank"
        rel="noopener noreferrer"
        class="w-full py-3.5 px-4 bg-tertiary text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-sm hover:bg-tertiary-container transition-all active:scale-[0.98]"
      >
        <span class="material-symbols-outlined text-[20px]">chat</span>
        <span>Escríbe directamente por WhatsApp</span>
      </a>

      <!-- Divider -->
      <div class="flex items-center gap-3 my-0.5">
        <div class="h-px bg-neutral/10 flex-1"></div>
        <span class="text-[11px] text-neutral-subtle uppercase tracking-wider font-semibold">
          o rellena este formulario
        </span>
        <div class="h-px bg-neutral/10 flex-1"></div>
      </div>

      <!-- Reactive Form -->
      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="flex flex-col gap-4">
        <!-- Names -->
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-semibold text-neutral-dark" for="names">
            Vuestros Nombres *
          </label>
          <input
            id="names"
            type="text"
            formControlName="names"
            placeholder="Ej: Clara y Marc"
            class="w-full px-4 py-2.5 rounded-xl bg-surface text-neutral-dark text-sm border border-neutral/12 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
          />
          @if (form.controls.names.touched && form.controls.names.invalid) {
            <span class="text-xs text-error">Por favor, indicad vuestros nombres.</span>
          }
        </div>

        <!-- Email -->
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-semibold text-neutral-dark" for="email">
            Correo Electrónico de Contacto *
          </label>
          <input
            id="email"
            type="email"
            formControlName="email"
            placeholder="tu@email.com"
            class="w-full px-4 py-2.5 rounded-xl bg-surface text-neutral-dark text-sm border border-neutral/12 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
          />
          @if (form.controls.email.touched && form.controls.email.invalid) {
            <span class="text-xs text-error">Por favor, indicad un correo electrónico válido.</span>
          }
        </div>

        <!-- Service / Experience Selection -->
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-semibold text-neutral-dark" for="serviceId">
            ¿Qué os gustaría experimentar?
          </label>
          <select
            id="serviceId"
            formControlName="serviceId"
            class="w-full px-4 py-2.5 rounded-xl bg-surface text-neutral-dark text-sm border border-neutral/12 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all cursor-pointer"
          >
            <option value="taller-mensual">Clases de Parejas (3er miércoles de mes, Casa Lazar) - 40€/pareja</option>
            <option value="terapia-vinculo">Sesión Privada de Pareja - 90€ (90 min)</option>
            <option value="sesion-individual">Sesión Individual de Reconexión - 60€ (60 min)</option>
            <option value="masaje-tantrico">Masaje Somático Tántrico - 90€ (90 min)</option>
            <option value="consulta-previa">Consulta de orientación previa (sin coste)</option>
          </select>
        </div>

        <!-- Modality & Location Selector / Information -->
        @if (form.controls.serviceId.value === 'taller-mensual') {
          <div class="p-3.5 rounded-xl bg-surface border border-primary/20 text-xs text-neutral-dark flex items-start gap-2.5">
            <span class="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">apartment</span>
            <div>
              <strong class="font-semibold text-primary block">Ubicación de las Clases: Casa Lazar</strong>
              <span class="text-neutral-muted block">C/ Pere IV, 29, 7º 4ª Ático, 08018 Barcelona (Metro &lt;M&gt; Bogatell L4).</span>
              <span class="text-[11px] text-neutral-subtle block mt-0.5">Sala de 80 m² con luz natural y equipo de sonido, acústica acondicionada, recepción y terraza de 30 m² con vistas al mar.</span>
            </div>
          </div>
        } @else {
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-semibold text-neutral-dark" for="modalityLocation">
              Modalidad de la Sesión *
            </label>
            <select
              id="modalityLocation"
              formControlName="modalityLocation"
              class="w-full px-4 py-2.5 rounded-xl bg-surface text-neutral-dark text-sm border border-neutral/12 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all cursor-pointer"
            >
              <option value="Online (Videollamada)">Online (por videollamada)</option>
              <option value="En Molins de Rei (Consulta)">En Molins de Rei (consulta presencial acondicionada)</option>
              <option value="A Domicilio (Barcelona y área metropolitana)">A Domicilio (me desplazo a vuestro hogar)</option>
            </select>
          </div>
        }

        <!-- Optional Date Preference -->
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-semibold text-neutral-dark" for="preferredDate">
            Preferencia de fecha / día (opcional)
          </label>
          <input
            id="preferredDate"
            type="text"
            formControlName="preferredDate"
            placeholder="Ej: 21 Oct de 2026 (o consulta entre semana)"
            class="w-full px-4 py-2.5 rounded-xl bg-surface text-neutral-dark text-sm border border-neutral/12 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
          />
        </div>

        <!-- Notes / Comments -->
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-semibold text-neutral-dark" for="notes">
            Comentario o momento del vínculo (opcional)
          </label>
          <textarea
            id="notes"
            rows="3"
            formControlName="notes"
            placeholder="¿Alguna inquietud o necesidad que queráis compartir con Ado?"
            class="w-full px-4 py-2.5 rounded-xl bg-surface text-neutral-dark text-sm border border-neutral/12 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all resize-y"
          ></textarea>
        </div>

        <!-- Consent / Privacy Notice Checkbox -->
        <div class="flex items-start gap-2.5 pt-1">
          <input
            id="consent"
            type="checkbox"
            formControlName="consentAgreed"
            class="mt-1 h-4 w-4 rounded text-primary border-neutral/20 focus:ring-primary"
          />
          <label for="consent" class="text-xs text-neutral-muted leading-relaxed cursor-pointer">
            Entiendo que es un espacio basado en el consentimiento estricto, la confidencialidad y el respeto mutuo.
          </label>
        </div>
        @if (form.controls.consentAgreed.touched && form.controls.consentAgreed.invalid) {
          <span class="text-xs text-error">Debéis aceptar el marco de consentimiento y respeto.</span>
        }

        <!-- Submit Button -->
        <div class="pt-2">
          <button
            type="submit"
            [disabled]="isSubmitting()"
            class="w-full py-3.5 px-6 bg-primary text-white text-sm font-semibold rounded-xl shadow-md hover:bg-primary-hover transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            @if (isSubmitting()) {
              <span class="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
              <span>Enviando solicitud...</span>
            } @else {
              <span class="material-symbols-outlined text-[18px]">send</span>
              <span>Solicitar Información & Plaza</span>
            }
          </button>
        </div>

        <!-- Success Toast -->
        @if (submittedSuccess()) {
          <div class="p-4 bg-tertiary/15 border border-tertiary/30 text-on-tertiary-fixed rounded-xl text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in">
            <span class="material-symbols-outlined text-tertiary text-[20px] shrink-0">check_circle</span>
            <div>
              <strong class="font-semibold block">¡Solicitud recibida con calidez!</strong>
              <p class="mt-0.5">Te respondero en menos de 24 horas con los detalles y la confirmación de la cita o taller.</p>
            </div>
          </div>
        }
      </form>
    </div>
  `
})
export class BookingFormComponent {
  readonly initialServiceId = input<string>('taller-mensual');
  readonly initialPreferredDate = input<string>('');
  readonly submitBooking = output<BookingSubmission>();

  readonly isSubmitting = signal<boolean>(false);
  readonly submittedSuccess = signal<boolean>(false);

  readonly form = new FormGroup({
    names: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    serviceId: new FormControl('taller-mensual', { nonNullable: true, validators: [Validators.required] }),
    modalityLocation: new FormControl('Online (Videollamada)', { nonNullable: true }),
    preferredDate: new FormControl('', { nonNullable: true }),
    notes: new FormControl('', { nonNullable: true }),
    consentAgreed: new FormControl(true, { nonNullable: true, validators: [Validators.requiredTrue] })
  });

  constructor() {
    effect(() => {
      const initService = this.initialServiceId();
      if (initService) {
        this.form.controls.serviceId.setValue(initService);
      }
    });

    effect(() => {
      const initDate = this.initialPreferredDate();
      if (initDate) {
        this.form.controls.preferredDate.setValue(initDate);
      }
    });
  }

  whatsAppUrl(): string {
    const text = encodeURIComponent(
      'Hola Ado, nos gustaría recibir información sobre los talleres y sesiones para parejas en Barcelona.'
    );
    return `https://wa.me/34680760473?text=${text}`;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    const isWorkshop = this.form.controls.serviceId.value === 'taller-mensual';
    const submission: BookingSubmission = {
      names: this.form.controls.names.value,
      email: this.form.controls.email.value,
      serviceId: this.form.controls.serviceId.value,
      modalityLocation: isWorkshop
        ? 'Casa Lazar (C/ Pere IV, 29 7º 4º Ático, Barcelona <M> Bogatell)'
        : this.form.controls.modalityLocation.value,
      preferredDate: this.form.controls.preferredDate.value,
      notes: this.form.controls.notes.value,
      timestamp: new Date()
    };

    setTimeout(() => {
      this.isSubmitting.set(false);
      this.submittedSuccess.set(true);
      this.submitBooking.emit(submission);

      setTimeout(() => {
        this.submittedSuccess.set(false);
        this.form.reset({
          names: '',
          email: '',
          serviceId: 'taller-mensual',
          preferredDate: '',
          notes: '',
          consentAgreed: true
        });
      }, 7000);
    }, 600);
  }
}
