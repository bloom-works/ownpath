import { useTranslation } from "react-i18next";

import { CareProvider } from "../../types";
import CompareStripedRows from "./CompareStripedRows";

function TelehealthTable({
  providerA,
  providerB,
}: {
  providerA: CareProvider;
  providerB: CareProvider;
}) {
  const { t } = useTranslation();

  const rowData = [
    {
      label: t("available"),
      compareA: providerA.offersTelehealth,
      compareB: providerB.offersTelehealth,
    },
  ];

  return <CompareStripedRows rows={rowData} title={t("telehealth")} />;
}

export default TelehealthTable;
