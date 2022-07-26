import { PropsWithChildren } from "react";
import styled from "styled-components";

const Alert = styled.div`
  background-color: #9ac6e533;
  color: black;
`;

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
    <Alert
      className={`radius-lg margin-y-1 display-flex padding-2 ${
        className ? className : ""
      }`}
    >
      <div>
        <Icon className="data-icon" />
      </div>
      <div className="margin-left-2 width-full">{children}</div>
    </Alert>
  );
}

export default AppAlert;
