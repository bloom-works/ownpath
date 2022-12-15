import { Button } from "@trussworks/react-uswds";
import { ReactComponent as TelehealthIcon } from "../../images/telehealth.svg";
import { SearchFilters, Telehealth } from "../../types";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Dispatch, SetStateAction } from "react";

const ToggleTelehealthMapButton = styled(Button)`
  z-index: 2000;
  width: fit-content;
`;

type ResultMapTelehealthToggleButtonProps = {
  filters: SearchFilters;
  setFilters: Dispatch<SetStateAction<SearchFilters>>;
  onClick?: () => void;
};

function ResultMapTelehealthToggleButton({
  filters,
  setFilters,
  onClick,
}: ResultMapTelehealthToggleButtonProps) {
  const { t } = useTranslation();

  const buttonType: "show-telehealth-only" | "show-all" =
    filters.telehealth === Telehealth.TelehealthOnly
      ? "show-all"
      : "show-telehealth-only";
  return (
    <ToggleTelehealthMapButton
      type="button"
      className={`radius-pill display-flex flex-align-center flex-justify-center text-body-md  margin-y-2 ${
        buttonType === "show-all" ? "" : "bg-white"
      }`}
      outline={buttonType === "show-all" ? false : true}
      base={buttonType === "show-all" ? true : false}
      onClick={() => {
        setFilters({
          ...filters,
          telehealth:
            buttonType === "show-all"
              ? Telehealth.InPersonAndTelehealth
              : Telehealth.TelehealthOnly,
        });
        if (onClick) onClick();
      }}
    >
      <TelehealthIcon className="margin-right-2" />
      {buttonType === "show-all"
        ? t("allProvidersButton")
        : t("telehealthOnlyProvidersButton")}
    </ToggleTelehealthMapButton>
  );
}

export default ResultMapTelehealthToggleButton;
