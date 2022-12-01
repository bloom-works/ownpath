import { useTranslation } from "react-i18next";

import { CareProvider, SUBSTANCE_USE_SERVICES } from "../../types";
import CompareStripedRows from "./CompareStripedRows";

function SubstanceUseServicesTable({
  providerA,
  providerB,
}: {
  providerA: CareProvider;
  providerB: CareProvider;
}) {
  const { t } = useTranslation();

  if (!providerA.substanceUse.supported && !providerB.substanceUse.supported) {
    return <></>;
  }

  const rowData = SUBSTANCE_USE_SERVICES.map((service) => {
    return {
      label: t(service),
      compareA: providerA.substanceUse.supported
        ? providerA.substanceUse.services[service]
        : false,
      compareB: providerB.substanceUse.supported
        ? providerB.substanceUse.services[service]
        : false,
    };
  });

  return (
    <CompareStripedRows rows={rowData} title={t("substanceUseServices")} />
  );
}

export default SubstanceUseServicesTable;
