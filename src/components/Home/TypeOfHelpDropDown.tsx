// import { Dropdown } from "@trussworks/react-uswds";
import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { SearchFilters, TypeOfHelp } from "../../types";

const DropdownToggle = styled(Dropdown.Toggle)`
  background-color: white;
  height: 3rem;

  &:hover,
  &:focus {
    background-color: white;
    color: #71767a;
    border-color: #565c65;
  }

  &.show {
    color: white !important;
  }

  border-width: 1px;
  border-radius: 0.25rem;
  border-color: #565c65;
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
          : t(`typeOfHelpValues${selected}`)}
      </DropdownToggle>
      <Dropdown.Menu>
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
              className="text-black"
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
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default TypeOfHelpDropDown;
