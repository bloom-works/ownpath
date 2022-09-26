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
};

function MobileControl({ filters, setFilters }: MobileControlProps) {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const countSelected = getAppliedOptionalFiltersCount(filters);

  return (
    <div
      className="tablet:display-none padding-x-2"
      aria-hidden
      id="mobile-filter-container"
    >
      <div>
        <Button
          type="button"
          className="radius-pill display-flex flex-align-center flex-justify-center"
          onClick={() => {
            if (isExpanded) {
              setIsExpanded(false);
            } else {
              setIsExpanded(true);
            }
          }}
          outline={countSelected === 0}
          base={countSelected !== 0}
        >
          <Filter className="margin-right-05" />
          {t("toggleFiltersButton", {
            count: countSelected,
          })}
        </Button>
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
          <Button
            type="button"
            className="usa-button"
            onClick={() => {
              setIsExpanded(false);
              setTimeout(() => window.scrollTo(0, 0), 100);
            }}
          >
            {t("close")}
          </Button>
          <div className="padding-top-2">
            <Button
              type="button"
              onClick={() => {
                setIsExpanded(false);
              }}
              unstyled
            >
              {t("cancel")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileControl;
