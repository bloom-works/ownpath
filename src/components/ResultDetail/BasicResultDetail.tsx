import { Link } from "@trussworks/react-uswds";
import { useTranslation } from "react-i18next";

import { ReactComponent as Telephone } from "../../images/phone.svg";
import { ReactComponent as Website } from "../../images/website.svg";
import { ReactComponent as Location } from "../../images/location.svg";
import { ReactComponent as DollarSign } from "../../images/dollar-sign.svg";
import { ReactComponent as Clock } from "../../images/clock.svg";
// TODO: wire in badges to list
// import { ReactComponent as BadgeCheck } from "../../images/badge-check.svg";
// import { ReactComponent as Telehealth } from "../../images/telehealth.svg";

import ResultDatum from "./ResultDatum";
import Hours from "./Hours";

import { CareProvider } from "../../types";
import { anyAreTrue } from "../../utils";
import WebsiteLink from "./WebsiteLink";
import { Fragment } from "react";
import FeesInfo from "./FeesInfo";
// TODO: wire in badges to list
// import Badge from "../Badge";

type BasicResultDetailProps = {
  result: CareProvider;
  isCondensed?: boolean;
};

function BasicResultDetail({ result, isCondensed }: BasicResultDetailProps) {
  const { t } = useTranslation();

  return (
    <>
      <div className="margin-bottom-3">
        {result.phone && (
          <ResultDatum Icon={Telephone} key="telephone">
            <h3 className="usa-sr-only">{t("telephoneNumber")}</h3>
            <Link variant="external" href={`tel:${result.phone}`}>
              {result.phone}
            </Link>
          </ResultDatum>
        )}
        {!!result.address?.length && (
          <ResultDatum Icon={Location} key="address">
            <h3 className="usa-sr-only">{t("address")}</h3>
            <div>
              {result.address.map((addr, idx) => (
                <Fragment key={idx}>
                  {addr}
                  <br />
                </Fragment>
              ))}
            </div>
          </ResultDatum>
        )}
        {result.website && (
          <ResultDatum Icon={Website} key="website">
            <h3 className="usa-sr-only">{t("website")}</h3>
            <WebsiteLink url={result.website} />
          </ResultDatum>
        )}
      </div>

      <ResultDatum Icon={DollarSign} key="fees">
        <h3 className="font-body-sm margin-top-0 margin-bottom-05">
          {t("feesTitle")}
        </h3>
        {!!anyAreTrue(result.fees) ? (
          <>
            <FeesInfo fees={result.fees} isCondensed={isCondensed} />
            {/* <Button type="button" unstyled className="font-ui-xs">
                What do these mean?
              </Button> */}
          </>
        ) : (
          t("moreInfo")
        )}
      </ResultDatum>

      <ResultDatum Icon={Clock} key="hours">
        <h3 className="font-body-sm margin-top-0 margin-bottom-05">
          {t("hours")}
        </h3>
        <Hours hours={result.hours} />
      </ResultDatum>
    </>
  );
}

export default BasicResultDetail;
