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
  const [controlFilters, setControlFilters] = useState(filters);

  useEffect(() => {
    setControlFilters(filters);
  }, [filters]);

  const countSelected = getAppliedOptionalFiltersCount(filters);

  return (
    <div
      className="tablet:display-none"
      id="mobile-filter-container"
      aria-hidden
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          logEvent(AnalyticsAction.ApplyFilter, { label: "Apply button" });
          setFilters(controlFilters);
          setIsExpanded(false);
          setTimeout(() => window.scrollTo(0, 0), 100);
        }}
      >
        <Button
          type="button"
          className="radius-pill display-flex flex-align-center flex-justify-center"
          onClick={() => {
            if (isExpanded) {
              setIsExpanded(false);
              setControlFilters(filters);
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
                  setControlFilters(getFiltersWithOptionalCleared(filters));
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
              filters={controlFilters}
              setFilters={setControlFilters}
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
              filters={controlFilters}
              setFilters={setControlFilters}
            />
          </div>
          <div className="margin-y-3">
            <FeePreferenceInput
              legend={t("feesTitle")}
              options={["PrivateInsurance", "Medicaid", "SlidingFeeScale"]}
              optionLabelPrefix="feesValues"
              filters={controlFilters}
              setFilters={setControlFilters}
            />
          </div>
          <div className="margin-y-3">
            <AccessibilityInput
              filters={controlFilters}
              setFilters={setControlFilters}
            />
          </div>
          <div className="margin-y-3">
            <HoursInput
              filters={controlFilters}
              setFilters={setControlFilters}
            />
          </div>
          <div className="margin-y-3">
            <LanguageInput
              legend={t("languageTitle")}
              filters={controlFilters}
              setFilters={setControlFilters}
            />
          </div>
          <div className="margin-y-3">
            <AgeGroupInput
              legend={t("ageTitle")}
              filters={controlFilters}
              setFilters={setControlFilters}
            />
          </div>
          <Button type="submit" className="usa-button">
            {t("applyFilters")}
          </Button>
          <div className="padding-top-2">
            <Button
              type="button"
              onClick={() => {
                setIsExpanded(false);
                setControlFilters(filters);
              }}
              unstyled
            >
              {t("cancel")}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default MobileControl;
