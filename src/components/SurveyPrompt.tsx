import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { RefObject } from "react";
import { ModalRef, ModalToggleButton } from "@trussworks/react-uswds";

import { ReactComponent as Close } from "../images/close-circle.svg";
import { ReactComponent as ColoradoBhaLogo } from "../images/logos/colorado_bha.svg";
import { ReactComponent as OwnPathLogo } from "../images/logos/ownpath.svg";
import { ReactComponent as MiPropiaSendaLogo } from "../images/logos/mi_propia_senda.svg";

const SurveyPrompt = ({ modalRef }: { modalRef: RefObject<ModalRef> }) => {
  const { t, i18n } = useTranslation();
  return (
    <div>
      <div className="display-flex flex-justify-end margin-top-2">
        <ModalToggleButton
          modalRef={modalRef}
          className="width-auto"
          type="button"
          unstyled
          title="cancel"
          closer
        >
          <Close className="data-icon margin-left-1" />
        </ModalToggleButton>
      </div>
      <div className="display-flex flex-justify-center flex-align-center padding-y-2 padding-x-1">
        <div>
          {i18n.language === "es" ? (
            <MiPropiaSendaLogo
              height={34}
              width="auto"
              title={t("ownPathLogoAlt")}
            />
          ) : (
            <OwnPathLogo height={38} width="auto" title={t("ownPathLogoAlt")} />
          )}
        </div>
        <div className="margin-x-1 tablet:margin-x-2">{t("by")}</div>
        <div>
          <ColoradoBhaLogo
            height={i18n.language === "es" ? 32 : 34}
            width="auto"
          />
        </div>
      </div>
      <div className="margin-x-1 tablet:margin-x-3 margin-y-2">
        {t("surveyPrompt")}
      </div>
      <div className="display-flex flex-column flex-align-center">
        <Link
          className="usa-button margin-x-3 margin-top-2 font-family-heading"
          to="survey"
        >
          {t("surveyYes")}
        </Link>
        <ModalToggleButton
          style={{ width: "fit-content" }}
          modalRef={modalRef}
          type="button"
          className="margin-top-2 font-body-2xs"
          unstyled
        >
          {t("surveyNo")}
        </ModalToggleButton>
      </div>
    </div>
  );
};
export default SurveyPrompt;
