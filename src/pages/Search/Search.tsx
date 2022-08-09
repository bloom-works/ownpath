import React, { useEffect, useState } from "react";

import { Button, Grid } from "@trussworks/react-uswds";
import { useTranslation } from "react-i18next";
import { useSearchParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  applySearchFilters,
  getFiltersFromSearchParams,
  MILE_DISTANCE_OPTIONS,
} from "../../utils";
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
  let searchFilters = getFiltersFromSearchParams(searchParams);

  // Filtered set of CareProviders OR error string
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);

  // flag to display change zip input
  const [showZipInput, setShowZipInput] = useState(false);
  // state var to hold zip to ensure changes are only applied after button click
  const [zip, setZip] = useState(searchFilters.zip);

  // flag to pass down into Desktop controls to indicate if distance
  // has been updated (by expand radius button when no results)
  const [distanceUpdated, setDistanceUpdated] = useState(false);

  const navigate = useNavigate();

  const isWidestRadius = (miles: string) =>
    miles === MILE_DISTANCE_OPTIONS[MILE_DISTANCE_OPTIONS.length - 1];

  const expandSearchRadius = (miles: string) => {
    // if expanded search radius is max, update search filters and stop recursing
    if (isWidestRadius(miles)) {
      setDistanceUpdated(true);
      setSearchParams({ ...searchFilters, miles });
      return;
    }
    // otherwise, set radius to next radius and apply updated filters
    const nextRadius =
      MILE_DISTANCE_OPTIONS[
        MILE_DISTANCE_OPTIONS.findIndex((_miles) => miles === _miles) + 1
      ];

    const updatedFilters = { ...searchFilters, miles: nextRadius };
    const resultCount = applySearchFilters(
      CARE_PROVIDER_DATA as CareProvider[],
      updatedFilters
    ).results.length;

    // Base case -- results found, set search filters & stop recursing
    if (resultCount > 0) {
      setDistanceUpdated(true);
      setSearchParams(updatedFilters);
      return;
    }

    // continue recursing
    expandSearchRadius(nextRadius);
  };

  const performSearch = (filters: SearchFilters) => {
    const result = applySearchFilters(
      CARE_PROVIDER_DATA as CareProvider[],
      filters
    );
    setSearchResult(result);
  };

  useEffect(() => {
    // zip is the only required filter - redirect to homepage if it doesn't exist
    if (!searchFilters.zip) {
      navigate("/", {
        replace: true,
      });
    } else {
      window.scrollTo(0, 0);
      performSearch(searchFilters);
      logPageView();
    }
  }, []);

  useEffect(() => {
    performSearch(searchFilters);
  }, [searchParams]);

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
                    className="margin-left-1 padding-y-05 width-auto"
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
                      setSearchParams({ ...searchFilters, zip });
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
              {/* <ShareButton text={t(`${T_PREFIX}share`)} /> */}
            </Grid>
            <DesktopControl
              distanceUpdatedExternally={distanceUpdated}
              filters={searchFilters}
              setFilters={(filters) => {
                setSearchParams({ ...filters });
                logEvent(AnalyticsAction.ApplyFilter, {
                  label: "Filter dropdown button",
                });
              }}
            />
            <MobileControl
              filters={searchFilters}
              setFilters={(filters) => setSearchParams({ ...filters })}
            />
          </div>

          {searchResult.results.length ? (
            <div>
              <DesktopResults results={searchResult.results} />
              <MobileResults results={searchResult.results} />
            </div>
          ) : (
            <div className="p-5">
              {isWidestRadius(searchFilters.miles) ? (
                <p>
                  {t(`${T_PREFIX}noResultsGeneric`, {
                    miles: searchFilters.miles,
                  })}
                </p>
              ) : (
                <>
                  <p>
                    {t(`${T_PREFIX}noResultsExpandRadius`, {
                      miles: searchFilters.miles,
                    })}
                  </p>
                  <Button
                    type="button"
                    onClick={() => expandSearchRadius(searchFilters.miles)}
                  >
                    {t(`${T_PREFIX}noResultsExpandRadiusButton`)}
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
