import { AgeGroup, CareProvider, PopulationsServed } from "../../types";

export const servesAgeGroup = (
  careProvider: CareProvider,
  age: AgeGroup | undefined
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

  // Serves "adult" as long as any populations
  // (excluding 'modifier' populations: "Homeless",
  // "LGBTQIA+", "Offender", "HIV", "AmericanIndian")
  // other than youth, minors, or older adults are served
  const populations = Object.entries(careProvider.populationsServed)
    .filter(([_, served]) => !!served)
    .map(([pop]) => pop as PopulationsServed);

  const modifiers: PopulationsServed[] = [
    "HIV",
    "Homeless",
    "LGBTQIA+",
    "AmericanIndian",
    "Offender",
    "ClientsreferredfromCourt/JudicialSystem",
  ];
  return (
    !populations.length ||
    (!populations.every(
      (pop) =>
        pop === "Youth" ||
        pop === "Minors/Adolescents" ||
        modifiers.includes(pop)
    ) &&
      !populations.every(
        (pop) => pop === "OlderAdults" || modifiers.includes(pop)
      ))
  );
};
