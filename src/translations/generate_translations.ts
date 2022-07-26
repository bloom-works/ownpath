import * as path from "path";
import * as fs from "fs";
import { readFile, utils } from "xlsx";

const filePath = process.argv[2];
const csvPath = path.resolve(__dirname, filePath);
const workbook = readFile(csvPath);
const english: { [key: string]: string } = {};
const spanish: { [key: string]: string } = {};

for (let i = 0; i < workbook.SheetNames.length; i++) {
  if (workbook.SheetNames[i].trim() === "How to use") continue;

  const rows: string[][] = utils.sheet_to_json(
    workbook.Sheets[workbook.SheetNames[i]],
    {
      header: 1,
      blankrows: false,
    }
  );

  rows.forEach((row) => {
    // rows with 1 column do not contain content, they're just organizational so don't try to parse them
    if (row.length > 1) {
      // row[0]: plain-language description of the content
      // row[1]: english translation
      const en = row[1];
      // row[2]: spanish translation
      const es = row[2];
      // row[3]: key to use in application
      const key = row[3];

      if (!key) {
        console.log(
          "skipping translation for ",
          row[0],
          " on sheet ",
          workbook.SheetNames[i],
          ": no key"
        );
        return;
      }

      if (!es) {
        console.log(
          "spanish translation missing for ",
          row[0],
          " on sheet ",
          workbook.SheetNames[i]
        );
      }

      english[key] = en;
      spanish[key] = es;
    }
  });
}

fs.writeFileSync(
  path.resolve(__dirname, "./en_translations.json"),
  JSON.stringify(english, undefined, 2)
);

fs.writeFileSync(
  path.resolve(__dirname, "./es_translations.json"),
  JSON.stringify(spanish, undefined, 2)
);
