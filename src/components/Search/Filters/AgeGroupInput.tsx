import { Fieldset } from "@trussworks/react-uswds";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { AnalyticsAction, logEvent } from "../../../analytics";
import { SearchFilters, AgeGroup } from "../../../types";
import FilterRadio from "./FilterRadio";

type AgeGroupInputProps = {
  hideLegend?: boolean;
  filters: SearchFilters;
  setFilters: Dispatch<SetStateAction<SearchFilters>>;
  tPrefix: string;
};

function AgeGroupInput({
  hideLegend,
  filters,
  setFilters,
  tPrefix,
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
    <Fieldset
      legend={t(`${tPrefix}question`)}
      legendStyle={hideLegend ? "srOnly" : "large"}
    >
      {[AgeGroup.Under18, AgeGroup.Adult, AgeGroup.OlderAdult].map((option) => (
        <FilterRadio
          name="age"
          value={option}
          label={t(`${tPrefix}answers.${option}`)}
          selected={filters.age === option}
          onChange={() => setAgeFilter(option)}
          key={option}
        />
      ))}
    </Fieldset>
  );
}

export default AgeGroupInput;
