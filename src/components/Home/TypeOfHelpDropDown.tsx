import { Dropdown } from "@trussworks/react-uswds";
import { useTranslation } from "react-i18next";
import { SearchFilters, TypeOfHelp } from "../../types";

function TypeOfHelpDropDown({
  filters,
  setTypeOfHelp,
}: {
  filters: SearchFilters;
  setTypeOfHelp: (typeOfHelp: string) => void;
}) {
  const { t } = useTranslation();

  return (
    <Dropdown
      className={`height-6 margin-top-0 radius-md ${
        !!filters.typesOfHelp.length ? "text-black" : "text-base"
      }`}
      id="type-of-help-dropdown"
      name="type-of-help"
      onChange={(evt) => {
        setTypeOfHelp(evt.target.value);
      }}
    >
      <option value="" disabled selected hidden>
        {t("dropdownPrompt")}
      </option>
      {[
        TypeOfHelp.MentalHealth,
        TypeOfHelp.SubstanceUse,
        TypeOfHelp.CourtMandatedTreatment,
        TypeOfHelp.SuicidalIdeation,
        TypeOfHelp.Unsure,
      ].map((typeOfHelp) => (
        <option className="text-black" value={typeOfHelp}>
          {t(`typeOfHelpValues${typeOfHelp}`)}
        </option>
      ))}
    </Dropdown>
  );
}

export default TypeOfHelpDropDown;
