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
};

function DesktopControl({ filters, setFilters }: DesktopControlProps) {
  const { t } = useTranslation();
  // flag to display distance filter in active state once user has changed distance
  // from default or guided search selection
  const [showDistanceActive, setShowDistanceActive] = useState(false);

  return (
    <div className="display-none tablet:display-block">
      <Grid row className="margin-bottom-2">
        <DesktopControlDropdown
          title={t("components.search.filters.typeOfHelp.question")}
          hasSelection={!!filters.typesOfHelp?.length}
          clear={() => setFilters({ ...filters, typesOfHelp: [] })}
        >
          <TypeOfHelpInput
            hideLegend
            options={[
              TypeOfHelp.MentalHealth,
              TypeOfHelp.CourtMandatedTreatment,
              TypeOfHelp.SubstanceUse,
            ]}
            filters={filters}
            setFilters={setFilters}
            tPrefix="components.search.filters.typeOfHelp."
          />
        </DesktopControlDropdown>
        <DesktopControlDropdown
          title={t("components.search.filters.feePreference.question")}
          hasSelection={!!filters.feePreferences?.length}
          clear={() => setFilters({ ...filters, feePreferences: [] })}
        >
          <FeePreferenceInput
            hideLegend
            options={["PrivateInsurance", "Medicaid", "SlidingFeeScale"]}
            filters={filters}
            setFilters={setFilters}
            tPrefix="components.search.filters.feePreference."
          />
        </DesktopControlDropdown>
        <DesktopControlDropdown
          title={t("components.search.filters.hours.question")}
          hasSelection={!!filters.hours?.length}
          clear={() => setFilters({ ...filters, hours: [] })}
        >
          <HoursInput
            hideLegend
            filters={filters}
            setFilters={setFilters}
            tPrefix="components.search.filters.hours."
          />
        </DesktopControlDropdown>
        <DesktopControlDropdown
          title={t("components.search.filters.languages.question")}
          hasSelection={!!filters.languages?.length}
          clear={() => setFilters({ ...filters, languages: [] })}
        >
          <LanguageInput
            hideLegend
            filters={filters}
            setFilters={setFilters}
            tPrefix="components.search.filters.languages."
          />
        </DesktopControlDropdown>
        <DesktopControlDropdown
          title={t("components.search.filters.accessibility.question")}
          hasSelection={!!filters.accessibility?.length}
          clear={() => setFilters({ ...filters, accessibility: [] })}
        >
          <AccessibilityInput
            hideLegend
            filters={filters}
            setFilters={setFilters}
            tPrefix="components.search.filters.accessibility."
          />
        </DesktopControlDropdown>
        <DesktopControlDropdown
          title={t("components.search.filters.distance.distance")}
          hasSelection={showDistanceActive}
        >
          <DistanceInput
            hideLegend
            filters={filters}
            setFilters={(filters) => {
              setShowDistanceActive(true);
              setFilters(filters);
            }}
            tPrefix="components.search.filters.distance."
          />
        </DesktopControlDropdown>
        <DesktopControlDropdown
          title={t("components.search.filters.ageGroup.question")}
          hasSelection={!!filters.age}
        >
          <AgeGroupInput
            hideLegend
            filters={filters}
            setFilters={setFilters}
            tPrefix="components.search.filters.ageGroup."
          />
        </DesktopControlDropdown>
      </Grid>
      <ControlToggles setFilters={setFilters} />
    </div>
  );
}

export default DesktopControl;
