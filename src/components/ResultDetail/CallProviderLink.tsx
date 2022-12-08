import { Link as ExternalLink } from "@trussworks/react-uswds";
import { useTranslation } from "react-i18next";
import { CareProvider, CareProviderSearchResult } from "../../types";
import { ReactComponent as Telephone } from "../../images/phone.svg";

function CallProviderLink({
  careProvider,
}: {
  careProvider: CareProvider | CareProviderSearchResult;
}) {
  const { t } = useTranslation();

  if (!careProvider.phone) {
    return null;
  }

  return (
    <ExternalLink
      variant="external"
      className="usa-button margin-right-0 display-flex flex-align-center flex-justify-center"
      target="_blank "
      href={`tel:${careProvider.phone}`}
    >
      <Telephone className="margin-right-1" />
      {t("callProvider")}
    </ExternalLink>
  );
}

export default CallProviderLink;
