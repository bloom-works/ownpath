import { Button, Grid, Header, Link } from "@trussworks/react-uswds";
import { Outlet } from "react-router-dom";
import Banner from "./Banner";
import Footer from "./Footer";
import { ReactComponent as ColoradoBhaLogo } from "../images/logos/colorado_bha.svg";
import { ReactComponent as OwnPathLogo } from "../images/logos/ownpath.svg";
import { ReactComponent as Phone } from "../images/phone.svg";
import { ReactComponent as Close } from "../images/close.svg";
import styled from "styled-components";
import { useState } from "react";
import AppAlert from "./AppAlert";
import { t } from "i18next";

const Wrapper = styled.div`
  min-height: 100%;
`;

function Layout() {
  const [showCrisisAlert, setShowCrisisAlert] = useState(true);
  return (
    <Wrapper className="display-flex flex-column">
      <Header basic color="primary" role="banner">
        <Banner />
        <div className="display-flex flex-justify-center border-bottom border-base-lighter">
          <div className="padding-top-2 padding-bottom-1 height-auto">
            <Grid row className="flex-align-center ">
              <a href="/" title="Home" aria-label="Home">
                <OwnPathLogo height={38} />
              </a>
              by
              <a
                className="margin-left-2"
                href="https://bha.colorado.gov/"
                target="_blank"
              >
                <ColoradoBhaLogo />
              </a>
            </Grid>
          </div>
        </div>
      </Header>
      {showCrisisAlert && (
        <AppAlert
          className="margin-x-4 margin-top-2 margin-bottom-0"
          Icon={Phone}
        >
          <div className="display-flex flex-justify">
            <div>
              <>
                {t("components.layout.immediateHelp")}
                <Link href="tel:+18444938255" className="margin-left-1">
                  1-844-493-TALK (8255).
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
