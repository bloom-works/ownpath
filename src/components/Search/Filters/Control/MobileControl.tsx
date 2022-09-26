import { Button } from "@trussworks/react-uswds";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AnalyticsAction, logEvent } from "../../../../analytics";
import { SearchFilters, TypeOfHelp } from "../../../../types";
import FeePreferenceInput from "../FeePreferenceInput";
import HoursInput from "../HoursInput";
import LanguageInput from "../LanguageInput";
import TypeOfHelpInput from "../TypeOfHelpInput";
import AccessibilityInput from "../AccessibilityInput";
import DistanceInput from "../DistanceInput";
import {
  getAppliedOptionalFiltersCount,
  getFiltersWithOptionalCleared,
} from "./utils";
import { ReactComponent as Filter } from "../../../../images/filter.svg";
import AgeGroupInput from "../AgeGroupInput";

type MobileControlProps = {
  filters: SearchFilters;
  setFilters: Dispatch<SetStateAction<SearchFilters>>;
  totalResultsCount: number;
};

function MobileControl({
  filters,
  setFilters,
  totalResultsCount,
}: MobileControlProps) {
  console.log("TOTAL RESULTS COUNT", totalResultsCount);
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const countSelected = getAppliedOptionalFiltersCount(filters);

  return (
    <div
      className="tablet:display-none"
      aria-hidden
      id="mobile-filter-container"
    >
      <div className={isExpanded ? "display-block" : "display-none"}>
        <div className="margin-y-2">
          {countSelected > 0 && (
            <Button
              type="button"
              onClick={() => {
                logEvent(AnalyticsAction.ApplyFilter, {
                  label: "Clear filters button",
                });
                setFilters(getFiltersWithOptionalCleared(filters));
              }}
              unstyled
            >
              {t(`clearAll`)}
            </Button>
          )}
        </div>
        <div className="margin-y-3">
          <DistanceInput
            legend={t("distanceTitle")}
            filters={filters}
            setFilters={setFilters}
          />
        </div>
        <div className="margin-y-3">
          <TypeOfHelpInput
            legend={t("typeOfHelpTitle")}
            options={[
              TypeOfHelp.SubstanceUse,
              TypeOfHelp.CourtMandatedTreatment,
              TypeOfHelp.MentalHealth,
              TypeOfHelp.SuicidalIdeation,
            ]}
            optionLabelPrefix="typeOfHelpValues"
            filters={filters}
            setFilters={setFilters}
          />
        </div>
        <div className="margin-y-3">
          <FeePreferenceInput
            legend={t("feesTitle")}
            options={["PrivateInsurance", "Medicaid", "SlidingFeeScale"]}
            optionLabelPrefix="feesValues"
            filters={filters}
            setFilters={setFilters}
          />
        </div>
        <div className="margin-y-3">
          <AccessibilityInput filters={filters} setFilters={setFilters} />
        </div>
        <div className="margin-y-3">
          <HoursInput filters={filters} setFilters={setFilters} />
        </div>
        <div className="margin-y-3">
          <LanguageInput
            legend={t("languageTitle")}
            filters={filters}
            setFilters={setFilters}
          />
        </div>
        <div className="margin-y-3">
          <AgeGroupInput
            legend={t("ageTitle")}
            filters={filters}
            setFilters={setFilters}
          />
        </div>
      </div>
      <div className="position-sticky bottom-0 padding-y-2 bg-white">
        <Button
          type="button"
          className="radius-pill display-flex flex-align-center flex-justify-center"
          onClick={() => {
            if (isExpanded) {
              setIsExpanded(false);
              window.scrollTo(0, 0);
            } else {
              setIsExpanded(true);
            }
          }}
          outline={countSelected === 0}
          base={countSelected !== 0}
        >
          {isExpanded ? (
            <>{t("viewResults", { count: totalResultsCount })} </>
          ) : (
            <>
              <Filter className="margin-right-05" />
              {t("toggleFiltersButton", {
                count: countSelected,
              })}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

export default MobileControl;
