/**
 * Formata uma data para o padrão brasileiro (pt-BR)
 * @param date - Data como string, Date object ou timestamp
 * @param options - Opções de formatação personalizadas
 * @returns Data formatada no padrão dd/MM/yyyy HH:mm
 */
export function formatDateToBrazilian(
  date: string | Date | number,
  options?: Intl.DateTimeFormatOptions
): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const formatOptions = options || defaultOptions;

  return new Intl.DateTimeFormat("pt-BR", formatOptions).format(new Date(date));
}

/**
 * Formata apenas a data (sem hora) para o padrão brasileiro
 * @param date - Data como string, Date object ou timestamp
 * @returns Data formatada no padrão dd/MM/yyyy
 */
export function formatDateOnly(date: string | Date | number): string {
  return formatDateToBrazilian(date, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

/**
 * Formata apenas a hora para o padrão brasileiro
 * @param date - Data como string, Date object ou timestamp
 * @returns Hora formatada no padrão HH:mm
 */
export function formatTimeOnly(date: string | Date | number): string {
  return formatDateToBrazilian(date, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}
