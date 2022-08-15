import Dropdown from "react-bootstrap/Dropdown";
import styled from "styled-components";
import { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";

const DropdownButton = styled(Dropdown.Toggle)`
  border-radius: 1.5rem;
  border: none;
  background-color: #efefef;
  color: black;
  &:hover,
  &:focus {
    border: none;
    background-color: #efefef;
    color: black;
  }
  &.active {
    border: none;
    background-color: #05176c;
    color: white;
  }
`;

type DesktopControlDropdownProps = {
  title: string;
  hasSelection: boolean;
  clear?: () => void;
};

function DesktopControlDropdown({
  title,
  hasSelection,
  clear,
  children,
}: PropsWithChildren<DesktopControlDropdownProps>) {
  const { t } = useTranslation();
  return (
    <Dropdown className="margin-right-05 margin-top-1 ">
      <DropdownButton className={hasSelection ? "active" : ""}>
        {title}
      </DropdownButton>
      <Dropdown.Menu>
        <div className="padding-2">{children}</div>
        {clear && (
          <Dropdown.Item
            as="button"
            onClick={clear}
            className="display-flex flex-justify-center"
          >
            <div className="usa-button usa-button--unstyled">{t("clear")}</div>
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DesktopControlDropdown;
