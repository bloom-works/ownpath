import { useTranslation } from "react-i18next";

import { CareProvider, ACCESSIBILITY_OPTIONS } from "../../types";
import CompareStripedRows from "./CompareStripedRows";

function AccessibilityTable({
  providerA,
  providerB,
}: {
  providerA: CareProvider;
  providerB: CareProvider;
}) {
  const { t } = useTranslation();

  const rowData = ACCESSIBILITY_OPTIONS.map((option) => {
    return {
      label: t(`accessibilityValues${option}`),
      compareA: providerA.accessibility[option],
      compareB: providerB.accessibility[option],
    };
  });

  return <CompareStripedRows rows={rowData} title={t("accessibilityTitle")} />;
}

export default AccessibilityTable;
