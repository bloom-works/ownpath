import { Grid, Button } from "@trussworks/react-uswds";
import { ReactComponent as Close } from "../../images/close.svg";
import { ReactComponent as CaretDown } from "../../images/caret-down.svg";
import { useState, Dispatch, SetStateAction } from "react";
import { CareProvider } from "../../types";
import { CompareProviders } from "../../pages/Compare";
import { useTranslation } from "react-i18next";

type SelectionsProps = {
  providers: CompareProviders;
  setProviders: Dispatch<SetStateAction<CompareProviders>>;
};

function Selections({ providers, setProviders }: SelectionsProps) {
  const [showSelections, setShowSelections] = useState(true);
  const { t } = useTranslation();
  return (
    <Grid row>
      {showSelections && (
        <>
          <Selection
            provider={providers.providerA}
            clearFunc={() => setProviders({ providerB: providers.providerB })}
          />
          <Selection
            provider={providers.providerB}
            clearFunc={() => setProviders({ providerA: providers.providerA })}
          />
        </>
      )}

      <button
        className="tablet:display-none margin-0 bg-white text-black padding-x-1 padding-y-2 radius-lg width-full"
        onClick={() => setShowSelections(!showSelections)}
      >
        {t("showCompareSelections", {
          count: !!!providers?.providerA || !!!providers?.providerB ? 1 : 2,
        })}
        <CaretDown
          height={7}
          fill="black"
          className={`margin-left-2 ${!showSelections ? "rotate-180" : ""}`}
        />
      </button>
    </Grid>
  );
}

function Selection({
  provider,
  clearFunc,
}: {
  provider?: CareProvider;
  clearFunc: () => void;
}) {
  return (
    <Grid
      tablet={{ col: true }}
      className={`radius-lg tablet:margin-right-1 padding-y-1 padding-x-2 margin-bottom-1 tablet:margin-bottom-0 ${
        !provider
          ? "bg-black opacity-30 display-none tablet:display-block"
          : "bg-white"
      }`}
    >
      {provider && (
        <div className="display-flex flex-align-center flex-justify">
          {provider.name}
          <Button
            type="button"
            unstyled
            className="width-auto data-icon"
            onClick={clearFunc}
          >
            <Close />
          </Button>
        </div>
      )}
    </Grid>
  );
}

export default Selections;
