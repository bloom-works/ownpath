import { useTranslation } from "react-i18next";
import { Button, Link } from "@trussworks/react-uswds";
import styled from "styled-components";
import { AnalyticsAction, logEvent } from "../utils/analytics";
import Collapsible from "./Collapsible";

const SlideUp = styled.div`
  bottom: 0;
  display: block;
  transition: 0.8s;
  visibility: visible;

  &.hidden {
    bottom: -1000px;
    visibility: hidden;
  }
`;

const SurveyPrompt = ({
  hideFunc,
  shouldShowSurvey,
}: {
  hideFunc: () => void;
  shouldShowSurvey: boolean;
}) => {
  const { t } = useTranslation();
  return (
    <SlideUp
      aria-hidden={shouldShowSurvey ? false : true}
      className={`tablet:margin-right-2 padding-y-2 position-fixed right-0 bg-white tablet:radius-top-lg border-top border-dark tablet:border-x z-top width-full tablet:width-mobile padding-x-2 tablet:padding-x-0 ${
        shouldShowSurvey ? "" : "hidden"
      }`}
    >
      <Collapsible hideSurvey={hideFunc} open title={t("ownpathSurvey")}>
        <div className="margin-1 tablet:margin-x-3 ">
          <span className="text-bold font-family-heading margin-bottom-1 text-no-wrap">
            {t("surveyHeading")}
          </span>
          <br />
          {t("surveyPrompt")}
        </div>
        <div className="display-flex flex-column flex-align-center">
          <Link
            onClick={() => logEvent(AnalyticsAction.VisitSurveyFromPrompt)}
            className="usa-button margin-x-3 margin-top-2 font-family-heading"
            target="_blank"
            href={t("surveyLink")}
            tabIndex={shouldShowSurvey ? undefined : -1}
          >
            {t("surveyYes")}
          </Link>
          <Button
            type="button"
            onClick={hideFunc}
            className="margin-top-2 font-body-2xs width-auto"
            unstyled
          >
            {t("surveyNo")}
          </Button>
        </div>
      </Collapsible>

    </SlideUp>
  );
};
export default SurveyPrompt;
