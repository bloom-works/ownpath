import {
  Button,
  Fieldset,
  GridContainer,
  StepIndicatorStep,
} from "@trussworks/react-uswds";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { createSearchParams, useNavigate } from "react-router-dom";
import { AnalyticsAction, logEvent, logPageView } from "../analytics";
import HelpRecipientInput, {
  HelpRecipient,
} from "../components/GuidedSearch/HelpRecipientInput";
import ZipInput from "../components/ZipInput";
import DistanceInput from "../components/Search/Filters/DistanceInput";
import LanguageInput from "../components/Search/Filters/LanguageInput";
import TypeOfHelpInput from "../components/Search/Filters/TypeOfHelpInput";
import AgeGroupInput from "../components/Search/Filters/AgeGroupInput";
import { SearchFilters, TypeOfHelp } from "../types";
import { EMPTY_SEARCH_FILTERS, getZipSearchMetadata } from "../utils";
import AppAlert from "../components/AppAlert";
import { ReactComponent as Info } from "../images/info.svg";

const GUIDED_SEARCH_STEPS = [
  "helpRecipient",
  "ageGroup",
  "typeOfHelp",
  "language",
  "location",
  "distance",
] as const;

const getStepStatus = (thisIdx: number, currentStepIdx: number) => {
  if (thisIdx === currentStepIdx) return "current";
  if (thisIdx < currentStepIdx) return "complete";
  return "incomplete";
};

// TODO: validate zip
function GuidedSearch() {
  useEffect(() => {
    logPageView();
  }, []);

  const { t } = useTranslation();
  const T_PREFIX = "pages.guidedSearch.";

  // Index of current step
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  // Object containing search filters from input from completed steps
  const [searchFilters, setSearchFilters] =
    useState<SearchFilters>(EMPTY_SEARCH_FILTERS);

  // Care target to display appropriate copy for `type of help` step
  const [helpRecipient, setHelpRecipient] = useState<HelpRecipient>(
    HelpRecipient.Yourself
  );

  // don't show validation errors until clicking next or clicking out of input
  const [showZipValidation, setShowZipValidation] = useState<boolean>(false);

  // Helper func to progress through steps, or navigate to
  // search results with supplied filters if all steps completed
  const navigate = useNavigate();
  const goToNextStep = () => {
    logEvent(AnalyticsAction.CompleteGuidedSearchQuestion, {
      step: currentStepIdx,
      label: GUIDED_SEARCH_STEPS[currentStepIdx],
    });
    if (currentStepIdx < GUIDED_SEARCH_STEPS.length - 1) {
      setCurrentStepIdx((idx) => idx + 1);
    } else {
      const searchFiltersWithoutNoops: SearchFilters = {
        ...searchFilters,
        typesOfHelp: searchFilters.typesOfHelp.filter(
          (f) => f !== TypeOfHelp.None && f !== TypeOfHelp.Unsure
        ),
        feePreferences: searchFilters.feePreferences.filter(
          (f) => f !== "DontKnow" && f !== "SelfPay"
        ),
      };
      navigate({
        pathname: "/search",
        search: createSearchParams(searchFiltersWithoutNoops).toString(),
      });
    }
  };

  const currentStep = GUIDED_SEARCH_STEPS[currentStepIdx];
  return (
    <GridContainer>
      <h1>
        <span className="usa-sr-only">Guided search </span>Question{" "}
        {currentStepIdx + 1} of {GUIDED_SEARCH_STEPS.length}
      </h1>
      <div className="usa-step-indicator usa-step-indicator--no-labels">
        <div className="usa-step-indicator__segments">
          {GUIDED_SEARCH_STEPS.map((step, idx) => (
            <StepIndicatorStep
              key={step}
              status={getStepStatus(idx, currentStepIdx)}
              label={step}
            />
          ))}
        </div>
      </div>
      <form
        className="margin-y-4 grid-col-12 tablet:grid-col-8"
        onSubmit={(e) => {
          e.preventDefault();
          if (currentStep === "location") {
            // Check valid zip before moving on
            const zipMeta = getZipSearchMetadata(searchFilters.zip);
            if (!zipMeta.isValidZip) {
              setShowZipValidation(true);
              return;
            } else {
              // Otherwise, pre-populate miles with appropriate default radius
              setSearchFilters({
                ...searchFilters,
                miles: `${zipMeta.defaultRadiusMiles}`,
              });
            }
          }
          goToNextStep();
        }}
      >
        <div className="margin-y-2">
          {currentStep === "helpRecipient" ? (
            <HelpRecipientInput
              helpRecipient={helpRecipient}
              setHelpRecipient={setHelpRecipient}
            />
          ) : currentStep === "ageGroup" ? (
            <AgeGroupInput
              filters={searchFilters}
              setFilters={setSearchFilters}
              tPrefix={`${T_PREFIX}ageGroup.${helpRecipient}.`}
            />
          ) : currentStep === "typeOfHelp" ? (
            <TypeOfHelpInput
              filters={searchFilters}
              setFilters={setSearchFilters}
              tPrefix={`${T_PREFIX}typeOfHelp.${helpRecipient}.`}
              options={[
                TypeOfHelp.SubstanceUse,
                TypeOfHelp.CourtMandatedTreatment,
                TypeOfHelp.MentalHealth,
                TypeOfHelp.SuicidalIdeation,
                TypeOfHelp.Unsure,
                TypeOfHelp.None,
              ]}
            />
          ) : currentStep === "language" ? (
            <LanguageInput
              filters={searchFilters}
              setFilters={setSearchFilters}
              tPrefix={`${T_PREFIX}languages.${helpRecipient}.`}
            />
          ) : currentStep === "location" ? (
            <>
              <Fieldset
                legend={t(`${T_PREFIX}location.question`)}
                legendStyle="large"
              >
                <ZipInput
                  zip={searchFilters.zip}
                  setZip={(zip) => setSearchFilters({ ...searchFilters, zip })}
                  showError={showZipValidation}
                />
              </Fieldset>
              <AppAlert Icon={Info} className="margin-top-2">
                {t("common.dataCollectionAlert")}
              </AppAlert>
            </>
          ) : currentStep === "distance" ? (
            <DistanceInput
              filters={searchFilters}
              setFilters={setSearchFilters}
              tPrefix={`${T_PREFIX}distance.${helpRecipient}.`}
            />
          ) : (
            <></>
          )}
        </div>

        <Button type="submit">{t(`${T_PREFIX}nextQuestion`)}</Button>
      </form>
    </GridContainer>
  );
}

export default GuidedSearch;
