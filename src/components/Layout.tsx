import { Grid, Header } from "@trussworks/react-uswds";
import { Outlet } from "react-router-dom";
import Banner from "./Banner";
import Footer from "./Footer";
import { ReactComponent as ColoradoBhaLogo } from "../images/logos/colorado_bha.svg";
import { ReactComponent as OwnPathLogo } from "../images/logos/ownpath.svg";
import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 100%;
`;

function Layout() {
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
                target="_blank" rel="noreferrer"
              >
                <ColoradoBhaLogo />
              </a>
            </Grid>
          </div>
        </div>
      </Header>

      <div className="flex-1 margin-bottom-4">
        <Outlet />
      </div>

      <Footer />
    </Wrapper>
  );
}

export default Layout;
