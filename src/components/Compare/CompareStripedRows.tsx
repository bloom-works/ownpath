import { Grid } from "@trussworks/react-uswds";

// TODO: display checkbox for boolean values

function CompareStripedRows({
  rows,
}: {
  rows: {
    label: string;
    compareA: string | boolean;
    compareB: string | boolean;
  }[];
}) {
  return (
    <div className="border-top margin-top-05 margin-bottom-3">
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
            {row.compareA}
          </Grid>
          <Grid col={6} tablet={{ col: 4 }}>
            {row.compareB}
          </Grid>
        </Grid>
      ))}
    </div>
  );
}

export default CompareStripedRows;
