import { Card } from "@trussworks/react-uswds";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ReactComponent as Hands } from "../../images/hands.svg";

function GuidedSearchCard({ isMobile }: { isMobile: boolean }) {
  const { t } = useTranslation();
  return isMobile ? (
    <div className="display-flex flex-column">
      <Hands className="data-icon margin-right-1" />
      <div className="margin-top-2">
        <h2 className="margin-top-0">{t("guidedSearchHeading")}</h2>
        <p>{t("guidedSearchPrompt")}</p>
        <Link
          to="/guided-search"
          className="usa-button width-full margin-0 margin-top-1"
        >
          {t("guidedSearchButton")}
        </Link>
      </div>
    </div>
  ) : (
    <div className="display-flex flex-justify-center">
      <Hands className="data-icon margin-right-1" />
      <div>
        <h2 className="margin-top-0">{t("guidedSearchHeading")}</h2>
        <p>{t("guidedSearchPrompt")}</p>
        <Link to="/guided-search" className="usa-button margin-0 margin-top-1">
          {t("guidedSearchButton")}
        </Link>
      </div>
    </div>
  );
}

export default GuidedSearchCard;
