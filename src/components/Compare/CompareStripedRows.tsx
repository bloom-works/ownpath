import { Grid } from "@trussworks/react-uswds";

import { ReactComponent as Check } from "../../images/check.svg";

function CompareStripedRows({
  rows,
}: {
  rows: {
    label: string;
    compareA: string | boolean;
    compareB: string | boolean;
  }[];
}) {
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

  return (
    <div className="border-top margin-top-05 margin-bottom-6">
      {rows.map((row, idx) => (
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
  );
}

export default CompareStripedRows;
