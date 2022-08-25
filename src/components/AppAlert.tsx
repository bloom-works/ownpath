import { PropsWithChildren } from "react";
import HighlightBox from "./HighlightBox";

type AppAlertProps = {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
};
function AppAlert({ Icon, children }: PropsWithChildren<AppAlertProps>) {
  return (
    <HighlightBox size="sm">
      <div className="display-flex">
        <div>
          <Icon className="data-icon" />
        </div>
        <div className="margin-left-2 width-full">{children}</div>
      </div>
    </HighlightBox>
  );
}

export default AppAlert;
