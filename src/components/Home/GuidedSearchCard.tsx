import { Card } from "@trussworks/react-uswds";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ReactComponent as Hands } from "../../images/hands.svg";

function GuidedSearchCard() {
  const { t } = useTranslation();
  return (
    <Card
      gridLayout={{ col: 12, tablet: { col: 7 } }}
      containerProps={{ className: "border-0" }}
    >
      <div className="usa-card__header-alt display-flex flex-justify-center margin-top-1">
        <Hands className="data-icon margin-right-1" />
        <div>
          <h2 className="margin-top-0">{t("guidedSearchHeading")}</h2>
          <p>{t("guidedSearchPrompt")}</p>
          <Link
            to="/guided-search"
            className="usa-button margin-0 margin-top-05"
          >
            {t("guidedSearchButton")}
          </Link>
        </div>
      </div>
    </Card>
  );
}

export default GuidedSearchCard;
