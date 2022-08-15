import * as React from "react";
import { Fieldset } from "@trussworks/react-uswds";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { AnalyticsAction, logEvent } from "../../../analytics";
import { SearchFilters, TypeOfHelp } from "../../../types";
import { toggleItemInList } from "../../../utils";
import AppAlert from "../../AppAlert";
import FilterCheckbox from "./FilterCheckbox";
import { ReactComponent as Phone } from "../../../images/phone.svg";

type TypeOfHelpInputProps = {
  legend: string;
  hideLegend?: boolean;
  options: TypeOfHelp[];
  optionLabelPrefix: string;
  filters: SearchFilters;
  setFilters: Dispatch<SetStateAction<SearchFilters>>;
};

function TypeOfHelpInput({
  legend,
  hideLegend = false,
  options,
  optionLabelPrefix,
  filters,
  setFilters,
}: TypeOfHelpInputProps) {
  const { t } = useTranslation();

  const setTypeOfHelpFilter = (typeOfHelp: TypeOfHelp) => {
    logEvent(AnalyticsAction.UpdateFilter, {
      label: "type of help",
      filter_type: "type of help",
      filter_value: typeOfHelp,
    });
    setFilters({
      ...filters,
      typesOfHelp: toggleItemInList(filters.typesOfHelp, typeOfHelp),
    });
  };

  return (
    <Fieldset legend={legend} legendStyle={hideLegend ? "srOnly" : "large"}>
      {options.map((option) => (
        <React.Fragment key={option}>
          <FilterCheckbox
            name="type of help"
            value={option}
            label={t(`${optionLabelPrefix}${option}`)}
            selectedFilterValues={filters.typesOfHelp}
            onChange={() => setTypeOfHelpFilter(option)}
            key={option}
          />
          {option === TypeOfHelp.SuicidalIdeation &&
            filters.typesOfHelp.includes(TypeOfHelp.SuicidalIdeation) && (
              <AppAlert Icon={Phone}>
                <div>{t("suicidalIdeationAlert")}</div>
                <div className="text-bold margin-top-1">
                  {t("suicidalIdeationCta")}
                </div>
              </AppAlert>
            )}
        </React.Fragment>
      ))}
    </Fieldset>
  );
}

export default TypeOfHelpInput;
