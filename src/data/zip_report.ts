import * as fs from "fs";
import * as path from "path";
import CARE_PROVIDER_DATA from "./ladders_data.json";
import coloradoZipData from "./colorado_zip_data.json";
import { getDefaultRadius } from "../utils/filters/distance";
import { CareProvider, ZipInfo } from "../types";

const OUTPUT_FILE = "./zip_report.csv";

let zipSummaries: ZipSummary[] = [];

type ZipSummary = {
  zip: string;
  default_radius: number;
  within_5_miles: number;
  within_10_miles: number;
  within_25_miles: number;
  within_default_miles: number;
};

const getDistance = (
  lng1: number,
  lat1: number,
  lng2: number,
  lat2: number
): number => {
  //convert to radians
  const ct = Math.PI / 180.0;
  lng1 *= ct;
  lat1 *= ct;
  lng2 *= ct;
  lat2 *= ct;

  const R = 3959.0; //miles
  const d =
    Math.acos(
      Math.sin(lat1) * Math.sin(lat2) +
        Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1)
    ) * R;
  return d;
};

const getCountFacilitiesWithinRadius = (
  zipInfo: ZipInfo,
  miles: number
): number => {
  const providersWithinRadius = (CARE_PROVIDER_DATA as CareProvider[]).filter(
    (p) =>
      p.latlng &&
      getDistance(zipInfo.lng, zipInfo.lat, p.latlng.lng, p.latlng.lat) <= miles
  );
  return providersWithinRadius.length;
};

const getZipSummary = (zip: string, zipInfo: ZipInfo): ZipSummary | null => {
  const defaultRadius = getDefaultRadius(zipInfo);
  return {
    zip,
    default_radius: defaultRadius,
    within_5_miles: getCountFacilitiesWithinRadius(zipInfo, 5),
    within_10_miles: getCountFacilitiesWithinRadius(zipInfo, 10),
    within_25_miles: getCountFacilitiesWithinRadius(zipInfo, 25),
    within_default_miles: getCountFacilitiesWithinRadius(
      zipInfo,
      defaultRadius
    ),
  };
};

const printSummaryLine = (
  withinStr: string,
  countDeadZips: number,
  countTotalZips: number
) => {
  const percent = Number((countDeadZips / countTotalZips) * 100).toFixed(1);
  console.log(
    `zips w/o providers within ${withinStr} miles: ${countDeadZips} (${percent}%)`
  );
};

const printSummaryCounts = (zipSummaries: ZipSummary[]) => {
  const totalZips = zipSummaries.length;
  const deadZips5 = zipSummaries.filter((z) => z.within_5_miles === 0).length;
  const deadZips10 = zipSummaries.filter((z) => z.within_10_miles === 0).length;
  const deadZips25 = zipSummaries.filter((z) => z.within_25_miles === 0).length;
  const deadZipsDefault = zipSummaries.filter(
    (z) => z.within_default_miles === 0
  ).length;

  console.log(`total zips: ${totalZips}`);
  printSummaryLine("5", deadZips5, totalZips);
  printSummaryLine("10", deadZips10, totalZips);
  printSummaryLine("25", deadZips25, totalZips);
  printSummaryLine("default", deadZipsDefault, totalZips);
};

const convertToCsv = (arr: any) => {
  const array = [Object.keys(arr[0])].concat(arr);

  return array
    .map((it) => {
      return Object.values(it).toString();
    })
    .join("\n");
};

for (const [zip, zipInfo] of Object.entries(coloradoZipData)) {
  const summary = getZipSummary(zip, zipInfo);
  if (summary) {
    zipSummaries.push(summary);
  }
}
printSummaryCounts(zipSummaries);
fs.writeFileSync(
  path.resolve(__dirname, OUTPUT_FILE),
  convertToCsv(zipSummaries)
);
