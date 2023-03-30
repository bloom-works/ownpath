import { Grid } from "@trussworks/react-uswds";
import { useTranslation } from "react-i18next";
import { Dispatch, SetStateAction, useContext, useState } from "react";
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
import { SurveyTriggerContext } from "../../../../App";
import PopulationsServedInput from "../PopulationsServedInput";
import { SEARCH_FILTER_ORDER } from "../../../../pages/Search/Search";

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
  // Global application state to track trigger events for showing user
  // option to take site survey
  const { incrementTriggerEventCount } = useContext(SurveyTriggerContext);
  const setFiltersAndIncrement: Dispatch<SetStateAction<SearchFilters>> = (
    _filters
  ) => {
    incrementTriggerEventCount();
    setFilters(_filters);
  };
  // flag to display distance filter in active state ONLY
  // after user has explicitly changed from default value (zipcode search)
  // or original selection (guided search)
  const [showDistanceActive, setShowDistanceActive] = useState(false);

  return (
    <div className="display-none tablet:display-block print-hide">
      <Grid row className="margin-bottom-2">
        <h2 className="usa-sr-only">{t("filterBy")}</h2>
        {SEARCH_FILTER_ORDER.map((filter) => {
          if (filter === "Accessibility") {
            return (
              <DesktopControlDropdown
                title={t("accessibilityTitle")}
                hasSelection={!!filters.accessibility?.length}
                clear={() =>
                  setFiltersAndIncrement({ ...filters, accessibility: [] })
                }
              >
                <AccessibilityInput
                  compact
                  filters={filters}
                  setFilters={setFiltersAndIncrement}
                />
              </DesktopControlDropdown>
            );
          }
          if (filter === "Age") {
            return (
              <DesktopControlDropdown
                title={t("ageTitle")}
                hasSelection={!!filters.age}
                clear={() => {
                  // pluck age out of filters
                  const { age, ...updatedFilters } = filters;
                  setFiltersAndIncrement(updatedFilters);
                }}
              >
                <AgeGroupInput
                  legend={t("ageTitle")}
                  compact
                  filters={filters}
                  setFilters={setFiltersAndIncrement}
                />
              </DesktopControlDropdown>
            );
          }
          if (filter === "Distance") {
            return (
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
                    setFiltersAndIncrement(_filters);
                  }}
                />
              </DesktopControlDropdown>
            );
          }
          if (filter === "Fees") {
            return (
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
                  setFilters={setFiltersAndIncrement}
                />
              </DesktopControlDropdown>
            );
          }
          if (filter === "Hours") {
            return (
              <DesktopControlDropdown
                title={t("hoursTitle")}
                hasSelection={!!filters.hours?.length}
                clear={() => setFiltersAndIncrement({ ...filters, hours: [] })}
              >
                <HoursInput
                  compact
                  filters={filters}
                  setFilters={setFiltersAndIncrement}
                />
              </DesktopControlDropdown>
            );
          }
          if (filter === "Language") {
            return (
              <DesktopControlDropdown
                title={t("languageTitle")}
                hasSelection={!!filters.languages?.length}
                clear={() =>
                  setFiltersAndIncrement({ ...filters, languages: [] })
                }
              >
                <LanguageInput
                  legend={t("languageTitle")}
                  compact
                  filters={filters}
                  setFilters={setFiltersAndIncrement}
                />
              </DesktopControlDropdown>
            );
          }
          if (filter === "Telehealth") {
            return (
              <DesktopControlDropdown
                title={t("telehealthTitle")}
                hasSelection={!!filters.telehealth}
              >
                <TelehealthInput
                  legend={t("telehealthTitle")}
                  compact
                  filters={filters}
                  setFilters={setFiltersAndIncrement}
                />
              </DesktopControlDropdown>
            );
          }
          if (filter === "TypeOfHelp") {
            return (
              <DesktopControlDropdown
                title={t("typeOfHelpTitle")}
                hasSelection={!!filters.typesOfHelp?.length}
                clear={() =>
                  setFiltersAndIncrement({ ...filters, typesOfHelp: [] })
                }
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
                  setFilters={setFiltersAndIncrement}
                />
              </DesktopControlDropdown>
            );
          }
          if (filter === "Populations") {
            return (
              <DesktopControlDropdown
                title={t("populationsServedTitle")}
                hasSelection={!!filters.populationsServed?.length}
                clear={() =>
                  setFiltersAndIncrement({
                    ...filters,
                    populationsServed: [],
                  })
                }
              >
                <PopulationsServedInput
                  legend={t("populationsServedTitle")}
                  compact
                  options={[
                    "AmericanIndian",
                    "Offender",
                    "Latinx",
                    "LGBTQIA+",
                    "Military",
                    "Men",
                    "Homeless",
                    "ClientsreferredfromCourt/JudicialSystem",
                    "HIV",
                    "PregnantPerson",
                    "Women",
                  ]}
                  filters={filters}
                  setFilters={setFiltersAndIncrement}
                />
              </DesktopControlDropdown>
            );
          }

          return <></>;
        })}
      </Grid>
      <ControlToggles setFilters={setFiltersAndIncrement} />
    </div>
  );
}

export default DesktopControl;
