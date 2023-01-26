import { Button } from "@trussworks/react-uswds";
import { useState } from "react";
import styled from "styled-components";
import { ReactComponent as Share } from "../images/share.svg";
import { isMobile } from "react-device-detect";
import { useTranslation } from "react-i18next";
import { AnalyticsAction, logEvent } from "../utils/analytics";

const TopToolTip = styled.span`
  margin-top: -2.5rem;
`;

const NoHoverButton = styled(Button)`
  &:hover {
    text-decoration: none;
  }
`;

type ShareButtonProps = {
  text: string;
};

function ShareButton({ text }: ShareButtonProps) {
  const { t } = useTranslation();
  const [showCopiedToolTip, setShowCopiedToolTip] = useState(false);
  const onClick = () => {
    const url = window.location.href;
    logEvent(AnalyticsAction.ClickShare, { url });
    const shareData = {
      title: "OwnPath",
      text: "Search results from OwnPath",
      url,
    };
    if (navigator.canShare && navigator.canShare(shareData) && isMobile) {
      navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShowCopiedToolTip(true);
      setTimeout(() => setShowCopiedToolTip(false), 1000);
    }
  };

  return (
    <span className="usa-tooltip">
      <TopToolTip
        id="copied-tool-tip"
        className={`usa-tooltip__body usa-tooltip__body--top ${
          showCopiedToolTip ? "is-visible is-set" : ""
        }`}
        aria-hidden={!showCopiedToolTip}
      >
        {t("linkCopied")}
      </TopToolTip>
      <NoHoverButton
        type="button"
        unstyled
        onClick={onClick}
        className="display-flex align-items-center margin-y-1"
        data-position="top"
        aria-describedby="copied-tool-tip"
      >
        {text}
        <Share className="margin-left-1" />
      </NoHoverButton>
    </span>
  );
}

export default ShareButton;
