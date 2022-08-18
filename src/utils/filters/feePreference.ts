import { CareProvider, FeePreference } from "../../types";

export const meetsFeePreference = (
  careProvider: CareProvider,
  feePreference: FeePreference
) => {
  if (feePreference === "SelfPay") return true;

  return careProvider.fees[feePreference];
};

export const meetsAnyFeePreference = (
  careProvider: CareProvider,
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
