import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { ReactComponent as Info } from "../images/info.svg";

const Alert = styled.div`
  background-color: #9ac6e533;
  color: black;
  &.icon {
    color: #05176c;
  }
  &.wide {
    @media (min-width: 40em) {
      width: 200%;
    }
  }
`;
function DataCollectionAlert({
  className,
  wide = false,
}: {
  className?: string;
  wide?: boolean;
}) {
  const { t } = useTranslation();
  return (
    <Alert
      className={`radius-lg margin-y-1 display-flex padding-2 ${
        wide ? "wide" : ""
      } ${className ? className : ""}`}
    >
      <div>
        <Info className="data-icon" />
      </div>
      <div className="margin-left-1">
        {t("components.dataCollectionAlert.alert")}
      </div>
    </Alert>
  );
}

export default DataCollectionAlert;
