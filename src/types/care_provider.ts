import { LatLngLiteral } from "leaflet";

export type DailyHours =
  | {
      open: true;
      start: string;
      end: string;
    }
  | { open: false };

export enum DayOfWeek {
  Monday = "monday",
  Tuesday = "tuesday",
  Wednesday = "wednesday",
  Thursday = "thursday",
  Friday = "friday",
  Saturday = "saturday",
  Sunday = "sunday",
}
export const DAYS_OF_THE_WEEK = Object.values(DayOfWeek);

export type WeeklyHours = { [K in DayOfWeek]: DailyHours } | null;

export const SUBSTANCE_USE_SERVICES = [
  "ClinicallyManagedHighIntensityResidentialServices",
  "ClinicallyManagedLowIntensityResidentialServices",
  "ClinicallyManagedMediumIntensityResidentialServices",
  "ClinicallyManagedResidentialDetoxification",
  "DayTreatment(PartialHospitalization)",
  "DUI/DWI",
  "Education&TreatmentServicesforPersonsinCriminalJusticeSystem",
  "GenderResponsiveTreatmentforWomen",
  "GeneralTreatment",
  "IntensiveOutpatient",
  "MedicallyMonitoredInpatientDetoxification",
  "MedicallyMonitoredIntensiveResidentialTreatment",
  "MedicationAssistedTherapy",
  "OpioidTreatmentPrograms",
  "Outpatient",
  "YouthTreatment",
] as const;
export type SubstanceUseServices = typeof SUBSTANCE_USE_SERVICES[number];

export const MENTAL_HEALTH_SERVICES = [
  "72-HourTreatment&Evaluation",
  "AcuteTreatmentUnit",
  "CommunityMentalHealthCenter",
  "CommunityMentalHealthClinic",
  "CrisisStabilizationUnit",
  "DayTreatment",
  "Emergency",
  "Hospital",
  "IntensiveOutpatient",
  "Outpatient",
  "PsychiatricResidential",
  "ResidentialChildCareFacility",
  "ResidentialLongTermTreatment",
  "ResidentialShortTermTreatment",
] as const;
export type MentalHealthServices = typeof MENTAL_HEALTH_SERVICES[number];

export const POPULATIONS_SERVED = [
  "Homeless",
  "LGBTQIA+",
  "Men",
  "Military",
  "OlderAdults",
  "PregnantWomen",
  "Women",
  "Youth",
  "Offender",
  "Minors/Adolescents",
  "ClientsreferredfromCourt/JudicialSystem",
  "AmericanIndian",
  "HIV",
] as const;
export type PopulationsServed = typeof POPULATIONS_SERVED[number];

export const ACCESSIBILITY_OPTIONS = [
  "Deaf/HardofHearing",
  "VisuallyImpaired",
  "Wheelchair",
] as const;
export type AccessibilityOptions = typeof ACCESSIBILITY_OPTIONS[number];

export const FEE_PREFERENCES = [
  "Medicaid",
  "PrivateInsurance",
  "SelfPay",
  "SlidingFeeScale",
  "DontKnow",
] as const;
export type FeePreference = typeof FEE_PREFERENCES[number];

export const LANGUAGES = [
  "English",
  "Spanish",
  "Vietnamese",
  "German",
  "Russian",
  "Polish",
  "Ukrainian",
  "French",
  "Mandarin",
  "Cambodian",
  "Mongolian",
  "Cantonese",
] as const;
export type Languages = typeof LANGUAGES[number];

export type CareProvider = {
  id: string;
  name: string;
  phone: string;
  hideAddress: boolean;
  address: string[];
  addressStr: string;
  website: string;
  substanceUse: {
    supported: boolean;
    duiSupported: boolean;
    services: { [key in SubstanceUseServices]: boolean };
  };
  mentalHealth: {
    supported: boolean;
    services: { [key in MentalHealthServices]: boolean };
  };
  populationsServed: { [key in PopulationsServed]: boolean };
  hours: WeeklyHours;
  accessibility: { [key in AccessibilityOptions]: boolean };
  fees: { [key in FeePreference]: boolean };
  languages: { [key in Languages]: boolean };
  latlng: LatLngLiteral | null;
  lastUpdatedDate: string;
};
