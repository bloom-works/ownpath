import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

import { CareProviderSearchResult } from "../../types";
import BasicResultDetail from "../ResultDetail/BasicResultDetail";
import MilesAway from "./MilesAway";

type ResultCardProps = {
  data: CareProviderSearchResult;
};

export default function ResultCard({ data }: ResultCardProps) {
  const location = useLocation();
  const { t } = useTranslation();
  return (
    <div>
      <MilesAway meters={data.distance} />
      <h3 className="usa-card__heading margin-top-1 margin-bottom-3 text-bold">
        {data.name}
      </h3>
      <BasicResultDetail headingLevel="h4" result={data} />
      <Link
        className="usa-button"
        to={`/result/${data.id}`}
        state={{ prevSearch: location.search, data }}
      >
        {t("pages.search.fullDetailButton")}
      </Link>
    </div>
  );
}
