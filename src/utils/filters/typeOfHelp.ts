import { CareProvider, TypeOfHelp } from "../../types";

export const offersTypeOfHelp = (
  careProvider: CareProvider,
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
  careProvider: CareProvider,
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
