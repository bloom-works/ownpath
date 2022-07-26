import { LatLngLiteral } from "leaflet";
import {
  AccessibilityOptions,
  CareProvider,
  DayOfWeek,
  FeePreference,
  Languages,
} from ".";

export type CareProviderSearchMetadata = {
  distance?: number;
};

export type CareProviderSearchResult = CareProvider &
  CareProviderSearchMetadata;

export type SearchResult = {
  results: CareProviderSearchResult[];
};

export interface ZipData {
  [key: string]: {
    PO_NAME: string;
    STATE: string;
    POPULATION: number | null;
    POP_SQMI: number | null;
    SQMI: number;
    centroid_lon: number;
    centroid_lat: number;
  };
}

export type ZipSearchMetadata =
  | { isValidZip: false }
  | { isValidZip: true; defaultRadiusMiles: number; center: LatLngLiteral };

export enum AgeGroup {
  Under18 = "under_18",
  Adult = "adult",
  OlderAdult = "older_adult",
}

export enum TypeOfHelp {
  SubstanceUse = "substance_use",
  CourtMandatedTreatment = "court_mandated_treatment",
  MentalHealth = "mental_health",
  SuicidalIdeation = "suicidal_ideation",
  Unsure = "unsure",
  None = "none",
}

export type SearchFilters = {
  zip: string;
  miles: string;
  typesOfHelp: TypeOfHelp[];
  feePreferences: FeePreference[];
  accessibility: AccessibilityOptions[];
  hours: DayOfWeek[];
  languages: Languages[];
  age?: AgeGroup;
};
