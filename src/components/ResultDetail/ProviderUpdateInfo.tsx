import { Link } from "@trussworks/react-uswds";
import { Trans } from "react-i18next";
import styled from "styled-components";
import { ReactComponent as Identification } from "../../images/identification.svg";

const Highlight = styled.div`
  background-color: #2f6fa7;
`;

// TODO: update when there are multiple data sources
const BHA_UPDATE_URL = "https://www.colorado.gov/LADDERS/OBH_For_Providers";

function ProviderUpdateInfo() {
  return (
    <Highlight className="dark-backround radius-sm padding-2 display-flex">
      <div className="margin-right-2">
        <Identification className="data-icon" />
      </div>
      <div className="dark-background">
        <Trans i18nKey="bhaProviderUpdate">
          To update your provider information in the OwnPath directory, please
          visit the
          <Link href={BHA_UPDATE_URL} className="dark-background">
            Colorado BHA for Providers website
          </Link>
          to update your information in the LADDERS platform. All updates to the
          provider data will appear in OwnPath in 5-7 business days.
        </Trans>
      </div>
    </Highlight>
  );
}

export default ProviderUpdateInfo;
