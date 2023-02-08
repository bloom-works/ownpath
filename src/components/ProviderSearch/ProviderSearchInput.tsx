import { ReactSearchAutocomplete } from "react-search-autocomplete";
import CARE_PROVIDER_DATA from "../../data/ladders_data.json";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

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

  // Take user to provider detail page when they click a provider name
  const handleOnSelect = (providersList: Item) => {
    navigate(`/result/${providersList.id}`);
  };

  return (
    <div>
      <div
        style={{ width: 300, marginLeft: 100, marginBottom: 20, marginTop: 20 }}
      >
        <ReactSearchAutocomplete<Item>
          items={providersList}
          placeholder={t("providerSearchPlaceholder")}
          fuseOptions={{ keys: ["name"] }}
          resultStringKeyName="name"
          maxResults={6}
          onSelect={handleOnSelect}
          styling={{ zIndex: 4 }} // To display it on top of the search box below
          autoFocus={false}
        />
      </div>
    </div>
  );
}

export default ProviderSearchInput;
