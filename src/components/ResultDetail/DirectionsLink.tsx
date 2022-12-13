import { Link as ExternalLink } from "@trussworks/react-uswds";
import { useTranslation } from "react-i18next";
import { CareProvider, CareProviderSearchResult } from "../../types";
import { ReactComponent as DirectionsIcon } from "../../images/directions.svg";

function DirectionsLink({
  careProvider,
}: {
  careProvider: CareProvider | CareProviderSearchResult;
}) {
  const { t } = useTranslation();

  if (!careProvider.address.length) {
    return null;
  }

  const googleMapsDirectionsURL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    careProvider.address.join(", ")
  )}`;

  return (
    <ExternalLink
      className="usa-button margin-right-0 display-flex flex-align-center flex-justify-center"
      target="_blank "
      href={googleMapsDirectionsURL}
    >
      <DirectionsIcon className="margin-right-1" />
      {t("getDirections")}
    </ExternalLink>
  );
}

export default DirectionsLink;
