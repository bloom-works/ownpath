import { useTranslation } from "react-i18next";
import { getMilesFromMeters } from "../../utils";

export default function MilesAway({ meters }: { meters?: number }) {
  const { t } = useTranslation();
  const miles = meters ? getMilesFromMeters(meters).toFixed(1) : "??";
  return (
    <p className="margin-top-0 margin-bottom-0 text-bold">
      {t("milesAway", { miles })}
    </p>
  );
}
