import { CareProviderSearchResult, DayOfWeek } from "../../types";

export const isOpenOnSelectedDays = (
  careProvider: CareProviderSearchResult,
  days: DayOfWeek[]
): boolean => {
  // if no days specified, don't apply any filter
  if (!days.length) {
    return true;
  }

  return days.some((day) => careProvider.hours && careProvider.hours[day].open);
};
