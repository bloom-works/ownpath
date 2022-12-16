import { Fieldset } from "@trussworks/react-uswds";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { SearchFilters, Telehealth } from "../../../types";
import { AnalyticsAction, logEvent } from "../../../utils/analytics";
import FilterRadio from "./FilterRadio";

type TelehealthInputProps = {
  legend: string;
  compact?: boolean;
  filters: SearchFilters;
  setFilters: Dispatch<SetStateAction<SearchFilters>>;
};

function TelehealthInput({
  legend,
  compact = false,
  filters,
  setFilters,
}: TelehealthInputProps) {
  const { t } = useTranslation();

  const setTelehealthFilter = (telehealth: Telehealth) => {
    logEvent(AnalyticsAction.UpdateFilter, {
      label: "telehealth",
      filter_type: "telehealth",
      filter_value: telehealth,
    });

    setFilters({
      ...filters,
      telehealth,
    });
  };

  return (
    <Fieldset legend={legend} legendStyle={compact ? "srOnly" : "large"}>
      {[
        Telehealth.InPersonAndTelehealth,
        Telehealth.InPersonOnly,
        Telehealth.TelehealthOnly,
      ].map((option) => (
        <FilterRadio
          name={`telehealth-${compact ? "desktop" : "mobile"}`}
          value={option}
          label={t(`telehealthValues${option}`)}
          selected={filters.telehealth === option}
          onChange={() => setTelehealthFilter(option)}
          key={option}
        />
      ))}
    </Fieldset>
  );
}

export default TelehealthInput;
