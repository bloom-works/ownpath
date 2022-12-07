import { Checkbox, Grid } from "@trussworks/react-uswds";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { CompareContext } from "../../pages/Search/Search";

import { CareProviderSearchResult } from "../../types";
import { AnalyticsAction, logEvent } from "../../utils/analytics";
import BasicResultDetail from "../ResultDetail/BasicResultDetail";
import MilesAway from "./MilesAway";

type ResultCardProps = {
  data: CareProviderSearchResult;
  isMobile?: boolean;
};

export default function ResultCard({ data, isMobile }: ResultCardProps) {
  const { selectedCompareProviders, setSelectedCompareProviders } =
    useContext(CompareContext);
  const location = useLocation();
  const { t } = useTranslation();

  const toggleCompareCheckbox = () => {
    const thisProviderIdx = selectedCompareProviders.findIndex(
      (provider) => provider.id === data.id
    );

    const p = [...selectedCompareProviders];
    if (thisProviderIdx > -1) {
      p.splice(thisProviderIdx, 1);
    } else {
      p.push(data);
    }
    setSelectedCompareProviders(p);
  };

  const isSelectedForCompare = !!selectedCompareProviders.find(
    (provider) => provider.id === data.id
  );

  return (
    <div
      className="result-card"
      // Only set id in the desktop list to avoid creating
      // duplicate DOM elements with same id in mobile list
      id={isMobile ? undefined : data.id}
    >
      <div className="display-flex flex-justify">
        <p className="margin-top-0 margin-bottom-0 text-bold">
          {data.searchRank}.
        </p>
        {data.distance && <MilesAway meters={data.distance} />}
      </div>
      <Link
        className="usa-link"
        to={`/result/${data.id}`}
        state={{ prevSearch: location.search, data }}
      >
        <h2 className="margin-top-1 margin-bottom-3">{data.name}</h2>
      </Link>
      <BasicResultDetail result={data} isCondensed />
      <Grid
        row
        mobile={{ col: true }}
        className="flex-justify-center tablet:flex-justify flex-align-center"
      >
        <Link
          className="usa-button"
          to={`/result/${data.id}`}
          state={{ prevSearch: location.search, data }}
          aria-label={`${t("fullDetail")} ${data.name}`}
        >
          {t("fullDetail")} <span className="usa-sr-only">{data.name}</span>
        </Link>
        <Checkbox
          id={`compare-${isMobile ? "mobile-" : ""}${data.id}`}
          name={`Compare ${data.name}`}
          label={t("compareCheckbox")}
          checked={isSelectedForCompare}
          onChange={() => {
            toggleCompareCheckbox();
            logEvent(AnalyticsAction.SelectLocationForCompare);
          }}
          disabled={
            selectedCompareProviders.length > 1 && !isSelectedForCompare
          }
        />
      </Grid>
    </div>
  );
}
