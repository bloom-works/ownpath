import { Button } from "@trussworks/react-uswds";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { createSearchParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AnalyticsAction, logEvent } from "../../utils/analytics";
import { SearchFilters, TypeOfHelp } from "../../types";
import { EMPTY_SEARCH_FILTERS, getZipSearchMetadata } from "../../utils";
import ZipInput from "../ZipInput";
import { SurveyTriggerContext } from "../../App";
import TypeOfHelpDropDown from "./TypeOfHelpDropDown";
import locationURL from "../../images/location.svg";
import { ReactComponent as Phone } from "../../images/phone.svg";

import AppAlert from "../AppAlert";

const SearchButton = styled(Button)`
  @media (min-width: 480px) {
    max-width: 6rem;
  }
  height: 3rem;
  margin-right: 0;
`;

const StyledZipContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: space-between;

  & > * {
    margin: 0.25rem 0;
  }
  @media (min-width: 480px) {
    flex-direction: row;
    & > * {
      margin: 0 0.25rem;
    }
  }

  & #zip {
    border-radius: 0.25rem;
    height: 3rem;
    background-image: none;
    padding-left: 0.8rem;
    width: 100%;

    @media (min-width: 480px) {
      width: 180px;
    }
  }

  .usa-error-message {
    white-space: normal;
    width: width: 100%;

    @media (min-width: 480px) {
      width: 180px;
    };
  }

  & #zip[value=""] {
    color: #71767a;
    padding-left: 2rem;
    background-image: url(${locationURL});
    background-repeat: no-repeat;
    background-position: left;
    background-position-x: 0.8rem;
  }
`;

function SearchCard() {
  const [filters, setFilters] = useState<SearchFilters>(EMPTY_SEARCH_FILTERS);

  const { t } = useTranslation();
  const navigate = useNavigate();

  const zipMeta = getZipSearchMetadata(filters.zip);

  // Global application state to track trigger events for showing user
  // option to take site survey
  const { incrementTriggerEventCount } = useContext(SurveyTriggerContext);

  // don't show validation errors until clicking search or clicking out of input
  const [showValidation, setShowValidation] = useState<boolean>(false);

  console.log("filters", filters);
  return (
    <div>
      {filters.typesOfHelp.includes(TypeOfHelp.SuicidalIdeation) && (
        <div className="margin-y-2" id="crisis-content-box">
          <AppAlert Icon={Phone}>
            <div>{t("suicidalIdeationAlert")}</div>
            <div className="text-bold margin-top-1">
              {t("suicidalIdeationCta")}
            </div>
          </AppAlert>
        </div>
      )}
      <h2 className="margin-top-0 font-body-sm">{t("zipCodePrompt")}</h2>
      <form
        onSubmit={(evt) => {
          evt.preventDefault();
          if (zipMeta.isValidZip) {
            logEvent(AnalyticsAction.CompleteZipSearch, {
              search: filters.zip,
            });
            incrementTriggerEventCount();
            navigate({
              pathname: "/search",
              search: createSearchParams({
                ...filters,
                miles: `${zipMeta.defaultRadiusMiles}`,
              }).toString(),
            });
          } else {
            setShowValidation(true);
            logEvent(AnalyticsAction.SearchError, { search: filters.zip });
          }
        }}
      >
        <StyledZipContainer>
          <ZipInput
            zip={filters.zip}
            setZip={(zip) => setFilters({ ...filters, zip })}
            placeholder={t("zipCode")}
            showError={showValidation}
            noLabel
          />
          <TypeOfHelpDropDown
            filters={filters}
            setTypeOfHelp={(typeOfHelp: TypeOfHelp) =>
              setFilters({
                ...filters,
                typesOfHelp: [typeOfHelp],
              })
            }
          />
          <SearchButton type="submit" className="usa-button">
            {t("search")}
          </SearchButton>
        </StyledZipContainer>
      </form>
    </div>
  );
}

export default SearchCard;
