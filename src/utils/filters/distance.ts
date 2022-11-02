import { UnrankedCareProviderSearchResult, ZipInfo } from "../../types";

export const DEFAULT_RADIUS_MILES = 10;
export const DEFAULT_DENSE_RADIUS_MILES = 5;
export const DEFAULT_SPARSE_RADIUS_MILES = 25;
export const DENSE_DENSITY_CUTOFF_POP_PER_SQ_MI = 1000;
export const SPARSE_DENSITY_CUTOFF_POP_PER_SQ_MI = 100;

export const METERS_IN_A_MILE = 1609.34;

export const MILE_DISTANCE_OPTIONS = ["5", "10", "25", "50", "100"];

export const getDefaultRadius = (data: ZipInfo): number => {
  const defaultRadiusMiles =
    data.POP_SQMI && data.POP_SQMI > DENSE_DENSITY_CUTOFF_POP_PER_SQ_MI
      ? DEFAULT_DENSE_RADIUS_MILES
      : data.POP_SQMI && data.POP_SQMI < SPARSE_DENSITY_CUTOFF_POP_PER_SQ_MI
      ? DEFAULT_SPARSE_RADIUS_MILES
      : DEFAULT_RADIUS_MILES;
  return defaultRadiusMiles;
};

export const isWithinRadius = (
  careProvider: UnrankedCareProviderSearchResult,
  miles: number
): boolean => {
  const radiusMeters = miles * METERS_IN_A_MILE;
  // TODO: figure out how places that don't have location will work w filters
  return !!(careProvider.distance && careProvider.distance <= radiusMeters);
};

export const compareDistance = (
  a: UnrankedCareProviderSearchResult,
  b: UnrankedCareProviderSearchResult
): number => {
  if (a.distance === undefined) {
    return 1;
  } else if (b.distance === undefined) {
    return -1;
  }
  return a.distance - b.distance;
};

export const getMilesFromMeters = (meters: number): number => {
  return meters / METERS_IN_A_MILE;
};
