import { Accordion, Grid, GridContainer, Link } from "@trussworks/react-uswds";
import { Marker } from "react-leaflet";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import { isMobile } from "react-device-detect";

import { ReactComponent as Telehealth } from "../images/telehealth.svg";
import { ReactComponent as Populations } from "../images/populations.svg";
import { ReactComponent as Accessibility } from "../images/accessibility.svg";
import { ReactComponent as Languages } from "../images/languages.svg";

import Map from "../components/Map";
import BasicResultDetail from "../components/ResultDetail/BasicResultDetail";
import CARE_PROVIDER_DATA from "../data/ladders_data.json";
import { CareProvider } from "../types";
import BulletedList from "../components/BulletedList";
import { useEffect } from "react";
import DirectionsLink from "../components/ResultDetail/DirectionsLink";
import ShareButton from "../components/ShareButton";
import { logPageView } from "../utils/analytics";
import BackButton from "../components/BackButton";
import { anyAreTrue, handlePageLoad, getMapMarker } from "../utils";
import ProviderUpdateInfo from "../components/ResultDetail/ProviderUpdateInfo";
import CallProviderLink from "../components/ResultDetail/CallProviderLink";
import TelehealthOnlyMap from "../components/TelehealthOnlyMap";
import PrintButton from "../components/PrintButton";

function ResultDetail() {
  const { t } = useTranslation();
  const location = useLocation();
  const params = useParams();
  // Ensure user sees the top of the page
  // (when coming from scrolled results list,
  // they were landing at the same y-coordinate)
  useEffect(() => {
    logPageView();
    handlePageLoad();
  }, [params]);

  // If user navigated from /search results page, they have sent the entity-specific
  // data and the url search params as `prevSearch`
  let { prevSearch, data } = (location.state ?? {}) as {
    prevSearch?: string;
    data?: CareProvider;
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
      <div className="margin-y-2 display-flex flex-justify">
        <BackButton
          text={t("backToSearch")}
          href={`/search${prevSearch ?? ""}`}
        />
        <div className="display-flex flex-align-center">
          <PrintButton className="margin-right-3" />
          <ShareButton text={t("detailsPageShare")} />
        </div>
      </div>
      <Grid row className="flex-justify flex-align-baseline margin-bottom-2">
        <Grid col={12} tablet={{ col: 8 }}>
          <h1 className="margin-top-2">{data.name}</h1>
        </Grid>
      </Grid>

      <section>
        <h2 className="usa-sr-only">Basic info</h2>
        <Grid row>
          <Grid
            tablet={{ col: 6 }}
            className="padding-0 tablet:padding-x-1 order-last order-md-first"
          >
            <BasicResultDetail result={data} />
          </Grid>
          <Grid tablet={{ col: true }}>
            <div className="display-grid">
              {data.latlng && data.address ? (
                <Map
                  mapContainerProps={{
                    center: data.latlng,
                    zoom: 14,
                    dragging: isMobile ? false : true,
                  }}
                  mapContainerStyles={{
                    flex: 1,
                    height: "250px",
                    borderRadius: "10px",
                  }}
                >
                  <Marker
                    icon={getMapMarker(data)}
                    position={data.latlng}
                    interactive={false}
                    keyboard={false}
                  />
                </Map>
              ) : (
                <TelehealthOnlyMap
                  alertMessage={t("telehealthMapAlert")}
                  mapContainerStyles={{ borderRadius: "10px" }}
                />
              )}

              <div className="margin-y-2">
                {data.latlng && data.address ? (
                  <DirectionsLink careProvider={data} />
                ) : (
                  <CallProviderLink careProvider={data} />
                )}
              </div>
            </div>
          </Grid>
        </Grid>
      </section>
      <hr className="margin-bottom-3" />
      <Grid row gap>
        <Grid col={12} tablet={{ col: 6 }}>
          <section>
            <h2 className="margin-top-1">{t("services")}</h2>

            <h3 className="display-inline">{t("mentalHealthServices")}:</h3>
            <BulletedList
              boolMap={
                data.mentalHealth.supported &&
                anyAreTrue(data.mentalHealth.services)
                  ? data.mentalHealth.services
                  : { [`${t("moreInfo")}`]: true }
              }
              className="line-height-body-4"
            />

            <h3 className="display-inline">{t("substanceUseServices")}:</h3>
            <BulletedList
              boolMap={
                data.substanceUse.supported &&
                anyAreTrue(data.substanceUse.services)
                  ? data.substanceUse.services
                  : { [`${t("moreInfo")}`]: true }
              }
              className="line-height-body-4"
            />
          </section>
        </Grid>
        <Grid col={12} tablet={{ col: 6 }}>
          <section>
            <h2 className="margin-top-1">{t("details")}</h2>
            <div>
              <div className="display-flex flex-align-center margin-bottom-05">
                <Accessibility className="data-icon width-3 margin-right-1" />
                <h3 className="margin-0">{t("accessibilityTitle")}: </h3>
              </div>
              <BulletedList
                boolMap={data.accessibility}
                translationPrefix="accessibilityValues"
                className="line-height-body-4 margin-left-3"
                emptyMsg={t("moreInfo")}
              />
            </div>

            <div>
              <div className="display-flex flex-align-center margin-bottom-05">
                <Languages className="data-icon width-3 margin-right-1" />
                <h3 className="margin-0">{t("languagesSpoken")}: </h3>
              </div>
              <BulletedList
                boolMap={data.languages}
                translationPrefix="languageValues"
                className="line-height-body-4 margin-left-3"
                emptyMsg={t("moreInfo")}
              />
            </div>

            <div>
              <div className="display-flex flex-align-center margin-bottom-05">
                <Populations className="data-icon width-3 margin-right-1" />
                <h3 className="margin-0">{t("populations")}: </h3>
              </div>
              <BulletedList
                boolMap={data.populationsServed}
                className="line-height-body-4 margin-left-3"
                emptyMsg={t("moreInfo")}
              />
            </div>

            <div>
              <div className="display-flex flex-align-center margin-bottom-05">
                <Telehealth
                  height={14}
                  className="data-icon width-3 margin-right-1"
                />
                <h3 className="margin-0">{t("telehealth")}: </h3>
              </div>
              <ul className="margin-bottom-1">
                <li className="line-height-body-4 margin-left-3">
                  {data.offersTelehealth ? t("available") : t("notAvailable")}
                </li>
              </ul>
              <div className="margin-left-5 margin-bottom-2 font-body-3xs">
                {t("telehealthAvailableNote")}
              </div>
            </div>
          </section>
        </Grid>
      </Grid>
      <Grid row>
        <Grid col={12} className="print-hide">
          <section className="margin-top-10">
            <Accordion
              bordered
              items={[
                {
                  title: t("complaintTitle"),
                  content: (
                    <div>
                      <p>
                        <Trans i18nKey="complaintFormInfo">
                          If you would like to report a problem with a
                          behavioral health provider, you can submit a complaint
                          to the Behavioral Health Administration by filling out
                          our
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
                        <Trans i18nKey="complaintFormExtraInfo">
                          We will do our best to assist you and resolve the
                          matter. You can also submit your complaint to the
                          behavioral health provider directly. For more
                          information, check out
                          <Link
                            href="https://bha.colorado.gov/contact/contact-us"
                            variant="external"
                          >
                            https://bha.colorado.gov/contact/contact-us
                          </Link>
                          .
                        </Trans>
                      </p>
                    </div>
                  ),
                  expanded: false,
                  id: "complaint",
                  headingLevel: "h2",
                },
              ]}
            />
            <div className="margin-top-2">
              <ProviderUpdateInfo />
            </div>
          </section>
        </Grid>
        {data.lastUpdatedDate && (
          <p className="margin-top-2">
            {t("dataLastUpdated")}: {data.lastUpdatedDate}
          </p>
        )}
      </Grid>
    </GridContainer>
  );
}
export default ResultDetail;
