import { useEffect } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { Grid, GridContainer } from "@trussworks/react-uswds";

import CARE_PROVIDER_DATA from "../data/ladders_data.json";
import { CareProvider } from "../types";
import { logPageView } from "../analytics";

export default function Compare() {
  useEffect(() => {
    logPageView();
  }, []);

  const [params, _setParams] = useSearchParams();

  const ids = params.getAll("id");

  if (!ids || ids.length !== 2) {
    return <Navigate replace to="/" />;
  }
  const providerA = (CARE_PROVIDER_DATA as CareProvider[]).find(
    (result) => `${result.id}` === ids[0]
  );
  const providerB = (CARE_PROVIDER_DATA as CareProvider[]).find(
    (result) => `${result.id}` === ids[1]
  );
  if (!providerA || !providerB || providerA.id === providerB.id) {
    return <Navigate replace to="/Whoops" />;
  }

  return (
    <GridContainer>
      <Grid row>
        <h1>Compare</h1>
      </Grid>
      <Grid row>
        <Grid col={6}>{providerA.name}</Grid>
        <Grid col={6}>{providerB.name}</Grid>
      </Grid>
    </GridContainer>
  );
}
