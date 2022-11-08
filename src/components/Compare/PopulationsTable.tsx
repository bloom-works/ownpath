import { useTranslation } from "react-i18next";

import { CareProvider, POPULATIONS_SERVED } from "../../types";
import CompareStripedRows from "./CompareStripedRows";

function PopulationsTable({
  providerA,
  providerB,
}: {
  providerA: CareProvider;
  providerB: CareProvider;
}) {
  const { t } = useTranslation();

  const rowData = POPULATIONS_SERVED.map((pop) => {
    return {
      label: t(pop),
      compareA: providerA.populationsServed[pop],
      compareB: providerB.populationsServed[pop],
    };
  });

  return (
    <CompareStripedRows rows={rowData} title={t("populations")} hideEmptyRows />
  );
}

export default PopulationsTable;
