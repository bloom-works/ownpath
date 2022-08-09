import { Grid } from "@trussworks/react-uswds";
import { useTranslation } from "react-i18next";
import { Dispatch, SetStateAction, useState } from "react";
import { SearchFilters, TypeOfHelp } from "../../../../types";
import DesktopControlDropdown from "./DesktopControlDropdown";
import FeePreferenceInput from "../FeePreferenceInput";
import HoursInput from "../HoursInput";
import LanguageInput from "../LanguageInput";
import TypeOfHelpInput from "../TypeOfHelpInput";
import AccessibilityInput from "../AccessibilityInput";
import DistanceInput from "../DistanceInput";
import ControlToggles from "./DesktopControlToggles";
import AgeGroupInput from "../AgeGroupInput";

type DesktopControlProps = {
  filters: SearchFilters;
  setFilters: Dispatch<SetStateAction<SearchFilters>>;
  distanceUpdatedExternally: boolean;
};

function DesktopControl({
  filters,
  setFilters,
  distanceUpdatedExternally,
}: DesktopControlProps) {
  const { t } = useTranslation();
  // flags to display distance and age filters in active state
  // ONLY after user has changed from default or guided search selection
  const [showDistanceActive, setShowDistanceActive] = useState(false);
  const [showAgeActive, setShowAgeActive] = useState(false);

  return (
    <div className="display-none tablet:display-block">
      <Grid row className="margin-bottom-2">
        <DesktopControlDropdown
          title={t("components.search.filters.typeOfHelp.question")}
          hasSelection={!!filters.typesOfHelp?.length}
          clear={() => setFilters({ ...filters, typesOfHelp: [] })}
        >
          <TypeOfHelpInput
            legend={t("typeOfHelpTitle")}
            hideLegend
            options={[
              TypeOfHelp.MentalHealth,
              TypeOfHelp.CourtMandatedTreatment,
              TypeOfHelp.SubstanceUse,
              TypeOfHelp.SuicidalIdeation,
            ]}
            optionLabelPrefix="typeOfHelpValues"
            filters={filters}
            setFilters={setFilters}
          />
        </DesktopControlDropdown>
        <DesktopControlDropdown
          title={t("feesTitle")}
          hasSelection={!!filters.feePreferences?.length}
          clear={() => setFilters({ ...filters, feePreferences: [] })}
        >
          <FeePreferenceInput
            legend={t("feesTitle")}
            hideLegend
            options={["PrivateInsurance", "Medicaid", "SlidingFeeScale"]}
            optionLabelPrefix="feesValues"
            filters={filters}
            setFilters={setFilters}
          />
        </DesktopControlDropdown>
        <DesktopControlDropdown
          title={t("hoursTitle")}
          hasSelection={!!filters.hours?.length}
          clear={() => setFilters({ ...filters, hours: [] })}
        >
          <HoursInput hideLegend filters={filters} setFilters={setFilters} />
        </DesktopControlDropdown>
        <DesktopControlDropdown
          title={t("languageTitle")}
          hasSelection={!!filters.languages?.length}
          clear={() => setFilters({ ...filters, languages: [] })}
        >
          <LanguageInput
            legend={t("languageTitle")}
            hideLegend
            filters={filters}
            setFilters={setFilters}
          />
        </DesktopControlDropdown>
        <DesktopControlDropdown
          title={t("accessibilityTitle")}
          hasSelection={!!filters.accessibility?.length}
          clear={() => setFilters({ ...filters, accessibility: [] })}
        >
          <AccessibilityInput
            hideLegend
            filters={filters}
            setFilters={setFilters}
          />
        </DesktopControlDropdown>
        <DesktopControlDropdown
          title={t("distanceTitle")}
          hasSelection={showDistanceActive || distanceUpdatedExternally}
        >
          <DistanceInput
            legend={t("distanceTitle")}
            hideLegend
            filters={filters}
            setFilters={(_filters) => {
              setShowDistanceActive(true);
              setFilters(_filters);
            }}
          />
        </DesktopControlDropdown>
        <DesktopControlDropdown
          title={t("ageTitle")}
          hasSelection={!!filters.age && showAgeActive}
        >
          <AgeGroupInput
            legend={t("ageTitle")}
            hideLegend
            filters={filters}
            setFilters={(_filters) => {
              setShowAgeActive(true);
              setFilters(_filters);
            }}
          />
        </DesktopControlDropdown>
      </Grid>
      <ControlToggles setFilters={setFilters} />
    </div>
  );
}

export default DesktopControl;
