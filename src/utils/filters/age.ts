import {
  AgeGroup,
  CareProviderSearchResult,
  PopulationsServed,
} from "../../types";

export const servesAgeGroup = (
  careProvider: CareProviderSearchResult,
  age: AgeGroup | null
): boolean => {
  if (!age) return true;

  if (age === AgeGroup.Under18) {
    return (
      careProvider.populationsServed.Youth ||
      careProvider.populationsServed["Minors/Adolescents"]
    );
  }

  if (age === AgeGroup.OlderAdult) {
    return careProvider.populationsServed.OlderAdults;
  }

  // Serves "adult" as long as any populations other than
  // youth, minors, or older adults are served
  const populations = Object.entries(careProvider.populationsServed)
    .filter(([_, served]) => !!served)
    .map(([pop]) => pop as PopulationsServed);

  return (
    !populations.length ||
    (!populations.every(
      (pop) => pop === "Youth" || pop === "Minors/Adolescents"
    ) &&
      !populations.every((pop) => pop === "OlderAdults"))
  );
};
