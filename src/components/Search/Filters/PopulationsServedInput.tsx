import { Fieldset } from "@trussworks/react-uswds";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { AnalyticsAction, logEvent } from "../../../utils/analytics";
import { PopulationsServed, SearchFilters } from "../../../types";
import { toggleItemInList } from "../../../utils";
import FilterCheckbox from "./FilterCheckbox";

type PopulationsServedInputProps = {
  legend: string;
  compact?: boolean;
  options: PopulationsServed[];
  filters: SearchFilters;
  setFilters: Dispatch<SetStateAction<SearchFilters>>;
};

function PopulationServedInput({
  legend,
  compact = false,
  options,
  filters,
  setFilters,
}: PopulationsServedInputProps) {
  const { t } = useTranslation();

  const setPopulationServedFilter = (populationServed: PopulationsServed) => {
    logEvent(AnalyticsAction.UpdateFilter, {
      label: "populations served",
      filter_type: "populations served",
      filter_value: populationServed,
    });
    setFilters({
      ...filters,
      populationsServed: toggleItemInList(
        filters.populationsServed,
        populationServed
      ),
    });
  };

  return (
    <Fieldset legend={legend} legendStyle={compact ? "srOnly" : "large"}>
      {options.map((option) => (
        <FilterCheckbox
          name="populations served"
          value={option}
          label={t(`${option}`)}
          selectedFilterValues={filters.populationsServed}
          onChange={() => {
            setPopulationServedFilter(option);
          }}
          key={option}
        />
      ))}
    </Fieldset>
  );
}

export default PopulationServedInput;
