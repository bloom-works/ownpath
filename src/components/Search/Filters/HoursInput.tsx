import { Fieldset } from "@trussworks/react-uswds";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { AnalyticsAction, logEvent } from "../../../analytics";
import { DayOfWeek, DAYS_OF_THE_WEEK, SearchFilters } from "../../../types";
import { toggleItemInList } from "../../../util";
import FilterCheckbox from "./FilterCheckbox";

type HoursInputProps = {
  hideLegend?: boolean;
  filters: SearchFilters;
  setFilters: Dispatch<SetStateAction<SearchFilters>>;
  tPrefix: string;
};

function HoursInput({
  hideLegend = false,
  filters,
  setFilters,
  tPrefix,
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
      legend={t(`${tPrefix}question`)}
      legendStyle={hideLegend ? "srOnly" : "large"}
    >
      {DAYS_OF_THE_WEEK.map((option) => (
        <FilterCheckbox
          name="hours"
          value={option}
          tPrefix={"common.daysOfWeek."}
          selectedFilterValues={filters.hours}
          onChange={() => setHoursFilter(option)}
          key={option}
        />
      ))}
    </Fieldset>
  );
}

export default HoursInput;
