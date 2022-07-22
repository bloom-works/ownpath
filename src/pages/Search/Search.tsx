import React, { useEffect, useState } from "react";

import { Button, Grid } from "@trussworks/react-uswds";
import { useTranslation } from "react-i18next";
import { useSearchParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  getMatchingCare,
  getFiltersFromSearchParams,
  MILE_DISTANCE_OPTIONS,
} from "../../util";
import CARE_PROVIDER_DATA from "../../data/ladders_data.json";
import { CareProvider, SearchFilters, SearchResult } from "../../types";
import DesktopControl from "../../components/Search/Filters/Control/DesktopControl";
import ShareButton from "../../components/ShareButton";
import { AnalyticsAction, logEvent, logPageView } from "../../analytics";
import MobileControl from "../../components/Search/Filters/Control/MobileControl";
import ZipInput from "../../components/ZipInput";
import DesktopResults from "./DesktopResults";
import MobileResults from "./MobileResults";
import { ReactComponent as Close } from "../../images/close.svg";

const T_PREFIX = "pages.search.";

const ResponsiveHeader = styled.h1`
  font-size: 1.5rem;
  @media (min-width: 40em) {
    font-size: 2rem;
  }
`;

function Search() {
  const { t } = useTranslation();
  // Search filters as URL search params
  const [searchParams, setSearchParams] = useSearchParams();
  const initialFilters = getFiltersFromSearchParams(searchParams);

  // TODO: do we need this, or can we just use searchParams to track filter state?
  const [searchFilters, setSearchFilters] =
    useState<SearchFilters>(initialFilters);
  // flag to display distance filter in active state once user has changed distance
  // from default or guided search selection
  const [showDistanceActive, setShowDistanceActive] = useState(false);
  // Filtered set of CareProviders OR error string
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);

  // flag to display change zip input
  const [showZipInput, setShowZipInput] = useState(false);
  // state var to hold zip to ensure changes are only applied after button click
  const [zip, setZip] = useState(searchFilters.zip);

  const navigate = useNavigate();

  const performSearch = (filters: SearchFilters) => {
    const result = getMatchingCare(
      CARE_PROVIDER_DATA as CareProvider[],
      filters
    );
    setSearchResult(result);
  };

  const isCurrentlyAtWidestRadius =
    searchFilters.miles ===
    MILE_DISTANCE_OPTIONS[MILE_DISTANCE_OPTIONS.length - 1];

  useEffect(() => {
    // zip is the only required filter - redirect to homepage if it doesn't exist
    if (!initialFilters.zip) {
      navigate("/", {
        replace: true,
      });
    } else {
      performSearch(searchFilters);
      logPageView();
    }
  }, []);

  useEffect(() => {
    setSearchParams(searchFilters);
    performSearch(searchFilters);
  }, [searchFilters]);

  return (
    <div className="Search">
      {searchResult && (
        <div>
          <div className="margin-y-2 padding-x-2 tablet:padding-x-5">
            <Grid
              row
              className="flex-justify-start tablet:flex-justify flex-align-center margin-bottom-2"
            >
              <div>
                <div className="display-flex flex-align-baseline">
                  <ResponsiveHeader className="margin-top-0 text-bold">
                    {t(`${T_PREFIX}resultCount`, {
                      count: searchResult.results.length,
                      zip: searchFilters.zip,
                    })}
                  </ResponsiveHeader>

                  <Button
                    className="margin-left-1 width-auto"
                    type="button"
                    unstyled
                    onClick={() => {
                      setShowZipInput(!showZipInput);
                      setZip(searchFilters.zip);
                    }}
                  >
                    {showZipInput ? (
                      <>
                        {t("common.close")} <Close className="margin-left-05" />
                      </>
                    ) : (
                      t("common.change")
                    )}
                  </Button>
                </div>
                {showZipInput && (
                  <form
                    onSubmit={() => {
                      setSearchFilters({ ...searchFilters, zip });
                      setShowZipInput(false);
                    }}
                  >
                    <ZipInput zip={zip} setZip={(_zip) => setZip(_zip)}>
                      <Button className="margin-left-1" type="submit">
                        {t("common.search")}
                      </Button>
                    </ZipInput>
                  </form>
                )}
              </div>
              <ShareButton text={t(`${T_PREFIX}share`)} />
            </Grid>
            <DesktopControl
              filters={searchFilters}
              setFilters={(filters) => {
                setSearchFilters(filters);
                logEvent(AnalyticsAction.ApplyFilter, {
                  label: "Filter dropdown button",
                });
              }}
            />
            <MobileControl
              filters={searchFilters}
              setFilters={setSearchFilters}
            />
          </div>
          <div>
            {searchResult.results.length ? (
              <>
                <DesktopResults results={searchResult.results} />
                <MobileResults results={searchResult.results} />
              </>
            ) : (
              <p className="p-5">
                {isCurrentlyAtWidestRadius
                  ? t(`${T_PREFIX}noResultsGeneric`, {
                      miles: searchFilters.miles,
                    })
                  : t(`${T_PREFIX}noResultsExpandRadius`, {
                      miles: searchFilters.miles,
                    })}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
