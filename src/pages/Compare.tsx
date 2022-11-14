import { useEffect } from "react";
import { Navigate, useLocation, useSearchParams } from "react-router-dom";
import { Grid, GridContainer } from "@trussworks/react-uswds";
import { Marker } from "react-leaflet";

import BackButton from "../components/BackButton";
import ResultsMap from "../components/Search/ResultsMap";
import ShareButton from "../components/ShareButton";
import {
  getDistanceToZipCenter,
  getMapMarker,
  getResultBounds,
} from "../utils";
import CARE_PROVIDER_DATA from "../data/ladders_data.json";
import { CareProvider } from "../types";
import { AnalyticsAction, logEvent, logPageView } from "../utils/analytics";
import { useTranslation } from "react-i18next";
import CompareDetail from "../components/Compare/CompareDetail";
import HoursTable from "../components/Compare/HoursTable";
import { handlePageLoad } from "../utils";
import FeesTable from "../components/Compare/FeesTable";
import PopulationsTable from "../components/Compare/PopulationsTable";
import LanguagesTable from "../components/Compare/LanguagesTable";
import MentalHealthServicesTable from "../components/Compare/MentalHealthServicesTable";
import SubstanceUseServicesTable from "../components/Compare/SubstanceUseServicesTable";
import AccessibilityTable from "../components/Compare/AccessibilityTable";

export default function Compare() {
  useEffect(() => {
    handlePageLoad();
    logPageView();
  }, []);

  const [params] = useSearchParams();
  const location = useLocation();
  const { t } = useTranslation();

  let { prevSearch } = (location.state ?? {}) as {
    prevSearch?: string;
  };

  const ids = params.getAll("id");
  const zip = params.get("zip");

  if (!ids || ids.length !== 2 || ids[0] === ids[1]) {
    return <Navigate replace to="/" />;
  }

  const careProviders = ids
    .map((id) => CARE_PROVIDER_DATA.find((result) => result.id === id))
    .filter((data) => !!data) as CareProvider[];
  if (careProviders.length !== 2) {
    return <Navigate replace to="/Whoops" />;
  }

  const providerA = {
    ...careProviders[0],
    searchRank: 1,
    distance: getDistanceToZipCenter(zip, careProviders[0]),
  };
  const providerB = {
    ...careProviders[1],
    searchRank: 2,
    distance: getDistanceToZipCenter(zip, careProviders[1]),
  };

  return (
    <GridContainer>
      <div className="margin-y-2 display-flex flex-justify">
        <BackButton
          onClick={() => logEvent(AnalyticsAction.ReturnToSearch)}
          text={t("backToSearch")}
          href={`/search${prevSearch ?? ""}`}
        />
        <ShareButton text={t("detailsPageShare")} />
      </div>
      <Grid row>
        <Grid col={12}>
          <h1 className="margin-top-0">Compare locations</h1>
          <ResultsMap
            bounds={getResultBounds([providerA, providerB])}
            isMobile={true}
          >
            {providerA.latlng && (
              <Marker
                title={providerA.id}
                position={providerA.latlng}
                icon={getMapMarker(providerA)}
                key={providerA.id}
                interactive={false}
              />
            )}
            {providerB.latlng && (
              <Marker
                title={providerB.id}
                position={providerB.latlng}
                icon={getMapMarker(providerB)}
                key={providerB.id}
                interactive={false}
              />
            )}
          </ResultsMap>
        </Grid>
      </Grid>
      <Grid row gap="md">
        <Grid col={6}>
          <CompareDetail data={providerA} zip={zip} />
        </Grid>
        <Grid col={6}>
          <CompareDetail data={providerB} zip={zip} />
        </Grid>
        <hr className="margin-y-4" />
        <HoursTable providerA={providerA} providerB={providerB} />
        <FeesTable providerA={providerA} providerB={providerB} />
        <h2>{t("services")}</h2>
        <hr className="margin-bottom-3" />
        <SubstanceUseServicesTable
          providerA={providerA}
          providerB={providerB}
        />
        <MentalHealthServicesTable
          providerA={providerA}
          providerB={providerB}
        />
        <h2>{t("details")}</h2>
        <hr className="margin-bottom-3" />
        <PopulationsTable providerA={providerA} providerB={providerB} />
        <AccessibilityTable providerA={providerA} providerB={providerB} />
        <LanguagesTable providerA={providerA} providerB={providerB} />
      </Grid>
    </GridContainer>
  );
}
