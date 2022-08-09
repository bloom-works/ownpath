import React, { useEffect } from "react";
import { CardGroup, Grid, GridContainer, Link } from "@trussworks/react-uswds";
import styled from "styled-components";

import { useTranslation } from "react-i18next";
import ContentCard from "../components/Home/ContentCard";
import heroPath from "../images/hero.jpg";
import { ReactComponent as ColoradoCrisisServicesLogo } from "../images/logos/colorado_crisis_services.svg";
import { ReactComponent as IMatterLogo } from "../images/logos/imatter.svg";
import { ReactComponent as StandUpColorado } from "../images/logos/stand_up_co.svg";
import ZipCard from "../components/Home/ZipCard";
import GuidedSearchCard from "../components/Home/GuidedSearchCard";
import { logPageView } from "../analytics";

const Hero = styled.img`
  max-width: 110%;
  margin-left: -5%;
  border-radius: 10px;
  @media (min-width: 40em) {
    max-width: 110%;
  }
  @media only screen and (min-width: 768px) and (max-width: 1279px) {
    border-radius: 0px;
    width: 100%;
    margin: 0;
  }
  @media (max-width: 767px) {
    border-radius: 0px;
    max-width: 100vw;
    margin-left: -4.5%;
    width: 100vw;
    object-fit: cover;
    object-position: right;
    height: calc(100vw - 50px);
  }
`;

const ContentOverlay = styled.div`
  position: relative;
  margin-top: -28%;
  @media (min-width: 40em) {
    margin-top: -22%;
  }
`;

const Heading = styled.h1`
  color: black;
  background-color: white;
  padding: 1rem 1.2rem 0 1.2rem;
  @media (min-width: 40em) {
    color: white;
    background-color: transparent;
    padding: 0;
  }
  @media only screen and (min-width: 768px) and (max-width: 1279px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
  @media (max-width: 414px) {
    font-size: 1.75rem;
    padding-left: 2rem;
    padding-right: 2rem;
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

  useEffect(() => {
    window.scrollTo(0, 0);
    logPageView();
  }, []);

  return (
    <GridContainer>
      <Hero src={heroPath} alt="hero image" />
      <ContentOverlay>
        <Grid row>
          <Grid col={12} desktop={{ col: 7 }}>
            <Heading className="radius-lg padding-y-2 text-bold">
              {t("homePageHeading")}
            </Heading>
          </Grid>
          <Grid col={12}>
            <CardGroup
              className="bg-white radius-lg padding-x-1 tablet:padding-top-3 justify-content-around"
              role="list"
            >
              <ZipCard />
              <div className="display-flex flex-justify-center margin-bottom-2">
                <Line></Line>
                <Or>{t("or")}</Or>
              </div>
              <GuidedSearchCard />
            </CardGroup>
          </Grid>
        </Grid>
        <Grid row className="margin-top-3">
          <Grid col={12}>
            <CardGroup>
              <ContentCard
                headerContent={<ColoradoCrisisServicesLogo />}
                bodyContent={
                  <>
                    <h2>{t("crisisServicesHeading")}</h2>
                    <p>{t("crisisServicesContent")}</p>
                  </>
                }
                cta={
                  <Link
                    href={t("crisisServicesLink")}
                    target="_blank"
                    variant="external"
                  >
                    {t("crisisServicesCta")}
                  </Link>
                }
              />
              <ContentCard
                headerContent={<IMatterLogo />}
                bodyContent={
                  <>
                    <h2>{t("iMatterHeading")}</h2>
                    <p>{t("iMatterContent")}</p>
                  </>
                }
                cta={
                  <Link
                    href={t("iMatterLink")}
                    target="_blank"
                    variant="external"
                  >
                    {t("iMatterCta")}
                  </Link>
                }
              />
              <ContentCard
                headerContent={<StandUpColorado />}
                bodyContent={
                  <>
                    <h2>{t("standUpColoradoHeading")}</h2>
                    <p>{t("standUpColoradoContent")}</p>
                  </>
                }
                cta={
                  <>
                    {t("standUpColoradoCta")}
                    <Link href={t("standUpColoradoLink")}>(855) 978-2638</Link>
                  </>
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
