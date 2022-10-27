import { Fieldset } from "@trussworks/react-uswds";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { AnalyticsAction, logEvent } from "../../../utils/analytics";
import { DayOfWeek, DAYS_OF_THE_WEEK, SearchFilters } from "../../../types";
import { toggleItemInList } from "../../../utils";
import FilterCheckbox from "./FilterCheckbox";

type HoursInputProps = {
  isMobile?: boolean;
  filters: SearchFilters;
  setFilters: Dispatch<SetStateAction<SearchFilters>>;
};

function HoursInput({
  isMobile = false,
  filters,
  setFilters,
}: HoursInputProps) {
  const { t } = useTranslation();

  const setHoursFilter = (day: DayOfWeek) => {
    logEvent(AnalyticsAction.UpdateFilter, {
      label: "hours",
      filter_type: "hours",
      filter_value: day,
    });
    setFilters({
      ...filters,
      hours: toggleItemInList(filters.hours, day),
    });
  };

  return (
    <Fieldset
      legend={t("hoursTitle")}
      legendStyle={isMobile ? "srOnly" : "large"}
    >
      {DAYS_OF_THE_WEEK.map((option) => (
        <FilterCheckbox
          name="hours"
          value={option}
          label={t(`hoursValues${option}`)}
          selectedFilterValues={filters.hours}
          onChange={() => setHoursFilter(option)}
          key={option}
        />
      ))}
    </Fieldset>
  );
}

export default HoursInput;
