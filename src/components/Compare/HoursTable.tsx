import { useTranslation, TFunction } from "react-i18next";

import {
  CareProvider,
  DayOfWeek,
  DAYS_OF_THE_WEEK,
  WeeklyHours,
} from "../../types";
import CompareStripedRows from "./CompareStripedRows";

const formatHoursDisplay = (
  hours: WeeklyHours,
  day: DayOfWeek,
  t: TFunction
): string => {
  if (!hours) {
    return "--";
  }
  const dayHours = hours[day];
  return dayHours.open ? `${dayHours.start}-${dayHours.end}` : t("closed");
};

function HoursTable({
  providerA,
  providerB,
}: {
  providerA: CareProvider;
  providerB: CareProvider;
}) {
  const { t } = useTranslation();

  const rowData = DAYS_OF_THE_WEEK.map((day) => {
    return {
      label: t(`hoursValues${day}`),
      compareA: formatHoursDisplay(providerA.hours, day, t),
      compareB: formatHoursDisplay(providerB.hours, day, t),
    };
  });

  return <CompareStripedRows rows={rowData} />;
}

export default HoursTable;
