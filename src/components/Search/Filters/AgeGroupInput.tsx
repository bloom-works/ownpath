import { Fieldset } from "@trussworks/react-uswds";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { AnalyticsAction, logEvent } from "../../../utils/analytics";
import { SearchFilters, AgeGroup } from "../../../types";
import FilterRadio from "./FilterRadio";

type AgeGroupInputProps = {
  legend: string;
  isMobile?: boolean;
  filters: SearchFilters;
  setFilters: Dispatch<SetStateAction<SearchFilters>>;
};

function AgeGroupInput({
  legend,
  isMobile,
  filters,
  setFilters,
}: AgeGroupInputProps) {
  const { t } = useTranslation();
  const setAgeFilter = (age: AgeGroup) => {
    logEvent(AnalyticsAction.UpdateFilter, {
      label: "age group",
      filter_type: "age group",
      filter_value: age,
    });

    setFilters({
      ...filters,
      age,
    });
  };

  return (
    <Fieldset legend={legend} legendStyle={isMobile ? "srOnly" : "large"}>
      {[AgeGroup.Under18, AgeGroup.Adult, AgeGroup.OlderAdult].map((option) => (
        <FilterRadio
          name={`age-${isMobile ? "mobile" : "desktop"}`}
          value={option}
          label={t(`ageValues${option}`)}
          selected={filters.age === option}
          onChange={() => setAgeFilter(option)}
          key={option}
        />
      ))}
    </Fieldset>
  );
}

export default AgeGroupInput;
