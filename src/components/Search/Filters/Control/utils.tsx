import { SearchFilters } from "../../../../types";

export const getAppliedOptionalFiltersCount = (filters: SearchFilters) =>
  filters.accessibility.length +
  filters.feePreferences.length +
  filters.hours.length +
  filters.typesOfHelp.length +
  filters.languages.length +
  filters.populationsServed.length +
  (!!filters.age ? 1 : 0) +
  (!!filters.telehealth ? 1 : 0);

export const getFiltersWithOptionalCleared = (filters: SearchFilters) => {
  const updatedFilters = {
    ...filters,
    accessibility: [],
    feePreferences: [],
    hours: [],
    typesOfHelp: [],
    languages: [],
    populationsServed: [],
  };
  delete updatedFilters.age;
  delete updatedFilters.telehealth;
  return updatedFilters;
};
