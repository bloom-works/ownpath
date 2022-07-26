import { Fieldset, Radio } from "@trussworks/react-uswds";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { AnalyticsAction, logEvent } from "../../../analytics";
import { SearchFilters } from "../../../types";
import { MILE_DISTANCE_OPTIONS } from "../../../utils";
import FilterRadio from "./FilterRadio";

type DistanceInputProps = {
  hideLegend?: boolean;
  filters: SearchFilters;
  setFilters: Dispatch<SetStateAction<SearchFilters>>;
  tPrefix: string;
};

function DistanceInput({
  hideLegend,
  filters,
  setFilters,
  tPrefix,
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
    <Fieldset
      legend={t(`${tPrefix}distance`)}
      legendStyle={hideLegend ? "srOnly" : "large"}
    >
      {MILE_DISTANCE_OPTIONS.map((miles) => (
        <FilterRadio
          name="distance"
          value={miles}
          label={t(`${tPrefix}withinMiles`, { n: miles })}
          selected={filters.miles === miles}
          onChange={() => setDistanceFilter(miles)}
          key={miles}
        />
      ))}
    </Fieldset>
  );
}

export default DistanceInput;
