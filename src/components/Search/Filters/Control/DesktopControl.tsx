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
import TelehealthInput from "../TelehealthInput";

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
  // flag to display distance filter in active state ONLY
  // after user has explicitly changed from default value (zipcode search)
  // or original selection (guided search)
  const [showDistanceActive, setShowDistanceActive] = useState(false);

  return (
    <div className="display-none tablet:display-block">
      <Grid row className="margin-bottom-2">
        <h2 className="usa-sr-only">{t("filterBy")}</h2>
        <DesktopControlDropdown
          title={t("accessibilityTitle")}
          hasSelection={!!filters.accessibility?.length}
          clear={() => setFilters({ ...filters, accessibility: [] })}
        >
          <AccessibilityInput
            compact
            filters={filters}
            setFilters={setFilters}
          />
        </DesktopControlDropdown>
        <DesktopControlDropdown
          title={t("ageTitle")}
          hasSelection={!!filters.age}
          clear={() => {
            // pluck age out of filters
            const { age, ...updatedFilters } = filters;
            setFilters(updatedFilters);
          }}
        >
          <AgeGroupInput
            legend={t("ageTitle")}
            compact
            filters={filters}
            setFilters={setFilters}
          />
        </DesktopControlDropdown>
        <DesktopControlDropdown
          title={t("distanceTitle")}
          hasSelection={showDistanceActive || distanceUpdatedExternally}
        >
          <DistanceInput
            key={filters.miles}
            legend={t("distanceTitle")}
            compact
            filters={filters}
            setFilters={(_filters) => {
              setShowDistanceActive(true);
              setFilters(_filters);
            }}
          />
        </DesktopControlDropdown>
        <DesktopControlDropdown
          title={t("feesTitle")}
          hasSelection={!!filters.feePreferences?.length}
          clear={() => setFilters({ ...filters, feePreferences: [] })}
        >
          <FeePreferenceInput
            legend={t("feesTitle")}
            compact
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
          <HoursInput compact filters={filters} setFilters={setFilters} />
        </DesktopControlDropdown>
        <DesktopControlDropdown
          title={t("languageTitle")}
          hasSelection={!!filters.languages?.length}
          clear={() => setFilters({ ...filters, languages: [] })}
        >
          <LanguageInput
            legend={t("languageTitle")}
            compact
            filters={filters}
            setFilters={setFilters}
          />
        </DesktopControlDropdown>
        <DesktopControlDropdown
          title={t("telehealthTitle")}
          hasSelection={!!filters.telehealth}
        >
          <TelehealthInput
            legend={t("telehealthTitle")}
            compact
            filters={filters}
            setFilters={setFilters}
          />
        </DesktopControlDropdown>
        <DesktopControlDropdown
          title={t("typeOfHelpTitle")}
          hasSelection={!!filters.typesOfHelp?.length}
          clear={() => setFilters({ ...filters, typesOfHelp: [] })}
        >
          <TypeOfHelpInput
            legend={t("typeOfHelpTitle")}
            compact
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
      </Grid>
      <ControlToggles setFilters={setFilters} />
    </div>
  );
}

export default DesktopControl;
