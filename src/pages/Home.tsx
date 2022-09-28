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
import { logPageView } from "../analytics";
import CrisisAlert from "../components/Home/CrisisAlert";
import PeopleGridPath from "../images/people_grid.png";

const HeroSection = styled.div`
  background-color: #dbf0f9;
`;

const PeopleGrid = styled.img`
  height: 5rem;
  object-fit: cover;
  margin-bottom: 0.25rem;
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
    window.scrollTo(0, 0);
    logPageView();
  }, []);

  return (
    <>
      <HeroSection>
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
          <Grid row>
            <Grid desktop={{ col: 8 }}>
              <h1>{t("homePageHeading")}</h1>
              <div className="padding-top-1 padding-bottom-10">
                <ZipCard />
              </div>
            </Grid>
          </Grid>
        </GridContainer>
        <PeopleGrid src={PeopleGridPath} />
      </HeroSection>
      <GuidedSearchSection className="dark-background padding-y-8">
        <GridContainer>
          <Grid row>
            <GuidedSearchCard />
          </Grid>
        </GridContainer>
      </GuidedSearchSection>
      <ResourcesSection className="padding-y-6">
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
