import { Button, Grid } from "@trussworks/react-uswds";
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
import styled from "styled-components";
import { ReactComponent as Close } from "../../../../images/close.svg";

const FiltersButton = styled(Button)`
  font-size: 1.25rem;
  padding: 1rem 1.25rem;
`;

type MobileControlProps = {
  filters: SearchFilters;
  setFilters: Dispatch<SetStateAction<SearchFilters>>;
  totalResultsCount: number;
  isExpanded: boolean;
  setIsExpanded: Dispatch<SetStateAction<boolean>>;
};

function MobileControl({
  filters,
  setFilters,
  totalResultsCount,
  isExpanded,
  setIsExpanded,
}: MobileControlProps) {
  const { t } = useTranslation();

  const countSelected = getAppliedOptionalFiltersCount(filters);

  return (
    <div
      className="tablet:display-none"
      aria-hidden
      id="mobile-filter-container"
    >
      <Grid
        id="filter-close-bar"
        row
        className="position-sticky top-0 flex-justify-end bg-white z-top"
      >
        {isExpanded && (
          <Button
            className="width-auto margin-y-1"
            type="button"
            unstyled
            title="close"
            onClick={() => {
              setIsExpanded(false);
            }}
          >
            {t("close")} <Close className="data-icon" />
          </Button>
        )}
      </Grid>

      <div className={isExpanded ? "display-block" : "display-none"}>
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
      <div
        className={`position-sticky bottom-0 padding-y-2 bg-white text-center ${
          isExpanded ? "border-top border-base-lighter" : ""
        }`}
      >
        <FiltersButton
          type="button"
          className="radius-pill display-flex flex-align-center flex-justify-center text-body-md"
          onClick={() => {
            if (isExpanded) {
              setIsExpanded(false);
              window.scrollTo(0, 0);
            } else {
              setIsExpanded(true);
              document.getElementById("filter-close-bar")?.scrollIntoView();
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
        </FiltersButton>
        {countSelected > 0 && (
          <Button
            type="button"
            className="margin-top-2 display-flex flex-align-center flex-justify-center"
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
    </div>
  );
}

export default MobileControl;
