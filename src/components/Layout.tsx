import { Header, Link as ExternalLink } from "@trussworks/react-uswds";
import { Outlet, Link } from "react-router-dom";
import Banner from "./Banner";
import Footer from "./Footer";
import { ReactComponent as ColoradoBhaLogo } from "../images/logos/colorado_bha.svg";
import { ReactComponent as OwnPathLogo } from "../images/logos/ownpath.svg";
import { ReactComponent as MiPropiaSendaLogo } from "../images/logos/mi_propia_senda.svg";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import ProviderSearchInput from "./ProviderSearch/ProviderSearchInput";

const Wrapper = styled.div`
  min-height: 100%;
`;

const ResponsiveHeader = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column-reverse;
  @media (min-width: 640px) {
    flex-direction: row;
  }
`;

function Layout() {
  const { t, i18n } = useTranslation();

  return (
    <Wrapper className="display-flex flex-column">
      <Header basic color="primary" role="banner">
        <Banner />
        <ResponsiveHeader className="padding-x-0 tablet:padding-x-6 border-bottom border-base-lighter">
          <div className=" display-flex flex-justify-center padding-y-2 padding-x-1">
            <Link to="/" title="Home" aria-label="Home">
              <span className="usa-sr-only">{t("goToHomepage")}</span>
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
          <div className="display-flex flex-align-center flex-justify-center">
            <ProviderSearchInput />
          </div>
        </ResponsiveHeader>
      </Header>
      <div className="flex-1">
        <Outlet />
      </div>

      <Footer />
    </Wrapper>
  );
}

export default Layout;
