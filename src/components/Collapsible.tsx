import { Button } from "@trussworks/react-uswds";
import { useState } from "react";
import { ReactComponent as Minimize } from "../images/angle-down.svg";
import { ReactComponent as Maximize } from "../images/angle-up.svg";
import { ReactComponent as Close } from "../images/close.svg";

type CollapsibleProps = {
  open?: boolean;
  title: React.ReactNode;
  children: React.ReactNode;
  hideSurvey: () => void;
};

const Collapsible = ({
  open,
  title,
  children,
  hideSurvey,
}: CollapsibleProps) => {
  const [isOpen, setIsOpen] = useState(open);

  const handleCollapse = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      <div className="padding-1 border-bottom d-flex flex-justify flex-align-center">
        <div className="margin-left-2">{title}</div>
        <div className="display-flex flex-justify-end flex-align-center margin-right-0 tablet:margin-right-2">
          <Button
            type="button"
            unstyled
            title="collapse"
            onClick={handleCollapse}
          >
            {isOpen ? <Minimize /> : <Maximize />}
          </Button>
          <Button
            className="width-auto"
            type="button"
            unstyled
            title="cancel"
            onClick={hideSurvey}
          >
            <Close className="margin-left-1" />
          </Button>
        </div>
      </div>
      <div>{isOpen && <div>{children}</div>}</div>
    </div>
  );
};

export default Collapsible;
