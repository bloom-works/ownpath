import { ReactSearchAutocomplete } from "react-search-autocomplete";
import CARE_PROVIDER_DATA from "../../data/ladders_data.json";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";

import { AnalyticsAction, logEvent } from "../../utils/analytics";
import searchURL from "../../images/search.svg";

const AutocompleteWrapper = styled.div`
  width: 300px;
  @media (max-width: 480px) {
    width: 100%;
    margin: 0 1rem;
  }
  * > input {
    font-family: "Trebuchet MS";
    background-image: url(${searchURL});
    background-repeat: no-repeat;
    background-size: 3%;
    background-position: 95% center;
  }
`;

type Item = {
  id: string;
  name: string;
};

// Grab id and name from CareProvider data
const providersList = CARE_PROVIDER_DATA.map((provider) => ({
  id: provider.id,
  name: provider.name,
}));

const formatResult = (item: Item) => {
  return <>{item.name}</>;
};

function ProviderSearchInput() {
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
    <AutocompleteWrapper>
      <ReactSearchAutocomplete<Item>
        items={providersList}
        placeholder={t("providerSearchPlaceholder")}
        fuseOptions={{ keys: ["name"] }}
        resultStringKeyName="name"
        maxResults={6}
        onSelect={handleOnSelect}
        styling={{
          zIndex: 4,
          borderRadius: "4px",
          boxShadow: "none",
        }}
        autoFocus={false}
        inputSearchString={searchString}
        onSearch={(s) => setSearchString(s)}
        formatResult={formatResult}
        showIcon={false}
      />
    </AutocompleteWrapper>
  );
}

export default ProviderSearchInput;
