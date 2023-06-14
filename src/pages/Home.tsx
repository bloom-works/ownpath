import { useEffect, useState } from "react";
import { Grid, GridContainer } from "@trussworks/react-uswds";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import ContentCard from "../components/Home/ContentCard";
import SearchCard from "../components/Home/SearchCard";
import { ReactComponent as Hands } from "../images/hands.svg";
import { logPageView } from "../utils/analytics";
import CrisisAlert from "../components/Home/CrisisAlert";
import PeopleGridMobilePath from "../images/people_grid_mobile.png";
import PeopleGridDesktopPath from "../images/people_grid_desktop.png";
import { handlePageLoad } from "../utils";
import { Link } from "react-router-dom";

const ResponsiveH1 = styled.h1`
  font-size: 2.25rem;
  @media (min-width: 480px) {
    font-size: 3.25rem;
  }
`;

const HeroSection = styled.div`
  background-color: #dbf0f9;
`;

const PeopleGridDesktop = styled.div`
  background-position: right bottom;
  background-repeat: no-repeat;

  @media (min-width: 1024px) {
    background-size: 36%;
    background-image: url(${PeopleGridDesktopPath});
  }
`;

const PeopleGridMobile = styled.img`
  height: 5rem;
  object-fit: cover;
  margin-top: -2rem;
`;

const GuidedSearchSection = styled.div`
  background-color: #32747f;
  padding: 0.75rem;
`;

const ResourcesSection = styled.div`
  background-color: #f5f9fc;
`;

function Home() {
  const { t } = useTranslation();

  const [showCrisisAlert, setShowCrisisAlert] = useState(true);

  useEffect(() => {
    logPageView();
    handlePageLoad({ title: t("title"), noFocusH1: true });

    //eslint-disable-next-line
  }, []);

  return (
    <>
      <HeroSection className="padding-bottom-05">
        <GridContainer>
          <Grid row>
            <Grid col={12}>
              <div className="padding-y-2">
                {showCrisisAlert && (
                  <CrisisAlert onClose={() => setShowCrisisAlert(false)} />
                )}
              </div>
            </Grid>
          </Grid>
        </GridContainer>
        <PeopleGridDesktop>
          <GridContainer>
            <Grid row>
              <Grid desktop={{ col: 8 }}>
                <ResponsiveH1>{t("homePageHeading")}</ResponsiveH1>
                <div className="padding-top-1 padding-bottom-6">
                  <SearchCard />
                </div>
              </Grid>
            </Grid>
          </GridContainer>
          <GridContainer className=" padding-x-0 desktop:padding-x-4">
            <Grid row>
              <Grid desktop={{ col: 8 }}>
                <GuidedSearchSection className="dark-background desktop:radius-lg margin-bottom-8">
                  <div className="display-flex">
                    <div className="display-none desktop:display-block">
                      <Hands className="text-white" height={20} />
                    </div>
                    <div className="margin-left-1 width-full">
                      {t("guidedSearchPrompt")}{" "}
                      <Link
                        className="usa-link usa-link--unstyled dark-background text-bold"
                        to="/guided-search"
                      >
                        {t("guidedSearchButton")}
                      </Link>
                    </div>
                  </div>
                </GuidedSearchSection>
              </Grid>
            </Grid>
          </GridContainer>
        </PeopleGridDesktop>
        <PeopleGridMobile
          className="desktop:display-none"
          src={PeopleGridMobilePath}
          alt="Image of many faces"
        />
      </HeroSection>
      <ResourcesSection className="padding-y-6" id="resources-section">
        <GridContainer>
          <Grid row gap="lg">
            <ContentCard
              logo={require("../images/logos/co-crisis-services.png")}
              header={t("crisisServicesHeading")}
              body={t("crisisServicesContent")}
              cta={t("crisisServicesCta")}
              url={t("crisisServicesLink")}
            />
            <ContentCard
              logo={require("../images/logos/imatter.png")}
              header={t("iMatterHeading")}
              body={t("iMatterContent")}
              cta={t("iMatterCta")}
              url={t("iMatterLink")}
            />
            <ContentCard
              logo={require("../images/logos/cdhs.png")}
              header={t("domesticViolenceHeading")}
              body={t("domesticViolenceContent")}
              cta={t("domesticViolenceCta")}
              url={t("domesticViolenceLink")}
            />
          </Grid>
        </GridContainer>
      </ResourcesSection>
    </>
  );
}

export default Home;
