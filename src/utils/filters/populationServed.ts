import { CareProvider, PopulationsServed } from "../../types";

export const supportsPopulationsServed = (
  careProvider: CareProvider,
  populationsServed: PopulationsServed[]
): boolean => {
  // if no population preferences specified, don't apply any filter
  if (!populationsServed.length) {
    return true;
  }

  return populationsServed.some(
    (populationServed) => careProvider.populationsServed[populationServed]
  );
};
