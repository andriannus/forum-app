import { formatDistance } from "date-fns";
import id from "date-fns/locale/id";

export function transformToDistanceFormat(date: string, baseDate = ""): string {
  const validDate = new Date(date);
  const validBaseDate = !baseDate ? new Date() : new Date(baseDate);

  return formatDistance(validDate, validBaseDate, {
    addSuffix: true,
    includeSeconds: true,
    locale: id,
  });
}
