import { Grid, GridContainer, Link } from "@trussworks/react-uswds";
import { Marker } from "react-leaflet";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { ReactComponent as ArrowLeft } from "../images/arrow-left.svg";
import { ReactComponent as Populations } from "../images/populations.svg";
import { ReactComponent as Accessibility } from "../images/accessibility.svg";

import Map, { markerIcon } from "../components/Map";
import BasicResultDetail from "../components/ResultDetail/BasicResultDetail";
import CARE_PROVIDER_DATA from "../data/ladders_data.json";
import { CareProvider, CareProviderSearchResult } from "../types";
import ResultDatum from "../components/ResultDetail/ResultDatum";
import Horizontal from "../components/Horizontal";
import CommaSeparatedList from "../components/CommaSeparatedList";
import BulletedList from "../components/BulletedList";
import { useEffect } from "react";
import DirectionsLink from "../components/ResultDetail/DirectionsLink";
import ShareButton from "../components/ShareButton";
import { logPageView } from "../analytics";

function ResultDetail() {
  // Ensure user sees the top of the page
  // (when coming from scrolled results list,
  // they were landing at the same y-coordinate)
  useEffect(() => {
    window.scrollTo(0, 0);
    logPageView();
  }, []);

  const { t } = useTranslation();
  const T_PREFIX = "pages.resultDetail.";
  const location = useLocation();
  const params = useParams();

  // If user navigated from /search results page, they have sent the entity-specific
  // data and the url search params as `prevSearch`
  let { prevSearch, data } = (location.state ?? {}) as {
    prevSearch?: string;
    data?: CareProviderSearchResult;
  };
  if (!data) {
    // If user navigated via different path, pull entity-specific data from CARE_DATA
    const id = params.resultId;
    data = (CARE_PROVIDER_DATA as CareProvider[]).find(
      (result) => `${result.id}` === id
    ); // look up entity in dataset
  }

  if (!data) {
    return <Navigate replace to="/Whoops" />;
  }

  return (
    <GridContainer className="ResultDetail">
      <div className="margin-y-2">
        <Link
          className="display-flex flex-align-center"
          href={`/search${prevSearch ?? ""}`}
        >
          <ArrowLeft className="margin-right-1" />
          {t(`${T_PREFIX}backToSearch`)}
        </Link>
      </div>
      <Grid row className="flex-justify margin-bottom-2">
        <h1 className="text-bold">{data.name}</h1>
        <ShareButton text={t(`${T_PREFIX}share`)} />
      </Grid>

      <section>
        <h2 className="usa-sr-only">Basic info</h2>
        <Grid row>
          <Grid tablet={{ col: true }} className="tablet:order-last">
            {data.latlng && data.address && (
              <div className="display-grid">
                <Map
                  mapContainerProps={{ center: data.latlng, zoom: 14 }}
                  mapContainerStyles={{
                    flex: 1,
                    height: "300px",
                    borderRadius: "10px",
                  }}
                >
                  <Marker
                    icon={markerIcon}
                    position={data.latlng}
                    interactive={false}
                  />
                </Map>

                <div className="margin-y-2">
                  <DirectionsLink careProvider={data} />
                </div>
              </div>
            )}
          </Grid>
          <Grid tablet={{ col: 5 }}>
            <BasicResultDetail headingLevel="h3" result={data} />
          </Grid>
        </Grid>
      </section>
      <Horizontal />
      <Grid row gap>
        <Grid col={12} tablet={{ col: 6 }}>
          <section>
            <h2>{t(`${T_PREFIX}details`)}</h2>
            <ResultDatum Icon={Populations} key="population">
              <div>
                <h3 className="font-body-sm display-inline text-bold">
                  {t(`${T_PREFIX}populationsServed`)}:{" "}
                </h3>
                <CommaSeparatedList
                  boolMap={data.populationsServed}
                  translationPrefix={`${T_PREFIX}_populationsServed.`}
                />
              </div>
            </ResultDatum>
            <ResultDatum Icon={Accessibility} key="accessibility">
              <div>
                <h3 className="font-body-sm display-inline text-bold">
                  {t(`${T_PREFIX}accessibilityOptions`)}:{" "}
                </h3>
                <CommaSeparatedList
                  boolMap={data.accessibility}
                  translationPrefix={`${T_PREFIX}_accessibilityOptions.`}
                />
              </div>
            </ResultDatum>
          </section>
        </Grid>
        {(data.substanceUse.supported || data.mentalHealth.supported) && (
          <Grid col={12} tablet={{ col: 6 }}>
            <section>
              <h2>{t(`${T_PREFIX}services`)}</h2>
              {data.substanceUse.supported && (
                <>
                  <h3 className="font-body-sm text-bold">
                    {t(`${T_PREFIX}substanceUseServices`)}:
                  </h3>
                  <ul>
                    <BulletedList
                      boolMap={data.substanceUse.services}
                      translationPrefix={`${T_PREFIX}_substanceUseServices.`}
                      className="line-heigh-body-4"
                    />
                  </ul>
                </>
              )}
              {data.mentalHealth.supported && (
                <>
                  <h3 className="font-body-sm">
                    {t(`${T_PREFIX}mentalHealthServices`)}:
                  </h3>
                  <ul>
                    <BulletedList
                      boolMap={data.mentalHealth.services}
                      translationPrefix={`${T_PREFIX}_mentalHealthServices.`}
                      className="line-heigh-body-4"
                    />
                  </ul>
                </>
              )}
            </section>
          </Grid>
        )}
      </Grid>
    </GridContainer>
  );
}
export default ResultDetail;
