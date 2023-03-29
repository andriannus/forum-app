import { formatDistance } from "date-fns";
import id from "date-fns/locale/id";

export function transformToDistanceFormat(date = "", baseDate = ""): string {
  const validDate = date ? new Date(date) : new Date();
  const validBaseDate = !baseDate ? new Date() : new Date(baseDate);

  return formatDistance(validDate, validBaseDate, {
    addSuffix: true,
    includeSeconds: true,
    locale: id,
  });
}
