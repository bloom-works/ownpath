import { Fieldset } from "@trussworks/react-uswds";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { AnalyticsAction, logEvent } from "../../../analytics";
import { LANGUAGES, Languages, SearchFilters } from "../../../types";
import { toggleItemInList } from "../../../utils";
import FilterCheckbox from "./FilterCheckbox";

type LanguageInputProps = {
  legend: string;
  hideLegend?: boolean;
  filters: SearchFilters;
  setFilters: Dispatch<SetStateAction<SearchFilters>>;
};

function LanguageInput({
  legend,
  hideLegend = false,
  filters,
  setFilters,
}: LanguageInputProps) {
  const { t } = useTranslation();

  const setLanguagesFilter = (language: Languages) => {
    logEvent(AnalyticsAction.UpdateFilter, {
      label: "languages",
      filter_type: "languages",
      filter_value: language,
    });
    setFilters({
      ...filters,
      languages: toggleItemInList(filters.languages, language),
    });
  };

  return (
    <Fieldset legend={legend} legendStyle={hideLegend ? "srOnly" : "large"}>
      {LANGUAGES.map((option) => (
        <FilterCheckbox
          name="languages"
          value={option}
          label={t(`languageValues${option}`)}
          selectedFilterValues={filters.languages}
          onChange={() => setLanguagesFilter(option)}
          key={option}
        />
      ))}
    </Fieldset>
  );
}

export default LanguageInput;
