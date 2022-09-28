import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ReactComponent as Hands } from "../../images/hands.svg";

function GuidedSearchCard() {
  const { t } = useTranslation();
  return (
    <div className="display-flex">
      <div className="margin-right-6 display-none tablet:display-block">
        <Hands className="data-icon " />
      </div>
      <div>
        <h2 className="margin-top-0">{t("guidedSearchHeading")}</h2>
        <p>{t("guidedSearchPrompt")}</p>
        <div className="margin-top-2">
          <Link
            to="/guided-search"
            className="usa-button margin-0 margin-top-1 dark-background"
          >
            {t("guidedSearchButton")}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default GuidedSearchCard;
