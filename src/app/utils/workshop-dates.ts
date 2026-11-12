import { WorkshopDate } from '../models/tantra.models';

/** Meses tal como aparecen en `dateStr` («21 Oct de 2026»). */
const MONTHS: Record<string, number> = {
  Ene: 0,
  Feb: 1,
  Mar: 2,
  Abr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Ago: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dic: 11
};

/** Convierte «21 Oct de 2026» en una fecha local. Devuelve null si el formato no se reconoce. */
export function parseWorkshopDate(dateStr: string): Date | null {
  const parts = dateStr.trim().split(/\s+/);
  if (parts.length < 4) return null;

  const day = Number(parts[0]);
  const month = MONTHS[parts[1]];
  const year = Number(parts[3]);

  if (!Number.isInteger(day) || month === undefined || !Number.isInteger(year)) return null;

  return new Date(year, month, day);
}

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/** Un taller que ya se celebró no se puede reservar. */
export function isWorkshopDatePast(date: WorkshopDate, now: Date = new Date()): boolean {
  const value = parseWorkshopDate(date.dateStr);
  return value ? value.getTime() < startOfDay(now).getTime() : false;
}

/** Primera fecha que todavía se puede reservar. */
export function nextWorkshopDate(dates: WorkshopDate[], now: Date = new Date()): WorkshopDate | undefined {
  return dates.find((date) => !isWorkshopDatePast(date, now));
}
