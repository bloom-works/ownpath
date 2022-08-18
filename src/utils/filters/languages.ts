import { CareProvider, Languages } from "../../types";

export const supportsLanguages = (
  careProvider: CareProvider,
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
