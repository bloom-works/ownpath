import { LatLngLiteral, latLng, latLngBounds } from "leaflet";
import {
  AccessibilityOptions,
  AgeGroup,
  CareProvider,
  CareProviderSearchResult,
  DayOfWeek,
  FeePreference,
  Languages,
  SearchFilters,
  SearchResult,
  TypeOfHelp,
  ZipData,
  ZipSearchMetadata,
} from "../types";
import coloradoZipData from "../data/colorado_zip_data.json";
import {
  DENSE_DENSITY_CUTOFF_POP_PER_SQ_MI,
  SPARSE_DENSITY_CUTOFF_POP_PER_SQ_MI,
  DEFAULT_DENSE_RADIUS_MILES,
  DEFAULT_SPARSE_RADIUS_MILES,
  DEFAULT_RADIUS_MILES,
  compareDistance,
  isOpenOnSelectedDays,
  isWithinRadius,
  meetsAccessibilityNeeds,
  meetsAnyFeePreference,
  offersAnyTypesOfHelpNeeded,
  servesAgeGroup,
} from "./filters";
import { supportsLanguages } from "./filters/languages";

export const addSearchMetadata = (
  careProviders: CareProvider[],
  searchLocation: LatLngLiteral
): UnrankedCareProviderSearchResult[] =>
  careProviders.map((result) => ({
    ...result,
    distance: result.latlng
      ? latLng(searchLocation).distanceTo(result.latlng)
      : undefined,
  }));

export const getZipSearchMetadata = (zip: string): ZipSearchMetadata => {
  if (zip.length !== 5) {
    return { isValidZip: false };
  }
  const data = (coloradoZipData as ZipData)[zip];
  if (!data) {
    return { isValidZip: false };
  }
  const defaultRadiusMiles =
    data.POP_SQMI && data.POP_SQMI > DENSE_DENSITY_CUTOFF_POP_PER_SQ_MI
      ? DEFAULT_DENSE_RADIUS_MILES
      : data.POP_SQMI && data.POP_SQMI < SPARSE_DENSITY_CUTOFF_POP_PER_SQ_MI
      ? DEFAULT_SPARSE_RADIUS_MILES
      : DEFAULT_RADIUS_MILES;
  return {
    isValidZip: true,
    defaultRadiusMiles,
    center: { lat: data.centroid_lat, lng: data.centroid_lon },
  };
};

export function applySearchFilters(
  careData: CareProvider[],
  filters: SearchFilters
): SearchResult {
  const {
    zip,
    miles: milesStr,
    typesOfHelp,
    feePreferences,
    accessibility,
    hours,
    languages,
    age,
  } = filters;

  const zipSearchMetadata = getZipSearchMetadata(zip);
  if (!zipSearchMetadata.isValidZip) {
    return {
      results: [],
    };
  }
  const miles =
    (milesStr && parseInt(milesStr)) || zipSearchMetadata.defaultRadiusMiles;

  // calculate distance, apply filters, & sort results by distance
  const results = addSearchMetadata(careData, zipSearchMetadata.center)
    .filter(
      (result) =>
        isWithinRadius(result, miles) &&
        offersAnyTypesOfHelpNeeded(result, typesOfHelp) &&
        meetsAnyFeePreference(result, feePreferences) &&
        meetsAccessibilityNeeds(result, accessibility) &&
        isOpenOnSelectedDays(result, hours) &&
        supportsLanguages(result, languages) &&
        servesAgeGroup(result, age)
    )
    .sort(compareDistance)
    .map((result, idx) => {
      return { ...result, searchRank: idx + 1 };
    });

  return { results };
}

export const EMPTY_SEARCH_FILTERS: SearchFilters = {
  zip: "",
  miles: "",
  typesOfHelp: [],
  feePreferences: [],
  accessibility: [],
  hours: [],
  languages: [],
};

/**
 * Helper function to parse filter values from URL search params
 * @param searchParams
 * @returns Object containing search urls by name
 */
export function getFiltersFromSearchParams(
  searchParams: URLSearchParams
): SearchFilters {
  const filters: SearchFilters = {
    zip: searchParams.get("zip") ?? "",
    miles: searchParams.get("miles") ?? "",
    // TODO: how to enforce type?
    typesOfHelp: searchParams.getAll("typesOfHelp") as TypeOfHelp[],
    feePreferences: searchParams.getAll("feePreferences") as FeePreference[],
    accessibility: searchParams.getAll(
      "accessibility"
    ) as AccessibilityOptions[],
    hours: searchParams.getAll("hours") as DayOfWeek[],
    languages: searchParams.getAll("languages") as Languages[],
    age: searchParams.get("age") as AgeGroup,
  };

  if (!filters.age) delete filters.age;
  return filters;
}

/**
 * Helper function to get bounds for the search result map
 * based on the returned set of CareProviderSearchResults
 * @param searchResults
 * @returns
 */
export function getResultBounds(searchResults: CareProviderSearchResult[]) {
  return latLngBounds(
    searchResults
      .map((result) => result.latlng)
      .filter((location): location is LatLngLiteral => !!location)
  );
}
