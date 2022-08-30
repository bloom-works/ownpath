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
  min-height: 26vh;
  max-height: 22rem;
  width: 100%;
  object-fit: cover;
  object-position: right;
`;

const OverlaySection = styled.div`
  margin-top: -8vh;
`;

const HorizontalLineText = styled.div`
  display: flex;
  flex-direction: row;
  margin: 2rem;
  &:before,
  &:after {
    content: "";
    flex: 1 1;
    border-bottom: 1px solid;
    margin: auto;
    margin-right: 1rem;
    margin-left: 1rem;
  }
`;

const VerticalLineText = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 2rem;
  margin-left: 2rem;
  &:before,
  &:after {
    content: "";
    flex: 1 1;
    border-left: 1px solid;
    margin: auto;
    margin-bottom: 1rem;
    margin-top: 1rem;
  }
`;

function Home() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
    logPageView();
  }, []);

  return (
    <>
      <div className="position-relative padding-x-0 tablet:padding-x-2">
        <Hero src={heroPath} alt="hero image" />
      </div>
      <GridContainer>
        <OverlaySection>
          <Grid row>
            <Grid col={12} desktop={{ col: 7 }} tablet={{ col: 8 }}>
              <div className="display-none tablet:display-block position-absolute bottom-0 left-0">
                <h1 className="text-white padding-2">{t("homePageHeading")}</h1>
              </div>
              <div className="tablet:display-none bg-white radius-lg padding-3">
                <h1 className="margin-0">{t("homePageHeading")}</h1>
              </div>
            </Grid>
            <Grid col={12}>
              <div className="display-none tablet:display-block">
                <div className="radius-lg bg-white padding-3 display-flex desktop:padding-y-4 tablet:margin-x-2 desktop:margin-x-0">
                  <ZipCard />
                  <VerticalLineText>{t("or")}</VerticalLineText>
                  <GuidedSearchCard isMobile={false} />
                </div>
              </div>
              <div className="tablet:display-none">
                <div className="radius-lg bg-white padding-3 display-flex flex-column">
                  <ZipCard />
                  <HorizontalLineText>{t("or")}</HorizontalLineText>
                  <GuidedSearchCard isMobile={true} />
                </div>
              </div>
            </Grid>
          </Grid>
        </OverlaySection>
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
                    {t("standUpColoradoCta")}{" "}
                    <Link href={t("standUpColoradoLink")}>(855) 978-2638.</Link>
                  </>
                }
              />
            </CardGroup>
          </Grid>
        </Grid>
      </GridContainer>
    </>
  );
}

export default Home;
