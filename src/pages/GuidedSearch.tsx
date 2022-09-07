import {
  Button,
  ButtonGroup,
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
import BackButton from "../components/BackButton";

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
    window.scrollTo(0, 0);
    logPageView();
  }, []);

  const { t } = useTranslation();

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
      <h1 className="font-heading-md margin-top-2 tablet:margin-top-4">
        <span className="usa-sr-only">{t("guidedSearch")}</span>
        {t("question")} {currentStepIdx + 1} of {GUIDED_SEARCH_STEPS.length}
      </h1>
      <div className="usa-step-indicator usa-step-indicator--no-labels margin-bottom-0 tablet:margin-bottom-2">
        <ul className="usa-step-indicator__segments">
          {GUIDED_SEARCH_STEPS.map((step, idx) => (
            <StepIndicatorStep
              key={step}
              status={getStepStatus(idx, currentStepIdx)}
              label={step}
            />
          ))}
        </ul>
      </div>
      <form
        className="margin-bottom-4 grid-col-12 tablet:grid-col-8"
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
        <div className="margin-top-2 margin-bottom-4">
          {currentStep === "helpRecipient" ? (
            <HelpRecipientInput
              helpRecipient={helpRecipient}
              setHelpRecipient={setHelpRecipient}
            />
          ) : currentStep === "ageGroup" ? (
            <AgeGroupInput
              legend={t(`ageQuestion${helpRecipient}`)}
              filters={searchFilters}
              setFilters={setSearchFilters}
            />
          ) : currentStep === "typeOfHelp" ? (
            <TypeOfHelpInput
              legend={t(`typeOfHelpQuestion${helpRecipient}`)}
              filters={searchFilters}
              setFilters={setSearchFilters}
              optionLabelPrefix={`typeOfHelpAnswers${helpRecipient}`}
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
              legend={t(`languageQuestion${helpRecipient}`)}
              filters={searchFilters}
              setFilters={setSearchFilters}
            />
          ) : currentStep === "location" ? (
            <>
              <Fieldset legend={t("locationQuestion")} legendStyle="large">
                <ZipInput
                  zip={searchFilters.zip}
                  setZip={(zip) => setSearchFilters({ ...searchFilters, zip })}
                  showError={showZipValidation}
                />
              </Fieldset>
              <div className="margin-y-2">
                <AppAlert Icon={Info}>{t("dataCollectionAlert")}</AppAlert>
              </div>
            </>
          ) : currentStep === "distance" ? (
            <DistanceInput
              legend={t(`distanceQuestion${helpRecipient}`)}
              filters={searchFilters}
              setFilters={setSearchFilters}
            />
          ) : (
            <></>
          )}
        </div>

        <ButtonGroup>
          <Button type="submit">{t("next")}</Button>
          {currentStepIdx > 0 && (
            <Button
              type="button"
              outline
              onClick={() => setCurrentStepIdx((idx) => idx - 1)}
            >
              {t("previousQuestion")}
            </Button>
          )}
        </ButtonGroup>
      </form>
    </GridContainer>
  );
}

export default GuidedSearch;
