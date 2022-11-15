import { GridContainer, Grid } from "@trussworks/react-uswds";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { handlePageLoad } from "../utils";
import { logPageView } from "../utils/analytics";

function NotFound() {
  useEffect(() => {
    handlePageLoad();
    logPageView();
  }, []);

  const { t } = useTranslation();
  return (
    <GridContainer>
      <Grid row className="flex-justify-center">
        <h1>{t("404PageHeading")}</h1>
      </Grid>
      <Grid row className="flex-justify-center">
        <Link to="/">{t("404PageButton")}</Link>
      </Grid>
    </GridContainer>
  );
}

export default NotFound;
