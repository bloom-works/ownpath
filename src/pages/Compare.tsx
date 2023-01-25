import { useEffect } from "react";
import { Navigate, useLocation, useSearchParams, Link } from "react-router-dom";
import { Grid, GridContainer } from "@trussworks/react-uswds";
import { Marker } from "react-leaflet";
import styled from "styled-components";

import BackButton from "../components/BackButton";
import PrintButton from "../components/PrintButton";
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
import TelehealthTable from "../components/Compare/TelehealthTable";
import TelehealthOnlyMap from "../components/TelehealthOnlyMap";

const ShadowHR = styled.hr`
  box-shadow: 0 4px 8px 0 black;
`;

export default function Compare() {
  useEffect(() => {
    handlePageLoad();
    logPageView();
    const initialStickyHeaderTop =
      document.getElementById("sticky-header")?.offsetTop;

    const scroll = () => {
      const currentStickyHeaderTop =
        document.getElementById("sticky-header")?.offsetTop;
      if (
        !!currentStickyHeaderTop &&
        !!initialStickyHeaderTop &&
        currentStickyHeaderTop > initialStickyHeaderTop
      ) {
        if (
          document
            .getElementById("shadow-line")
            ?.classList.contains("display-none")
        ) {
          document
            .getElementById("shadow-line")
            ?.classList.remove("display-none");
        }
      } else {
        document.getElementById("shadow-line")?.classList.add("display-none");
      }
    };
    window.addEventListener("scroll", scroll);
    return window.addEventListener("scroll", scroll);
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
        <div className="display-flex flex-align-center">
          <PrintButton className="margin-right-3" />
          <ShareButton text={t("detailsPageShare")} />
        </div>
      </div>
      <Grid row>
        <Grid col={12}>
          <h1 className="margin-top-0">Compare locations</h1>
          {providerA.latlng || providerB.latlng ? (
            <ResultsMap
              bounds={getResultBounds([providerA, providerB])}
              mapHeight="300px"
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
          ) : (
            <TelehealthOnlyMap alertMessage={t("compareTelehealthMapAlert")} />
          )}
        </Grid>
      </Grid>
      <Grid
        row
        gap="md"
        className="position-sticky top-0 bg-white z-top"
        id="sticky-header"
      >
        <Grid col={6} tablet={{ col: 5, offset: 2 }}>
          <p className="margin-y-2 text-bold">{providerA.searchRank}.</p>
          <Link className="usa-link" to={`/result/${providerA.id}`}>
            <h2 className="margin-top-0 margin-bottom-3">{providerA.name}</h2>
          </Link>
        </Grid>
        <Grid col={6} tablet={{ col: 5 }}>
          <p className="margin-y-2 text-bold">{providerB.searchRank}.</p>
          <Link className="usa-link" to={`/result/${providerB.id}`}>
            <h2 className="margin-top-0 margin-bottom-3">{providerB.name}</h2>
          </Link>
        </Grid>
        <ShadowHR
          id="shadow-line"
          className="margin-y-0 width-full display-none"
        />
      </Grid>
      <Grid row gap="md" className="margin-top-1">
        <Grid col={6} tablet={{ col: 5, offset: 2 }}>
          <CompareDetail data={providerA} zip={zip} />
        </Grid>
        <Grid col={6} tablet={{ col: 5 }}>
          <CompareDetail data={providerB} zip={zip} />
        </Grid>
      </Grid>
      <hr className="margin-y-4" />
      <TelehealthTable providerA={providerA} providerB={providerB} />

      <HoursTable providerA={providerA} providerB={providerB} />
      <FeesTable providerA={providerA} providerB={providerB} />

      {(providerA.substanceUse.supported ||
        providerB.substanceUse.supported ||
        providerA.mentalHealth.supported ||
        providerB.mentalHealth.supported) && (
        <>
          <h2>{t("services")}</h2>
          <hr className="margin-bottom-3" />
        </>
      )}
      <MentalHealthServicesTable providerA={providerA} providerB={providerB} />
      <SubstanceUseServicesTable providerA={providerA} providerB={providerB} />

      <h2>{t("details")}</h2>
      <hr className="margin-bottom-3" />
      <AccessibilityTable providerA={providerA} providerB={providerB} />
      <LanguagesTable providerA={providerA} providerB={providerB} />
      <PopulationsTable providerA={providerA} providerB={providerB} />
    </GridContainer>
  );
}
