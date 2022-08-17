import { Grid, GridContainer, Link } from "@trussworks/react-uswds";
import { Marker } from "react-leaflet";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";

import { ReactComponent as Populations } from "../images/populations.svg";
import { ReactComponent as Accessibility } from "../images/accessibility.svg";

import Map, { markerIcon } from "../components/Map";
import BasicResultDetail from "../components/ResultDetail/BasicResultDetail";
import CARE_PROVIDER_DATA from "../data/ladders_data.json";
import { CareProvider, CareProviderSearchResult } from "../types";
import ResultDatum from "../components/ResultDetail/ResultDatum";
import BulletedList from "../components/BulletedList";
import { useEffect } from "react";
import DirectionsLink from "../components/ResultDetail/DirectionsLink";
// import ShareButton from "../components/ShareButton";
import { logPageView } from "../analytics";
import BackButton from "../components/BackButton";
import HighlightBox from "../components/HighlightBox";

function ResultDetail() {
  // Ensure user sees the top of the page
  // (when coming from scrolled results list,
  // they were landing at the same y-coordinate)
  useEffect(() => {
    window.scrollTo(0, 0);
    logPageView();
  }, []);

  const { t } = useTranslation();
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
        <BackButton
          text={t("backToSearch")}
          href={`/search${prevSearch ?? ""}`}
        />
      </div>
      <Grid row className="flex-justify flex-align-baseline margin-bottom-2">
        <Grid col={12} tablet={{ col: 8 }}>
          <h1 className="margin-top-2">{data.name}</h1>
        </Grid>
        {/* <ShareButton text={t("detailsPageShare")} /> */}
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
      <hr className="margin-bottom-3" />
      <Grid row gap>
        <Grid col={12} tablet={{ col: 6 }}>
          <section>
            <h2 className="margin-top-1">{t("details")}</h2>
            <ResultDatum Icon={Populations} key="population">
              <div>
                <h3 className="display-inline">{t("populations")}: </h3>
                <BulletedList
                  boolMap={data.populationsServed}
                  className="line-height-body-4"
                />
              </div>
            </ResultDatum>
            <ResultDatum Icon={Accessibility} key="accessibility">
              <div>
                <h3 className="display-inline">{t("accessibilityTitle")}: </h3>
                <BulletedList
                  boolMap={data.accessibility}
                  translationPrefix="accessibilityValues"
                  className="line-height-body-4"
                />
              </div>
            </ResultDatum>
          </section>
        </Grid>
        {(data.substanceUse.supported || data.mentalHealth.supported) && (
          <Grid col={12} tablet={{ col: 6 }}>
            <section>
              <h2 className="margin-top-1">{t("services")}</h2>
              {data.substanceUse.supported && (
                <>
                  <h3 className="display-inline">
                    {t("substanceUseServices")}:
                  </h3>
                  <ul>
                    <BulletedList
                      boolMap={data.substanceUse.services}
                      className="line-height-body-4"
                    />
                  </ul>
                </>
              )}
              {data.mentalHealth.supported && (
                <>
                  <h3 className="display-inline">
                    {t("mentalHealthServices")}:
                  </h3>
                  <ul>
                    <BulletedList
                      boolMap={data.mentalHealth.services}
                      className="line-height-body-4"
                    />
                  </ul>
                </>
              )}
            </section>
          </Grid>
        )}
      </Grid>
      <Grid row>
        <Grid col={12}>
          <section className="margin-y-4">
            <HighlightBox size="md">
              <h2 className="margin-top-1">{t("complaintTitle")}</h2>
              <p>
                <Trans i18nKey="complaintFormInfo">
                  If you would like to report a problem with a behavioral health
                  provider, you can submit a complaint to the Behavioral Health
                  Administration by filling out our
                  <Link href={t("complaintFormUrl")} variant="external">
                    Individual Complaint Form
                  </Link>
                  or contacting us via:
                </Trans>
              </p>
              <div className="display-flex">
                <p className="text-bold">{t("phone")}:&nbsp;</p>
                <Link href="tel:+13038667191">(303) 866-7191</Link>
              </div>
              <div className="display-flex padding-bottom-2">
                <p className="text-bold">{t("email")}:&nbsp;</p>
                <Link href="mailto:CDHS_BHA_complaint@state.co.us">
                  CDHS_BHA_complaint@state.co.us
                </Link>
              </div>
              <p>
                <Trans i18nKey="complaintExtraInfo">
                  We will do our best to assist you and resolve the matter. You
                  can also submit your complaint to the behavioral health
                  provider directly. For more information, check out
                  <Link
                    href="https://bha.colorado.gov/contact/contact-us"
                    variant="external"
                  >
                    https://bha.colorado.gov/contact/contact-us
                  </Link>
                  .
                </Trans>
              </p>
            </HighlightBox>
          </section>
        </Grid>
      </Grid>
    </GridContainer>
  );
}
export default ResultDetail;
