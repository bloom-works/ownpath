import { useTranslation } from "react-i18next";

import { CareProvider, FEE_PREFERENCES } from "../../types";
import CompareStripedRows from "./CompareStripedRows";

function FeesTable({
  providerA,
  providerB,
}: {
  providerA: CareProvider;
  providerB: CareProvider;
}) {
  const { t } = useTranslation();

  const rowData = FEE_PREFERENCES.filter(
    (feePreference) => feePreference !== "DontKnow"
  ).map((feePreference) => {
    return {
      label: t(`feesValues${feePreference}`),
      compareA: providerA.fees[feePreference],
      compareB: providerB.fees[feePreference],
    };
  });

  return <CompareStripedRows rows={rowData} />;
}

export default FeesTable;
