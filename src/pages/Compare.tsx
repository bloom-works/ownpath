import { useEffect, useState } from "react";
import { Navigate, useLocation, useSearchParams } from "react-router-dom";
import { Grid, GridContainer } from "@trussworks/react-uswds";
import { Marker } from "react-leaflet";

import BackButton from "../components/BackButton";
import ResultsMap from "../components/Search/ResultsMap";
import ShareButton from "../components/ShareButton";
import { getMapMarker, getResultBounds } from "../utils";
import CARE_PROVIDER_DATA from "../data/ladders_data.json";
import { CareProvider } from "../types";
import { logPageView } from "../utils/analytics";
import { useTranslation } from "react-i18next";
import CompareDetail from "../components/Compare/CompareDetail";
import CompareSelector from "../components/Compare/CompareSelector";
import HoursTable from "../components/Compare/HoursTable";
import { focusH1 } from "../utils";

export default function Compare() {
  useEffect(() => {
    focusH1();
    logPageView();
  }, []);

  const [params] = useSearchParams();
  const location = useLocation();
  const { t } = useTranslation();

  const [compareProviders, setCompareProviders] = useState<CareProvider[]>([]);
  useEffect(() => {
    const _p = [];
    if (!!providerA) _p.push(providerA);
    if (!!providerB) _p.push(providerB);
    setCompareProviders(_p);
  }, []);

  // TODO: make this page zip-aware

  // TODO: set prevSearch when navigating to compare page
  let { prevSearch } = (location.state ?? {}) as {
    prevSearch?: string;
  };

  const ids = params.getAll("id");
  const zip = params.get("zip");

  if (!ids || ids.length !== 2) {
    return <Navigate replace to="/" />;
  }
  const providerA = (CARE_PROVIDER_DATA as CareProvider[]).find(
    (result) => `${result.id}` === ids[0]
  );
  const providerB = (CARE_PROVIDER_DATA as CareProvider[]).find(
    (result) => `${result.id}` === ids[1]
  );

  if (!providerA || !providerB || providerA.id === providerB.id) {
    return <Navigate replace to="/Whoops" />;
  }

  return (
    <>
      <GridContainer>
        <div className="margin-y-2 display-flex flex-justify">
          <BackButton
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
                  icon={getMapMarker({ ...providerA, searchRank: 1 })}
                  key={providerA.id}
                  interactive={false}
                />
              )}
              {providerB.latlng && (
                <Marker
                  title={providerB.id}
                  position={providerB.latlng}
                  icon={getMapMarker({ ...providerB, searchRank: 2 })}
                  key={providerB.id}
                  interactive={false}
                />
              )}
            </ResultsMap>
          </Grid>
        </Grid>
        <Grid row gap="md">
          <Grid col={6}>
            <p className="margin-y-2 text-bold">1.</p>
            <CompareDetail data={providerA} zip={zip} />
          </Grid>
          <Grid col={6}>
            <p className="margin-y-2 text-bold">2.</p>
            <CompareDetail data={providerB} zip={zip} />
          </Grid>
        </Grid>
        <hr className="margin-y-4" />
        <h3 className="margin-0">{t("hours")}</h3>
        <HoursTable providerA={providerA} providerB={providerB} />
      </GridContainer>
      <CompareSelector
        providers={compareProviders}
        setProviders={setCompareProviders}
      />
    </>
  );
}
