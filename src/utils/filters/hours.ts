import { CareProvider, DayOfWeek } from "../../types";

export const isOpenOnSelectedDays = (
  careProvider: CareProvider,
  days: DayOfWeek[]
): boolean => {
  // if no days specified, don't apply any filter
  if (!days.length) {
    return true;
  }

  return days.some((day) => careProvider.hours && careProvider.hours[day].open);
};
