import React, {
  createContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

import { Button, Grid } from "@trussworks/react-uswds";
import { useTranslation } from "react-i18next";
import { useSearchParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  applySearchFilters,
  countOptionalSearchFiltersUsed,
  handlePageLoad,
  getFiltersFromSearchParams,
  MILE_DISTANCE_OPTIONS,
} from "../../utils";
import CARE_PROVIDER_DATA from "../../data/ladders_data.json";
import {
  CareProvider,
  SearchFilters,
  SearchResult,
  PaginationConfig,
} from "../../types";
import DesktopControl from "../../components/Search/Filters/Control/DesktopControl";
import { AnalyticsAction, logEvent, logPageView } from "../../utils/analytics";
import MobileControl from "../../components/Search/Filters/Control/MobileControl";
import ZipInput from "../../components/ZipInput";
import DesktopResults from "./DesktopResults";
import MobileResults from "./MobileResults";
import { ReactComponent as Close } from "../../images/close.svg";
import ShareButton from "../../components/ShareButton";
import CompareSelector from "../../components/Compare/CompareSelector";
import ResultsPagination from "../../components/Pagination";
import PrintButton from "../../components/PrintButton";

export const SEARCH_FILTER_ORDER = [
  "TypeOfHelp",
  "Distance",
  "Age",
  "Populations",
  "Language",
  "Fees",
  "Hours",
  "Accessibility",
  "Telehealth",
] as const;

const ResponsiveHeader = styled.h1`
  font-size: 1.5rem;
  @media (min-width: 40em) {
    font-size: 2rem;
  }
`;

const SearchContainer = styled.div`
  @media screen and (max-width: 45em) {
    flex-basis: 100%;
    order: 1;
    margin-bottom: 1rem;
  }
`;

const ZipSearch = styled.form`
  width: fit-content;
  @media screen and (max-width: 40em) {
    width: 100%;
    button {
      width: 30%;
    }
  }
`;

const Ellipses = styled.div`
  display: none;
  @media screen and (max-width: 45em) {
    display: inline-block;
  }
`;

export const CompareContext = createContext<{
  selectedCompareProviders: CareProvider[];
  setSelectedCompareProviders: Dispatch<SetStateAction<CareProvider[]>>;
}>({ selectedCompareProviders: [], setSelectedCompareProviders: () => {} });

type PaginationContextProviderProps = {
  paginationConfig: PaginationConfig;
  setPaginationConfig: Dispatch<SetStateAction<PaginationConfig>>;
  didChangePage: boolean;
  setDidChangePage: Dispatch<SetStateAction<boolean>>;
};

export const PaginationContext = createContext<PaginationContextProviderProps>({
  paginationConfig: {
    totalPages: 0,
    currentPage: 1,
    totalItems: 0,
    pageSize: 20,
  },
  setPaginationConfig: () => {},
  didChangePage: false,
  setDidChangePage: () => {},
});

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

  // Pagination State for Search Results
  const [paginationConfig, setPaginationConfig] = useState<PaginationConfig>({
    totalPages: 0,
    currentPage: 1,
    totalItems: 0,
    pageSize: 20,
  });
  const [didChangePage, setDidChangePage] = useState<boolean>(false);

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
    logEvent(AnalyticsAction.ViewSearchResults, {
      count: result.results.length,
      filter_count: countOptionalSearchFiltersUsed(filters),
      search: filters.zip,
    });
    setSearchResult(result);
  };

  useEffect(() => {
    // zip is the only required filter - redirect to homepage if it doesn't exist
    if (!searchFilters.zip) {
      navigate("/", {
        replace: true,
      });
    } else {
      handlePageLoad({ title: t("searchPageTitle") });
      performSearch(searchFilters);
      logPageView();
    }

    const onBeforePrint = () => {
      // set page size to total results count so everything gets printed
      searchResult?.results.length &&
        setPaginationConfig({
          ...paginationConfig,
          pageSize: searchResult.results.length,
        });
    };
    window.addEventListener("beforeprint", onBeforePrint);
    return () => {
      window.removeEventListener("beforeprint", onBeforePrint);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    performSearch(searchFilters);
    handlePageLoad({ title: t("searchPageTitle") });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const [compareProviders, setCompareProviders] = useState<CareProvider[]>([]);

  return (
    <div className="Search">
      <div>
        <CompareContext.Provider
          value={{
            selectedCompareProviders: compareProviders,
            setSelectedCompareProviders: setCompareProviders,
          }}
        >
          <PaginationContext.Provider
            value={{
              paginationConfig,
              setPaginationConfig,
              didChangePage,
              setDidChangePage,
            }}
          >
            <div className="print-heading margin-y-2 padding-x-2 tablet:padding-x-5">
              <Grid row className="margin-bottom-2">
                <div className="width-full">
                  <div className="position-relative display-flex flex-align-baseline flex-justify flex-column-reverse flex-md-row">
                    <div className=" display-flex flex-align-baseline flex-wrap">
                      <ResponsiveHeader className="margin-top-0 text-bold margin-right-1">
                        {t("searchPageHeading", {
                          count: searchResult?.results.length || 0,
                          zip: showZipInput ? "" : searchFilters.zip,
                        })}
                        {showZipInput && <Ellipses>...</Ellipses>}
                      </ResponsiveHeader>
                      {showZipInput && (
                        <SearchContainer>
                          <ZipSearch
                            onSubmit={() => {
                              setSearchParams({ ...searchFilters, zip });
                              setShowZipInput(false);
                            }}
                            className="tablet:margin-left-1 display-flex"
                          >
                            <ZipInput
                              zip={zip}
                              setZip={(_zip) => setZip(_zip)}
                              className="width-full"
                              noLabel
                              autoFocus
                            />
                            <Button className="margin-left-1" type="submit">
                              {t("search")}
                            </Button>
                          </ZipSearch>
                        </SearchContainer>
                      )}
                      <Button
                        className="padding-y-05 width-auto"
                        type="button"
                        unstyled
                        onClick={() => {
                          setShowZipInput(!showZipInput);
                          setZip(searchFilters.zip);
                        }}
                      >
                        {showZipInput ? (
                          <>
                            {t("cancel")} <Close className="margin-left-05" />
                          </>
                        ) : (
                          t("change")
                        )}
                      </Button>
                    </div>
                    <div className="display-flex flex-justify-end flex-align-center width-full desktop:width-auto">
                      <PrintButton className={"margin-right-3"} />
                      <ShareButton text={t("searchPageShare")} />
                    </div>
                  </div>
                </div>
              </Grid>
              <DesktopControl
                distanceUpdatedExternally={distanceUpdated}
                filters={{ ...searchFilters }}
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
                totalResultsCount={searchResult?.results?.length || 0}
              />
            </div>

            {searchResult?.results.length ? (
              <div>
                <DesktopResults
                  results={searchResult.results}
                  filters={searchFilters}
                  setFilters={(filters) => setSearchParams({ ...filters })}
                />
                <MobileResults
                  results={searchResult.results}
                  filters={searchFilters}
                  setFilters={(filters) => setSearchParams({ ...filters })}
                />
                <ResultsPagination results={searchResult.results} />
              </div>
            ) : (
              <div className="p-5">
                {isWidestRadius(searchFilters.miles) ? (
                  <p>
                    {t("noResultsFilters", {
                      miles: searchFilters.miles,
                    })}
                  </p>
                ) : (
                  <>
                    <p>
                      {t("noResultsRadius", {
                        miles: searchFilters.miles,
                      })}
                    </p>
                    <Button
                      type="button"
                      onClick={() => expandSearchRadius(searchFilters.miles)}
                    >
                      {t("noResultsRadiusButton")}
                    </Button>
                  </>
                )}
              </div>
            )}
            <CompareSelector />
          </PaginationContext.Provider>
        </CompareContext.Provider>
      </div>
    </div>
  );
}

export default Search;
