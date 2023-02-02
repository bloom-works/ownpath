import { useEffect, useState } from "react";
import { Grid, GridContainer } from "@trussworks/react-uswds";
import styled from "styled-components";

import { useTranslation } from "react-i18next";
import ContentCard from "../components/Home/ContentCard";
import { ReactComponent as ColoradoCrisisServicesLogo } from "../images/logos/colorado_crisis_services.svg";
import { ReactComponent as IMatterLogo } from "../images/logos/imatter.svg";
import { ReactComponent as CdhsLogo } from "../images/logos/cdhs.svg";
import SearchCard from "../components/Home/SearchCard";
import { ReactComponent as Hands } from "../images/hands.svg";
import { logPageView } from "../utils/analytics";
import CrisisAlert from "../components/Home/CrisisAlert";
import PeopleGridMobilePath from "../images/people_grid_mobile.png";
import PeopleGridDesktopPath from "../images/people_grid_desktop.png";
import { handlePageLoad } from "../utils";
import { Link } from "react-router-dom";
import HighlightBox from "../components/HighlightBox";

const HeroSection = styled.div`
  background-color: #dbf0f9;
`;

const PeopleGridDesktop = styled.div`
  background-position: right bottom;
  background-repeat: no-repeat;
  background-size: contain;

  @media (min-width: 1180px) {
    background-image: url(${PeopleGridDesktopPath});
  }
`;

const PeopleGridMobile = styled.img`
  height: 5rem;
  object-fit: cover;
`;

const GuidedSearchGridContainer = styled(GridContainer)``;

const GuidedSearchSection = styled.div`
  background-color: #32747f;
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
                <h1>{t("homePageHeading")}</h1>
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
                  <HighlightBox size="sm">
                    <div className="display-flex">
                      <div>
                        <Hands className="text-white" height={20} />
                      </div>
                      <div className="margin-left-2 width-full">
                        {t("guidedSearchPrompt")}{" "}
                        <Link
                          className="usa-link usa-link--unstyled dark-background text-bold"
                          to="/guided-search"
                        >
                          {t("guidedSearchButton")}
                        </Link>
                      </div>
                    </div>
                  </HighlightBox>
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
              logo={<ColoradoCrisisServicesLogo />}
              header={t("crisisServicesHeading")}
              body={t("crisisServicesContent")}
              cta={t("crisisServicesCta")}
              url={t("crisisServicesLink")}
            />
            <ContentCard
              logo={<IMatterLogo />}
              header={t("iMatterHeading")}
              body={t("iMatterContent")}
              cta={t("iMatterCta")}
              url={t("iMatterLink")}
            />
            <ContentCard
              logo={<CdhsLogo height={60} />}
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
