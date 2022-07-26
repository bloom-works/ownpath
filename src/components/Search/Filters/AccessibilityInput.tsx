import { Fieldset } from "@trussworks/react-uswds";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { AnalyticsAction, logEvent } from "../../../analytics";
import {
  AccessibilityOptions,
  ACCESSIBILITY_OPTIONS,
  SearchFilters,
} from "../../../types";
import { toggleItemInList } from "../../../utils";
import FilterCheckbox from "./FilterCheckbox";

type AccessibilityInputProps = {
  hideLegend?: boolean;
  filters: SearchFilters;
  setFilters: Dispatch<SetStateAction<SearchFilters>>;
  tPrefix: string;
};

function AccessibilityInput({
  hideLegend = false,
  filters,
  setFilters,
  tPrefix,
}: AccessibilityInputProps) {
  const { t } = useTranslation();

  const setAccessibilityFilter = (
    accessibilityOption: AccessibilityOptions
  ) => {
    logEvent(AnalyticsAction.UpdateFilter, {
      label: "accessibility",
      filter_type: "accessibility",
      filter_value: accessibilityOption,
    });
    setFilters({
      ...filters,
      accessibility: toggleItemInList(
        filters.accessibility,
        accessibilityOption
      ),
    });
  };

  return (
    <Fieldset
      legend={t(`${tPrefix}question`)}
      legendStyle={hideLegend ? "srOnly" : "large"}
    >
      {ACCESSIBILITY_OPTIONS.map((option) => (
        <FilterCheckbox
          name="accessibility"
          value={option}
          tPrefix={`${tPrefix}answers.`}
          selectedFilterValues={filters.accessibility}
          onChange={() => setAccessibilityFilter(option)}
          key={option}
        />
      ))}
    </Fieldset>
  );
}

export default AccessibilityInput;
