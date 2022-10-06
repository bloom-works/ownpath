import { Header, Link as ExternalLink } from "@trussworks/react-uswds";
import { Outlet, Link } from "react-router-dom";
import Banner from "./Banner";
import Footer from "./Footer";
import { ReactComponent as ColoradoBhaLogo } from "../images/logos/colorado_bha.svg";
import { ReactComponent as OwnPathLogo } from "../images/logos/ownpath.svg";
import { ReactComponent as MiPropiaSendaLogo } from "../images/logos/mi_propia_senda.svg";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const Wrapper = styled.div`
  min-height: 100%;
`;

function Layout() {
  const { t, i18n } = useTranslation();

  return (
    <Wrapper className="display-flex flex-column">
      <Header basic color="primary" role="banner">
        <Banner />
        <div className="display-flex flex-justify-center flex-align-center border-bottom border-base-lighter padding-y-2 padding-x-1">
          <Link to="/" title="Home" aria-label="Home">
            {i18n.language === "es" ? (
              <MiPropiaSendaLogo
                height={34}
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

      <div className="flex-1">
        <Outlet />
      </div>

      <Footer />
    </Wrapper>
  );
}

export default Layout;
