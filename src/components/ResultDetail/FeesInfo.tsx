import React from "react";
import { useTranslation } from "react-i18next";
import { FeePreference } from "../../types";

function FeesInfo({
  fees,
  isCondensed,
}: {
  fees: { [key in FeePreference]: boolean };
  isCondensed?: boolean;
}) {
  const { t } = useTranslation();

  return (
    <>
      {Object.entries(fees)
        .filter(([_, val]) => !!val)
        .map(([key], idx, arr) => (
          <React.Fragment key={key}>
            {t(`feesValues${key}`)}
            {!isCondensed && key === "PrivateInsurance" && "*"}
            {idx < arr.length - 1 ? ", " : ""}
          </React.Fragment>
        ))}
      {!isCondensed && fees.PrivateInsurance && (
        <div className="margin-top-05 font-body-3xs">
          *{t(`privateInsuranceNote`)}
        </div>
      )}
    </>
  );
}

export default FeesInfo;
