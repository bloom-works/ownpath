import { Button } from "@trussworks/react-uswds";
import { ReactComponent as Print } from "../images/print.svg";
import { useTranslation } from "react-i18next";
import { isMobile } from "react-device-detect";

type PrintButtonProps = {
  onClick: () => void;
  className?: string;
};

export const PrintButton = ({ onClick, className }: PrintButtonProps) => {
  const { t } = useTranslation();

  if (isMobile) return <></>;
  return (
    <Button
      onClick={onClick}
      type="button"
      unstyled
      className={`display-flex align-items-center margin-y-1 width-auto ${
        className || ""
      }`}
    >
      {t("print")}
      <Print className="margin-left-1" />
    </Button>
  );
};