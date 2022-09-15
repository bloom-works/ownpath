import { Link } from "@trussworks/react-uswds";
import { useTranslation } from "react-i18next";

import { ReactComponent as Telephone } from "../../images/phone.svg";
import { ReactComponent as Website } from "../../images/website.svg";
import { ReactComponent as Location } from "../../images/location.svg";
import { ReactComponent as DollarSign } from "../../images/dollar-sign.svg";
import { ReactComponent as Clock } from "../../images/clock.svg";

import ResultDatum from "./ResultDatum";
import Hours from "./Hours";

import { CareProvider } from "../../types";
import { anyAreTrue } from "../../utils";
import WebsiteLink from "./WebsiteLink";
import { Fragment } from "react";
import FeesInfo from "./FeesInfo";

type BasicResultDetailProps = {
  headingLevel: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  result: CareProvider;
  isCondensed?: boolean;
};

function BasicResultDetail({
  headingLevel,
  result,
  isCondensed,
}: BasicResultDetailProps) {
  const { t } = useTranslation();
  const Heading = headingLevel;

  return (
    <>
      <div className="margin-bottom-3">
        {result.phone && (
          <ResultDatum Icon={Telephone} key="telephone">
            <Heading className="usa-sr-only">{t("telephoneNumber")}</Heading>
            <Link variant="external" href={`tel:${result.phone}`}>
              {result.phone}
            </Link>
          </ResultDatum>
        )}
        {!!result.address?.length && (
          <ResultDatum Icon={Location} key="address">
            <Heading className="usa-sr-only">{t("address")}</Heading>
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
            <Heading className="usa-sr-only">{t("website")}</Heading>
            <WebsiteLink url={result.website} />
          </ResultDatum>
        )}
      </div>

      <ResultDatum Icon={DollarSign} key="fees">
        <Heading className="font-body-sm margin-top-0 margin-bottom-05">
          {t("feesTitle")}
        </Heading>
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
        <Heading className="font-body-sm margin-top-0 margin-bottom-05">
          {t("hours")}
        </Heading>
        <Hours hours={result.hours} />
      </ResultDatum>
    </>
  );
}

export default BasicResultDetail;
