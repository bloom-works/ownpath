import { Link } from "@trussworks/react-uswds";
import { useTranslation } from "react-i18next";

import { ReactComponent as Telephone } from "../../images/phone.svg";
import { ReactComponent as Website } from "../../images/website.svg";
import { ReactComponent as Location } from "../../images/location.svg";
import { ReactComponent as DollarSign } from "../../images/dollar-sign.svg";
import { ReactComponent as Clock } from "../../images/clock.svg";
import { ReactComponent as BadgeCheck } from "../../images/badge-check.svg";
import { ReactComponent as Telehealth } from "../../images/telehealth.svg";

import ResultDatum from "./ResultDatum";
import Hours from "./Hours";

import { CareProvider } from "../../types";
import { anyAreTrue } from "../../utils";
import WebsiteLink from "./WebsiteLink";
import { Fragment } from "react";
import FeesInfo from "./FeesInfo";
import Badge from "../Badge";

type BasicResultDetailProps = {
  result: CareProvider;
  isCondensed?: boolean;
};

function BasicResultDetail({ result, isCondensed }: BasicResultDetailProps) {
  const { t } = useTranslation();

  return (
    <>
      {(result.acceptingNewPatients || result.offersTelehealth) && (
        <div className="margin-bottom-1 print-no-margin display-flex flex-wrap">
          {result.acceptingNewPatients && (
            <Badge
              bgColor="blue"
              Icon={<BadgeCheck />}
              text={t("acceptingNewPatients")}
              showTooltip
              tooltipText={t("acceptingNewPatientsNote")}
            />
          )}
          {result.offersTelehealth && (
            <Badge
              bgColor="yellow"
              Icon={<Telehealth height={13} />}
              text={t("telehealthAvailable")}
              showTooltip
              tooltipText={t("telehealthAvailableNote")}
            />
          )}
        </div>
      )}
      <div className="margin-bottom-3 print-no-margin">
        {((!!result.address?.length && !!result.latlng) ||
          result.offersTelehealth) && (
          <ResultDatum
            Icon={
              !isCondensed
                ? result.address?.length
                  ? Location
                  : Telehealth
                : undefined
            }
            iconClassName={"margin-top-05"}
            className={isCondensed ? "margin-y-0" : ""}
            key="address"
          >
            <h3 className="usa-sr-only">{t("address")}</h3>
            <div>
              {result.address?.length && !!result.latlng
                ? result.address.map((addr, idx) => (
                    <Fragment key={idx}>
                      {addr}
                      <br />
                    </Fragment>
                  ))
                : t("telehealthOnlyAddress")}
            </div>
          </ResultDatum>
        )}
        {result.phone && (
          <ResultDatum
            Icon={!isCondensed ? Telephone : undefined}
            iconClassName="margin-top-05"
            className={isCondensed ? "margin-y-0" : ""}
            key="telephone"
          >
            <h3 className="usa-sr-only">{t("telephoneNumber")}</h3>
            <Link variant="external" href={`tel:${result.phone}`}>
              {result.phone}
            </Link>
          </ResultDatum>
        )}
        {!isCondensed && result.website && (
          <ResultDatum
            Icon={!isCondensed ? Website : undefined}
            className={isCondensed ? "margin-y-0" : ""}
            key="website"
          >
            <h3 className="usa-sr-only">{t("website")}</h3>
            <WebsiteLink url={result.website} />
          </ResultDatum>
        )}
      </div>

      <ResultDatum Icon={DollarSign} key="fees">
        {!isCondensed && (
          <h3 className="font-body-sm margin-top-0 margin-bottom-05">
            {t("feesTitle")}
          </h3>
        )}
        {!!anyAreTrue(result.fees) ? (
          <FeesInfo fees={result.fees} isCondensed={isCondensed} />
        ) : (
          t("moreInfo")
        )}
      </ResultDatum>

      {!isCondensed && (
        <ResultDatum Icon={Clock} key="hours">
          <h3 className="font-body-sm margin-top-0 margin-bottom-05">
            {t("hours")}
          </h3>
          <Hours hours={result.hours} />
        </ResultDatum>
      )}
    </>
  );
}

export default BasicResultDetail;
