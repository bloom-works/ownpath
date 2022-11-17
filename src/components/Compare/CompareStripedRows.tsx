import { Grid } from "@trussworks/react-uswds";
import { useTranslation } from "react-i18next";

import { ReactComponent as Check } from "../../images/check.svg";

function CompareStripedRows({
  rows,
  hideEmptyRows,
  title,
}: {
  rows: {
    label: string;
    compareA: string | boolean;
    compareB: string | boolean;
  }[];
  hideEmptyRows?: boolean;
  title: string;
}) {
  const { t } = useTranslation();

  // for some tables, data is sparse and we want to exclude checkmark rows that would be empty for both providers
  const tableData = hideEmptyRows
    ? rows.filter((row) => !(row.compareA === false && row.compareB === false))
    : rows;

  const getTableCell = (value: string | boolean, srContext: string) => {
    if (value === true) {
      return (
        <div className="display-flex flex-justify-center height-full flex-align-center">
          <div className="usa-sr-only">
            {srContext} {t("yes")}
          </div>
          <Check />
        </div>
      );
    } else if (value === false) {
      return (
        <div className="usa-sr-only">
          {srContext} {t("no")}
        </div>
      );
    } else {
      return (
        <>
          <div className="usa-sr-only">{srContext}</div>
          {value}
        </>
      );
    }
  };

  if (tableData.length === 0) {
    return null;
  }

  return (
    <div className="margin-bottom-6">
      <h3 className="margin-0">{title}</h3>
      <div className="border-top margin-top-05">
        {tableData.map((row, idx) => (
          <Grid
            row
            className={
              (idx + 1) % 2 ? "bg-lightest-blue padding-05" : "padding-05"
            }
          >
            <Grid
              col={12}
              tablet={{ col: 2 }}
              className="padding-y-1 text-bold tablet:text-normal"
            >
              {row.label}
            </Grid>
            <Grid
              col={6}
              tablet={{ col: 5 }}
              className="text-center padding-y-2"
            >
              {getTableCell(row.compareA, t("locationOne"))}
            </Grid>
            <Grid
              col={6}
              tablet={{ col: 5 }}
              className="text-center padding-y-2"
            >
              {getTableCell(row.compareB, t("locationTwo"))}
            </Grid>
          </Grid>
        ))}
      </div>
    </div>
  );
}

export default CompareStripedRows;
