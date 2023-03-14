import { Button, Link as ExternalLink } from "@trussworks/react-uswds";
import { ReactComponent as Close } from "../../images/close.svg";
import { ReactComponent as Phone } from "../../images/phone.svg";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

type CrisisAlertProps = {
  onClose: () => void;
};

const ShadowBox = styled.div`
  filter: drop-shadow(0px 3px 1px rgba(47, 111, 167, 0.1));
`;

function CrisisAlert({ onClose }: CrisisAlertProps) {
  const { t } = useTranslation();
  return (
    <ShadowBox className="display-flex flex-justify padding-2 radius-lg bg-white ">
      <div className="display-flex">
        <div className="display-none tablet:display-block">
          <Phone className="text-dark-blue margin-right-2" />
        </div>
        <div>
          {t("crisisAlert")}{" "}
          <ExternalLink href="tel:+18444938255" className="text-no-wrap">
            {t("crisisAlertNumber")}
          </ExternalLink>
        </div>
      </div>
      <Button
        className="width-auto margin-left-1"
        type="button"
        unstyled
        title="close"
        onClick={onClose}
      >
        <Close className="text-dark-blue" />
      </Button>
    </ShadowBox>
  );
}

export default CrisisAlert;
