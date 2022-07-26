import { GridContainer, Grid } from "@trussworks/react-uswds";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { logPageView } from "../analytics";

function NotFound() {
  useEffect(() => {
    logPageView();
  }, []);

  const { t } = useTranslation();
  const T_PREFIX = "pages.notFound.";
  return (
    <GridContainer>
      <Grid row className="flex-justify-center">
        <h1>{t(`${T_PREFIX}heading`)}</h1>
      </Grid>
      <Grid row className="flex-justify-center">
        <Link to="/">{t(`${T_PREFIX}returnToHome`)}</Link>
      </Grid>
    </GridContainer>
  );
}

export default NotFound;
