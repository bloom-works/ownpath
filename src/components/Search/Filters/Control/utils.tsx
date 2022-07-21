import { SearchFilters } from "../../../../types";

export const getAppliedOptionalFiltersCount = (filters: SearchFilters) =>
  filters.accessibility.length +
  filters.feePreferences.length +
  filters.hours.length +
  filters.typesOfHelp.length +
  filters.languages.length;

export const getFiltersWithOptionalCleared = (filters: SearchFilters) => ({
  ...filters,
  accessibility: [],
  feePreferences: [],
  hours: [],
  typesOfHelp: [],
  languages: [],
});
