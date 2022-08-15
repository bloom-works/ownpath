import { Fieldset } from "@trussworks/react-uswds";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { AnalyticsAction, logEvent } from "../../../analytics";
import { SearchFilters } from "../../../types";
import { MILE_DISTANCE_OPTIONS } from "../../../utils";
import FilterRadio from "./FilterRadio";

type DistanceInputProps = {
  legend: string;
  hideLegend?: boolean;
  filters: SearchFilters;
  setFilters: Dispatch<SetStateAction<SearchFilters>>;
};

function DistanceInput({
  legend,
  hideLegend,
  filters,
  setFilters,
}: DistanceInputProps) {
  const { t } = useTranslation();

  const setDistanceFilter = (miles: string) => {
    logEvent(AnalyticsAction.UpdateFilter, {
      label: "distance",
      filter_type: "distance",
      filter_value: miles,
    });
    setFilters({ ...filters, miles });
  };

  return (
    <Fieldset legend={legend} legendStyle={hideLegend ? "srOnly" : "large"}>
      {MILE_DISTANCE_OPTIONS.map((miles) => (
        <FilterRadio
          name="distance"
          value={miles}
          label={t("distanceValuesTemplate", { n: miles })}
          selected={filters.miles === miles}
          onChange={() => setDistanceFilter(miles)}
          key={miles}
        />
      ))}
    </Fieldset>
  );
}

export default DistanceInput;
