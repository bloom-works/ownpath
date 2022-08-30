import { Button, Header, Link as ExternalLink } from "@trussworks/react-uswds";
import { Outlet, useLocation, Link } from "react-router-dom";
import Banner from "./Banner";
import Footer from "./Footer";
import { ReactComponent as ColoradoBhaLogo } from "../images/logos/colorado_bha.svg";
import { ReactComponent as OwnPathLogo } from "../images/logos/ownpath.svg";
import { ReactComponent as Phone } from "../images/phone.svg";
import { ReactComponent as Close } from "../images/close.svg";
import { ReactComponent as MiPropiaSendaLogo } from "../images/logos/mi_propia_senda.svg";
import styled from "styled-components";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import HighlightBox from "./HighlightBox";

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
        <div className="display-flex flex-justify-center flex-align-center border-bottom border-base-lighter padding-y-2 padding-x-1">
          <Link to={`/${location.search}`} title="Home" aria-label="Home">
            {i18n.language === "es" ? (
              <MiPropiaSendaLogo
                height={38}
                width="auto"
                title={t("ownPathLogoAlt")}
              />
            ) : (
              <OwnPathLogo
                height={38}
                width="auto"
                title={t("ownPathLogoAlt")}
              />
            )}
          </Link>
          <div className="margin-x-1 tablet:margin-x-2">{t("by")}</div>
          <ExternalLink
            href="https://bha.colorado.gov/"
            target="_blank"
            rel="noreferrer"
          >
            <ColoradoBhaLogo
              height={i18n.language === "es" ? 32 : 34}
              width="auto"
            />
          </ExternalLink>
        </div>
      </Header>
      {showCrisisAlert && location.pathname !== "/guided-search" && (
        <div className="margin-x-2 margin-top-2">
          <HighlightBox size="sm">
            <div className="display-flex flex-justify">
              <div className="display-flex">
                <div className="display-none tablet:display-block">
                  <Phone className="data-icon margin-right-2" />
                </div>
                <div>
                  {t("crisisAlert")}{" "}
                  <ExternalLink
                    href="tel:+18444938255"
                    className="text-no-wrap"
                  >
                    {t("crisisAlertNumber")}
                  </ExternalLink>
                </div>
              </div>
              <Button
                className="width-auto margin-left-1"
                type="button"
                unstyled
                title="close"
                onClick={() => setShowCrisisAlert(false)}
              >
                <Close className="data-icon" />
              </Button>
            </div>
          </HighlightBox>
        </div>
      )}

      <div className="flex-1 margin-bottom-4 margin-top-2">
        <Outlet />
      </div>

      <Footer />
    </Wrapper>
  );
}

export default Layout;
