import { Grid } from "@trussworks/react-uswds";

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
  // for some tables, data is sparse and we want to exclude checkmark rows that would be empty for both providers
  const tableData = hideEmptyRows
    ? rows.filter((row) => !(row.compareA === false && row.compareB === false))
    : rows;

  const getTableCell = (value: string | boolean) => {
    if (value === true) {
      return (
        <div className="display-flex flex-justify-center height-full flex-align-center">
          <Check />
        </div>
      );
    } else if (value === false) {
      return null;
    } else {
      return value;
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
            <Grid col={12} tablet={{ col: 4 }} className="text-bold">
              {row.label}
            </Grid>
            <Grid col={6} tablet={{ col: 4 }}>
              {getTableCell(row.compareA)}
            </Grid>
            <Grid col={6} tablet={{ col: 4 }}>
              {getTableCell(row.compareB)}
            </Grid>
          </Grid>
        ))}
      </div>
    </div>
  );
}

export default CompareStripedRows;
