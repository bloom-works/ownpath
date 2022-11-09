import { useTranslation } from "react-i18next";

import { CareProvider, MENTAL_HEALTH_SERVICES } from "../../types";
import CompareStripedRows from "./CompareStripedRows";

function MentalHealthServicesTable({
  providerA,
  providerB,
}: {
  providerA: CareProvider;
  providerB: CareProvider;
}) {
  const { t } = useTranslation();

  const rowData = MENTAL_HEALTH_SERVICES.map((service) => {
    return {
      label: t(service),
      compareA: providerA.mentalHealth.supported
        ? providerA.mentalHealth.services[service]
        : false,
      compareB: providerB.mentalHealth.supported
        ? providerB.mentalHealth.services[service]
        : false,
    };
  });

  return (
    <CompareStripedRows rows={rowData} title={t("mentalHealthServices")} />
  );
}

export default MentalHealthServicesTable;
