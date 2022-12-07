import { Telehealth, CareProvider } from "../../types";

export const providesTelehealth = (
  careProvider: CareProvider,
  telehealth: Telehealth | undefined
): boolean => {
  // No filter value, or both filter value selected -> return all results
  if (!telehealth || telehealth === Telehealth.InPersonAndTelehealth) {
    return true;
  }

  // Telehealth only filter -> return results with offersTelehealth = true
  if (telehealth === Telehealth.TelehealthOnly) {
    return careProvider.offersTelehealth === true;
  }

  // In person only filter -> result results with address, and
  // address does not contain the word "telehealth"
  if (telehealth === Telehealth.InPersonOnly) {
    return (
      !!careProvider.address?.length &&
      !careProvider.addressStr.match(/telehealth/i)
    );
  }

  return false;
};
