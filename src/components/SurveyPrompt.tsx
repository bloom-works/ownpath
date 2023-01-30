import { useTranslation } from "react-i18next";
import { Button, Link } from "@trussworks/react-uswds";

import { ReactComponent as Close } from "../images/close-circle.svg";
import styled from "styled-components";

const SlideUp = styled.div`
  bottom: 0;
  transition: 1s;

  &.hide {
    bottom: -1000px;
  }
`;

const SurveyPrompt = ({
  hide,
  className,
}: {
  hide: () => void;
  className: string;
}) => {
  const { t } = useTranslation();
  return (
    <SlideUp
      className={`tablet:margin-right-2 padding-y-2 position-fixed right-0 bg-white tablet:radius-top-lg border-top border-dark tablet:border-x z-top width-full tablet:width-mobile padding-x-2 tablet:padding-x-0 ${className}`}
    >
      <div className="display-flex flex-justify-end margin-right-0 tablet:margin-right-2">
        <Button
          className="width-auto"
          type="button"
          unstyled
          title="cancel"
          onClick={hide}
        >
          <Close className="data-icon margin-left-1" />
        </Button>
      </div>
      <div className="margin-1 tablet:margin-x-3 ">
        <span className="text-bold font-family-heading margin-bottom-1 text-no-wrap">
          {t("surveyHeading")}
        </span>
        <br />
        {t("surveyPrompt")}
      </div>
      <div className="display-flex flex-column flex-align-center">
        <Link
          className="usa-button margin-x-3 margin-top-2 font-family-heading"
          target="_blank"
          href={t("surveyLink")}
        >
          {t("surveyYes")}
        </Link>
        <Button
          type="button"
          onClick={hide}
          className="margin-top-2 font-body-2xs width-auto"
          unstyled
        >
          {t("surveyNo")}
        </Button>
      </div>
    </SlideUp>
  );
};
export default SurveyPrompt;
