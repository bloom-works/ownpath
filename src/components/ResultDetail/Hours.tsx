import { TFunction, useTranslation } from "react-i18next";
import { DailyHours, DAYS_OF_THE_WEEK, WeeklyHours } from "../../types";

const formatDailyHours = (hours: DailyHours, t: TFunction) => {
  return hours.open ? `${hours.start}-${hours.end}` : t("closed");
};

type CondensedHoursDatum = {
  startDay: string;
  endDay: string | null;
  hours: DailyHours;
};

const areHoursEqual = (a: DailyHours, b: DailyHours) => {
  if (!a.open && !b.open) {
    return true;
  } else if (a.open && b.open && a.start === b.start && a.end === b.end) {
    return true;
  } else {
    return false;
  }
};

// TODO: move to utils, write tests
// when consecutive days share the same hours, lump them together for display
const getCondensedHoursData = (hours: WeeklyHours) => {
  if (!hours) {
    return null;
  }
  const condensedHoursData: CondensedHoursDatum[] = [];
  // loop thru each day
  for (const currentDay of DAYS_OF_THE_WEEK) {
    const currentDayHours = hours[currentDay as keyof WeeklyHours];
    const previousDatum = condensedHoursData.length
      ? condensedHoursData[condensedHoursData.length - 1]
      : null;
    if (previousDatum && areHoursEqual(currentDayHours, previousDatum.hours)) {
      // if hours are the same as the previous day, lump days together into one row
      condensedHoursData.pop();
      condensedHoursData.push({ ...previousDatum, endDay: currentDay });
    } else {
      // otherwise add a separate row
      condensedHoursData.push({
        startDay: currentDay,
        endDay: null,
        hours: currentDayHours,
      });
    }
  }
  return condensedHoursData;
};

function Hours({ hours }: { hours: WeeklyHours }) {
  const { t } = useTranslation();

  const rows = getCondensedHoursData(hours);
  if (!rows) {
    return <div className="margin-bottom-1">{t("moreInfo")}</div>;
  }
  return (
    <>
      {rows.map((row) => {
        const startDayStr = t(`hoursValues${row.startDay}`);
        const endDayStr = row.endDay && t(`hoursValues${row.endDay}`);
        const label = endDayStr
          ? `${startDayStr}-${endDayStr}: `
          : `${startDayStr}: `;
        return (
          <div className="margin-top-05" key={row.startDay}>
            {label}
            {formatDailyHours(row.hours, t)}
          </div>
        );
      })}
    </>
  );
}

export default Hours;
