import React, { useEffect } from "react";
import { CardGroup, Grid, GridContainer, Link } from "@trussworks/react-uswds";
import styled from "styled-components";

import { useTranslation } from "react-i18next";
import ContentCard from "../components/Home/ContentCard";
import heroPath from "../images/hero.png";
import { ReactComponent as ColoradoCrisisServicesLogo } from "../images/logos/colorado_crisis_services.svg";
import { ReactComponent as IMatterLogo } from "../images/logos/imatter.svg";
import { ReactComponent as StandUpColorado } from "../images/logos/stand_up_co.svg";
import ZipCard from "../components/Home/ZipCard";
import GuidedSearchCard from "../components/Home/GuidedSearchCard";
import { logPageView } from "../analytics";

const Hero = styled.img`
  max-width: 110%;
  margin-left: -5%;
  @media (min-width: 40em) {
    max-width: 150%;
    margin-left: -9%; // WHY!
  }
`;

const ContentOverlay = styled.div`
  position: relative;
  margin-top: -22%;
`;

const Heading = styled.h1`
  color: black;
  background-color: white;
  padding: 1rem 1.2rem 0 1.2rem;
  @media (min-width: 40em) {
    color: white;
    background-color: transparent;
  }
`;

const Line = styled.div`
  border-bottom: 1px solid black;
  width: 100%;
  margin-bottom: 1.2rem;
  margin-left: 10%;
  @media (min-width: 40em) {
    border-bottom: none;
    border-left: 1px solid black;
    width: auto;
    height: 100%;
    position: relative;
    right: -6%;
  }
`;

const Or = styled.div`
  background-color: white;
  height: 2rem;
  padding: 0 1rem;
  position: relative;
  left: -45%;
  @media (min-width: 40em) {
    padding: 0.25rem 1rem 0.5rem 1rem;
    top: 40%;
  }
`;

function Home() {
  const { t } = useTranslation();
  const T_PREFIX = "pages.home.";

  useEffect(() => {
    logPageView();
  }, []);

  return (
    <GridContainer>
      <Hero src={heroPath} />
      <ContentOverlay>
        <Grid row>
          <Grid col={12} tablet={{ col: 7 }}>
            <Heading className="radius-lg padding-y-2 text-bold">
              {t(`${T_PREFIX}heading`)}
            </Heading>
          </Grid>
          <Grid col={12}>
            <CardGroup className="bg-white radius-lg padding-x-1 tablet:padding-top-3 justify-content-around">
              <ZipCard />
              <div className="display-flex flex-justify-center margin-bottom-2">
                <Line></Line>
                <Or>or</Or>
              </div>
              <GuidedSearchCard />
            </CardGroup>
          </Grid>
        </Grid>
        <hr className="margin-bottom-3" />
        <Grid row>
          <Grid col={12}>
            <CardGroup>
              <ContentCard
                headerContent={<ColoradoCrisisServicesLogo />}
                bodyContent={
                  <>
                    <h2 className="font-body-lg text-bold">
                      {t(`${T_PREFIX}_coloradoCrisisService.heading`)}
                    </h2>
                    <p>{t(`${T_PREFIX}_coloradoCrisisService.content`)}</p>
                  </>
                }
                cta={
                  <Link
                    href={t(`${T_PREFIX}_coloradoCrisisService.link`)}
                    target="_blank"
                    variant="external"
                  >
                    {t(`${T_PREFIX}_coloradoCrisisService.cta`)}
                  </Link>
                }
              />
              <ContentCard
                headerContent={<IMatterLogo />}
                bodyContent={
                  <>
                    <h2 className="font-body-lg text-bold">
                      {t(`${T_PREFIX}_iMatter.heading`)}
                    </h2>
                    <p>{t(`${T_PREFIX}_iMatter.content`)}</p>
                  </>
                }
                cta={
                  <Link
                    href={t(`${T_PREFIX}_iMatter.link`)}
                    target="_blank"
                    variant="external"
                  >
                    {t(`${T_PREFIX}_iMatter.cta`)}
                  </Link>
                }
              />
              <ContentCard
                headerContent={<StandUpColorado />}
                bodyContent={
                  <>
                    <h2 className="font-body-lg text-bold">
                      {t(`${T_PREFIX}_standUp.heading`)}
                    </h2>
                    <p>{t(`${T_PREFIX}_standUp.content`)}</p>
                  </>
                }
                cta={
                  <Link href={t(`${T_PREFIX}_standUp.link`)}>
                    {t(`${T_PREFIX}_standUp.cta`)}
                  </Link>
                }
              />
            </CardGroup>
          </Grid>
        </Grid>
      </ContentOverlay>
    </GridContainer>
  );
}

export default Home;
