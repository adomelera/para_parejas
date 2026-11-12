import { APP_CONFIG } from '../data/tantra-data';

/** Nombre legible de cada sección del sitio, usado en el mensaje. */
const PAGE_LABELS: Record<string, string> = {
  '': 'la página de inicio',
  inicio: 'la página de inicio',
  sesiones: 'la página de sesiones privadas',
  talleres: 'la página de talleres',
  reservar: 'la página de reserva',
  espacio: 'la página del espacio'
};

/** Nombre legible de cada experiencia, alineado con las tarjetas del sitio. */
const SERVICE_LABELS: Record<string, string> = {
  'taller-mensual': 'el taller mensual de parejas en Casa Lazar (40 €/pareja)',
  'terapia-vinculo': 'la terapia de vínculo para parejas, 90 min (90 €)',
  'sesion-individual': 'la sesión individual de reconexión, 60 min (60 €)',
  'masaje-tantrico': 'el masaje tántrico somático, 90 min (90 €)',
  'consulta-previa': 'una consulta de orientación previa (sin coste)'
};

export interface WhatsAppMessageOptions {
  /** Ruta o URL actual; los query params se ignoran. */
  path: string;
  /** Sección desde la que se inicia el contacto, si se conoce. */
  from?: string;
  /** Experiencia seleccionada (id de servicio). */
  serviceId?: string;
  /** Fecha o día elegido, ya formateado para leerlo. */
  dateLabel?: string;
}

function sectionKey(value: string): string {
  return value.split('?')[0].split('#')[0].replace(/^\/+|\/+$/g, '');
}

/** Describe la sección actual y, si se conoce, desde dónde se llegó. */
export function describePage(path: string, from?: string): string {
  const currentPage = PAGE_LABELS[sectionKey(path)] ?? 'la web';
  const originPage = from ? PAGE_LABELS[sectionKey(from)] : undefined;
  return originPage && originPage !== currentPage ? `${currentPage} (llegó desde ${originPage})` : currentPage;
}

export function buildWhatsAppMessage({ path, from, serviceId, dateLabel }: WhatsAppMessageOptions): string {
  const currentPage = PAGE_LABELS[sectionKey(path)] ?? 'la web';
  const originPage = from ? PAGE_LABELS[sectionKey(from)] : undefined;
  const service = serviceId ? SERVICE_LABELS[serviceId] : undefined;
  const isWorkshop = serviceId === 'taller-mensual';

  const lines: string[] = [
    originPage && originPage !== currentPage
      ? `Hola Ado, te escribo desde la web (vengo de ${originPage}).`
      : `Hola Ado, te escribo desde la web (${currentPage}).`
  ];

  if (service) {
    lines.push('', `Nos interesa: ${service}.`);
  }

  if (isWorkshop) {
    lines.push(dateLabel ? `Día del taller: ${dateLabel}.` : 'Día del taller: todavía no hemos elegido fecha.');
  }

  lines.push('', '¿Nos confirmas disponibilidad y cómo reservar? Gracias.');

  return lines.join('\n');
}

/** Mensaje para quien no encuentra fecha en el taller y quiere que le avisen. */
export function buildNotifyWhatsAppUrl(): string {
  const text = encodeURIComponent(
    'Hola Ado, me interesa el taller de parejas pero ninguna de las fechas me encaja. ¿Me avisas cuando abras las siguientes? Gracias.'
  );
  return `https://wa.me/${APP_CONFIG.whatsappNumber}?text=${text}`;
}

export function buildWhatsAppUrl(options: WhatsAppMessageOptions): string {
  const text = encodeURIComponent(buildWhatsAppMessage(options));
  return `https://wa.me/${APP_CONFIG.whatsappNumber}?text=${text}`;
}
