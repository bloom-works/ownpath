import {
  Button,
  Grid,
  Modal,
  ModalRef,
  ModalToggleButton,
} from "@trussworks/react-uswds";
import { Dispatch, useRef, SetStateAction, useContext } from "react";
import { useTranslation } from "react-i18next";
import { AnalyticsAction, logEvent } from "../../../../utils/analytics";
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
import TelehealthInput from "../TelehealthInput";
import { SurveyTriggerContext } from "../../../../App";
import PopulationsServedInput from "../PopulationsServedInput";
import { SEARCH_FILTER_ORDER } from "../../../../pages/Search/Search";

const FiltersModalToggleButton = styled(Button)`
  font-size: 1.25rem;
  padding: 1rem 1.25rem;
`;

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
  const modalRef = useRef<ModalRef>(null);
  const { t } = useTranslation();

  // Global application state to track trigger events for showing user
  // option to take site survey
  const { incrementTriggerEventCount } = useContext(SurveyTriggerContext);

  const countSelected = getAppliedOptionalFiltersCount(filters);
  return (
    <div
      className="tablet:display-none"
      aria-hidden
      id="mobile-filter-container"
    >
      <Modal id="mobile-filter-menu" ref={modalRef}>
        <Grid
          row
          className="position-sticky top-neg-1 flex-justify flex-align-center bg-white z-top"
        >
          <h2 className="text-bold padding-y-2 display-flex flex-align-center margin-y-0 text-no-wrap">
            <Filter className="margin-right-1 text-blue" height={30} />
            {t("filterBy")}
            {"..."}
          </h2>
          <ModalToggleButton
            modalRef={modalRef}
            className="width-auto margin-y-1"
            type="button"
            unstyled
            title="cancel"
            closer
          >
            {t("cancel")} <Close className="data-icon margin-left-1" />
          </ModalToggleButton>
        </Grid>
        {SEARCH_FILTER_ORDER.map((filter) => {
          if (filter === "Accessibility") {
            return (
              <div className="margin-y-3">
                <AccessibilityInput filters={filters} setFilters={setFilters} />
              </div>
            );
          }
          if (filter === "Age") {
            return (
              <div className="margin-y-3">
                <AgeGroupInput
                  legend={t("ageTitle")}
                  filters={filters}
                  setFilters={setFilters}
                />
              </div>
            );
          }
          if (filter === "Distance") {
            return (
              <div className="margin-y-3">
                <DistanceInput
                  legend={t("distanceTitle")}
                  filters={filters}
                  setFilters={setFilters}
                />
              </div>
            );
          }
          if (filter === "Fees") {
            return (
              <div className="margin-y-3">
                <FeePreferenceInput
                  legend={t("feesTitle")}
                  options={["PrivateInsurance", "Medicaid", "SlidingFeeScale"]}
                  optionLabelPrefix="feesValues"
                  filters={filters}
                  setFilters={setFilters}
                />
              </div>
            );
          }
          if (filter === "Hours") {
            return (
              <div className="margin-y-3">
                <HoursInput filters={filters} setFilters={setFilters} />
              </div>
            );
          }
          if (filter === "Language") {
            return (
              <div className="margin-y-3">
                <LanguageInput
                  legend={t("languageTitle")}
                  filters={filters}
                  setFilters={setFilters}
                />
              </div>
            );
          }
          if (filter === "Telehealth") {
            return (
              <div className="margin-y-3">
                <TelehealthInput
                  legend={t("telehealthTitle")}
                  filters={filters}
                  setFilters={setFilters}
                />
              </div>
            );
          }
          if (filter === "TypeOfHelp") {
            return (
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
            );
          }
          if (filter === "Populations") {
            return (
              <div className="margin-y-3">
                <PopulationsServedInput
                  legend={t("populationsServedTitle")}
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
                  setFilters={setFilters}
                />
              </div>
            );
          }

          return <></>;
        })}
        <div className="position-sticky bottom-neg-1 padding-y-2 bg-white text-center  border-top border-base-lighter">
          <FiltersModalToggleButton
            onClick={() => {
              incrementTriggerEventCount();
              modalRef.current?.toggleModal();
            }}
            type="button"
            className="radius-pill display-flex flex-align-center flex-justify-center text-body-md"
            outline={countSelected === 0}
            base={countSelected !== 0}
          >
            {t("viewResults", { count: totalResultsCount })}
          </FiltersModalToggleButton>
          {countSelected > 0 && (
            <Button
              type="button"
              className="margin-top-2 display-flex flex-align-center flex-justify-center"
              onClick={() => {
                incrementTriggerEventCount();
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
      </Modal>
      <div className="position-sticky bottom-0 padding-y-2 bg-white text-center">
        <FiltersModalToggleButton
          type="button"
          onClick={() => {
            modalRef.current?.toggleModal();
          }}
          className="radius-pill display-flex flex-align-center flex-justify-center text-body-md"
          outline={countSelected === 0}
          base={countSelected !== 0}
        >
          <Filter className="margin-right-05" />
          {t("toggleFiltersButton", {
            count: countSelected,
          })}
        </FiltersModalToggleButton>
      </div>
    </div>
  );
}

export default MobileControl;
