import { Button } from "@trussworks/react-uswds";
import { ReactComponent as ArrowLeft } from "../images/arrow-left.svg";
import { Link } from "react-router-dom";

type BackButtonProps = {
  text: string;
  href?: string;
  onClick?: () => void;
};

function BackButton({ text, href, onClick }: BackButtonProps) {
  if (href)
    return (
      <Link
        className="display-flex flex-align-center usa-button usa-button--unstyled width-auto"
        to={href}
      >
        <ArrowLeft className="margin-right-1" />
        {text}
      </Link>
    );
  else if (onClick) {
    return (
      <Button
        type="button"
        unstyled
        className="display-flex flex-align-center"
        onClick={onClick}
      >
        <ArrowLeft className="margin-right-1" />
        {text}
      </Button>
    );
  } else {
    throw new Error("href for onClick must be provided");
  }
}

export default BackButton;
