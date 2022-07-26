import { Link as ExternalLink } from "@trussworks/react-uswds";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";

import { CareProviderSearchResult } from "../../types";
import DirectionsLink from "../ResultDetail/DirectionsLink";
import { getMilesFromMeters } from "../../utils";
import Badge from "../Badge";
import { ReactComponent as BadgeCheck } from "../../images/badge-check.svg";
import { ReactComponent as Telehealth } from "../../images/telehealth.svg";
import CallProviderLink from "../ResultDetail/CallProviderLink";

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
      <div className="margin-bottom-3 display-none tablet:display-flex flex-wrap">
        {data.acceptingNewPatients && (
          <Badge
            bgColor="blue"
            Icon={<BadgeCheck />}
            text={t("acceptingNewPatients")}
            showTooltip
            tooltipText={t("acceptingNewPatientsNote")}
          />
        )}
        {data.offersTelehealth && (
          <Badge
            bgColor="yellow"
            Icon={<Telehealth height={13} />}
            text={t("telehealthAvailable")}
          />
        )}
      </div>
      <div className="margin-bottom-3 flex-fill">
        {data.phone && (
          <>
            <h3 className="usa-sr-only">{t("telephoneNumber")}</h3>
            <ExternalLink variant="external" href={`tel:${data.phone}`}>
              {data.phone}
            </ExternalLink>
          </>
        )}
        {(!!data.address?.length || data.offersTelehealth) && (
          <>
            <h3 className="usa-sr-only">{t("address")}</h3>
            <div>
              {data.address?.length
                ? data.address.map((addr, idx) => (
                    <Fragment key={idx}>
                      {addr}
                      <br />
                    </Fragment>
                  ))
                : t("telehealthOnlyAddress")}
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
      {data.latlng && data.address ? (
        <DirectionsLink careProvider={data} />
      ) : (
        <CallProviderLink careProvider={data} />
      )}
    </div>
  );
}

export default CompareDetail;
