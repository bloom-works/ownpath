import * as path from "path";
import * as fs from "fs";
import { readFile, utils } from "xlsx";

const filePath = process.argv[2];
const csvPath = path.resolve(__dirname, filePath);
const workbook = readFile(csvPath);
const english: { [key: string]: string } = {};
const spanish: { [key: string]: string } = {};

for (var i = 0; i < workbook.SheetNames.length; i++) {
  if (
    workbook.SheetNames[i].trim() === "Pending" ||
    workbook.SheetNames[i].trim() === "How to use"
  )
    continue;

  const rows: string[][] = utils.sheet_to_json(
    workbook.Sheets[workbook.SheetNames[i]],
    {
      header: 1,
      blankrows: false,
    }
  );

  rows.forEach((row) => {
    if (row.length === 4) {
      const en = row[1];
      const es = row[2];
      const key = row[3];

      if (!es) {
        console.log("spanish translation missing for ", row[0]);
        console.log(row[1], row[2]);
      }

      english[key] = en;
      spanish[key] = es;
    }
  });
}

fs.writeFileSync(
  path.resolve(__dirname, "./en_translations.json"),
  JSON.stringify(english)
);

fs.writeFileSync(
  path.resolve(__dirname, "./es_translations.json"),
  JSON.stringify(spanish)
);
