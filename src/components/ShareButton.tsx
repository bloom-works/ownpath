import { Button } from "@trussworks/react-uswds";
import { useState } from "react";
import styled from "styled-components";
import { ReactComponent as Share } from "../images/share.svg";

const TopToolTip = styled.span`
  margin-top: -2.5rem;
`;
type ShareButtonProps = {
  text: string;
};

function ShareButton({ text }: ShareButtonProps) {
  const [showCopiedToolTip, setShowCopiedToolTip] = useState(false);
  const onClick = () => {
    const shareData = {
      title: "OwnPath",
      text: "Search results from OwnPath",
      url: window.location.href,
    };
    if (navigator.canShare(shareData)) {
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
        Copied to clipboard!
      </TopToolTip>
      <Button
        type="button"
        unstyled
        onClick={onClick}
        className="display-flex align-items-center margin-y-1"
        data-position="top"
        aria-describedby="copied-tool-tip"
      >
        {text}
        <Share className="margin-left-1" />
      </Button>
    </span>
  );
}

export default ShareButton;
