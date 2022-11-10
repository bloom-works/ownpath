import { Link as ExternalLink } from "@trussworks/react-uswds";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { CareProviderSearchResult } from "../../types";
import DirectionsLink from "../ResultDetail/DirectionsLink";
import { getMilesFromMeters } from "../../utils";

// TODO: add badges for telehealth and accepting new patients when we have them

function CompareDetail({
  data,
  zip,
}: {
  data: CareProviderSearchResult;
  zip: string | null;
}) {
  const { t } = useTranslation();

  return (
    <div className="display-flex height-full flex-column">
      <p className="margin-y-2 text-bold">{data.searchRank}.</p>
      <Link className="usa-link" to={`/result/${data.id}`}>
        <h2 className="margin-top-0 margin-bottom-3">{data.name}</h2>
      </Link>
      <div className="margin-bottom-3 flex-fill">
        {data.phone && (
          <>
            <h3 className="usa-sr-only">{t("telephoneNumber")}</h3>
            <ExternalLink variant="external" href={`tel:${data.phone}`}>
              {data.phone}
            </ExternalLink>
          </>
        )}
        {!!data.address?.length && (
          <>
            <h3 className="usa-sr-only">{t("address")}</h3>
            <div>
              {data.address.map((addr, idx) => (
                <Fragment key={idx}>
                  {addr}
                  <br />
                </Fragment>
              ))}
            </div>
          </>
        )}
      </div>
      {data.distance && (
        <div className="margin-bottom-1">
          {t("milesAwayFrom", {
            miles: getMilesFromMeters(data.distance).toFixed(1),
            zip,
          })}
        </div>
      )}
      <DirectionsLink careProvider={data} />
    </div>
  );
}

export default CompareDetail;
