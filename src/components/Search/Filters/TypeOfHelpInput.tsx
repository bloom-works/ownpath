import { Fieldset } from "@trussworks/react-uswds";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { AnalyticsAction, logEvent } from "../../../analytics";
import { SearchFilters, TypeOfHelp } from "../../../types";
import { toggleItemInList } from "../../../util";
import FilterCheckbox from "./FilterCheckbox";

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
        <FilterCheckbox
          name="type of help"
          value={option}
          tPrefix={`${tPrefix}answers.`}
          selectedFilterValues={filters.typesOfHelp}
          onChange={() => {
            if (option === TypeOfHelp.None || option === TypeOfHelp.Unsure)
              return; // do not apply no-op filters
            setTypeOfHelpFilter(option);
          }}
          key={option}
        />
      ))}
      {filters.typesOfHelp.includes(TypeOfHelp.SuicidalIdeation) && (
        <div className="margin-top-3 radius-lg bg-teal padding-y-1 padding-x-3">
          <p>{t("common.suicidalIdeationPopup.crisisServices")}</p>
          <p>{t("common.suicidalIdeationPopup.emergency")}</p>
        </div>
      )}
    </Fieldset>
  );
}

export default TypeOfHelpInput;
