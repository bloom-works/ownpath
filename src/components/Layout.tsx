import { Button, Grid, Header, Link } from "@trussworks/react-uswds";
import { Outlet, useLocation } from "react-router-dom";
import Banner from "./Banner";
import Footer from "./Footer";
import { ReactComponent as ColoradoBhaLogo } from "../images/logos/colorado_bha.svg";
import { ReactComponent as OwnPathLogo } from "../images/logos/ownpath.svg";
import { ReactComponent as Phone } from "../images/phone.svg";
import { ReactComponent as Close } from "../images/close.svg";
import { ReactComponent as MiPropiaSendaLogo } from "../images/logos/mi_propia_senda.svg";
import styled from "styled-components";
import { useState } from "react";
import AppAlert from "./AppAlert";
import { useTranslation } from "react-i18next";

const Wrapper = styled.div`
  min-height: 100%;
`;

function Layout() {
  const [showCrisisAlert, setShowCrisisAlert] = useState(true);
  const location = useLocation();
  const { t, i18n } = useTranslation();
  return (
    <Wrapper className="display-flex flex-column">
      <Header basic color="primary" role="banner">
        <Banner />
        <div className="display-flex flex-justify-center border-bottom border-base-lighter">
          <div className="padding-top-2 padding-bottom-1 height-auto">
            <Grid row className="flex-align-center ">
              <a href="/" title="Home" aria-label="Home">
                {i18n.language === "es" ? (
                  <MiPropiaSendaLogo height={38} className="margin-right-2" />
                ) : (
                  <OwnPathLogo height={38} />
                )}
              </a>
              {t("by")}
              <a
                className="margin-x-2"
                href="https://bha.colorado.gov/"
                target="_blank"
                rel="noreferrer"
              >
                <ColoradoBhaLogo />
              </a>
            </Grid>
          </div>
        </div>
      </Header>
      {showCrisisAlert && location.pathname !== "/guided-search" && (
        <AppAlert
          className="margin-x-4 margin-top-2 margin-bottom-0"
          Icon={Phone}
        >
          <div className="display-flex flex-justify">
            <div>
              <>
                {t("crisisAlert")}{" "}
                <Link href="tel:+18444938255" className="text-no-wrap">
                  {t("crisisAlertNumber")}
                </Link>
              </>
            </div>

            <Button
              className="width-auto margin-x-1"
              type="button"
              unstyled
              onClick={() => setShowCrisisAlert(false)}
            >
              <Close className="data-icon" />
            </Button>
          </div>
        </AppAlert>
      )}

      <div className="flex-1 margin-bottom-4 margin-top-2">
        <Outlet />
      </div>

      <Footer />
    </Wrapper>
  );
}

export default Layout;
