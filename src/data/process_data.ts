import * as fs from "fs";
import * as path from "path";
import { parse } from "csv-parse/sync";
import {
  ACCESSIBILITY_OPTIONS,
  CareProvider,
  DailyHours,
  FEE_PREFERENCES,
  LANGUAGES,
  MENTAL_HEALTH_SERVICES,
  POPULATIONS_SERVED,
  SUBSTANCE_USE_SERVICES,
  WeeklyHours,
} from "../types";
import { LatLngLiteral } from "leaflet";

const INPUT_FILE = "../../raw_data/ladders.csv";
const OUTPUT_FILE = "./ladders_data.json";

type InputRow = {
  AcceptingNewPatients: string;
  Accessibility: string;
  AccountID: string;
  AccountName: string;
  AddressOneLine: string;
  DisplayName: string;
  ActiveMHDesignation: string;
  ActiveRSSOLicense: string;
  ActiveSUDLicense: string;
  CommunityMentalHealthCenter: string;
  CommunityMentalHealthClinic: string;
  DUIDWI: string;
  Fees: string;
  HideAddress: string;
  HoursofOperationFriday: string;
  HoursofOperationMonday: string;
  HoursofOperationSaturday: string;
  HoursofOperationSunday: string;
  HoursofOperationThursday: string;
  HoursofOperationTuesday: string;
  HoursofOperationWednesday: string;
  LanguagesSpoken: string;
  MentalHealthSettings: string;
  OffersTelehealth: string;
  OpioidTreatmentPrograms: string;
  Phone: string;
  PopulationServed: string;
  ProviderDirectoryFormModifiedDate: string;
  ProviderLocationDisplayLabel: string;
  SubstanceUseServices: string;
  Website: string;
  lat: string;
  lon: string;
};

const splitBySemicolons = (input: string): string[] => {
  return input ? input.split(";").map((str) => str.trim()) : [];
};

function getBooleanMap<T extends string>(keys: readonly T[], values: string[]) {
  const stripped = values.map((val) => val.replaceAll(" ", ""));
  stripped.forEach((val) => {
    if (!keys.includes(val as T)) {
      console.log(
        `value ${val} found but missing from type: ${keys.join(", ")}`
      );
    }
  });
  return keys.reduce((boolMap, key) => {
    boolMap[key] = stripped.includes(key);
    return boolMap;
  }, {} as { [key in T]: boolean });
}

const getDailyHours = (hoursString: string): DailyHours => {
  if (!hoursString) {
    return { open: false };
  } else {
    const parts = hoursString.split(" - ");
    if (parts.length !== 2) {
      throw new Error(`cannot parse hours: ${hoursString}`);
    }
    return {
      open: true,
      start: parts[0],
      end: parts[1],
    };
  }
};

const getHoursOfOperation = (row: InputRow): WeeklyHours => {
  const hoursOfOperation = {
    sunday: getDailyHours(row.HoursofOperationSunday),
    monday: getDailyHours(row.HoursofOperationMonday),
    tuesday: getDailyHours(row.HoursofOperationTuesday),
    wednesday: getDailyHours(row.HoursofOperationWednesday),
    thursday: getDailyHours(row.HoursofOperationThursday),
    friday: getDailyHours(row.HoursofOperationFriday),
    saturday: getDailyHours(row.HoursofOperationSaturday),
  };
  // if hours are missing for every day, treat hours of operation as unknown.
  // otherwise, missing hours can reliably mean closed
  if (Object.values(hoursOfOperation).every((v) => v.open === false)) {
    return null;
  }
  return hoursOfOperation;
};

const getLatLng = (row: InputRow): LatLngLiteral | null => {
  const lat = parseFloat(row.lat);
  const lng = parseFloat(row.lon);
  if (!!(lat && lng)) {
    return { lat, lng };
  }

  return null;
};

const transformRow = (row: InputRow): CareProvider => {
  const hideAddress = !!(row.HideAddress === "1");
  const substanceUseServices = splitBySemicolons(row.SubstanceUseServices);
  const mentalHealthServices = splitBySemicolons(row.MentalHealthSettings);
  const cleaned = {
    id: row.AccountID,
    name: row.DisplayName,
    phone: row.Phone,
    hideAddress,
    acceptingNewPatients: !!row.AcceptingNewPatients,
    address:
      hideAddress || !row.ProviderLocationDisplayLabel
        ? []
        : row.ProviderLocationDisplayLabel.split("_BR_ENCODED_"),
    addressStr: hideAddress || !row.AddressOneLine ? "" : row.AddressOneLine,
    website:
      row.Website && !row.Website.startsWith("http")
        ? `https://${row.Website}`
        : row.Website,
    substanceUse: {
      supported: !!(
        substanceUseServices.length ||
        row.ActiveSUDLicense === "1" ||
        row.OpioidTreatmentPrograms === "1"
      ),
      duiSupported: row.DUIDWI === "1",
      services: { PeerSupport: !!(row.ActiveRSSOLicense === "1"), ...getBooleanMap(SUBSTANCE_USE_SERVICES, substanceUseServices) },
    },
    mentalHealth: {
      supported: !!(
        mentalHealthServices.length ||
        row.ActiveMHDesignation === "1" ||
        row.CommunityMentalHealthCenter === "1" ||
        row.CommunityMentalHealthClinic === "1"
      ),
      services: getBooleanMap(MENTAL_HEALTH_SERVICES, mentalHealthServices),
    },
    populationsServed: getBooleanMap(
      POPULATIONS_SERVED,
      splitBySemicolons(row.PopulationServed)
    ),
    hours: getHoursOfOperation(row),
    accessibility: getBooleanMap(
      ACCESSIBILITY_OPTIONS,
      splitBySemicolons(row.Accessibility)
    ),
    fees: getBooleanMap(FEE_PREFERENCES, splitBySemicolons(row.Fees)),
    languages: getBooleanMap(LANGUAGES, splitBySemicolons(row.LanguagesSpoken)),
    latlng: getLatLng(row),
    lastUpdatedDate: row.ProviderDirectoryFormModifiedDate,
    offersTelehealth: !!row.OffersTelehealth
  };
  return cleaned;
};

const csvPath = path.resolve(__dirname, INPUT_FILE);
const csvFileContent = fs.readFileSync(csvPath);
const rows = parse(csvFileContent, {
  columns: true,
});
const cleanedData = rows.map((row: InputRow) => {
  return transformRow(row);
});

fs.writeFileSync(
  path.resolve(__dirname, OUTPUT_FILE),
  JSON.stringify(cleanedData)
);
