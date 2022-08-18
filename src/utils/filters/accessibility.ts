import { AccessibilityOptions, CareProvider } from "../../types";

export const meetsAccessibilityNeeds = (
  careProvider: CareProvider,
  accessibilityNeeds: AccessibilityOptions[]
): boolean => {
  // if no payment preferences specified, don't apply any filter
  if (!accessibilityNeeds.length) {
    return true;
  }

  // check that provider meets all accessibility needs
  return accessibilityNeeds.every((need) => careProvider.accessibility[need]);
};
