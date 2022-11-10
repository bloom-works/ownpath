import { Button, Grid, Link } from "@trussworks/react-uswds";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import Selections from "./Selections";
import { CompareContext } from "../../pages/Search/Search";

function CompareSelector() {
  const { providers, setProviders } = useContext(CompareContext);
  const { t } = useTranslation();

  if (!providers.length) return <></>;

  return (
    <div className="bg-primary-darker width-full padding-y-4 padding-x-2 position-sticky bottom-0 z-top">
      <Grid row>
        <Grid col={12} tablet={{ col: 8 }} desktop={{ col: 6 }}>
          <Selections />
        </Grid>
        <Grid col={12} tablet={{ col: 4 }} desktop={{ col: 6 }}>
          <Grid
            row
            className="flex-align-center flex-justify-end height-full padding-top-2 tablet:padding-top-0 flex-justify tablet:flex-justify-end"
          >
            <Button
              className="tablet:margin-left-2 dark-background font-family-heading text-center width-auto"
              type="button"
              unstyled
              onClick={() => setProviders([])}
            >
              {t("clear")}
            </Button>
            {providers.length < 2 ? (
              <Button
                type="button"
                className="usa-button tablet:margin-left-2 font-family-heading margin-0 width-auto"
                disabled
              >
                {t("compareButton")}
              </Button>
            ) : (
              <Link
                href={`/compare?id=${providers[0].id}&id=${providers[1].id}`}
                className="usa-button tablet:margin-left-2 font-family-heading margin-0 width-auto"
              >
                {t("compareButton")}
              </Link>
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default CompareSelector;
