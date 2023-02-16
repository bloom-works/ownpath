// import { Dropdown } from "@trussworks/react-uswds";
import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { SearchFilters, TypeOfHelp } from "../../types";

const DropdownToggle = styled(Dropdown.Toggle)`
  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: white;
  height: 3rem;
  border-width: 1px;
  border-radius: 0.25rem;
  border-color: #565c65;
  width: 350px;
  @media (max-width: 640px) {
    width: 100%;
  }

  &:hover,
  &:focus {
    background-color: white;
    color: #71767a;
    border-color: #565c65;
  }

  &.show {
    color: white !important;
  }
`;
const DropdownMenu = styled(Dropdown.Menu)`
  width: 350px;
  @media (max-width: 640px) {
    width: 100%;
  }
`;

function TypeOfHelpDropDown({
  filters,
  setTypeOfHelp,
}: {
  filters: SearchFilters;
  setTypeOfHelp: (typeOfHelp: TypeOfHelp) => void;
}) {
  const { t } = useTranslation();

  const [selected, setSelected] = useState<string>("");
  return (
    <Dropdown
      id="type-of-help-dropdown"
      defaultValue=""
      aria-label={t("dropdownPrompt")}
    >
      <DropdownToggle
        className={!!filters.typesOfHelp.length ? "text-black" : "text-base"}
      >
        {selected === ""
          ? t("dropdownPrompt")
          : t(`typeOfHelpShortValues${selected}`)}
      </DropdownToggle>
      <DropdownMenu>
        <div className="padding-2">
          <Dropdown.Item key="default" value="" disabled hidden>
            {t("dropdownPrompt")}
          </Dropdown.Item>
          {[
            TypeOfHelp.MentalHealth,
            TypeOfHelp.SubstanceUse,
            TypeOfHelp.CourtMandatedTreatment,
            TypeOfHelp.SuicidalIdeation,
            TypeOfHelp.Unsure,
          ].map((typeOfHelp) => (
            <Dropdown.Item
              key={typeOfHelp}
              className="text-black text-wrap"
              value={typeOfHelp}
              onClick={() => {
                setSelected(typeOfHelp);

                // Ignore no-op value "unsure"
                if (typeOfHelp !== TypeOfHelp.Unsure) {
                  setTypeOfHelp(typeOfHelp);
                }
              }}
            >
              {t(`typeOfHelpValues${typeOfHelp}`)}
            </Dropdown.Item>
          ))}
        </div>
      </DropdownMenu>
    </Dropdown>
  );
}

export default TypeOfHelpDropDown;
