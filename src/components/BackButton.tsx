import { Button, Link } from "@trussworks/react-uswds";
import { ReactComponent as ArrowLeft } from "../images/arrow-left.svg";

type BackButtonProps = {
  text: string;
  href?: string;
  onClick?: () => void;
};

function BackButton({ text, href, onClick }: BackButtonProps) {
  if (href)
    return (
      <Link
        className="usa-button usa-button--unstyled display-flex flex-align-center"
        href={href}
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
