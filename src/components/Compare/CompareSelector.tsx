import { Button, Grid } from "@trussworks/react-uswds";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { CareProvider } from "../../types";
import Selections from "./Selections";

type CompareSelectorProps = {
  providers: CareProvider[];
  setProviders: Dispatch<SetStateAction<CareProvider[]>>;
};

function CompareSelector({ providers, setProviders }: CompareSelectorProps) {
  const { t } = useTranslation();

  if (!providers.length) return <></>;

  return (
    <div className="bg-primary-darker width-full padding-y-4 padding-x-2">
      <Grid row>
        <Grid col={12} tablet={{ col: 8 }} desktop={{ col: 6 }}>
          <Selections providers={providers} setProviders={setProviders} />
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
            <Button
              className="tablet:margin-left-2 font-family-heading margin-0 width-auto"
              type="button"
              disabled={providers.length < 2}
            >
              {t("compareButton")}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default CompareSelector;
