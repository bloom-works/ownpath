import { latLng, latLngBounds, LatLngLiteral } from "leaflet";
import {
  CareProvider,
  CareProviderSearchResult,
  SearchFilters,
  SearchResult,
  ZipData,
  TypeOfHelp,
  FeePreference,
  ZipSearchMetadata,
  AccessibilityOptions,
  DayOfWeek,
  Languages,
} from "./types";
import coloradoZipData from "./data/colorado_zip_data.json";

export const DEFAULT_RADIUS_MILES = 10;
export const DEFAULT_DENSE_RADIUS_MILES = 5;
export const DEFAULT_SPARSE_RADIUS_MILES = 25;
export const DENSE_DENSITY_CUTOFF_POP_PER_SQ_MI = 1000;
export const SPARSE_DENSITY_CUTOFF_POP_PER_SQ_MI = 100;

export const METERS_IN_A_MILE = 1609.34;

export const MILE_DISTANCE_OPTIONS = ["5", "10", "25", "50", "100"];

export const addSearchMetadata = (
  careProviders: CareProvider[],
  searchLocation: LatLngLiteral
): CareProviderSearchResult[] =>
  careProviders.map((result) => ({
    ...result,
    distance: result.latlng
      ? latLng(searchLocation).distanceTo(result.latlng)
      : undefined,
  }));

export const isWithinRadius = (
  careProvider: CareProviderSearchResult,
  miles: number
): boolean => {
  const radiusMeters = miles * METERS_IN_A_MILE;
  // TODO: figure out how places that don't have location will work w filters
  return !!(careProvider.distance && careProvider.distance <= radiusMeters);
};

export const compareDistance = (
  a: CareProviderSearchResult,
  b: CareProviderSearchResult
): number => {
  if (a.distance === undefined) {
    return 1;
  } else if (b.distance === undefined) {
    return -1;
  }
  return a.distance - b.distance;
};

export const offersTypeOfHelp = (
  careProvider: CareProviderSearchResult,
  typeOfHelp: TypeOfHelp
): boolean => {
  switch (typeOfHelp) {
    case TypeOfHelp.SubstanceUse:
      return careProvider.substanceUse.supported;
    case TypeOfHelp.CourtMandatedTreatment:
      return (
        careProvider.substanceUse.duiSupported ||
        careProvider.mentalHealth.services.IntensiveOutpatient
      );
    case TypeOfHelp.MentalHealth:
      return careProvider.mentalHealth.supported;
    case TypeOfHelp.SuicidalIdeation:
      return careProvider.mentalHealth.supported;
    case TypeOfHelp.Unsure:
      return true;
    case TypeOfHelp.None:
      return true;
    default:
      return false;
  }
};

export const offersAnyTypesOfHelpNeeded = (
  careProvider: CareProviderSearchResult,
  helpNeeded: TypeOfHelp[]
): boolean => {
  // if no help types specified, don't apply any filter
  if (!helpNeeded.length) {
    return true;
  }

  // check if provider offers ANY of the types of help needed
  return helpNeeded.some((typeOfHelp) =>
    offersTypeOfHelp(careProvider, typeOfHelp)
  );
};

export const meetsFeePreference = (
  careProvider: CareProviderSearchResult,
  feePreference: FeePreference
) => {
  if (feePreference === "SelfPay") return true;

  return careProvider.fees[feePreference];
};

export const meetsAnyFeePreference = (
  careProvider: CareProviderSearchResult,
  feePreferences: FeePreference[]
): boolean => {
  // if no payment preferences specified, don't apply any filter
  if (!feePreferences.length) {
    return true;
  }

  // TODO: add a case for don't care / self pay
  // check if provider fees match any of preferences
  return feePreferences.some((feePreference) =>
    meetsFeePreference(careProvider, feePreference)
  );
};

export const meetsAccessibilityNeeds = (
  careProvider: CareProviderSearchResult,
  accessibilityNeeds: AccessibilityOptions[]
): boolean => {
  // if no payment preferences specified, don't apply any filter
  if (!accessibilityNeeds.length) {
    return true;
  }

  // check that provider meets all accessibility needs
  return accessibilityNeeds.every((need) => careProvider.accessibility[need]);
};

export const isOpenOnSelectedDays = (
  careProvider: CareProviderSearchResult,
  days: DayOfWeek[]
): boolean => {
  // if no days specified, don't apply any filter
  if (!days.length) {
    return true;
  }

  return days.some((day) => careProvider.hours && careProvider.hours[day].open);
};

export const supportsLanguages = (
  careProvider: CareProviderSearchResult,
  languages: Languages[]
): boolean => {
  // if no languages specified, don't apply any filter
  if (!languages.length) {
    return true;
  }
  // assume that every place supports english
  if (languages.includes("English")) {
    return true;
  }

  return languages.some((language) => careProvider.languages[language]);
};

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

// TODO: figure out how to limit results if there are too many
export function getMatchingCare(
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
    .filter((result) => isWithinRadius(result, miles))
    .filter((result) => offersAnyTypesOfHelpNeeded(result, typesOfHelp))
    .filter((result) => meetsAnyFeePreference(result, feePreferences))
    .filter((result) => meetsAccessibilityNeeds(result, accessibility))
    .filter((result) => isOpenOnSelectedDays(result, hours))
    .filter((result) => supportsLanguages(result, languages))
    .sort(compareDistance);

  return { results };
}

/**
 * Helper function to parse filter values from URL search params
 * @param searchParams
 * @returns Object containing search urls by name
 */
export function getFiltersFromSearchParams(
  searchParams: URLSearchParams
): SearchFilters {
  return {
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
  };
}

export const EMPTY_SEARCH_FILTERS = {
  zip: "",
  miles: "",
  typesOfHelp: [],
  feePreferences: [],
  accessibility: [],
  hours: [],
  languages: [],
};

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

/**
 * Helper function to check if any properties in the given
 * boolean map are 'true'; used to optionally display chunks
 * of data in UI
 * @param boolMap
 * @returns
 */
export function anyAreTrue(boolMap: { [key: string]: boolean }) {
  return Object.values(boolMap).some((bool) => !!bool);
}

export function toggleItemInList(list: any[], item: any) {
  // remove an item if it's in the list
  // or add it if it isn't
  return list.includes(item)
    ? list.filter((val) => val !== item)
    : [...list, item];
}
