import { CareProviderSearchResult, FeePreference } from "../../types";

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

  return feePreferences.some((feePreference) =>
    meetsFeePreference(careProvider, feePreference)
  );
};
