import { PropsWithChildren } from "react";
import HighlightBox from "./HighlightBox";

type AppAlertProps = {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  className?: string;
};
function AppAlert({
  Icon,
  className,
  children,
}: PropsWithChildren<AppAlertProps>) {
  return (
    <div className={`margin-y-1 ${className ? className : ""}`}>
      <HighlightBox size="sm">
        <div className="display-flex">
          <div>
            <Icon className="data-icon" />
          </div>
          <div className="margin-left-2 width-full">{children}</div>
        </div>
      </HighlightBox>
    </div>
  );
}

export default AppAlert;
