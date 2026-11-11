import { Injectable } from '@angular/core';
import { APP_CONFIG } from '../data/tantra-data';
import { BookingSubmission } from '../models/tantra.models';

export interface ContactRequest extends BookingSubmission {
  /** Sección desde la que se envió el formulario, ya legible. */
  originPage: string;
}

/** Nombre corto de cada experiencia, para el asunto del email. */
const SERVICE_NAMES: Record<string, string> = {
  'taller-mensual': 'Taller mensual',
  'terapia-vinculo': 'Terapia de vínculo',
  'sesion-individual': 'Sesión individual',
  'masaje-tantrico': 'Masaje tántrico',
  'consulta-previa': 'Consulta previa'
};

@Injectable({ providedIn: 'root' })
export class ContactService {
  /** Sin access key el formulario no se envía y la UI ofrece WhatsApp. */
  get isConfigured(): boolean {
    return APP_CONFIG.contactForm.accessKey.trim().length > 0;
  }

  async send(request: ContactRequest): Promise<void> {
    const { endpoint, accessKey, fromName } = APP_CONFIG.contactForm;

    if (!this.isConfigured) {
      throw new Error('Falta la access key de Web3Forms.');
    }

    const service = SERVICE_NAMES[request.serviceId] ?? request.serviceId;
    const date = request.preferredDate?.replace(/\s*\(.*\)$/, '');

    // El asunto y el nombre del remitente son lo que permite distinguir estos
    // avisos del resto del correo, y replyto hace que "Responder" escriba a la pareja.
    const subject = date
      ? `Nueva solicitud web · ${service} · ${date}`
      : `Nueva solicitud web · ${service}`;

    const body: Record<string, string> = {
      access_key: accessKey,
      subject,
      from_name: fromName,
      replyto: request.email,
      email: request.email,
      Nombres: request.names,
      Experiencia: service
    };

    if (request.phone) {
      body['Teléfono / WhatsApp'] = request.phone;
    }
    if (request.modalityLocation) {
      body['Modalidad'] = request.modalityLocation;
    }
    if (request.preferredDate) {
      body['Fecha preferida'] = request.preferredDate;
    }
    if (request.notes) {
      body['Comentario'] = request.notes;
    }
    body['Página de origen'] = request.originPage;
    body['Enviado'] = new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' });

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`Web3Forms respondió ${response.status}`);
    }
  }
}
