import { Card, CardBody, CardHeader } from "@trussworks/react-uswds";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ReactComponent as Hands } from "../../images/hands.svg";

function GuidedSearchCard() {
  const { t } = useTranslation();
  const T_PREFIX = "components.home.";
  return (
    <Card
      gridLayout={{ col: 12, tablet: { col: 4 } }}
      containerProps={{ className: "border-0 bg-lightest-blue" }}
    >
      <CardHeader className="display-flex flex-justify-center">
        <Hands className="data-icon" />
      </CardHeader>
      <CardBody>
        <div className="text-center">
          <p>{t(`${T_PREFIX}guidedSearchPrompt`)}</p>
          <Link to="/guided-search" className="usa-button margin-0">
            {t(`${T_PREFIX}guidedSearchButton`)}
          </Link>
        </div>
      </CardBody>
    </Card>
  );
}

export default GuidedSearchCard;
