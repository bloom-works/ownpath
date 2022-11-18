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

// note: ordering of these consts determines ordering of the properties
// on CareProvider, which determines display ordering on the site

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
  "AmericanIndian",
  "Offender",
  "Latinx",
  "LGBTQIA+",
  "Men",
  "Military",
  "Minors/Adolescents",
  "OlderAdults",
  "Homeless",
  "ClientsreferredfromCourt/JudicialSystem",
  "HIV",
  "PregnantPerson",
  "Women",
  "Youth",
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

export const ACCEPTING_NEW_PATIENTS_OPTIONS = [
  "Yes"
] as const;
export type AcceptingNewPatientsOptions = typeof ACCEPTING_NEW_PATIENTS_OPTIONS[number];

export const TELEHEALTH_OPTIONS = [
  "Telehealth Only",
  "Telehealth Available - With Restrictions",
] as const;
export type TelehealthOptions = typeof TELEHEALTH_OPTIONS[number];

export type CareProvider = {
  id: string;
  name: string;
  phone: string;
  hideAddress: boolean;
  acceptingNewPatients: boolean;
  address: string[];
  addressStr: string;
  website: string;
  substanceUse: {
    supported: boolean;
    duiSupported: boolean;
    /*
    PeerSupport is derived from standalone column RSSOServicesProvided. The other services are
    processed from a list of values contained in the SubstanceUseServices column. The values
    in SubstanceUseServices are parsed and dynamically set in the process_data file. This type
    relects the parsed values as keys from SubstanceUseServices and the additional PeerSupport property
    that is set by the RSSOServicesProvided column.
    */
    services: { [key in SubstanceUseServices]: boolean } & { PeerSupport: boolean };
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
  offersTelehealth: boolean;
};
