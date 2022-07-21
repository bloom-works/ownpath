import { Button } from "@trussworks/react-uswds";
import { ReactComponent as Share } from "../images/share.svg";

type ShareButtonProps = {
  text: string;
};

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
    //TODO: add some action to indicate to user that the link has been copied
  }
};

function ShareButton({ text }: ShareButtonProps) {
  return (
    <Button
      type="button"
      unstyled
      onClick={onClick}
      className="display-flex align-items-center margin-y-1"
    >
      {text}
      <Share className="margin-left-1" />
    </Button>
  );
}

export default ShareButton;
