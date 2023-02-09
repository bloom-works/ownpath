import { ReactSearchAutocomplete } from "react-search-autocomplete";
import CARE_PROVIDER_DATA from "../../data/ladders_data.json";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AnalyticsAction, logEvent } from "../../utils/analytics";

type Item = {
  id: string;
  name: string;
};

// Grab id and name from CareProvider data
const providersList = CARE_PROVIDER_DATA.map((provider) => ({
  id: provider.id,
  name: provider.name,
}));

function ProviderSearchInput({}) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [searchString, setSearchString] = useState("");

  const handleOnSelect = (providersList: Item) => {
    logEvent(AnalyticsAction.SearchProviderByName);

    // setTimeout otherwise search string is not cleared when selecting via click
    setTimeout(() => setSearchString(""), 1);
    navigate(`/result/${providersList.id}`);
  };

  return (
    <div className="width-card-lg">
      <ReactSearchAutocomplete<Item>
        items={providersList}
        placeholder={t("providerSearchPlaceholder")}
        fuseOptions={{ keys: ["name"] }}
        resultStringKeyName="name"
        maxResults={6}
        onSelect={handleOnSelect}
        styling={{ zIndex: 4, borderRadius: "4px", boxShadow: "none" }}
        autoFocus={false}
        inputSearchString={searchString}
        onSearch={(s) => setSearchString(s)}
      />
    </div>
  );
}

export default ProviderSearchInput;
