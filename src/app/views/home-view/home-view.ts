import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BookingFormComponent } from '../../components/booking-form/booking-form';
import { FaqAccordionComponent } from '../../components/faq-accordion/faq-accordion';
import { MicroRitualComponent } from '../../components/micro-ritual/micro-ritual';
import { PillarCardComponent } from '../../components/pillar-card/pillar-card';
import { SessionCardComponent } from '../../components/session-card/session-card';
import { TherapistBioComponent } from '../../components/therapist-bio/therapist-bio';
import { WorkshopCardComponent } from '../../components/workshop-card/workshop-card';
import {
  APP_CONFIG,
  FAQ_DATA,
  MICRO_RITUALS_DATA,
  PILLARS_DATA,
  RELATIONS_DATA,
  SESSIONS_DATA,
  THERAPIST_DATA,
  WORKSHOP_DATA
} from '../../data/tantra-data';
import { BookingSubmission } from '../../models/tantra.models';

@Component({
  selector: 'app-home-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    PillarCardComponent,
    MicroRitualComponent,
    SessionCardComponent,
    WorkshopCardComponent,
    TherapistBioComponent,
    FaqAccordionComponent,
    BookingFormComponent
  ],
  template: `
    <div class="flex flex-col w-full">
      <!-- HERO SECTION -->
      <section
        class="px-4 sm:px-6 pt-6 pb-12 sm:pb-16 flex flex-col gap-4 max-w-2xl mx-auto rounded-b-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] bg-surface-warm"
      >
        <!-- Location Pill -->
        <div
          class="inline-flex items-center gap-1.5 self-start px-3.5 py-1.5 rounded-full bg-white shadow-xs text-secondary"
        >
          <span class="material-symbols-outlined text-[15px] fill-1 text-secondary">location_on</span>
          <span class="text-xs font-semibold tracking-wider uppercase">
            {{ appConfig.location }}
          </span>
        </div>

        <!-- Title & Subtitle -->
        <div class="flex flex-col gap-1">
          <h1 class="font-editorial text-3xl sm:text-4xl lg:text-5xl text-neutral-dark tracking-tight leading-tight font-semibold">
            {{ appConfig.brandName }}
          </h1>
          <p class="font-editorial italic font-normal text-xl sm:text-2xl text-primary">
            {{ appConfig.tagline }}
          </p>
        </div>

        <!-- Narrative Description -->
        <p class="text-sm sm:text-base text-neutral-muted leading-relaxed">
          {{ appConfig.heroSubtitle }}
        </p>

        <!-- Hero Couple Photography Frame -->
        <div
          class="relative w-full rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(44,45,42,0.08)] aspect-[16/9] bg-secondary"
        >
          <img
            [src]="appConfig.images.hero"
            alt="Pareja conectando conscientemente en Barcelona"
            class="w-full h-full object-cover"
          />
          <div
            class="absolute bottom-2.5 right-2.5 px-3 py-1 rounded-full bg-surface/90 backdrop-blur-md text-neutral-dark text-[11px] flex items-center gap-1.5 shadow-sm font-medium"
          >
            <span class="w-2 h-2 rounded-full bg-primary"></span>
            <span>Casa Lazar · 80m² & Terraza al Mar</span>
          </div>
        </div>

        <!-- Pill Trust Badges -->
        <div class="flex flex-wrap gap-2 pt-1">
          <span
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-neutral-muted text-xs font-medium shadow-xs"
          >
            <span class="material-symbols-outlined text-secondary text-[16px]">verified</span>
            <span>Consentimiento informado</span>
          </span>
          <span
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-neutral-muted text-xs font-medium shadow-xs"
          >
            <span class="material-symbols-outlined text-primary text-[16px]">diversity_1</span>
            <span>LGTBIQ+ Afirmativo</span>
          </span>
          <span
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-neutral-muted text-xs font-medium shadow-xs"
          >
            <span class="material-symbols-outlined text-tertiary text-[16px]">psychology</span>
            <span>Sin dogmas esotéricos</span>
          </span>
        </div>

        <!-- Primary Actions -->
        <div class="flex flex-col sm:flex-row gap-3 pt-2">
          <a
            routerLink="/talleres"
            class="w-full sm:w-auto text-center px-6 py-3.5 bg-primary text-white text-xs sm:text-sm font-semibold rounded-xl shadow-[0_4px_14px_rgba(200,100,70,0.28)] hover:bg-primary-hover transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
          >
            <span class="material-symbols-outlined text-[18px]">calendar_today</span>
            <span>Ver Clases de Parejas (2h)</span>
          </a>
          <a
            href="#laboratorio-casero"
            class="w-full sm:w-auto text-center px-5 py-3.5 bg-white text-secondary text-xs sm:text-sm font-semibold rounded-xl shadow-xs border border-secondary/15 hover:bg-surface-variant transition-colors flex items-center justify-center gap-2"
          >
            <span class="material-symbols-outlined text-[18px]">auto_stories</span>
            <span>Prácticas para casa</span>
          </a>
        </div>
      </section>

      <!-- FUNDAMENTO CLÍNICO & RELACIONAL SECTION -->
      <section class="px-4 sm:px-6 py-12 sm:py-16 my-2 bg-surface-calm">
        <div class="max-w-2xl mx-auto flex flex-col gap-6">
          <div class="flex flex-col gap-1">
            <span class="text-xs text-secondary uppercase tracking-wider font-semibold">
              Fundamento Clínico & Relacional
            </span>
            <h2 class="font-editorial text-2xl sm:text-3xl text-neutral-dark font-medium leading-tight">
              ¿Por qué Tantra Pragmático?
            </h2>
            <p class="text-sm sm:text-base text-neutral-muted pt-1 leading-relaxed">
              Despojamos el tantra de clichés inaccesibles o esotéricos para abordarlo como una rigurosa tecnología somática y de reconexión íntima.
            </p>
          </div>

          <!-- Tactile Somatic Image -->
          <div
            class="relative w-full rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] aspect-[16/9] bg-white"
          >
            <img
              [src]="appConfig.images.somaticTouch"
              alt="Manos en contacto somático y regulación vagal consciente"
              class="w-full h-full object-cover"
            />
            <div
              class="absolute bottom-2.5 left-2.5 px-3 py-1 rounded-full bg-surface/90 backdrop-blur-md text-secondary text-[11px] flex items-center gap-1.5 shadow-sm font-medium"
            >
              <span class="material-symbols-outlined text-[14px]">touch_app</span>
              <span>Regulación Vagal & Tacto Consciente</span>
            </div>
          </div>

          <!-- 3 Pillars List -->
          <div class="flex flex-col gap-3">
            @for (pillar of pillars; track pillar.number) {
              <app-pillar-card [pillar]="pillar" />
            }
          </div>
        </div>
      </section>

      <!-- LABORATORIO EN EL HOGAR (RITUALES) -->
      <section
        id="laboratorio-casero"
        class="px-4 sm:px-6 py-12 sm:py-16 max-w-2xl mx-auto w-full flex flex-col gap-6"
      >
        <div class="flex flex-col gap-1">
          <span class="text-xs text-secondary uppercase tracking-wider font-semibold">
            Laboratorio en el Hogar
          </span>
          <h2 class="font-editorial text-2xl sm:text-3xl text-neutral-dark font-medium leading-tight">
            Micro-rituales para practicar en casa
          </h2>
          <p class="text-sm text-neutral-muted leading-relaxed">
            La intimidad no se improvisa: se nutre con pequeños momentos de atención plena compartida antes de dormir o al despertar.
          </p>
        </div>

        <!-- Two Women Connection Image & Quote -->
        <div class="rounded-2xl overflow-hidden border border-neutral/8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] bg-white">
          <img
            [src]="appConfig.images.homeRituals"
            alt="Pareja compartiendo un momento íntimo de conexión somática"
            class="w-full h-56 sm:h-64 object-cover"
          />
          <div class="p-4 bg-white text-center">
            <p class="font-editorial italic text-sm sm:text-base text-neutral-muted">
              «Basta un contacto sin prisa para que el cuerpo recuerde que está a salvo.»
            </p>
          </div>
        </div>

        <!-- Interactive Practices List -->
        <div class="flex flex-col gap-3">
          @for (ritual of microRituals; track ritual.id) {
            <app-micro-ritual
              [ritual]="ritual"
              [isOpen]="openRitualId() === ritual.id"
              (toggleOpen)="handleToggleRitual($event)"
            />
          }
        </div>
      </section>

      <!-- PRÓXIMO TALLER PRESENCIAL EN BARCELONA (2H) -->
      <section class="bg-surface-container-high/70 px-4 sm:px-6 py-12 sm:py-16" id="taller-presencial">
        <div class="max-w-2xl mx-auto flex flex-col gap-6">
          <div class="text-center sm:text-left flex flex-col gap-1">
            <span class="text-xs text-primary uppercase font-bold tracking-widest">
              Casa Lazar (&lt;M&gt; Bogatell) · 3er Miércoles de Mes
            </span>
            <h2 class="font-editorial text-2xl sm:text-3xl text-neutral-dark font-medium">
              Clases de Parejas en Casa Lazar (Barcelona)
            </h2>
          </div>

          <app-workshop-card
            [workshop]="workshop"
            (reserve)="goToBookingWithWorkshop($event)"
          />
        </div>
      </section>


       <!-- PARA QUIEN -->
      <section class="px-4 sm:px-6 py-12 sm:py-16 bg-surface-calm">
        <div class="max-w-2xl mx-auto flex flex-col gap-6">
          <div class="flex flex-col gap-1">
            <span class="text-xs text-secondary uppercase tracking-wider font-semibold">
              Todo tipo de relaciones y parejas
            </span>
            <h2 class="font-editorial text-2xl sm:text-3xl text-neutral-dark font-medium leading-tight">
              ¿Para quién es este espacio?
            </h2>
            <p class="text-sm sm:text-base text-neutral-muted pt-1 leading-relaxed">
              Este espacio nace para abrazar el encuentro afectivo en todas sus expresiones, edades y trayectorias. Aquí caben todas las identidades: parejas y vínculos en su infinita diversidad.
            </p>
          </div>

          <!-- For All Image -->
          <div
            class="relative w-full rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] aspect-[16/9] bg-white"
          >
            <img
              [src]="appConfig.images.forAll"
              alt="Pareja mayor abrazandose y conectando conscientemente en Barcelona"
              class="w-full h-full object-cover"
            />
            <div
              class="absolute bottom-2.5 left-2.5 px-3 py-1 rounded-full bg-surface/90 backdrop-blur-md text-secondary text-[11px] flex items-center gap-1.5 shadow-sm font-medium"
            >
              <span class="material-symbols-outlined text-[14px]">touch_app</span>
              <span>Tu tambien eres bienvenido</span>
            </div>
          </div>

          <!-- 3 RELATIONS_DATA List -->
          <div class="flex flex-col gap-3">
            @for (relation of relations; track relation.number) {
              <app-pillar-card [pillar]="relation" />
            }
          </div>
        </div>
      </section>


      <!-- SESIONES Y ACOMPAÑAMIENTOS PRIVADOS -->
      <section class="px-4 sm:px-6 py-12 sm:py-16 max-w-2xl mx-auto w-full flex flex-col gap-6">
        <div class="flex flex-col gap-1">
          <span class="text-xs text-tertiary uppercase tracking-wider font-semibold">
            Acompañamiento a Medida
          </span>
          <h2 class="font-editorial text-2xl sm:text-3xl text-neutral-dark font-medium">
            Sesiones Privadas
          </h2>
          <p class="text-sm text-neutral-muted leading-relaxed">
            Acompañamiento terapéutico somático para parejas e individuos. Disponible en 3 modalidades: online por videollamada, en Molins de Rei o a domicilio.
          </p>
        </div>

        <!-- Intimate Couple Photography -->
        <div
          class="relative w-full rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] aspect-[16/9] bg-surface"
        >
          <img
            [src]="appConfig.images.privateSessions"
            alt="Pareja abrazada frente con frente en sintonía somática profunda"
            class="w-full h-full object-cover"
          />
          <div
            class="absolute bottom-2.5 left-2.5 px-3 py-1 rounded-full bg-surface/90 backdrop-blur-md text-primary text-[11px] flex items-center gap-1.5 shadow-sm font-semibold"
          >
            <span class="material-symbols-outlined text-[14px]">favorite</span>
            <span>Espacio Seguro & Confidencial</span>
          </div>
        </div>

        <!-- Sessions Cards -->
        <div class="grid grid-cols-1 gap-4">
          @for (session of sessions; track session.id) {
            <app-session-card
              [session]="session"
              (selectSession)="goToBookingWithSession($event)"
            />
          }
        </div>
      </section>

      <!-- BIO / PRESENTACIÓN ADO MELERA -->
      <section class="bg-surface-variant/60 px-4 sm:px-6 py-12 sm:py-16">
        <div class="max-w-2xl mx-auto flex flex-col gap-6">
          <app-therapist-bio [therapist]="therapist" />
        </div>
      </section>

      <!-- FAQ ACORDEONES MÓVILES -->
      <section class="px-4 sm:px-6 py-12 sm:py-16 max-w-2xl mx-auto w-full flex flex-col gap-5">
        <div class="flex flex-col gap-1">
          <span class="text-xs text-secondary uppercase tracking-wider font-semibold">
            Claridad & Confianza
          </span>
          <h2 class="font-editorial text-2xl sm:text-3xl text-neutral-dark font-medium">
            Preguntas Frecuentes
          </h2>
          <p class="text-sm text-neutral-muted">
            Resolver dudas de antemano relaja las defensas del sistema nervioso.
          </p>
        </div>

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

      <!-- FORMULARIO DE RESERVA Y CONTACTO DIRECTO -->
      <section class="bg-surface-container px-4 sm:px-6 py-12 sm:py-16" id="contacto-reserva">
        <div class="max-w-2xl mx-auto flex flex-col gap-5">
          <div class="flex flex-col gap-1 text-center">
            <span class="text-xs text-primary uppercase tracking-wider font-semibold">
              Próximo Paso
            </span>
            <h2 class="font-editorial text-2xl sm:text-3xl text-neutral-dark font-medium">
              Reserva tu Sesión o Taller
            </h2>
            <p class="text-sm text-neutral-muted">
              Respondo en menos de 24 horas con la máxima discreción y detalle.
            </p>
          </div>

          <app-booking-form
            [initialServiceId]="selectedServiceId()"
            (submitBooking)="handleBookingSubmitted($event)"
          />
        </div>
      </section>

      <!-- REFINED EDITORIAL FOOTER INFO -->
      <footer class="px-4 sm:px-6 py-10 max-w-2xl mx-auto w-full flex flex-col gap-4 text-center text-neutral-muted">
        <div class="flex flex-col items-center gap-1.5">
          <div class="flex items-center gap-2 text-secondary">
            <span class="material-symbols-outlined text-[20px]">lock</span>
            <span class="text-xs uppercase tracking-widest font-semibold">
              Confidencialidad Absoluta
            </span>
          </div>
          <p class="text-xs sm:text-sm text-neutral-muted max-w-md leading-relaxed">
            Espacio seguro, empático y regulado en Barcelona. Sin grabaciones, sin juicios y con estricta custodia de vuestra intimidad.
          </p>
        </div>

        <div class="pt-3 border-t border-neutral/8 text-xs text-neutral-subtle flex flex-col gap-1">
          <p>© Tantra para Parejas Barcelona · Ado Melera</p>
          <p>Estudi Gràcia / Eixample · contacto&#64;tantraparaparejas.com</p>
        </div>
      </footer>
    </div>
  `
})
export class HomeViewComponent {
  private readonly router = inject(Router);

  readonly appConfig = APP_CONFIG;
  readonly pillars = PILLARS_DATA;
  readonly relations = RELATIONS_DATA;
  readonly microRituals = MICRO_RITUALS_DATA;
  readonly workshop = WORKSHOP_DATA;
  readonly sessions = SESSIONS_DATA;
  readonly therapist = THERAPIST_DATA;
  readonly faqs = FAQ_DATA;

  readonly openRitualId = signal<string>('step-1');
  readonly openFaqId = signal<string>('');
  readonly selectedServiceId = signal<string>('taller-mensual');

  handleToggleRitual(id: string): void {
    this.openRitualId.update((current) => (current === id ? '' : id));
  }

  handleToggleFaq(id: string): void {
    this.openFaqId.update((current) => (current === id ? '' : id));
  }

  goToBookingWithWorkshop(dateId: string): void {
    this.selectedServiceId.set('taller-mensual');
    this.router.navigate(['/reservar'], { queryParams: { service: 'taller-mensual', date: dateId } });
  }

  goToBookingWithSession(sessionId: string): void {
    this.selectedServiceId.set(sessionId);
    this.router.navigate(['/reservar'], { queryParams: { service: sessionId } });
  }

  handleBookingSubmitted(submission: BookingSubmission): void {
    console.log('Nueva reserva recibida:', submission);
  }
}
