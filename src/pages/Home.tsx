import React, { useEffect, useState } from "react";
import { Grid, GridContainer } from "@trussworks/react-uswds";
import styled from "styled-components";

import { useTranslation } from "react-i18next";
import ContentCard from "../components/Home/ContentCard";
import { ReactComponent as ColoradoCrisisServicesLogo } from "../images/logos/colorado_crisis_services.svg";
import { ReactComponent as IMatterLogo } from "../images/logos/imatter.svg";
import { ReactComponent as CdhsLogo } from "../images/logos/cdhs.svg";
import ZipCard from "../components/Home/ZipCard";
import GuidedSearchCard from "../components/Home/GuidedSearchCard";
import { logPageView } from "../utils/analytics";
import CrisisAlert from "../components/Home/CrisisAlert";
import PeopleGridMobilePath from "../images/people_grid.png";
import PeopleGridDesktopPath from "../images/people_grid_desktop.png";
import PeopleGridDesktopXlPath from "../images/people_grid_desktop_xl.png";
import { focusH1 } from "../utils";

const HeroSection = styled.div`
  background-color: #dbf0f9;
`;

const PeopleGridDesktop = styled.div`
  background-position: right bottom;
  background-repeat: no-repeat;
  background-size: contain;
  @media (min-width: 1024px) {
    background-image: url(${PeopleGridDesktopPath});
  }
  @media (min-width: 1440px) {
    background-image: url(${PeopleGridDesktopXlPath});
  }
`;

const PeopleGridMobile = styled.img`
  height: 5rem;
  object-fit: cover;
`;

const GuidedSearchSection = styled.div`
  background-color: #183647;
`;

const ResourcesSection = styled.div`
  background-color: #f5f9fc;
`;

function Home() {
  const { t } = useTranslation();

  const [showCrisisAlert, setShowCrisisAlert] = useState(true);

  useEffect(() => {
    focusH1();
    logPageView();
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
                <div className="padding-top-1 padding-bottom-10">
                  <ZipCard />
                </div>
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
      <GuidedSearchSection className="dark-background padding-y-8">
        <GridContainer>
          <Grid row>
            <GuidedSearchCard />
          </Grid>
        </GridContainer>
      </GuidedSearchSection>
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
