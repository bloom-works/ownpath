import { Button, Grid } from "@trussworks/react-uswds";
import { Dispatch, SetStateAction } from "react";
import { CompareProviders } from "../../pages/Compare";
import Selections from "./Selections";

type CompareSelectorProps = {
  providers: CompareProviders;
  setProviders: Dispatch<SetStateAction<CompareProviders>>;
};

function CompareSelector({ providers, setProviders }: CompareSelectorProps) {
  if (!providers.providerA && !providers.providerB) return <></>;
  return (
    <div className="bg-primary-darker width-full padding-y-4 padding-x-2">
      <Grid row>
        <Grid col={12} tablet={{ col: 6 }}>
          <Selections providers={providers} setProviders={setProviders} />
        </Grid>
        <Grid col={12} tablet={{ col: 6 }}>
          <Grid
            row
            className="flex-align-center flex-justify-end height-full padding-top-2 tablet:padding-top-0 flex-justify tablet:flex-justify-end"
          >
            <Button
              className="tablet:margin-left-2 dark-background font-heading- text-center width-auto"
              type="button"
              unstyled
              onClick={() => setProviders({})}
            >
              Clear
            </Button>
            <Button
              className="tablet:margin-left-2 font-heading- margin-0 width-auto"
              type="button"
              disabled={!!!providers.providerA || !!!providers.providerB}
            >
              Compare
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default CompareSelector;
