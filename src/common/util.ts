import * as dayjs from 'dayjs';

export function filterValidFields<T extends Record<string, any>>(
  data: T,
): Partial<T> {
  return Object.fromEntries(
    Object.entries(data).filter(([_, value]) => value !== undefined),
  ) as Partial<T>;
}

export function getDateRange(targetYear?: number, targetMonth?: number) {
  if (!targetYear || !targetMonth) {
    return { startDate: undefined, endDate: undefined };
  }

  const format = 'YYYY-MM-DD';
  const startDate = dayjs(`${targetYear}-${targetMonth}-1`).format(format);
  const endDate = dayjs(`${targetYear}-${targetMonth + 1}-1`).format(format);
  return { startDate, endDate };
}
