import { LatLngLiteral, latLng } from "leaflet";
import {
  AccessibilityOptions,
  AgeGroup,
  CareProvider,
  DayOfWeek,
  FeePreference,
  Languages,
  PopulationsServed,
  SearchFilters,
  SearchResult,
  Telehealth,
  TypeOfHelp,
  UnrankedCareProviderSearchResult,
  ZipData,
  ZipSearchMetadata,
} from "../types";
import coloradoZipData from "../data/colorado_zip_data.json";
import {
  compareDistance,
  isOpenOnSelectedDays,
  isWithinRadius,
  meetsAccessibilityNeeds,
  meetsAnyFeePreference,
  offersAnyTypesOfHelpNeeded,
  servesAgeGroup,
  getDefaultRadius,
} from "./filters";
import { supportsLanguages } from "./filters/languages";
import { providesTelehealth } from "./filters/telehealth";
import { supportsPopulationsServed } from "./filters";

export const getDistanceToZipCenter = (
  zip: string | null,
  careProvider: CareProvider
): number | undefined => {
  if (!zip) {
    return undefined;
  }
  const zipSearchMetadata = getZipSearchMetadata(zip);
  if (!zipSearchMetadata.isValidZip || !careProvider.latlng) {
    return undefined;
  }
  return latLng(zipSearchMetadata.center).distanceTo(careProvider.latlng);
};

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
  return {
    isValidZip: true,
    defaultRadiusMiles: getDefaultRadius(data),
    center: { lat: data.lat, lng: data.lng },
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
    telehealth,
    populationsServed,
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
        servesAgeGroup(result, age) &&
        providesTelehealth(result, telehealth) &&
        supportsPopulationsServed(result, populationsServed)
    )
    .sort(compareDistance)
    .map((result, idx) => {
      return { ...result, searchRank: idx + 1 };
    });

  return { results };
}

export function countOptionalSearchFiltersUsed(filters: SearchFilters): number {
  let count = 0;
  // pluck zip and miles out of filters
  const { zip, miles, ...optionalFilters } = filters;
  for (const [_filter_k, filter_v] of Object.entries(optionalFilters)) {
    if (filter_v.length !== 0) {
      count += 1;
    }
  }
  return count;
}

export const EMPTY_SEARCH_FILTERS: SearchFilters = {
  zip: "",
  miles: "",
  typesOfHelp: [],
  feePreferences: [],
  accessibility: [],
  hours: [],
  languages: [],
  populationsServed: [],
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
    telehealth: searchParams.get("telehealth") as Telehealth,
    populationsServed: searchParams.getAll(
      "populationsServed"
    ) as PopulationsServed[],
  };

  if (!filters.age) delete filters.age;
  if (!filters.telehealth) delete filters.telehealth;
  return filters;
}
