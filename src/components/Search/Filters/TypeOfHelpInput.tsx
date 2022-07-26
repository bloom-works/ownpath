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
  hideLegend?: boolean;
  options: TypeOfHelp[];
  filters: SearchFilters;
  setFilters: Dispatch<SetStateAction<SearchFilters>>;
  tPrefix: string;
};

function TypeOfHelpInput({
  hideLegend = false,
  options,
  filters,
  setFilters,
  tPrefix,
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
    <Fieldset
      legend={t(`${tPrefix}question`)}
      legendStyle={hideLegend ? "srOnly" : "large"}
    >
      {options.map((option) => (
        <div key={option}>
          <FilterCheckbox
            name="type of help"
            value={option}
            tPrefix={`${tPrefix}answers.`}
            selectedFilterValues={filters.typesOfHelp}
            onChange={() => setTypeOfHelpFilter(option)}
            key={option}
          />
          {option === TypeOfHelp.SuicidalIdeation &&
            filters.typesOfHelp.includes(TypeOfHelp.SuicidalIdeation) && (
              <AppAlert Icon={Phone}>
                <div>{t("common.suicidalIdeationPopup.crisisServices")}</div>
                <div className="text-bold margin-top-1">
                  {t("common.suicidalIdeationPopup.emergency")}
                </div>
              </AppAlert>
            )}
        </div>
      ))}
    </Fieldset>
  );
}

export default TypeOfHelpInput;
