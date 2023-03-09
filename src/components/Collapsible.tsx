import { Button } from "@trussworks/react-uswds";
import { useState } from "react";
import { ReactComponent as Minimize } from "../images/angle-down.svg";
import { ReactComponent as Maximize } from "../images/angle-up.svg";
import { ReactComponent as Close } from "../images/close-survey.svg";

const Collapsible = ({
  open,
  title,
  children,
  hideSurvey,
}: {
  open?: boolean;
  title: string;
  children: React.ReactNode;
  hideSurvey: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(open);

  const handleCollapse = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      <div className="p-1 border-bottom d-flex justify-content-between align-items-center">
        <h6 className="text-bold margin-left-2">{title}</h6>
        <div className="display-flex flex-justify-end margin-right-0 tablet:margin-right-2">
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
