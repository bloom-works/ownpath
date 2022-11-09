import { useTranslation } from "react-i18next";

import { CareProvider, LANGUAGES } from "../../types";
import CompareStripedRows from "./CompareStripedRows";

function LanguagesTable({
  providerA,
  providerB,
}: {
  providerA: CareProvider;
  providerB: CareProvider;
}) {
  const { t } = useTranslation();

  const rowData = LANGUAGES.map((lang) => {
    return {
      label: t(`languageValues${lang}`),
      compareA: providerA.languages[lang],
      compareB: providerB.languages[lang],
    };
  });

  return (
    <CompareStripedRows
      rows={rowData}
      title={t("languagesSpoken")}
      hideEmptyRows
    />
  );
}

export default LanguagesTable;
